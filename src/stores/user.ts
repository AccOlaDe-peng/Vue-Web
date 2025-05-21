import { defineStore } from "pinia";

interface UserInfo {
  id?: number;
  username?: string;
  email?: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    userInfo: {} as UserInfo,
    isLoggedIn: false,
  }),

  getters: {
    getToken: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
    hasLogin: (state) => state.isLoggedIn,
    hasRole: (state) => (role: string) => state.userInfo.role === role,
  },

  actions: {
    // 设置token
    setToken(token: string) {
      this.token = token;
      this.isLoggedIn = true;
    },

    // 设置用户信息
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },

    // 更新用户信息（部分更新）
    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo };
    },

    // 登录
    login(token: string, userInfo: UserInfo) {
      this.setToken(token);
      this.setUserInfo(userInfo);
    },

    // 登出
    logout() {
      this.token = "";
      this.userInfo = {};
      this.isLoggedIn = false;
    },

    // 检查token是否有效（可以在这里添加token验证逻辑）
    checkToken() {
      return !!this.token;
    },
  },

  persist: true,
});
