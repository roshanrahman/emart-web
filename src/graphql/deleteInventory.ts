import gql from "graphql-tag";

export let deleteInventoryMutation = gql`
  mutation($inventoryId: String) {
    deleteInventory(inventoryId: $inventoryId) {
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
      }
    }
  }
`;
