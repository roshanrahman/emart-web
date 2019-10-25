<template>
  <v-card
    class="pa-3"
    outlined
  >
    <h1 class="title text-center primary--text my-4">Recommended Actions</h1>

    <v-list>
      <v-list-item @click="changeRoute('vendor-inventory');">
        <v-list-item-avatar class="d-none d-lg-block">
          <v-icon class="grey lighten-1 white--text">mdi-cart</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="primary--text">Manage your inventory</v-list-item-title>
          <v-list-item-subtitle>Fill up the inventory by adding items for sale</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-arrow-right</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list-item @click="changeRoute('vendor-active-orders');">
        <v-list-item-avatar class="d-none d-lg-block">
          <v-icon class="grey lighten-1 white--text">mdi-inbox</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="primary--text">View your orders</v-list-item-title>
          <v-list-item-subtitle>View orders that come your way</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-arrow-right</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list-item @click="changeRoute('vendor-stats');">
        <v-list-item-avatar class="d-none d-lg-block">
          <v-icon class="grey lighten-1 white--text">mdi-chart-line</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="primary--text">View your statistics</v-list-item-title>
          <v-list-item-subtitle>Take a look at your statistics</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-arrow-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>

  </v-card>
</template>

<script>
import Vue from "vue";
export default {
  name: 'QuickStatisticsComponent',
  methods: {
    changeRoute (item) {
      console.log('clicked')
      this.$emit('emitRoute', item);
    }
  }
}
</script>

<style>
</style>