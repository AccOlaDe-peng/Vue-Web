import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { tokenWhiteList } from "@/config/whiteList";

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isWhiteList = tokenWhiteList.some((path: string) =>
      config.url?.includes(path)
    );
    if (!isWhiteList) {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    // 处理标准业务响应格式
    if (res.success === false) {
      // 处理业务错误
      console.error(res.message || "请求失败");
      return Promise.reject(res);
    }

    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || "请求失败"));
    }
    return res;
  },
  (error) => {
    // 处理非200响应错误
    let errorData = {
      code: 500,
      message: "网络请求错误",
      success: false,
      timestamp: new Date().toISOString(),
      error: {},
    };

    if (error.response) {
      // 服务器响应了但状态码不是2xx
      const { status, data } = error.response;
      errorData = {
        code: status,
        message: data.message || `请求失败(${status})`,
        success: false,
        timestamp: new Date().toISOString(),
        error: data.error || data,
      };
    } else if (error.request) {
      // 请求已发送但未收到响应
      errorData.message = "服务器无响应";
      errorData.error = { detail: "请求超时或服务器无法访问" };
    }

    // 统一错误提示处理
    console.error(errorData.message);

    // 可以在这里添加全局错误提示，例如使用Element Plus的Message组件
    // ElMessage.error(errorData.message);

    return Promise.reject(errorData);
  }
);

export default service;
