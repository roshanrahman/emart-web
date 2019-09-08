import gql from "graphql-tag";

export let disableVendorAccountMutation = gql`
  mutation($vendorId: String, $block: Boolean) {
    disableVendorAccount(vendorId: $vendorId, block: $block) {
      user {
        id
        name
      }
      error {
        message
      }
      jwtToken
    }
  }
`;
