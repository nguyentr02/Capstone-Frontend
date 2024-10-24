import { createRouter, createWebHistory } from "vue-router";
import Homepage from '@/views/HomeView.vue'

const routes = [
  { path: "/", component: Homepage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

