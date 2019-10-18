import gql from "graphql-tag";

export let updateInventoryMutation = gql`
  mutation(
    $inventoryId: String
    $name: String
    $description: String
    $originalPrice: Float
    $sellingPrice: Float
    $category: String
    $inStock: Float
    $imageUrl: String
  ) {
    updateInventory(
      inventoryId: $inventoryId
      name: $name
      description: $description
      originalPrice: $originalPrice
      sellingPrice: $sellingPrice
      category: $category
      inStock: $inStock
      imageUrl: $imageUrl
    ) {
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
      }
    }
  }
`;
