<template>
  <v-card
    outlined
    tile
    class="pa-12 ma-4"
  >
    <h1 class=" display-1">Profile</h1>

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