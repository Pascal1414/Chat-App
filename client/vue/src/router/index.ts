import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/room/:name',
      name: 'Room',
      component: () => import('@/views/RoomView.vue')
    } 
  ]
})

export default router
