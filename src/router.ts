import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from './store'

import Index from '@/pages/Index.vue'

import Login from '@/pages/Login.vue'
import Logout from '@/pages/Logout.vue'
import NotFound from '@/pages/404.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Index,
      name: 'home',
    },

    {
      path: '/login',
      component: Login,
      name: 'login',
    },
    {
      path: '/logout',
      component: Logout,
      name: 'logout',
    },

    // catch all 404
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
      name: '404',
    },
  ],
})

router.beforeEach((to) => {
  const store = useStore()

  // route guard, redirect to login if page requires auth and not logged in
  if (to.meta.requiresAuth && !store.currentUser) {
    return { name: 'login' }
  }
})

export default router
