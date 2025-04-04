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
  <div class="bg-dark text-white position-fixed top-0 start-0 vh-100 d-flex flex-column"
    :class="[collapsed ? 'sidebar-collapsed' : 'sidebar-expanded']" style="transition: width 0.3s; z-index: 10;">
    <!-- 顶部 Logo / 标题区 -->
    <div class="d-flex align-items-center border-bottom border-secondary p-3">
      <!-- 当侧边栏折叠时显示图片 -->
      <img v-if="collapsed" src="../../assets/cat.jpeg" alt="RegiMaster" style="height: 2rem;" />
      <!-- 不折叠时显示完整标题 -->
      <div v-else class="fs-4 fw-bold">
        RegiMaster
      </div>

      <!-- 当侧边栏折叠时，右侧出现一个小按钮可展开 -->
      <button v-if="collapsed" @click="toggleSidebar" class="text-white rounded-circle p-1 ms-auto"
        style="background: none; border: none;">
        <i class="pi pi-chevron-right"></i>
      </button>
    </div>

    <!-- 导航菜单 -->
    <nav class="mt-3 flex-grow-1">
      <ul class="list-unstyled">
        <li v-for="item in menuItems" :key="item.id">
          <a @click="navigateTo(item)" class="d-flex align-items-center py-2 px-3 text-white text-decoration-none user-menu-item"
            :class="{ 'bg-secondary': activeItem === item.id }">
            <i :class="item.icon" class="fs-5"></i>
            <!-- 折叠时隐藏文字，仅显示图标 -->
            <span v-if="!collapsed" class="ms-3">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- 底部折叠/展开切换按钮（仅在不折叠时显示） -->
    <div v-if="!collapsed" class="position-absolute bottom-0 end-0 m-3">
      <button @click="toggleSidebar" class="btn btn-secondary rounded-circle p-2">
        <i :class="[collapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left']"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.sidebar-collapsed {
  width: 60px;
}

.sidebar-expanded {
  width: 240px;
}

.user-menu-item:hover {
  background-color: #343a40;
  transition: background-color 0.3s;
}
</style>
