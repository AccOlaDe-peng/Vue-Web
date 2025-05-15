<template>
  <div class="cart-page">
    <Header />

    <div class="cart-container">
      <div class="cart-header">
        <h1>我的购物车</h1>
        <div class="cart-steps">
          <div class="step active">
            <div class="step-number">1</div>
            <div class="step-name">购物车</div>
          </div>
          <div class="step-line"></div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-name">确认订单</div>
          </div>
          <div class="step-line"></div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-name">支付</div>
          </div>
          <div class="step-line"></div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-name">完成</div>
          </div>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="cart-content">
        <div class="cart-table">
          <div class="cart-table-header">
            <div class="col-check">
              <input
                type="checkbox"
                id="selectAll"
                :checked="isAllSelected"
                @change="toggleSelectAll"
              />
              <label for="selectAll">全选</label>
            </div>
            <div class="col-product">商品信息</div>
            <div class="col-price">单价</div>
            <div class="col-quantity">数量</div>
            <div class="col-total">小计</div>
            <div class="col-action">操作</div>
          </div>

          <div
            class="cart-item"
            v-for="(item, index) in cartItems"
            :key="index"
          >
            <div class="col-check">
              <input
                type="checkbox"
                :id="`select-${index}`"
                v-model="item.selected"
                @change="updateSelection"
              />
              <label :for="`select-${index}`"></label>
            </div>
            <div class="col-product">
              <div class="product-info">
                <div class="product-image">
                  <img :src="item.image" :alt="item.name" />
                </div>
                <div class="product-details">
                  <div class="product-name">{{ item.name }}</div>
                  <div class="product-specs">
                    <span v-for="(value, key) in item.specs" :key="key">
                      {{ key }}: {{ value }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-price">¥{{ item.price.toFixed(2) }}</div>
            <div class="col-quantity">
              <div class="quantity-control">
                <button
                  class="quantity-btn"
                  @click="decreaseQuantity(index)"
                  :disabled="item.quantity <= 1"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  max="999"
                  @input="validateQuantity(index)"
                />
                <button class="quantity-btn" @click="increaseQuantity(index)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div class="col-total">
              ¥{{ (item.price * item.quantity).toFixed(2) }}
            </div>
            <div class="col-action">
              <button class="btn-remove" @click="removeItem(index)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="cart-footer">
          <div class="cart-actions">
            <button class="btn-clear" @click="clearCart">清空购物车</button>
            <button class="btn-continue" @click="continueShopping">
              继续购物
            </button>
          </div>

          <div class="cart-summary">
            <div class="summary-item">
              <span>已选商品 {{ selectedCount }} 件</span>
            </div>
            <div class="summary-item">
              <span>合计：</span>
              <span class="total-price">¥{{ totalPrice.toFixed(2) }}</span>
            </div>
            <button
              class="btn-checkout"
              :disabled="selectedCount === 0"
              @click="checkout"
            >
              去结算
            </button>
          </div>
        </div>
      </div>

      <div v-else class="empty-cart">
        <div class="empty-icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <p>购物车还是空的，去挑选心仪的商品吧~</p>
        <button class="btn-shopping" @click="continueShopping">去购物</button>
      </div>

      <div class="recommended-products">
        <h2>为您推荐</h2>
        <div class="product-list">
          <div
            class="product-item"
            v-for="(product, index) in recommendedProducts"
            :key="index"
          >
            <router-link :to="`/product/${product.id}`" class="product-link">
              <div class="product-image">
                <img :src="product.image" :alt="product.name" />
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <div class="product-price">¥{{ product.price.toFixed(2) }}</div>
              </div>
            </router-link>
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
  name: "Cart",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      cartItems: [
        {
          id: 1,
          name: "华为 Mate 60 Pro 旗舰手机",
          price: 6999,
          image: "https://via.placeholder.com/100x100",
          quantity: 1,
          selected: true,
          specs: {
            颜色: "曜金黑",
            存储: "12GB+512GB",
          },
        },
        {
          id: 2,
          name: "小米13 Ultra 专业影像",
          price: 5999,
          image: "https://via.placeholder.com/100x100",
          quantity: 2,
          selected: true,
          specs: {
            颜色: "黑色",
            存储: "16GB+512GB",
          },
        },
      ],
      recommendedProducts: [
        {
          id: 3,
          name: "iPhone 15 Pro Max",
          price: 9999,
          image: "https://via.placeholder.com/200x200",
        },
        {
          id: 4,
          name: "联想小新Pro 16 2023",
          price: 5499,
          image: "https://via.placeholder.com/200x200",
        },
        {
          id: 5,
          name: "华为 MateBook X Pro",
          price: 8999,
          image: "https://via.placeholder.com/200x200",
        },
        {
          id: 6,
          name: "小米电视 大师 77英寸OLED",
          price: 19999,
          image: "https://via.placeholder.com/200x200",
        },
      ],
    };
  },
  computed: {
    isAllSelected() {
      return (
        this.cartItems.length > 0 &&
        this.cartItems.every((item) => item.selected)
      );
    },
    selectedCount() {
      return this.cartItems
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.cartItems
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    toggleSelectAll(event) {
      const isChecked = event.target.checked;
      this.cartItems.forEach((item) => {
        item.selected = isChecked;
      });
    },
    updateSelection() {
      // 这个方法在单个商品选择状态变化时触发
      // 可以在这里添加其他逻辑，例如向后端发送更新请求等
    },
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    validateQuantity(index) {
      const item = this.cartItems[index];
      if (item.quantity < 1) {
        item.quantity = 1;
      } else if (item.quantity > 999) {
        item.quantity = 999;
      }
    },
    removeItem(index) {
      if (confirm("确定要移除这件商品吗？")) {
        this.cartItems.splice(index, 1);
      }
    },
    clearCart() {
      if (confirm("确定要清空购物车吗？")) {
        this.cartItems = [];
      }
    },
    continueShopping() {
      this.$router.push("/");
    },
    checkout() {
      // 筛选出已选中的商品
      const selectedItems = this.cartItems.filter((item) => item.selected);

      // 可以将选中的商品信息存储到本地或者通过路由参数传递
      console.log("结算商品:", selectedItems);

      // 跳转到订单确认页面
      this.$router.push("/order");
    },
  },
};
</script>

<style scoped>
.cart-page {
  padding: 20px;
}

.cart-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px;
}

.cart-header {
  margin-bottom: 30px;
}

.cart-header h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.cart-steps {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ccc;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  font-weight: bold;
}

.step.active .step-number {
  background-color: #e91e63;
}

.step-name {
  font-size: 14px;
  color: #999;
}

.step.active .step-name {
  color: #e91e63;
}

.step-line {
  flex: 1;
  height: 2px;
  background-color: #ccc;
  max-width: 100px;
}

.cart-table {
  margin-bottom: 20px;
}

.cart-table-header {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.col-check {
  width: 80px;
  display: flex;
  align-items: center;
}

.col-check input[type="checkbox"] {
  margin-right: 5px;
}

.col-product {
  flex: 1;
}

.col-price,
.col-quantity,
.col-total {
  width: 150px;
  text-align: center;
}

.col-action {
  width: 80px;
  text-align: center;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.product-details {
  flex: 1;
}

.product-name {
  margin-bottom: 5px;
  font-weight: bold;
}

.product-specs {
  font-size: 12px;
  color: #999;
}

.product-specs span {
  margin-right: 10px;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  width: 120px;
  margin: 0 auto;
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
  width: 48px;
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

.btn-remove {
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  color: #999;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-remove:hover {
  color: #e91e63;
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
}

.cart-actions {
  display: flex;
  gap: 15px;
}

.btn-clear,
.btn-continue {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #fff;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-clear:hover,
.btn-continue:hover {
  border-color: #e91e63;
  color: #e91e63;
}

.cart-summary {
  display: flex;
  align-items: center;
  gap: 20px;
}

.summary-item {
  font-size: 16px;
}

.total-price {
  color: #e91e63;
  font-size: 20px;
  font-weight: bold;
}

.btn-checkout {
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  background: #e91e63;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-checkout:hover {
  background: #d81b60;
}

.btn-checkout:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.empty-cart {
  text-align: center;
  padding: 50px 0;
}

.empty-icon {
  font-size: 60px;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-cart p {
  color: #999;
  margin-bottom: 20px;
}

.btn-shopping {
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  background: #e91e63;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-shopping:hover {
  background: #d81b60;
}

.recommended-products {
  margin-top: 40px;
}

.recommended-products h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
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

.product-image {
  height: 200px;
  overflow: hidden;
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
}
</style>
