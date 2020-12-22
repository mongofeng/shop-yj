<template>
  <div>
    <van-sticky>
      <van-row>
        <van-col span="8">
          <div class="label">
            {{ today }}
          </div>
          <div class="text">今天课时</div>
        </van-col>
        <!-- <van-col span="8">
          <div class="label">
            {{ month }}
          </div>
          <div class="text">本月课时</div>
        </van-col> -->
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
        <TrialStudentRecordItem type="today"></TrialStudentRecordItem>
      </van-tab>
      <!-- <van-tab title="本月">
        <TrialStudentRecordItem type="month"></TrialStudentRecordItem>
      </van-tab> -->
      <!-- <van-tab title="全部">
        <TrialStudentRecordItem type="all"></TrialStudentRecordItem>
      </van-tab> -->
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { Col, Row, Sticky, Tab, Tabs } from 'vant'
import { getStatistics } from '../composition/stactics'
import { defineComponent, ref, toRefs } from 'vue'
import TrialStudentRecordItem from './components/trial-student.vue'
export default defineComponent({
  name: 'TrialStudentRecord',

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Col.name]: Col,
    [Row.name]: Row,
    [Sticky.name]: Sticky,
    TrialStudentRecordItem: TrialStudentRecordItem
  },

  setup () {
    const active = ref(1)
    const { statistics } = getStatistics('trial_course_record')
    return { active, ...toRefs(statistics) }
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
