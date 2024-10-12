<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="submitLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserLogin",  // 改为多单词组件名称
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
  },
};
</script>
