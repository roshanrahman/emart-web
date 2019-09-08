export class OrderStatuses {
  static orderStatusList = {
    PLACED_BY_CUSTOMER: {
      short: "PLACED BY CUSTOMER",
      long: "Order is awaiting confirmation by store",
      next: "Please accept or reject this order"
    },
    RECEIVED_BY_STORE: {
      short: "RECEIVED BY STORE",
      long: "Order confirmed, and is being collected from vendors.",
      next: "Please collect the items from the vendors and send for delivery"
    },
    PICKED_UP: {
      short: "PICKED UP",
      long: "Order is being shipped to the customer",
      next: "Please verify if the order has reached the customer"
    },
    DELIVERED_AND_PAID: {
      short: "DELIVERED",
      long: "Order has reached the customer",
      next: "No action is necessary"
    },
    CANCELLED_BY_CUSTOMER: {
      short: "CANCELLED BY CUSTOMER",
      long: "Order cancelled by customer",
      next: "No action is necessary"
    },
    CANCELLED_BY_STORE: {
      short: "CANCELLED BY STORE",
      long: "Order cancelled by store",
      next: "No action is necessary"
    }
  };

  static resolveOrderStatus(str: string) {
    return this.orderStatusList[str];
  }
}
