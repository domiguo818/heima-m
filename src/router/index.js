import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/Login') },
  { path: '/search', component: () => import('@/views/Search') },
  {
    path: '/',
    redirect: '/ ',
    component: () => import('@/views/Layout'),
    children: [
      { path: ' ', component: () => import('@/views/Home') },
      { path: 'profile', component: () => import('@/views/My') },
      { path: 'qa', component: () => import('@/views/QA') },
      { path: 'video', component: () => import('@/views/Video') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
