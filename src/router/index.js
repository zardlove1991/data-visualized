import VueRouter from 'vue-router'
import {getPlatId} from '@/utils/appinfo'

// const getComponent = page => () => import(`@/components/${page}`)
const getPage = page => () => import(`@/views/${page}`)
const allRoutes = [
  {
    path: '/',
    name: 'home',
    component: getPage('home'),
    meta: {
      title: '首页',
      requiresAuth: true
    }
  },
  {
    path: '/commandSystem',
    name: 'commandsystem',
    component: getPage('commandSystem')
  },
  {
    path: '/login',
    name: 'login',
    component: getPage('commandSystem/login')
  }
]

export function createRouter (Vue) {
  Vue.use(VueRouter)
  let platId = getPlatId()
  const router = new VueRouter({
    base: platId + '/',
    mode: 'history',
    routes: allRoutes,
    saveScrollPosition: true
  })
  return router
}
