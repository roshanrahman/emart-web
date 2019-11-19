<template>
  <v-card
    class="pa-4"
    elevation="0"
  >
    <v-flex>

      <v-form
        ref="form"
        v-model="isFormValid"
      >
        <v-col
          cols="12"
          lg="8"
          md="12"
        >
          <v-row>

            <v-col
              cols="12"
              lg="12"
            >
              <h1 class="subtitle-2 mb-4 grey--text">Upload Poster Image</h1>
              <v-row justify="space-around">
                <ImageUploadComponent
                  @imageChanged="setImageTo1"
                  :imageURL="imageURLInput[0]"
                ></ImageUploadComponent>

              </v-row>

            </v-col>
          </v-row>
          <h1 class="subtitle-2 my-4  grey--text">Select items to display under this offer poster {{ selectedItems.length > 0 ? "(Selected " + selectedItems.length + " items)" : ""}}</h1>

          <v-list>
            <v-list-item-group
              multiple
              v-model="selectedItems"
            >
              <template v-for="(item) in getVendorInventory.inventory">

                <v-list-item
                  :key="item.id"
                  :value="item"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-avatar>
                      <v-img :src="JSON.parse(item.imageUrl)[0]"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title> {{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ item.category }} · <span class="primary--text">₹ {{ item.sellingPrice }}</span> </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        :true-value="item"
                        color="deep-purple accent-4"
                        @click="toggle"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
          <v-divider class="mb-4 mt-8"></v-divider>
          <v-row class="mx-2">

            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              color="primary"
              @click="handleFormSubmit"
            >Submit</v-btn>
          </v-row>

        </v-col>
      </v-form>
    </v-flex>
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
import ImageUploadComponent from "./ImageUploadComponent";
import { getVendorInventory } from "../graphql/getVendorInventory";

export default {
  components: {
    ImageUploadComponent,

  },
  apollo: {
    getVendorInventory: {
      query: getVendorInventory,

      pollInterval: 5000
    }
  },
  computed: {
    isNewCategoryValid: function () {
      if (!!this.newCategoryTextInput && this.categories.map((v) => v.toLowerCase()).indexOf(this.newCategoryTextInput.toLowerCase()) != -1) {
        return false;
      }
      return true;
    },
    isPricingValid: function () {
      if (!!this.originalPriceInput && !!this.sellingPriceInput) {
        if (this.sellingPriceInput > this.originalPriceInput) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    resetValidation () {
      this.$refs.form.reset();
      this.selectedCategory = null;
      this.imageURLInput = [null, null, null, null, null];
    },
    setImageTo1 (url) {
      this.posterImageUrl = url;
    },
    addNewCategory () {
      this.categories.push(this.newCategoryTextInput);
      this.selectedCategory = this.newCategoryTextInput;

      this.newCategoryTextInput = '';
      this.menu = false;
    },
    handleFormSubmit () {

      if (this.selectedItems.length < 1) {
        this.error.title = "Please choose items";
        this.error.text = "Please choose the inventory items to feature under this poster."
        this.isErrorDialogVisible = true;
        return;
      }
      if (!this.posterImageUrl) {
        this.error.title = "Please upload poster image";
        this.error.text = "Please upload a poster image to continue."
        this.isErrorDialogVisible = true;
        return;
      }
      var inventoryIds = [];
      this.selectedItems.forEach(item => {
        inventoryIds.push(item.id);
      });
      var posterDetails = {
        inventoryIds: inventoryIds,
        posterImage: this.posterImageUrl
      };
      this.$emit('submit', posterDetails);
      this.$refs.form.reset();
    }
  },
  data () {
    return {
      isErrorDialogVisible: false,
      formRules: {
        nameRules: [v => !!v || 'Name is required'],
        descriptionRules: [v => !!v || 'Description is required'],
        originalPriceRules: [v => !!v || 'Original Price is required',
        v => v > 0 || 'Original Price is not valid'],
        sellingPriceRules: [v => !!v || 'Selling Price is required',
        v => this.sellingPriceInput <= this.originalPriceInput || 'Selling price cannot be greater than original price'],
        quantityRules: [v => !!v || 'Quantity is required',
        v => v > 0 || 'Quantity must be a positive value']
      },
      nameInput: !!this.existingItem ? this.existingItem.name : '',
      descriptionInput: !!this.existingItem ? this.existingItem.description : '',
      originalPriceInput: !!this.existingItem ? this.existingItem.originalPrice : null,
      sellingPriceInput: !!this.existingItem ? this.existingItem.sellingPrice : null,
      quantityInput: !!this.existingItem ? this.existingItem.inStock : null,
      imageURLInput: !!this.existingItem ? JSON.parse(this.existingItem.imageUrl) : [null, null, null, null, null],
      isFormValid: false,
      selectedCategory: !!this.existingItem ? this.existingItem.category : '',
      error: {
        title: '',
        text: ''
      },
      categories: ['Mobile Phones', 'PC Parts', 'Laptops', 'Laptop Accessories', 'Mobile Accessories'],
      menu: false,
      newCategoryTextInput: '',
      selectedItems: [],
      posterImageUrl: null
    }
  }
}
</script>

<style>
.striked {
  text-decoration: line-through;
}
</style>