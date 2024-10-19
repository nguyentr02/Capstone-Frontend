<template>
  <div class="reset-password-page">
    <!-- 返回按钮 -->
    <button class="back-button" @click="$router.go(-1)">←</button>

    <!-- 表单容器 -->
    <div class="reset-container">
      <h1>Reset Password</h1>
      <form @submit.prevent="resetPassword">
        <!-- 新密码输入框 -->
        <div class="form-group">
          <label for="newPassword">New Password:</label>
          <input
            type="password"
            v-model="newPassword"
            id="newPassword"
            required
          />
        </div>

        <!-- 确认密码输入框 -->
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            v-model="confirmPassword"
            id="confirmPassword"
            required
          />
        </div>

        <!-- 重设密码按钮 -->
        <button type="submit" class="reset-btn">Reset Password</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
    };
  },
  methods: {
    resetPassword() {
      if (this.newPassword === this.confirmPassword) {
        alert("Your password has been successfully reset!");
        this.$router.push("/login"); // 重置成功后跳转到登录页面
      } else {
        alert("Passwords do not match. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.reset-password-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  position: relative;
}

/* 返回按钮 */
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

/* 表单容器样式 */
.reset-container {
  width: 400px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 30px;
}

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
}

/* 重设密码按钮 */
.reset-btn {
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
}

.reset-btn:hover {
  background-color: #369e6f;
}
</style>
