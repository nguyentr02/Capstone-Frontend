<template>
  <div class="form-page">
    <!-- 返回按钮 -->
    <button class="back-button" @click="$router.go(-1)">←</button>

    <!-- 事件图标和标题 -->
    <div class="event-header">
      <div class="event-icon">Event icon goes here</div>
      <h1>{{ eventName }}</h1>
    </div>

    <!-- 步骤进度条 -->
    <div class="progress-bar">
      <span class="step completed">Ticket selection</span>
      <div class="progress-line"></div>
      <span class="step completed">Complete form</span>
      <span class="step">Payment</span>
    </div>

    <!-- 注册表单 -->
    <h2 class="form-title">REGISTRATION</h2>

    <!-- 信息表单 -->
    <div class="form-section">
      <h3>Your information</h3>
      <form @submit.prevent="goToNextStep">
        <!-- 表单输入字段 -->
        <div class="form-group">
          <label for="firstName">First name:</label>
          <input type="text" id="firstName" v-model="formData.firstName" />
        </div>
        <div class="form-group">
          <label for="lastName">Last name:</label>
          <input type="text" id="lastName" v-model="formData.lastName" />
        </div>
        <div class="form-group">
          <label for="dob">Date of birth:</label>
          <input type="date" id="dob" v-model="formData.dob" />
        </div>
        <div class="form-group">
          <label for="mobileNumber">Mobile number:</label>
          <input type="tel" id="mobileNumber" v-model="formData.mobileNumber" />
        </div>
        <div class="form-group">
          <label for="country">Country:</label>
          <input type="text" id="country" v-model="formData.country" />
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="formData.address" />
        </div>
        <div class="form-group">
          <label for="city">City/Suburb:</label>
          <input type="text" id="city" v-model="formData.city" />
        </div>
        <div class="form-group">
          <label for="state">State:</label>
          <input type="text" id="state" v-model="formData.state" />
        </div>
        <div class="form-group">
          <label for="zip">ZIP Code:</label>
          <input type="text" id="zip" v-model="formData.zip" />
        </div>

        <!-- 自定义问题 -->
        <h3>Custom questions</h3>
        <div class="form-group">
          <label for="question1">What is your favorite pet?</label>
          <input type="text" id="question1" v-model="formData.question1" />
        </div>
        <div class="form-group">
          <label for="question2">Does the chicken or the egg come first?</label>
          <input type="text" id="question2" v-model="formData.question2" />
        </div>
        <div class="form-group">
          <label for="question3">Why does the chicken cross the road?</label>
          <input type="text" id="question3" v-model="formData.question3" />
        </div>
        <div class="form-group">
          <label for="question4">Why are chickens so funny?</label>
          <input type="text" id="question4" v-model="formData.question4" />
        </div>

        <!-- 继续按钮 -->
        <button class="continue-button" type="submit">CONTINUE</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventName: 'Event Name', // 动态事件名称
      formData: {
        firstName: '',
        lastName: '',
        dob: '',
        mobileNumber: '',
        country: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        question1: '',
        question2: '',
        question3: '',
        question4: ''
      }
    };
  },
  methods: {
    goToNextStep() {
      // 跳转到付款步骤页面
      this.$router.push('/payment');
    }
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.form-page {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 中心对齐 */
  align-items: center;
  min-height: 100vh; /* 占满整个浏览器高度 */
  padding: 40px 20px;
  width: 100%;
  background-color: #f5f5f5;
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

.event-header {
  text-align: center;
  margin-bottom: 30px;
}

.event-icon {
  background-color: #ccc;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
}

h1 {
  font-size: 28px;
  margin-top: 20px;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 30px 0;
  width: 100%;
  max-width: 900px;
}

.progress-line {
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 2px;
  background-color: black;
}

.step {
  background-color: white;
  z-index: 1;
  color: black;
  padding: 5px;
}

.step.completed {
  color: red;
}

.form-title {
  text-align: center;
  color: red;
  margin-bottom: 20px;
  font-size: 24px;
}

.form-section {
  width: 100%;
  max-width: 900px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.form-group input:focus {
  border-color: #ff6600;
}

.continue-button {
  width: 100%;
  padding: 10px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.continue-button:hover {
  background-color: #e65c00;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .event-icon {
    width: 80px;
    height: 80px;
  }

  h1 {
    font-size: 20px;
  }

  .progress-bar {
    font-size: 14px;
  }

  .form-group input {
    font-size: 12px;
  }

  .continue-button {
    font-size: 14px;
  }
}
</style>
