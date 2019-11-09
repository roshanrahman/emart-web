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
      <v-row>
        <v-card
          v-for="url in JSON.parse(review.images)"
          :key="url"
          class="ma-4 pa-4"
          outlined
        >
          <a
            :href="url"
            target="_blank"
          >
            <v-img
              :src="url"
              max-height="200"
              width="200"
              contain
            ></v-img>
          </a>
          <v-row
            justify="center"
            class="mt-4"
          >
            <a
              :href="url"
              target="_blank"
            >View full image<v-icon
                small
                right
              >mdi-open-in-new</v-icon></a>
          </v-row>
        </v-card>
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