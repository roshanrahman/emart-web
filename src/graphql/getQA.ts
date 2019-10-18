import gql from "graphql-tag";

export let getQA = gql`
  query($inventoryId: String) {
    getQA(inventoryId: $inventoryId) {
      id
      date
      questionText
      answerText
      customer {
        id
        name
        phoneNumber
        address
        email
        storeName
      }
      inventory {
        id
        name
        originalPrice
        sellingPrice
        description
        category
      }
    }
  }
`;
