import {
  createRouter,
  createWebHistory
} from "vue-router";

import Home from "@/views/home.vue";
import Events from "@/views/events.vue";
import SignIn from "@/views/signIn.vue";
import SignUp from "@/views/signUp.vue";
import eventDetail from "@/views/eventDetail.vue";
import RegisterEvent from "@/views/registerEvent.vue";
import SelectCategory from '@/views/SelectCategory.vue';
import PersonalInfo from '@/views/PersonalInfo.vue';
import Questionnaire from '@/views/Questionnaire.vue';
import Review from '@/views/Review.vue';
import Checkout from '@/views/Checkout.vue';

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import DashboardView from '../views/admin/DashboardView.vue'
import EventsView from '../views/admin/EventsView.vue'

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
    component: DashboardView,
  },
  {
    path: '/admin/events',
    name: 'events',
    component: EventsView,
  },
  {
    path: '/admin/events/:id',
    name: 'event-details',
    component: () => import('../views/admin/EventDetailsView.vue')
  },
  {
    path: '/admin/events/create',
    name: 'event-create',
    component: () => import('../views/admin/EventFormView.vue')
  },
  {
    path: '/admin/events/edit/:id',
    name: 'event-edit',
    component: () => import('../views/admin/EventFormView.vue')
  },
  {
    path: '/admin/users',
    name: 'users',
    component: () => import('../views/admin/UsersView.vue')
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;