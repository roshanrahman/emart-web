import gql from "graphql-tag";

export var updateVendorAccountMutation = gql`
  mutation(
    $storeName: String
    $phoneNumber: String
    $email: String
    $pancardPhotoUrls: String
    $shopPhotoUrl: String
    $vendorId: String
    $address: AddressType
    $approved: Boolean
    $password: String
    $bankAccountName: String 
    $bankAccountIFSC: String
    $bankAccountNumber: String
    $vendorGSTNumber: String
  ) {
    updateVendorAccount(
      storeName: $storeName
      phoneNumber: $phoneNumber
      email: $email
      pancardPhotoUrls: $pancardPhotoUrls
      shopPhotoUrl: $shopPhotoUrl
      address: $address
      vendorId: $vendorId
      approved: $approved
      password: $password
      bankAccountName: $bankAccountName
      bankAccountIFSC: $bankAccountIFSC
      bankAccountNumber: $bankAccountNumber
      vendorGSTNumber: $vendorGSTNumber
    ) {
      jwtToken
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
      }
      error {
        path
        message
      }
    }
  }
`;
