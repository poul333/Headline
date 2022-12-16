import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      isHideTabbar: true
    }
  },
  {
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/QA/index.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/Video/index.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/My/index.vue')
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router