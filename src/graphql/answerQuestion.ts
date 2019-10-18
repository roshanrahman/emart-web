import gql from "graphql-tag";

export let answerQuestionMutation = gql`
  mutation($questionId: String, $answerText: String) {
    answerQuestion(questionId: $questionId, answerText: $answerText) {
      user {
        id
        name
        phoneNumber
      }
      error {
        path
        message
      }
    }
  }
`;
