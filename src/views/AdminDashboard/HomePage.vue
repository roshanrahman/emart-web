<template>
  <v-card
    outlined
    tile
    class="pa-12"
  >
    <v-row justify="space-between">
      <h1 class=" display-1 mx-2 text-center"><b>Welcome <span class="primary--text">Administrator</span></b></h1>

    </v-row>
    <h2 class=" body-1 mt-2">
      Take a look at incoming orders, manage inventory, and spearhead your business!
    </h2>

    <v-divider class="my-8"></v-divider>

    <v-row justify="center">
      <v-col
        cols="12"
        lg="6"
      >
        <RecommendedActionsComponentAdmin @emitRoute="emitRoute"></RecommendedActionsComponentAdmin>
      </v-col>
      <v-col
        cols="12"
        lg="6"
      >
        <InsightsAdmin @emitRoute="emitRoute"></InsightsAdmin>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
import Vue from "vue";
import InsightsAdmin from "../../components/InsightsAdmin.vue";
import RecommendedActionsComponentAdmin from "../../components/RecommendedActionsComponentAdmin.vue";
import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
export default Vue.extend({
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    }
  },
  components: {
    InsightsAdmin,
    RecommendedActionsComponentAdmin
  },
  methods: {
    emitRoute (item) {
      this.$emit('changeRoute', item);
    }
  }
});
</script>

<style>
</style>