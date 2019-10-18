import gql from "graphql-tag";

export let getVendorInventory = gql`
  query {
    getVendorInventory(vendorId: null) {
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
