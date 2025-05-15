import type { AppRouteRecordRaw } from "../types";

const userRoutes: AppRouteRecordRaw[] = [
  {
    path: "/user",
    name: "User",
    component: () => import("../../views/User.vue"),
    meta: {
      title: "用户中心",
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "UserInfo",
        component: () => import("../../views/user/UserInfo.vue"),
        meta: {
          title: "个人信息",
          requiresAuth: true,
        },
      },
      {
        path: "security",
        name: "UserSecurity",
        component: () => import("../../views/user/UserSecurity.vue"),
        meta: {
          title: "账户安全",
          requiresAuth: true,
        },
      },
      {
        path: "address",
        name: "UserAddress",
        component: () => import("../../views/user/UserAddress.vue"),
        meta: {
          title: "收货地址",
          requiresAuth: true,
        },
      },
      {
        path: "wishlist",
        name: "UserWishlist",
        component: () => import("../../views/user/UserWishlist.vue"),
        meta: {
          title: "我的收藏",
          requiresAuth: true,
        },
      },
      {
        path: "message",
        name: "UserMessage",
        component: () => import("../../views/user/UserMessage.vue"),
        meta: {
          title: "消息中心",
          requiresAuth: true,
        },
      },
    ],
  },
];

export default userRoutes;
