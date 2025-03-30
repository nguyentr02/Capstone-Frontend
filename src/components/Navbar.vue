<template>
  <header class="navbar navbar-expand-lg navbar-dark" style="background-color: #0a075f;">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/2560px-Bootstrap_logo.svg.png" 
             width="30" height="30" alt="Logo">
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarContent" aria-controls="navbarContent" 
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
          <!-- Events and Tickets -->
          <li class="nav-item me-3">
            <button class="nav-link link-button" @click="goToHome">
              <i class="fas fa-calendar-alt me-1"></i> Events
            </button>
          </li>
          <li class="nav-item me-3">
            <button class="nav-link link-button" @click="goToTickets">
              <i class="fas fa-ticket-alt me-1"></i> Tickets
            </button>
          </li>
          
          <!-- Auth Buttons -->
          <li class="nav-item me-2">
            <button class="auth-button login" @click="goToLogin">Sign in</button>
          </li>
          <li class="nav-item me-2">
            <button class="auth-button signup" @click="goToSignUp">Register</button>
          </li>
          <li class="nav-item">
            <button class="nav-link link-button" @click="goToProfile">
              <i class="fas fa-user"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";

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
  background-color: #0a075f;
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
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  margin-top: 10px;
}

.link-button:hover {
  color: #ccc;
}

.auth-button {
  padding: 0.5rem 1rem;
  background-color: #e3e3e3;
  border: 1px solid #767676;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.auth-button.signup {
  background-color: #2c2c2c;
  color: white;
  border-color: #2c2c2c;
}

.auth-button:hover {
  background-color: #ccc;
}

/* Mobile view adjustments */
@media (max-width: 992px) {
  .navbar-collapse {
    padding-top: 1rem;
  }
  
  .navbar-nav {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .nav-item {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .auth-button {
    width: 100%;
    text-align: left;
    padding-left: 1rem;
  }
  
  .link-button {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>