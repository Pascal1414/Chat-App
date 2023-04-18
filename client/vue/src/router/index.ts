import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/room/:name',
      name: 'Room',
      component: () => import('@/views/RoomView.vue')
    }
  ]
})

export default router
