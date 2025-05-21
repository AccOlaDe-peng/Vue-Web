<template>
  <div class="promo-section">
    <div class="section-title">
      <h2>限时特惠</h2>
      <router-link to="/category?promotion=true"
        >查看更多 <i class="fas fa-chevron-right"></i
      ></router-link>
    </div>
    <div class="promo-grid">
      <div class="promo-card">新品上市 5折起</div>
      <div class="promo-card">会员专享 满300减50</div>
    </div>
  </div>
</template>

<script setup>
// 无需额外的逻辑
</script>

<style scoped>
/* 促销区域 */
.promo-section {
  margin: 30px 0;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-title h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.section-title a {
  color: #999;
  text-decoration: none;
  font-size: 14px;
}

.promo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.promo-card {
  height: 120px;
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
}
</style>
