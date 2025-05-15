<template>
  <div class="product-page">
    <Header />

    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <router-link to="/">首页</router-link>
      <i class="fas fa-angle-right"></i>
      <router-link
        :to="{
          path: '/category',
          query: { type: product.categoryName.toLowerCase() },
        }"
      >
        {{ product.categoryName }}
      </router-link>
      <i class="fas fa-angle-right"></i>
      <span>{{ product.name }}</span>
    </div>

    <div class="product-container">
      <!-- 商品图片区 -->
      <div class="product-gallery">
        <div class="main-image">
          <img :src="selectedImage" :alt="product.name" />
        </div>
        <div class="thumbnail-list">
          <div
            v-for="(image, index) in product.images"
            :key="index"
            :class="['thumbnail', selectedImageIndex === index ? 'active' : '']"
            @click="selectImage(index)"
          >
            <img :src="image" :alt="`${product.name} - 图片 ${index + 1}`" />
          </div>
        </div>
      </div>

      <!-- 商品信息区 -->
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <div class="product-brief">{{ product.brief }}</div>

        <div class="product-meta">
          <div class="meta-item">
            <span class="label">价格：</span>
            <span class="price">¥{{ product.price.toFixed(2) }}</span>
          </div>
          <div class="meta-item">
            <span class="label">销量：</span>
            <span>{{ product.sales }}件</span>
          </div>
          <div class="meta-item">
            <span class="label">评分：</span>
            <span class="rating">
              <i class="fas fa-star"></i>
              <span>{{ product.rating }}</span>
            </span>
          </div>
        </div>

        <!-- 规格选择 -->
        <div class="product-specs">
          <div
            class="spec-group"
            v-for="(spec, specIndex) in product.specs"
            :key="specIndex"
          >
            <div class="spec-title">{{ spec.name }}：</div>
            <div class="spec-options">
              <div
                v-for="(option, optionIndex) in spec.options"
                :key="optionIndex"
                :class="[
                  'spec-option',
                  selectedSpecs[spec.name] === option ? 'active' : '',
                ]"
                @click="selectSpec(spec.name, option)"
              >
                {{ option }}
              </div>
            </div>
          </div>
        </div>

        <!-- 数量选择 -->
        <div class="product-quantity">
          <div class="quantity-title">数量：</div>
          <div class="quantity-control">
            <button
              class="quantity-btn"
              @click="decreaseQuantity"
              :disabled="quantity <= 1"
            >
              <i class="fas fa-minus"></i>
            </button>
            <input
              type="number"
              v-model.number="quantity"
              min="1"
              max="999"
              @input="validateQuantity"
            />
            <button class="quantity-btn" @click="increaseQuantity">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="stock">库存 {{ product.stock }} 件</div>
        </div>

        <!-- 购买按钮 -->
        <div class="product-actions">
          <button class="btn-add-cart" @click="addToCart">
            <i class="fas fa-shopping-cart"></i>
            加入购物车
          </button>
          <button class="btn-buy-now" @click="buyNow">立即购买</button>
        </div>

        <!-- 服务承诺 -->
        <div class="product-services">
          <div class="service-item">
            <i class="fas fa-shield-alt"></i>
            <span>正品保障</span>
          </div>
          <div class="service-item">
            <i class="fas fa-truck"></i>
            <span>极速发货</span>
          </div>
          <div class="service-item">
            <i class="fas fa-undo"></i>
            <span>7天无理由退换</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="product-detail">
      <div class="detail-tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['tab-item', activeTab === index ? 'active' : '']"
          @click="activeTab = index"
        >
          {{ tab }}
        </div>
      </div>

      <div class="detail-content">
        <!-- 商品详情 -->
        <div v-if="activeTab === 0" class="detail-description">
          <h3>商品详情</h3>
          <div class="detail-text">
            {{ product.description }}
          </div>
          <div class="detail-images">
            <img
              v-for="(image, index) in product.detailImages"
              :key="index"
              :src="image"
              alt="商品详情图"
            />
          </div>
        </div>

        <!-- 规格参数 -->
        <div v-if="activeTab === 1" class="detail-params">
          <h3>规格参数</h3>
          <table class="params-table">
            <tr v-for="(param, index) in product.params" :key="index">
              <td class="param-name">{{ param.name }}</td>
              <td class="param-value">{{ param.value }}</td>
            </tr>
          </table>
        </div>

        <!-- 用户评价 -->
        <div v-if="activeTab === 2" class="detail-reviews">
          <h3>用户评价</h3>
          <div class="review-summary">
            <div class="review-rating">
              <div class="rating-score">{{ product.rating }}</div>
              <div class="rating-stars">
                <i class="fas fa-star" v-for="i in 5" :key="i"></i>
              </div>
              <div class="rating-count">
                共 {{ product.reviewCount }} 条评价
              </div>
            </div>
            <div class="review-tags">
              <div
                class="review-tag"
                v-for="(tag, index) in product.reviewTags"
                :key="index"
              >
                {{ tag.name }} ({{ tag.count }})
              </div>
            </div>
          </div>

          <div class="review-list">
            <div
              class="review-item"
              v-for="(review, index) in product.reviews"
              :key="index"
            >
              <div class="review-user">
                <div class="user-avatar">
                  <img :src="review.avatar" alt="用户头像" />
                </div>
                <div class="user-name">{{ review.username }}</div>
              </div>
              <div class="review-content">
                <div class="review-rating">
                  <i
                    class="fas fa-star"
                    v-for="i in review.rating"
                    :key="i"
                  ></i>
                </div>
                <div class="review-text">{{ review.content }}</div>
                <div
                  class="review-images"
                  v-if="review.images && review.images.length"
                >
                  <img
                    v-for="(img, imgIndex) in review.images"
                    :key="imgIndex"
                    :src="img"
                    alt="评价图片"
                  />
                </div>
                <div class="review-time">{{ review.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Product",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      productId: null,
      selectedImageIndex: 0,
      quantity: 1,
      selectedSpecs: {},
      activeTab: 0,
      tabs: ["商品详情", "规格参数", "用户评价"],
      product: {
        id: 1,
        name: "华为 Mate 60 Pro 旗舰手机",
        brief: "强劲性能，超长续航，震撼影像系统",
        price: 6999,
        sales: 1000,
        stock: 500,
        rating: 4.9,
        reviewCount: 2345,
        categoryId: 1,
        categoryName: "手机",
        brandId: 1,
        brandName: "华为",
        images: [
          "https://via.placeholder.com/500x500",
          "https://via.placeholder.com/500x500",
          "https://via.placeholder.com/500x500",
          "https://via.placeholder.com/500x500",
        ],
        specs: [
          {
            name: "颜色",
            options: ["曜金黑", "雅致白", "青山黛"],
          },
          {
            name: "存储",
            options: ["8GB+256GB", "12GB+512GB", "12GB+1TB"],
          },
        ],
        description:
          "华为Mate 60 Pro采用创新科技，搭载先进的处理器，提供卓越的性能体验。6.8英寸OLED曲面屏，分辨率高达2772x1344，120Hz高刷新率，带来震撼视觉体验。超感知徕卡四摄系统，5000万像素主摄，支持10倍光学变焦，捕捉每一个精彩瞬间。4800mAh大容量电池，支持66W有线快充和50W无线快充，续航持久。",
        detailImages: [
          "https://via.placeholder.com/800x600",
          "https://via.placeholder.com/800x600",
          "https://via.placeholder.com/800x600",
        ],
        params: [
          { name: "品牌", value: "华为（HUAWEI）" },
          { name: "型号", value: "Mate 60 Pro" },
          { name: "屏幕尺寸", value: "6.8英寸" },
          { name: "分辨率", value: "2772x1344" },
          { name: "处理器", value: "麒麟9000S" },
          { name: "运行内存", value: "12GB" },
          { name: "存储容量", value: "512GB" },
          { name: "电池容量", value: "4800mAh" },
          { name: "充电功率", value: "66W有线/50W无线" },
          { name: "操作系统", value: "HarmonyOS 4.0" },
        ],
        reviewTags: [
          { name: "外观漂亮", count: 1024 },
          { name: "运行流畅", count: 986 },
          { name: "拍照清晰", count: 876 },
          { name: "续航持久", count: 765 },
          { name: "信号强", count: 654 },
        ],
        reviews: [
          {
            username: "用户123456",
            avatar: "https://via.placeholder.com/50x50",
            rating: 5,
            content:
              "手机非常好用，外观设计很漂亮，系统流畅，拍照效果出色，电池续航也很给力，总之很满意这次购买！",
            images: [
              "https://via.placeholder.com/100x100",
              "https://via.placeholder.com/100x100",
            ],
            time: "2023-10-15",
          },
          {
            username: "科技达人",
            avatar: "https://via.placeholder.com/50x50",
            rating: 5,
            content:
              "期待已久的新旗舰，各方面表现都很出色，尤其是拍照和性能，完全满足日常使用需求，推荐购买！",
            images: [],
            time: "2023-10-12",
          },
          {
            username: "手机控",
            avatar: "https://via.placeholder.com/50x50",
            rating: 4,
            content:
              "总体来说很不错，就是价格稍微有点高，但性能和做工确实对得起这个价格，值得购买。",
            images: ["https://via.placeholder.com/100x100"],
            time: "2023-10-10",
          },
        ],
      },
    };
  },
  computed: {
    selectedImage() {
      return this.product.images[this.selectedImageIndex];
    },
  },
  created() {
    this.productId = this.$route.params.id;
    // 这里应该根据productId从API获取商品数据
    // this.fetchProductData()

    // 初始化选中的规格
    this.product.specs.forEach((spec) => {
      this.selectedSpecs[spec.name] = spec.options[0];
    });
  },
  methods: {
    fetchProductData() {
      // 模拟API请求获取商品数据
      // axios.get(`/api/products/${this.productId}`).then(response => {
      //   this.product = response.data
      // })
    },
    selectImage(index) {
      this.selectedImageIndex = index;
    },
    selectSpec(name, option) {
      this.selectedSpecs[name] = option;
    },
    increaseQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    validateQuantity() {
      if (this.quantity < 1) {
        this.quantity = 1;
      } else if (this.quantity > this.product.stock) {
        this.quantity = this.product.stock;
      }
    },
    addToCart() {
      // 添加到购物车的逻辑
      const item = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        image: this.product.images[0],
        specs: { ...this.selectedSpecs },
        quantity: this.quantity,
      };

      console.log("添加到购物车:", item);
      alert("已添加到购物车！");
    },
    buyNow() {
      // 立即购买的逻辑
      const item = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        image: this.product.images[0],
        specs: { ...this.selectedSpecs },
        quantity: this.quantity,
      };

      console.log("立即购买:", item);
      this.$router.push("/order");
    },
  },
};
</script>

<style scoped>
.product-page {
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

.product-container {
  display: flex;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.product-gallery {
  width: 50%;
  padding: 20px;
}

.main-image {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  overflow: hidden;
}

.main-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.thumbnail-list {
  display: flex;
  gap: 10px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 2px solid #eee;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: all 0.3s;
}

.thumbnail img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.thumbnail.active {
  border-color: #e91e63;
}

.product-info {
  width: 50%;
  padding: 30px;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
}

.product-brief {
  color: #666;
  margin-bottom: 20px;
  font-size: 16px;
}

.product-meta {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.meta-item:last-child {
  margin-bottom: 0;
}

.meta-item .label {
  color: #999;
  width: 60px;
}

.meta-item .price {
  color: #e91e63;
  font-size: 24px;
  font-weight: bold;
}

.meta-item .rating {
  color: #ff9800;
  display: flex;
  align-items: center;
}

.meta-item .rating i {
  margin-right: 5px;
}

.product-specs {
  margin-bottom: 20px;
}

.spec-group {
  margin-bottom: 15px;
}

.spec-title {
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
}

.spec-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.spec-option {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.spec-option:hover {
  border-color: #e91e63;
}

.spec-option.active {
  border-color: #e91e63;
  background-color: #fce4ec;
  color: #e91e63;
}

.product-quantity {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.quantity-title {
  font-size: 14px;
  color: #999;
  margin-right: 15px;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.quantity-btn {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-control input {
  width: 50px;
  height: 36px;
  text-align: center;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  -moz-appearance: textfield;
}

.quantity-control input::-webkit-outer-spin-button,
.quantity-control input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.stock {
  margin-left: 15px;
  font-size: 14px;
  color: #999;
}

.product-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.btn-add-cart,
.btn-buy-now {
  flex: 1;
  height: 50px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-add-cart {
  background-color: #fff0f4;
  color: #e91e63;
  border: 1px solid #e91e63;
}

.btn-add-cart i {
  margin-right: 8px;
}

.btn-add-cart:hover {
  background-color: #fce4ec;
}

.btn-buy-now {
  background-color: #e91e63;
  color: #fff;
}

.btn-buy-now:hover {
  background-color: #d81b60;
}

.product-services {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.service-item {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 14px;
}

.service-item i {
  margin-right: 5px;
  color: #e91e63;
}

.product-detail {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.detail-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
}

.tab-item {
  padding: 15px 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.tab-item:hover {
  color: #e91e63;
}

.tab-item.active {
  color: #e91e63;
  font-weight: bold;
}

.tab-item.active:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #e91e63;
}

.detail-content {
  padding: 30px;
}

.detail-content h3 {
  font-size: 18px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.detail-text {
  line-height: 1.8;
  color: #666;
  margin-bottom: 30px;
}

.detail-images {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-images img {
  max-width: 100%;
}

.params-table {
  width: 100%;
  border-collapse: collapse;
}

.params-table tr {
  border-bottom: 1px solid #eee;
}

.params-table tr:last-child {
  border-bottom: none;
}

.params-table td {
  padding: 15px;
}

.param-name {
  width: 30%;
  color: #999;
  background-color: #f9f9f9;
}

.review-summary {
  display: flex;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.review-rating {
  width: 200px;
  text-align: center;
  padding-right: 30px;
  border-right: 1px solid #eee;
}

.rating-score {
  font-size: 36px;
  color: #e91e63;
  font-weight: bold;
  margin-bottom: 10px;
}

.rating-stars {
  color: #ff9800;
  margin-bottom: 10px;
}

.rating-count {
  font-size: 14px;
  color: #999;
}

.review-tags {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding-left: 30px;
  gap: 10px;
}

.review-tag {
  padding: 8px 15px;
  background-color: #f5f5f5;
  border-radius: 16px;
  font-size: 14px;
  color: #666;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-item {
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.review-item:last-child {
  border-bottom: none;
}

.review-user {
  width: 100px;
  text-align: center;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 10px;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.review-content {
  flex: 1;
  padding-left: 20px;
}

.review-rating {
  color: #ff9800;
  margin-bottom: 10px;
}

.review-text {
  line-height: 1.6;
  margin-bottom: 10px;
}

.review-images {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.review-images img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.review-time {
  font-size: 12px;
  color: #999;
}
</style>
