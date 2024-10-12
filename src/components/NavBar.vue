<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const isActiveRoute = (path) => route.path === path;
</script>

<template>
    <div class="navbar">
      <nav class="nav">
        <RouterLink to="/">
          <img src="@/assets/logo.svg" alt="logo" class="logo" />
        </RouterLink>

        <div class="login-register">
            <RouterLink class="events" to="/events">Events</RouterLink>
            <RouterLink to="/login">
                <button class="login">Sign In</button>
            </RouterLink>
            <RouterLink to="/register">
                <button class="register">Register</button>
            </RouterLink>
        </div>
      </nav>
    </div>
  </template>
  
  <style scoped>
  .navbar {
  
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #0A075F;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
  }
  
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .logo {
    height: 40px;
    width: auto;
  }
  
  .events {
    font-family: 'Inter';
    color: white;
    font-size: 13px;
    margin-left: 20px;
    margin-right: 40px;
    text-decoration: none;
  }
  
  .login-register {
    display: flex;
    gap: 10px;
    margin-right: 80px;
  }
  
  .login, .register {
    font-size: 10px;
    font-family: 'Inter';
    background-color: #E3E3E3;
    color: white;
    border: 1px solid white;
    padding: 5px 30px;
    cursor: pointer;
    border-radius: 5px;
    color: black
  }
  
  .register {
    background-color: #2C2C2C;
    border-color: #2C2C2C;
    color: white
  }
  </style>