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
    $length: Float
    $breadth: Float
    $height: Float
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
      length: $length
      breadth: $breadth
      height: $height
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
