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
            max-height="40"
            src="http://pngimg.com/uploads/tesla_logo/tesla_logo_PNG12.png"
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
          lg="6"
          md="8"
        >

          <h1 class="
          headline text-center my-4 primary--text">New Account Registration</h1>
          <p class="my-4 text-center body-1">Complete the registration form, submit documents and get approved by us. Once done, you can sign in and start your business.</p>

          <v-stepper
            class="mt-6 elevation-0"
            v-model="currentStep"
          >
            <v-stepper-header class="elevation-0">
              <v-stepper-step step="1">Account Credentials</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2">Store Details</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Upload Documents</v-stepper-step>

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
                  justify="end"
                  class="ma-2"
                >
                  <v-btn
                    class="my-4"
                    elevation="0"
                    color="primary"
                    :disabled="!page1Complete"
                    @click="goToStep(2)"
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

                    <v-text-field
                      filled=""
                      label="City"
                      v-model="formInputs.cityInput"
                      :rules="cityValidationRules"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-divider>

                </v-divider>
                <v-row
                  justify="end"
                  class="ma-2"
                >
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
                      multiple
                      chips
                      v-model="formInputs.panImagesInput"
                      label="PAN Scanned Images"
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
                  justify="end"
                  class="ma-2"
                >
                  <v-btn
                    class="my-4"
                    elevation="0"
                    color="primary"
                    :disabled="!page3Complete"
                    @click="submitDetails()"
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
          <v-card-title class="headline text-center primary--text">Registration Sent</v-card-title>
        </v-row>
        <v-row
          justify="center"
          class="ma-0 pa-0 my-4"
        >
          <v-icon
            size="96"
            class="text-center"
            color="success"
          >mdi-check</v-icon>
        </v-row>
        <v-card-text>
          <p class="text-center"><b>Your registration has been sent for approval. We will verify the details you provided. </b></p>

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
  </v-container>
</template>

<script lang='ts'>
import Vue from "vue";
import firebase from "firebase";
import { createVendorMutation } from "../../graphql/createVendor";
export default Vue.extend({
  name: "Register",
  computed: {
    page1Complete: function() {
      if (
        this.formInputs.phoneNumberInput != null &&
        this.formInputs.emailAddressInput != null &&
        this.formInputs.passwordInput != null &&
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
        this.formInputs.cityInput != null
      ) {
        return true;
      }
      return false;
    },
    page3Complete: function() {
      if (
        this.formInputs.panImagesInput != null &&
        this.formInputs.shopImageInput != null
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    routeToLogin() {
      this.$router.replace("/");
    },
    goToStep(n: number) {
      console.log("It Works");
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
              landmark: "null",
              city: this.formInputs.cityInput,
              phoneNumber: this.formInputs.phoneNumberInput
            }
          }
        })
        .then(data => {
          console.log("Returned from mutation: ", data);
          if (data.errors == null) {
            localStorage.setItem(
              "apollo-token",
              data.data.createVendor.jwtToken
            );
            this.isSubmitDialogVisible = false;
            this.isSuccessDialogVisible = true;
          }
        });
    }
  },
  data: () => ({
    currentStep: 1,
    submissionProgressMessage: "null",
    panPhotoUrls: [],
    shopPhotoUrl: null,
    formInputs: {
      phoneNumberInput: null,
      emailAddressInput: null,
      passwordInput: null,
      confirmPasswordInput: null,
      storeNameInput: null,
      addressLineInput: null,
      shopImageInput: null,
      panImagesInput: null,
      cityInput: null
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
      v => (v != null && v.length > 7) || "Password length is short"
    ],
    confirmPasswordValidationRules: [v => !!v || "Password is required"],
    storeNameValidationRules: [v => !!v || "Store name is required"],
    addressLineValidationRules: [v => !!v || "Address is required"],
    cityValidationRules: [v => !!v || "City is required"],
    isSuccessDialogVisible: false,
    isSubmitDialogVisible: false
  })
});
</script>

<style>
</style>