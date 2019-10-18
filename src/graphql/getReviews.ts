import gql from "graphql-tag";

export let getReviews = gql`
  query($inventoryId: String) {
    getReviews(inventoryId: $inventoryId) {
      canReview
      averageRating
      reviews {
        id
        date
        rating
        text
        customer {
          id
          name
        }
      }
      error {
        path
        message
      }
    }
  }
`;
