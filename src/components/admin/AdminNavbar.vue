<script setup>
import { ref } from 'vue';

  const isUserMenuOpen = ref(false);

  const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
  };

  defineEmits(['toggle-sidebar']);
  
</script>

<template>
  <div class="bg-white shadow-sm h-16 flex items-center justify-between px-6">
    <!-- Left section -->
    <div class="flex items-center">
      <button 
        @click="$emit('toggle-sidebar')" 
        class="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <i class="pi pi-bars text-gray-600"></i>
      </button>
      
      <div class="relative">
        <input 
          type="text" 
          placeholder="Search..." 
          class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        <i class="pi pi-search absolute left-3 top-3 text-gray-400"></i>
      </div>
    </div>
    
    <!-- Right section -->
    <div class="flex items-center space-x-5">
      <!-- Notifications -->
      <div class="relative">
        <button class="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
          <i class="pi pi-bell text-gray-600"></i>
        </button>
        <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          5
        </span>
      </div>
      
      <!-- User profile -->
      <div class="flex items-center cursor-pointer" @click="toggleUserMenu">
        <img 
          src="https://i.pravatar.cc/36" 
          alt="User" 
          class="w-8 h-8 rounded-full mr-2"
        />
        <span class="text-gray-800 hidden md:block">Admin User</span>
        <i class="pi pi-angle-down ml-2 text-sm"></i>
        
        <!-- User dropdown menu (shown when isUserMenuOpen is true) -->
        <div v-if="isUserMenuOpen" class="absolute right-0 top-12 bg-white shadow-lg rounded-lg py-2 w-48 z-10">
          <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100">
            <i class="pi pi-user mr-2"></i> Profile
          </a>
          <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100">
            <i class="pi pi-cog mr-2"></i> Settings
          </a>
          <div class="border-t my-1"></div>
          <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100">
            <i class="pi pi-power-off mr-2"></i> Logout
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

