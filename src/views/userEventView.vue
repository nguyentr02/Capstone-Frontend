<script setup>
import { ref } from 'vue';
import userSideBar from "@/components/user/userSideBar.vue"
import userNavBar from "@/components/user/userNavBar.vue";
import Footer from "@/components/Footer.vue";
import userEvent from "@/components/user/userEvent.vue"

const sidebarCollapsed = ref(false);
const showSidebarOverlay = ref(false); // State for mobile overlay

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
  // Toggle overlay only on mobile
  if (window.innerWidth < 992) {
    showSidebarOverlay.value = !showSidebarOverlay.value;
  }
};

// Watch for screen resize to handle overlay visibility
import { onMounted, onUnmounted } from 'vue';

function handleResize() {
  if (window.innerWidth >= 992) {
    showSidebarOverlay.value = false; // Hide overlay on desktop
  } else if (!sidebarCollapsed.value) {
    showSidebarOverlay.value = true; // Show overlay if sidebar is open on mobile
  } else {
    showSidebarOverlay.value = false; // Hide overlay if sidebar is collapsed on mobile
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="main-layout">
    <div
      v-if="showSidebarOverlay"
      @click="toggleSidebar"
      class="sidebar-backdrop d-lg-none"
    ></div>

    <userSideBar
      :collapsed="sidebarCollapsed"
      @toggle-sidebar="toggleSidebar"
      class="sidebar"
      :class="{ 'sidebar-collapsed': sidebarCollapsed }"
    />

    <main
      :style="{ marginLeft: sidebarCollapsed ? '64px' : '240px' }"
      style="background-color: #f5f7f1;"
      class="main-content transition-all duration-300"
      :class="{ 'content-dimmed': showSidebarOverlay }"
    >
      <userNavBar @toggle-sidebar="toggleSidebar"/>
      <userEvent />
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* Base layout styles */
.main-layout {
  display: flex;
  position: relative;
  min-height: 100vh; /* Ensure full viewport height */
}

.main-content {
  flex-grow: 1; /* Allow main content to take remaining width */
  transition: margin-left 0.3s ease, filter 0.3s ease; /* Add transition for filter */
}

/* Sidebar styles */
.sidebar {
  width: 240px;
  transition: width 0.3s ease, transform 0.3s ease; /* Add transition for mobile */
  /* Add other sidebar styling like background, etc. */
}

.sidebar-collapsed {
  width: 64px;
}

/* Overlay for mobile */
.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.content-dimmed {
  filter: brightness(0.8);
}

/* Mobile specific styles */
@media (max-width: 992px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0; /* Cover full height */
    z-index: 1050;
    transform: translateX(-100%); /* Initially hidden */
  }

  .sidebar-collapsed {
    transform: translateX(-100%); /* Ensure it stays hidden when collapsed on mobile */
  }

  .main-content {
    margin-left: 0 !important; /* No fixed margin on mobile */
  }
}
</style>