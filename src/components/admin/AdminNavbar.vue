<!-- src/layout/AdminNavbar.vue -->
<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import Badge from 'primevue/badge'

const emit = defineEmits(['toggle-sidebar'])
const menu = ref(null)
const userMenuItems = [
  { label: 'Profile', icon: 'pi pi-user' },
  { label: 'Settings', icon: 'pi pi-cog' },
  { separator: true },
  { label: 'Logout', icon: 'pi pi-power-off' }
]

const notifications = 5
const messageCount = 3

const toggleMenu = (event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <div class="navbar bg-white shadow-sm flex items-center justify-between px-4 py-2">
    <!-- Left section -->
    <div class="flex items-center">
      <Button 
        icon="pi pi-bars" 
        text 
        @click="$emit('toggle-sidebar')"
        aria-label="Toggle Sidebar" 
      />
      
      <div class="ml-4 hidden md:block">
        <input 
          type="text" 
          placeholder="Search..." 
          class="p-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    
    <!-- Right section -->
    <div class="flex items-center space-x-4">
      <!-- Notifications -->
      <Button text icon="pi pi-bell" class="relative">
        <Badge v-if="notifications" :value="notifications" class="absolute -top-1 -right-1"></Badge>
      </Button>
      
      <!-- Messages -->
      <Button text icon="pi pi-envelope" class="relative">
        <Badge v-if="messageCount" :value="messageCount" class="absolute -top-1 -right-1"></Badge>
      </Button>
      
      <!-- User profile -->
      <div class="flex items-center cursor-pointer" @click="toggleMenu">
        <Avatar 
          image="https://i.pravatar.cc/40" 
          shape="circle" 
          class="mr-2"
        />
        <span class="hidden md:block">Admin User</span>
        <i class="pi pi-angle-down ml-2 text-sm"></i>
        <Menu ref="menu" :model="userMenuItems" :popup="true" />
      </div>
    </div>
  </div>
</template>