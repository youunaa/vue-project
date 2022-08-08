import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '@/views/dashboard/dashboard-main'
import Left from '@/components/layout/Left'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Test from '@/views/test/test-main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    components: {
      left: Left,
      header: Header,
      default: Dashboard,
      footer: Footer
    }
  },
  {
    path: '/test',
    name: 'test',
    components: {
      default: Test
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
