<script setup>
</script>
<template>
    <div class="sign-up-container">
        <div class ="sign-up-box">
            <div >
                <img src="@/assets/logo.svg" alt="logo" class="logo" />
            </div>
            <div class = "sign-up-title">
                <h1>Sign Up</h1>
            </div>
            
            <form>
                <div class = "info-input">
                    <label for = "enmail">Enter your email adress</label>
                    <input type="email" id="email" required/>
                    <label for="password">Choose a secure password</label>
                    <input type="password" name="password" id="password" required>
                </div>
                <div class="terms">
                    <input type="checkbox" id="terms-condition"/>
                    <label for="terms-condition">By creating an account, you ....</label>
                </div>
                <button class="sign-up-btn" type="submit">Create Account</button>
            </form>
            <hr>
            <div class="login-link">
                <p>Already have an account? <router-link to="/login">Login here!</router-link></p>
            </div>
        </div>
    </div>
</template>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

    .sign-up-container{
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        background-color: #0C49BF78;
        border-radius: 15px;
        width: 600px;
        margin: 30px;
        margin-left: 60vh;
        margin-right: 50vh;
        margin-top: 15%;
    }

    .sign-up-box{
        padding: 40px;
        width: 450px;
        text-align: center;
    }

    .logo{
        width: 100px;
        margin: 0;
    }
    
    h1{
        color: black;
        font-family: 'Inter';
        font-weight: 600;
    }

    .sign-up-title{
        display: flex;
        align-items: flex-start;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    .info-input label {
        display: flex;
        font-family: 'Inter';
        margin: 0;
        font-size: 14px;
        color: black;
        align-content: start;
    }

    .info-input input[type="email"],
    input[type="password"] {
        width: 400px;
        padding: 10px;
        border-radius: 20px;
        border: 1px solid #ccc;
        margin-bottom: 15px;
        height: 10px;
    }

    .terms {
        display: flex;
        align-items: center;
        margin-bottom: 40px;
    }

    .terms label {
        display: flex;
        font-family: 'Inter';
        margin: 0;
        font-size: 14px;
        color: black;
        align-content: start;
    }

    .terms input {
        margin-right: 10px;
    }

    hr{
        height: 2px;
        color: black;
        background-color: black;
        border-width: 0;
        margin-bottom: 10px;
    }

    .sign-up-btn {
        padding: 10px;
        font-family: 'Inter';
        font-weight: 700;
        background: #C1A4EF;
        border: none;
        border-radius: 30px;
        color: white;
        font-size: 16px;
        cursor: pointer;
        margin-bottom: 15px;    
        transition: background-color 0.3s ease;
    }


</style>