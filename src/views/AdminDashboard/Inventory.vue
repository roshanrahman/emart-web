<template>
  <v-card
    outlined
    tile
    class="pa-12"
  >
    <v-row justify="space-between">
      <h1 class=" display-1 primary--text mx-2"><b>Inventory</b></h1>
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
      View all products being sold on the platform, including yours.
    </h2>
    <v-alert
      color="warning"
      dark
      text=""
      icon="mdi-alert-outline"
      class="mt-4"
      v-if="outOfStock"
    >
      Some items are out of stock.
    </v-alert>
    <v-alert
      color="warning"
      dark
      text=""
      class="mt-4"
      icon="mdi-alert-outline"
      v-if="unAnswered"
    >
      Some items have unanswered questions.
    </v-alert>
    <v-divider class="my-8"></v-divider>
    <v-row align="center">
      <v-btn
        outlined
        rounded
        text
        color="primary"
        @click="isAddInventoryDialogVisible = true; key = key + 1;"
      >
        <v-icon left>mdi-plus</v-icon>
        Add new item
      </v-btn>
      <v-spacer></v-spacer>

      <v-text-field
        label="Search"
        single-line
        v-model="searchQuery"
        append-icon="mdi-magnify"
      ></v-text-field>

    </v-row>

    <v-row class="mt-8">
      <v-data-table
        :items="!!getAllInventory.inventory ? getAllInventory.inventory : []"
        :headers="headers"
        :loading="$apollo.loading"
        no-data-text="No items found"
        loading-text="Fetching data, please wait..."
        sort-by="name"
        :items-per-page="100"
        :search="searchQuery"
      ><template v-slot:item.inStock="{ item }">
          <v-row>
            <span v-if="item.inStock >= 1"> {{ item.inStock }}</span>
            <span
              v-else
              class="red--text"
            >0 <v-icon
                right
                small
                color="red"
              >mdi-alert</v-icon></span>
          </v-row>
        </template>
        <template v-slot:item.image="{ item }">
          <v-avatar
            size="48"
            color="white"
            class="ma-2"
          >
            <v-img :src="JSON.parse(item.imageUrl)[0]"></v-img>
          </v-avatar>
        </template>
        <template v-slot:item.description="{ item }">
          <v-badge overlap>
            <template
              title="There are unanswered questions for this item."
              v-slot:badge
              v-if="item.unAnswered > 0"
            > {{ item.unAnswered }}</template>
            <v-btn
              text
              outlined
              rounded
              small
              @click="currentItem = item; isShowInventoryDialogVisible = true;"
            >View details</v-btn>
          </v-badge>
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
        <template v-slot:item.actions="{ item }">
          <v-btn
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
          </v-btn>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                elevation="0"
                rounded
                color="red darken-1"
                v-on="on"
                @click="currentItem = item; isDeleteInventoryDialogVisible = true;"
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
      v-model="isAddInventoryDialogVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          <v-toolbar-title>Add new item

          </v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn
              icon
              @click="isAddInventoryDialogVisible = false;"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pa-8">

          <InventoryFormComponent
            @submit="runAddInventoryMutation"
            :key="key"
          ></InventoryFormComponent>

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
          <v-row justify="center">
            <v-col
              cols="12"
              md="8"
              lg="6"
            >
              <InventoryDetailsComponent
                :inventoryItem="currentItem"
                :key="currentItem.id"
              ></InventoryDetailsComponent>
            </v-col>
          </v-row>
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
      v-model="isDeleteInventoryDialogVisible"
    >
      <v-card>
        <v-card-title> Are you sure you want to delete {{ currentItem.name }}?</v-card-title>
        <v-card-text> You cannot undo this operation. </v-card-text>
        <v-card-actions>
          <v-spacer>

          </v-spacer>
          <v-btn
            text
            color="primary"
            @click="isDeleteInventoryDialogVisible = false;"
          >Cancel</v-btn>
          <v-btn
            elevation="0"
            outlined
            text
            color="red"
            @click="runDeleteInventoryMutation()"
          >
            Delete
          </v-btn>
        </v-card-actions>
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
          <h1 class="title primary--text text-center">Inventory</h1>
          <h2 class="body-2 grey--text text-center mb-4">Allows you to view and manage the products on sale on the platform</h2>
          <h3>Available Functions: </h3>
          <h4>Inventory List Table</h4>
          <ul>
            <li>Fetches all the items for sale by all the vendors.</li>
            <li>You can sort by clicking on the field headings.</li>
          </ul>
          <h4>Add new item</h4>
          <ul>
            <li>Click 'Add New Item' to open up the new item dialog.</li>
            <li>Enter the details, upload images, and click Submit to add your item.</li>
          </ul>
          <h4>View Details</h4>
          <ul>
            <li>Click 'View Details' to open up all the details about the item.</li>
          </ul>
          <h4>Respond to customer questions, and view reviews</h4>
          <ul>
            <li>Click 'View Details' to open up all the details about the item, and scroll to the questions/reviews section.</li>
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
import { getVendorInventory } from "../../graphql/getVendorInventory";
import InventoryFormComponent from "../../components/InventoryFormComponent";
import InventoryDetailsComponent from "../../components/InventoryDetailsComponent";
import { addNewInventoryMutation } from "../../graphql/addNewInventory";
import { updateInventoryMutation } from "../../graphql/updateInventory";
import { deleteInventoryMutation } from "../../graphql/deleteInventory";

export default Vue.extend({
  components: {
    InventoryFormComponent,
    InventoryDetailsComponent
  },
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    },

    outOfStock: function () {
      var outOfStock = 0;
      this.getVendorInventory.inventory.forEach(item => {
        if (item.inStock < 1) {
          outOfStock += 1;
        }
      });
      return outOfStock;
    },
    unAnswered: function () {
      var unAnswered = 0;
      this.getVendorInventory.inventory.forEach(item => {
        if (item.unAnswered > 0) {
          unAnswered += 1;
        }
      });
      return unAnswered;
    },
  },

  data () {
    return {
      headers: [
        {
          text: 'Image',
          value: 'image'
        },
        {
          text: 'Name',
          value: 'name'
        },

        {
          text: 'Sold by',
          value: 'vendor.storeName'
        },
        {
          text: 'Details',
          value: 'description'
        },
        {
          text: 'Original Price',
          value: 'originalPrice'
        },
        {
          text: 'Selling Price',
          value: 'sellingPrice'
        },
        {
          text: 'Quantity in Stock',
          value: 'inStock'
        },
        {
          text: 'Average Rating',
          value: 'averageRating'
        },
        {
          text: 'Actions',
          value: 'actions'
        }

      ],
      getAllInventory: {},
      isAddInventoryDialogVisible: false,
      isErrorDialogVisible: false,
      isHelpDialogVisible: false,
      isEditInventoryDialogVisible: false,
      isDeleteInventoryDialogVisible: false,
      isShowInventoryDialogVisible: false,
      currentItem: {},
      searchQuery: '',
      key: 0,
      error: {
        title: "",
        text: ""
      }
    }
  },
  methods: {
    async runAddInventoryMutation (item) {
      console.log('Emitted from form', item);
      this.isAddInventoryDialogVisible = false;
      await this.$apollo.mutate({
        mutation: addNewInventoryMutation,
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
    async runDeleteInventoryMutation () {
      this.isDeleteInventoryDialogVisible = false;
      await this.$apollo.mutate({
        mutation: deleteInventoryMutation,
        variables: {
          inventoryId: this.currentItem.id,
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
    getAllInventory: {
      query: getAllInventory,

      pollInterval: 3
    },
    getVendorInventory: {
      query: getVendorInventory,

      pollInterval: 3
    }
  },

});
</script>

<style>
</style>