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
      <h3 class="subtitle-2 grey--text">Store Name</h3>
      <h1 class="title"> {{ vendor.storeName }}</h1>
    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <h3 class="subtitle-2 grey--text">Phone Number (for contact and login)</h3>
      <h1 class="title"> {{ vendor.phoneNumber }}</h1>
    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <v-row
        justify="space-between"
        class="mx-2"
      >
        <h3 class="subtitle-2 grey--text">Address</h3>
        <v-btn
          text
          @click="copyTextToClipboard(`Vendor: ${vendor.storeName}\nAddress: ${vendorAddress.addressLine}\n${vendorAddress.phoneNumber}\n${vendorAddress.city}\n${vendorAddress.pinCode}\nPhone Numbers:\n${vendorAddress.phoneNumber}\n${vendor.alternativePhone1}\n${vendor.alternativePhone2}`)"
        >
          <v-icon left>mdi-content-copy</v-icon> Copy
        </v-btn>
      </v-row>
      <h3 class="subtitle-2 grey--text">Address</h3>
      <h1 class="title">{{ `${vendorAddress.name}` }}</h1>
      <h1 class="title">{{ `${vendorAddress.addressLine}` }}</h1>
      <h1 class="title">{{ `${vendorAddress.landmark}` }}</h1>
      <h1 class="title">{{ `${vendorAddress.phoneNumber}` }}</h1>
      <h1 class="title">{{ `${vendorAddress.city}` }}</h1>
      <h1 class="title">{{ `${vendorAddress.pinCode}` }}</h1>
      <h3 class="subtitle-2 grey--text">Alternative Phone Numbers</h3>
      <h1 class="title">{{ `${vendor.alternativePhone1}` }}</h1>
      <h1 class="title">{{ `${vendor.alternativePhone2}` }}</h1>

    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <h3 class="subtitle-2 grey--text">Email Address</h3>
      <h1 class="title"> {{ vendor.email }}</h1>
    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <h3 class="subtitle-2 grey--text">GST Number</h3>
      <h1 class="title"> {{ vendor.vendorGSTNumber }}</h1>
    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <v-row
        justify="space-between"
        class="mx-2"
      >
        <h3 class="subtitle-2 grey--text">Bank Details</h3>
        <v-btn
          text
          @click="copyTextToClipboard(`Vendor: ${vendor.storeName}\nA/C Number: ${vendor.bankAccountNumber}\nA/C Holder Name: ${vendor.bankAccountName}\nIFSC Code: ${vendor.bankAccountIFSC}\nPayTM Name: ${vendor.paytmName}\nPayTM Number: ${vendor.paytmNumber}`)"
        >
          <v-icon left>mdi-content-copy</v-icon> Copy
        </v-btn>
      </v-row>
      <v-list class="mx-2">
        <v-list-item-content>
          <v-list-item-subtitle> Bank Account Number </v-list-item-subtitle>
          <v-list-item-title class="headline">{{ vendor.bankAccountNumber }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-subtitle> Bank Account Holder Name </v-list-item-subtitle>
          <v-list-item-title class="headline">{{ vendor.bankAccountName }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-subtitle> Bank Account IFSC Code </v-list-item-subtitle>
          <h3 class="headline">{{ vendor.bankAccountIFSC }}</h3>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle> PayTM Name </v-list-item-subtitle>
          <h3 class="headline">{{ vendor.paytmName }}</h3>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle> PayTM Number </v-list-item-subtitle>
          <h3 class="headline">{{ vendor.paytmNumber }}</h3>
        </v-list-item-content>
      </v-list>
    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
      v-for="(url, index) in vendorPanCardObj"
      :key="url"
    >
      <v-row
        justify="space-between"
        class="mx-2"
      >
        <h3 class="subtitle-2 grey--text">PAN Card Photo ({{index + 1}})</h3>

        <h1 class="subtitle-1"> <a
            :href="url"
            target="_blank"
          >View full image</a>
          <v-icon
            small
            right
          >mdi-open-in-new</v-icon>
        </h1>
      </v-row>
      <a
        :href="url"
        target="_blank"
      >
        <v-img
          max-height="700"
          :src="url"
          contain=""
        ></v-img>
      </a>
    </v-card>
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
    >
      <v-row
        justify="space-between"
        class="mx-2"
      >
        <h3 class="subtitle-2 grey--text">Store Photo</h3>
        <h1 class="subtitle-1"> <a
            :href="vendor.shopPhotoUrl"
            target="_blank"
          >View full image</a>
          <v-icon
            small
            right
          >mdi-open-in-new</v-icon>
        </h1>
      </v-row>
      <a
        :href="vendor.shopPhotoUrl"
        target="_blank"
      >
        <v-img
          max-height="700"
          :src="vendor.shopPhotoUrl"
          contain=""
        ></v-img>
      </a>
    </v-card>
  </v-card>
</template>

<script>
import QuestionsComponent from "./QuestionsComponent";
import ReviewsComponent from "./ReviewsComponent";

export default {
  props: ['vendor'],
  mounted () {
    console.log('Vendor details component received ', this.vendor);
  },
  components: {
    QuestionsComponent,
    ReviewsComponent
  },
  computed: {
    vendorAddress: function () {
      console.log('Vendor address JSON String ', this.vendor.address);
      try {
        return JSON.parse(this.vendor.address);
      } catch {
        return {};
      }
    },
    vendorPanCardObj: function () {
      console.log('Vendor PAN Card URLs string', this.vendor.pancardPhotoUrls);
      try {
        return JSON.parse(this.vendor.pancardPhotoUrls);
      } catch {
        return {};
      }
    }
  },
  methods: {
    copyTextToClipboard (text) {
      try {
        navigator.clipboard.writeText(text).then(function () {
          console.log('Async: Copying to clipboard was successful!');
          alert('Details copied. Now you can paste anywhere');
        }, function (err) {
          console.error('Async: Could not copy text: ', err);
        });
      } catch {
        this.fallbackCopyTextToClipboard(text);
        return;
      }
      return;
    },
    fallbackCopyTextToClipboard (text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
        alert('Details copied. Now you can paste anywhere');

      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);
    },
  }
}
</script>

<style>
</style>