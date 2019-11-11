<template>
  <v-card
    class="mx-auto pa-4"
    elevation="0"
  >
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <h3 class="subtitle-2 grey--text">Product Name</h3>
      <h1 class="title"> {{ inventoryItem.name }}</h1>
    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <h3 class="subtitle-2 grey--text">Category</h3>
      <h1 class="title"> {{ inventoryItem.category }}</h1>
    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <h3 class="subtitle-2 grey--text">Images</h3>
      <v-row>
        <v-card
          v-for="url in JSON.parse(inventoryItem.imageUrl)"
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
              max-height="400"
              width="400"
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
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <h3 class="subtitle-2 grey--text">Pricing</h3>
      <h1 class="title">₹ {{ inventoryItem.sellingPrice }}</h1>
      <h1 class="title striked grey--text">₹ {{ inventoryItem.originalPrice }}</h1>

    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <h3 class="subtitle-2 grey--text">Quantity in stock</h3>
      <h1 class="title">{{ inventoryItem.inStock }}</h1>

    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <h3 class="subtitle-2 grey--text">Dimensions</h3>
      <h1 class="title">Length: {{ inventoryItem['length'] }} cm</h1>
      <h1 class="title">Breadth: {{ inventoryItem.breadth }} cm</h1>
      <h1 class="title">Height: {{ inventoryItem.height }} cm</h1>
    </v-card>

    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
      v-if="!!inventoryItem.vendor"
    >
      <h3 class="subtitle-2 grey--text">Sold by</h3>
      <h1 class="title">{{ inventoryItem.vendor.storeName }} ({{ inventoryItem.vendor.phoneNumber}})</h1>
      <h1 class="title grey--text">{{ JSON.parse(inventoryItem.vendor.address).addressLine }}, {{ JSON.parse(inventoryItem.vendor.address).city }}</h1>

    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <h3 class="subtitle-2 grey--text">Description</h3>
      <p>
        {{inventoryItem.description}}
      </p>
    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <h3 class="subtitle-2 grey--text">Average Rating</h3>
      <v-row class="pa-2">

        <v-rating
          :value="inventoryItem.averageRating"
          readonly
          color="primary"
          dense=""
          large=""
        ></v-rating>
        <h1 class="display-1 primary--text mx-6"> {{inventoryItem.averageRating }}/5</h1>

      </v-row>
    </v-card>
    <v-divider class="mt-8"></v-divider>
    <v-card
      class="pa-4 my-4"
      elevation="0"
      style="border-radius:8px;"
    >
      <h3 class="title primary--text">Reviews by customers</h3>
      <ReviewsComponent
        class="mt-4"
        :reviewId="inventoryItem == {} ? 0 : inventoryItem.id"
      ></ReviewsComponent>
    </v-card>
    <v-divider class="mt-8"></v-divider>
    <v-card
      class="pa-4 my-4"
      elevation="0"
      style="border-radius:8px;"
    >
      <h3 class="title primary--text">Questions by customers</h3>
      <QuestionsComponent
        class="mt-4"
        :item="inventoryItem == {} ? 0 : inventoryItem"
      ></QuestionsComponent>
    </v-card>

  </v-card>
</template>

<script>
import QuestionsComponent from "./QuestionsComponent";
import ReviewsComponent from "./ReviewsComponent";

export default {
  mounted () {
    try {
      console.log('Received ', this.inventoryItem);
      var a = JSON.parse(this.inventoryItem.vendor.address);
      var b = JSON.parse(this.inventoryItem.imageUrl);
      if (!!this.inventoryItem.vendor.storeName == false) {
        throw 'e';
      }
    } catch (error) {
      console.error(error);
    }
  },
  props: ['inventoryItem'],
  components: {
    QuestionsComponent,
    ReviewsComponent
  }
}
</script>

<style>
</style>