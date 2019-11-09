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
    $otpToken: String
    $paytmName: String
    $paytmNumber: String
    $alternativePhone1: String
    $alternativePhone2: String
    $amountToPay: Float
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
      otpToken: $otpToken
      paytmName: $paytmName
      paytmNumber: $paytmNumber
      alternativePhone1: $alternativePhone1
      alternativePhone2: $alternativePhone2
      amountToPay: $amountToPay
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
        otpToken
        paytmName
        paytmNumber
        alternativePhone1
        alternativePhone2
        password
      }
      error {
        path
        message
      }
    }
  }
`;
