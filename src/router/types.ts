import type { RouteRecordRaw } from "vue-router";

// 扩展 meta 类型
declare module "vue-router" {
  interface RouteMeta {
    title: string;
    requiresAuth?: boolean;
    roles?: string[];
  }
}

export type AppRouteRecordRaw = RouteRecordRaw;
