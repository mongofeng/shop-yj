import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import BottomBar from '@/components/bottom-bar.vue'
import User from '@/views/user/index.vue'
import CourseList from '@/views/course/list.vue'
import CourseDetail from '@/views/course/detail.vue'
import Form from '@/views/form/index.vue'

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
    path: '/course/:id',
    name: 'CourseDetail',
    component: CourseDetail,
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/student-record',
    name: 'StudentRecord',
    component: () => import(/* webpackChunkName: "StudentRecord" */ '@/views/record/student/index.vue')
  },
  {
    path: '/trial-student-record',
    name: 'TrialStudentRecord',
    component: () => import(/* webpackChunkName: "TrialStudentRecord" */ '@/views/record/trial-student/index.vue')
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
  history: createWebHashHistory(),
  routes
})

export default router
