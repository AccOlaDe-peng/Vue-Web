import { createRouter, createWebHistory } from "vue-router";
import type { AppRouteRecordRaw } from "./types";
import { getToken } from "../config/utils";
import { ROUTE_CONFIG, APP_TITLE } from "../config/env";

// 导入路由模块
import mainRoutes from "./routes/main";
import userRoutes from "./routes/user";
import orderRoutes from "./routes/order";
import authRoutes from "./routes/auth";

// 合并所有路由
const routes: AppRouteRecordRaw[] = [
  ...mainRoutes,
  ...userRoutes,
  ...orderRoutes,
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局前置守卫，修改页面标题
router.beforeEach((to, _, next) => {
  // 设置页面标题
  document.title = to.meta.title
    ? `${to.meta.title} - ${APP_TITLE}`
    : APP_TITLE;

  // 检查是否需要登录权限
  if (to.meta.requiresAuth) {
    // 检查本地存储的token
    const isAuthenticated = getToken();

    if (!isAuthenticated) {
      // 如果未登录，重定向到登录页面
      next({
        path: ROUTE_CONFIG.LOGIN_ROUTE,
        query: { redirect: to.fullPath }, // 保存原来想要访问的路径
      });
      return;
    }

    // 如果有角色限制，检查用户角色
    if (to.meta.roles && to.meta.roles.length > 0) {
      // 这里可以添加角色验证逻辑
      // 例如：从用户信息中获取角色
      const userRole = localStorage.getItem("userRole");

      if (!userRole || !to.meta.roles.includes(userRole)) {
        // 如果用户没有权限访问该页面，重定向到403页面
        next({ path: "/403" });
        return;
      }
    }
  }

  next();
});

// 全局后置钩子
router.afterEach(() => {
  // 路由切换后，滚动到页面顶部
  window.scrollTo(0, 0);
});

export default router;
