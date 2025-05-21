<template>
  <div class="promo-section">
    <div class="section-title">
      <h2>{{ title }}</h2>
      <router-link :to="moreLink"
        >查看更多 <i class="fas fa-chevron-right"></i
      ></router-link>
    </div>
    <div class="product-grid">
      <div class="product-card" v-for="product in products" :key="product.id">
        <router-link :to="`/product/${product.id}`">
          <div class="product-image">{{ product.image || "商品图片" }}</div>
          <div class="product-info">
            <div class="product-title">{{ product.title }}</div>
            <div class="product-price">
              ¥{{ product.price }}
              <small v-if="product.originalPrice"
                >¥{{ product.originalPrice }}</small
              >
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  moreLink: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
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

/* 商品列表 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card a {
  text-decoration: none;
  color: inherit;
}

.product-image {
  height: 180px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
}

.product-info {
  padding: 15px;
}

.product-title {
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  color: #e91e63;
  font-size: 18px;
  font-weight: bold;
}

.product-price small {
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 5px;
  font-weight: normal;
}
</style>
