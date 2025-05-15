<template>
  <div class="payment-page">
    <Header />

    <div class="payment-container">
      <div class="payment-header">
        <h1>订单支付</h1>
        <div class="payment-steps">
          <div class="step completed">
            <div class="step-number">1</div>
            <div class="step-name">购物车</div>
          </div>
          <div class="step-line completed"></div>
          <div class="step completed">
            <div class="step-number">2</div>
            <div class="step-name">确认订单</div>
          </div>
          <div class="step-line completed"></div>
          <div class="step active">
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

      <div class="payment-content">
        <div class="order-info">
          <div class="order-number">
            <span class="label">订单号：</span>
            <span class="value">{{ order.orderNumber }}</span>
          </div>
          <div class="order-amount">
            <span class="label">支付金额：</span>
            <span class="value">¥{{ order.amount.toFixed(2) }}</span>
          </div>
          <div class="order-time">
            <span class="label">下单时间：</span>
            <span class="value">{{ order.time }}</span>
          </div>
          <div class="order-expire">
            <span class="label">支付剩余时间：</span>
            <span class="value countdown">{{ formatCountdown }}</span>
          </div>
        </div>

        <div class="payment-methods">
          <h3>选择支付方式</h3>

          <div class="payment-options">
            <div
              v-for="(method, index) in paymentMethods"
              :key="index"
              :class="[
                'payment-option',
                selectedPayment === method.id ? 'active' : '',
              ]"
              @click="selectPayment(method.id)"
            >
              <div class="option-icon">
                <i :class="method.icon"></i>
              </div>
              <div class="option-info">
                <div class="option-name">{{ method.name }}</div>
                <div class="option-desc">{{ method.desc }}</div>
              </div>
              <div class="option-check">
                <i
                  class="fas fa-check-circle"
                  v-if="selectedPayment === method.id"
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div class="qrcode-section" v-if="showQRCode">
          <div class="qrcode-container">
            <div class="qrcode-title">
              <span>{{ getSelectedPaymentName() }}扫码支付</span>
              <span class="amount">¥{{ order.amount.toFixed(2) }}</span>
            </div>
            <div class="qrcode-image">
              <img src="https://via.placeholder.com/200x200" alt="支付二维码" />
            </div>
            <div class="qrcode-tips">
              <p>请使用{{ getSelectedPaymentName() }}扫描二维码完成支付</p>
              <p>二维码有效期为2小时</p>
            </div>
          </div>

          <div class="payment-actions">
            <button class="btn-refresh" @click="refreshQRCode">
              <i class="fas fa-sync-alt"></i>
              刷新二维码
            </button>
            <button class="btn-complete" @click="completePayment">
              支付完成
            </button>
            <button class="btn-problem" @click="paymentProblem">
              支付遇到问题
            </button>
          </div>
        </div>

        <div class="payment-actions" v-if="!showQRCode">
          <button
            class="btn-pay"
            @click="proceedPayment"
            :disabled="!selectedPayment"
          >
            确认支付
          </button>
          <button class="btn-cancel" @click="cancelPayment">取消支付</button>
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
  name: "Payment",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      orderId: null,
      order: {
        orderNumber: "ORD202311250001",
        amount: 6999,
        time: "2023-11-25 14:30:25",
      },
      paymentMethods: [
        {
          id: "wechat",
          name: "微信支付",
          desc: "推荐使用微信扫码支付",
          icon: "fab fa-weixin",
        },
        {
          id: "alipay",
          name: "支付宝",
          desc: "推荐有支付宝账号的用户使用",
          icon: "fab fa-alipay",
        },
        {
          id: "unionpay",
          name: "银联支付",
          desc: "支持各大银行借记卡及信用卡",
          icon: "far fa-credit-card",
        },
      ],
      selectedPayment: "",
      showQRCode: false,
      countdown: 30 * 60, // 30分钟倒计时（秒）
      countdownTimer: null,
    };
  },
  computed: {
    formatCountdown() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    },
  },
  created() {
    this.orderId = this.$route.params.id;
    this.fetchOrderData();
    this.startCountdown();
  },
  methods: {
    fetchOrderData() {
      // 模拟API请求获取订单数据
      // 实际应用中应该从后端获取数据
      console.log("获取订单数据:", this.orderId);
    },
    startCountdown() {
      this.countdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.countdownTimer);
          alert("支付超时，订单已取消");
          this.$router.push("/order");
        }
      }, 1000);
    },
    selectPayment(id) {
      this.selectedPayment = id;
    },
    getSelectedPaymentName() {
      const method = this.paymentMethods.find(
        (m) => m.id === this.selectedPayment
      );
      return method ? method.name : "";
    },
    proceedPayment() {
      if (!this.selectedPayment) {
        alert("请选择支付方式");
        return;
      }

      // 显示支付二维码
      this.showQRCode = true;
    },
    refreshQRCode() {
      // 刷新二维码
      alert("二维码已刷新");
    },
    completePayment() {
      // 支付完成，跳转到支付成功页面
      this.$router.push("/payment/success");
    },
    paymentProblem() {
      // 处理支付问题
      alert("请联系客服：400-123-4567");
    },
    cancelPayment() {
      if (confirm("确定取消支付？")) {
        this.$router.push("/order");
      }
    },
  },
  beforeUnmount() {
    // 清除定时器
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },
};
</script>

<style scoped>
.payment-page {
  padding: 20px;
}

.payment-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px;
}

.payment-header {
  margin-bottom: 30px;
}

.payment-header h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.payment-steps {
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

.step.completed .step-number,
.step.active .step-number {
  background-color: #e91e63;
}

.step-name {
  font-size: 14px;
  color: #999;
}

.step.completed .step-name,
.step.active .step-name {
  color: #e91e63;
}

.step-line {
  flex: 1;
  height: 2px;
  background-color: #ccc;
  max-width: 100px;
}

.step-line.completed {
  background-color: #e91e63;
}

.payment-content {
  padding: 20px;
}

.order-info {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
}

.order-number,
.order-amount,
.order-time,
.order-expire {
  display: flex;
  align-items: center;
}

.order-info .label {
  color: #999;
  margin-right: 10px;
}

.order-info .value {
  font-weight: bold;
}

.order-amount .value {
  color: #e91e63;
  font-size: 20px;
}

.countdown {
  color: #ff9800;
}

.payment-methods {
  margin-bottom: 30px;
}

.payment-methods h3 {
  font-size: 18px;
  margin-bottom: 20px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.payment-option {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.payment-option:hover {
  border-color: #e91e63;
}

.payment-option.active {
  border-color: #e91e63;
  background-color: #fce4ec;
}

.option-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  font-size: 24px;
}

.payment-option:nth-child(1) .option-icon {
  color: #07c160;
}

.payment-option:nth-child(2) .option-icon {
  color: #1677ff;
}

.payment-option:nth-child(3) .option-icon {
  color: #e6162d;
}

.option-info {
  flex: 1;
}

.option-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.option-desc {
  font-size: 14px;
  color: #999;
}

.option-check {
  color: #e91e63;
  font-size: 20px;
}

.qrcode-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.qrcode-container {
  text-align: center;
  margin-bottom: 30px;
}

.qrcode-title {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.qrcode-title .amount {
  color: #e91e63;
  margin-left: 10px;
}

.qrcode-image {
  margin-bottom: 20px;
}

.qrcode-image img {
  border: 1px solid #eee;
  padding: 10px;
}

.qrcode-tips {
  color: #666;
  font-size: 14px;
}

.payment-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn-pay,
.btn-cancel,
.btn-refresh,
.btn-complete,
.btn-problem {
  padding: 10px 30px;
  border-radius: 20px;
  font-size: 16px;
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

.btn-pay:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-cancel {
  background-color: #fff;
  color: #666;
  border: 1px solid #ddd;
}

.btn-cancel:hover {
  color: #999;
}

.btn-refresh,
.btn-complete,
.btn-problem {
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
}

.btn-refresh {
  background-color: #fff;
  color: #666;
  border: 1px solid #ddd;
}

.btn-refresh i {
  margin-right: 5px;
}

.btn-refresh:hover {
  color: #e91e63;
  border-color: #e91e63;
}

.btn-complete {
  background-color: #e91e63;
  color: #fff;
  border: none;
}

.btn-complete:hover {
  background-color: #d81b60;
}

.btn-problem {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
}

.btn-problem:hover {
  background-color: #eee;
}
</style>
