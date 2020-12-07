import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'goods',
  },
  {
    path: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/user.vue'),
    meta: {
      title: '会员中心'
    }
  },
  {
    path: 'cart',
    component: () => import(/* webpackChunkName: "cart" */  '../views/cart.vue'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: 'goods',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods.vue'),
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
