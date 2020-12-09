import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Auth from '@/views/auth/index.vue'
import Pay from '@/views/pay/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue'),
    meta: {
      title: '会员中心'
    }
  },
  // {
  //   path: '/cart',
  //   name: 'Cart',
  //   component: () => import(/* webpackChunkName: "cart" */ '@/views/cart/index.vue'),
  //   meta: {
  //     title: '购物车'
  //   }
  // },
  {
    path: '/good/:id',
    name: 'Good',
    component: () => import(/* webpackChunkName: "goods" */ '@/views/good/index.vue'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import(/* webpackChunkName: "form" */ '@/views/form/index.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '@/views/shop/index.vue')
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
