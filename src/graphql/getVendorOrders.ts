import gql from "graphql-tag";

export let getVendorOrders = gql`
  query($vendorId: String) {
    getVendorOrders(vendorId: $vendorId) {
      error {
        message
      }
      orders {
        id
        orderNo
        address
        customer {
          id
          name
          phoneNumber
          address
          email
        }
        cartItems {
          id
          name
          originalPrice
          sellingPrice
          description
          category
          inStock
          imageUrl
          vendor {
            id
            name
            phoneNumber
            email
          }
        }
        status
        datePlaced
        updatedDate
        totalPrice
        paymentMode
        transactionSuccess
      }
    }
  }
`;
