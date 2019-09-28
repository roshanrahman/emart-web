export class ErrorCodes {
  static errorCodesList = {
    NO_ACCESS: {
      short: "NO ACCESS",
      long: "You do not have permission to access that function."
    },
    PASSWORD_INVALID: {
      short: "Invalid Password",
      long: "The password you entered is invalid."
    },
    EMAIL_EXISTS: {
      short: "Email address already exists",
      long:
        "The email address you provided already exists, please use a different one."
    },
    USER_NOT_FOUND: {
      short: "Account does not exist",
      long:
        "No account exists with the credentials you provided. Please check your login credentials and try again."
    },
    PHONE_NUMBER_EXISTS: {
      short: "Phone Number already exists",
      long:
        "The phone number you provided already exists, please use a different one.",
      next: "No action is necessary"
    },
    NOT_APPROVED: {
      short: "Pending admin approval",
      long:
        "Your registration is awaiting admin approval. You will be able to access your account once the admin approves it."
    },
    INVENTORY_EMPTY: {
      short: "Inventory is empty",
      long: "The inventory is empty"
    },
    SHORT_PASSWORD: {
      short: "Password too short",
      long: "The password you entered is too short. Please use more characters"
    },
    EMAIL_INVALID: {
      short: "Email is invalid",
      long:
        "The email address appears to be invalid. Please provide a valid email address."
    }
  };

  static resolveErrorCode(str: string) {
    return this.errorCodesList[str];
  }
}
