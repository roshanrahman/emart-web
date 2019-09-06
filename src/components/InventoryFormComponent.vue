<template>
  <v-c>
    <v-flex>

      <v-form
        ref="form"
        v-model="isFormValid"
      >
        <v-col
          cols="12"
          lg="6"
          md="8"
        >
          <v-row>
            <v-col
              cols="12"
              lg="7"
            >
              <h1 class="subtitle-2 mb-4 grey--text">Item Name</h1>

              <v-text-field
                filled
                label="Name of the product"
                single-line
                :rules="formRules.nameRules"
                v-model="nameInput"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              lg="5"
            >
              <h1 class="subtitle-2 mb-4 grey--text">Item Photo</h1>
              <ImageUploadComponent
                @imageChanged="setImage"
                :imageURL="imageURLInput"
              ></ImageUploadComponent>
            </v-col>
          </v-row>
          <h1 class="subtitle-2 my-4  grey--text">Item Category</h1>
          <v-chip
            :color="selectedCategory == category ? 'primary' : ''"
            class="mr-2 mb-2"
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
          >
            <v-icon
              left
              v-if="selectedCategory == category"
            >mdi-check</v-icon>

            {{ category }}
          </v-chip>
          <v-menu
            v-model="menu"
            bottom
            right
            transition="scale-transition"
            origin="top left"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <v-chip
                pill
                v-on="on"
                outlined
                class="mr-2 mb-2"
              >
                <v-icon left>
                  mdi-plus </v-icon>
                Other
              </v-chip>
            </template>
            <v-card
              width="300"
              elevation="0"
            >
              <v-list dark>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Add new category</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      icon
                      @click="menu = false"
                    >
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-list
                class="ma-4"
                elevation="0"
                @click="()=>{}"
              >
                <v-list-item>
                  <v-text-field
                    filled
                    label="Category Text"
                    single-line=""
                    v-model="newCategoryTextInput"
                    :error-messages="!isNewCategoryValid ? 'Category already exists' : false"
                  ></v-text-field>

                </v-list-item>
                <v-list-item>
                  <v-spacer></v-spacer>
                  <v-btn
                    elevation="0"
                    color="primary"
                    :disabled="!!newCategoryTextInput == false || !isNewCategoryValid"
                    @click="addNewCategory()"
                  >Add</v-btn>

                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
          <h1 class="subtitle-2 my-4 pt-4 grey--text">Description</h1>
          <v-textarea
            filled
            :rules="formRules.descriptionRules"
            label="Description of the product"
            v-model="descriptionInput"
            hint="Please describe the product, and include all details and specifications that you need to provide"
          ></v-textarea>
          <h1 class="subtitle-2 mt-2 grey--text">Pricing</h1>
          <v-row>
            <v-col
              cols="12"
              sm="8"
            >
              <v-text-field
                filled
                label="Original Price"
                single-line=""
                prefix="₹ "
                type="number"
                hint="This price will be shown striked out"
                v-model.number="originalPriceInput"
                :rules="formRules.originalPriceRules"
              ></v-text-field>
              <v-text-field
                filled
                label="Selling Price"
                single-line=""
                prefix="₹ "
                type="number"
                v-model.number="sellingPriceInput"
                :rules="formRules.sellingPriceRules"
                hint="The product will be sold at this price"
              ></v-text-field>
            </v-col>
            <v-fade-transition>
              <v-col
                cols="12"
                sm="4"
                v-if="!!this.originalPriceInput && !!this.sellingPriceInput && this.isPricingValid"
              >
                <v-card
                  max-width="
              250"
                  outlined
                >
                  <v-card-title>
                    <h1 class="caption grey--text">This is how the price will be displayed</h1>
                  </v-card-title>
                  <v-card-text>
                    <h1 class="title primary--text">₹ {{ sellingPriceInput }}</h1>
                    <h2 class="subtitle-2 striked red--text text--accent-1">₹ {{ originalPriceInput }}</h2>
                  </v-card-text>
                </v-card>

              </v-col>
            </v-fade-transition>
          </v-row>
          <h1 class="subtitle-2 my-4  grey--text">Quantity in Stock</h1>
          <v-text-field
            filled
            label="No. of units in stock"
            single-line=""
            type="number"
            v-model.number="quantityInput"
            :rules="formRules.quantityRules"
          ></v-text-field>
          <v-divider class="mb-4 mt-8"></v-divider>
          <v-row class="mx-2">
            <v-btn
              outlined
              text
              @click="resetValidation"
            >Reset</v-btn>
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
  </v-c>
</template>

<script>
import ImageUploadComponent from "./ImageUploadComponent";
export default {
  components: {
    ImageUploadComponent,

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
    },
    setImage (url) {
      this.imageURLInput = url;
    },
    addNewCategory () {
      this.categories.push(this.newCategoryTextInput);
      this.selectedCategory = this.newCategoryTextInput;

      this.newCategoryTextInput = '';
      this.menu = false;
    },
    handleFormSubmit () {
      if (!!this.imageURLInput == false) {
        this.error.title = "Product photo not provided";
        this.error.text = "Please upload an image for the product photo."
        this.isErrorDialogVisible = true;
        return;
      }
      if (!this.isFormValid) {
        this.error.title = "Please provide the required details";
        this.error.text = "The details are incomplete. Please fill the form."
        this.isErrorDialogVisible = true;
        return;
      }
      var inventoryObj = {
        name: this.nameInput,
        description: this.descriptionInput,
        originalPrice: this.originalPriceInput,
        sellingPrice: this.sellingPriceInput,
        category: this.selectedCategory,
        inStock: this.quantityInput,
        imageUrl: this.imageURLInput
      };
      this.$emit('submit', inventoryObj);
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
      nameInput: '',
      descriptionInput: '',
      originalPriceInput: null,
      sellingPriceInput: null,
      quantityInput: null,
      imageURLInput: '',
      isFormValid: false,
      selectedCategory: '',
      error: {
        title: '',
        text: ''
      },
      categories: ['Mobile Phones', 'PC Parts', 'Television', 'Laptops', 'Laptop Accessories', 'Mobile Accessories'],
      menu: false,
      newCategoryTextInput: ''
    }
  }
}
</script>

<style>
.striked {
  text-decoration: line-through;
}
</style>