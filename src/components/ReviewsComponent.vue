<template>
  <div>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
      v-if="getReviews.reviews == 0"
    >
      <h2 class="title grey--text text-center">No reviews yet</h2>
    </v-card>
    <v-card
      v-for="review in getReviews.reviews"
      :key="review.id"
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <v-row
        align="center"
        class="ml-2"
      >
        <v-rating
          :value="review.rating"
          readonly
          dense
          color="primary"
          background-color="grey"
        ></v-rating>
        <h2 class="title mx-4 primary--text"> {{ review.rating }}/5</h2>
      </v-row>
      <v-row class="ml-2">
        <h2 class="subtitle-1 mt-2"> {{ review.text }} </h2>
      </v-row>
    </v-card>

  </div>
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