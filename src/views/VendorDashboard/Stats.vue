<template>
  <v-card
    outlined
    tile
    class="pa-12 ma-4"
  >
    <h1 class=" display-1">Your Statistics</h1>
    <h2 class=" body-1 my-4">View orders that are currently in processing</h2>

    <v-row>

    </v-row>

  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
export default Vue.extend({
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    }
  },
  components: {

  }
});
</script>

<style>
</style>