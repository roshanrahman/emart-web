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
        },
        {
          path: "/vendor-posters",
          name: "vendor-posters",
          component: () => import("./views/VendorDashboard/OfferPosters.vue")
        },
        {
          path: "/vendor-helpline",
          name: "vendor-helpline",
          component: () => import("./views/VendorDashboard/Helpline.vue")

        }
      ]
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./views/AdminDashboard/Dashboard.vue"),
      children: [
        {
          path: "/",
          name: "admin",
          component: () => import("./views/AdminDashboard/HomePage.vue")
        },
        {
          path: "/admin-active-orders",
          name: "admin-active-orders",
          component: () => import("./views/AdminDashboard/ActiveOrders.vue")
        },
        {
          path: "/admin-all-active-orders",
          name: "admin-all-active-orders",
          component: () => import("./views/AdminDashboard/AllActiveOrders.vue")
        },
        {
          path: "/admin-posters",
          name: "admin-posters",
          component: () => import("./views/AdminDashboard/OfferPosters.vue")
        },
        {
          path: "/admin-order-history",
          name: "admin-order-history",
          component: () => import("./views/AdminDashboard/OrderHistory.vue")
        },
        {
          path: "/admin-inventory",
          name: "admin-inventory",
          component: () => import("./views/AdminDashboard/Inventory.vue")
        },

        {
          path: "/admin-all-inventory",
          name: "admin-all-inventory",
          component: () => import("./views/AdminDashboard/AllInventory.vue")
        },
        {
          path: "/admin-profile",
          name: "admin-profile",
          component: () => import("./views/AdminDashboard/Profile.vue")
        },
        {
          path: "/admin-stats",
          name: "admin-stats",
          component: () => import("./views/AdminDashboard/Stats.vue")
        },
        {
          path: "/admin-vendors",
          name: "admin-vendors",
          component: () => import("./views/AdminDashboard/AllVendors.vue")
        },
        {
          path: "/admin-vendor-requests",
          name: "admin-vendor-requests",
          component: () => import("./views/AdminDashboard/VendorRequests.vue")
        }
      ]
    }
  ]
});
