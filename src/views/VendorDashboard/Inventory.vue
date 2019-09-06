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