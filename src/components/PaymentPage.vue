<template>
  <div class="payment-page">
    <!-- 返回按钮 -->
    <button class="back-button" @click="$router.go(-1)">←</button>

    <!-- 页面标题 -->
    <h1>Payment for Booking #123</h1>

    <div class="payment-container">
      <!-- 支付表单 -->
      <div class="payment-form">
        <h2>Credit card/ Debit card</h2>

        <form @submit.prevent="submitPayment">
          <div class="form-group">
            <label for="cardNumber">Card number</label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 1234 1234 1234"
              v-model="paymentData.cardNumber"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="expDate">Expiration date</label>
              <input
                type="text"
                id="expDate"
                placeholder="MM / YY"
                v-model="paymentData.expDate"
              />
            </div>

            <div class="form-group">
              <label for="cvc">Security code</label>
              <input type="text" id="cvc" placeholder="CVC" v-model="paymentData.cvc" />
            </div>
          </div>

          <img
            class="payment-icons"
            src="https://via.placeholder.com/100x20"
            alt="Payment Icons"
          />
        </form>
      </div>

      <!-- 订单信息概述 -->
      <div class="order-summary">
        <div class="ticket-info">
          <div class="ticket-color"></div>
          <div>
            <h3>Ticket name</h3>
            <p>Location of Event</p>
            <p>Date</p>
          </div>
        </div>

        <div class="order-details">
          <p>Amount: <span>{{ amount }}</span></p>
          <p>Subtotal: <span>${{ subtotal }}</span></p>
          <p>Tax: <span>${{ tax }}</span></p>
          <p class="total">Total: <span>${{ total }}</span></p>
        </div>
      </div>
    </div>

    <!-- 同意条款说明 -->
    <p class="terms">
      By proceeding with your purchase you agree to our Terms and Conditions and Privacy
      Policy
    </p>

    <!-- 提交按钮 -->
    <button class="place-order-button" @click="submitPayment">Place order</button>

    <!-- 警告模态框 -->
    <div v-if="showErrorModal" class="modal-overlay">
      <div class="modal">
        <button class="close-button" @click="closeModal">×</button>
        <h2>Payment Details are Invalid</h2>
        <p>Please re-enter your payment information</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentData: {
        cardNumber: '',
        expDate: '',
        cvc: ''
      },
      amount: 3,
      subtotal: 22,
      tax: 2,
      total: 24,
      showErrorModal: false // 控制错误模态框的显示
    };
  },
  methods: {
    // 支付验证和提交
    submitPayment() {
      if (this.isPaymentValid()) {
        // 支付成功后跳转到确认页面
        this.$router.push('/booking-confirmation');
      } else {
        this.showErrorModal = true; // 显示错误模态框
      }
    },
    // 模拟支付信息验证
    isPaymentValid() {
      const { cardNumber, expDate, cvc } = this.paymentData;
      return cardNumber.length === 16 && expDate && cvc.length === 3;
    },
    // 关闭模态框
    closeModal() {
      this.showErrorModal = false;
    }
  }
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, sans-serif;
}

.payment-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
}

h1 {
  font-size: 28px;
  margin-bottom: 30px;
}

.back-button {
  position: fixed;
  left: 30px;
  top: 100px;
  background-color: #f5f5f5;
  border: none;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.payment-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.payment-form {
  flex: 1;
  margin-right: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
}

.payment-form h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.form-group input:focus {
  border-color: #ff6600;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.form-row .form-group {
  width: 48%;
}

.payment-icons {
  margin-top: 20px;
  width: 100px;
}

.order-summary {
  flex: 0.6;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.ticket-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.ticket-color {
  width: 20px;
  height: 20px;
  background-color: red;
  margin-right: 10px;
}

.order-details p {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.total {
  font-weight: bold;
  font-size: 18px;
}

.terms {
  margin: 20px 0;
  font-size: 14px;
  color: #555;
  text-align: center;
}

.place-order-button {
  background-color: black;
  color: white;
  font-size: 18px;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
}

.place-order-button:hover {
  background-color: #333;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;
  position: relative;
}

.modal h2 {
  color: red;
  margin-bottom: 15px;
}

.modal p {
  margin-bottom: 20px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
