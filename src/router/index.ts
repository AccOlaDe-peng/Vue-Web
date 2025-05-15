import { createRouter, createWebHistory } from "vue-router";
import type { AppRouteRecordRaw } from "./types";

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
  document.title = to.meta.title ? `${to.meta.title} - 优购商城` : "优购商城";

  // 检查是否需要登录权限
  if (to.meta.requiresAuth) {
    // 这里可以添加登录验证逻辑
    // 例如：检查本地存储的token
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      // 如果未登录，重定向到登录页面
      next({
        path: "/login",
        query: { redirect: to.fullPath }, // 保存原来想要访问的路径
      });
      return;
    }
  }

  next();
});

export default router;
