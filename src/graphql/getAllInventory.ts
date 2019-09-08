import gql from "graphql-tag";

export let getAllInventory = gql`
  query {
    getAllInventory {
      error {
        message
      }
      inventory {
        id
        name
        originalPrice
        sellingPrice
        description
        category
        inStock
        imageUrl
        vendor {
          id
          name
          phoneNumber
          storeName
          address
        }
      }
    }
  }
`;
