<template>
  <v-card
    outlined
    tile
    class="pa-12"
  >
    <v-row justify="space-between">
      <h1 class=" display-1 mx-2 text-center"><b>Welcome to Be Shoppi, <span class="primary--text">{{ loggedInUser.storeName }}</span></b></h1>

    </v-row>
    <h2 class=" body-1 mt-2">
      You are a registered vendor on Be Shoppi. Manage your inventory, check your orders and supercharge your business!
    </h2>

    <v-divider class="my-8"></v-divider>

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