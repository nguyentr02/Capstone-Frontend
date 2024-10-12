import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";
import EventList from "@/components/EventList.vue";
import EventDetails from "@/components/EventDetails.vue";

const routes = [
  { path: "/", component: EventList },
  { path: "/events/:id", component: EventDetails, props: true },
  { path: "/login", component: UserLogin },
  { path: "/signup", component: SignUp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
