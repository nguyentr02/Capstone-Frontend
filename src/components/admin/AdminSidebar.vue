<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const emit  = defineEmits(['toggle-sidebar'])

const router = useRouter()
const activeItem = ref('dashboard')

// Menu structure
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'pi pi-home', route: '/admin' },
  { id: 'events', label: 'Events', icon: 'pi pi-calendar', route: '/admin/events' },
  { id: 'users', label: 'Users', icon: 'pi pi-users', route: '/admin/users' },
  { id: 'tickets', label: 'Tickets', icon: 'pi pi-ticket', route: '/admin/tickets' },
  { id: 'reports', label: 'Reports', icon: 'pi pi-chart-bar', route: '/admin/reports' },
  { id: 'settings', label: 'Settings', icon: 'pi pi-cog', route: '/admin/settings' }
]

const sidebarClass = computed(() => {
  return props.collapsed ? 'w-16' : 'w-60'
})

const navigateTo = (item) => {
  activeItem.value = item.id
  router.push(item.route)
}

const toggleSidebar = () => {
  emit('toggle-sidebar')
}

</script>

<template>
  <div 
    class="sidebar bg-gray-800 text-white transition-all duration-300 fixed left-0 top-0 h-full z-10"
    :class="sidebarClass"
  >
    <!-- Logo Area -->
    <div class="logo p-4 flex items-center justify-center border-b border-gray-700">
      <img 
        src="../../assets/cat.jpeg" 
        alt="RegiMaster" 
        class="h-8"
        v-if="collapsed"
      />
      <!-- Display the full logo when the sidebar is collapsed -->
      <div v-else class="text-xl font-bold">RegiMaster</div> 
      
      <!-- Toggle button inside sidebar - shows only when sidebar is collapsed -->
      <button 
        v-if="collapsed"
        @click="toggleSidebar" 
        class="text-white hover:bg-gray-700 rounded-full p-1"
      >
        <i class="pi pi-chevron-right"></i>
      </button>
    </div>
    
    <!-- Navigation Menu -->
    <nav class="mt-4">
      <ul>
        <li v-for="item in menuItems" :key="item.id">
          <a 
            @click="navigateTo(item)"
            class="flex items-center py-3 px-4 cursor-pointer transition-colors hover:bg-gray-700"
            :class="{ 'bg-gray-700': activeItem === item.id }"
          >
            <i :class="item.icon" class="text-lg"></i>
            <span v-if="!collapsed" class="ml-3">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>


    <div v-if="!collapsed" class="absolute bottom-4 right-4"
    >
      <button 
        @click="toggleSidebar" 
        class="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2"
      >
        <i class="pi pi-chevron-left"></i>
      </button>
    </div>
  </div>
</template>