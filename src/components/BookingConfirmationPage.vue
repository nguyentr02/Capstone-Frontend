<template>
  <div class="confirmation-page">

    <button class="back-button" @click="$router.go(-1)">←</button>

    <h1>Booking Confirmed</h1>
    <p>Congratulations! Your ticket is now in the ticket section!</p>

    <div class="content-container">
      <!-- Retention copy form -->
      <div class="receipt-form">
        <h2>Keep a copy with you maybe?</h2>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="myteammemberisLAZY@gmail.com"
            v-model="formData.email"
          />
        </div>
        <p class="and-or">AND/OR</p>
        <div class="form-group">
          <label for="phone">Phone number</label>
          <input
            type="tel"
            id="phone"
            placeholder="+61 888888888"
            v-model="formData.phone"
          />
        </div>
        <button class="send-receipt-button" @click="sendReceipt">Send receipt</button>
      </div>

      <!-- Order Information -->
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: '',
        phone: ''
      },
      amount: 3,
      subtotal: 22,
      tax: 2,
      total: 24
    };
  },
  methods: {
    // Simulate sending receipts
    sendReceipt() {
      if (this.formData.email || this.formData.phone) {
        alert('Receipt sent!');
      } else {
        alert('Please enter an email or phone number');
      }
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

.confirmation-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
}

h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
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

.content-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 900px;
}

.receipt-form {
  width: 60%;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
}

.receipt-form h2 {
  font-size: 22px;
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

.and-or {
  text-align: center;
  font-size: 16px;
  margin: 10px 0;
}

.send-receipt-button {
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-receipt-button:hover {
  background-color: #333;
}

.order-summary {
  width: 35%;
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

@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
    align-items: center;
  }

  .receipt-form,
  .order-summary {
    width: 100%;
    margin: 10px 0;
  }

  h1 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
  }
}
</style>
