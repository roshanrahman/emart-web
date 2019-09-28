<template>
  <v-card
    outlined
    tile
    class="pa-12 ma-4"
  >
    <h1 class="text-center display-1">Welcome to App, <span class="primary--text">{{ loggedInUser.storeName }}</span></h1>
    <h2 class="text-center body-1 my-4">You are a registered vendor on App. Manage your inventory, check your orders and supercharge your business!</h2>

    <v-row justify="center">
      <v-col
        cols="12"
        lg="6"
      >
        <RecommendedActionsComponent @emitRoute="emitRoute"></RecommendedActionsComponent>
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
import RecommendedActionsComponent from "../../components/RecommendedActionsComponent.vue";
import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
export default Vue.extend({
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    }
  },
  components: {
    QuickStatisticsComponent,
    RecommendedActionsComponent
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