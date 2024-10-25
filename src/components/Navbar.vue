<template>
  <header class="navbar">
    <div class="logo" role="banner" aria-label="公司标志">
      <div class="logo-icon">LOGO</div>
    </div>
    <div class="header-links">
      <button class="link-button" @click="goToHome">
        <i class="fas fa-calendar-alt"></i> Events
      </button>
      <button class="link-button" @click="goToTickets">
        <i class="fas fa-ticket-alt"></i> Tickets
      </button>
    </div>
    <div class="header-auth">
      <button class="auth-button login" @click="goToLogin">Sign in</button>
      <button class="auth-button signup" @click="goToSignUp">Register</button>
      <button class="link-button" @click="goToProfile">
        <i class="fas fa-user"></i>
      </button>
    </div>
  </header>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  name: "AppNavbar",
  methods: {
    goToLogin() {
      this.$router.push("/login"); 
    },
    goToSignUp() {
      this.$router.push("/signup"); 
    },
    goToHome() {
      this.$router.push("/"); 
    },
    goToTickets() {
      this.$router.push("/tickets"); 
    },
    goToProfile() {
      this.$router.push("/profile"); 
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
}
</style>
