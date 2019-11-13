<template>
  <v-card
    class="pa-3"
    outlined
  >
    <h1 class="title text-center primary--text my-4">Insights</h1>

    <v-list>
      <v-list-item
        @click="changeRoute('vendor-profile');"
        v-if="totalAmountToPay > 0"
      >
        <v-list-item-avatar class="d-none d-lg-block">
          <v-icon class="warning lighten-1 white--text">mdi-alert-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="warning--text">Due income: ₹ {{ totalAmountToPay }}</v-list-item-title>
          <v-list-item-subtitle>Visit your profile to view your due income.</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-arrow-right</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list-item
        @click="changeRoute('vendor-inventory');"
        v-if="outOfStock > 0"
      >
        <v-list-item-avatar class="d-none d-lg-block">
          <v-icon class="error lighten-1 white--text">mdi-alert-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="error--text">Some items are out of stock</v-list-item-title>
          <v-list-item-subtitle>Your inventory has some items that are not in stock. Please review.</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-arrow-right</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list-item
        @click="changeRoute('vendor-inventory');"
        v-if="unAnswered > 0"
      >
        <v-list-item-avatar class="d-none d-lg-block">
          <v-icon class="warning lighten-1 white--text">mdi-alert-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="warning--text">There are unanswered questions</v-list-item-title>
          <v-list-item-subtitle>Visit your inventory to answer questions posted by customers.</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-arrow-right</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <h2 class="body-1 grey--text">If any issues are detected that require your attention, they will appear here.</h2>
      </v-list-item>
    </v-list>

  </v-card>
</template>

<script>
import Vue from "vue";
import { getVendorInventory } from '../graphql/getVendorInventory';
import { getAllInventory } from '../graphql/getAllInventory';
import { getAllVendors } from "../graphql/getAllVendors";
import { getVendorInfo } from "../graphql/getVendorInfo";
export default {
  name: 'InsightsVendor',
  computed: {
    outOfStock: function () {
      var outOfStock = 0;
      if (!!this.getVendorInventory == false) {
        return 0;
      }
      this.getVendorInventory.inventory.forEach(item => {
        if (item.inStock < 1) {
          outOfStock += 1;
        }
      });
      return outOfStock;
    },
    unAnswered: function () {
      var unAnswered = 0;
      if (!!this.getVendorInventory == false) {
        return 0;
      }
      this.getVendorInventory.inventory.forEach(item => {
        if (item.unAnswered > 0) {
          unAnswered += 1;
        }
      });
      return unAnswered;
    },
    totalAmountToPay: function () {
      if (!!this.getVendorInfo == false) {
        return 0;
      }
      var amountToPay = this.getVendorInfo.user.amountToPay;
      return amountToPay - (amountToPay * 0.11);
    }
  },
  methods: {
    changeRoute (item) {
      console.log('clicked')
      this.$emit('emitRoute', item);
    }
  },
  apollo: {
    getVendorInfo: {
      query: getVendorInfo,
      pollInterval: 3
    },
    getAllInventory: {
      query: getAllInventory,
      pollInterval: 3
    },
    getAllVendors: {
      query: getAllVendors,
      pollInterval: 3
    },
    getVendorInventory: {
      query: getVendorInventory,
      pollInterval: 3
    }
  }
}
</script>

<style>
</style>