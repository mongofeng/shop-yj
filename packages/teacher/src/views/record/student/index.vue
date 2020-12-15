<template>
 <div>
   <van-tabs v-model:active="active">
      <van-tab title="今天">
        <StudentRecordItem type="today"></StudentRecordItem>
      </van-tab>
      <van-tab title="本月">
        <StudentRecordItem type="month"></StudentRecordItem>
      </van-tab>
      <van-tab title="全部">
        <StudentRecordItem type="all"></StudentRecordItem>
      </van-tab>
    </van-tabs>
 </div>
</template>
<script lang="ts">
import { Tab, Tabs } from 'vant'
import { defineComponent, ref } from 'vue'
import StudentRecordItem from './components/student.vue'
export default defineComponent({
  name: 'StudentRecord',

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    StudentRecordItem: StudentRecordItem
  },

  setup () {
    const active = ref(1)
    return { active }
  }
})
</script>
<style lang="scss" scoped>

</style>
