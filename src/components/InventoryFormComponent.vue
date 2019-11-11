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
              lg="12"
            >
              <h1 class="subtitle-2 mb-4 grey--text">Item Photos</h1>
              <v-row justify="space-around">
                <ImageUploadComponent
                  @imageChanged="setImageTo1"
                  :imageURL="imageURLInput[0]"
                ></ImageUploadComponent>
                <ImageUploadComponent
                  @imageChanged="setImageTo2"
                  :imageURL="imageURLInput[1]"
                ></ImageUploadComponent>
                <ImageUploadComponent
                  @imageChanged="setImageTo3"
                  :imageURL="imageURLInput[2]"
                ></ImageUploadComponent>
                <ImageUploadComponent
                  @imageChanged="setImageTo4"
                  :imageURL="imageURLInput[3]"
                ></ImageUploadComponent>
                <ImageUploadComponent
                  @imageChanged="setImageTo5"
                  :imageURL="imageURLInput[4]"
                ></ImageUploadComponent>
              </v-row>

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
                persistent-hint=""
                hint="The product will be sold at this price. 11% of this price will be deducted by the BeShoppi platform."
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
              350"
                  outlined
                >
                  <v-card-title>
                    <h1 class="caption grey--text">This is how the price will be displayed</h1>
                  </v-card-title>
                  <v-card-text>
                    <h2 class="subtitle-2 striked red--text text--accent-1">₹ {{ originalPriceInput }}</h2>
                    <h1 class="title primary--text">₹ {{ sellingPriceInput }}</h1>
                    <h1 class="caption grey--text"> - ₹{{sellingPriceInput * 0.11 }} (11%)</h1>
                    <v-divider class="my-2"></v-divider>
                    <h1 class="title black--text">₹ {{ sellingPriceInput - (sellingPriceInput * 0.11) }}</h1>
                    <h1 class="caption grey--text">This will be your income from this product</h1>
                    <v-alert
                      color="warning"
                      dark
                      class="subtitle-2 my-2"
                      v-if="sellingPriceInput >= 1500"
                    >
                      As the selling price of this product is over ₹ 1500, a delivery charge of ₹ 45 will be added to its price at the customers' end
                    </v-alert>
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
          <h1 class="subtitle-2 my-4  grey--text">Dimensions (in cm)</h1>
          <v-text-field
            filled
            label="Length (in cm)"
            single-line=""
            type="number"
            v-model.number="lengthInput"
            :rules="formRules.dimensionsRules"
          ></v-text-field>
          <v-text-field
            filled
            label="Breadth (in cm)"
            single-line=""
            type="number"
            v-model.number="breadthInput"
            :rules="formRules.dimensionsRules"
          ></v-text-field>
          <v-text-field
            filled
            label="Height (in cm)"
            single-line=""
            type="number"
            v-model.number="heightInput"
            :rules="formRules.dimensionsRules"
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
  </v-card>
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
      this.selectedCategory = null;
      this.imageURLInput = [null, null, null, null, null];
    },
    setImageTo1 (url) {
      this.imageURLInput[0] = url;
    },
    setImageTo2 (url) {
      this.imageURLInput[1] = url;
    },
    setImageTo3 (url) {
      this.imageURLInput[2] = url;
    },
    setImageTo4 (url) {
      this.imageURLInput[3] = url;
    },
    setImageTo5 (url) {
      this.imageURLInput[4] = url;
    },
    addNewCategory () {
      this.categories.push(this.newCategoryTextInput);
      this.selectedCategory = this.newCategoryTextInput;

      this.newCategoryTextInput = '';
      this.menu = false;
    },
    handleFormSubmit () {
      this.$refs.form.validate();

      if (!this.isFormValid) {
        this.error.title = "Please provide the required details";
        this.error.text = "The details are incomplete. Please fill the form."
        this.isErrorDialogVisible = true;
        return;
      }
      if (!this.selectedCategory) {
        this.error.title = "Please provide the product category";
        this.error.text = "The details are incomplete. Please select the category of the product."
        this.isErrorDialogVisible = true;
        return;
      }
      var correctImageUrls = [];
      this.imageURLInput.forEach(element => {
        if (!!element)
          correctImageUrls.push(element);
      });
      if (correctImageUrls.length < 1) {
        this.error.title = "Product photo not provided";
        this.error.text = "Please upload an image for the product photo."
        this.isErrorDialogVisible = true;
        return;
      }
      if (this.sellingPriceInput >= 1500) {
        this.sellingPriceInput = this.sellingPriceInput + 45;
      }
      var inventoryObj = {
        name: this.nameInput,
        description: this.descriptionInput,
        originalPrice: this.originalPriceInput,
        sellingPrice: this.sellingPriceInput,
        category: this.selectedCategory,
        inStock: this.quantityInput,
        imageUrl: JSON.stringify(correctImageUrls),
        length: this.lengthInput,
        breadth: this.breadthInput,
        height: this.heightInput
      };
      this.$emit('submit', inventoryObj);
      this.$refs.form.reset();
    }
  },
  props: ['existingItem'],
  mounted () {
    if (!!this.existingItem) {
      if (this.categories.map((v) => v.toLowerCase()).indexOf(this.existingItem.category.toLowerCase()) == -1) {
        this.categories.push(this.existingItem.category);
        this.selectedCategory = this.existingItem.category;
      }
    }
  },
  watch: {
    existingItem: function () {
      console.log('Prop changed!', this.existingItem);
      this.$forceUpdate();
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
        v => v > 0 || 'Quantity must be a positive value'],
        dimensionsRules: [v => !!v || 'Proper dimension is required',
        v => v > 0 || 'Dimension must be a positive value'],
      },
      nameInput: !!this.existingItem ? this.existingItem.name : '',
      descriptionInput: !!this.existingItem ? this.existingItem.description : '',
      originalPriceInput: !!this.existingItem ? this.existingItem.originalPrice : null,
      sellingPriceInput: !!this.existingItem ? this.existingItem.sellingPrice : null,
      quantityInput: !!this.existingItem ? this.existingItem.inStock : null,
      lengthInput: !!this.existingItem ? this.existingItem['length'] : null,
      breadthInput: !!this.existingItem ? this.existingItem.breadth : null,
      heightInput: !!this.existingItem ? this.existingItem.height : null,
      imageURLInput: !!this.existingItem ? JSON.parse(this.existingItem.imageUrl) : [null, null, null, null, null],
      isFormValid: false,
      selectedCategory: !!this.existingItem ? this.existingItem.category : '',
      error: {
        title: '',
        text: ''
      },
      categories: ['Mobile Phones', 'PC Parts', 'Laptops', 'Laptop Accessories', 'Mobile Accessories'],
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