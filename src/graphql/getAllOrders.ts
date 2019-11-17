import gql from "graphql-tag";

export let getAllOrders = gql`
  query {
    getAllOrders {
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
          itemStatus
          inventory {
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
              storeName
            }
          }
        }
        status
        datePlaced
        updatedDate
        totalPrice
        paymentMode
        transactionSuccess
        cancelledReason
        additionalCharges
      }
    }
  }
`;
