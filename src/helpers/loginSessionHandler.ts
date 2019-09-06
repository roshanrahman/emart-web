export class LoginSessionHandler {
  isAdmin;
  isBlocked;
  email;
  name;
  phoneNumber;
  address;
  id;
  constructor() {
    if (!!localStorage.getItem("loginInfo")) {
      var jsonString = localStorage.getItem("loginInfo");
      var object = JSON.parse(jsonString);
      this.isAdmin = object.admin;
      this.isBlocked = object.blocked;
      this.email = object.email;
      this.name = object.name;
      this.phoneNumber = object.phoneNumber;
      this.address = JSON.parse(object.address);
      this.id = object.id;
    }
  }
  static setLogin(jsonString, jwt) {
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
