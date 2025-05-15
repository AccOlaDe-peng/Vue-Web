<template>
  <div class="footer">
    <div class="footer-links">
      <router-link to="/about">关于我们</router-link>
      <router-link to="/contact">联系我们</router-link>
      <router-link to="/service">客户服务</router-link>
      <router-link to="/privacy">隐私政策</router-link>
    </div>
    <p>© {{ currentYear }} 优购商城 版权所有</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const currentYear = computed(() => {
  return new Date().getFullYear();
});
</script>

<style scoped>
.footer {
  margin-top: 30px;
  padding: 20px 0;
  border-top: 1px solid #eee;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
}

.footer-links a:hover {
  color: #e91e63;
}
</style>
