<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-sidebar'])
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

// 使用 computed 返回侧边栏宽度，折叠时宽度 4rem，不折叠时宽度 15rem
const sidebarStyle = computed(() => {
  return {
    width: props.collapsed ? '4rem' : '15rem'
  }
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
    class="sidebar bg-dark text-white position-fixed top-0 start-0 vh-100"
    :style="[sidebarStyle, { zIndex: 10 }]"
  >
    <!-- Logo Area -->
    <div class="logo p-4 d-flex align-items-center justify-content-center border-bottom border-secondary">
      <img 
        src="../../assets/cat.jpeg" 
        alt="RegiMaster" 
        style="height: 2rem;"
        v-if="collapsed"
      />
      <!-- Display full logo when sidebar is not collapsed -->
      <div v-else class="fs-4 fw-bold">RegiMaster</div> 
      
      <!-- Toggle button inside sidebar - shows only when sidebar is collapsed -->
      <button 
        v-if="collapsed"
        @click="toggleSidebar" 
        class="text-white rounded-circle p-1"
      >
        <i class="pi pi-chevron-right"></i>
      </button>
    </div>
    
    <!-- Navigation Menu -->
    <nav class="mt-3">
      <ul class="list-unstyled">
        <li v-for="item in menuItems" :key="item.id">
          <a 
            @click="navigateTo(item)"
            class="d-flex align-items-center py-2 px-3"
            style="cursor: pointer;"
            :class="{ 'bg-secondary': activeItem === item.id }"
          >
            <i :class="item.icon" class="fs-4"></i>
            <span v-if="!collapsed" class="ms-3">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <div v-if="!collapsed" class="position-absolute" style="bottom: 1rem; right: 1rem;">
      <button 
        @click="toggleSidebar" 
        class="bg-secondary text-white rounded-circle p-2 border-0"
      >
        <i class="pi pi-chevron-left"></i>
      </button>
    </div>
  </div>
</template>

