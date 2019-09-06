<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Login from "./views/Login/Login.vue";
import Register from "./views/Login/Register.vue";
import Dashboard from "./views/VendorDashboard/Dashboard.vue";

export default Vue.extend({
  name: "App",
  components: {
    Login,
    Register
  },
  data: () => ({}),
  methods: {}
});
</script>

<style>
</style>
