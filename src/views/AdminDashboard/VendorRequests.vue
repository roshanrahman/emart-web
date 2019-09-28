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
        :items="unapprovedVendors"
        :headers="headers"
        :loading="$apollo.loading"
        loading-text="Fetching data, please wait..."
        no-data-text="No new requests"
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
          >View Photo</v-btn>
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
          >View Photos</v-btn>
        </template>
        <template v-slot:item.approve="{
          item
          }">

          <v-btn
            outlined
            color="success"
            small
            class="ml-4"
            text
            rounded
            @click="currentVendor = item; isBlockVendorDialogVisible = true;"
          >Approve</v-btn>
        </template>
        <template v-slot:item.bankDetails="{
          item
          }">

          <v-btn
            outlined
            color="primary"
            small
            class="ml-4"
            text
            rounded
            @click="currentVendor = item; isBankDetailsDialogVisible = true;"
          >View Details</v-btn>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog
      v-model="isBankDetailsDialogVisible"
      max-width="400"
    >
      <v-card>
        <v-card-title>Bank Details for {{ currentVendor.storeName }} </v-card-title>
        <v-card-text>
          <v-list two-line>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle> Bank Account Number </v-list-item-subtitle>
                <v-list-item-title class="headline">{{ currentVendor.bankAccountNumber }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle> Bank Account Holder Name </v-list-item-subtitle>
                <v-list-item-title class="headline">{{ currentVendor.bankAccountName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle> Bank Account IFSC Code </v-list-item-subtitle>
                <v-list-item-title class="headline">{{ currentVendor.bankAccountIFSC }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="isBankDetailsDialogVisible = false;"
          >Okay</v-btn>
          <h1></h1>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isBlockVendorDialogVisible"
      max-width="400"
    >
      <v-card>
        <v-card-title>Do you want to approve the request {{ ` ${currentVendor.storeName }` }} and allow them on the platform?</v-card-title>
        <v-card-text>You will be able to block or allow their access at anytime. If you do not approve, they will not be allowed in the app.</v-card-text>
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
            color="green"
            @click="approveVendor()"
          >
            Approve
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
import { updateVendorAccountMutation } from "../../graphql/updateVendorAccount";
import { OrderStatuses } from '../../helpers/orderStatuses';
import moment from "moment";

export default Vue.extend({
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    },
    unapprovedVendors: function () {
      var vendors = this.getAllVendors;
      if (!!vendors == false) {
        return [];
      }
      vendors = vendors.filter((vendor) => vendor.approved == false);
      return vendors;
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
    },
    approveVendor () {
      this.isBlockVendorDialogVisible = false;
      console.log('Going to approve ', this.currentVendor.id);
      var vendorId = this.currentVendor.id;
      this.$apollo.mutate({
        mutation: updateVendorAccountMutation,
        variables: {
          vendorId: vendorId,
          approved: true
        }
      }).then((successResult) => { console.log("Approve vendor success ", successResult) }, (error) => { console.log('Verify vendor approved failed', error) })
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
      isBankDetailsDialogVisible: false,
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
          text: "GST Number",
          value: "vendorGSTNumber"
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
          text: "Bank Account Details",
          value: "bankDetails"
        },
        {
          text: "Approval Status",
          value: "approve"
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