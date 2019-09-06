import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;
var firebaseConfig = {
  apiKey: "AIzaSyA7qVJsNKlYuT8gBlZ5FQBd7dxu-h8I-5Q",
  authDomain: "electronic-mart.firebaseapp.com",
  databaseURL: "https://electronic-mart.firebaseio.com",
  projectId: "electronic-mart",
  storageBucket: "gs://electronic-mart.appspot.com/",
  messagingSenderId: "302571742479",
  appId: "1:302571742479:web:935978cd4d05373b"
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
