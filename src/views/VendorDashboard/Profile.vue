<template>
  <v-card
    outlined
    tile
    class="pa-12"
  >
    <v-row justify="space-between">
      <h1 class=" display-1 primary--text mx-2"><b>Your Profile</b></h1>
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
      View and edit your profile details
    </h2>

    <v-divider class="my-8"></v-divider>
    <v-row align="center">
      <v-btn
        outlined
        rounded
        text
        color="primary"
        v-if="isEditingDisabled"
        @click="isEditingDisabled = false;"
      >
        <v-icon left>mdi-pencil</v-icon>
        Edit details
      </v-btn>

    </v-row>

    <v-row class="mt-8">
      <v-col
        cols="12"
        md="6"
      >
        <h1 class="subtitle-2 mb-4">Login Information</h1>
        <v-text-field
          :disabled="isEditingDisabled"
          label="Phone Number (for login)"
          filled
          v-model="phoneNumberInput"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="Email address"
          filled
          v-model="emailInput"
        >
        </v-text-field>
        <h1 class="subtitle-2 mb-4">Store Information</h1>

        <v-text-field
          :disabled="isEditingDisabled"
          label="Name"
          filled
          v-model="nameInput"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="Address Line"
          filled
          v-model="addressLineInput"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="City"
          filled
          v-model="cityInput"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="Pin Code"
          filled
          v-model="pincodeInput"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="Phone Number (for customer support)"
          filled
          v-model="addressPhoneNumberInput"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="Alternative Phone 1"
          filled
          v-model="alternativePhone1Input"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="Alternative Phone 2"
          filled
          v-model="alternativePhone2Input"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="GST Number"
          filled
          v-model="GSTInput"
        >
        </v-text-field>
        <h1 class="subtitle-2 mb-4">Bank Account Details</h1>

        <v-text-field
          :disabled="isEditingDisabled"
          label="A/C Number"
          filled
          v-model="bankAccountNumberInput"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="A/C Holder Name"
          filled
          v-model="bankAccountNameInput"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="A/C IFSC Code"
          filled
          v-model="bankAccountIFSCInput"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="PayTM Name"
          filled
          v-model="paytmNameInput"
        >
        </v-text-field>
        <v-text-field
          :disabled="isEditingDisabled"
          label="PayTM Number"
          filled
          v-model="paytmNumberInput"
        >
        </v-text-field>
        <v-slide-y-transition>
          <v-row
            v-if="!isEditingDisabled"
            class="mt-4"
          >
            <v-btn
              text
              class="mr-4 "
              @click="isEditingDisabled = true;"
            >Cancel</v-btn>
            <v-spacer></v-spacer>

            <v-btn
              elevation="0"
              color="primary"
              @click="saveChanges()"
            >Save changes</v-btn>
          </v-row>
        </v-slide-y-transition>
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
          <h1 class="title primary--text text-center">Profile</h1>
          <h2 class="body-2 grey--text text-center mb-4">Allows you to view and edit your profile details</h2>
          <h3>Available Functions: </h3>
          <h4>Edit profile details</h4>
          <ul>
            <li>Click 'Edit Details' to edit your details.</li>
            <li>Once the details have been entered, click Save Changes to confirm.</li>
          </ul>

        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { updateVendorAccountMutation } from "../../graphql/updateVendorAccount";
export default Vue.extend({
  mounted () {
    var user = new LoginSessionHandler()
    this.nameInput = user.storeName;
    this.emailInput = user.email;
    this.phoneNumberInput = user.phoneNumber;
    this.addressLineInput = user.address.addressLine;
    this.cityInput = user.address.city;
    this.pincodeInput = user.address.pinCode;
    this.addressPhoneNumberInput = user.address.phoneNumber;
    this.GSTInput = user.vendorGSTNumber;
    this.bankAccountNameInput = user.bankAccountName;
    this.bankAccountIFSCInput = user.bankAccountIFSC;
    this.bankAccountNumberInput = user.bankAccountNumber;
    this.paytmNameInput = user.paytmName;
    this.paytmNumberInput = user.paytmNumberInput;
    this.alternativePhone1Input = user.alternativePhone1;
    this.alternativePhone2Input = user.alternativePhone2;
  },
  computed: {

  },
  components: {

  },
  data () {
    return {
      isHelpDialogVisible: false,
      isEditingDisabled: true,
      nameInput: '',
      emailInput: '',
      phoneNumberInput: '',
      addressLineInput: '',
      cityInput: '',
      pincodeInput: '',
      addressPhoneNumberInput: '',
      GSTInput: '',
      bankAccountNameInput: '',
      bankAccountIFSCInput: '',
      bankAccountNumberInput: '',
      paytmNameInput: '',
      paytmNumberInput: '',
      alternativePhone1Input: '',
      alternativePhone2Input: ''
    }
  },
  methods: {
    saveChanges () {
      this.isEditingDisabled = true;
      this.$apollo.mutate({
        mutation: updateVendorAccountMutation,
        variables: {
          storeName: this.nameInput,
          phoneNumber: this.phoneNumberInput,
          email: this.emailInput,
          address: {
            addressLine: this.addressLineInput,
            city: this.cityInput,
            pinCode: this.pincodeInput,
            phoneNumber: this.addressPhoneNumberInput
          },
          vendorGSTNumber: this.GSTInput,
          bankAccountName: this.bankAccountNameInput,
          bankAccountNumber: this.bankAccountNumberInput,
          bankAccountIFSC: this.bankAccountIFSCInput,
          paytmName: this.paytmNameInput,
          paytmNumber: this.paytmNumberInput,
          alternativePhone1: this.alternativePhone1Input,
          alternativePhone2: this.alternativePhone2Input
        }
      }).then((data) => {
        console.log(data);
        if (!!data.data.updateVendorAccount.error == false) {
          LoginSessionHandler.setLogin(
            JSON.stringify(data.data.updateVendorAccount.user),
            localStorage.getItem('apollo-token')
          );
        }
      }, (error) => {
        console.log("Error in profile mutation: ", error);
        alert(error);
      })
    }
  }
});
</script>

<style>
</style>