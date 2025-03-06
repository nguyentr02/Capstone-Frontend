<script setup>
import { ref } from 'vue'
import AdminSidebar from '../components/admin/AdminSidebar.vue'
import AdminNavbar from '../components/admin/AdminNavbar.vue'
import AdminFooter from '../components/admin/AdminFooter.vue'

const sidebarCollapsed = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<template>
  <div class="admin-layout">

    <!-- Sidebar -->
    <AdminSidebar :collapsed="sidebarCollapsed" @toggle-sidebar="toggleSidebar" />
    
    <!-- Main Content Area -->
    <div class="main-content transition-all duration-300" 
    :class="{ 'with-expanded-sidebar': !sidebarCollapsed, 'with-collapsed-sidebar': sidebarCollapsed }">
      
      <!-- Top Navbar -->
      <AdminNavbar @toggle-sidebar="toggleSidebar" />
      
      <!-- Page Content -->
      <div class="page-content">
        <slot></slot>
      </div>
      
      <!-- Footer -->
      <AdminFooter />
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fb;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s;
  display: flex;
  flex-direction: column;
}

.main-content.with-expanded-sidebar {
  margin-left: 240px;
}

.main-content.with-collapse-sidebar {
  margin-left: 60px;
}

.page-content {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .main-content.with-expanded-sidebar,
  .main-content.with-collapsed-sidebar {
    margin-left: 0;
  }
}

</style>