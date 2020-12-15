import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BottomBar from '@/components/bottom-bar.vue'
import User from '@/views/user/index.vue'
import CourseList from '@/views/course/index.vue'
import CourseDetail from '@/views/course/detail.vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/user',
    name: 'User',
    components: {
      default: User,
      bar: BottomBar
    },
    meta: {
      title: '会员中心'
    }
  },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: CourseDetail,
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
    path: '/course-list',
    name: 'CourseList',
    components: {
      default: CourseList,
      bar: BottomBar
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
