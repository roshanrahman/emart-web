export class LoginSessionHandler {
  isAdmin;
  isBlocked;
  email;
  name;
  storeName;
  phoneNumber;
  address;
  id;
  pancardPhotoUrls;
  shopPhotoUrl;
  approved;
  bankAccountName;
  bankAccountIFSC;
  bankAccountNumber;
  vendorGSTNumber;
  paytmName;
  paytmNumber;
  alternativePhone1;
  alternativePhone2;
  constructor() {
    if (!!localStorage.getItem("loginInfo")) {
      var jsonString = localStorage.getItem("loginInfo");
      var object = JSON.parse(jsonString);
      this.isAdmin = object.admin;
      this.isBlocked = object.blocked;
      this.email = object.email;
      this.name = object.name;
      this.storeName = object.storeName;
      this.phoneNumber = object.phoneNumber;
      this.address = JSON.parse(object.address);
      this.id = object.id;
      this.pancardPhotoUrls = object.pancardPhotoUrls;
      this.shopPhotoUrl = object.shopPhotoUrl;
      this.approved = object.approved;
      this.bankAccountName = object.bankAccountName;
      this.bankAccountIFSC = object.bankAccountIFSC;
      this.bankAccountNumber = object.bankAccountNumber;
      this.vendorGSTNumber = object.vendorGSTNumber;
      this.paytmName = object.paytmName;
      this.paytmNumber = object.paytmNumber;
      this.alternativePhone1 = object.alternativePhone1;
      this.alternativePhone2 = object.alternativePhone2;
    }
  }
  static setLogin(jsonString, jwt) {
    localStorage.removeItem("loginInfo");
    console.log("Going to store string", jsonString);
    localStorage.setItem("loginInfo", jsonString);
    localStorage.setItem("apollo-token", jwt);
    console.log("Saved login info to localStorage");
  }

  static isLoggedIn() {
    return !!localStorage.getItem("loginInfo");
  }

  static logOut() {
    localStorage.removeItem("loginInfo");
    localStorage.removeItem("apollo-token");
    console.log("Removed login info from localStorage");
  }
}
