import { createRouter, createWebHistory } from 'vue-router'

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

export default router
