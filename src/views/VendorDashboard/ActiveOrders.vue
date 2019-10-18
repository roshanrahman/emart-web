<template>
  <v-card
    outlined
    tile
    class="pa-12 ma-4"
  >
    <h1 class=" display-1">Active Orders</h1>
    <h2 class=" body-1 my-4">View orders that are in processing</h2>

    <v-row class="mt-8">
      <v-data-table
        :items="filteredOrders"
        :headers="headers"
        :loading="$apollo.loading"
        loading-text="Fetching data, please wait..."
        :sort-by="['updatedDate']"
        :items-per-page="100"
        sort-desc
      >
        <template v-slot:item.items="{ item }">
          <v-btn
            text
            outlined
            small
            rounded
            @click="currentOrder = item; isItemDetailDialogVisible = true;"
          >View items</v-btn>
        </template>
        <template v-slot:item.datePlaced="{ item }">

          {{ computedDate(item.datePlaced) }}

        </template>
        <template v-slot:item.updatedDate="{ item }">

          {{ computedDate(item.updatedDate) }}

        </template>
        <template v-slot:item.totalPrice="{ item }">

          <b class="subtitle-2"> ₹ {{ item.totalPrice }} </b>

        </template>
        <template v-slot:item.status="{ item }">

          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-row>
                <v-card
                  :color="item.status == 'RECEIVED_BY_STORE' ? 'warning' : item.status == 'PICKED_UP' ? 'green' : 'info'"
                  dark
                  v-on="on"
                  class="px-2 py-1 ma-1"
                  :outlined="true"
                >
                  <v-avatar
                    left
                    size="20"
                    class="mr-2"
                  >
                    <v-progress-circular
                      size="20"
                      width="3"
                      :value="item.status == 'PLACED_BY_CUSTOMER' ? 10 : item.status == 'RECEIVED_BY_STORE' ? 50 : item.status == 'PICKED_UP' ? 75 : 100"
                    ></v-progress-circular>
                  </v-avatar>
                  <span> {{ computedStatusForVendor(item.status).short }}</span>
                </v-card>
              </v-row>
            </template>
            <span>{{ computedStatusForVendor(item.status).long }}</span>
          </v-tooltip>
        </template>
        <template v-slot:item.updateStatus="{ item }">

          <v-btn
            rounded
            color="primary"
            small
            @click="currentOrder = item; isUpdateStatusDialogVisible = true;"
          >Update</v-btn>

        </template>
        <template v-slot:item.transactionSuccess="{ item }">
          <v-row>
            <v-card
              dark
              v-if="item.transactionSuccess"
              color="success"
              outlined=""
              class="px-2"
            >
              <v-icon
                small
                left
              >mdi-check</v-icon>
              <span>Paid by customer</span>
            </v-card>
            <v-card
              v-else
              dark
              outlined
              class="px-2"
              color="error"
            >
              <v-icon
                small
                left
              >mdi-timer-sand-empty</v-icon>
              <span>Payment incomplete</span>

            </v-card>
          </v-row>
        </template>
        <template v-slot:item.bill="{ item }">

          <v-btn
            outlined
            text
            rounded
            primary
            small
            @click="showBill(item.id)"
          >
            Bill
            <v-icon right>mdi-arrow-top-right</v-icon>
          </v-btn>

        </template>
      </v-data-table>
    </v-row>
    <v-dialog
      v-model="isItemDetailDialogVisible"
      max-width="600"
    >
      <v-card>
        <v-card-title>
          <v-flex>
            Items in Order #{{ currentOrder.orderNo }}
          </v-flex>
          <v-btn
            text
            color="primary"
            @click="isItemDetailDialogVisible = false;"
          >Close</v-btn>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="item in currentOrder.cartItems"
              :key="item.id"
            >
              <v-list-item-avatar>
                <v-avatar>
                  <v-img :src="JSON.parse(item.inventory.imageUrl)[0]"></v-img>

                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>

                <v-list-item-title>{{ item.inventory.name }}</v-list-item-title>

              </v-list-item-content>
              <h2 class="subtitle-1"> ₹ {{item.inventory.sellingPrice}} </h2>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isUpdateStatusDialogVisible"
      max-width="600"
    >
      <v-card>
        <v-card-title>
          <v-flex>
            Update Status of Order #{{ currentOrder.orderNo }}
          </v-flex>
          <v-btn
            text
            color="primary"
            @click="isUpdateStatusDialogVisible = false;"
          >Close</v-btn>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>

              <v-list-item-content>
                <v-list-item-subtitle class="mb-2">Current Status</v-list-item-subtitle>
                <v-list-item-title class="primary--text title"> {{ computedStatusForVendor(currentOrder.status).short }}</v-list-item-title>
                <v-list-item-subtitle class="black--text subtitle-2">{{ computedStatusForVendor(currentOrder.status).long }}</v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
            <v-list-item>

              <v-list-item-content>
                <v-list-item-subtitle class="my-2">Next Action</v-list-item-subtitle>
                <v-list-item-title class="primary--text subtitle-1">{{ computedStatusForVendor(currentOrder.status).next }}</v-list-item-title>
              </v-list-item-content>

            </v-list-item>
            <v-list-item v-if="currentOrder.status == 'PLACED_BY_CUSTOMER'">

              <v-list-item-content>
                <v-list-item-subtitle class="my-2">Available Actions</v-list-item-subtitle>
                <v-list-item-title class="primary--text subtitle-1">

                  <v-btn
                    color="primary"
                    class="ml-2"
                    @click="changeStatus('RECEIVED_BY_STORE')"
                  >Accept order</v-btn>

                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="red"
                        text
                        v-on="on"
                        @dblclick="changeStatus('CANCELLED_BY_STORE')"
                      >Reject</v-btn>
                    </template>
                    <span> Are you sure you want to reject this order? Double click the button if you want to reject order.</span>
                  </v-tooltip>
                </v-list-item-title>
              </v-list-item-content>

            </v-list-item>
            <v-list-item v-if="currentOrder.status == 'RECEIVED_BY_STORE'">

              <v-list-item-content>
                <v-list-item-subtitle class="my-2">Available Actions</v-list-item-subtitle>
                <v-list-item-title class="primary--text subtitle-1">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="red"
                        text
                        v-on="on"
                        @dblclick="changeStatus('CANCELLED_BY_STORE')"
                      >Cancel</v-btn>
                    </template>
                    <span> Are you sure you want to cancel this order? Double click the button if you want to cancel order.</span>
                  </v-tooltip>
                  <v-btn
                    color="primary"
                    class="mr-2"
                    @click="changeStatus('PICKED_UP')"
                  >Mark as sent for delivery</v-btn>

                </v-list-item-title>
              </v-list-item-content>

            </v-list-item>
            <v-list-item v-if="currentOrder.status == 'PICKED_UP'">

              <v-list-item-content>
                The admin will verify the proper delivery of the item and update if it has been delivered and paid.
              </v-list-item-content>

            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { getVendorOrders } from "../../graphql/getVendorOrders";
import { OrderStatuses } from '../../helpers/orderStatuses';
import moment from "moment";

export default {
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    },
    filteredOrders: function () {
      var orders = [];
      orders = this.getVendorOrders.orders;
      if (!!orders == false) {
        return [];
      }
      orders = orders.filter(order => {
        return order.status == 'PLACED_BY_CUSTOMER' ||
          order.status == 'RECEIVED_BY_STORE'
      });
      return orders;
    }

  },
  methods: {
    showBill (id) {
      var win = window.open('http://cezhop.herokuapp.com/generateBill?orderId=' + id, '_blank');
      win.focus();
    },
    computedStatusForVendor (status) {
      if (status == '' || status == null) {
        return { short: '', long: '' }
      }
      return OrderStatuses.resolveOrderStatus(status);
    },
    computedDate: function (dateString) {
      var epoch = parseInt(dateString);
      var date = new Date(epoch);
      return moment(date).format('DD/MM/YYYY h:mm:ss A');
    }
  },
  components: {

  },

  data () {
    return {
      isItemDetailDialogVisible: false,
      isUpdateStatusDialogVisible: false,
      currentOrder: {},
      getVendorOrders: {},
      headers: [
        {
          text: "Order No.",
          value: "orderNo"
        },
        {
          text: "Items",
          value: "items"
        },
        {
          text: "Date Placed",
          value: "datePlaced"
        },
        {
          text: "Last updated",
          value: "updatedDate"
        },
        {
          text: "Total Amount",
          value: "totalPrice"
        },
        {
          text: "Payment Mode",
          value: "paymentMode"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Transaction Success",
          value: "transactionSuccess"
        },
        {
          text: "Generate bill",
          value: "bill"
        },
        {
          text: "Update Order Status",
          value: "updateStatus"
        },
      ]
    }
  },
  apollo: {
    getVendorOrders: {
      query: getVendorOrders,
      variables () {
        vendorId: this.loggedInUser.id;
      },
      pollInterval: 3
    }
  }
}
</script>

<style>
</style>