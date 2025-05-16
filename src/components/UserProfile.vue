<template>
  <div class="user-profile">
    <h2>用户信息</h2>

    <div v-if="userStore.hasLogin" class="profile-container">
      <div class="profile-header">
        <div class="avatar">
          <img
            v-if="userStore.userInfo.avatar"
            :src="userStore.userInfo.avatar"
            alt="头像"
          />
          <div v-else class="avatar-placeholder">
            <i class="fas fa-user"></i>
          </div>
        </div>
        <div class="user-details">
          <h3>{{ userStore.userInfo.username || "未设置用户名" }}</h3>
          <p class="user-email">
            {{ userStore.userInfo.email || "未设置邮箱" }}
          </p>
          <p class="user-role">
            角色: {{ userStore.userInfo.role || "普通用户" }}
          </p>
        </div>
      </div>

      <div class="token-info">
        <h4>Token信息</h4>
        <div class="token-display">
          <p>{{ displayToken }}</p>
        </div>
      </div>

      <div class="action-buttons">
        <button @click="updateProfile" class="update-btn">更新信息</button>
        <button @click="userStore.logout()" class="logout-btn">退出登录</button>
      </div>
    </div>

    <div v-else class="login-container">
      <p>您尚未登录，请先登录系统</p>
      <button @click="mockLogin" class="login-btn">模拟登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/user";
import { computed } from "vue";

const userStore = useUserStore();

// 显示部分token
const displayToken = computed(() => {
  const token = userStore.getToken;
  if (!token) return "无";
  if (token.length <= 8) return token;
  return token.substring(0, 4) + "..." + token.substring(token.length - 4);
});

// 模拟登录
const mockLogin = () => {
  const mockToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IuW4kOWPt-eUqOaItyIsImlhdCI6MTUxNjIzOTAyMn0";
  const mockUserInfo = {
    id: 1001,
    username: "测试用户",
    email: "test@example.com",
    avatar: "",
    role: "admin",
  };

  userStore.login(mockToken, mockUserInfo);
};

// 更新用户信息
const updateProfile = () => {
  userStore.updateUserInfo({
    username: "已更新用户名",
    email: "updated@example.com",
  });
};
</script>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.profile-container,
.login-container {
  padding: 15px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  border: 1px solid #eee;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder i {
  font-size: 40px;
  color: #aaa;
}

.user-details h3 {
  margin: 0 0 5px;
  font-size: 1.5rem;
}

.user-email,
.user-role {
  margin: 5px 0;
  color: #666;
}

.token-info {
  margin: 20px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 6px;
}

.token-info h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #555;
}

.token-display {
  padding: 10px;
  background-color: #eee;
  border-radius: 4px;
  font-family: monospace;
  word-break: break-all;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.update-btn {
  background-color: #4c84ff;
  color: white;
}

.logout-btn {
  background-color: #ff4c4c;
  color: white;
}

.login-btn {
  background-color: #4caf50;
  color: white;
  margin-top: 10px;
}

button:hover {
  opacity: 0.9;
}
</style>
