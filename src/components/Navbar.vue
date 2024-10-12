<template>
  <header class="navbar">
    <div class="logo">
      <div class="logo-icon"></div>
      <div class="logo-text">LOGO</div>
    </div>
    <div class="header-auth">
      <button class="auth-button login" @click="goToLogin">Sign in</button>
      <button class="auth-button signup" @click="goToSignUp">Register</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppNavbar",
  methods: {
    goToLogin() {
      this.$router.push("/login"); // 跳转到登录页面
    },
    goToSignUp() {
      this.$router.push("/signup"); // 跳转到注册页面
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 79px;
  background-color: #0A075F;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 80px;
  height: 66px;
  background-color: #D9D9D9;
  margin-right: 10px;
}

.logo-text {
  font-size: 24px;
  color: white;
}

.header-auth {
  display: flex;
  gap: 12px;
}

.auth-button {
  padding: 8px 16px;
  background-color: #E3E3E3;
  border: 1px solid #767676;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.auth-button.signup {
  background-color: #2C2C2C;
  color: white;
}

.auth-button:hover {
  background-color: #ccc;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 10px;
  }

  .header-auth {
    margin-top: 10px;
    width: 100%;
    justify-content: space-around;
  }

  .auth-button {
    width: 45%;
  }
}

@media (max-width: 480px) {
  .logo-icon {
    width: 60px;
    height: 50px;
  }

  .logo-text {
    font-size: 20px;
  }

  .auth-button {
    font-size: 14px;
    padding: 6px 10px;
  }
}
</style>
