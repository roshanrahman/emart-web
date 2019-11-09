<template>
  <v-container pa-0>

    <v-toolbar elevation="0">
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <v-row
          justify="center"
          align="center"
        >
          <v-img
            contain
            class="mt-2"
            max-height="50"
            src="@/assets/logo-black.png"
          ></v-img>
        </v-row>

      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
    <v-layout wrap>
      <v-row
        justify="center"
        class='my-8'
      >
        <v-col
          cols="12"
          md="8"
        >
          <div id="recaptcha-container"></div>
          <h1 class="headline text-center my-4 primary--text">New Account Registration</h1>
          <p class="my-4 text-center body-1">Complete the registration form, submit documents and get approved by us. Once done, you can sign in and start your business.</p>

          <v-stepper
            class="mt-8 elevation-0"
            v-model="currentStep"
          >
            <v-stepper-header class="elevation-0">
              <v-stepper-step step="1">Account Credentials</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2">Store Details</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Bank Details</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="4">Upload Documents</v-stepper-step>
            </v-stepper-header>
            <v-divider></v-divider>

            <v-stepper-items>
              <v-stepper-content step="1">
                <h2 class="title">Contact information</h2>
                <h3 class="body-1">This will be used to contact you.</h3>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="mt-6">
                    <v-text-field
                      filled=""
                      label="Phone Number"
                      type="tel"
                      :rules="phoneNumberValidationRules"
                      required
                      v-model="formInputs.phoneNumberInput"
                      persistent-hint=""
                      hint="An OTP will sent to this number for verification"
                    ></v-text-field>

                    <v-text-field
                      filled=""
                      type="email"
                      label="Email Address"
                      required
                      :rules="emailAddressValidationRules"
                      v-model="formInputs.emailAddressInput"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-divider class="my-4"></v-divider>
                <h2 class="title mt-8">Choose a password</h2>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="my-6">
                    <v-text-field
                      filled=""
                      label="Password"
                      type="password"
                      required
                      hint="At least 6 characters are required"
                      :rules="passwordValidationRules"
                      v-model="formInputs.passwordInput"
                    ></v-text-field>

                    <v-text-field
                      filled=""
                      type="password"
                      label="Confirm Password"
                      required
                      :error-messages="checkIfPasswordsMatch()"
                      @input="checkIfPasswordsMatch()"
                      :rules="confirmPasswordValidationRules"
                      v-model="formInputs.confirmPasswordInput"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-divider>

                </v-divider>
                <v-row
                  justify="space-between"
                  class="ma-2"
                >
                  <v-btn
                    class="my-4 mx-4"
                    text
                    outlined
                    disabled
                    @click="goToStep(1)"
                  >Back</v-btn>
                  <v-btn
                    class="my-4"
                    elevation="0"
                    color="primary"
                    :disabled="!page1Complete"
                    :loading="$apollo.loading"
                    @click="checkAndGoToStepTwo()"
                  >Continue
                  </v-btn>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="2">
                <h2 class="title">Name of the store</h2>
                <h3 class="body-1">Your online presence will be registered with this name</h3>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="mt-6">
                    <v-text-field
                      filled=""
                      label="Store Name"
                      v-model="formInputs.storeNameInput"
                      :rules="storeNameValidationRules"
                    ></v-text-field>

                  </v-form>
                </v-col>
                <v-divider class="my-4"></v-divider>
                <h2 class="title mt-8">Address</h2>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="my-6">
                    <v-textarea
                      filled=""
                      label="Street/Locality"
                      v-model="formInputs.addressLineInput"
                      :rules="addressLineValidationRules"
                    >
                    </v-textarea>
                    <v-textarea
                      filled=""
                      label="Landmark"
                      v-model="formInputs.landmarkInput"
                    >
                    </v-textarea>
                    <v-text-field
                      filled=""
                      label="City"
                      v-model="formInputs.cityInput"
                      :rules="cityValidationRules"
                    ></v-text-field>

                    <v-text-field
                      filled=""
                      label="Pin Code"
                      v-model="formInputs.pincodeInput"
                      :rules="pincodeValidationRules"
                    ></v-text-field>
                    <v-divider></v-divider>
                    <v-text-field
                      filled=""
                      label="Phone Number for customer support"
                      v-model="formInputs.addressPhoneInput"
                      :rules="phoneNumberValidationRules"
                    ></v-text-field>
                    <v-text-field
                      filled=""
                      label="Alternate Phone Number 1"
                      v-model="formInputs.alternatePhone1Input"
                      :rules="phoneNumberValidationRules"
                    ></v-text-field>
                    <v-text-field
                      filled=""
                      label="Alternate Phone Number 2"
                      v-model="formInputs.alternatePhone2Input"
                      :rules="phoneNumberValidationRules"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <h2 class="title mt-8">GST Number</h2>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="my-6">

                    <v-text-field
                      filled=""
                      label="GST Number"
                      v-model="formInputs.gstInput"
                      :rules="GSTValidationRules"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-divider>

                </v-divider>

                <v-row
                  justify="space-between"
                  class="ma-2"
                >
                  <v-btn
                    class="my-4 mx-4"
                    text
                    outlined
                    @click="goToStep(1)"
                  >Back</v-btn>
                  <v-btn
                    class="my-4"
                    elevation="0"
                    color="primary"
                    :disabled="!page2Complete"
                    @click="goToStep(3)"
                  >Continue
                  </v-btn>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="3">
                <h2 class="title">Bank Account Number</h2>
                <h3 class="body-1">Please enter the bank A/C No. you'd like to use for transactions</h3>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="mt-6">
                    <v-text-field
                      filled=""
                      label="Account Number"
                      v-model="formInputs.bankAccountNumberInput"
                      :rules="bankAccountNumberValidationRules"
                    ></v-text-field>

                  </v-form>
                </v-col>
                <v-divider class="my-4"></v-divider>
                <h2 class="title mt-8">Account Holder Name</h2>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="my-6">

                    <v-text-field
                      filled=""
                      label="A/C Holder Name"
                      v-model="formInputs.bankAccountHolderInput"
                      :rules="bankAccountHolderValidationRules"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <h2 class="title mt-8">IFSC Code</h2>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="my-6">

                    <v-text-field
                      filled=""
                      label="IFSC Code"
                      v-model="formInputs.bankIFSCInput"
                      :rules="bankIFSCValidationRules"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-divider class="mb-6">

                </v-divider>
                <h2 class="title">PayTM Number</h2>
                <h3 class="body-1">Please enter the number associated with your PayTM account</h3>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="mt-6">
                    <v-text-field
                      filled=""
                      label="PayTM Number"
                      v-model="formInputs.paytmNumberInput"
                      :rules="paytmNumberValidationRules"
                    ></v-text-field>

                  </v-form>
                </v-col>
                <h2 class="title">PayTM Name</h2>
                <h3 class="body-1">Please enter the name associated with your PayTM account</h3>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="mt-6">
                    <v-text-field
                      filled=""
                      label="PayTM Name"
                      v-model="formInputs.paytmNameInput"
                      :rules="paytmNameValidationRules"
                    ></v-text-field>

                  </v-form>
                </v-col>
                <v-row
                  justify="space-between"
                  class="ma-2"
                >
                  <v-btn
                    class="my-4 mx-4"
                    text
                    outlined
                    @click="goToStep(2)"
                  >Back</v-btn>
                  <v-btn
                    class="my-4"
                    elevation="0"
                    color="primary"
                    :disabled="!page3Complete"
                    @click="checkAndGoToStepFour()"
                  >Continue
                  </v-btn>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="4">
                <h2 class="title">PAN Card Front and Back</h2>
                <h3 class="body-1">Submit scanned images of your PAN Card</h3>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="mt-6">
                    <v-file-input
                      filled=""
                      display-size
                      accept="image/*"
                      chips
                      v-model="formInputs.panImage1Input"
                      label="PAN Scanned Image - Front"
                      persistent-hint="Upload the front of the PAN Card"
                    ></v-file-input>
                    <v-file-input
                      filled=""
                      display-size
                      accept="image/*"
                      chips
                      v-model="formInputs.panImage2Input"
                      label="PAN Scanned Image - Back"
                      persistent-hint="Upload the back of the PAN Card"
                    ></v-file-input>
                  </v-form>
                </v-col>
                <v-divider class="my-4"></v-divider>
                <h2 class="title">Photograph of your shop</h2>
                <h3 class="body-1">Submit photo of your shop</h3>
                <v-col
                  class="pa-0"
                  cols="12"
                  lg="6"
                >
                  <v-form class="mt-6">
                    <v-file-input
                      filled=""
                      display-size
                      accept="image/*"
                      chips=""
                      v-model="formInputs.shopImageInput"
                      label="Shop Photo"
                    ></v-file-input>

                  </v-form>
                </v-col>
                <v-divider>

                </v-divider>

                <v-row
                  justify="space-between"
                  class="ma-2"
                >
                  <v-btn
                    class="my-4 mx-4"
                    text
                    outlined
                    @click="goToStep(3)"
                  >Back</v-btn>
                  <v-btn
                    class="my-4"
                    elevation="0"
                    color="primary"
                    :disabled="!page4Complete"
                    @click="startOtpProcess()"
                  >Continue
                  </v-btn>
                </v-row>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-layout>

    <v-dialog
      transition="scroll-y-transition"
      persistent
      fullscreen
      v-model="isSuccessDialogVisible"
    >

      <v-card class="py-4">
        <v-row
          justify="center"
          class="ma-0 pa-0 my-4"
        >
          <v-card-title class="display-3 text-center primary--text">Registration Sent</v-card-title>
        </v-row>
        <v-row
          justify="center"
          class="ma-0 pa-0 my-4"
        >
          <v-icon
            size="200"
            class="text-center"
            color="success"
          >mdi-check</v-icon>
        </v-row>
        <v-card-text>
          <p class="text-center headline"><b>Your registration has been sent for approval. We will verify the details you provided. </b></p>

          <p class="text-center">You’ll be able to access your account once the administrator approves your request.

            You will be contacted by the administrator shortly.</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            flat
            class="mx-4"
            @click="routeToLogin()"
          >Okay</v-btn>
          <v-spacer></v-spacer>

        </v-card-actions>
      </v-card>

    </v-dialog>
    <v-dialog
      v-model="isSubmitDialogVisible"
      max-width="500"
      persistent=""
    >
      <v-card>
        <v-card-title>
          Sending your registration
          <v-spacer></v-spacer>
          <v-progress-circular indeterminate=""></v-progress-circular>

        </v-card-title>
        <v-card-text>
          <h1 class="subtitle-1">We are uploading your submission, please wait...</h1>
          <p class="subtitle-2">{{ submissionProgressMessage }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isOTPDialogVisible"
      max-width="550"
      persistent=""
    >
      <v-card>
        <v-card-title class="mb-4">
          Verify phone number
        </v-card-title>
        <v-card-text>
          <div v-if="isOtpSent">
            <h1 class="body-1">OTP has been sent to your phone number <b>+91 {{ formInputs.phoneNumberInput }}</b></h1>
            <v-text-field
              label="OTP"
              filled
              single-line
              persistent-hint
              v-model="OTPInput"
              class="my-4"
              hint="Please enter the verification code here"
            ></v-text-field>
            <v-row justify="end">

              <v-btn
                color="primary"
                class="mx-3"
                :loading="isVerifying"
                @click="verifyOTP(); isVerifying = true;"
              >Verify</v-btn>
            </v-row>
          </div>
          <h1
            class="body-1"
            v-else
          >
            <v-progress-circular
              size="20"
              indeterminate=""
              width="2"
              class="mr-2"
            ></v-progress-circular>
            Sending OTP to your number <b>+91{{ formInputs.phoneNumberInput }}</b>
          </h1>

        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script lang='ts'>
import Vue from "vue";
import firebase from "firebase";
import { createVendorMutation } from "../../graphql/createVendor";
import { validateVendorArgumentsMutation } from "../../graphql/validateVendorArguments";

import gql from "graphql-tag";
export default Vue.extend({
  name: "Register",

  computed: {
    page1Complete: function() {
      if (
        this.formInputs.phoneNumberInput != null &&
        this.formInputs.emailAddressInput != null &&
        /.+@.+/.test(this.formInputs.emailAddressInput) != false &&
        this.formInputs.passwordInput != null &&
        this.formInputs.passwordInput.length >= 6 &&
        this.formInputs.confirmPasswordInput == this.formInputs.passwordInput
      ) {
        return true;
      }
      return false;
    },
    page2Complete: function() {
      if (
        this.formInputs.storeNameInput != null &&
        this.formInputs.addressLineInput != null &&
        this.formInputs.pincodeInput != null &&
        this.formInputs.cityInput != null &&
        this.formInputs.gstInput != null &&
        this.formInputs.addressPhoneInput != null
      ) {
        return true;
      }
      return false;
    },
    page3Complete: function() {
      if (
        this.formInputs.bankAccountHolderInput != null &&
        this.formInputs.bankAccountNumberInput != null &&
        this.formInputs.bankIFSCInput != null
      ) {
        return true;
      }
      return false;
    },
    page4Complete: function() {
      if (
        this.formInputs.panImage1Input != null &&
        this.formInputs.panImage2Input != null &&
        this.formInputs.shopImageInput != null
      ) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    //Initing recaptcha
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
  methods: {
    async checkAndGoToStepTwo() {
      var vm = this;
      //Check if phone and email are available
      await this.$apollo
        .mutate({
          mutation: validateVendorArgumentsMutation,
          variables: {
            phoneNumber: this.formInputs.phoneNumberInput,
            email: this.formInputs.emailAddressInput
          }
        })
        .then(function(data) {
          data = data.data.validateVendorArguments;
          if (data.phoneNumber == false && data.email == false) {
            vm.goToStep(2);
          } else {
            if (data.phoneNumber == true) {
              alert(
                "The phone number you provided already exists, please use a different phone number."
              );
            }
            if (data.email == true) {
              alert(
                "The email address you provided already exists, please use a different email address"
              );
            }
          }
        });
    },
    async checkAndGoToStepFour() {
      var vm = this;
      //Check if phone and email are available
      await this.$apollo
        .mutate({
          mutation: validateVendorArgumentsMutation,
          variables: {
            bankAccountNumber: this.formInputs.bankAccountNumberInput
          }
        })
        .then(function(data) {
          console.log("Validate returned: ", data);
          data = data.data.validateVendorArguments;
          if (data.bankAccountNumber == false) {
            vm.goToStep(4);
          } else {
            if (data.bankAccountNumber == true) {
              alert(
                "The account number already exists. Please check and try again."
              );
            }
          }
        });
    },
    startOtpProcess() {
      //Opening OTP Dialog
      this.isOTPDialogVisible = true;
      let vm = this;
      var appVerifier = this.appVerifier;
      var phoneNumber = "+91" + this.formInputs.phoneNumberInput;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function(smsSentResult) {
          (<any>window).confirmationResult = smsSentResult;
          vm.isOtpSent = true;
          console.log("OTP has been sent ", smsSentResult);
        })
        .catch(function(error) {
          console.log("Something went wrong with OTP: " + error);
        });
    },
    verifyOTP() {
      let vm = this;
      let otp = this.OTPInput;
      (<any>window).confirmationResult
        .confirm(otp)
        .then(function(successResult) {
          var user = successResult.user;
          console.log("User from OTP: ", user);
          //OTP Verification is successful
          vm.isOTPDialogVisible = false;
          vm.submitDetails();
          vm.isVerifying = false;
        })
        .catch(function(error) {
          //OTP incorrect or some error
          console.log("OTP ERROR: ", error);
          if (error.code == "auth/invalid-verification-code") {
            alert(
              "You entered an incorrect OTP, please enter the correct OTP."
            );
          }
          vm.isVerifying = false;
        });
    },
    routeToLogin() {
      this.$router.replace("/");
    },
    async goToStep(n: number) {
      this.currentStep = n;
    },
    checkIfPasswordsMatch() {
      if (
        this.formInputs.passwordInput != this.formInputs.confirmPasswordInput
      ) {
        return "Passwords do not match";
      }
    },
    async submitDetails() {
      var shopPhotoUrl = "";
      var panPhotoUrls = [];
      var promises = [];
      var vm = this;
      var userPhone = this.formInputs.phoneNumberInput;
      this.isSubmitDialogVisible = true;
      this.submissionProgressMessage = "Uploading your images (Step 1/2)";
      var storageRef = firebase.storage().ref();
      var shopPhotoRef = storageRef.child(`${userPhone}/shop.jpg`);
      this.formInputs.panImagesInput = [];
      this.formInputs.panImagesInput = [
        this.formInputs.panImage1Input,
        this.formInputs.panImage2Input
      ];
      await this.formInputs.panImagesInput.forEach(async (image, i) => {
        var panPhotoRef = storageRef.child(`${userPhone}/pan${i}.jpg`);
        var uploadTask = panPhotoRef.put(image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            vm.uploadProgress = progress;
            console.log("Upload is " + progress + "% done");
          },
          function(error) {
            console.log("FIREBASE ERROR", error);
          },
          async function() {
            await uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                console.log("Returned URL ", downloadURL);
                panPhotoUrls.push(downloadURL);
              });
          }
        );
      });
      await Promise.all(promises);
      this.submissionProgressMessage = "Uploading your images (Step 2/2)";
      await shopPhotoRef
        .put(this.formInputs.shopImageInput)
        .then(async function(snapshot) {
          console.log("Shop Uploaded");
          await shopPhotoRef.getDownloadURL().then(function(url) {
            console.log("Got URL for SHOP: " + url);
            shopPhotoUrl = url;
          });
        });
      this.submissionProgressMessage = "Contacting our server";
      await this.$apollo
        .mutate({
          mutation: createVendorMutation,
          variables: {
            storeName: this.formInputs.storeNameInput,
            phoneNumber: this.formInputs.phoneNumberInput,
            email: this.formInputs.emailAddressInput,
            password: this.formInputs.passwordInput,
            pancardPhotoUrls: JSON.stringify(panPhotoUrls),
            shopPhotoUrl: shopPhotoUrl,
            address: {
              name: this.formInputs.storeNameInput,
              addressLine: this.formInputs.addressLineInput,
              landmark: this.formInputs.landmarkInput,
              city: this.formInputs.cityInput,
              phoneNumber: this.formInputs.addressPhoneInput,
              pinCode: this.formInputs.pincodeInput
            },
            bankAccountName: this.formInputs.bankAccountHolderInput,
            bankAccountIFSC: this.formInputs.bankIFSCInput,
            bankAccountNumber: this.formInputs.bankAccountNumberInput,
            vendorGSTNumber: this.formInputs.gstInput,
            paytmName: this.formInputs.paytmNameInput,
            paytmNumber: this.formInputs.paytmNumberInput,
            alternativePhone1: this.formInputs.alternatePhone1Input,
            alternativePhone2: this.formInputs.alternatePhone2Input
          }
        })
        .then(
          data => {
            console.log("Returned from mutation: ", data);
            if (data.errors == null) {
              localStorage.setItem(
                "apollo-token",
                data.data.createVendor.jwtToken
              );
              this.isSubmitDialogVisible = false;
              this.isSuccessDialogVisible = true;
            }
          },
          error => {
            console.error("Error during mutation: ", error);
            alert("There was an error: " + error);
          }
        );
    }
  },
  data: () => ({
    currentStep: 1,
    appVerifier: "",
    submissionProgressMessage: "null",
    isOtpSent: false,
    panPhotoUrls: [],
    shopPhotoUrl: null,
    OTPInput: null,
    isVerifying: false,
    isPhoneAvailable: false,
    isEmailAvailable: false,
    isBankAccountAvailable: false,
    formInputs: {
      phoneNumberInput: null,
      emailAddressInput: null,
      passwordInput: null,
      confirmPasswordInput: null,
      storeNameInput: null,
      addressLineInput: null,
      landmarkInput: null,
      addressPhoneInput: null,
      pincodeInput: null,
      shopImageInput: null,
      panImagesInput: null,
      cityInput: null,
      gstInput: null,
      bankAccountHolderInput: null,
      bankAccountNumberInput: null,
      bankIFSCInput: null,
      paytmNameInput: null,
      paytmNumberInput: null,
      alternatePhone1Input: null,
      alternatePhone2Input: null,
      panImage1Input: null,
      panImage2Input: null
    },
    passwordsMatch: true,
    phoneNumberValidationRules: [
      v => !!v || "Phone Number is required",
      v => (v != null && v.length >= 10) || "Phone Number must be valid"
    ],
    emailAddressValidationRules: [
      v => !!v || "Email Address is required",
      v => /.+@.+/.test(v) || "Email Address must be valid"
    ],
    passwordValidationRules: [
      v => !!v || "Password is required",
      v =>
        (v != null && v.length > 5) ||
        "Password length is short (min 6 characters)"
    ],
    confirmPasswordValidationRules: [v => !!v || "Password is required"],
    storeNameValidationRules: [v => !!v || "Store name is required"],
    addressLineValidationRules: [v => !!v || "Address is required"],
    cityValidationRules: [v => !!v || "City is required"],
    pincodeValidationRules: [v => !!v || "Pin Code is required"],
    bankAccountNumberValidationRules: [v => !!v || "A/C Number is required"],
    paytmNameValidationRules: [v => !!v || "PayTM Name is required"],
    paytmNumberValidationRules: [
      v => !!v || "PayTM Number is required",
      v => (v != null && v.length >= 10) || "PayTM Number must be valid"
    ],
    bankIFSCValidationRules: [v => !!v || "IFSC Code is required"],
    GSTValidationRules: [v => !!v || "GST Number is required"],
    isSuccessDialogVisible: false,
    isSubmitDialogVisible: false,
    isOTPDialogVisible: false
  })
});
</script>

<style>
</style>