<template>
  <div class="category-page">
    <Header />

    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <router-link to="/">首页</router-link>
      <i class="fas fa-angle-right"></i>
      <span>{{ categoryName }}</span>
    </div>

    <!-- 分类筛选区 -->
    <div class="filter-section">
      <div class="filter-group">
        <div class="filter-title">分类：</div>
        <div class="filter-options">
          <div
            v-for="(cat, index) in categories"
            :key="index"
            :class="[
              'filter-option',
              selectedCategory === cat.id ? 'active' : '',
            ]"
            @click="selectCategory(cat.id)"
          >
            {{ cat.name }}
          </div>
        </div>
      </div>

      <div class="filter-group">
        <div class="filter-title">品牌：</div>
        <div class="filter-options">
          <div
            v-for="(brand, index) in brands"
            :key="index"
            :class="[
              'filter-option',
              selectedBrand === brand.id ? 'active' : '',
            ]"
            @click="selectBrand(brand.id)"
          >
            {{ brand.name }}
          </div>
        </div>
      </div>

      <div class="filter-group">
        <div class="filter-title">价格：</div>
        <div class="filter-options">
          <div
            v-for="(price, index) in priceRanges"
            :key="index"
            :class="[
              'filter-option',
              selectedPriceRange === index ? 'active' : '',
            ]"
            @click="selectPriceRange(index)"
          >
            {{ price.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- 排序 -->
    <div class="sort-section">
      <div class="sort-options">
        <div
          v-for="(option, index) in sortOptions"
          :key="index"
          :class="['sort-option', sortBy === option.value ? 'active' : '']"
          @click="setSortBy(option.value)"
        >
          {{ option.label }}
          <i
            v-if="sortBy === option.value"
            :class="[
              'fas',
              sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down',
            ]"
          ></i>
        </div>
      </div>

      <div class="view-switch">
        <i
          :class="['fas fa-th-large', viewMode === 'grid' ? 'active' : '']"
          @click="setViewMode('grid')"
        ></i>
        <i
          :class="['fas fa-list', viewMode === 'list' ? 'active' : '']"
          @click="setViewMode('list')"
        ></i>
      </div>
    </div>

    <!-- 商品列表 -->
    <div :class="['product-list', viewMode]">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-item"
      >
        <router-link :to="`/product/${product.id}`" class="product-link">
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-price">¥{{ product.price.toFixed(2) }}</div>
            <div class="product-sales">已售 {{ product.sales }}件</div>
            <div class="product-rating">
              <i class="fas fa-star"></i>
              <span>{{ product.rating }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <div
        class="page-item"
        @click="prevPage"
        :class="{ disabled: currentPage === 1 }"
      >
        <i class="fas fa-angle-left"></i>
      </div>
      <div
        v-for="page in totalPages"
        :key="page"
        :class="['page-item', currentPage === page ? 'active' : '']"
        @click="goToPage(page)"
      >
        {{ page }}
      </div>
      <div
        class="page-item"
        @click="nextPage"
        :class="{ disabled: currentPage === totalPages }"
      >
        <i class="fas fa-angle-right"></i>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const route = useRoute();
const categoryName = ref("全部商品");
const selectedCategory = ref(0);
const selectedBrand = ref(0);
const selectedPriceRange = ref(-1);
const sortBy = ref("default");
const sortOrder = ref("desc");
const viewMode = ref("grid");
const currentPage = ref(1);
const totalPages = ref(5);

const categories = reactive([
  { id: 0, name: "全部" },
  { id: 1, name: "手机" },
  { id: 2, name: "电脑" },
  { id: 3, name: "家电" },
  { id: 4, name: "服装" },
  { id: 5, name: "鞋包" },
]);

const brands = reactive([
  { id: 0, name: "全部" },
  { id: 1, name: "华为" },
  { id: 2, name: "小米" },
  { id: 3, name: "苹果" },
  { id: 4, name: "三星" },
  { id: 5, name: "联想" },
]);

const priceRanges = reactive([
  { label: "全部", min: 0, max: Infinity },
  { label: "0-499元", min: 0, max: 499 },
  { label: "500-999元", min: 500, max: 999 },
  { label: "1000-1999元", min: 1000, max: 1999 },
  { label: "2000-3999元", min: 2000, max: 3999 },
  { label: "4000元以上", min: 4000, max: Infinity },
]);

const sortOptions = reactive([
  { label: "默认排序", value: "default" },
  { label: "销量", value: "sales" },
  { label: "价格", value: "price" },
  { label: "评分", value: "rating" },
  { label: "上架时间", value: "time" },
]);

// 模拟商品数据
const products = reactive([
  {
    id: 1,
    name: "华为 P50 Pro 8GB+256GB 曜金黑 5G手机",
    price: 5988,
    sales: 1024,
    rating: 4.9,
    image: "https://via.placeholder.com/200x200?text=Huawei+P50",
    category: 1,
    brand: 1,
  },
  {
    id: 2,
    name: "小米12 Pro 12GB+256GB 紫色 5G手机",
    price: 4999,
    sales: 2048,
    rating: 4.8,
    image: "https://via.placeholder.com/200x200?text=Xiaomi+12",
    category: 1,
    brand: 2,
  },
  // 其他商品数据...
]);

// 方法
const selectCategory = (id) => {
  selectedCategory.value = id;
  filterProducts();
};

const selectBrand = (id) => {
  selectedBrand.value = id;
  filterProducts();
};

const selectPriceRange = (index) => {
  selectedPriceRange.value = index;
  filterProducts();
};

const setSortBy = (value) => {
  if (sortBy.value === value) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = value;
    sortOrder.value = "desc";
  }
  sortProducts();
};

const setViewMode = (mode) => {
  viewMode.value = mode;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

const filterProducts = () => {
  // 实际项目中这里应该调用API或者过滤本地数据
  console.log("Filtering products...");
};

const sortProducts = () => {
  // 实际项目中这里应该调用API或者排序本地数据
  console.log("Sorting products...");
};

onMounted(() => {
  // 根据路由参数设置初始分类
  if (route.query.type) {
    const categoryType = route.query.type;
    const category = categories.find(
      (c) => c.name.toLowerCase() === categoryType
    );
    if (category) {
      selectedCategory.value = category.id;
      categoryName.value = category.name;
    }
  }

  // 加载商品数据
  filterProducts();
});
</script>

<style scoped>
.category-page {
  padding: 20px;
}

.breadcrumb {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #999;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
}

.breadcrumb i {
  margin: 0 8px;
  font-size: 12px;
}

.filter-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  margin-bottom: 15px;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-title {
  width: 80px;
  color: #999;
  font-size: 14px;
  line-height: 32px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}

.filter-option {
  padding: 0 15px;
  height: 32px;
  line-height: 32px;
  border-radius: 16px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-option:hover {
  color: #e91e63;
}

.filter-option.active {
  background-color: #e91e63;
  color: #fff;
}

.sort-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.sort-options {
  display: flex;
}

.sort-option {
  margin-right: 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.sort-option i {
  margin-left: 5px;
}

.sort-option.active {
  color: #e91e63;
  font-weight: bold;
}

.view-switch {
  display: flex;
  align-items: center;
}

.view-switch i {
  font-size: 18px;
  margin-left: 15px;
  cursor: pointer;
  color: #999;
}

.view-switch i.active {
  color: #e91e63;
}

.product-list {
  display: grid;
  grid-gap: 20px;
  margin-bottom: 30px;
}

.product-list.grid {
  grid-template-columns: repeat(4, 1fr);
}

.product-list.list {
  grid-template-columns: 1fr;
}

.product-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-list.grid .product-image {
  height: 200px;
  overflow: hidden;
}

.product-list.list .product-link {
  display: flex;
}

.product-list.list .product-image {
  width: 200px;
  height: 200px;
  flex-shrink: 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-item:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 15px;
}

.product-name {
  font-size: 16px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  font-size: 18px;
  color: #e91e63;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-sales {
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
}

.product-rating {
  font-size: 12px;
  color: #ff9800;
  display: flex;
  align-items: center;
}

.product-rating i {
  margin-right: 3px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
}

.page-item {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.page-item:hover {
  color: #e91e63;
}

.page-item.active {
  background: #e91e63;
  color: white;
}

.page-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
