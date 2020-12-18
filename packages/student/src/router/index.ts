import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import BottomBar from '@/components/bottom-bar.vue'
import User from '@/views/user/index.vue'
import Form from '@/views/form/index.vue'
import Success from '@/views/status/success.vue'

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
    path: '/form',
    name: 'Form',
    component: Form
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/student-record',
    name: 'StudentRecord',
    component: () => import(/* webpackChunkName: "StudentRecord" */ '@/views/record/student/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
