import gql from "graphql-tag";

export let changeOrderStatusMutation = gql`
  mutation($status: String, $orderId: String) {
    changeOrderStatus(status: $status, orderId: $orderId) {
      error {
        message
      }
      orders {
        id
      }
    }
  }
`;
