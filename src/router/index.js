import { createRouter, createWebHistory } from "vue-router";
import Homepage from '@/views/HomeView.vue'
import AdminHomeView from "@/views/AdminHomeView.vue";
import AdminReportView from "@/views/AdminReportView.vue";
import AdminQuestionaireManagementView from "@/views/AdminQuestionaireManagementView.vue"

const routes = [
  { path: "/", component: Homepage },
  { path: "/admin", component : AdminHomeView},
  { path: "/adminreport", component : AdminReportView},
  { path: "/adminquestionaire", component : AdminQuestionaireManagementView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

