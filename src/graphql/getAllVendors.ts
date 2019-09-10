import gql from "graphql-tag";

export let getAllVendors = gql`
  query {
    getAllVendors {
      id
      name
      phoneNumber
      address
      email
      storeName
      shopPhotoUrl
      pancardPhotoUrls
      admin
      blocked
      approved
    }
  }
`;
