<template> 
  <div class="login-page">
    <!-- 返回上一页的标志 -->
    <div class="back-arrow" @click="goBack">
      <i class="back-icon">←</i> Back
    </div>

    <div class="login-container">
      <!-- Logo -->
      <div class="logo">LOGO</div>

      <!-- Login 标题 -->
      <h2 class="login-title">Login</h2>

      <!-- 表单 -->
      <form @submit.prevent="submitLogin">
        <!-- Email 输入框 -->
        <div class="form-group">
          <label for="email">Enter your email address</label>
          <input type="email" v-model="email" id="email" required />
        </div>

        <!-- Password 输入框 -->
        <div class="form-group">
          <label for="password">Choose a secure password</label>
          <input type="password" v-model="password" id="password" required />
        </div>

        <!-- 登录按钮 -->
        <button type="submit" class="submit-btn">Login</button>
      </form>

      <!-- 分隔线 -->
      <div class="form-divider"></div>

      <!-- 注册链接 -->
      <p class="signup-link">Don't have an account? 
        <a href="#" @click.prevent="goToSignUp">Sign Up here!</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLogin", // 组件名称
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitLogin() {
      alert(`Welcome back, ${this.email}!`);
      this.$router.push("/"); // 登录成功后跳转到主页
    },
    goToSignUp() {
      this.$router.push("/signup"); // 跳转到注册页面的路由
    },
    goBack() {
      this.$router.go(-1); // 返回上一页
    }
  },
};
</script>

<style scoped>
/* 全局重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

body, html {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.login-page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* 返回箭头标志 */
.back-arrow {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 16px;
}

.back-arrow:hover {
  color: #42b983;
}

.back-icon {
  margin-right: 8px;
  font-size: 20px;
}

/* 登录框容器 */
.login-container {
  width: 582px;
  height: 554px;
  background: rgba(12, 73, 191, 0.47);
  border-radius: 15px;
  padding: 30px;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

/* Logo */
.logo {
  width: 96px;
  height: 54px;
  background: #D9D9D9;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #000;
  margin: 0 auto 30px auto;
}

/* 标题 */
.login-title {
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  color: #000;
  margin-bottom: 20px;
}

/* 表单样式 */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  color: #000;
  margin-bottom: 5px;
}

input[type="email"], input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 16px;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 登录按钮 */
.submit-btn {
  width: 178.14px;
  height: 35.56px;
  background-color: #C1A4EF;
  border-radius: 20px;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  margin: 20px auto;
  display: block;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #A88FD0;
}

/* 分隔线 */
.form-divider {
  width: 100%;
  height: 2px;
  background-color: #000;
  margin: 30px 0;
}

/* 注册链接 */
.signup-link {
  text-align: center;
  font-size: 14px;
  color: #000;
}

.signup-link a {
  color: #ff5e93;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
