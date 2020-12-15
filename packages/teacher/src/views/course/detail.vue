<template>
  <div class="goods">
    <van-loading v-if="loading" />
    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ course.name }}</div>
        <div class="goods-price">{{ `${course.startTime } - ${course.endTime }`}}</div>
      </van-cell>
    </van-cell-group>

    <van-tabs v-model:active="active">
      <van-tab title="学生">
        <student :ids="course.studentIds" :courseId="course.id" :courseName="course.name"></student>
      </van-tab>
      <van-tab title="试用学生">
        <trialstudent :ids="course.trialStudentIds" :courseId="course.id" :courseName="course.name"></trialstudent>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import {

  Col,

  Cell,
  CellGroup,
  Button,
  Tab,
  Tabs,
  Empty,
  Loading
} from 'vant'
import { useRoute } from 'vue-router'
import * as api from '@root/common/api/course'
import Student from './components/student.vue'
import TrialStudent from './components/trial-student.vue'
export default defineComponent({
  name: 'CourseDetail',
  components: {
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Empty.name]: Empty,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Loading.name]: Loading,
    student: Student,
    trialstudent: TrialStudent
  },
  setup () {
    const route = useRoute()

    const loading = ref(false)

    const active = ref(1)

    const course = reactive({
      name: '',
      id: '',
      status: 0,
      desc: '',
      day: [], // 一周
      time: 1,
      startTime: '',
      endTime: '',
      studentIds: [],
      trialStudentIds: []
    })

    // fetch the user information when params change
    watch(
      () => route.params,
      async (newParams) => {
        if (typeof newParams.id === 'string') {
          try {
            loading.value = true
            const {
              data: { data }
            } = await api.getCourse(newParams.id)
            course.name = data.name
            course.id = newParams.id
            course.studentIds = data.studentIds as any
            course.trialStudentIds = data.trialStudentIds as any
            course.status = data.status
            course.desc = data.desc
            course.day = data.day as any
            course.endTime = data.endTime || ''
            course.startTime = data.startTime || ''

            loading.value = false
          } catch (error) {
            loading.value = false
          }
        }
      },
      {
        immediate: true
      }
    )

    return {
      course,
      active,
      loading
    }
  }
})
</script>
<style lang="scss">
.goods {
  padding-bottom: 50px;

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
