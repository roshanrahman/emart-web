import gql from "graphql-tag";

export let downloadDataMutation = gql`
  mutation($startDate: String, $endDate: String) {
    downloadData(startDate: $startDate, endDate: $endDate)
  }
`;
