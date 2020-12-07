import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/good'
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue'),
    meta: {
      title: '会员中心'
    }
  },
  {
    path: '/cart',
    component: () => import(/* webpackChunkName: "cart" */ '@/views/cart/index.vue'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/good',
    component: () => import(/* webpackChunkName: "goods" */ '@/views/good/index.vue'),
    meta: {
      title: '商品详情'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
