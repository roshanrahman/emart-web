<template>
  <v-card elevation="0">
    <v-card-text>
      <v-simple-table>
        <tbody>
          <tr>
            <td>Gross Pending Income</td>
            <td class="title font-weight-regular text-right">₹ {{ getVendorInfo.user.amountToPay }}</td>
          </tr>
          <tr>
            <td>Amount deducted by BeShoppi platform (11%)</td>
            <td class="body-1 text-right">- ₹ {{ getVendorInfo.user.amountToPay * 0.11 }}</td>
          </tr>
          <tr>
            <td><b>Net income to be credited</b></td>
            <td class="title text-right">₹ {{ getVendorInfo.user.amountToPay - (getVendorInfo.user.amountToPay * 0.11) }}</td>
          </tr>
        </tbody>
      </v-simple-table>

    </v-card-text>
  </v-card>
</template>

<script>
import { getVendorInfo } from '../graphql/getVendorInfo';
export default {
  props: ['vendorId'],
  data () {
    return {
      vendorId: 0
    }
  },
  apollo: {
    getVendorInfo: {
      query: getVendorInfo,
      variables () {
        return {
          vendorId: this.vendorId
        }
      }
    }
  }
}
</script>

<style>
</style>