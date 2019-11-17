import gql from "graphql-tag";

export let changeOrderStatusMutation = gql`
  mutation($status: String, $orderId: String, $cancelledReason: String) {
    changeOrderStatus(status: $status, orderId: $orderId, cancelledReason: $cancelledReason) {
      error {
        message
      }
      orders {
        id
      }
    }
  }
`;
