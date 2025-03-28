import { createRouter, createWebHistory } from "vue-router";

import UserLogin from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";
import EventList from "@/components/EventList.vue";
import EventDetails from "@/components/EventDetails.vue";
import TicketSelectionPage from "@/components/TicketSelectionPage.vue"; // Importing the TicketSelectionPage Component
import CompleteFormPage from '@/components/CompleteFormPage.vue'; // Introducing the form page here
import PaymentPage from '@/components/PaymentPage.vue'; // Introducing a payment page
import BookingConfirmationPage from '@/components/BookingConfirmationPage.vue'; // confirmation page
import ResetPassword from "@/components/ResetPassword.vue";
import TicketsPage from '../components/TicketsPage.vue';

// import Homepage from '@/views/HomeView.vue'
import AdminHomeView from "@/views/AdminHomeView.vue";
import AdminReportView from "@/views/AdminReportView.vue";
import AdminQuestionaireManagementView from "@/views/AdminQuestionaireManagementView.vue"
import AdminPaymentManagementView from "@/views/AdminPaymentManagementView.vue"
import AdminRegistrationManagementView from "@/views/AdminRegistrationManagementView.vue"

const routes = [
  
  { path: "/", component: EventList },
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
