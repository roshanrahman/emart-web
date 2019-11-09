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
    $paytmName: String
    $paytmNumber: String
    $alternativePhone1: String
    $alternativePhone2: String
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
      paytmName: $paytmName
      paytmNumber: $paytmNumber
      alternativePhone1: $alternativePhone1
      alternativePhone2: $alternativePhone2
    ) {
      user {
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
      }
      error {
        path
        message
      }
      jwtToken
    }
  }
`;
