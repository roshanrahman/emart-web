<template>
  <v-card
    outlined
    tile
    class="pa-12 ma-4"
  >
    <v-row>
      <h1 class=" display-1">Inventory</h1>
      <v-spacer></v-spacer>
      <v-btn
        rounded
        elevation="0"
        color="primary"
        @click="isAddInventoryDialogVisible = true;"
      >
        <v-icon left>mdi-plus</v-icon>
        Add new item
      </v-btn>

    </v-row>
    <v-row class="mt-8">
      <v-data-table
        :items="getVendorInventory.inventory"
        :headers="headers"
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
          >View details</v-btn>
        </template>
      </v-data-table>
    </v-row>

    <v-dialog
      v-model="isAddInventoryDialogVisible"
      fullscreen
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

          <InventoryFormComponent @submit="runAddInventoryMutation"></InventoryFormComponent>

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
  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { getVendorInventory } from "../../graphql/getVendorInventory";
import InventoryFormComponent from "../../components/InventoryFormComponent";
import { addNewInventoryMutation } from "../../graphql/addNewInventory";
export default Vue.extend({
  components: {
    InventoryFormComponent
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
      getVendorInventory: null,
      isAddInventoryDialogVisible: false,
      isErrorDialogVisible: false,
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

    }
  },
  apollo: {
    getVendorInventory: {
      query: getVendorInventory,

      pollInterval: 3
    }
  },

});
</script>

<style>
</style>