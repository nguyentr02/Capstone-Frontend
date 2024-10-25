<template>
  <div class="login-page">
    
    <button class="back-button" @click="$router.go(-1)">←</button>

    <div class="login-container">
      <!-- Logo -->
      <div class="logo">LOGO</div>

      <!-- Sign in title -->
      <h2 class="signin-title">Sign in</h2>

      <!-- form -->
      <form @submit.prevent="submitForm">
        <!-- Email input box -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required />
        </div>

        <!-- Password input box -->
        <div class="form-group password-group">
          <label for="password">Password:</label>
          <div class="password-input">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password" required />
          </div>
        </div>

        <!-- log in button -->
        <button type="submit" class="submit-btn">Sign In</button>
      </form>

      <!-- Forgot Password Link -->
      <p class="forgot-password">
        <router-link to="/reset-password">Forgot password?</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false, // Controls whether passwords are displayed
    };
  },
  methods: {
    submitForm() {
      alert(`Welcome, ${this.email}! You have signed in.`);
      this.$router.push("/"); // Jump to homepage after successful login
    },
    togglePassword() {
      this.showPassword = !this.showPassword; 
    },
    goBack() {
      this.$router.go(-1); 
    },
  },
};
</script>

<style scoped>

.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  position: relative;
}

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

.back-home:hover {
  color: #42b983;
}

.back-icon {
  margin-right: 8px;
  font-size: 20px;
}

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

/* title */
.signin-title {
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  color: #000;
  margin-bottom: 20px;
}

/* Form Styles */
.form-group {
  margin-bottom: 20px
}

label {
  display: block;
  font-size: 14px;
  color: #000;
  margin-bottom: 5px;
}

/* form container */
.login-container {
  width: 582px;
  height: 554px;
  padding: 30px; 
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Form Styles */
input {
  width: 100%; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 16px;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}

input:focus {
  border-color: #42b983;
}

.password-group {
  position: relative;
}

.password-input {
  position: relative;
}


.eye-icon {
  font-size: 18px;
  color: #555;
}

.submit-btn {
  width: 178.14px;
  height: 35.56px;
  background-color: #42b983;
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
  background-color: #369e6f;
}

.forgot-password {
  margin-top: 20px;
  font-size: 14px;
  color: #555;
}

.forgot-password a {
  color: #42b983;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}
</style>
