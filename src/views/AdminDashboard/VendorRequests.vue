<template>
  <v-card
    outlined
    tile
    class="pa-12 ma-4"
  >
    <h1 class=" display-1">New Vendor Requests</h1>
    <h2 class=" body-1 my-4">View requests by vendors interested to join your app</h2>

    <v-row class="mt-8">
      <v-data-table
        :items="getAllVendors"
        :headers="headers"
        :loading="$apollo.loading"
        loading-text="Fetching data, please wait..."
        :items-per-page="100"
      >
        <template v-slot:item.address="{
          item
          }">
          {{ !!item.address ? JSON.parse(item.address ).addressLine : 'N/A'}}, {{ !!item.address ? JSON.parse(item.address ).city : 'N/A'}}
        </template>
        <template v-slot:item.shopPhoto="{
          item
          }">
          <v-btn
            outlined
            text
            small
            color="primary"
            rounded
            @click="isShopDialogVisible = true; currentVendor = item;"
          >View Shop Photo</v-btn>
        </template>
        <template v-slot:item.panCard="{
          item
          }">
          <v-btn
            outlined
            text
            small
            color="primary"
            rounded
            @click="isPanCardDialogVisible = true; currentVendor = item;"
          >View PAN Photos</v-btn>
        </template>
        <template v-slot:item.blocked="{
          item
          }">
          <div v-if="item.blocked">
            <v-chip
              outlined
              color="grey"
              label=""
            >
              <v-icon
                left
                color="grey"
              >mdi-close-circle</v-icon>BLOCKED FROM APP
            </v-chip>
            <v-btn
              outlined
              color="primary"
              small
              class="ml-4"
              text
              rounded
              @click="currentVendor = item; isUnblockVendorDialogVisible = true;"
            >Unblock</v-btn>
          </div>
          <div v-else>
            <v-chip
              outlined
              color="success"
              label=""
            >
              <v-icon
                left
                color="success"
              >mdi-checkbox-marked-circle</v-icon>ACTIVE
            </v-chip>
            <v-btn
              outlined
              color="red"
              small
              class="ml-4"
              text
              rounded
              @click="currentVendor = item; isBlockVendorDialogVisible = true;"
            >Block</v-btn>
          </div>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog
      v-model="isBlockVendorDialogVisible"
      max-width="400"
    >
      <v-card>
        <v-card-title>Do you want to block {{ ` ${currentVendor.storeName }` }} from operating on this app?</v-card-title>
        <v-card-text>You will be able to restore their access at anytime.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="isBlockVendorDialogVisible = false;"
          >Cancel</v-btn>
          <v-btn
            elevation="0"
            outlined
            text
            color="red"
            @click="disableVendor()"
          >
            Block
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isUnblockVendorDialogVisible"
      max-width="400"
    >
      <v-card>
        <v-card-title>Do you want to restore {{ ` ${currentVendor.storeName }` }}'s access?</v-card-title>
        <v-card-text>You will be able to block their access at anytime.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="isUnblockVendorDialogVisible = false;"
          >Cancel</v-btn>
          <v-btn
            elevation="0"
            outlined
            text
            color="primary"
            @click="enableVendor()"
          >
            Restore access
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      fullscreen
      v-model="isPanCardDialogVisible"
    >
      <v-toolbar
        color="primary"
        dark
      >
        <v-toolbar-title>PAN Card Images for {{ currentVendor.storeName }}

        </v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <v-btn
            icon
            @click="isPanCardDialogVisible = false;"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card class="mx-auto pa-8">
        <v-img
          v-for="url in JSON.parse(!! currentVendor.pancardPhotoUrls ? currentVendor.pancardPhotoUrls : '[]')"
          :key="url"
          :src="url"
          class="mx-auto pb-8"
          max-width="1300"
          contain=""
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </v-dialog>
    <v-dialog
      fullscreen
      v-model="isShopDialogVisible"
    >
      <v-toolbar
        color="primary"
        dark
      >
        <v-toolbar-title>Shop Image for {{ currentVendor.storeName }}

        </v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <v-btn
            icon
            @click="isShopDialogVisible = false;"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card class="mx-auto pa-8">
        <v-img
          :src="currentVendor.shopPhotoUrl"
          class="mx-auto pb-8"
          max-width="1300"
          contain=""
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { getAllVendors } from "../../graphql/getAllVendors";
import { disableVendorAccountMutation } from "../../graphql/disableVendorAccountMutation";

import { OrderStatuses } from '../../helpers/orderStatuses';
import moment from "moment";

export default Vue.extend({
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    },

  },
  methods: {
    computedStatus: function (status) {

      return OrderStatuses.resolveOrderStatus(status);
    },
    computedDate: function (dateString) {
      var epoch = parseInt(dateString);
      var date = new Date(epoch);
      return moment(date).format('DD/MM/YYYY h:mm:ss A');
    },
    disableVendor () {
      this.isBlockVendorDialogVisible = false;
      this.$apollo.mutate({
        mutation: disableVendorAccountMutation,
        variables: {
          vendorId: this.currentVendor.id,
          block: true
        }
      }).then((successResult) => { }, (error) => { console.log('Disable Vendor failed', error) })
    },
    enableVendor () {
      this.isUnblockVendorDialogVisible = false;
      this.$apollo.mutate({
        mutation: disableVendorAccountMutation,
        variables: {
          vendorId: this.currentVendor.id,
          block: false
        }
      }).then((successResult) => { }, (error) => { console.log('Disable Vendor failed', error) })
    }
  },
  components: {

  },

  data () {
    return {
      isItemDetailDialogVisible: false,
      isBlockVendorDialogVisible: false,
      isUnblockVendorDialogVisible: false,
      isShopDialogVisible: false,
      isPanCardDialogVisible: false,
      currentVendor: {},
      getAllVendors: [],
      headers: [
        {
          text: "Store Name",
          value: "storeName"
        },
        {
          text: "Address",
          value: "address"
        },
        {
          text: "Phone Number",
          value: "phoneNumber"
        },
        {
          text: "Email Address",
          value: "email"
        },
        {
          text: "Store Photo",
          value: "shopPhoto"
        },
        {
          text: "PAN Card Photos",
          value: "panCard"
        },
        {
          text: "Blocked Status",
          value: "blocked"
        },
      ]
    }
  },
  apollo: {
    getAllVendors: {
      query: getAllVendors,
      pollInterval: 3
    }
  }
});
</script>

<style>
</style>