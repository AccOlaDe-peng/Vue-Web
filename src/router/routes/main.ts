import type { AppRouteRecordRaw } from "../types";

const mainRoutes: AppRouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../../views/Home.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("../../views/Category.vue"),
    meta: {
      title: "分类页",
    },
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("../../views/Product.vue"),
    meta: {
      title: "商品详情",
    },
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../../views/Search.vue"),
    meta: {
      title: "搜索结果",
    },
  },
  {
    path: "/403",
    name: "Forbidden",
    component: () => import("../../views/403.vue"),
    meta: {
      title: "权限不足",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../../views/NotFound.vue"),
    meta: {
      title: "页面不存在",
    },
  },
];

export default mainRoutes;
