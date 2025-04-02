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
  { id: 'dashboard', label: 'Dashboard', icon: 'pi pi-home', route: '/user/profile' },
  // { id: 'events', label: 'Events', icon: 'pi pi-calendar', route: '/admin/events' },
  // { id: 'users', label: 'Users', icon: 'pi pi-users', route: '/admin/users' },
  // { id: 'tickets', label: 'Tickets', icon: 'pi pi-ticket', route: '/admin/tickets' },
  // { id: 'reports', label: 'Reports', icon: 'pi pi-chart-bar', route: '/admin/reports' },
  // { id: 'settings', label: 'Settings', icon: 'pi pi-cog', route: '/admin/settings' }
]

const sidebarClass = computed(() => {
  return props.collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
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
  <link rel="stylesheet" href="src/assets/font-awesome-4.7.0/css/font-awesome.css">
  <div
      class="sidebar bg-dark text-white position-fixed start-0 top-0 h-100 z-3"
      :class="sidebarClass"
  >
    <!-- Logo Area -->
    <div class="logo p-4 d-flex align-items-center justify-content-between border-bottom border-secondary">
      <img
          v-if="collapsed"
          src="../../assets/cat.jpeg"
          alt="RegiMaster"
          class="h-8"
      />
      <a class="navbar-brand" href="/">
        <h2 style="font-family: 'LogoFont';" class="text-light pt-3">Teket</h2>
        <span class="text-dark fw-bold" id="brandName">Teket</span>
      </a>
      <!-- Toggle button inside sidebar - shows only when sidebar is collapsed -->
      <button
          v-if="collapsed"
          @click="toggleSidebar"
          class="btn btn-link text-white p-1"
      >
        <i class="pi pi-chevron-right"></i>
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="mt-4">
      <ul class="nav flex-column" style="font-family: 'Font'">
        <li v-for="item in menuItems" :key="item.id" class="nav-item">
          <a
              @click="navigateTo(item)"
              class="nav-link d-flex align-items-center py-3 px-4 text-white text-decoration-none"
              :class="{ 'bg-secondary': activeItem === item.id }"
          >
            <i :class="item.icon"></i>
            <span v-if="!collapsed"  class="ms-3 ">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <div v-if="!collapsed" class="position-absolute bottom-0 end-0 p-3">
      <button
          @click="toggleSidebar"
          class="btn btn-secondary rounded-circle p-2"
      >
        <i class="pi pi-chevron-left"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  transition: all 0.3s ease;
}

.sidebar-expanded {
  width: 240px;
}

.sidebar-collapsed {
  width: 64px;
}

.nav-link {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logo {
  height: 60px;
}
</style>