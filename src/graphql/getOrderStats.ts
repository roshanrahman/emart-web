import gql from "graphql-tag";

export let getOrderStats = gql`
  query($startDate: String, $endDate: String) {
    getOrderStats(startDate: $startDate, endDate: $endDate) {
      date
      orderCount
      totalAmount
    }
  }
`;
