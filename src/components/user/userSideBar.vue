<!-- src/components/Sidebar.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['toggle-sidebar'])
const router = useRouter()
const route = useRoute()

const activeItem = computed(() => {
  const currentPath = route.path;
  if (currentPath.startsWith('/user/events')) return 'events';
  else if (currentPath.startsWith('/user/tickets')) return 'tickets';
  else if (currentPath.startsWith('/user/management')) return 'management';
  return 'dashboard';
})

// 菜单项列表，新增“Questionnaire”选项
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'pi pi-home', route: '/user/profile' },
  { id: 'events', label: 'Events', icon: 'pi pi-calendar', route: '/user/events' },
  { id: 'tickets', label: 'Tickets', icon: 'pi pi-ticket', route: '/user/tickets' },
  { id: 'management', label: 'Change profile', icon: 'pi pi-cog', route: '/user/management' },
]


// 根据是否折叠设置宽度样式
const sidebarStyle = computed(() => {
  return {
    width: props.collapsed ? '4rem' : '15rem'
  }
})

// 跳转至指定路由
const navigateTo = (item) => {
  router.push(item.route)
}

// 切换侧边栏折叠状态
const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>

<template>
  <div class="bg-dark text-white position-fixed top-0 start-0 vh-100 d-flex flex-column"
       :class="[props.collapsed ? 'sidebar-collapsed' : 'sidebar-expanded']"
       :style="sidebarStyle"
       style="transition: width 0.3s; z-index: 10;">
    <div class="d-flex align-items-center border-bottom border-secondary p-3">
      <img v-if="props.collapsed" src="../../assets/cat.jpeg" alt="RegiMaster" style="height: 2rem;" />
      <div v-else class="fs-4 fw-bold">
        <a href="/">RegiMaster</a>
      </div>
      <button v-if="props.collapsed" @click="toggleSidebar" class="text-white rounded-circle p-1 ms-auto"
              style="background: none; border: none;">
        <i class="pi pi-chevron-right"></i>
      </button>
    </div>
    <nav class="mt-3 flex-grow-1">
      <ul class="list-unstyled">
        <li v-for="item in menuItems" :key="item.id" style="cursor: pointer;">
          <a @click="navigateTo(item)" class="d-flex align-items-center py-2 px-3 text-white text-decoration-none user-menu-item"
             :class="{ 'bg-secondary': activeItem === item.id }">
            <i :class="item.icon" class="fs-5"></i>
            <span v-if="!props.collapsed" class="ms-3">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
    <div v-if="!props.collapsed" class="position-absolute bottom-0 end-0 m-3">
      <button @click="toggleSidebar" class="btn btn-secondary rounded-circle p-2">
        <i :class="[props.collapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left']"></i>
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


