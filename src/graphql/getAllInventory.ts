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
        date
        averageRating
        unAnswered
        length
        breadth
        height
        deleted
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
