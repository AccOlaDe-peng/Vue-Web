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
          @click="goToLogin"
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

      <!-- 注册表单 -->
      <div class="login-body">
        <div class="register-form">
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
            <button
              class="verification-code"
              @click="getVerificationCode"
              :disabled="cooldown > 0"
            >
              {{ cooldown > 0 ? `${cooldown}秒后重试` : "获取验证码" }}
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
        注册即表示您同意我们的 <a href="#terms">服务条款</a> 和
        <a href="#privacy">隐私政策</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("register");
const cooldown = ref(0);

// 注册表单数据
const registerForm = reactive({
  phone: "",
  code: "",
  password: "",
  confirmPassword: "",
  agreement: false,
});

// 跳转到登录页
const goToLogin = () => {
  router.push("/auth/login");
};

// 注册方法
const handleRegister = () => {
  // 表单验证
  if (!registerForm.phone) {
    alert("请输入手机号码");
    return;
  }
  if (!registerForm.code) {
    alert("请输入验证码");
    return;
  }
  if (!registerForm.password) {
    alert("请设置密码");
    return;
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    alert("两次输入的密码不一致");
    return;
  }
  if (!registerForm.agreement) {
    alert("请阅读并同意用户协议和隐私政策");
    return;
  }

  // 这里实现注册逻辑
  console.log("注册表单提交", registerForm);

  // 模拟注册成功后跳转到登录页
  router.push("/auth/login");
};

// 获取验证码
const getVerificationCode = () => {
  if (!registerForm.phone) {
    alert("请先输入手机号码");
    return;
  }

  // 手机号格式验证
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(registerForm.phone)) {
    alert("请输入正确的手机号码");
    return;
  }

  // 发送验证码
  console.log("获取验证码", registerForm.phone);

  // 设置冷却时间
  cooldown.value = 60;
  const timer = setInterval(() => {
    cooldown.value--;
    if (cooldown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
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
  min-width: 90px;
}

.verification-code:hover:not(:disabled) {
  background: #eee;
}

.verification-code:disabled {
  background: #f0f0f0;
  color: #aaa;
  cursor: not-allowed;
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
