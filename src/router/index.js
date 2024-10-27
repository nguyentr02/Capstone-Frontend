import { createRouter, createWebHistory } from "vue-router";
import Homepage from '@/views/HomeView.vue'
import AdminHomeView from "@/views/AdminHomeView.vue";
import AdminQuestionare from '@/views/AdminQuestionare.vue';

const routes = [
  { path: "/", component: Homepage },

  {
    path: '/admin-questionnare',
    name: 'AdminQuestionnare',
    component: AdminQuestionare,
  },

  { path: "/admin", component : AdminHomeView}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

