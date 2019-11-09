<template>
  <v-card
    outlined
    tile
    class="pa-12"
  >
    <v-row justify="space-between">
      <h1 class=" display-1 primary--text mx-2"><b>Offer Posters</b></h1>
      <v-btn
        icon
        color="primary"
        outlined
        text
        @click="isHelpDialogVisible = true;"
      >
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-row>
    <h2 class=" body-1 mt-2">
      Manage your offer posters/featured products on the platform
    </h2>

    <v-divider class="my-8"></v-divider>
    <v-row align="center">

      <v-btn
        outlined
        rounded
        text
        color="primary"
        @click="isAddPosterDialogVisible = true; key = key + 1;"
      >
        <v-icon left>mdi-plus</v-icon>
        Add new poster
      </v-btn>

    </v-row>

    <v-row class="mt-8">
      <v-data-table
        :items="!!getPosters ? onlyVendorPosters : []"
        :headers="headers"
        :loading="$apollo.loading"
        loading-text="Fetching data, please wait..."
        no-data-text="You don't have any posters yet"
        sort-by="name"
        :items-per-page="100"
      >
        <template v-slot:item.image="{ item }">
          <v-avatar
            size="48"
            color="white"
            class="ma-2"
          >
            <v-img :src="item.posterImage"></v-img>
          </v-avatar>
        </template>
        <template v-slot:item.description="{ item }">
          <v-btn
            text
            outlined
            rounded
            small
            @click="currentItem = item; isShowInventoryDialogVisible = true;"
          >View details</v-btn>
        </template>
        <template v-slot:item.sellingPrice="{ item }">
          <b>₹ {{item.sellingPrice }}</b>
        </template>
        <template v-slot:item.averageRating="{ item }">

          <v-chip small>
            <v-icon
              left
              small
            >mdi-star</v-icon>
            <span class="subtitle-2">{{item.averageRating }}</span>
          </v-chip>

        </template>
        <template v-slot:item.originalPrice="{ item }">
          ₹ {{item.originalPrice }}
        </template>
        <template v-slot:item.vendor.storeName="{ item }">
          {{item.vendor.storeName }}
          <v-chip
            small
            v-if="item.vendor.id == loggedInUser.id"
            color="primary"
          >You</v-chip>
        </template>
        <template v-slot:item.items="{ item }">
          <v-btn
            text
            outlined
            small
            rounded
            @click="currentItem = item; isItemDetailDialogVisible = true;"
          >View items</v-btn>
        </template>

        <template v-slot:item.actions="{ item }">
          <!-- <v-btn
            small
            outlined
            text
            rounded
            x-small
            class="mr-2"
            @click="currentItem = item; isEditInventoryDialogVisible = true;"
          >
            <v-icon
              left
              size="16"
            >mdi-pencil</v-icon>
            Edit
          </v-btn> -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                elevation="0"
                rounded
                color="red darken-1"
                v-on="on"
                @click="currentItem = item; isDeletePosterDialogVisible = true;"
              >
                <v-icon size="24">mdi-delete</v-icon>

              </v-btn>
            </template>
            <span>Delete item</span>
          </v-tooltip>

        </template>
      </v-data-table>
    </v-row>

    <v-dialog
      v-model="isAddPosterDialogVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          <v-toolbar-title>Add new poster

          </v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn
              icon
              @click="isAddPosterDialogVisible = false;"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pa-8">

          <AddPosterFormComponent
            @submit="runAddPosterMutation"
            :key="key"
          ></AddPosterFormComponent>

        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isEditInventoryDialogVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          <v-toolbar-title>Edit item {{ currentItem.name }}

          </v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn
              icon
              @click="isEditInventoryDialogVisible = false;"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pa-8">

          <InventoryFormComponent
            @submit="runUpdateInventoryMutation"
            :existingItem="currentItem"
            :key="currentItem.id"
          ></InventoryFormComponent>

        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isShowInventoryDialogVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          <v-toolbar-title>Details for {{ currentItem.name }}

          </v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn
              icon
              @click="isShowInventoryDialogVisible = false;"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pa-8">

          <InventoryDetailsComponent
            :inventoryItem="currentItem"
            :key="currentItem.id"
          ></InventoryDetailsComponent>

        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="400"
      v-model="isErrorDialogVisible"
    >
      <v-card>
        <v-card-title> {{ error.title }} </v-card-title>
        <v-card-text> {{ error.text }} </v-card-text>
        <v-card-actions>
          <v-spacer>

          </v-spacer>
          <v-btn
            text
            color="primary"
            @click="isErrorDialogVisible = false;"
          >Got it</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="400"
      v-model="isDeletePosterDialogVisible"
    >
      <v-card>
        <v-card-title> Are you sure you want to delete this poster?</v-card-title>
        <v-card-text> You cannot undo this operation. </v-card-text>
        <v-card-actions>
          <v-spacer>

          </v-spacer>
          <v-btn
            text
            color="primary"
            @click="isDeletePosterDialogVisible = false;"
          >Cancel</v-btn>
          <v-btn
            elevation="0"
            outlined
            text
            color="red"
            @click="runDeletePosterMutation()"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isItemDetailDialogVisible"
      max-width="600"
    >
      <v-card>
        <v-card-title>
          <v-flex>
            Items in this poster
          </v-flex>
          <v-btn
            text
            color="primary"
            @click="isItemDetailDialogVisible = false;"
          >Close</v-btn>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="item in currentItem.inventories"
              :key="item.id"
            >
              <v-list-item-avatar>
                <v-avatar>
                  <v-img :src="JSON.parse(item.imageUrl)[0]"></v-img>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>

                <v-list-item-title>{{ item.name }}</v-list-item-title>

              </v-list-item-content>

              <h2 class="subtitle-1"> ₹ {{item.sellingPrice}} </h2>

            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isHelpDialogVisible"
      max-width="600"
    >
      <v-card>
        <v-card-title>
          <v-flex>
            Help
          </v-flex>
          <v-btn
            text
            color="primary"
            @click="isHelpDialogVisible = false;"
          >Close</v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <h1 class="title primary--text text-center">Offer Posters</h1>
          <h2 class="body-2 grey--text text-center mb-4">Allows you to view and manage the offer posters put up by you.</h2>
          <h3>Available Functions: </h3>
          <h4>Offer Posters Table</h4>
          <ul>
            <li>Fetches all the offer posters uploaded by you.</li>
            <li>You can sort by clicking on the field headings.</li>
          </ul>
          <h4>Delete Poster</h4>
          <ul>
            <li>Remove a poster from being shown by deleting it.</li>
          </ul>

        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { getAllInventory } from "../../graphql/getAllInventory";
import { getPosters } from "../../graphql/getPosters";
import InventoryFormComponent from "../../components/InventoryFormComponent";
import AddPosterFormComponent from "../../components/AddPosterFormComponent";
import InventoryDetailsComponent from "../../components/InventoryDetailsComponent";
import { addPosterMutation } from "../../graphql/addPoster";
import { updateInventoryMutation } from "../../graphql/updateInventory";
import { deletePosterMutation } from "../../graphql/deletePoster";

export default Vue.extend({
  components: {
    InventoryFormComponent,
    InventoryDetailsComponent,
    AddPosterFormComponent
  },
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    },
    onlyVendorPosters: function () {
      if (!!this.getPosters == false) {
        return [];
      }
      var l = [];
      return this.getPosters.filter((poster) => {
        return poster.vendor.id == this.loggedInUser.id;
      });
    }
  },

  data () {
    return {
      headers: [
        {
          text: 'Image',
          value: 'image'
        },

        {
          text: 'Items',
          value: 'items'
        },
        {
          text: "Actions",
          value: 'actions'
        }

      ],
      getAllInventory: {},
      isAddPosterDialogVisible: false,
      isErrorDialogVisible: false,
      isEditInventoryDialogVisible: false,
      isDeletePosterDialogVisible: false,
      isShowInventoryDialogVisible: false,
      isItemDetailDialogVisible: false,
      isHelpDialogVisible: false,
      currentItem: {},
      key: 0,
      error: {
        title: "",
        text: ""
      }
    }
  },
  methods: {
    async runAddPosterMutation (item) {
      console.log('Emitted from form', item);
      this.isAddPosterDialogVisible = false;
      await this.$apollo.mutate({
        mutation: addPosterMutation,
        variables: {
          ...item
        }
      }).then((result) => console.log('Mutation succeeded', result),
        (reason) => {
          console.log("Error: ", reason);
          this.error.title = "Server returned error.";
          this.error.text = reason;
          this.isErrorDialogVisible = true;
        });

    },
    async runUpdateInventoryMutation (item) {
      console.log('Emitted from form', item);
      this.isEditInventoryDialogVisible = false;
      await this.$apollo.mutate({
        mutation: updateInventoryMutation,
        variables: {
          inventoryId: this.currentItem.id,

          ...item
        }
      }).then((result) => console.log('Mutation succeeded', result),
        (reason) => {
          this.error.title = "Server returned error.";
          this.error.text = reason;
          this.isErrorDialogVisible = true;
        });

    },
    async runDeletePosterMutation () {
      this.isDeletePosterDialogVisible = false;
      await this.$apollo.mutate({
        mutation: deletePosterMutation,
        variables: {
          posterId: this.currentItem.id,
        }
      }).then((result) => console.log('Mutation succeeded', result),
        (reason) => {
          this.error.title = "Server returned error.";
          this.error.text = reason;
          this.isErrorDialogVisible = true;
        });
    }
  },
  apollo: {
    getPosters: {
      query: getPosters,
      pollInterval: 3
    },
    getAllInventory: {
      query: getAllInventory,

      pollInterval: 3
    }
  },

});
</script>

<style>
</style>