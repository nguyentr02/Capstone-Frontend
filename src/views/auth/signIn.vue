<template>
  <Navbar />
  <div class="h-90" style="background-color: #edece8">
    <div class="container text-center w-100">
      <div class="row align-items-center" style="height: 100vh">
        <div class="col-3"></div>
        <div class="col-6 bg-white pb-3" style="border-radius: 20px">
          <img src="@/assets/logo.png" alt="logo" height="80" width="80" />
          <h1 style="font-family: 'Font'" class="text-warning">Log In</h1>
          <form @submit.prevent="signIn">
            <div class="mb-3 text-start">
              <label for="email" class="form-label" style="font-family: 'Font'">Email address</label>
              <input
                id="email"
                type="email"
                class="form-control"
                v-model="email"
                style="font-family: 'Font'; background-color: #fcfcfa"
                required
              />
              <div v-if="errors.email" class="text-danger small mt-1">
                {{ errors.email }}
              </div>
            </div>
            <div class="mb-3 text-start">
              <label for="password" class="form-label" style="font-family: 'Font'">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                v-model="pwd"
                style="background-color: #edece8"
                required
              />
              <div v-if="errors.pwd" class="text-danger small mt-1">
                {{ errors.pwd }}
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">Submit</button>
            <div v-if="errors.general" class="text-danger small mt-2">
              {{ errors.general }}
            </div>
          </form>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'
import { useUserStore } from '@/store/user'

const API_BASE_URL = 'https://eventregistrationsystem-backend.onrender.com/api';
const email = ref('')
const pwd = ref('')
const errors = ref({})

const userStore = useUserStore()
const router = useRouter()

// 挂载时检查登录状态，已登录则跳转首页
onMounted(() => {
  if (userStore.isAuthenticated) {
    router.push('/')
  }
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 登录逻辑，调用后端 /auth/login 接口，带上 refreshToken Cookie
const signIn = async () => {
  errors.value = {}
  // 基本校验
  if (!emailPattern.test(email.value)) {
    errors.value.email = 'Invalid email address'
    return
  }
  if (!pwd.value) {
    errors.value.pwd = 'Password is required'
    return
  }
  try {
    const res = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email: email.value, password: pwd.value })
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Login failed')
    // 从返回数据中获取 accessToken
    const { accessToken } = json.data
    userStore.setAccessToken(accessToken)
    router.push('/')
  } catch (err) {
    errors.value.general = err.message
  }
}
</script>
