<template>
  <div class="home-page">
    <Header />

    <!-- 轮播图 -->
    <div class="carousel">
      <div class="carousel-inner">轮播图展示区域</div>
      <div class="carousel-indicators">
        <div class="carousel-indicator active"></div>
        <div class="carousel-indicator"></div>
        <div class="carousel-indicator"></div>
      </div>
    </div>

    <!-- 分类导航 -->
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

    <!-- 促销区域 -->
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

    <!-- 热门商品 -->
    <div class="promo-section">
      <div class="section-title">
        <h2>热门商品</h2>
        <router-link to="/category?sort=popular"
          >查看更多 <i class="fas fa-chevron-right"></i
        ></router-link>
      </div>
      <div class="product-grid">
        <div
          class="product-card"
          v-for="product in hotProducts"
          :key="product.id"
        >
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

    <!-- 新品上市 -->
    <div class="promo-section">
      <div class="section-title">
        <h2>新品上市</h2>
        <router-link to="/category?sort=new"
          >查看更多 <i class="fas fa-chevron-right"></i
        ></router-link>
      </div>
      <div class="product-grid">
        <div
          class="product-card"
          v-for="product in newProducts"
          :key="product.id"
        >
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

    <Footer />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

// 模拟数据，实际项目中应该从API获取
const hotProducts = reactive([
  {
    id: 1,
    title: "2023新款时尚百搭连衣裙女夏季薄款显瘦气质裙子",
    price: 199,
    originalPrice: 299,
  },
  {
    id: 2,
    title: "新款智能手机 全网通5G 8+256GB 超长待机",
    price: 2999,
    originalPrice: 3299,
  },
  {
    id: 3,
    title: "轻薄笔记本电脑 15.6英寸 16G内存 512G固态",
    price: 4999,
    originalPrice: 5699,
  },
  {
    id: 4,
    title: "无线蓝牙耳机 降噪长续航 舒适佩戴",
    price: 299,
    originalPrice: 399,
  },
]);

const newProducts = reactive([
  {
    id: 5,
    title: "高端智能手表 心率监测 多功能运动手环",
    price: 899,
    originalPrice: 1099,
  },
  {
    id: 6,
    title: "家用智能扫地机器人 全自动清扫拖地一体机",
    price: 1599,
    originalPrice: 1899,
  },
  {
    id: 7,
    title: "便携式蓝牙音箱 防水设计 20小时续航",
    price: 399,
    originalPrice: 499,
  },
  {
    id: 8,
    title: "时尚休闲男士外套 春秋季新款潮流夹克",
    price: 299,
    originalPrice: 399,
  },
]);
</script>

<style scoped>
.home-page {
  width: 100%;
}

/* 轮播图 */
.carousel {
  position: relative;
  height: 300px;
  margin: 20px 0;
  overflow: hidden;
  border-radius: 8px;
}

.carousel-inner {
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.carousel-indicator {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
}

.carousel-indicator.active {
  background: white;
}

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
