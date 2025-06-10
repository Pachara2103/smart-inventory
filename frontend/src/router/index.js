import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../pages/Login.vue'
import DashboardPage from '../pages/Dashboard.vue'
import ProductPage from '../pages/Product.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/Dashboard',
      name: 'dashboard',
      component: DashboardPage,
    },
     {
      path: '/Product',
      name: 'product',
      component: ProductPage,
    },
   
  ],
})

export default router
