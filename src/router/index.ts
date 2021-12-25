import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routeData from './router'


const routes: Array<RouteRecordRaw> = routeData

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const isLogin = localStorage.getItem('token') ? true : false
  console.log(isLogin, 'isLogin')
  console.log(router);

  if (to.path !== '/login' && !isLogin) {
    router.push('/login')
  }
})

export default router
