<template>
 <div>
   <van-tabs v-model:active="active">
      <van-tab title="今天">
        <TrialStudentRecordItem type="today"></TrialStudentRecordItem>
      </van-tab>
      <van-tab title="本月">
        <TrialStudentRecordItem type="month"></TrialStudentRecordItem>
      </van-tab>
      <van-tab title="全部">
        <TrialStudentRecordItem type="all"></TrialStudentRecordItem>
      </van-tab>
    </van-tabs>
 </div>
</template>
<script lang="ts">
import { Tab, Tabs } from 'vant'
import { defineComponent, ref } from 'vue'
import TrialStudentRecordItem from './components/trial-student.vue'
export default defineComponent({
  name: 'TrialStudentRecord',

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    TrialStudentRecordItem: TrialStudentRecordItem
  },

  setup () {
    const active = ref(1)
    return { active }
  }
})
</script>
<style lang="scss" scoped>

</style>
