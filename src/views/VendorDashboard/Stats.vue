<template>
  <v-card
    outlined
    tile
    class="pa-12"
  >
    <v-row justify="space-between">
      <h1 class=" display-1 primary--text mx-2"><b>Statistics</b></h1>
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
      View graph representations of your orders and income
    </h2>

    <v-divider class="my-8"></v-divider>
    <v-row
      class="mb-2"
      justify="center"
      no-gutters
    >
      <v-col lg="2">
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
              solo
              single-line=""
              persistent-hint
              hint="Starting date"
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
      </v-col>
      <v-col md="auto">
        <v-card
          class="pa-2 mx-2"
          elevation="0"
          tile
        >
          to
        </v-card>
      </v-col>
      <v-col lg="2">
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
              solo
              prepend-icon="mdi-calendar"
              single-line=""
              persistent-hint
              hint="Ending date"
              v-on="on"
              class="ml-2"
            ></v-text-field>
          </template>
          <v-date-picker
            no-title
            color="primary"
            v-model="endDate"
            @input="endDateMenu = false;"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      class="mb-4"
    >
      <span
        class="red--text"
        v-if="!isDateValid"
      >This date range is not valid. Make sure start date comes before the end date, not vice versa.</span>
      <span
        class="primary--text"
        v-else
      >
        Selected date range (YYYY-MM-DD): {{ startDate }} to {{ endDate }}
      </span>
    </v-row>
    <v-divider></v-divider>

    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <chart :chart-data="amountChartData"></chart>
      </v-col>
      <v-col
        cols="12"
        lg="6"
      >
        <chart :chart-data="orderChartData"></chart>
      </v-col>
    </v-row>
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
          <h1 class="title primary--text text-center">Statistics</h1>
          <h2 class="body-2 grey--text text-center mb-4">Allows you to view charts showing data of your income and orders received</h2>
          <h3 id="functions">Functions</h3>
          <h4 id="select-date-range">Select date range</h4>
          <ul>
            <li>Choose the period for which you want to view data.</li>
            <li>Set the start date and the end date using the date pickers.</li>
            <li>The data for the set period will be loaded onto the graphs.</li>
          </ul>
          <h4 id="income-graph">Income Graph</h4>
          <ul>
            <li>Shows you the total income you earned on a particular day.</li>
            <li>Hover over any day to view the income received on that day (in Rupees).</li>
          </ul>
          <h4 id="orders-graph">Orders Graph</h4>
          <ul>
            <li>Shows you the total orders you received on a particular day.</li>
            <li>Hover over any day to view the orders received on that day.</li>
          </ul>

        </v-card-text>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
import Vue from "vue";
import Chart from "../../components/Chart";


import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { getOrderStats } from "../../graphql/getOrderStats";
import moment from "moment";

export default Vue.extend({
  components: {
    Chart
  },
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
  data () {
    return {
      startDate: null,
      endDate: null,
      startDateMenu: false,
      endDateMenu: false,
      isHelpDialogVisible: false,
      orderChartData: null,
      amountChartData: null,
    }
  },
  apollo: {
    getOrderStats: {
      query: getOrderStats,
      variables () {
        return {
          startDate: this.startDate,
          endDate: this.endDate
        }
      },
      pollInterval: 5000,
      result (data) {
        this.fillData();
      }

    }
  },
  methods: {
    fillData () {
      var ordersFromQuery = this.getOrderStats;
      if (!!this.getOrderStats == false) {
        ordersFromQuery = [];
      }
      var datesList = [];
      var totalOrdersList = [];
      var totalAmountsList = [];
      this.getOrderStats.forEach((entry) => {
        datesList.push(moment(entry.date).format('DD/MM/YYYY'));
        totalOrdersList.push(entry.orderCount);
        totalAmountsList.push(entry.totalAmount);
      });
      console.log(datesList, totalAmountsList);
      this.amountChartData = {
        labels: datesList,
        datasets: [
          {

            label: "Income per day (₹)",
            data: totalAmountsList,
            borderColor: "#1976d2",
            fill: false
          },
        ]
      };
      this.orderChartData = {
        labels: datesList,
        datasets: [
          {

            label: "Orders per day",
            data: totalOrdersList,
            borderColor: "#db6767",
            fill: false
          },
        ]
      };
    }
  }
});
</script>

<style>
</style>