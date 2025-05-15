import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("../views/Category.vue"),
    meta: {
      title: "分类页",
    },
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("../views/Product.vue"),
    meta: {
      title: "商品详情",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      title: "购物车",
    },
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("../views/Order.vue"),
    meta: {
      title: "订单页面",
    },
  },
  {
    path: "/order/:id",
    name: "OrderDetail",
    component: () => import("../views/OrderDetail.vue"),
    meta: {
      title: "订单详情",
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    meta: {
      title: "用户中心",
    },
    children: [
      {
        path: "",
        name: "UserInfo",
        component: () => import("../views/user/UserInfo.vue"),
        meta: {
          title: "个人信息",
        },
      },
      {
        path: "security",
        name: "UserSecurity",
        component: () => import("../views/user/UserSecurity.vue"),
        meta: {
          title: "账户安全",
        },
      },
      {
        path: "address",
        name: "UserAddress",
        component: () => import("../views/user/UserAddress.vue"),
        meta: {
          title: "收货地址",
        },
      },
      {
        path: "wishlist",
        name: "UserWishlist",
        component: () => import("../views/user/UserWishlist.vue"),
        meta: {
          title: "我的收藏",
        },
      },
      {
        path: "message",
        name: "UserMessage",
        component: () => import("../views/user/UserMessage.vue"),
        meta: {
          title: "消息中心",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      title: "注册",
    },
  },
  {
    path: "/payment",
    name: "Payment",
    component: () => import("../views/Payment.vue"),
    meta: {
      title: "支付",
    },
  },
  {
    path: "/payment/success",
    name: "PaymentSuccess",
    component: () => import("../views/PaymentSuccess.vue"),
    meta: {
      title: "支付成功",
    },
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
    meta: {
      title: "搜索结果",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
    meta: {
      title: "页面不存在",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局前置守卫，修改页面标题
router.beforeEach((to, _, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 优购商城` : "优购商城";
  next();
});

export default router;
