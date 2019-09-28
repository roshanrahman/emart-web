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
                  <span> {{ computedStatus(item.status).short }}</span>
                </v-card>
              </v-row>
            </template>
            <span>{{ computedStatus(item.status).long }}</span>
          </v-tooltip>

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
              color="warning"
            >
              <v-icon
                small
                left
              >mdi-timer-sand-empty</v-icon>
              <span>Payment pending</span>

            </v-card>
          </v-row>
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
  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { getVendorOrders } from "../../graphql/getVendorOrders";
import { OrderStatuses } from '../../helpers/orderStatuses';
import moment from "moment";

export default Vue.extend({
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
    computedStatus: function (status) {

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
        }
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
});
</script>

<style>
</style>