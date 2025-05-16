<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="login-logo">优购商城</div>
      </div>

      <div class="login-tabs">
        <div
          class="login-tab"
          :class="{ active: activeTab === 'login' }"
          @click="activeTab = 'login'"
        >
          登录
        </div>
        <div
          class="login-tab"
          :class="{ active: activeTab === 'register' }"
          @click="activeTab = 'register'"
        >
          注册
        </div>
      </div>

      <!-- 登录表单 -->
      <div class="login-body">
        <div class="login-form" v-show="activeTab === 'login'">
          <div class="form-item">
            <i class="fas fa-user form-icon"></i>
            <input
              type="text"
              class="login-input"
              placeholder="用户名/手机号/邮箱"
              v-model="loginForm.username"
            />
          </div>
          <div class="form-item">
            <i class="fas fa-lock form-icon"></i>
            <input
              type="password"
              class="login-input"
              placeholder="密码"
              v-model="loginForm.password"
            />
          </div>
          <div class="login-options">
            <div class="remember-me">
              <input
                type="checkbox"
                id="remember"
                v-model="loginForm.remember"
              />
              <label for="remember">记住我</label>
            </div>
            <router-link to="/auth/reset-password" class="forgot-password"
              >忘记密码?</router-link
            >
          </div>
          <button class="login-button" @click="handleLogin">登录</button>

          <div class="login-divider">
            <span>其他登录方式</span>
          </div>

          <div class="social-login">
            <div class="social-icon wechat">
              <i class="fab fa-weixin"></i>
            </div>
            <div class="social-icon qq">
              <i class="fab fa-qq"></i>
            </div>
            <div class="social-icon weibo">
              <i class="fab fa-weibo"></i>
            </div>
          </div>
        </div>

        <!-- 注册表单 -->
        <div class="register-form" v-show="activeTab === 'register'">
          <div class="form-item">
            <i class="fas fa-mobile-alt form-icon"></i>
            <input
              type="text"
              class="login-input"
              placeholder="手机号码"
              v-model="registerForm.phone"
            />
          </div>
          <div class="form-item">
            <i class="fas fa-shield-alt form-icon"></i>
            <input
              type="text"
              class="login-input"
              placeholder="验证码"
              v-model="registerForm.code"
            />
            <button class="verification-code" @click="getVerificationCode">
              获取验证码
            </button>
          </div>
          <div class="form-item">
            <i class="fas fa-lock form-icon"></i>
            <input
              type="password"
              class="login-input"
              placeholder="设置密码"
              v-model="registerForm.password"
            />
          </div>
          <div class="form-item">
            <i class="fas fa-lock form-icon"></i>
            <input
              type="password"
              class="login-input"
              placeholder="确认密码"
              v-model="registerForm.confirmPassword"
            />
          </div>
          <div class="login-options">
            <div class="remember-me">
              <input
                type="checkbox"
                id="agreement"
                v-model="registerForm.agreement"
              />
              <label for="agreement" class="agreement">
                我已阅读并同意 <a href="#terms">用户协议</a> 和
                <a href="#privacy">隐私政策</a>
              </label>
            </div>
          </div>
          <button class="login-button" @click="handleRegister">注册</button>
        </div>
      </div>

      <div class="login-footer">
        登录即表示您同意我们的 <a href="#terms">服务条款</a> 和
        <a href="#privacy">隐私政策</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("login");

// 登录表单数据
const loginForm = reactive({
  username: "",
  password: "",
  remember: false,
});

// 注册表单数据
const registerForm = reactive({
  phone: "",
  code: "",
  password: "",
  confirmPassword: "",
  agreement: false,
});

// 登录方法
const handleLogin = () => {
  // 这里实现登录逻辑
  console.log("登录表单提交", loginForm);

  // 模拟登录成功后跳转到首页
  router.push("/");
};

// 注册方法
const handleRegister = () => {
  // 这里实现注册逻辑
  console.log("注册表单提交", registerForm);

  // 模拟注册成功后跳转到登录页或首页
  activeTab.value = "login";
};

// 获取验证码
const getVerificationCode = () => {
  // 这里实现获取验证码的逻辑
  console.log("获取验证码", registerForm.phone);
};
</script>

<style scoped>
.login-page {
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.login-container {
  width: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.login-header {
  text-align: center;
  padding: 30px 0;
}

.login-logo {
  font-size: 24px;
  font-weight: bold;
  color: #e91e63;
  margin-bottom: 10px;
}

.login-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
}

.login-tab {
  flex: 1;
  text-align: center;
  padding: 15px 0;
  font-size: 16px;
  cursor: pointer;
  color: #666;
  position: relative;
  transition: all 0.3s;
}

.login-tab.active {
  color: #e91e63;
  font-weight: bold;
}

.login-tab.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #e91e63;
}

.login-body {
  padding: 30px;
}

.login-form,
.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  position: relative;
}

.form-icon {
  position: absolute;
  left: 15px;
  top: 12px;
  color: #999;
}

.login-input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.login-input:focus {
  border-color: #e91e63;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 5px;
}

.forgot-password {
  color: #666;
  text-decoration: none;
}

.forgot-password:hover {
  color: #e91e63;
}

.login-button {
  width: 100%;
  padding: 12px 0;
  background: #e91e63;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover {
  background: #d81b60;
}

.login-divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #999;
  font-size: 12px;
}

.login-divider::before,
.login-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}

.login-divider span {
  padding: 0 15px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.3s;
}

.social-icon:hover {
  transform: translateY(-3px);
}

.social-icon.wechat {
  background: #07c160;
}

.social-icon.qq {
  background: #12b7f5;
}

.social-icon.weibo {
  background: #e6162d;
}

.login-footer {
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
  color: #999;
  border-top: 1px solid #eee;
}

.login-footer a {
  color: #e91e63;
  text-decoration: none;
}

.verification-code {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: #f5f5f5;
  color: #666;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
}

.verification-code:hover {
  background: #eee;
}

.agreement {
  font-size: 12px;
  color: #999;
}

.agreement a {
  color: #e91e63;
  text-decoration: none;
}
</style>
