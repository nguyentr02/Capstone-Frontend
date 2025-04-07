import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/home.vue";
import Events from "@/views/events.vue";
import SignIn from "@/views/signIn.vue";
import SignUp from "@/views/signUp.vue";
import SelectCategory from '@/views/SelectCategory.vue';
import Questionnaire from '@/views/Questionnaire.vue';
import Review from '@/views/Review.vue';
import Checkout from '@/views/Checkout.vue';

const routes = [
  { path: "/", component: Home },
  { path: "/events", component: Events },
  { path: "/signIn", component: SignIn },
  { path: "/signUp", component: SignUp },  
  {
    path: '/eventDetail/:id',
    name: 'EventDetail',
    component: () => import('@/views/EventDetail.vue'),
  },
  {
    path: '/select-category',
    name: 'SelectCategory',
    component: SelectCategory,
  },
  {
    path: '/personalInfo',
    name: 'PersonalInfo',
    component: () => import('@/views/PersonalInfo.vue'),
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
