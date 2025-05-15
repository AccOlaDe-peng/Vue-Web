<template>
  <div class="search-container">
    <div class="search-header">
      <h1>搜索结果</h1>
    </div>

    <div class="search-content">
      <div v-if="loading" class="loading">
        <i class="fas fa-spinner fa-spin"></i> 加载中...
      </div>

      <div v-else-if="searchResults.length > 0" class="search-results">
        <div
          v-for="(item, index) in searchResults"
          :key="index"
          class="search-item"
        >
          <div class="product-card">
            <div class="product-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="product-info">
              <h3>{{ item.name }}</h3>
              <p class="price">¥{{ item.price.toFixed(2) }}</p>
              <p class="description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no-results">
        <i class="fas fa-search"></i>
        <p>没有找到相关商品</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      loading: true,
    };
  },
  created() {
    // 从URL获取搜索参数
    this.searchQuery = this.$route.query.q || "";
    this.fetchSearchResults();
  },
  methods: {
    fetchSearchResults() {
      // 这里应该是实际的API调用
      // 模拟API调用
      setTimeout(() => {
        // 模拟数据
        if (this.searchQuery) {
          this.searchResults = [
            {
              id: 1,
              name: "商品示例1",
              price: 199.99,
              description: "这是一个示例商品描述",
              image: "https://via.placeholder.com/150",
            },
            {
              id: 2,
              name: "商品示例2",
              price: 299.99,
              description: "这是另一个示例商品描述",
              image: "https://via.placeholder.com/150",
            },
          ];
        } else {
          this.searchResults = [];
        }
        this.loading = false;
      }, 1000);
    },
  },
  watch: {
    // 监听路由变化，更新搜索结果
    "$route.query.q": function (newVal) {
      this.searchQuery = newVal || "";
      this.loading = true;
      this.fetchSearchResults();
    },
  },
};
</script>

<style scoped>
.search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-header {
  margin-bottom: 20px;
}

.search-content {
  min-height: 400px;
}

.loading {
  text-align: center;
  padding: 50px 0;
  font-size: 18px;
}

.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.search-item {
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.search-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-card {
  display: flex;
  flex-direction: column;
}

.product-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.price {
  color: #e4393c;
  font-weight: bold;
  font-size: 18px;
  margin: 5px 0;
}

.description {
  color: #666;
  font-size: 14px;
}

.no-results {
  text-align: center;
  padding: 50px 0;
}

.no-results i {
  font-size: 48px;
  color: #ccc;
  margin-bottom: 15px;
}

.no-results p {
  font-size: 18px;
  color: #666;
}
</style>
