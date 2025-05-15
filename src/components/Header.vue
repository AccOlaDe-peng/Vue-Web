<template>
  <div class="header">
    <div class="logo">
      <router-link to="/">优购商城</router-link>
    </div>
    <div class="search-bar">
      <input
        type="text"
        placeholder="搜索商品"
        v-model="searchKeyword"
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch"><i class="fas fa-search"></i></button>
    </div>
    <div class="user-actions">
      <router-link to="/user">
        <i class="fas fa-user"></i>
        <span>我的</span>
      </router-link>
      <router-link to="/cart">
        <i class="fas fa-shopping-cart"></i>
        <span>购物车</span>
        <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchKeyword = ref("");
const cartCount = ref(0);

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({
      path: "/search",
      query: { keyword: searchKeyword.value },
    });
  }
};

onMounted(() => {
  // 这里可以从本地存储或者Vuex中获取购物车数量
  // 示例代码，实际应根据项目状态管理方式调整
  cartCount.value = localStorage.getItem("cartCount") || 0;
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.logo a {
  color: #e91e63;
  text-decoration: none;
}

.search-bar {
  display: flex;
  width: 50%;
}

.search-bar input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-bar button {
  padding: 0 15px;
  background: #e91e63;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.user-actions {
  display: flex;
  gap: 15px;
}

.user-actions a {
  color: #666;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  position: relative;
}

.user-actions i {
  font-size: 18px;
  margin-bottom: 5px;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e91e63;
  color: white;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
