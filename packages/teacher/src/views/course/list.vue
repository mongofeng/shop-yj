<template>
  <div>
    <!-- <van-notice-bar
      left-icon="volume-o"
      text="杨瑾美术推出年终钜惠学习礼包"
    /> -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadList"
    >

      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        is-link
        :value="getStudent(item)"
        to="index"
        @click="onTap(item)"

      />
    </van-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { compositionList } from '@root/common/composition/list'
import * as api from '@root/common/api/course'
import { List, NoticeBar, Cell } from 'vant'
import { useRouter } from 'vue-router'
import { COURSE_STATUS } from '@root/common/const/enum'
import { useStore } from 'vuex'
import { ICourse } from '@root/common/const/type/course'
export default defineComponent({
  name: 'CourseList',

  components: {
    [List.name]: List,
    [NoticeBar.name]: NoticeBar,
    [Cell.name]: Cell
  },

  setup () {
    const store = useStore()
    const router = useRouter()
    const { loadList, data } = compositionList(api.getCourserList)
    const nowDate = new Date()

    data.pageSize = 100000
    data.query = {
      status: COURSE_STATUS.open,
      startDate: {
        $lte: nowDate.toISOString()
      },
      endDate: {
        $gte: nowDate.toISOString()
      },
      teacherId: store.state.oauth.userid,
      day: new Date().getDay()
    }

    function onTap (info: ICourse) {
      console.log(info)
      if (!info._id) {
        return
      }
      router.push({
        name: 'CourseDetail',
        params: {
          id: info._id
        }
      })
    }

    function getStudent (info: ICourse) {
      const total = (info.studentIds && info.studentIds.length) + (info.trialStudentIds && info.trialStudentIds.length)
      return `${total}位学生`
    }
    return { ...toRefs(data), loadList, onTap, getStudent }
  }
})
</script>
<style lang="scss" scoped>
</style>
