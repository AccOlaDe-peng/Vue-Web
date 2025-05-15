<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="logo">
          <router-link to="/">
            <h1>优购商城</h1>
          </router-link>
        </div>
      </div>

      <div class="login-content">
        <div class="login-form-container">
          <h2>用户登录</h2>

          <div class="login-tabs">
            <div
              v-for="(tab, index) in tabs"
              :key="index"
              :class="['tab-item', activeTab === index ? 'active' : '']"
              @click="activeTab = index"
            >
              {{ tab }}
            </div>
          </div>

          <!-- 账号密码登录 -->
          <form
            v-if="activeTab === 0"
            class="login-form"
            @submit.prevent="handleLogin"
          >
            <div class="form-group">
              <label for="username">用户名/手机号</label>
              <div class="input-container">
                <i class="fas fa-user"></i>
                <input
                  type="text"
                  id="username"
                  v-model="accountForm.username"
                  placeholder="请输入用户名或手机号"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="password">密码</label>
              <div class="input-container">
                <i class="fas fa-lock"></i>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="accountForm.password"
                  placeholder="请输入密码"
                  required
                />
                <i
                  :class="[
                    'fas',
                    showPassword ? 'fa-eye-slash' : 'fa-eye',
                    'toggle-password',
                  ]"
                  @click="togglePassword"
                ></i>
              </div>
            </div>

            <div class="form-options">
              <div class="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  v-model="accountForm.remember"
                />
                <label for="remember">记住我</label>
              </div>
              <router-link to="/forgot-password" class="forgot-password"
                >忘记密码？</router-link
              >
            </div>

            <button type="submit" class="btn-login">登录</button>
          </form>

          <!-- 手机验证码登录 -->
          <form v-else class="login-form" @submit.prevent="handleSmsLogin">
            <div class="form-group">
              <label for="phone">手机号</label>
              <div class="input-container">
                <i class="fas fa-mobile-alt"></i>
                <input
                  type="tel"
                  id="phone"
                  v-model="smsForm.phone"
                  placeholder="请输入手机号"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="sms-code">验证码</label>
              <div class="input-container">
                <i class="fas fa-key"></i>
                <input
                  type="text"
                  id="sms-code"
                  v-model="smsForm.code"
                  placeholder="请输入验证码"
                  required
                />
                <button
                  type="button"
                  class="btn-send-code"
                  :disabled="countdown > 0"
                  @click="sendSmsCode"
                >
                  {{ countdown > 0 ? `${countdown}秒后重发` : "获取验证码" }}
                </button>
              </div>
            </div>

            <button type="submit" class="btn-login">登录</button>
          </form>

          <div class="login-divider">
            <span>其他登录方式</span>
          </div>

          <div class="social-login">
            <button type="button" class="btn-social wechat">
              <i class="fab fa-weixin"></i>
            </button>
            <button type="button" class="btn-social qq">
              <i class="fab fa-qq"></i>
            </button>
            <button type="button" class="btn-social weibo">
              <i class="fab fa-weibo"></i>
            </button>
          </div>

          <div class="register-link">
            还没有账号？<router-link to="/register">立即注册</router-link>
          </div>
        </div>

        <div class="login-banner">
          <img src="https://via.placeholder.com/500x600" alt="登录页广告" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      activeTab: 0,
      tabs: ["账号密码登录", "手机验证码登录"],
      showPassword: false,
      countdown: 0,
      countdownTimer: null,
      accountForm: {
        username: "",
        password: "",
        remember: false,
      },
      smsForm: {
        phone: "",
        code: "",
      },
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    handleLogin() {
      // 处理账号密码登录
      console.log("账号密码登录:", this.accountForm);

      // 模拟登录成功
      this.$router.push("/");
    },
    handleSmsLogin() {
      // 处理短信验证码登录
      console.log("短信验证码登录:", this.smsForm);

      // 模拟登录成功
      this.$router.push("/");
    },
    sendSmsCode() {
      // 验证手机号
      if (!this.validatePhone(this.smsForm.phone)) {
        alert("请输入正确的手机号");
        return;
      }

      // 发送短信验证码
      console.log("发送验证码到:", this.smsForm.phone);

      // 开始倒计时
      this.countdown = 60;
      this.countdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.countdownTimer);
        }
      }, 1000);
    },
    validatePhone(phone) {
      // 简单的手机号验证
      const reg = /^1[3-9]\d{9}$/;
      return reg.test(phone);
    },
  },
  beforeUnmount() {
    // 清除定时器
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.login-container {
  width: 100%;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.login-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.logo {
  text-align: center;
}

.logo a {
  text-decoration: none;
  color: #e91e63;
}

.login-content {
  display: flex;
}

.login-form-container {
  flex: 1;
  padding: 40px;
}

.login-form-container h2 {
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
}

.login-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
}

.tab-item {
  flex: 1;
  padding: 15px 0;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.tab-item:hover {
  color: #e91e63;
}

.tab-item.active {
  color: #e91e63;
  font-weight: bold;
}

.tab-item.active:after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #e91e63;
}

.login-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.input-container i {
  width: 50px;
  text-align: center;
  color: #999;
}

.input-container input {
  flex: 1;
  padding: 12px 15px 12px 0;
  border: none;
  outline: none;
  font-size: 16px;
}

.toggle-password {
  cursor: pointer;
  padding-right: 15px;
}

.btn-send-code {
  padding: 0 15px;
  height: 100%;
  border: none;
  background-color: #e91e63;
  color: #fff;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-send-code:hover {
  background-color: #d81b60;
}

.btn-send-code:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 5px;
}

.forgot-password {
  color: #666;
  text-decoration: none;
}

.forgot-password:hover {
  color: #e91e63;
}

.btn-login {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #e91e63;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-login:hover {
  background-color: #d81b60;
}

.login-divider {
  position: relative;
  text-align: center;
  margin: 30px 0;
}

.login-divider:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #eee;
}

.login-divider span {
  position: relative;
  background-color: #fff;
  padding: 0 15px;
  color: #999;
  font-size: 14px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.btn-social {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-social.wechat {
  background-color: #07c160;
  color: #fff;
}

.btn-social.qq {
  background-color: #12b7f5;
  color: #fff;
}

.btn-social.weibo {
  background-color: #e6162d;
  color: #fff;
}

.btn-social:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.register-link {
  text-align: center;
  color: #666;
}

.register-link a {
  color: #e91e63;
  text-decoration: none;
  font-weight: bold;
}

.login-banner {
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}

.login-banner img {
  max-width: 100%;
  max-height: 100%;
}

@media (max-width: 768px) {
  .login-content {
    flex-direction: column;
  }

  .login-banner {
    display: none;
  }
}
</style>
