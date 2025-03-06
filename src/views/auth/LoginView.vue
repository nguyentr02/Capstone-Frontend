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
    <div class=" min-h-screen  bg-gray-100  flex  items-center  justify-center">
        <Card class=" w-full  max-w-md  shadow-lg  p-6">
            <template #title>
                <div class=" text-center  mb-4">
                    <h2 class=" text-2xl  font-bold  text-gray-800">Login</h2>
                    <p class=" text-gray-600  mt-2">Welcome to RegiMaster</p>
                </div>
            </template>

            <template #content>
                <form @submit.prevent="handleLogin" class=" space-y-6">
                    
                    <!-- Username input box -->
                    <div class=" space-y-2"> 
                        <label for="username" class=" block  text-sm  font-medium  text-gray-700">Username</label>
                        <span class="p-input-icon-left  w-full">
                            <i class="pi pi-user" />
                            <InputText  v-model="username" placeholder="Enter your username" :class="{'p-invalid': false}" class=" w-full" />
                        </span>
                    </div>

                    <!-- Password input box -->
                    <div class=" space-y-2"> 
                        <label for="password" class=" block  text-sm  font-medium  text-gray-700">Password</label>
                        <Password v-model="password" placeholder="Enter your password" :feedback="false" toggleMask class=" w-full" inputClass = " w-full"/>
                        <div class=" flex  justify-end">
                          <a href="#" class=" text-sm  text-blue-600 hover: text-blue-800">
                            Forgot password?
                            </a>
                        </div>
                    </div>

                    <!-- Remember me checkbox -->
                    <div class=" flex  items-center">
                        <Checkbox v-model="rememberMe" :binary="true"  inputId="rememberMe" />
                        <label for="rememberMe" class=" ml-2  text-sm  text-gray-600">Remember me?</label>
                    </div>

                    <Divider />

                    <!-- Login button -->
                    <Button type="submit" class=" w-full" label="LOGIN" />

                    <!-- Register link -->
                    <div class=" text-center  mt-4">
                        <span class=" text-gray  text-sm">
                            Don't have an account?
                            <router-link to="/register"  class=" text-blue-600 hover: text-blue-800  ml-1">
                                Register now!
                            </router-link>
                        </span>
                    </div> 
                </form>
            </template>

            <!-- Footer section of the login card -->
            <template #footer>
                <p class=" text-center  text-gray-500  text-sm">
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