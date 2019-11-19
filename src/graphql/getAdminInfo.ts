import gql from "graphql-tag";

export let getAdminInfo = gql`
  query{
    getAdminInfo {
      
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
  }
`;
