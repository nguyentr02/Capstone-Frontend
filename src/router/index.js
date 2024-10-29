import { createRouter, createWebHistory } from "vue-router";
import Homepage from '@/views/HomeView.vue'
import AdminHomeView from "@/views/AdminHomeView.vue";
import AdminReportView from "@/views/AdminReportView.vue";
import AdminQuestionaireManagementView from "@/views/AdminQuestionaireManagementView.vue"
import AdminPaymentManagementView from "@/views/AdminPaymentManagementView.vue"
import AdminRegistrationManagementView from "@/views/AdminRegistrationManagementView.vue"

const routes = [
  { path: "/", component: Homepage },
  { path: "/admin", component : AdminHomeView},
  { path: "/adminreport", component : AdminReportView},
  { path: "/adminquestionaire", component : AdminQuestionaireManagementView},
  { path: "/adminpayment", component : AdminPaymentManagementView},
  { path: "/adminregistrationmngt", component : AdminRegistrationManagementView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

