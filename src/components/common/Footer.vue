<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="footer">
    <p>&copy; {{ currentYear }} RegiMaster. All rights reserved</p>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f9f9f9;
  padding: 1rem;
  text-align: center;
}
</style>