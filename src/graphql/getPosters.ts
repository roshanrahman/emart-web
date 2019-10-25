import gql from "graphql-tag";

export let getPosters = gql`
  query {
    getPosters {
      id
      posterImage
      vendor {
        id
        name
        storeName
      }
      inventories {
        id
        name
        imageUrl
        sellingPrice
        vendor {
          id
          name
          storeName
        }
      }
    }
  }
`;
