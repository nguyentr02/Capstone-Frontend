import { createRouter, createWebHistory } from "vue-router";
import Homepage from '@/views/HomeView.vue'
import AdminHomeView from "@/views/AdminHomeView.vue";
import AdminQuestionare from '@/views/AdminQuestionare.vue';
import EventInformationEdit from "@/views/AdminEventEdit.vue";

const routes = [
  { path: "/", component: Homepage },

  {
    path: '/admin-questionnare',
    name: 'AdminQuestionnare',
    component: AdminQuestionare,
  },

  {
    path: '/admin-admineventedit',
    name: 'AdminEventEdit',
    component: EventInformationEdit,
  },

  { path: "/admin", component : AdminHomeView}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

