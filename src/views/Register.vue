<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-header">
        <div class="logo">
          <router-link to="/">
            <h1>优购商城</h1>
          </router-link>
        </div>
      </div>

      <div class="register-content">
        <div class="register-form-container">
          <h2>用户注册</h2>

          <form class="register-form" @submit.prevent="handleRegister">
            <div class="form-group">
              <label for="phone">手机号</label>
              <div class="input-container">
                <i class="fas fa-mobile-alt"></i>
                <input
                  type="tel"
                  id="phone"
                  v-model="form.phone"
                  placeholder="请输入手机号"
                  required
                  @blur="validatePhone"
                />
              </div>
              <div class="error-message" v-if="errors.phone">
                {{ errors.phone }}
              </div>
            </div>

            <div class="form-group">
              <label for="sms-code">验证码</label>
              <div class="input-container">
                <i class="fas fa-key"></i>
                <input
                  type="text"
                  id="sms-code"
                  v-model="form.code"
                  placeholder="请输入验证码"
                  required
                />
                <button
                  type="button"
                  class="btn-send-code"
                  :disabled="countdown > 0 || errors.phone"
                  @click="sendSmsCode"
                >
                  {{ countdown > 0 ? `${countdown}秒后重发` : "获取验证码" }}
                </button>
              </div>
              <div class="error-message" v-if="errors.code">
                {{ errors.code }}
              </div>
            </div>

            <div class="form-group">
              <label for="username">用户名</label>
              <div class="input-container">
                <i class="fas fa-user"></i>
                <input
                  type="text"
                  id="username"
                  v-model="form.username"
                  placeholder="请设置用户名（4-16位字母、数字或下划线）"
                  required
                  @blur="validateUsername"
                />
              </div>
              <div class="error-message" v-if="errors.username">
                {{ errors.username }}
              </div>
            </div>

            <div class="form-group">
              <label for="password">密码</label>
              <div class="input-container">
                <i class="fas fa-lock"></i>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="form.password"
                  placeholder="请设置密码（8-20位，包含字母和数字）"
                  required
                  @blur="validatePassword"
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
              <div class="error-message" v-if="errors.password">
                {{ errors.password }}
              </div>
            </div>

            <div class="form-group">
              <label for="confirm-password">确认密码</label>
              <div class="input-container">
                <i class="fas fa-lock"></i>
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirm-password"
                  v-model="form.confirmPassword"
                  placeholder="请再次输入密码"
                  required
                  @blur="validateConfirmPassword"
                />
                <i
                  :class="[
                    'fas',
                    showConfirmPassword ? 'fa-eye-slash' : 'fa-eye',
                    'toggle-password',
                  ]"
                  @click="toggleConfirmPassword"
                ></i>
              </div>
              <div class="error-message" v-if="errors.confirmPassword">
                {{ errors.confirmPassword }}
              </div>
            </div>

            <div class="form-agreement">
              <input
                type="checkbox"
                id="agreement"
                v-model="form.agreement"
                required
              />
              <label for="agreement">
                我已阅读并同意
                <a href="#" @click.prevent="showTerms">《用户协议》</a>
                和
                <a href="#" @click.prevent="showPrivacy">《隐私政策》</a>
              </label>
            </div>

            <button type="submit" class="btn-register" :disabled="!isFormValid">
              注册
            </button>
          </form>

          <div class="login-link">
            已有账号？<router-link to="/login">立即登录</router-link>
          </div>
        </div>

        <div class="register-banner">
          <img src="https://via.placeholder.com/500x700" alt="注册页广告" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        phone: "",
        code: "",
        username: "",
        password: "",
        confirmPassword: "",
        agreement: false,
      },
      errors: {
        phone: "",
        code: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      showPassword: false,
      showConfirmPassword: false,
      countdown: 0,
      countdownTimer: null,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.form.phone &&
        this.form.code &&
        this.form.username &&
        this.form.password &&
        this.form.confirmPassword &&
        this.form.agreement &&
        !this.errors.phone &&
        !this.errors.username &&
        !this.errors.password &&
        !this.errors.confirmPassword
      );
    },
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    validatePhone() {
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!this.form.phone) {
        this.errors.phone = "请输入手机号";
      } else if (!phoneRegex.test(this.form.phone)) {
        this.errors.phone = "请输入正确的手机号";
      } else {
        this.errors.phone = "";
      }
    },
    validateUsername() {
      const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
      if (!this.form.username) {
        this.errors.username = "请输入用户名";
      } else if (!usernameRegex.test(this.form.username)) {
        this.errors.username = "用户名应为4-16位字母、数字或下划线";
      } else {
        this.errors.username = "";
      }
    },
    validatePassword() {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
      if (!this.form.password) {
        this.errors.password = "请输入密码";
      } else if (!passwordRegex.test(this.form.password)) {
        this.errors.password = "密码应为8-20位，包含字母和数字";
      } else {
        this.errors.password = "";
      }

      // 如果确认密码已填写，则同时验证确认密码
      if (this.form.confirmPassword) {
        this.validateConfirmPassword();
      }
    },
    validateConfirmPassword() {
      if (!this.form.confirmPassword) {
        this.errors.confirmPassword = "请确认密码";
      } else if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = "两次输入的密码不一致";
      } else {
        this.errors.confirmPassword = "";
      }
    },
    sendSmsCode() {
      // 验证手机号
      this.validatePhone();
      if (this.errors.phone) {
        return;
      }

      // 发送短信验证码
      console.log("发送验证码到:", this.form.phone);

      // 开始倒计时
      this.countdown = 60;
      this.countdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.countdownTimer);
        }
      }, 1000);
    },
    handleRegister() {
      // 验证所有表单项
      this.validatePhone();
      this.validateUsername();
      this.validatePassword();
      this.validateConfirmPassword();

      if (!this.form.code) {
        this.errors.code = "请输入验证码";
        return;
      }

      if (!this.form.agreement) {
        alert("请阅读并同意用户协议和隐私政策");
        return;
      }

      // 检查是否有错误
      for (const key in this.errors) {
        if (this.errors[key]) {
          return;
        }
      }

      // 提交注册信息
      console.log("注册信息:", this.form);

      // 模拟注册成功
      alert("注册成功！");
      this.$router.push("/login");
    },
    showTerms() {
      alert("用户协议内容");
    },
    showPrivacy() {
      alert("隐私政策内容");
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
.register-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.register-container {
  width: 100%;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.register-header {
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

.register-content {
  display: flex;
}

.register-form-container {
  flex: 1;
  padding: 40px;
}

.register-form-container h2 {
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
}

.register-form {
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

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
}

.form-agreement {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.form-agreement input {
  margin-top: 3px;
  margin-right: 8px;
}

.form-agreement label {
  font-size: 14px;
  color: #666;
}

.form-agreement a {
  color: #e91e63;
  text-decoration: none;
}

.btn-register {
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

.btn-register:hover {
  background-color: #d81b60;
}

.btn-register:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  color: #666;
}

.login-link a {
  color: #e91e63;
  text-decoration: none;
  font-weight: bold;
}

.register-banner {
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}

.register-banner img {
  max-width: 100%;
  max-height: 100%;
}

@media (max-width: 768px) {
  .register-content {
    flex-direction: column;
  }

  .register-banner {
    display: none;
  }
}
</style>
