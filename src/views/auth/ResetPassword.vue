<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="login-logo">优购商城</div>
        <div class="reset-title">找回密码</div>
      </div>

      <div class="login-body">
        <!-- 重置密码步骤 -->
        <div class="reset-steps">
          <div
            class="reset-step"
            :class="{ active: currentStep === 1, completed: currentStep > 1 }"
          >
            <div class="step-number">{{ currentStep > 1 ? "✓" : "1" }}</div>
            <div class="step-text">验证身份</div>
          </div>
          <div
            class="reset-step"
            :class="{ active: currentStep === 2, completed: currentStep > 2 }"
          >
            <div class="step-number">{{ currentStep > 2 ? "✓" : "2" }}</div>
            <div class="step-text">设置新密码</div>
          </div>
          <div class="reset-step" :class="{ active: currentStep === 3 }">
            <div class="step-number">3</div>
            <div class="step-text">完成</div>
          </div>
        </div>

        <!-- 步骤1：验证身份 -->
        <div v-if="currentStep === 1" class="reset-form">
          <div class="form-item">
            <i class="fas fa-mobile-alt form-icon"></i>
            <input
              type="text"
              class="login-input"
              placeholder="请输入注册手机号"
              v-model="resetForm.phone"
            />
          </div>
          <div class="form-item">
            <i class="fas fa-shield-alt form-icon"></i>
            <input
              type="text"
              class="login-input"
              placeholder="验证码"
              v-model="resetForm.code"
            />
            <button
              class="verification-code"
              @click="getVerificationCode"
              :disabled="cooldown > 0"
            >
              {{ cooldown > 0 ? `${cooldown}秒后重试` : "获取验证码" }}
            </button>
          </div>
          <button class="login-button" @click="goToStep2">下一步</button>
        </div>

        <!-- 步骤2：设置新密码 -->
        <div v-if="currentStep === 2" class="reset-form">
          <div class="form-item">
            <i class="fas fa-lock form-icon"></i>
            <input
              type="password"
              class="login-input"
              placeholder="请输入新密码"
              v-model="resetForm.newPassword"
            />
          </div>
          <div class="form-item">
            <i class="fas fa-lock form-icon"></i>
            <input
              type="password"
              class="login-input"
              placeholder="请确认新密码"
              v-model="resetForm.confirmPassword"
            />
          </div>
          <div class="password-tips">
            <p>密码要求：</p>
            <p>• 长度为8-20个字符</p>
            <p>• 必须包含字母、数字</p>
            <p>• 不能包含特殊字符</p>
          </div>
          <button class="login-button" @click="goToStep3">确认修改</button>
        </div>

        <!-- 步骤3：完成 -->
        <div v-if="currentStep === 3" class="reset-form">
          <div class="success-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="success-text">密码重置成功！</div>
          <div class="success-tips">
            您的账户密码已成功重置，请使用新密码登录。
          </div>
          <button class="login-button" @click="goToLogin">立即登录</button>
        </div>
      </div>

      <div class="login-footer">
        <a @click="goToLogin" class="back-to-login">返回登录</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentStep = ref(1);
const cooldown = ref(0);

// 重置密码表单数据
const resetForm = reactive({
  phone: "",
  code: "",
  newPassword: "",
  confirmPassword: "",
});

// 跳转到登录页
const goToLogin = () => {
  router.push("/login");
};

// 获取验证码
const getVerificationCode = () => {
  if (!resetForm.phone) {
    alert("请先输入手机号码");
    return;
  }

  // 手机号格式验证
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(resetForm.phone)) {
    alert("请输入正确的手机号码");
    return;
  }

  // 发送验证码
  console.log("获取验证码", resetForm.phone);

  // 设置冷却时间
  cooldown.value = 60;
  const timer = setInterval(() => {
    cooldown.value--;
    if (cooldown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

// 进入第二步
const goToStep2 = () => {
  if (!resetForm.phone) {
    alert("请输入手机号码");
    return;
  }
  if (!resetForm.code) {
    alert("请输入验证码");
    return;
  }

  // 验证验证码
  console.log("验证验证码", resetForm.phone, resetForm.code);

  // 验证成功，进入第二步
  currentStep.value = 2;
};

// 进入第三步
const goToStep3 = () => {
  if (!resetForm.newPassword) {
    alert("请输入新密码");
    return;
  }
  if (!resetForm.confirmPassword) {
    alert("请确认新密码");
    return;
  }
  if (resetForm.newPassword !== resetForm.confirmPassword) {
    alert("两次输入的密码不一致");
    return;
  }

  // 密码强度验证
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
  if (!passwordRegex.test(resetForm.newPassword)) {
    alert("密码不符合要求，请按照提示设置密码");
    return;
  }

  // 提交新密码
  console.log("提交新密码", resetForm.newPassword);

  // 重置成功，进入第三步
  currentStep.value = 3;
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

.reset-title {
  font-size: 18px;
  color: #333;
}

.login-body {
  padding: 30px;
}

.reset-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.reset-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 33.33%;
}

.reset-step::after {
  content: "";
  position: absolute;
  top: 15px;
  left: 50%;
  width: 100%;
  height: 1px;
  background: #ddd;
  z-index: 1;
}

.reset-step:last-child::after {
  display: none;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f5f5f5;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
}

.step-text {
  font-size: 12px;
  color: #999;
}

.reset-step.active .step-number {
  background: #e91e63;
  color: white;
}

.reset-step.active .step-text {
  color: #e91e63;
  font-weight: bold;
}

.reset-step.completed .step-number {
  background: #e91e63;
  color: white;
}

.reset-step.completed::after {
  background: #e91e63;
}

.reset-form {
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

.password-tips {
  background: #f9f9f9;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  line-height: 1.6;
}

.success-icon {
  text-align: center;
  font-size: 60px;
  color: #52c41a;
  margin-bottom: 20px;
}

.success-text {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.success-tips {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.login-footer {
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
  color: #999;
  border-top: 1px solid #eee;
}

.back-to-login {
  color: #e91e63;
  text-decoration: none;
  cursor: pointer;
}

.back-to-login:hover {
  text-decoration: underline;
}
</style>
