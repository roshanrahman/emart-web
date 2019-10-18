<template>
  <v-card
    class="pa-4"
    outlined
  >
    <h1
      class="title grey--text text-center"
      v-if="getReviews.reviews == 0"
    >No reviews yet</h1>
    <v-list>
      <v-list-item
        v-for="review in getReviews.reviews"
        :key="review.id"
      >
        <v-list-item-content>
          <h1 class="title"> {{ review.rating }} / 5</h1>
          <h2 class="subtitle-1"> {{ review.text }} </h2>
          <v-divider class="mt-3"></v-divider>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-card>
</template>

<script>
import { getReviews } from "../graphql/getReviews";

export default {
  props: ['reviewId'],
  apollo: {
    getReviews: {
      query: getReviews,
      variables () {
        return {
          inventoryId: this.reviewId
        }
      }
    }
  },
  data () {
    return {
      reviewId: 0
    }
  }

}
</script>

<style>
</style>