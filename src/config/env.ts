/**
 * 环境配置文件
 *
 * 用于管理不同环境的配置参数
 */

// 环境变量
const ENV = import.meta.env;

// 当前环境
export const isDev = ENV.DEV;
export const isProd = ENV.PROD;
export const isTest = ENV.MODE === "test";

// 应用信息
export const APP_TITLE = ENV.VITE_APP_TITLE || "优购商城";

// 接口配置
export const API_CONFIG = {
  // 基础URL
  BASE_URL: ENV.VITE_APP_API_BASE_URL || "/api",
  // 超时时间
  TIMEOUT: 10000,
  // 请求头
  HEADERS: {
    "Content-Type": "application/json;charset=UTF-8",
  },
};

// 是否开启Mock
export const ENABLE_MOCK = ENV.VITE_APP_MOCK === "true";

// 当前环境
export const APP_ENV =
  ENV.VITE_APP_ENV || (isDev ? "development" : isProd ? "production" : "test");

// 存储前缀
export const STORAGE_PREFIX = "YOUGOU_";

// Token相关
export const TOKEN_CONFIG = {
  // Token键名
  TOKEN_KEY: `${STORAGE_PREFIX}TOKEN`,
  // Token过期时间（小时）
  TOKEN_EXPIRES: 24,
};

// 默认分页配置
export const DEFAULT_PAGE_CONFIG = {
  // 默认页码
  PAGE_NUM: 1,
  // 默认每页条数
  PAGE_SIZE: 10,
};

// 文件上传配置
export const UPLOAD_CONFIG = {
  // 上传地址
  UPLOAD_URL: `${API_CONFIG.BASE_URL}/upload`,
  // 允许的文件类型
  ALLOWED_FILE_TYPES: ["image/jpeg", "image/png", "image/gif"],
  // 最大文件大小（MB）
  MAX_FILE_SIZE: 5,
};

// 路由配置
export const ROUTE_CONFIG = {
  // 首页路由
  HOME_ROUTE: "/",
  // 登录页路由
  LOGIN_ROUTE: "/login",
  // 注册页路由
  REGISTER_ROUTE: "/register",
  // 用户中心路由
  USER_ROUTE: "/user",
  // 404页面路由
  NOT_FOUND_ROUTE: "/404",
  // 403页面路由
  FORBIDDEN_ROUTE: "/403",
};

// 导出默认配置
export default {
  isDev,
  isProd,
  isTest,
  APP_TITLE,
  API_CONFIG,
  ENABLE_MOCK,
  APP_ENV,
  STORAGE_PREFIX,
  TOKEN_CONFIG,
  DEFAULT_PAGE_CONFIG,
  UPLOAD_CONFIG,
  ROUTE_CONFIG,
};
