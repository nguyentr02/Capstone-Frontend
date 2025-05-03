<script setup>
import { onMounted, ref } from "vue";
import AdminSidebar from "../components/admin/AdminSidebar.vue";
import AdminNavbar from "../components/admin/AdminNavbar.vue";
import AdminFooter from "../components/admin/AdminFooter.vue";

const sidebarCollapsed = ref(false);
const isLoading = ref(true);
const userData = ref(null);



const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

onMounted(async () => {
  const accessToken = localStorage.getItem("accessToken");
  await fetchData("http://localhost:3000/api/user/profile", accessToken);
  console.log(userData);
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
  <div v-else class="d-flex min-vh-100 bg-light">
    <!-- Sidebar -->
    <AdminSidebar
      :collapsed="sidebarCollapsed"
      @toggle-sidebar="toggleSidebar"
    />

    <!-- Main Content Area -->
    <div
      class="main-content"
      :class="{
        'with-expanded-sidebar': !sidebarCollapsed,
        'with-collapse-sidebar': sidebarCollapsed,
      }"
    >
      <!-- Top Navbar -->
      <AdminNavbar
        @toggle-sidebar="toggleSidebar"
        :user-profile-data="userData"
      />

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

@media (max-width: 768px) {
  .main-content.with-expanded-sidebar,
  .main-content.with-collapse-sidebar {
    margin-left: 0;
  }
}
</style>
