<template>
  <div style="background-color:white;">
    <v-app>
      <v-content>
        <router-view></router-view>

        <v-dialog
          v-model="showDialog"
          fullscreen
        >
          <v-card>
            <v-card-title class="pt-4 display-1 font-weight-light primary--text">
              Are you on mobile? We have an app for your device.
            </v-card-title>
            <v-card-text>
              <h1 class="font-weight-regular subtitle-1 mt-4"> For the best experience on your mobile device, we recommend that you use the mobile app.
              </h1>
              <v-spacer></v-spacer>
            </v-card-text>

            <v-card-actions>

              <v-col>
                <v-row class="mx-2">
                  <v-btn
                    block
                    rounded
                    color="primary"
                  >Download app</v-btn>
                </v-row>
                <v-row class="mt-4 mx-2">
                  <v-btn
                    block
                    rounded
                    outlined=""
                    text
                    color="primary"
                    @click="showDialog = false;"
                  >Maybe later</v-btn>
                </v-row>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-bottom-sheet
          v-model="isOfflineDialogVisible"
          persistent
        >
          <v-sheet>
            <v-list class="ml-4">
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon
                    color="grey"
                    size="36"
                  >mdi-cloud-off-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="title red--text">
                    Unable to connect to the server
                  </v-list-item-title>
                  <v-list-item-content>
                    <p>Looks like we're offline. Please check your internet connection. Functionality will be restored when a connection is available.</p>
                  </v-list-item-content>
                </v-list-item-content>

              </v-list-item>
            </v-list>
          </v-sheet>
        </v-bottom-sheet>
      </v-content>
      <v-footer>
        <v-spacer></v-spacer>

        <div class="caption">BeShoppi platform &copy; BeShoppi {{ new Date().getFullYear() }} - <a
            target="_blank"
            href="https://roshanrahman.github.io/emart-web/about.html"
          >About the developers</a></div>

      </v-footer>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Login from "./views/Login/Login.vue";
import Register from "./views/Login/Register.vue";
import Dashboard from "./views/VendorDashboard/Dashboard.vue";
import gql from "graphql-tag";

export default Vue.extend({
  name: "App",
  mounted() {
    this.showDialog = this.$vuetify.breakpoint.xsOnly;
  },
  components: {
    Login,
    Register
  },
  apollo: {
    checkNetwork: {
      query: gql`
        query {
          checkNetwork
        }
      `,
      pollInterval: 3000
    }
  },
  computed: {
    isOfflineDialogVisible: function() {
      if (this.checkNetwork == "connected") {
        return false;
      }
      return true;
    }
  },
  data: () => ({
    checkNetwork: "connected",
    showDialog: true
  }),
  methods: {}
});
</script>

<style>
</style>
