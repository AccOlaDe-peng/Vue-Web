<template>
  <div class="category-nav">
    <router-link
      :to="{ path: '/category', query: { type: 'clothing' } }"
      class="category-item"
    >
      <div class="category-icon">
        <i class="fas fa-tshirt"></i>
      </div>
      <span>服装</span>
    </router-link>
    <router-link
      :to="{ path: '/category', query: { type: 'phone' } }"
      class="category-item"
    >
      <div class="category-icon">
        <i class="fas fa-mobile-alt"></i>
      </div>
      <span>手机</span>
    </router-link>
    <router-link
      :to="{ path: '/category', query: { type: 'computer' } }"
      class="category-item"
    >
      <div class="category-icon">
        <i class="fas fa-laptop"></i>
      </div>
      <span>电脑</span>
    </router-link>
    <router-link
      :to="{ path: '/category', query: { type: 'food' } }"
      class="category-item"
    >
      <div class="category-icon">
        <i class="fas fa-utensils"></i>
      </div>
      <span>美食</span>
    </router-link>
    <router-link
      :to="{ path: '/category', query: { type: 'more' } }"
      class="category-item"
    >
      <div class="category-icon">
        <i class="fas fa-ellipsis-h"></i>
      </div>
      <span>更多</span>
    </router-link>
  </div>
</template>

<script setup>
// 无需额外的逻辑
</script>

<style scoped>
/* 分类导航 */
.category-nav {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin: 30px 0;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.category-icon {
  width: 60px;
  height: 60px;
  background: #f8f8f8;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  color: #e91e63;
  font-size: 24px;
}
</style>
