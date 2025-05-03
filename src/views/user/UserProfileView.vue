<script setup>
import { ref } from "vue";
import userSideBar from "@/components/user/userSideBar.vue";
import userNavBar from "@/components/user/userNavBar.vue";
import Profile from "@/components/user/Profile.vue";

const sidebarCollapsed = ref(false);
const showSidebarOverlay = ref(false); // State for mobile overlay
const userData = ref(null);

const isLoading = ref(true);

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
  // Toggle overlay only on mobile
  if (window.innerWidth < 992) {
    showSidebarOverlay.value = !showSidebarOverlay.value;
  }
};

// Watch for screen resize to handle overlay visibility
import { onMounted, onUnmounted } from "vue";

function handleResize() {
  if (window.innerWidth >= 992) {
    showSidebarOverlay.value = false; // Hide overlay on desktop
  } else if (!sidebarCollapsed.value) {
    showSidebarOverlay.value = true; // Show overlay if sidebar is open on mobile
  } else {
    showSidebarOverlay.value = false; // Hide overlay if sidebar is collapsed on mobile
  }
}

onMounted(async () => {
  window.addEventListener("resize", handleResize);
  handleResize(); // Initial check

  const accessToken = localStorage.getItem("accessToken");
  await fetchData("http://localhost:3000/api/user/profile", accessToken);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

async function fetchData(url, token) {
  const aToken = token;

  await fetch(url, {
    method: "GET",
    headers: aToken
      ? {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
        },
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      userData.value = responseData.data;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<template>
  <div v-if="isLoading" class="loading-screen">
    <div class="loading-content">
      <div class="custom-spinner"></div>
      <p class="loading-text">Loading user data...</p>
    </div>
  </div>
  <div v-else class="main-layout">
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
      style="background-color: #f5f7f1"
      class="main-content transition-all duration-300"
      :class="{ 'content-dimmed': showSidebarOverlay }"
    >
      <userNavBar
        @toggle-sidebar="toggleSidebar"
        :user-profile-data="userData"
      />
      <Profile :user-profile-data="userData" />
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
    transform: translateX(
      -100%
    ); /* Ensure it stays hidden when collapsed on mobile */
  }

  .main-content {
    margin-left: 0 !important; /* No fixed margin on mobile */
  }
  .loading-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
  }

  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .loading-text {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #555;
  }


  .custom-spinner {
    /* Basic spinner animation */
    width: 60px;
    height: 60px;
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #3498db;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
</style>
