<script setup>
    import {ref} from 'vue';
    import {useRouter} from 'vue-router';

    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const rememberMe = ref(false);

    const handleLogin = async () => {
        // TODO: Implement login logic
        console.log('Login attempted:', { username: username.value, password: password.value })
    }
</script>


<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="text-center text-3xl font-bold text-gray-900">
          LOGIN
        </h2>
        <h3 class="mt-2 text-center text-sm text-gray-600">
          Welcome to the Event System
        </h3>
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div class="mt-1">
                <input 
                  id="username" 
                  v-model="username"
                  type="text" 
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
  
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1 relative">
                <input 
                  id="password" 
                  v-model="password"
                  type="password" 
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>
  
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input 
                  id="remember-me" 
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                  Remember me?
                </label>
              </div>
            </div>
  
            <div>
              <button 
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                LOGIN
              </button>
            </div>
          </form>
  
          <div class="mt-6 text-center text-sm text-gray-500">
            <p>copyright example@email.com</p>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>