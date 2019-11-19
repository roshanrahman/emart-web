<template>
  <v-card
    outlined
    tile
    class="pa-12"
  >
    <v-row justify="space-between">
      <h1 class=" display-1 primary--text mx-2"><b>Order History</b></h1>
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
      View all orders on the app so far
    </h2>

    <v-divider class="my-8"></v-divider>
    <v-row align="center">
      <v-btn
        outlined
        rounded
        text
        color="primary"
        @click="isDownloadDataDialogVisible = true;"
      >
        <v-icon left>mdi-cloud-download</v-icon>
        Download data
      </v-btn>
      <v-spacer></v-spacer>

      <v-text-field
        label="Search"
        single-line
        v-model="searchQuery"
        append-icon="mdi-magnify"
      ></v-text-field>

    </v-row>

    <v-row class="mt-8">
      <v-data-table
        :items="!!getAllOrders.orders ? getAllOrders.orders : []"
        :headers="headers"
        :loading="$apollo.loading"
        loading-text="Fetching data, please wait..."
        no-data-text="No orders found"
        :items-per-page="100"
        :search="searchQuery"
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
        <template v-slot:item.totalPrice="{ item }">

          <b class="subtitle-2"> ₹ {{ item.totalPrice }} </b>

        </template>
        <template v-slot:item.datePlaced="{ item }">

          {{ computedDate(item.datePlaced) }}

        </template>
        <template v-slot:item.updatedDate="{ item }">

          {{ computedDate(item.updatedDate) }}

        </template>
        <template v-slot:item.status="{ item }">

          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-row>
                <v-card
                  :color="item.status == 'RECEIVED_BY_STORE' ? 'warning' : item.status == 'PICKED_UP' ? 'green' : item.status == 'PLACED_BY_CUSTOMER' ? 'info' : 'grey'"
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
                      :value="item.status == 'PLACED_BY_CUSTOMER' ? 10 : item.status == 'RECEIVED_BY_STORE' ? 50 : item.status == 'PICKED_UP' ? 75 : 0"
                    ></v-progress-circular>
                  </v-avatar>
                  <span> {{ computedStatus(item.status).short }}</span>
                </v-card>
              </v-row>
            </template>
            <span class="body-1">{{ computedStatus(item.status).long }}</span>
            <br>
            <span v-if="!!item.cancelledReason">
              Reason: {{ item.cancelledReason}}
            </span>
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
              <v-row>
                <v-list class="ml-4">
                  <h1 class="subtitle-2">Sold by</h1>
                  <h2 class="title">{{item.inventory.vendor.storeName }} ({{ item.inventory.vendor.phoneNumber }}) </h2>
                </v-list>
              </v-row>
              <v-divider class="mt-2"></v-divider>
              <v-spacer></v-spacer>
              <v-card
                class="mt-4 px-4"
                elevation="0"
              >
                <v-row> <span class="title primary--text"> {{ computedStatus(item.itemStatus).short }}</span>
                </v-row>
                <v-row><span class="subtitle-1 grey--text"> {{ computedStatus(item.itemStatus).long }}</span></v-row>
              </v-card>
              <v-spacer></v-spacer>

            </v-card>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isDownloadDataDialogVisible"
      max-width="600"
    >
      <v-card class="pa-8">
        <v-row justify="center">
          <h1 class="headline mb-4 primary--text">Download your data</h1>
          <h2 class="subtitle-2 text-center font-weight-regular grey--text">Download a copy of your order history as a CSV file. You can open the CSV in any spreadsheet software, like Excel.</h2>
          <v-divider class="my-4"></v-divider>
        </v-row>
        <h2 class="subtitle-1 text-center mb-2"><b>Select the range of dates and click Download</b></h2>
        <v-row
          align="center"
          justify="space-between"
        >

          <v-menu
            v-model="startDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                readonly
                prepend-icon="mdi-calendar"
                v-on="on"
                class="ml-2"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              color="primary"
              v-model="startDate"
              @input="startDateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-row>
        <v-row
          align="center"
          justify="space-between"
        >

          <v-menu
            v-model="endDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDate"
                label="End Date"
                readonly
                prepend-icon="mdi-calendar"
                v-on="on"
                class="ml-2"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              color="primary"
              v-model="endDate"
              @input="endDateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-row>
        <v-row>
          <v-divider class="my-4"></v-divider>

        </v-row>
        <v-row>
          <span
            class="red--text"
            v-if="!isDateValid"
          >This date range is not valid.</span>
          <span
            class="primary--text"
            v-else
          >
            Selected date range (YYYY-MM-DD): {{ startDate }} to {{ endDate }}
          </span>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :disabled="!isDateValid"
            @click="runDownloadDataMutation()"
          >Download</v-btn>
        </v-row>
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
          <h1 class="title primary--text text-center">Order History</h1>
          <h2 class="body-2 grey--text text-center mb-4">Allows you to view all the orders on the app so far</h2>
          <h3>Available Functions: </h3>
          <h4>Order History Table</h4>
          <ul>
            <li>Fetches all the orders done on the app so far.</li>
            <li>You can sort by clicking on the field headings. Use the search field to filter the orders shown.</li>
            <li>View the items in the order by clicking ‘View Items’</li>
          </ul>
          <h4>Download your data</h4>
          <ul>
            <li>Allows you to download a local copy of the order list.</li>
            <li>Click the button and choose the date. By default, the range for the current month is selected. You can change to any date of your choice.</li>
            <li>Click Download. A CSV File containing the records will start downloading. The CSV can be opened and processed in any spreadsheet software.</li>
          </ul>

        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { getAllOrders } from "../../graphql/getAllOrders";
import { OrderStatuses } from '../../helpers/orderStatuses';
import { downloadDataMutation } from "../../graphql/downloadDataMutation";
import moment from "moment";

export default Vue.extend({
  mounted () {
    var startDateObj = moment().startOf('month');
    var endDateObj = moment().endOf('month');
    this.startDate = startDateObj.format('YYYY-MM-DD');
    this.endDate = endDateObj.format('YYYY-MM-DD');
  },
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    },
    isDateValid: function () {
      var startDateObj = moment(this.startDate);
      var endDateObj = moment(this.endDate);
      if (endDateObj.isBefore(startDateObj)) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    download: function (filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    computedStatus: function (status) {

      return OrderStatuses.resolveOrderStatus(status);
    },
    computedDate: function (dateString) {
      var epoch = parseInt(dateString);
      var date = new Date(epoch);
      return moment(date).format('DD/MM/YYYY h:mm:ss A');
    },

    async runDownloadDataMutation () {
      // await this.$apollo.mutate({
      //   mutation: downloadDataMutation,
      //   variables: {
      //     startDate: this.startDate,
      //     endDate: this.endDate
      //   }
      // }).then((result) => {
      //   console.log('Returned from mutation: ', result);
      //   this.download(`OrderHistory from ${this.startDate} to ${this.endDate}.csv`, result.data.downloadData);
      //   this.isDownloadDataDialogVisible = false;
      // }, (error) => {
      //   console.error(error);
      //   alert(error);
      // });
      var vendorId = this.loggedInUser.id;
      window.open(`http://cezhop.herokuapp.com/downloadCSV?vendorId=${vendorId}&startDate=${this.startDate}&endDate=${this.endDate}`);
      this.isDownloadDataDialogVisible = false;
    }

  },
  components: {

  },

  data () {
    return {
      startDate: null,
      endDate: null,
      startDateMenu: false,
      endDateMenu: false,
      isItemDetailDialogVisible: false,
      isDownloadDataDialogVisible: false,
      isHelpDialogVisible: false,
      currentOrder: {},
      getAllOrders: {},
      searchQuery: '',
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
    getAllOrders: {
      query: getAllOrders,
      variables () {
        vendorId: this.loggedInUser.id;
      },
      pollInterval: 50000
    }
  }
});
</script>

<style>
</style>