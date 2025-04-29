import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/home.vue";
import UserManagementView from "@/views/user/userManagementView.vue";
import userEventView from "@/views/user/userEventView.vue";
import Events from "@/views/event/events.vue";
import SignIn from "@/views/auth/signIn.vue";
import SignUp from "@/views/auth/signUp.vue";
import SelectCategory from "@/views/questionare/SelectCategory.vue";
import Questionnaire from "@/views/questionare/Questionnaire.vue";
import Review from "@/views/questionare/Review.vue";
import Checkout from "@/views/questionare/Checkout.vue";
import UserProfileView from "@/views/user/UserProfileView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import registerEvent from "@/views/registerEvent.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/events", component: Events },
  { path: "/signIn", component: SignIn },
  { path: "/signUp", component: SignUp },
  {
    path: "/eventDetail/:id",
    name: "EventDetail",
    component: () => import("@/views/event/eventDetail.vue"),
  },
  { path: "/registerEvent", component: registerEvent },
  {
    path: "/select-category",
    name: "SelectCategory",
    component: SelectCategory,
  },
  {
    path: "/personalInfo",
    name: "PersonalInfo",
    component: () => import("@/views/questionare/PersonalInfo.vue"),
  },
  {
    path: "/complete-form/questionnaire",
    name: "Questionnaire",
    component: Questionnaire,
  },
  {
    path: "/complete-form/review",
    name: "Review",
    component: Review,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  { path: "/admin/home", name: "home", component: HomeView },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/admin",
    name: "dashboard",
    component: () => import("../views/admin/DashboardView.vue"),
  },
  {
    path: "/admin/events",
    name: "events",
    component: () => import("../views/admin/Event/EventsList.vue"),
  },
  {
    path: "/admin/events/create",
    name: "event-create",
    component: () => import("../views/admin/Event/EventFormView.vue"),
  },
  {
    path: "/admin/events/:id",
    name: "event-details",
    component: () => import("../views/admin/Event/EventDetailsView.vue"),
  },
  {
    path: "/admin/events/edit/:id",
    name: "event-edit",
    component: () => import("../views/admin/Event/EventFormView.vue"),
  },
  {
    path: "/admin/users",
    name: "users",
    component: () => import("../views/admin/User/UserList.vue"),
  },
  {
    path: "/admin/users/create",
    name: "UserCreate",
    component: () => import("@/views/admin/User/UserCreate.vue"),
  },
  {
    path: "/admin/users/:userId",
    name: "UserDetails",
    component: () => import("@/views/admin/User/UserDetail.vue"),
  },
  {
    path: "/admin/users/edit/:userId",
    name: "UserEdit",
    component: () => import("@/views/admin/User/UserEdit.vue"),
  },
  {
    path: "/admin/tickets",
    name: "TicketsView",
    component: () => import("@/views/admin/Tickets/TicketsList.vue"),
  },
  {
    path: "/admin/tickets/:eventId",
    name: "TicketsManagement",
    component: () => import("@/views/admin/Tickets/TicketsManagement.vue"),
    props: true
  },
  {
    path: "/admin/tickets/:eventId/edit/:ticketId",
    name: "TicketEdit",
    component: () => import("@/views/admin/Tickets/TicketTypeEdit.vue"),
    props: true
  },
  {
    path: "/admin/tickets/users/:id",
    name: "TicketUserDetail",
    component: () => import("@/views/admin/Tickets/TicketUserDetail.vue"),
  },
  {
    path: "/admin/tickets/participants/:id",
    name: "ParticipantsDetail",
    component: () =>
      import("@/views/admin/Tickets/TicketsParticipantsDetail.vue"),
  },
  {
    path: "/admin/tickets/:eventId/create",
    name: "TicketTypeCreate",
    component: () => import("@/views/admin/Tickets/TicketTypeCreate.vue"),
    props: true
  },
  {
    path: "/admin/Questionnaire",
    name: "QuestionnaireList",
    component: () =>
      import("@/views/admin/Questionnaire/QuestionnaireList.vue"),
  },
  {
    path: "/admin/questionnaire/view/:eventId",
    name: "ViewQuestionnaire",
    component: () =>
      import("@/views/admin/Questionnaire/ViewQuestionnaire.vue"),
  },
  { path: "/user/profile", component: UserProfileView },

  {
    path: "/user/management",
    name: "userManagement",
    component: UserManagementView,
  },

  {
    path: "/user/events",
    name: "userEvents",
    component: userEventView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
