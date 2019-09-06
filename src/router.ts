import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "default",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Login/Register.vue")
    },
    {
      path: "/vendor",
      name: "vendor",
      component: () => import("./views/VendorDashboard/Dashboard.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("./views/VendorDashboard/HomePage.vue")
        },
        {
          path: "/vendor-active-orders",
          name: "vendor-active-orders",
          component: () => import("./views/VendorDashboard/ActiveOrders.vue")
        },
        {
          path: "/vendor-order-history",
          name: "vendor-order-history",
          component: () => import("./views/VendorDashboard/OrderHistory.vue")
        },
        {
          path: "/vendor-inventory",
          name: "vendor-inventory",
          component: () => import("./views/VendorDashboard/Inventory.vue")
        },
        {
          path: "/vendor-profile",
          name: "vendor-profile",
          component: () => import("./views/VendorDashboard/Profile.vue")
        },
        {
          path: "/vendor-stats",
          name: "vendor-stats",
          component: () => import("./views/VendorDashboard/Stats.vue")
        }
      ]
    }
  ]
});
