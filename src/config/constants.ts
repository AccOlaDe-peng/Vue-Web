/**
 * 项目常量配置
 */

// 分页常量
export const PAGE_SIZE_OPTIONS = ["10", "20", "30", "50", "100"];

// 性别选项
export const GENDER_OPTIONS = [
  { label: "男", value: "male" },
  { label: "女", value: "female" },
  { label: "保密", value: "unknown" },
];

// 订单状态
export enum OrderStatus {
  PENDING_PAYMENT = "pending_payment",
  PAID = "paid",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REFUNDING = "refunding",
  REFUNDED = "refunded",
}

// 订单状态文本
export const ORDER_STATUS_TEXT = {
  [OrderStatus.PENDING_PAYMENT]: "待付款",
  [OrderStatus.PAID]: "已付款",
  [OrderStatus.SHIPPED]: "已发货",
  [OrderStatus.DELIVERED]: "已送达",
  [OrderStatus.COMPLETED]: "已完成",
  [OrderStatus.CANCELLED]: "已取消",
  [OrderStatus.REFUNDING]: "退款中",
  [OrderStatus.REFUNDED]: "已退款",
};

// 支付方式
export enum PaymentMethod {
  ALIPAY = "alipay",
  WECHAT = "wechat",
  CREDIT_CARD = "credit_card",
  BANK_TRANSFER = "bank_transfer",
}

// 支付方式文本
export const PAYMENT_METHOD_TEXT = {
  [PaymentMethod.ALIPAY]: "支付宝",
  [PaymentMethod.WECHAT]: "微信支付",
  [PaymentMethod.CREDIT_CARD]: "信用卡",
  [PaymentMethod.BANK_TRANSFER]: "银行转账",
};

// 商品分类
export const PRODUCT_CATEGORIES = [
  { id: 1, name: "手机数码", icon: "mobile" },
  { id: 2, name: "电脑办公", icon: "laptop" },
  { id: 3, name: "家用电器", icon: "tv" },
  { id: 4, name: "服装鞋包", icon: "tshirt" },
  { id: 5, name: "食品生鲜", icon: "apple-alt" },
  { id: 6, name: "美妆护肤", icon: "magic" },
  { id: 7, name: "母婴玩具", icon: "baby" },
  { id: 8, name: "运动户外", icon: "running" },
  { id: 9, name: "图书音像", icon: "book" },
  { id: 10, name: "家居家装", icon: "home" },
];

// 正则表达式
export const REGEX = {
  // 手机号
  MOBILE: /^1[3-9]\d{9}$/,
  // 邮箱
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  // 密码（8-20位，包含字母和数字）
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
  // 中文姓名
  CHINESE_NAME: /^[\u4e00-\u9fa5]{2,10}$/,
  // 身份证号
  ID_CARD: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 银行卡号
  BANK_CARD: /^\d{16,19}$/,
  // URL
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
};

// 响应状态码
export enum ResponseCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

// 本地存储键名
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER_INFO: "user_info",
  CART: "cart",
  THEME: "theme",
  LANGUAGE: "language",
  SEARCH_HISTORY: "search_history",
};

export default {
  PAGE_SIZE_OPTIONS,
  GENDER_OPTIONS,
  OrderStatus,
  ORDER_STATUS_TEXT,
  PaymentMethod,
  PAYMENT_METHOD_TEXT,
  PRODUCT_CATEGORIES,
  REGEX,
  ResponseCode,
  STORAGE_KEYS,
};
