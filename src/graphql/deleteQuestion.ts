import gql from "graphql-tag";

export let deleteQuestionMutation = gql`
  mutation($questionId: String) {
    deleteQuestion(questionId: $questionId) {
      error {
        message
      }
      qa {
        id
      }
    }
  }
`;
