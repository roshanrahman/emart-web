<template>
  <v-card
    class="pa-3"
    outlined
  >
    <h1 class="title text-center  my-4">Quick Statistics</h1>

    <v-tabs>
      <v-tab>Today</v-tab>
      <v-tab>Past month</v-tab>
      <v-tab>All time</v-tab>

      <v-spacer></v-spacer>
      <v-btn
        text
        rounded
        color="primary"
      >View more</v-btn>

    </v-tabs>
    <v-sheet class="pa-4">
      <v-sparkline
        :value="[100,200,34,45,232,12]"
        auto-draw
        key="h"
        smooth="8"
        :gradient="['black', '']"
        line-width="2"
        labels="123456789"
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
    <v-row
      class="px-8"
      justify="end"
    >
      <h1 class="display-1 primary--text">Rs. 45,000</h1>

    </v-row>
    <v-row
      class="px-8"
      justify="end"
    >
      <h2 class="subtitle-1">20 orders</h2>
    </v-row>
  </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: 'QuickStatisticsComponent'
});
</script>

<style>
</style>