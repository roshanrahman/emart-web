<template>
  <v-card
    outlined
    tile
    class="pa-12"
  >
    <v-row justify="space-between">
      <h1 class=" display-1 primary--text mx-2"><b>Vendors</b></h1>
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
      View all registered vendors currently operating on the platform
    </h2>

    <v-divider class="my-8"></v-divider>
    <v-row class="mt-8">
      <v-data-table
        :items="approvedVendors"
        :headers="headers"
        :loading="$apollo.loading"
        loading-text="Fetching data, please wait..."
        no-data-text="No vendors"
        :items-per-page="100"
      >
        <template v-slot:item.address="{
          item
          }">
          {{ !!item.address ? JSON.parse(item.address ).addressLine : 'N/A'}}, {{ !!item.address ? JSON.parse(item.address ).city : 'N/A'}}
        </template>
        <template v-slot:item.amountToPay="{
          item
          }">

          <v-btn
            rounded
            small
            color="primary"
            v-if="Number(item.amountToPay) > 0"
            @click="isPayVendorDialogVisible = true; currentVendor = item;"
          >
            <h2 class="body-1"><b>₹ {{ Number(item.amountToPay) - (Number(item.amountToPay) * 0.11) }} </b></h2>

            <v-icon
              right
              dark
              small
            >mdi-arrow-right</v-icon>
          </v-btn>
          <h2
            class="caption"
            v-else
          >None</h2>
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
            >mdi-checkbox-marked-circle</v-icon><span class="success--text">Active</span>

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
            color="primary"
            small
            class="ml-4"
            rounded
            outlined
            text
            @click="currentVendor = item; isBankDetailsDialogVisible = true;"
          >View Details</v-btn>
        </template>
        <template v-slot:item.vendorDetails="{
          item
          }">
          <v-btn
            small
            color="primary"
            rounded
            outlined
            text
            @click="isVendorDetailsDialogVisible = true; currentVendor = item;"
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
          <h1 class="title primary--text text-center">All Vendors</h1>
          <h2 class="body-2 grey--text text-center mb-4">Allows you to view and manage all the vendors operating on the platform</h2>
          <h3>Available Functions: </h3>
          <h4>View details</h4>
          <ul>
            <li>Click 'View Details' to open up all the details about a vendor, including shop and PAN card photos.</li>
          </ul>
          <h4>Block/Unblock Vendor</h4>
          <ul>
            <li>Blocking is a way to temporarily stop the vendor from operating on the platform.</li>
            <li>Use the buttons to block or unblock the vendors. They will be informed of this status when they attempt to log in to the platform.</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isVendorDetailsDialogVisible"
      fullscreen=""
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          <v-toolbar-title>Details for {{ currentVendor.storeName }}

          </v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn
              icon
              @click="isVendorDetailsDialogVisible = false;"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row justify="center">
          <v-col
            cols="12"
            md="8"
            lg="6"
          >
            <VendorDetailsComponent :vendor="currentVendor"></VendorDetailsComponent>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isPayVendorDialogVisible"
      max-width="650"
      persistent=""
    >
      <v-card>
        <v-card-title>
          <v-row
            justify="space-between"
            no-gutters=""
          >
            <h2 class="title primary--text">Due income for vendor {{ currentVendor.storeName }} </h2>
            <v-btn
              @click="isPayVendorDialogVisible = false;"
              rounded
              outlined
              text
              color="red"
            >Close</v-btn>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <VendorIncomeComponent :vendorId="currentVendor.id"></VendorIncomeComponent>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <h2 class="body-1 ma-4 primary--text">Please enter the amount you have credited to this vendor. It will be deducted from the pending payment amount.</h2>
          </v-row>
          <v-row>
            <v-text-field
              class="mx-4"
              filled
              single-line
              v-model.number="amountInput"
              persistent-hint
              prefix="₹ "
              hint="Please enter the amount you have paid this vendor"
            ></v-text-field>
          </v-row>
          <v-row justify="end">
            <v-btn
              rounded
              class="mx-4"
              elevation="0"
              color="primary"
              :loading="isPaymentBusy"
              :disabled="!!amountInput == false"
              @click="makePayment();"
            >Save Changes</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { getAllVendors } from "../../graphql/getAllVendors";
import { disableVendorAccountMutation } from "../../graphql/disableVendorAccountMutation";
import VendorDetailsComponent from "../../components/VendorDetailsComponent";
import VendorIncomeComponent from "../../components/VendorIncomeComponent";
import { OrderStatuses } from '../../helpers/orderStatuses';
import moment from "moment";
import { updateVendorAccountMutation } from '../../graphql/updateVendorAccount';

export default Vue.extend({
  components: {
    VendorDetailsComponent,
    VendorIncomeComponent
  },
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
    makePayment () {
      //TODO: Fix amountToPay issue.
      this.isPaymentBusy = true;
      var amountToPay = this.currentVendor.amountToPay - (this.amountInput + (this.currentVendor.amountToPay * 0.11));
      console.log('Amount to pay', amountToPay);
      console.log('To vendor', this.currentVendor.id)
      this.$apollo.mutate({
        mutation: updateVendorAccountMutation,
        variables: {
          vendorId: this.currentVendor.id,
          amountToPay: `${amountToPay}`
        }
      }).then((data) => {
        console.log('MUTATION SUCCESS: ', data);
        this.isPaymentBusy = false;
        this.isPayVendorDialogVisible = false;
        this.$apollo.queries.getAllVendors.refetch();
      }, (error) => {
        console.log('ERROR OCCURED: ', error);
        alert(error);
        this.isPaymentBusy = false;

      });

    },
    checkIfValidDetails: function (vendor) {
      try {
        var a = JSON.parse(vendor.address);
        var b = JSON.parse(vendor.pancardPhotoUrls);
      } catch (error) {
        console.error(error);
        alert('Error occured while processing the details. The details provided by the vendor are not correctly formatted. Please ask vendor to submit their application again.')
      }

    },
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
      }).then((successResult) => { this.$apollo.queries.getAllVendors.refetch(); }, (error) => { console.log('Disable Vendor failed', error) })
    },
    enableVendor () {
      this.isUnblockVendorDialogVisible = false;
      this.$apollo.mutate({
        mutation: disableVendorAccountMutation,
        variables: {
          vendorId: this.currentVendor.id,
          block: false
        }
      }).then((successResult) => { this.$apollo.queries.getAllVendors.refetch(); }, (error) => { console.log('Disable Vendor failed', error) })
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
        this.fallbackCopyTextToClipboard(text);
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
  data () {
    return {
      amountInput: '',
      isItemDetailDialogVisible: false,
      isBlockVendorDialogVisible: false,
      isUnblockVendorDialogVisible: false,
      isVendorDetailsDialogVisible: false,
      isBankDetailsDialogVisible: false,
      isShopDialogVisible: false,
      isPanCardDialogVisible: false,
      isHelpDialogVisible: false,
      isPayVendorDialogVisible: false,
      currentVendor: {},
      getAllVendors: [],
      isPaymentBusy: false,
      headers: [
        {
          text: "Store Name",
          value: "storeName"
        },

        {
          text: "Details",
          value: "vendorDetails"
        },
        {
          text: "Pending Payment",
          value: "amountToPay"
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
          text: "Blocked Status",
          value: "blocked"
        },
      ]
    }
  },
  apollo: {
    getAllVendors: {
      query: getAllVendors,
      pollInterval: 2000
    }
  }
});
</script>

<style>
</style>