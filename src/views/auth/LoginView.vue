<script setup>
    import {ref} from 'vue';
    import {useRouter} from 'vue-router';

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
        console.log('Login attempted:', { username: username.value, password: password.value })
    }
</script>

<template>
    <div class="tw-min-h-screen tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
        <Card class="tw-w-full tw-max-w-md tw-shadow-lg tw-p-6">
            <template #title>
                <div class="tw-text-center tw-mb-4">
                    <h2 class="tw-text-2xl tw-font-bold tw-text-gray-800">Login</h2>
                    <p class="tw-text-gray-600 tw-mt-2">Welcome to RegiMaster</p>
                </div>
            </template>

            <template #content>
                <form @submit.prevent="handleLogin" class="tw-space-y-6">
                    
                    <!-- Username input box -->
                    <div class="tw-space-y-2"> 
                        <label for="username" class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Username</label>
                        <span class="p-input-icon-left tw-w-full">
                            <i class="pi pi-user" />
                            <InputText  v-model="username" placeholder="Enter your username" :class="{'p-invalid': false}" class="tw-w-full" />
                        </span>
                    </div>

                    <!-- Password input box -->
                    <div class="tw-space-y-2"> 
                        <label for="password" class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Password</label>
                        <Password v-model="password" placeholder="Enter your password" :feedback="false" toggleMask class="tw-w-full" inputClass = "tw-w-full"/>
                        <div class="tw-flex tw-justify-end">
                          <a href="#" class="tw-text-sm tw-text-blue-600 hover:tw-text-blue-800">
                            Forgot password?
                            </a>
                        </div>
                    </div>

                    <!-- Remember me checkbox -->
                    <div class="tw-flex tw-items-center">
                        <Checkbox v-model="rememberMe" :binary="true"  inputId="rememberMe" />
                        <label for="rememberMe" class="tw-ml-2 tw-text-sm tw-text-gray-600">Remember me?</label>
                    </div>

                    <Divider />

                    <!-- Login button -->
                    <Button type="submit" class="tw-w-full" label="LOGIN" />

                    <!-- Register link -->
                    <div class="tw-text-center tw-mt-4">
                        <span class="tw-text-gray tw-text-sm">
                            Don't have an account?
                            <router-link to="/register"  class="tw-text-blue-600 hover:tw-text-blue-800 tw-ml-1">
                                Register now!
                            </router-link>
                        </span>
                    </div> 
                </form>
            </template>

            <!-- Footer section of the login card -->
            <template #footer>
                <p class="tw-text-center tw-text-gray-500 tw-text-sm">
                copyright Regimaster 2024
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