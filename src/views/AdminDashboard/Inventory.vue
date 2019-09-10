<template>
  <v-card
    outlined
    tile
    class="pa-12 ma-4"
  >
    <v-row>
      <h1 class=" display-1">Inventory</h1>
      <v-spacer></v-spacer>
      <!-- <v-btn
        rounded
        elevation="0"
        color="primary"
        @click="isAddInventoryDialogVisible = true; key = key + 1;"
      >
        <v-icon left>mdi-plus</v-icon>
        Add new item
      </v-btn> -->
    </v-row>

    <v-row class="mt-8">
      <v-data-table
        :items="!!getAllInventory.inventory ? getAllInventory.inventory : []"
        :headers="headers"
        :loading="$apollo.loading"
        loading-text="Fetching data, please wait..."
        sort-by="name"
        :items-per-page="100"
      >
        <template v-slot:item.image="{ item }">
          <v-avatar
            size="48"
            color="white"
            class="ma-2"
          >
            <v-img :src="item.imageUrl"></v-img>
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
        <template v-slot:item.originalPrice="{ item }">
          ₹ {{item.originalPrice }}
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

  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { getAllInventory } from "../../graphql/getAllInventory";
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
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Category',
          value: 'category'
        },
        {
          text: 'Sold by',
          value: 'vendor.storeName'
        },
        {
          text: 'Description',
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
          text: 'Actions',
          value: 'actions'
        }

      ],
      getAllInventory: {},
      isAddInventoryDialogVisible: false,
      isErrorDialogVisible: false,
      isEditInventoryDialogVisible: false,
      isDeleteInventoryDialogVisible: false,
      isShowInventoryDialogVisible: false,
      currentItem: {},
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
    }
  },

});
</script>

<style>
</style>