import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/home.vue";
import UserManagementView from "@/views/user/userManagementView.vue";
import userEventView from "@/views/user/userEventView.vue";
import Events from "@/views/event/events.vue";
import SignIn from "@/views/auth/signIn.vue";
import SignUp from "@/views/auth/signUp.vue";
import SelectCategory from '@/views/questionare/SelectCategory.vue';
import Questionnaire from '@/views/questionare/Questionnaire.vue';
import Review from '@/views/questionare/Review.vue';
import Checkout from '@/views/questionare/Checkout.vue';
import UserProfileView from "@/views/user/UserProfileView.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/events", component: Events },
  { path: "/signIn", component: SignIn },
  { path: "/signUp", component: SignUp },  
  {
    path: '/eventDetail/:id',
    name: 'EventDetail',
    component: () => import('@/views/event/eventDetail.vue'),
  },
  {
    path: '/select-category',
    name: 'SelectCategory',
    component: SelectCategory,
  },
  {
    path: '/personalInfo',
    name: 'PersonalInfo',
    component: () => import('@/views/questionare/PersonalInfo.vue'),
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
  { path: "/user/profile", component: UserProfileView},

  {
    path: '/user/management',
    name: "userManagement",
    component: UserManagementView
  },

  {
    path: '/user/events',
    name: "userEvents",
    component: userEventView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
