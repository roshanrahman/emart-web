import gql from "graphql-tag";

export let getAllVendors = gql`
  query {
    getAllVendors {
      id
      name
      phoneNumber
      address
      email
      fcmToken
      storeName
      blocked
      amountToPay
      alternativePhone1
      alternativePhone2
      paytmName
      paytmNumber
      pancardPhotoUrls
      shopPhotoUrl
      admin
      approved
      bankAccountName
      bankAccountIFSC
      bankAccountNumber
      vendorGSTNumber
    }
  }
`;
