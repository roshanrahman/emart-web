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
  ) {
    updateVendorAccount(
      storeName: $storeName
      phoneNumber: $phoneNumber
      email: $email
      pancardPhotoUrls: $pancardPhotoUrls
      shopPhotoUrl: $shopPhotoUrl
      address: $address
      vendorId: $vendorId
    ) {
      user {
        id
        name
        phoneNumber
        address
        email
        storeName
        blocked
        panCardPhotoUrls
        shopPhotoUrl
        admin
      }
      error {
        path
        message
      }
      jwtToken
    }
  }
`;
