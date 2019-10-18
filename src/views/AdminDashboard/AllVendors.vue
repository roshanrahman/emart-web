<template>
  <v-card
    outlined
    tile
    class="pa-12 ma-4"
  >
    <h1 class=" display-1">Vendors</h1>
    <h2 class=" body-1 my-4">View all registered vendors</h2>

    <v-row class="mt-8">
      <v-data-table
        :items="approvedVendors"
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
            :disabled="!!item.shopPhotoUrl == false"
            @click="currentVendor = item; isShopDialogVisible = true; "
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
            :disabled="!!item.pancardPhotoUrls == false"
            @click="currentVendor = item; isPanCardDialogVisible = true; "
          >View Photos</v-btn>
        </template>
        <template v-slot:item.blocked="{
          item
          }">
          <div v-if="item.blocked">

            <v-icon
              left
              color="grey"
            >mdi-close-circle</v-icon><span class="grey--text">Blocked</span>

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

            <v-icon
              left
              color="success"
            >mdi-checkbox-marked-circle</v-icon><span class="success--text">ACTIVE</span>

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
      v-model="isBankDetailsDialogVisible"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          <v-row justify="space-between">
            <span>Bank Details for {{ currentVendor.storeName }}</span>
            <v-btn
              icon
              @click="copyTextToClipboard(`Vendor: ${currentVendor.storeName}\nA/C Number: ${currentVendor.bankAccountNumber}\nA/C Holder Name: ${currentVendor.bankAccountName}\nIFSC Code: ${currentVendor.bankAccountIFSC}`)"
            >
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </v-row>
        </v-card-title>
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
              class="fill-height ma-0 pa-2"
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
    approvedVendors: function () {
      var vendors = this.getAllVendors;
      if (!!vendors == false) {
        return [];
      }
      vendors = vendors.filter((vendor) => vendor.approved == true && vendor.admin == false);
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
    },
    fallbackCopyTextToClipboard (text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);
    },
    copyTextToClipboard (text) {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
        alert('Bank details copied. Now you can paste anywhere');
      }, function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
  },
  components: {

  },

  data () {
    return {
      isItemDetailDialogVisible: false,
      isBlockVendorDialogVisible: false,
      isUnblockVendorDialogVisible: false,
      isBankDetailsDialogVisible: false,
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
          text: "Bank Details",
          value: "bankDetails"
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