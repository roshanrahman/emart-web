import gql from "graphql-tag";

export let addNewInventoryMutation = gql`
  mutation(
    $name: String
    $height: Float
    $length: Float
    $breadth: Float
    $description: String
    $originalPrice: Float
    $sellingPrice: Float
    $category: String
    $inStock: Float
    $imageUrl: String
  ) {
    addNewInventory(
      name: $name
      description: $description
      originalPrice: $originalPrice
      sellingPrice: $sellingPrice
      category: $category
      inStock: $inStock
      imageUrl: $imageUrl
      height: $height
      length: $length
      breadth: $breadth
    ) {
      error {
        message
      }
      inventory {
        id
        name
        length
        breadth
        height
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
