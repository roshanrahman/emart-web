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
