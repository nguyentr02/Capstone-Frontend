import {
  createRouter,
  createWebHistory
} from "vue-router";

import Home from "@/views/home.vue";
import Events from "@/views/events.vue";
import SignIn from "@/views/signIn.vue";
import SignUp from "@/views/SignUp.vue";
import eventDetail from "@/views/eventDetail.vue";
import RegisterEvent from "@/views/registerEvent.vue";
import SelectCategory from '@/views/SelectCategory.vue';
import PersonalInfo from '@/views/PersonalInfo.vue';
import Questionnaire from '@/views/Questionnaire.vue';
import Review from '@/views/Review.vue';
import Checkout from '@/views/Checkout.vue';

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'

const routes = [{
    path: "/",
    component: Home
  },
  {
    path: "/events",
    component: Events
  },
  {
    path: "/signIn",
    component: SignIn
  },
  {
    path: "/signUp",
    component: SignUp
  },
  {
    path: "/eventDetail",
    component: eventDetail
  },
  {
    path: "/registerEvent",
    component: RegisterEvent
  },
  {
    path: '/select-category',
    name: 'SelectCategory',
    component: SelectCategory,
  },
  {
    path: '/complete-form/personal',
    name: 'PersonalInfo',
    component: PersonalInfo,
  },
  {
    path: '/complete-form/questionnaire',
    name: 'Questionnaire',
    component: Questionnaire,
  },
  {
    path: '/complete-form/review',
    name: 'Review',
    component: Review,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  { path: '/admin/home',
  name: 'home',
  component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: () => import('../views/admin/DashboardView.vue')
  },
  {
    path: '/admin/events',
    name: 'events',
    component: () => import('../views/admin/Event/EventsView.vue')
  },
  {
    path: '/admin/events/create',
    name: 'event-create',
    component: () => import('../views/admin/Event/EventFormView.vue')
  },
  {
    path: '/admin/events/:id',
    name: 'event-details',
    component: () => import('../views/admin/Event/EventDetailsView.vue')
  },
  {
    path: '/admin/events/edit/:id',
    name: 'event-edit',
    component: () => import('../views/admin/Event/EventFormView.vue')
  },
  {
    path: '/admin/users',
    name: 'users',
    component: () => import('../views/admin/User/UsersView.vue')
  },
  {
    path: '/admin/users/create',
    name: 'UserCreate',
    component: () => import('@/views/admin/User/UserCreate.vue')
  },
  {
    path: '/admin/users/:userId',
    name: 'UserDetails',
    component: () => import('@/views/admin/User/UserDetail.vue')
  },
  {
    path: '/admin/users/edit/:userId',
    name: 'UserEdit',
    component: () => import('@/views/admin/User/UserEdit.vue')
  },
  {
    path: "/admin/tickets",
    name: "TicketsView",
    component: () => import("@/views/admin/Tickets/TicketsView.vue")
  },
  {
    path: "/admin/tickets/:eventId",
    name: "TicketsManagement",
    component: () => import("@/views/admin/Tickets/TicketsManagement.vue")
  },
  {
    path: "/admin/tickets/users/:id",
    name: "TicketUserDetail",
    component: () => import("@/views/admin/Tickets/TicketUserDetail.vue")
  },
  {
    path: "/admin/tickets/participants/:id",
    name: "ParticipantsDetail",
    component: () => import("@/views/admin/Tickets/TicketsParticipantsDetail.vue")
  },
  {
    path: "/admin/tickets/create",
    name: "TicketTypeCreate",
    component: () => import("@/views/admin/Tickets/TicketTypeCreate.vue")
  },
  {
    path: "/admin/tickets/edit/:id",
    name: "Ticketedit",
    component: () => import("@/views/admin/Tickets/TicketTypeEdit.vue")
  },
  {
    path: "/admin/Questionnaire",
    name: "QuestionnaireView",
    component: () => import("@/views/admin/Questionnaire/QuestionnaireView.vue")
  }
  /*
  {
    path: "/admin/reports",
    name: "reports",
    component: () => import("@/views/admin/ReportsView.vue")
  },
  {
    path: "/admin/settings",
    name: "settings",
    component: () => import("@/views/admin/SettingsView.vue")
  }
  */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;