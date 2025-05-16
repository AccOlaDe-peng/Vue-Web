import type { AppRouteRecordRaw } from "../types";

const authRoutes: AppRouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("@/views/auth/ResetPassword.vue"),
    meta: {
      title: "找回密码",
    },
  },
];

export default authRoutes;
