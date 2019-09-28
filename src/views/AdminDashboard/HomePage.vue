<template>
  <v-card
    outlined
    tile
    class="pa-12 ma-4"
  >
    <h1 class="text-center display-1">Welcome <span class="primary--text">Administrator</span></h1>
    <h2 class="text-center body-1 my-4">Take a look at incoming orders, manage inventory, and spearhead your business!</h2>

    <v-row justify="center">
      <v-col
        cols="12"
        lg="6"
      >
        <RecommendedActionsComponentAdmin @emitRoute="emitRoute"></RecommendedActionsComponentAdmin>
      </v-col>
      <!-- <v-col
        cols="12"
        lg="6"
      >
        <QuickStatisticsComponent></QuickStatisticsComponent>
      </v-col> -->
    </v-row>

  </v-card>
</template>

<script>
import Vue from "vue";
import QuickStatisticsComponent from "../../components/QuickStatisticsComponent.vue";
import RecommendedActionsComponentAdmin from "../../components/RecommendedActionsComponentAdmin.vue";
import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
export default Vue.extend({
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    }
  },
  components: {
    QuickStatisticsComponent,
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