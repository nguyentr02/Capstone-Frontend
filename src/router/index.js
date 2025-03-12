import { createRouter, createWebHistory } from "vue-router";
import Homepage from '@/views/HomeView.vue'
import AdminHomeView from "@/views/AdminHomeView.vue";
import AdminReportView from "@/views/AdminReportView.vue";
import AdminQuestionaireManagementView from "@/views/AdminQuestionaireManagementView.vue"
import AdminPaymentManagementView from "@/views/AdminPaymentManagementView.vue"
import AdminRegistrationManagementView from "@/views/AdminRegistrationManagementView.vue"
import AdminEventManagementView from "@/views/AdminEventManagementView.vue"

const routes = [
  { path: "/", component: Homepage },
  { path: "/admin", component : AdminHomeView},
  { path: "/admin/report", component : AdminReportView},
  { path: "/admin/questionaire", component : AdminQuestionaireManagementView},
  { path: "/admin/payment", component : AdminPaymentManagementView},
  { path: "/admin/registration", component : AdminRegistrationManagementView},
  { path: "/admin/event", component : AdminEventManagementView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

