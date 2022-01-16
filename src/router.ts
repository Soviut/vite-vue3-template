import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from './store'

import Index from '@/pages/Index.vue'
// for child routes that do not require a parent template
import PassLayout from '@/pages/PassLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Index,
      name: 'home',
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
