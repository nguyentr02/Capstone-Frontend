<template>
  <!-- Add Bootstrap JS dependencies -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">

  
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #0a075f;">
    <a class="navbar-brand" href="/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/2560px-Bootstrap_logo.svg.png" 
           width="30" height="30" alt="Logo">
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" 
            data-target="#navbarContent" aria-controls="navbarContent" 
            aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <button class="nav-link link-button" @click="goToHome">
            <i class="fas fa-calendar-alt"></i> Events
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link link-button" @click="goToTickets">
            <i class="fas fa-ticket-alt"></i> Tickets
          </button>
        </li>
      </ul>
      
      <div class="header-auth">
        <button class="auth-button login" @click="goToLogin">Sign in</button>
        <button class="auth-button signup" @click="goToSignUp">Register</button>
        <button class="nav-link link-button" @click="goToProfile">
          <i class="fas fa-user"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>

import "@fortawesome/fontawesome-free/css/all.css";

export default {
  name: "AppNavbar",
  methods: {
    goToLogin() {
      this.$router.push("/login"); // 跳转到登录页面
    },
    goToSignUp() {
      this.$router.push("/signup"); // 跳转到注册页面
    },
    goToHome() {
      this.$router.push("/"); // 跳转到主页
    },
    goToTickets() {
      this.$router.push("/tickets"); // 跳转到票务页面
    },
    goToProfile() {
      this.$router.push("/profile"); // 跳转到个人资料页面
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #0a075f;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 80px;
  height: 66px;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;
}

.header-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.link-button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
}

.link-button:hover {
  color: #ccc;
}

.header-auth {
  display: flex;
  gap: 12px;
}

.auth-button {
  padding: 8px 16px;
  background-color: #e3e3e3;
  border: 1px solid #767676;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.auth-button.signup {
  background-color: #2c2c2c;
  color: white;
}

.auth-button:hover {
  background-color: #ccc;
}

/* @media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .header-links,
  .header-auth {
    margin-top: 10px;
    width: 100%;
    justify-content: space-around;
  }

  .auth-button,
  .link-button {
    width: 45%;
  }
}

@media (max-width: 480px) {
  .logo-icon {
    width: 60px;
    height: 50px;
    font-size: 16px;
  }

  .logo-text {
    font-size: 20px;
  }

  .auth-button,
  .link-button {
    font-size: 14px;
    padding: 6px 10px;
  }
} */
</style>
