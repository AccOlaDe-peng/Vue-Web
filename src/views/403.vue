<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-code">403</div>
      <div class="error-title">权限不足</div>
      <div class="error-desc">抱歉，您没有权限访问此页面</div>
      <div class="error-actions">
        <router-link to="/" class="btn-back">返回首页</router-link>
        <router-link to="/login" class="btn-login">重新登录</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ForbiddenPage",
  setup() {
    return {};
  },
});
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.error-container {
  text-align: center;
  padding: 2rem;
  max-width: 500px;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  color: #dc3545;
  line-height: 1;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #343a40;
}

.error-desc {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 2rem;
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-back,
.btn-login {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-back {
  background-color: #007bff;
  color: white;
}

.btn-back:hover {
  background-color: #0069d9;
}

.btn-login {
  background-color: #6c757d;
  color: white;
}

.btn-login:hover {
  background-color: #5a6268;
}
</style>
