import gql from "graphql-tag";

export let deletePosterMutation = gql`
  mutation($posterId: String) {
    deletePoster(posterId: $posterId) {
      error {
        message
      }
      poster {
        id
        inventories {
          id
        }
        posterImage
      }
    }
  }
`;
