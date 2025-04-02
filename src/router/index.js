import { createRouter, createWebHistory } from "vue-router";

import UserLogin from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import EventList from "@/views/EventList.vue";
import EventDetails from "@/views/EventDetails.vue";
import TicketSelectionPage from "@/views/TicketSelectionPage.vue"; // Importing the TicketSelectionPage Component
import CompleteFormPage from '@/views/CompleteFormPage.vue'; // Introducing the form page here
import PaymentPage from '@/views/PaymentPage.vue'; // Introducing a payment page
import BookingConfirmationPage from '@/views/BookingConfirmationPage.vue'; // confirmation page
import ResetPassword from "@/views/ResetPassword.vue";
import TicketsPage from '../views/TicketsPage.vue';
  
import HomeView from '@/views/HomeView.vue'
import AdminHomeView from "@/views/AdminHomeView.vue";
import AdminReportView from "@/views/AdminReportView.vue";
import AdminQuestionaireManagementView from "@/views/AdminQuestionaireManagementView.vue"
import AdminPaymentManagementView from "@/views/AdminPaymentManagementView.vue"
import AdminRegistrationManagementView from "@/views/AdminRegistrationManagementView.vue"

import Create_questionnaire_view from "@/views/CreateQuestionnaireView.vue"
import Event_Information_Edit from "@/views/EventEditView.vue"
import AdminEventManagementView from "@/views/AdminEventManagementView.vue"
import UserProfileView from "@/views/UserProfileView.vue"


const routes = [
  
  { path: "/", component: HomeView },
  { path: "/events/:id", component: EventDetails, props: true },
  { path: "/login", component: UserLogin },
  { path: "/signup", component: SignUp },
  { path: "/ticket-selection", component: TicketSelectionPage },  // Ticket selection page routing
  { path: '/complete-form', component: CompleteFormPage }, // Form page routing
  { path: '/payment', component: PaymentPage }, // Payment page routing
  { path: '/booking-confirmation', component: BookingConfirmationPage }, // Confirm page routing
  { path: "/reset-password", component: ResetPassword },
  { path: '/tickets',name: 'Tickets', component: TicketsPage },
    
//   { path: "/", component: Homepage },
  { path: "/admin", component : AdminHomeView},
  { path: "/admin/report", component : AdminReportView},
  { path: "/admin/questionaire", component : AdminQuestionaireManagementView},
  { path: "/admin/payment", component : AdminPaymentManagementView},
  { path: "/admin/registration", component : AdminRegistrationManagementView},

  { path: "/admin/Create_questionnaire", component : Create_questionnaire_view},
  { path: "/admin/Event_creation", component : Event_Information_Edit},

  { path: "/admin/event", component : AdminEventManagementView},

  { path: "/user/profile", component : UserProfileView},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
