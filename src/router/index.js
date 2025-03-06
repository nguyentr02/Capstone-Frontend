import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import DashboardView from '../views/admin/DashboardView.vue'
import EventsView from '../views/admin/EventsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',
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
      path:'/admin/events',
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

  ],
})

export default router
