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
  ) {
    createVendor(
      storeName: $storeName
      phoneNumber: $phoneNumber
      email: $email
      password: $password
      pancardPhotoUrls: $pancardPhotoUrls
      shopPhotoUrl: $shopPhotoUrl
      address: $address
    ) {
      user {
        id
        name
        phoneNumber
      }
      error {
        path
        message
      }
      jwtToken
    }
  }
`;
