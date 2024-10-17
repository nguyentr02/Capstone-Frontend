import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";
import EventList from "@/components/EventList.vue";
import EventDetails from "@/components/EventDetails.vue";
import TicketSelectionPage from "@/components/TicketSelectionPage.vue"; // 导入 TicketSelectionPage 组件
import CompleteFormPage from '@/components/CompleteFormPage.vue'; // 这里引入表单页面
import PaymentPage from '@/components/PaymentPage.vue'; // 引入支付页面
import BookingConfirmationPage from '@/components/BookingConfirmationPage.vue'; // 确认页面

const routes = [
  { path: "/", component: EventList },
  { path: "/events/:id", component: EventDetails, props: true },
  { path: "/login", component: UserLogin },
  { path: "/signup", component: SignUp },
  { path: "/ticket-selection", component: TicketSelectionPage },  // 票种选择页面的路由
  { path: '/complete-form', component: CompleteFormPage }, // 表单页面的路由
  { path: '/payment', component: PaymentPage }, // 支付页面的路由
  { path: '/booking-confirmation', component: BookingConfirmationPage }, // 确认页面路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
