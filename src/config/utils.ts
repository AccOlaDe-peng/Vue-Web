/**
 * 配置工具类
 *
 * 提供获取环境变量和配置的方法
 */
import { TOKEN_CONFIG, STORAGE_PREFIX } from "./env";

/**
 * 获取本地存储中的数据
 * @param key 键名
 * @param prefix 是否添加前缀
 * @returns 存储的数据
 */
export const getStorage = (key: string, prefix: boolean = true): any => {
  const storageKey = prefix ? `${STORAGE_PREFIX}${key}` : key;
  const value = localStorage.getItem(storageKey);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  return null;
};

/**
 * 设置本地存储
 * @param key 键名
 * @param value 值
 * @param prefix 是否添加前缀
 */
export const setStorage = (
  key: string,
  value: any,
  prefix: boolean = true
): void => {
  const storageKey = prefix ? `${STORAGE_PREFIX}${key}` : key;
  if (typeof value === "object") {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } else {
    localStorage.setItem(storageKey, value);
  }
};

/**
 * 移除本地存储
 * @param key 键名
 * @param prefix 是否添加前缀
 */
export const removeStorage = (key: string, prefix: boolean = true): void => {
  const storageKey = prefix ? `${STORAGE_PREFIX}${key}` : key;
  localStorage.removeItem(storageKey);
};

/**
 * 清空本地存储
 */
export const clearStorage = (): void => {
  localStorage.clear();
};

/**
 * 获取Token
 * @returns Token值
 */
export const getToken = (): string | null => {
  return getStorage(TOKEN_CONFIG.TOKEN_KEY, false);
};

/**
 * 设置Token
 * @param token Token值
 */
export const setToken = (token: string): void => {
  setStorage(TOKEN_CONFIG.TOKEN_KEY, token, false);
};

/**
 * 移除Token
 */
export const removeToken = (): void => {
  removeStorage(TOKEN_CONFIG.TOKEN_KEY, false);
};

/**
 * 检查是否已登录
 * @returns 是否已登录
 */
export const isLoggedIn = (): boolean => {
  return !!getToken();
};

/**
 * 获取URL参数
 * @param name 参数名
 * @returns 参数值
 */
export const getUrlParam = (name: string): string | null => {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
};

/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式化字符串，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (
  date: Date | number | string,
  format: string = "YYYY-MM-DD HH:mm:ss"
): string => {
  const d = new Date(date);

  const year = d.getFullYear().toString();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");

  return format
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};

export default {
  getStorage,
  setStorage,
  removeStorage,
  clearStorage,
  getToken,
  setToken,
  removeToken,
  isLoggedIn,
  getUrlParam,
  formatDate,
};
