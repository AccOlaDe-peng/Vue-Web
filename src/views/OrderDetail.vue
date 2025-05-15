<template>
  <div class="order-detail-page">
    <Header />

    <div class="order-detail-container">
      <div class="breadcrumb">
        <router-link to="/">首页</router-link>
        <i class="fas fa-angle-right"></i>
        <router-link to="/order">我的订单</router-link>
        <i class="fas fa-angle-right"></i>
        <span>订单详情</span>
      </div>

      <div class="order-detail-content" v-if="order">
        <div class="order-status-section">
          <div class="status-icon" :class="order.statusClass">
            <i :class="statusIcon"></i>
          </div>
          <div class="status-info">
            <h2>订单{{ order.statusText }}</h2>
            <p v-if="order.status === 'pending'">
              请尽快完成支付，订单将为您保留24小时
            </p>
            <p v-else-if="order.status === 'paid'">
              商家正在处理您的订单，请耐心等待发货
            </p>
            <p v-else-if="order.status === 'shipped'">商品已发货，请注意查收</p>
            <p v-else-if="order.status === 'completed'">
              订单已完成，感谢您的购买
            </p>
            <p v-else-if="order.status === 'cancelled'">订单已取消</p>
          </div>
          <div class="status-actions">
            <button
              v-if="order.status === 'pending'"
              class="btn-pay"
              @click="payOrder"
            >
              去支付
            </button>
            <button
              v-if="order.status === 'pending'"
              class="btn-cancel"
              @click="cancelOrder"
            >
              取消订单
            </button>
          </div>
        </div>

        <div class="order-progress" v-if="order.status !== 'cancelled'">
          <div class="progress-step completed">
            <div class="step-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="step-info">
              <div class="step-title">提交订单</div>
              <div class="step-time">{{ order.date }}</div>
            </div>
          </div>
          <div
            class="progress-line"
            :class="{ active: order.status !== 'pending' }"
          ></div>

          <div
            class="progress-step"
            :class="{ completed: order.status !== 'pending' }"
          >
            <div class="step-icon">
              <i
                :class="
                  order.status !== 'pending'
                    ? 'fas fa-check-circle'
                    : 'fas fa-credit-card'
                "
              ></i>
            </div>
            <div class="step-info">
              <div class="step-title">付款成功</div>
              <div class="step-time" v-if="order.paymentTime">
                {{ order.paymentTime }}
              </div>
            </div>
          </div>
          <div
            class="progress-line"
            :class="{
              active:
                order.status === 'shipped' || order.status === 'completed',
            }"
          ></div>

          <div
            class="progress-step"
            :class="{
              completed:
                order.status === 'shipped' || order.status === 'completed',
            }"
          >
            <div class="step-icon">
              <i
                :class="
                  order.status === 'shipped' || order.status === 'completed'
                    ? 'fas fa-check-circle'
                    : 'fas fa-box'
                "
              ></i>
            </div>
            <div class="step-info">
              <div class="step-title">商家发货</div>
              <div class="step-time" v-if="order.shipmentTime">
                {{ order.shipmentTime }}
              </div>
            </div>
          </div>
          <div
            class="progress-line"
            :class="{ active: order.status === 'completed' }"
          ></div>

          <div
            class="progress-step"
            :class="{ completed: order.status === 'completed' }"
          >
            <div class="step-icon">
              <i
                :class="
                  order.status === 'completed'
                    ? 'fas fa-check-circle'
                    : 'fas fa-home'
                "
              ></i>
            </div>
            <div class="step-info">
              <div class="step-title">交易完成</div>
              <div class="step-time" v-if="order.completionTime">
                {{ order.completionTime }}
              </div>
            </div>
          </div>
        </div>

        <div class="order-info-section">
          <h3>订单信息</h3>
          <div class="info-item">
            <span class="label">订单编号：</span>
            <span class="value">{{ order.orderNumber }}</span>
          </div>
          <div class="info-item">
            <span class="label">创建时间：</span>
            <span class="value">{{ order.date }}</span>
          </div>
          <div class="info-item" v-if="order.paymentMethod !== '未支付'">
            <span class="label">支付方式：</span>
            <span class="value">{{ order.paymentMethod }}</span>
          </div>
          <div class="info-item" v-if="order.paymentTime">
            <span class="label">支付时间：</span>
            <span class="value">{{ order.paymentTime }}</span>
          </div>
          <div
            class="info-item"
            v-if="order.status === 'shipped' || order.status === 'completed'"
          >
            <span class="label">发货时间：</span>
            <span class="value">{{ order.shipmentTime }}</span>
          </div>
          <div class="info-item" v-if="order.status === 'completed'">
            <span class="label">完成时间：</span>
            <span class="value">{{ order.completionTime }}</span>
          </div>
        </div>

        <div
          class="shipping-info-section"
          v-if="order.status !== 'pending' && order.status !== 'cancelled'"
        >
          <h3>物流信息</h3>
          <div class="info-item">
            <span class="label">物流公司：</span>
            <span class="value">{{ order.tracking.company }}</span>
          </div>
          <div class="info-item">
            <span class="label">运单编号：</span>
            <span class="value">{{ order.tracking.number }}</span>
          </div>
          <div class="info-item">
            <span class="label">物流状态：</span>
            <span class="value">{{ order.tracking.status }}</span>
          </div>
          <button class="btn-track" @click="trackOrder">查看物流详情</button>
        </div>

        <div class="address-section">
          <h3>收货信息</h3>
          <div class="info-item">
            <span class="label">收货人：</span>
            <span class="value">{{ order.address.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">联系电话：</span>
            <span class="value">{{ order.address.phone }}</span>
          </div>
          <div class="info-item">
            <span class="label">收货地址：</span>
            <span class="value">{{ order.address.address }}</span>
          </div>
        </div>

        <div class="products-section">
          <h3>商品信息</h3>
          <div class="product-table">
            <div class="product-header">
              <div class="col-product">商品信息</div>
              <div class="col-price">单价</div>
              <div class="col-quantity">数量</div>
              <div class="col-total">小计</div>
            </div>

            <div
              class="product-item"
              v-for="(product, index) in order.products"
              :key="index"
            >
              <div class="col-product">
                <div class="product-info">
                  <div class="product-image">
                    <img :src="product.image" :alt="product.name" />
                  </div>
                  <div class="product-details">
                    <div class="product-name">{{ product.name }}</div>
                    <div class="product-specs">
                      <span v-for="(value, key) in product.specs" :key="key">
                        {{ key }}: {{ value }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-price">¥{{ product.price.toFixed(2) }}</div>
              <div class="col-quantity">{{ product.quantity }}</div>
              <div class="col-total">
                ¥{{ (product.price * product.quantity).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>

        <div class="payment-section">
          <h3>支付信息</h3>
          <div class="payment-details">
            <div class="payment-item">
              <span class="label">商品总额：</span>
              <span class="value">¥{{ order.totalAmount.toFixed(2) }}</span>
            </div>
            <div class="payment-item">
              <span class="label">运费：</span>
              <span class="value"
                >¥{{
                  order.shippingFee ? order.shippingFee.toFixed(2) : "0.00"
                }}</span
              >
            </div>
            <div class="payment-item">
              <span class="label">优惠金额：</span>
              <span class="value"
                >-¥{{
                  order.discount ? order.discount.toFixed(2) : "0.00"
                }}</span
              >
            </div>
            <div class="payment-item total">
              <span class="label">实付金额：</span>
              <span class="value"
                >¥{{ calculateFinalAmount().toFixed(2) }}</span
              >
            </div>
          </div>
        </div>

        <div class="order-actions">
          <button
            v-if="order.status === 'pending'"
            class="btn-pay-large"
            @click="payOrder"
          >
            去支付
          </button>
          <button
            v-if="order.status === 'shipped'"
            class="btn-confirm"
            @click="confirmReceipt"
          >
            确认收货
          </button>
          <button
            v-if="order.status === 'completed'"
            class="btn-review"
            @click="reviewOrder"
          >
            评价商品
          </button>
          <button class="btn-contact" @click="contactService">联系客服</button>
        </div>
      </div>

      <div v-else class="loading-order">
        <div class="loading-spinner"></div>
        <p>正在加载订单信息...</p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "OrderDetail",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      orderId: null,
      order: null,
    };
  },
  computed: {
    statusIcon() {
      const iconMap = {
        pending: "fas fa-clock",
        paid: "fas fa-box",
        shipped: "fas fa-shipping-fast",
        completed: "fas fa-check-circle",
        cancelled: "fas fa-times-circle",
      };
      return iconMap[this.order?.status] || "fas fa-question-circle";
    },
  },
  created() {
    this.orderId = this.$route.params.id;
    this.fetchOrderData();
  },
  methods: {
    fetchOrderData() {
      // 模拟API请求获取订单数据
      // 实际应用中应该从后端获取数据
      setTimeout(() => {
        this.order = {
          id: 1,
          orderNumber: "ORD202311250001",
          date: "2023-11-25 14:30:25",
          status: "shipped",
          statusText: "待收货",
          statusClass: "status-shipped",
          paymentMethod: "微信支付",
          paymentTime: "2023-11-25 14:35:10",
          shipmentTime: "2023-11-26 10:15:30",
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
          shippingFee: 0,
          discount: 200,
          address: {
            name: "张三",
            phone: "13800138000",
            address: "北京市海淀区中关村大街1号",
          },
          tracking: {
            company: "顺丰速运",
            number: "SF1234567890",
            status: "运输中",
          },
        };
      }, 500);
    },
    calculateFinalAmount() {
      if (!this.order) return 0;
      const { totalAmount, shippingFee = 0, discount = 0 } = this.order;
      return totalAmount + shippingFee - discount;
    },
    payOrder() {
      // 跳转到支付页面
      this.$router.push(`/payment/${this.orderId}`);
    },
    cancelOrder() {
      if (confirm("确认取消订单？")) {
        // 这里应该调用API更新订单状态
        this.order.status = "cancelled";
        this.order.statusText = "已取消";
        this.order.statusClass = "status-cancelled";
      }
    },
    trackOrder() {
      // 查看物流详情
      alert(
        `物流详情：${this.order.tracking.company} - ${this.order.tracking.number} - ${this.order.tracking.status}`
      );
      // 实际应用中应该跳转到物流详情页面或打开物流查询弹窗
    },
    confirmReceipt() {
      if (confirm("确认已收到商品？")) {
        // 这里应该调用API更新订单状态
        this.order.status = "completed";
        this.order.statusText = "已完成";
        this.order.statusClass = "status-completed";
        this.order.completionTime = new Date().toLocaleString();
      }
    },
    reviewOrder() {
      // 跳转到评价页面
      this.$router.push(`/review/${this.orderId}`);
    },
    contactService() {
      // 联系客服
      alert("客服热线：400-123-4567");
      // 实际应用中应该跳转到客服聊天页面或显示客服联系方式
    },
  },
};
</script>

<style scoped>
.order-detail-page {
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

.order-detail-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px;
}

.order-detail-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.order-status-section {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.status-icon {
  font-size: 40px;
  margin-right: 20px;
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

.status-info {
  flex: 1;
}

.status-info h2 {
  font-size: 20px;
  margin-bottom: 5px;
}

.status-info p {
  color: #666;
}

.status-actions {
  display: flex;
  gap: 10px;
}

.btn-pay,
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

.btn-cancel {
  background-color: #fff;
  color: #999;
  border: 1px solid #ddd;
}

.btn-cancel:hover {
  color: #f44336;
  border-color: #f44336;
}

.order-progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.step-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f5f5f5;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-bottom: 10px;
}

.progress-step.completed .step-icon {
  background-color: #e91e63;
  color: #fff;
}

.step-info {
  text-align: center;
}

.step-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.step-time {
  font-size: 12px;
  color: #999;
}

.progress-line {
  flex: 1;
  height: 2px;
  background-color: #eee;
  position: relative;
  z-index: 0;
}

.progress-line.active {
  background-color: #e91e63;
}

.order-info-section,
.shipping-info-section,
.address-section,
.products-section,
.payment-section {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
}

h3 {
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.info-item {
  display: flex;
  margin-bottom: 10px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item .label {
  width: 100px;
  color: #999;
}

.btn-track {
  margin-top: 15px;
  padding: 8px 15px;
  border-radius: 4px;
  background-color: #fff;
  color: #666;
  border: 1px solid #ddd;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-track:hover {
  color: #e91e63;
  border-color: #e91e63;
}

.product-table {
  width: 100%;
}

.product-header {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}

.product-item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.product-item:last-child {
  border-bottom: none;
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

.payment-details {
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.payment-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.payment-item:last-child {
  margin-bottom: 0;
}

.payment-item.total {
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-weight: bold;
}

.payment-item.total .value {
  color: #e91e63;
  font-size: 18px;
}

.order-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn-pay-large,
.btn-confirm,
.btn-review,
.btn-contact {
  padding: 10px 30px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-pay-large {
  background-color: #e91e63;
  color: #fff;
  border: none;
}

.btn-pay-large:hover {
  background-color: #d81b60;
}

.btn-confirm,
.btn-review {
  background-color: #fff;
  color: #666;
  border: 1px solid #ddd;
}

.btn-confirm:hover,
.btn-review:hover {
  color: #e91e63;
  border-color: #e91e63;
}

.btn-contact {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
}

.btn-contact:hover {
  background-color: #eee;
}

.loading-order {
  text-align: center;
  padding: 50px 0;
}

.loading-spinner {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #e91e63;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-order p {
  color: #999;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
