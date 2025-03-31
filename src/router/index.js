import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/home.vue";
import Events from "@/views/events.vue";
import SignIn from "@/views/signIn.vue";
import SignUp from "@/views/signUp.vue";
import eventDetail from "@/views/eventDetail.vue";
import RegisterEvent from "@/views/registerEvent.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/events", component: Events },
  { path: "/signIn", component: SignIn },
  { path: "/signUp", component: SignUp },
  { path: "/eventDetail", component: eventDetail },
  { path: "/registerEvent", component: RegisterEvent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
