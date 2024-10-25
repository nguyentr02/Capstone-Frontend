<template>
  <div class="login-page">

    <button class="back-button" @click="$router.go(-1)">←</button>

    <div class="login-container">

      <div class="logo">LOGO</div>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required />
        </div>

        <div class="form-group password-group">
          <label for="password">Password:</label>
          <div class="password-input">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password" required />
          </div>
        </div>

        <button type="submit" class="submit-btn">Sign In</button>
      </form>

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
      showPassword: false, 
    };
  },
  methods: {
    submitForm() {
      alert(`Welcome, ${this.email}! You have signed in.`);
      this.$router.push("/"); 
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

.login-container {
  width: 400px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo {
  width: 80px;
  height: 80px;
  background-color: #e0e0e0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
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
