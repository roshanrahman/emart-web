<template>
  <v-card
    class="mx-auto pa-4"
    elevation="0"
  >
    <v-row>
      <v-col
        cols="12"
        md="4"
      >

        <v-img
          v-for="url in JSON.parse(inventoryItem.imageUrl)"
          :key="url"
          :src="url"
          contain
          class="mb-2"
          max-height="800"
        ></v-img>

      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-list two-line>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle> Name </v-list-item-subtitle>
              <v-list-item-title class="headline">{{ inventoryItem.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle> Category </v-list-item-subtitle>
              <v-list-item-title class="headline">{{ inventoryItem.category }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle> Description </v-list-item-subtitle>
              <h1 class="title">{{ inventoryItem.description }}</h1>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle> Pricing </v-list-item-subtitle>
              <v-list-item-title>
                <h1 class="headline primary--text">₹ {{ inventoryItem.sellingPrice }}</h1>
                <h1 class="striked subtitle-1">₹ {{ inventoryItem.originalPrice }}</h1>

              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle> Quantity in Stock </v-list-item-subtitle>
              <v-list-item-title class="headline">{{ inventoryItem.inStock }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-4"></v-divider>
          <v-list-item v-if="!!inventoryItem.vendor">
            <v-list-item-content>
              <v-list-item-subtitle> Sold by </v-list-item-subtitle>
              <v-list-item-title class="headline">{{ inventoryItem.vendor.storeName }}</v-list-item-title>
              <h1 class="subtitle-1">{{ JSON.parse(inventoryItem.vendor.address).addressLine }}, {{ JSON.parse(inventoryItem.vendor.address).city }}</h1>

            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-4"></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title primary--text">Average Rating</v-list-item-title>
              <v-list-item-title class="headline"> {{ inventoryItem.averageRating }} / 5 </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-4"></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title primary--text">Reviews by customers</v-list-item-title>
              <ReviewsComponent
                class="mt-4"
                :reviewId="inventoryItem == {} ? 0 : inventoryItem.id"
              ></ReviewsComponent>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-4"></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title primary--text">Questions by customers</v-list-item-title>
              <QuestionsComponent
                class="mt-4"
                :itemId="inventoryItem == {} ? 0 : inventoryItem.id"
              ></QuestionsComponent>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import QuestionsComponent from "./QuestionsComponent";
import ReviewsComponent from "./ReviewsComponent";

export default {
  props: ['inventoryItem'],
  components: {
    QuestionsComponent,
    ReviewsComponent
  }
}
</script>

<style>
</style>