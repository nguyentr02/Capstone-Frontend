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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
