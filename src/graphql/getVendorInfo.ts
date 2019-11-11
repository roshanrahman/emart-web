import gql from "graphql-tag";

export let getVendorInfo = gql`
  query($vendorId: String) {
    getVendorInfo(vendorId: $vendorId) {
      user {
        id
        name
        phoneNumber
        address
        email
        storeName
        blocked
        pancardPhotoUrls
        shopPhotoUrl
        admin
        approved
        bankAccountName
        bankAccountIFSC
        bankAccountNumber
        vendorGSTNumber
        amountToPay
        alternativePhone1
        alternativePhone2
        paytmName
        paytmNumber
      }
      error {
        path
        message
      }
      jwtToken
    }
  }
`;
