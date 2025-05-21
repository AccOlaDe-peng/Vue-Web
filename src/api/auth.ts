import request from "@/utils/request";
import { BASE_URL } from "@/config/constants";

// 登录
const login = (data: any) => request.post(`${BASE_URL}/users/login`, data);

// 注册
const register = (data: any) =>
  request.post(`${BASE_URL}/users/register`, data);

// 退出登录
const logout = () => request.post(`${BASE_URL}/users/logout`);

export { login, register, logout };
