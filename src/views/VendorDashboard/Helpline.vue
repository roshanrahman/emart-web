<template>
  <v-card
    outlined
    tile
    class="pa-12"
  >
    <v-row justify="space-between">
      <h1 class=" display-1 primary--text mx-2"><b>Support Helplines</b></h1>

    </v-row>
    <h2 class=" body-1 mt-2">
      Contact details of BeShoppi platform administrators
    </h2>

    <v-divider class="my-8"></v-divider>
    <v-row align="center">

    </v-row>

    <v-col
      v-for="number in getPhoneNumbers"
      :key="number"
    >

      <v-row>
        <v-icon class="mr-4">mdi-phone</v-icon>
        <a
          :href="`tel:${number}`"
          class="title primary--text"
        >{{number}}</a>
      </v-row>
    </v-col>
    <v-col>

      <v-row>
        <v-icon class="mr-4">mdi-email</v-icon>
        <a
          :href="`mailto:${getEmailAddress}`"
          class="title primary--text"
        >{{getEmailAddress}}</a>
      </v-row>
    </v-col>

  </v-card>
</template>

<script>
import Vue from "vue";

import { LoginSessionHandler } from '../../helpers/loginSessionHandler';
import { getAllInventory } from "../../graphql/getAllInventory";
import { getAdminInfo } from "../../graphql/getAdminInfo";
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
    getPhoneNumbers: function () {
      var phoneNumbersList = [];
      try {
        if (!!this.getAdminInfo.alternativePhone1) {
          phoneNumbersList.push(this.getAdminInfo.alternativePhone1);
        }
        if (!!this.getAdminInfo.alternativePhone2) {
          phoneNumbersList.push(this.getAdminInfo.alternativePhone2);
        }
        var addressObj = JSON.parse(this.getAdminInfo.address);
        if (!!addressObj.phoneNumber) {
          phoneNumbersList.push(addressObj.phoneNumber);
        }

      } catch {
        return phoneNumbersList;
      }
      return phoneNumbersList;
    },
    getEmailAddress: function () {
      var email = '';
      try {
        email = this.getAdminInfo.email;
      } catch {
        return email;
      }
      return email;
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
    getAdminInfo: {
      query: getAdminInfo,
      pollInterval: 5000
    },

  },

});
</script>

<style>
</style>