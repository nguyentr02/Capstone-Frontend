<template>
  <div class="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 shadow-lg">
    <!-- Logo -->
    <div class="p-4 border-b border-gray-700">
      <h1 class="text-xl font-bold">RegiMaster</h1>
    </div>
    
    <!-- Navigation -->
    <nav class="mt-6">
      <ul>
        <li v-for="item in menuItems" :key="item.id" class="mb-1">
          <router-link 
            :to="item.route" 
            class="block py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            :class="{ 'bg-gray-700 text-white': activeItem === item.id }"
            @click="activeItem = item.id"
          >
            <span class="flex items-center">
              <i :class="item.icon" class="mr-3"></i>
              {{ item.label }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeItem = ref('dashboard');

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home', route: '/admin' },
  { id: 'events', label: 'Events', icon: 'fas fa-calendar', route: '/admin/events' },
  { id: 'users', label: 'Users', icon: 'fas fa-users', route: '/admin/users' },
  { id: 'tickets', label: 'Tickets', icon: 'fas fa-ticket-alt', route: '/admin/tickets' },
  { id: 'reports', label: 'Reports', icon: 'fas fa-chart-bar', route: '/admin/reports' },
  { id: 'settings', label: 'Settings', icon: 'fas fa-cog', route: '/admin/settings' }
];
</script>