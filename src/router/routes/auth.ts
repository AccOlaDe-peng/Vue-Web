import type { AppRouteRecordRaw } from "../types";

const authRoutes: AppRouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../../views/Login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../../views/Register.vue"),
    meta: {
      title: "注册",
    },
  },
];

export default authRoutes;
