<template>
  <div class="signup-page">
    <!-- 返回上一页的标志 -->
    <div class="back-home" @click="goBack">
      <i class="back-icon">←</i> Back
    </div>

    <!-- 表单容器 -->
    <div class="signup-container">
      <!-- Logo -->
      <div class="logo">LOGO</div>

      <!-- 表单 -->
      <form @submit.prevent="submitForm">
        <!-- Email 输入框 -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required />
        </div>

        <!-- Password 输入框 -->
        <div class="form-group password-group">
          <label for="password">Password:</label>
          <div class="password-input">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password" required />
            <span class="toggle-password" @click="togglePassword">
              <i class="eye-icon">{{ showPassword ? '🙈' : '👁️' }}</i> <!-- 眼睛图标，用于显示/隐藏密码 -->
            </span>
          </div>
        </div>

        <!-- 登录按钮 -->
        <button type="submit" class="submit-btn">Sign In</button>
      </form>

      <!-- 忘记密码链接 -->
      <p class="forgot-password">
        <a href="#">Forgot password?</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false, // 控制密码是否显示
    };
  },
  methods: {
    submitForm() {
      alert(`Welcome, ${this.email}! You have signed in.`);
      this.$router.push("/"); // 登录成功后跳转到主页
    },
    togglePassword() {
      this.showPassword = !this.showPassword; // 切换密码可见性
    },
    goBack() {
      this.$router.go(-1); // 返回上一页
    },
  },
};
</script>

<style scoped>
/* 页面居中布局 */
.signup-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  position: relative;
}

/* 返回上一页标志 */
.back-home {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
}

.back-home:hover {
  color: #42b983;
}

.back-icon {
  margin-right: 8px;
  font-size: 20px;
}

/* 表单容器 */
.signup-container {
  width: 400px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Logo 样式 */
.logo {
  width: 80px;
  height: 80px;
  background-color: #e0e0e0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-bottom: 30px;
}

/* 表单样式 */
.form-group {
  width: 100%;
  margin-bottom: 25px;
}

label {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
  text-align: left;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #42b983;
}

/* 密码输入框的包裹样式 */
.password-group {
  position: relative;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.eye-icon {
  font-size: 18px;
  color: #555;
}

/* 按钮样式 */
.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #369e6f;
}

/* 忘记密码样式 */
.forgot-password {
  margin-top: 20px;
  font-size: 14px;
  color: #555;
}

.forgot-password a {
  color: #42b983;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}
</style>
