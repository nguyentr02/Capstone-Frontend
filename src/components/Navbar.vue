<template>
  <nav class="navbar --bs-warning-bg-subtle">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img
          src="../assets/logo.png"
          alt="Logo"
          width="55"
          height="55"
          class="d-inline-block align-text-middle"
          style="stroke: black"
        />
        <span class="text-dark fw-bold" id="brandName">Teket</span>
      </a>

      <!-- User has not sign in -->
      <ul v-if="navState == true" class="nav justify-content-end">
        <li class="nav-item">
          <a href="/events" style="font-family: 'Font'" class="nav-link">
            <img
              src="../assets/calendar.png"
              alt="ICON"
              class="d-inline-block align-text-middle"
              width="20"
              height="20"
            />
            <span class="text-warning ms-2 fw-semibold">Events</span>
          </a>
        </li>
        <li class="nav-item ms-4">
          <router-link to="/signIn">
            <button class="btn btn-warning fw-semibold">Sign In</button>
          </router-link>
        </li>
        <li class="nav-item ms-3">
          <router-link to="/signUp"
            ><button class="btn btn-light fw-semibold">
              Sign Up
            </button></router-link
          >
        </li>
      </ul>

      <!-- If already logged in -->
      <ul v-else class="nav justify-content-end">
        <li class="nav-item">
          <a href="/events" style="font-family: 'Font'" class="nav-link">
            <img
              src="../assets/calendar.png"
              alt="ICON"
              class="d-inline-block align-text-middle"
              width="20"
              height="20"
            />
            <span class="text-warning ms-2 fw-semibold">Events</span>
          </a>
        </li>
        <li class="nav-item ms-3">
          <router-link to="/user/profile">
            <img
              width="40"
              height="40"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png"
              alt="UserLogo"
            />
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

export default {
  data() {
    return {
      navState: true,
    };
  },

  mounted() {
    this.checkState();
  },

  methods: {
    checkState() {
      const userStore = useUserStore();
      if (userStore.isAuthenticated) {
        console.log("User state verified");

        // Change state of Navbar
        this.navState = false;
      } else {
        console.log("User state NOT verified");
      }
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
