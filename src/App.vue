<template>
  <div style="background-color:white;">
    <v-app>
      <v-content>
        <router-view></router-view>
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
    checkNetwork: "connected"
  }),
  methods: {}
});
</script>

<style>
</style>
