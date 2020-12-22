<template>
  <div>
    <van-sticky>
      <van-row>
        <van-col span="12">
          <div class="label">
            {{ today }}
          </div>
          <div class="text">今天课时</div>
        </van-col>
        <van-col span="12">
          <div class="label">
            {{ trial.today }}
          </div>
          <div class="text">今天试课课时</div>
        </van-col>
        <!-- <van-col span="8">
          <div class="label">
            {{ all }}
          </div>
          <div class="text">总课时</div>
        </van-col> -->
      </van-row>
    </van-sticky>

    <van-tabs v-model:active="active">
      <van-tab title="今天">
        <StudentRecordItem type="today"></StudentRecordItem>
      </van-tab>
      <van-tab title="今天试课">
        <TrialStudentRecordItem type="today"></TrialStudentRecordItem>
      </van-tab>
      <!-- <van-tab title="全部">
        <StudentRecordItem type="all"></StudentRecordItem>
      </van-tab> -->
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { Col, Row, Sticky, Tab, Tabs } from 'vant'
import { defineComponent, ref, toRefs } from 'vue'
import { getStatistics } from '../record/composition/stactics'
import StudentRecordItem from '../record/student/components/student.vue'
import TrialStudentRecordItem from '../record/trial-student/components/trial-student.vue'
export default defineComponent({
  name: 'StudentRecord',

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Col.name]: Col,
    [Row.name]: Row,
    [Sticky.name]: Sticky,
    TrialStudentRecordItem: TrialStudentRecordItem,
    StudentRecordItem: StudentRecordItem
  },

  setup () {
    const active = ref(0) // 2020-12

    const { statistics } = getStatistics('course-hour-flow')
    const { statistics: trial } = getStatistics('trial_course_record')

    return { active, ...toRefs(statistics), trial }
  }
})
</script>
<style lang="scss" scoped>
.label {
  font-size: 20px;
  text-align: center;
  padding-top: 10px;
}
.text {
  font-size: 13px;
  text-align: center;
}
</style>
