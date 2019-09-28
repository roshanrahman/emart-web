import gql from "graphql-tag";

export let validateVendorArgumentsMutation = gql`
  mutation(
    $phoneNumber: String
    $email: String
    $bankAccountIFSC: String
    $bankAccountNumber: String
  ) {
    validateVendorArguments(
      phoneNumber: $phoneNumber
      email: $email
      bankAccountIFSC: $bankAccountIFSC
      bankAccountNumber: $bankAccountNumber
    ) {
      phoneNumber
      email
      bankAccountIFSC
      bankAccountNumber
    }
  }
`;
