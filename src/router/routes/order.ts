import type { AppRouteRecordRaw } from "../types";

const orderRoutes: AppRouteRecordRaw[] = [
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../../views/Cart.vue"),
    meta: {
      title: "购物车",
    },
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("../../views/Order.vue"),
    meta: {
      title: "订单页面",
      requiresAuth: true,
    },
  },
  {
    path: "/order/:id",
    name: "OrderDetail",
    component: () => import("../../views/OrderDetail.vue"),
    meta: {
      title: "订单详情",
      requiresAuth: true,
    },
  },
  {
    path: "/payment",
    name: "Payment",
    component: () => import("../../views/Payment.vue"),
    meta: {
      title: "支付",
      requiresAuth: true,
    },
  },
  {
    path: "/payment/success",
    name: "PaymentSuccess",
    component: () => import("../../views/PaymentSuccess.vue"),
    meta: {
      title: "支付成功",
      requiresAuth: true,
    },
  },
];

export default orderRoutes;
