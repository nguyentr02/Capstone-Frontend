<script>
export default {
  // Receive Data from parent component/view
  props: {
    userProfileData: {
      type: Object,
    },
  },
};
</script>

<script setup>
import { onMounted, ref } from "vue";

const isUserMenuOpen = ref(false);

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

defineEmits(["toggle-sidebar"]);
</script>

<template>
  <div
    class="bg-white shadow-sm d-flex align-items-center justify-content-between px-4"
    style="height: 4rem"
  >
    <!-- Left section -->
    <div class="d-flex align-items-center">
      <button
        @click="$emit('toggle-sidebar')"
        class="me-3 p-2 rounded-circle border-0 no-border-btn"
      >
        <i class="pi pi-bars text-secondary"></i>
      </button>

      <div class="position-relative">
        <input
          type="text"
          placeholder="Search..."
          class="form-control"
          style="padding-left: 2.5rem; width: 16rem"
        />
        <i
          class="pi pi-search position-absolute text-muted"
          style="left: 1rem; top: 0.75rem"
        ></i>
      </div>
    </div>

    <!-- Right section -->
    <div class="d-flex align-items-center gap-3">
      <!-- Notifications -->
      <div class="position-relative">
        <button class="p-2 rounded-circle border-0 no-border-btn">
          <i class="pi pi-bell text-secondary"></i>
        </button>
        <span
          class="position-absolute bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
          style="
            top: -0.25rem;
            right: -0.25rem;
            width: 1.25rem;
            height: 1.25rem;
          "
        >
          5
        </span>
      </div>

      <!-- User profile -->
      <div
        class="d-flex align-items-center"
        style="cursor: pointer"
        @click="toggleUserMenu"
      >
        <img
          src="https://i.pravatar.cc/36"
          alt="User"
          class="rounded-circle me-2"
          style="width: 2rem; height: 2rem"
        />
        <span clx  ass="text-dark d-none d-md-inline">{{ userProfileData.firstName }} {{ userProfileData.lastName }}</span>
        <i class="pi pi-angle-down ms-2 fs-6"></i>

        <!-- User dropdown menu (shown when isUserMenuOpen is true) -->
        <div
          v-if="isUserMenuOpen"
          class="position-absolute end-0 bg-dark shadow-lg rounded py-2"
          style="top: 3rem; width: 12rem; z-index: 10"
        >
          <a
            href="#"
            class="d-flex align-items-center px-4 py-2 text-white text-decoration-none user-menu-item"
          >
            <i class="pi pi-user me-2"></i> Profile
          </a>
          <a
            href="#"
            class="d-flex align-items-center px-4 py-2 text-white text-decoration-none user-menu-item"
          >
            <i class="pi pi-cog me-2"></i> Settings
          </a>
          <div class="border-top border-secondary my-1"></div>
          <a
            href="#"
            class="d-flex align-items-center px-4 py-2 text-white text-decoration-none user-menu-item"
          >
            <i class="pi pi-power-off me-2"></i> Logout
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-border-btn {
  background-color: white;
}

.no-border-btn:hover {
  background-color: #e9ecef;
}

.user-menu-item:hover {
  background-color: #343a40;
  transition: background-color 0.3s;
}
</style>
