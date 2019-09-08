<template>
  <v-card
    outlined
    tile
    class="pa-12 ma-4"
  >
    <v-row>
      <h1 class=" display-1">Profile</h1>
      <v-spacer></v-spacer>
      <v-btn
        rounded
        elevation="0"
        color="primary"
        outlined
        text
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
        <v-alert
          type="warning"
          v-if="!isEditingDisabled"
        >Please note that you are the admin of this entire service. If you forget your login credentials, you will <b>permanently</b> lose access. Please keep track of all the changes you make.</v-alert>

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
  },
  computed: {
    loggedInUser: function () {
      var user = new LoginSessionHandler()
      this.nameInput = user.storeName;
      this.emailInput = user.email;
      this.phoneNumberInput = user.phoneNumber;
      return user
    }
  },
  components: {

  },
  data () {
    return {
      isEditingDisabled: true,
      nameInput: '',
      emailInput: '',
      phoneNumberInput: '',
      addressLineInput: '',
      cityInput: '',
      addressPhoneNumberInput: ''
    }
  },
  methods: {
    saveChanges () {
      this.isEditingDisabled = true;
      this.$apollo.mutate({
        mutation: updateVendorAccountMutation,
        variables: {
          name: this.nameInput,
          storeName: this.nameInput,
          phoneNumber: this.phoneNumberInput,
          email: this.emailInput,
          pancardPhotoUrls: '',
          shopPhotoUrl: '',
          address: {
            addressLine: this.addressLineInput,
            city: this.cityInput,
            phoneNumber: this.addressPhoneNumberInput
          }
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

      })
    }
  }
});
</script>

<style>
</style>