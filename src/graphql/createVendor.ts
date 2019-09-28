import gql from "graphql-tag";

export var createVendorMutation = gql`
  mutation(
    $storeName: String
    $phoneNumber: String
    $email: String
    $password: String
    $pancardPhotoUrls: String
    $shopPhotoUrl: String
    $address: AddressType
    $bankAccountName: String
    $bankAccountIFSC: String
    $bankAccountNumber: String
    $vendorGSTNumber: String
  ) {
    createVendor(
      storeName: $storeName
      phoneNumber: $phoneNumber
      email: $email
      password: $password
      pancardPhotoUrls: $pancardPhotoUrls
      shopPhotoUrl: $shopPhotoUrl
      address: $address
      bankAccountName: $bankAccountName
      bankAccountIFSC: $bankAccountIFSC
      bankAccountNumber: $bankAccountNumber
      vendorGSTNumber: $vendorGSTNumber
    ) {
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
      }
      error {
        path
        message
      }
      jwtToken
    }
  }
`;
