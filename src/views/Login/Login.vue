<template>

  <v-container
    class="bg"
    fluid
    fill-height
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        lg="3"
        md="6"
        sm="8"
        class="ma-8"
        align-self="center"
      >
        <v-row
          justify="center"
          align="center"
          class="ma-0 pa-0"
        >
          <v-img
            class="mb-6"
            max-height="100"
            max-width="400"
            contain
            src='https://upload.wikimedia.org/wikipedia/commons/9/95/Transparent_google_logo_2015.png'
          ></v-img>
        </v-row>
        <v-col
          class="rounded-card ma-2 pa-8"
          elevation="0"
          outlined
        >
          <v-form>
            <v-text-field
              solo
              label="Phone Number"
              v-model="usernameInput"
              type="tel"
            ></v-text-field>
            <v-text-field
              solo
              label="Password"
              type="password"
              v-model="passwordInput"
            ></v-text-field>

          </v-form>
          <v-row
            justify="end"
            class="mx-1"
          >

            <v-btn
              color="primary"
              large
              :disabled="!isValidated"
              @click="login()"
              :loading="isBusy"
            >Login</v-btn>
          </v-row>
        </v-col>

        <v-row
          align="center"
          justify="center"
        >
          <v-divider
            class="my-8"
            dark
          >
          </v-divider>
          <h1 class="ma-4 subtitle-2 white--text">OR</h1>
          <v-divider
            class="my-8"
            dark
          >
          </v-divider>
        </v-row>

        <v-row
          justify="center"
          class="my-6"
        >
          <v-btn
            outlined
            text
            dark
            rounded=""
            @click="goToRegister()"
          >Register new account</v-btn>
        </v-row>

      </v-col>
    </v-row>
    <v-dialog
      max-width="400"
      v-model="isErrorDialogVisible"
    >
      <v-card>
        <v-card-title> {{ error.title }} </v-card-title>
        <v-card-text> {{ error.text }} </v-card-text>
        <v-card-actions>
          <v-spacer>

          </v-spacer>
          <v-btn
            text
            color="primary"
            @click="isErrorDialogVisible = false;"
          >Got it</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang='ts'>
import Vue from "vue";
import { vendorLogin } from "../../graphql/vendorLogin";
import { LoginSessionHandler } from "../../helpers/loginSessionHandler";

export default Vue.extend({
  computed: {
    isValidated: function() {
      return !!this.usernameInput && !!this.passwordInput;
    }
  },
  data() {
    return {
      error: {
        text: "",
        title: ""
      },
      isErrorDialogVisible: false,
      usernameInput: "",
      passwordInput: "",
      isBusy: false
    };
  },
  methods: {
    goToRegister() {
      this.$router.push("register");
    },
    async login() {
      this.isBusy = true;
      this.$apollo
        .mutate({
          mutation: vendorLogin,
          variables: {
            phoneNumber: this.usernameInput,
            password: this.passwordInput
          }
        })
        .then(data => {
          console.log("Returned from login ", data);
          //On no error ->
          if (!!data.data.vendorLogin.error == false) {
            LoginSessionHandler.setLogin(
              JSON.stringify(data.data.vendorLogin.user),
              data.data.vendorLogin.jwtToken
            );
            this.isBusy = false;
            if (data.data.vendorLogin.user.admin) {
              this.$router.replace("/admin");
            } else {
              this.$router.replace("/vendor");
            }
          }
          //Error handling ->
          if (!!data.data.vendorLogin.error || !!data.errors) {
            var error = data.data.vendorLogin.error;
            if (error.message == "NO_ACCOUNT") {
              this.error.title = "No account found";
              this.error.text =
                "There is no account registered with the phone number. Please register a new account.";
            }
            if (error.message == "password is not valid") {
              this.error.title = "Incorrect password";
              this.error.text = "Please enter the correct password.";
            }
            this.isErrorDialogVisible = true;
            this.isBusy = false;
          }
        });
    }
  }
});
</script>

<style>
.bg {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
      to bottom,
      rgba(3, 35, 65, 0.75),
      rgba(2, 16, 48, 0.9)
    ),
    url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
}

.v-card.rounded-card {
  border-radius: 8px;
}
</style>