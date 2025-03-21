import { createRouter, createWebHistory } from "vue-router";
import Homepage from '@/views/HomeView.vue'
import AdminHomeView from "@/views/AdminHomeView.vue";
import AdminReportView from "@/views/AdminReportView.vue";
import AdminQuestionaireManagementView from "@/views/AdminQuestionaireManagementView.vue"
import AdminPaymentManagementView from "@/views/AdminPaymentManagementView.vue"
import AdminRegistrationManagementView from "@/views/AdminRegistrationManagementView.vue"
import Create_questionnaire_view from "@/views/CreateQuestionnaireView.vue"
import Event_Information_Edit from "@/views/EventCreationView.vue"
import ReportGeneration from "@/views/ReportGeneration.vue"

const routes = [
  { path: "/", component: Homepage },
  { path: "/admin", component : AdminHomeView},
  { path: "/admin/report", component : AdminReportView},
  { path: "/admin/questionaire", component : AdminQuestionaireManagementView},
  { path: "/admin/payment", component : AdminPaymentManagementView},
  { path: "/admin/registration", component : AdminRegistrationManagementView},

  { path: "/admin/Create_questionnaire", component : Create_questionnaire_view},
  { path: "/admin/Event_creation", component : Event_Information_Edit},
  { path: "/admin/Report_Generation", component : ReportGeneration},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

