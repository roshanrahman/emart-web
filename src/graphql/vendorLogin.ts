import gql from "graphql-tag";

export let vendorLogin = gql`
  mutation($phoneNumber: String, $password: String) {
    vendorLogin(phoneNumber: $phoneNumber, password: $password) {
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
