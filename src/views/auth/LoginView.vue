<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';

const router = useRouter();

// States 
const username = ref('');
const password = ref('');
const rememberMe = ref(false);

const handleLogin = async () => {
    // TODO: Implement login logic
    console.log('Login attempted:', { username: username.value, password: password.value });
    router.push('/admin');
}
</script>

<template>
  <div class="min-vh-100 bg-light d-flex align-items-center justify-content-center">
    <Card class="w-100 shadow-lg p-4" style="max-width: 28rem;">
      <template #title>
        <div class="text-center mb-4">
          <h2 class="fs-2 fw-bold text-dark">Login</h2>
          <p class="text-muted mt-2">Welcome to RegiMaster</p>
        </div>
      </template>

      <template #content>
        <form @submit.prevent="handleLogin">
          <!-- Username input box -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <div class="input-group">
              <span class="input-group-text">
                <i class="pi pi-user"></i>
              </span>
              <InputText v-model="username" placeholder="Enter your username" :class="{'p-invalid': false}" class="form-control" />
            </div>
          </div>

          <!-- Password input box -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <Password v-model="password" placeholder="Enter your password" :feedback="false" toggleMask class="form-control" inputClass="form-control" />
            <div class="d-flex justify-content-end mt-1">
              <a href="#" class="text-decoration-none text-primary">Forgot password?</a>
            </div>
          </div>

          <!-- Remember me checkbox -->
          <div class="d-flex align-items-center mb-3">
            <Checkbox v-model="rememberMe" :binary="true" inputId="rememberMe" />
            <label for="rememberMe" class="ms-2 form-check-label">Remember me?</label>
          </div>

          <hr />

          <!-- Login button -->
          <Button type="submit" class="w-100" label="LOGIN" />

          <!-- Register link -->
          <div class="text-center mt-4">
            <span class="fs-6 text-muted">
              Don't have an account?
              <router-link to="/register" class="text-decoration-none text-primary ms-1">
                Register now!
              </router-link>
            </span>
          </div>
        </form>
      </template>

      <!-- Footer section of the login card -->
      <template #footer>
        <p class="text-center text-muted fs-6">
          copyright Regimaster 2025
        </p>
      </template>
    </Card>
  </div>
</template>

<style scoped>
:deep(.p-card) {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
}

:deep(.p-inputtext) {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem 1rem;
}

:deep(.p-inputtext:enabled:focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

:deep(.p-password-input) {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem 1rem;
}

:deep(.p-password i) {
  color: #64748b;
}

:deep(.p-button) {
  background: #3b82f6;
  border: none;
  padding: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
}

:deep(.p-button:enabled:hover) {
  background: #2563eb;
}

:deep(.p-checkbox) {
  width: 1.25rem;
  height: 1.25rem;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background: #3b82f6;
  border-color: #3b82f6;
}
</style>
