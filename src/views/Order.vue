<template>
  <div class="order-page">
    <Header />

    <div class="order-container">
      <div class="order-header">
        <h1>我的订单</h1>
        <div class="order-tabs">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            :class="['tab-item', activeTab === index ? 'active' : '']"
            @click="activeTab = index"
          >
            {{ tab }}
          </div>
        </div>
      </div>

      <div class="order-content">
        <div v-if="filteredOrders.length > 0" class="order-list">
          <div
            class="order-item"
            v-for="(order, index) in filteredOrders"
            :key="index"
          >
            <div class="order-info">
              <div class="order-header-info">
                <div class="order-number">
                  <span class="label">订单号：</span>
                  <span class="value">{{ order.orderNumber }}</span>
                </div>
                <div class="order-date">
                  <span class="label">下单时间：</span>
                  <span class="value">{{ order.date }}</span>
                </div>
                <div class="order-status" :class="order.statusClass">
                  {{ order.statusText }}
                </div>
              </div>

              <div class="order-products">
                <div
                  class="product-item"
                  v-for="(product, productIndex) in order.products"
                  :key="productIndex"
                >
                  <div class="product-image">
                    <img :src="product.image" :alt="product.name" />
                  </div>
                  <div class="product-info">
                    <div class="product-name">{{ product.name }}</div>
                    <div class="product-specs">
                      <span v-for="(value, key) in product.specs" :key="key">
                        {{ key }}: {{ value }}
                      </span>
                    </div>
                  </div>
                  <div class="product-price">
                    ¥{{ product.price.toFixed(2) }}
                  </div>
                  <div class="product-quantity">x{{ product.quantity }}</div>
                </div>
              </div>

              <div class="order-footer">
                <div class="order-total">
                  <span class="label"
                    >共 {{ order.totalQuantity }} 件商品，总计：</span
                  >
                  <span class="value">¥{{ order.totalAmount.toFixed(2) }}</span>
                </div>

                <div class="order-actions">
                  <button
                    v-if="order.status === 'pending'"
                    class="btn-pay"
                    @click="payOrder(order)"
                  >
                    去支付
                  </button>
                  <button
                    v-if="order.status === 'paid' || order.status === 'shipped'"
                    class="btn-track"
                    @click="trackOrder(order)"
                  >
                    查看物流
                  </button>
                  <button
                    v-if="order.status === 'shipped'"
                    class="btn-confirm"
                    @click="confirmReceipt(order)"
                  >
                    确认收货
                  </button>
                  <button
                    v-if="order.status === 'completed'"
                    class="btn-review"
                    @click="reviewOrder(order)"
                  >
                    评价
                  </button>
                  <button class="btn-detail" @click="viewOrderDetail(order)">
                    订单详情
                  </button>
                  <button
                    v-if="order.status === 'pending'"
                    class="btn-cancel"
                    @click="cancelOrder(order)"
                  >
                    取消订单
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-order">
          <div class="empty-icon">
            <i class="fas fa-clipboard-list"></i>
          </div>
          <p>暂无相关订单</p>
          <button class="btn-shopping" @click="goShopping">去购物</button>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="filteredOrders.length > 0" class="pagination">
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
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Order",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      activeTab: 0,
      tabs: ["全部订单", "待付款", "待发货", "待收货", "已完成"],
      currentPage: 1,
      pageSize: 5,
      orders: [
        {
          id: 1,
          orderNumber: "ORD202311250001",
          date: "2023-11-25 14:30:25",
          status: "pending",
          statusText: "待付款",
          statusClass: "status-pending",
          products: [
            {
              id: 1,
              name: "华为 Mate 60 Pro 旗舰手机",
              price: 6999,
              image: "https://via.placeholder.com/80x80",
              quantity: 1,
              specs: {
                颜色: "曜金黑",
                存储: "12GB+512GB",
              },
            },
          ],
          totalQuantity: 1,
          totalAmount: 6999,
          paymentMethod: "未支付",
          address: {
            name: "张三",
            phone: "13800138000",
            address: "北京市海淀区中关村大街1号",
          },
        },
        {
          id: 2,
          orderNumber: "ORD202311240002",
          date: "2023-11-24 10:15:36",
          status: "paid",
          statusText: "待发货",
          statusClass: "status-paid",
          products: [
            {
              id: 2,
              name: "小米13 Ultra 专业影像",
              price: 5999,
              image: "https://via.placeholder.com/80x80",
              quantity: 1,
              specs: {
                颜色: "黑色",
                存储: "16GB+512GB",
              },
            },
            {
              id: 5,
              name: "华为 MateBook X Pro",
              price: 8999,
              image: "https://via.placeholder.com/80x80",
              quantity: 1,
              specs: {
                颜色: "深空灰",
                配置: "i7/16GB/1TB",
              },
            },
          ],
          totalQuantity: 2,
          totalAmount: 14998,
          paymentMethod: "微信支付",
          address: {
            name: "李四",
            phone: "13900139000",
            address: "上海市浦东新区陆家嘴环路1000号",
          },
        },
        {
          id: 3,
          orderNumber: "ORD202311200003",
          date: "2023-11-20 09:45:12",
          status: "shipped",
          statusText: "待收货",
          statusClass: "status-shipped",
          products: [
            {
              id: 3,
              name: "iPhone 15 Pro Max",
              price: 9999,
              image: "https://via.placeholder.com/80x80",
              quantity: 1,
              specs: {
                颜色: "自然钛金属",
                存储: "256GB",
              },
            },
          ],
          totalQuantity: 1,
          totalAmount: 9999,
          paymentMethod: "支付宝",
          address: {
            name: "王五",
            phone: "13700137000",
            address: "广州市天河区天河路385号",
          },
          tracking: {
            company: "顺丰速运",
            number: "SF1234567890",
            status: "运输中",
          },
        },
        {
          id: 4,
          orderNumber: "ORD202311150004",
          date: "2023-11-15 16:20:45",
          status: "completed",
          statusText: "已完成",
          statusClass: "status-completed",
          products: [
            {
              id: 4,
              name: "联想小新Pro 16 2023",
              price: 5499,
              image: "https://via.placeholder.com/80x80",
              quantity: 1,
              specs: {
                颜色: "深空灰",
                配置: "i5/16GB/512GB",
              },
            },
          ],
          totalQuantity: 1,
          totalAmount: 5499,
          paymentMethod: "银联支付",
          address: {
            name: "赵六",
            phone: "13600136000",
            address: "深圳市南山区科技园路1号",
          },
          tracking: {
            company: "中通快递",
            number: "ZT9876543210",
            status: "已签收",
          },
        },
        {
          id: 5,
          orderNumber: "ORD202311100005",
          date: "2023-11-10 11:30:18",
          status: "cancelled",
          statusText: "已取消",
          statusClass: "status-cancelled",
          products: [
            {
              id: 6,
              name: "小米电视 大师 77英寸OLED",
              price: 19999,
              image: "https://via.placeholder.com/80x80",
              quantity: 1,
              specs: {
                尺寸: "77英寸",
                分辨率: "4K",
              },
            },
          ],
          totalQuantity: 1,
          totalAmount: 19999,
          paymentMethod: "未支付",
          address: {
            name: "孙七",
            phone: "13500135000",
            address: "成都市锦江区红星路三段1号",
          },
        },
      ],
    };
  },
  computed: {
    filteredOrders() {
      if (this.activeTab === 0) {
        return this.orders;
      } else {
        const statusMap = {
          1: "pending",
          2: "paid",
          3: "shipped",
          4: "completed",
        };
        return this.orders.filter(
          (order) => order.status === statusMap[this.activeTab]
        );
      }
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.pageSize);
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredOrders.slice(start, end);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    payOrder(order) {
      // 跳转到支付页面
      this.$router.push(`/payment/${order.id}`);
    },
    trackOrder(order) {
      // 查看物流信息
      alert(
        `物流信息：${order.tracking.company} - ${order.tracking.number} - ${order.tracking.status}`
      );
    },
    confirmReceipt(order) {
      // 确认收货
      if (confirm("确认已收到商品？")) {
        // 这里应该调用API更新订单状态
        order.status = "completed";
        order.statusText = "已完成";
        order.statusClass = "status-completed";
      }
    },
    reviewOrder(order) {
      // 跳转到评价页面
      this.$router.push(`/review/${order.id}`);
    },
    viewOrderDetail(order) {
      // 跳转到订单详情页面
      this.$router.push(`/order/${order.id}`);
    },
    cancelOrder(order) {
      // 取消订单
      if (confirm("确认取消订单？")) {
        // 这里应该调用API更新订单状态
        order.status = "cancelled";
        order.statusText = "已取消";
        order.statusClass = "status-cancelled";
      }
    },
    goShopping() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.order-page {
  padding: 20px;
}

.order-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px;
}

.order-header {
  margin-bottom: 20px;
}

.order-header h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.order-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
}

.tab-item {
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
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
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #e91e63;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-item {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.order-info {
  padding: 20px;
}

.order-header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.order-number,
.order-date {
  font-size: 14px;
}

.order-number .label,
.order-date .label {
  color: #999;
}

.order-status {
  font-weight: bold;
}

.status-pending {
  color: #ff9800;
}

.status-paid {
  color: #2196f3;
}

.status-shipped {
  color: #4caf50;
}

.status-completed {
  color: #9c27b0;
}

.status-cancelled {
  color: #999;
}

.order-products {
  padding: 20px 0;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.product-item:last-child {
  margin-bottom: 0;
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

.product-info {
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

.product-price {
  width: 100px;
  text-align: center;
  font-weight: bold;
}

.product-quantity {
  width: 60px;
  text-align: center;
  color: #999;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.order-total .label {
  color: #999;
}

.order-total .value {
  font-size: 18px;
  color: #e91e63;
  font-weight: bold;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.btn-pay,
.btn-track,
.btn-confirm,
.btn-review,
.btn-detail,
.btn-cancel {
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-pay {
  background-color: #e91e63;
  color: #fff;
  border: none;
}

.btn-pay:hover {
  background-color: #d81b60;
}

.btn-track,
.btn-confirm,
.btn-review {
  background-color: #fff;
  color: #666;
  border: 1px solid #ddd;
}

.btn-track:hover,
.btn-confirm:hover,
.btn-review:hover {
  color: #e91e63;
  border-color: #e91e63;
}

.btn-detail {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
}

.btn-detail:hover {
  background-color: #eee;
}

.btn-cancel {
  background-color: #fff;
  color: #999;
  border: 1px solid #ddd;
}

.btn-cancel:hover {
  color: #f44336;
  border-color: #f44336;
}

.empty-order {
  text-align: center;
  padding: 50px 0;
}

.empty-icon {
  font-size: 60px;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-order p {
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
