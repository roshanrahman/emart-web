import gql from "graphql-tag";

export let addPosterMutation = gql`
  mutation($inventoryIds: [String], $posterImage: String, $posterId: String) {
    addPoster(
      inventoryIds: $inventoryIds
      posterImage: $posterImage
      posterId: $posterId
    ) {
      error {
        message
      }
      poster {
        id
        inventories {
          id
        }
        posterImage
        vendor {
          id
        }
      }
    }
  }
`;
