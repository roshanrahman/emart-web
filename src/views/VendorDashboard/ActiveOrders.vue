<template>
  <v-card
    outlined
    tile
    class="pa-12"
  >

    <v-row justify="space-between">
      <h1 class=" display-1 primary--text mx-2"><b>Your Active Orders</b></h1>

      <v-btn
        icon
        color="primary"
        outlined
        text
        @click="isHelpDialogVisible = true;"
      >
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-row>
    <h2 class=" body-1 mt-2">
      View ongoing orders that are active and require your attention.
    </h2>

    <v-divider class="my-8"></v-divider>

    <v-row class="mt-8">
      <v-data-table
        :items="filteredOrders"
        :headers="headers"
        :loading="$apollo.loading"
        loading-text="Fetching data, please wait..."
        no-data-text="No new orders"
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
      max-width="900"
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
            <!-- <v-list-item
              v-for="item in currentOrder.cartItems"
              :key="item.id"
            >
              <v-list-item-avatar>
                <v-avatar size="72">
                  <v-img :src="JSON.parse(item.inventory.imageUrl)[0]"></v-img>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>

                <v-list-item-title class="title">{{ item.inventory.name }}</v-list-item-title>
                <v-list-item-subtitle><span class="primary--text">₹ {{item.inventory.sellingPrice}}</span> </v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item> -->
            <v-card
              v-for="item in currentOrder.cartItems"
              :key="item.id"
              outlined
              class="pa-4 mb-4"
            >
              <v-row>
                <v-avatar
                  size="72"
                  class="mx-2"
                >
                  <v-img :src="JSON.parse(item.inventory.imageUrl)[0]"></v-img>

                </v-avatar>
                <v-col>
                  <h1 class="title"> {{ item.inventory.name }}
                  </h1>
                  <v-list-item-subtitle><span class="subtitle-1 primary--text">₹ {{item.inventory.sellingPrice}}</span> </v-list-item-subtitle>
                </v-col>
              </v-row>

              <v-divider class="mt-2"></v-divider>
              <v-spacer></v-spacer>
              <v-card
                class="mt-4 px-4"
                elevation="0"
              >
                <v-row> <span class="title primary--text"> {{ computedStatusForVendor(item.itemStatus).short }}</span>
                </v-row>
                <v-row><span class="subtitle-1 grey--text"> {{ computedStatusForVendor(item.itemStatus).long }}</span></v-row>
              </v-card>
              <v-spacer></v-spacer>

            </v-card>
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
                        @dblclick="isCancelOrderDialogVisible = true;"
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
                        @click="isCancelOrderDialogVisible = true;"
                      >Cancel</v-btn>
                    </template>
                    <span> Click only if you are sure you want to cancel the order.</span>
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
    <v-dialog
      v-model="isHelpDialogVisible"
      max-width="600"
    >
      <v-card>
        <v-card-title>
          <v-flex>
            Help
          </v-flex>
          <v-btn
            text
            color="primary"
            @click="isHelpDialogVisible = false;"
          >Close</v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <h1 class="title primary--text text-center">Active Orders</h1>
          <h2 class="body-2 grey--text text-center mb-4">Allows you to manage the currently ongoing orders</h2>
          <h3>Available Functions: </h3>
          <h4>Active Orders Table</h4>
          <ul>
            <li>Fetches all the orders currently ongoing, including new and accepted orders.</li>
            <li>You can sort by clicking on the field headings.</li>
            <li>View the items in the order by clicking ‘View Items’</li>
          </ul>
          <h4>Update Status</h4>
          <ul>
            <li>Allows you to update the status of the order, marking a process as complete.</li>
            <li>Once the pending tasks are complete, update the status. We will show you the next step of the process.</li>
          </ul>

        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="600"
      v-model="isCancelOrderDialogVisible"
    >
      <v-card>
        <v-card-title>
          <v-row
            justify="space-between"
            class="mx-4"
          >
            <h1 class="title">Cancel this order?</h1>
            <v-btn
              rounded
              outlined
              text
              @click="isCancelOrderDialogVisible = false;"
            >Close</v-btn>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <h2 class="body-1 ma-4">Please provide a reason for cancelling this order.</h2>

          </v-row>
          <v-row
            class="ml-2"
            align="center"
          >
            <h2 class="caption">Suggestions: </h2>
            <v-chip
              small=""
              class="mx-2"
              @click="reasonForChangeInput = 'The customer was not reachable at delivery.'"
            >Customer not reachable</v-chip>
            <v-chip
              small=""
              class="mx-2"
              @click="reasonForChangeInput = 'Some items in your order were out of stock, and could not be sent for shipping.'"
            >Product out of stock</v-chip>
            <v-chip
              small=""
              class="mx-2"
              @click="reasonForChangeInput = 'Cancelling on behalf of the customer.'"
            >On customer's request</v-chip>
          </v-row>
          <v-row>
            <v-textarea
              class="ma-4"
              v-model="reasonForChangeInput"
              label="Reason for cancellation"
              required
              filled
            ></v-textarea>
          </v-row>
          <v-divider></v-divider>
          <v-row justify="end">
            <v-btn
              class="ma-4"
              color="red"
              rounded
              outlined
              text=""
              elevation="0"
              @click="changeStatusForCancelling()"
              :disabled="!!reasonForChangeInput == false"
            >Cancel Order</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { changeOrderStatusMutation } from "../../graphql/changeOrderStatusMutation";
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
        return ((order.status == 'PLACED_BY_CUSTOMER' || order.status == 'RECEIVED_BY_STORE') && (order.transactionSuccess == true || order.paymentMode == 'Cash On Delivery'));
      });
      return orders;
    }

  },
  methods: {
    showBill (id) {
      var win = window.open('http://cezhop.herokuapp.com/generateBill?orderId=' + id + "&vendorId=" + this.loggedInUser.id, '_blank');
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
    },
    changeStatus (status) {
      this.$apollo.mutate({
        mutation: changeOrderStatusMutation,
        variables: {
          status: status,
          orderId: this.currentOrder.id
        }
      }).then((successResult) => {
        console.log(successResult);
        this.isUpdateStatusDialogVisible = false;
      }, (error) => { console.error(error); alert(error); });
    },
    changeStatusForCancelling: function () {
      this.$apollo.mutate({
        mutation: changeOrderStatusMutation,
        variables: {
          status: 'CANCELLED_BY_STORE',
          orderId: this.currentOrder.id,
          cancelledReason: this.reasonForChangeInput
        }
      }).then((successResult) => {
        console.log(successResult);
        this.isUpdateStatusDialogVisible = false;
        this.isCancelOrderDialogVisible = false;
      }, (error) => {        console.error(error); alert(error); this.isUpdateStatusDialogVisible = false;
        this.isCancelOrderDialogVisible = false;      });

    }
  },

  components: {

  },

  data () {
    return {
      isItemDetailDialogVisible: false,
      isUpdateStatusDialogVisible: false,
      isCancelOrderDialogVisible: false,
      isHelpDialogVisible: false,
      reasonForChangeInput: null,
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
      pollInterval: 1000
    }
  }
}
</script>

<style>
</style>