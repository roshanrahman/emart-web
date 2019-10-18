<template>
  <v-container dark>
    <v-navigation-drawer
      app
      v-model="isDrawerOpen"
      width="275"
    >
      <v-list shaped>
        <v-list-item
          key="header"
          color="primary"
        >
          <v-list-item-content>
            <v-list-item-title class="
      title">
              Administrator
            </v-list-item-title>
            <v-list-item-subtitle>
              App admin
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-4"></v-divider>
        <v-list-item-group v-model="selectedDrawerItem">

          <v-list-item
            value="home"
            color="primary"
            @click="routeTo('admin')"
          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-subheader class="mt-4 grey--text text--darken-1">ORDERS</v-subheader>

          <v-list-item
            value="admin-active-orders"
            color="primary"
            @click="routeTo('admin-active-orders')"
          >
            <v-list-item-icon v-if="activeOrdersCount > 0">

              <v-badge overlap="">
                <template v-slot:badge> {{ activeOrdersCount }}</template>
                <v-icon>mdi-arrow-down-box</v-icon>
              </v-badge>
            </v-list-item-icon>
            <v-list-item-icon v-else>

              <v-icon>mdi-arrow-down-box</v-icon>

            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>

                Active Orders

              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            value="admin-order-history"
            @click="routeTo('admin-order-history')"
            color="primary"
          >
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Order History</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-4"></v-divider>

          <v-subheader class="mt-4 grey--text text--darken-1">INVENTORY</v-subheader>

          <v-list-item
            value="admin-inventory"
            color="primary"
            @click="routeTo('admin-inventory')"
          >
            <v-list-item-icon>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Inventory</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            value="admin-posters"
            color="primary"
            @click="routeTo('admin-posters')"
          >
            <v-list-item-icon>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Offer Posters</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-4"></v-divider>

          <v-subheader class="mt-4 grey--text text--darken-1">VENDORS</v-subheader>

          <v-list-item
            value="admin-vendor-requests"
            color="primary"
            @click="routeTo('admin-vendor-requests')"
          >
            <v-list-item-icon v-if="vendorsApprovedCount > 0">

              <v-badge overlap="">
                <template v-slot:badge> {{ vendorsApprovedCount }}</template>
                <v-icon>mdi-account-multiple-plus</v-icon>
              </v-badge>
            </v-list-item-icon>
            <v-list-item-icon v-else>

              <v-icon>mdi-account-multiple-plus</v-icon>

            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>New Vendor Requests</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            value="admin-vendors"
            color="primary"
            @click="routeTo('admin-vendors')"
          >
            <v-list-item-icon>
              <v-icon>mdi-account-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>All Vendors</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-4"></v-divider>

          <v-subheader class="mt-4 grey--text text--darken-1">PROFILE</v-subheader>
          <v-list-item
            value="admin-profile"
            @click="routeTo('admin-profile')"
            color="primary"
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Your Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!--  <v-list-item
            value="admin-stats"
            color="primary"
            @click="routeTo('admin-stats')"
          >
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Your Stats</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-row justify="space-around">
          <v-btn
            text
            rounded
            icon
            class="ma-4"
          >
            <v-icon
              v-if="isDark"
              @click="switchToLight();"
            >mdi-brightness-7</v-icon>
            <v-icon
              @click="switchToDark();"
              v-if="!isDark"
            >mdi-brightness-2</v-icon>
          </v-btn>
          <v-btn
            class="ma-4"
            outlined
            text=""
            rounded=""
            @click="logOut()"
          >Log Out</v-btn>
        </v-row>
      </template>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen">
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img
          v-if="isDark"
          src="@/assets/logo-white.png"
          max-height="40"
          contain
          alt="Be Shoppi"
          class="mt-2"
        ></v-img>
        <v-img
          v-else
          src="@/assets/logo-color.png"
          max-height="40"
          contain
          alt="Be Shoppi"
          class="mt-2"
        ></v-img>
      </v-toolbar-title>
    </v-app-bar>
    <router-view @changeRoute='routeTo'></router-view>
  </v-container>
</template>

<script>
import Vue from "vue";
import HomePage from "./HomePage.vue";
import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { getAllOrders } from "../../graphql/getAllOrders";
import { getAllVendors } from "../../graphql/getAllVendors";

export default Vue.extend({
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    },
    activeOrdersCount: function () {
      var ordersList = this.getAllOrders.orders;
      if (!!ordersList == false) {
        return 0;
      }
      console.log(ordersList);
      var count = 0;
      ordersList.forEach(order => {
        if (order.status == "PLACED_BY_CUSTOMER" || order.status == 'RECEIVED_BY_STORE' || order.status == 'PICKED_UP') {
          count += 1;
        }
      });
      return count;
    },
    vendorsApprovedCount: function () {
      var vendorsList = this.getAllVendors;
      if (!!vendorsList == false) {
        return 0;
      }
      var count = 0;
      vendorsList.forEach(vendor => {
        if (vendor.approved == false) {
          count += 1;
        }
      });
      return count;
    }
  },
  apollo: {
    getAllOrders: {
      query: getAllOrders,
      pollInterval: 3
    },
    getAllVendors: {
      query: getAllVendors,
      pollInterval: 3
    }
  },
  components: {
    HomePage
  },
  methods: {
    switchToDark () {
      this.$vuetify.theme.dark = true;
      this.isDark = true;
    },
    switchToLight () {
      this.$vuetify.theme.dark = false;
      this.isDark = false;
    },
    logOut () {
      LoginSessionHandler.logOut();
      this.$router.replace("/");
    },
    routeTo (item) {
      this.$router.replace(item);
      this.selectedDrawerItem = item;
    }
  }
  ,
  data () {
    return {
      selectedDrawerItem: 'home',
      isDrawerOpen: null,
      isDark: false,
      getAllOrders: {}
    }
  }
})
</script>

<style>
</style>