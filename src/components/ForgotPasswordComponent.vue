<template>
  <v-card class="pa-4">
    <v-card-title>
      <v-row justify="space-between">
        <h2 class="title primary--text">Create new password</h2>
        <v-btn
          rounded
          text
          outlined
          color="red"
          @click="$emit('closeDialog');"
        >Cancel</v-btn>
      </v-row>
      <v-row
        justify="center"
        class="mt-6"
      >
        <h2 class="body-1 grey--text">Create a new password by verifying your phone number</h2>
      </v-row>
    </v-card-title>
    <v-divider class="my-2"></v-divider>
    <v-card-text class="pa-4">
      <div v-if="step == 0">
        <v-row no-gutters>
          <h2 class="body-1">Enter your phone number you registered your account with</h2>

        </v-row>
        <v-row no-gutters>
          <v-text-field
            single-line
            label="Phone Number"
            v-model="phoneNumberInput"
            filled=""
            class="mt-4"
          >
          </v-text-field>
        </v-row>
        <v-divider></v-divider>
        <v-row
          no-gutters
          justify="end"
          class="mt-4"
        >
          <v-btn
            rounded
            elevation="0"
            color="primary"
            :disabled='!!this.phoneNumberInput == false'
            :loading="isWorking"
            @click="checkIfNumberExists();"
          >Continue</v-btn>

        </v-row>
      </div>
      <div v-if="step == 1">
        <h2 class="body-1">Sending an OTP to your number {{ phoneNumberInput }}...</h2>
        <v-progress-linear
          indeterminate=""
          class="my-4"
        ></v-progress-linear>

      </div>
      <div v-if="step == 2">
        <v-row no-gutters>

          <h2 class="body-1">OTP has been sent to your number {{ phoneNumberInput }}. Please enter it here to continue. </h2>

        </v-row>
        <v-row no-gutters>
          <v-text-field
            single-line
            label="OTP"
            filled=""
            class="mt-4"
            v-model="otpInput"
          >
          </v-text-field>
        </v-row>
        <v-divider></v-divider>
        <v-row
          no-gutters
          justify="end"
          class="mt-4"
        >
          <v-btn
            rounded
            elevation="0"
            color="primary"
            :disabled='!!this.otpInput == false'
            :loading="isWorking"
            @click="verifyOTP();"
          >Verify</v-btn>

        </v-row>
      </div>
      <div v-if="step == 3">
        <v-row no-gutters>

          <h2 class="body-1">Please enter your new password to restore your access. You will be able to access your account using this new password.</h2>

        </v-row>
        <v-row no-gutters>
          <v-text-field
            single-line
            label="New Password"
            filled=""
            class="mt-4"
            type="password"
            v-model="newPasswordInput"
            hint="Your password should have at least 6 characters."
            persistent-hint=""
          >
          </v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field
            single-line
            label="Confirm New Password"
            filled=""
            class="mt-4"
            type="password"
            hint="Repeat the same password here."
            v-model="confirmNewPasswordInput"
          >
          </v-text-field>
        </v-row>
        <v-divider></v-divider>
        <v-row
          no-gutters
          justify="end"
          class="mt-4"
        >
          <v-btn
            rounded
            elevation="0"
            color="primary"
            :disabled='!(this.newPasswordInput.length > 5 && this.newPasswordInput == this.confirmNewPasswordInput)'
            :loading="isWorking"
            @click="changePassword();"
          >Change password</v-btn>

        </v-row>
      </div>
      <div v-if="step == 4">
        <v-row no-gutters>

          <h2 class="body-1 primary--text">Password has been successfully changed. You can now login with your new password.</h2>

        </v-row>

        <v-row
          no-gutters
          justify="end"
          class="mt-4"
        >
          <v-btn
            rounded
            elevation="0"
            color="primary"
            @click="$emit('closeDialog');"
          >Got it</v-btn>

        </v-row>
      </div>
    </v-card-text>
    <div id="recaptcha-container"></div>

  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import firebase from "firebase";
import { validateVendorArgumentsMutation } from "../graphql/validateVendorArguments";
import { updateVendorAccountMutation } from "../graphql/updateVendorAccount";

export default Vue.extend({
  mounted() {
    (<any>window).recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function(response) {
          //Recaptcha solved, allow signIn
        },
        "expired-callback": function() {
          //Solve again
        }
      }
    );
    this.appVerifier = (<any>window).recaptchaVerifier;
    console.log("Recaptcha is ready");
  },
  data() {
    return {
      isWorking: false,
      appVerifier: "",
      phoneNumberInput: null,
      otpInput: null,
      newPasswordInput: "",
      confirmNewPasswordInput: null,
      step: 0
    };
  },
  methods: {
    changePassword() {
      this.isWorking = true;
      this.$apollo
        .mutate({
          mutation: updateVendorAccountMutation,
          variables: {
            otpToken: "something",
            phoneNumber: this.phoneNumberInput,
            password: this.newPasswordInput
          }
        })
        .then(
          data => {
            console.log("PASSWORD CHANGE SUCCESS ", data);
            this.isWorking = false;
            this.step = 4;
          },
          error => {
            console.log("ERROR OCCURED ", error);
            alert(error);
          }
        );
    },
    verifyOTP() {
      let vm = this;
      let otp = this.otpInput;
      this.isWorking = true;
      (<any>window).confirmationResult
        .confirm(otp)
        .then(function(successResult) {
          var user = successResult.user;
          console.log("User from OTP: ", user);

          vm.step = 3;
          vm.isWorking = false;
        })
        .catch(function(error) {
          //OTP incorrect or some error
          console.log("OTP ERROR: ", error);
          if (error.code == "auth/invalid-verification-code") {
            alert(
              "You entered an incorrect OTP, please enter the correct OTP."
            );
          }
          vm.isWorking = false;
        });
    },
    startOtpProcess() {
      //Opening OTP Dialog
      let vm = this;
      var appVerifier = this.appVerifier;
      var phoneNumber = "+91" + this.phoneNumberInput;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function(smsSentResult) {
          (<any>window).confirmationResult = smsSentResult;
          vm.step = 2;
          console.log("OTP has been sent ", smsSentResult);
        })
        .catch(function(error) {
          console.log("Something went wrong with OTP: " + error);
          alert(error);
          vm.step = 0;
        });
    },
    checkIfNumberExists() {
      this.isWorking = true;
      this.$apollo
        .mutate({
          mutation: validateVendorArgumentsMutation,
          variables: {
            phoneNumber: this.phoneNumberInput
          }
        })
        .then(
          data => {
            console.log("RETURNED FROM CHECK", data);
            if (data.data.validateVendorArguments.phoneNumber) {
              this.step = 1;
              this.startOtpProcess();
            } else {
              alert(
                "This number does not exist. Please use a number you have registered your account with."
              );
            }
            this.isWorking = false;
          },
          error => {
            console.log("ERROR encountered", error);
            alert(error);
            this.isWorking = false;
          }
        );
    }
  }
});
</script>

<style>
</style>