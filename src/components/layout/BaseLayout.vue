<script>
  export default {
    name: 'BaseLayout',
    data() {
      return {
        isLoggedIn: false
      }
    },
    created() {
      // Check if user is logged in by looking for token
      this.isLoggedIn = !!localStorage.getItem('token')
    },
    methods: {
      handleLogout() {
        // Remove token and redirect to login
        localStorage.removeItem('token')
        this.isLoggedIn = false
        this.$router.push('/login')
      }
    }
  }
  </script>

<template>
  <div class="app-wrapper">
    <!-- Navigation Header -->
    <header class="header">
      <nav class="nav">
        <div class="logo">
          <router-link to="/">EventMaster</router-link>
        </div>
        
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/events">Events</router-link>
          
          <!-- Show these links only when user is not logged in -->
          <template v-if="!isLoggedIn">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
          </template>
          
          <!-- Show these links only when user is logged in -->
          <template v-if="isLoggedIn">
            <router-link to="/profile">Profile</router-link>
            <button @click="handleLogout">Logout</button>
          </template>
          
        </div>
      </nav>
    </header>

    <!-- Main Content Area -->
    <main class="main-content">
      <!-- This is where page-specific content will be rendered -->
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 EventMaster. All rights reserved.</p>
    </footer>
  </div>
</template>
  
<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #333;
}

.nav-links a:hover {
  color: #666;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

.footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
}
</style>