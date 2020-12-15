<template>
 <div>
   <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadList"
    >

      <van-cell :title="dict.get(i.studentId) || ''"  v-for="i of list" :key="i.id" :value="i.num + '课时'" :label="formateType(i)"/>
    </van-list>
 </div>
</template>
<script lang="ts">
import { getHourrList } from '@root/common/api/hour'
import { getStudentList } from '@root/common/api/student'
import { compositionList } from '@root/common/composition/list'
import { COURSE_HOUR_ACTION_TYPE_LABEL } from '@root/common/const/enum'
import { IHour } from '@root/common/const/type/hour'
import { Cell, List } from 'vant'
import { defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
export default defineComponent({
  name: 'StudentRecordItem',

  props: {
    type: {
      type: String,
      default: 'all'
    }
  },

  components: {
    [List.name]: List,
    [Cell.name]: Cell

  },

  setup (props) {
    const { loadList, data } = compositionList(getHourrList)
    const studentMap = reactive({
      dict: new Map()
    })
    const store = useStore()
    const teacherId = store.state.oauth.userid

    data.query = {
      teacherId: teacherId
    }

    if (props.type === 'today') {
      const date = new Date()
      date.setHours(0)
      date.setMinutes(0)
      data.query = {
        ...data.query,
        createDate: {
          $gte: date.toISOString()
        }
      }
    } else if (props.type === 'month') {
      const date = new Date()
      date.setHours(0)
      date.setMinutes(0)
      date.setDate(1)
      data.query = {
        ...data.query,
        createDate: {
          $gte: date.toISOString()
        }
      }
    }

    watchEffect(async () => {
      const ids = data.list.map((i: IHour) => i.studentId)

      if (!ids.length) { return }

      const { data: { data: { list: result } } } = await getStudentList({
        page: 1,
        limit: ids.length,
        query: {
          _id: { $in: ids }
        },
        sort: {
          createDate: -1
        }
      })
      result.forEach(i => {
        studentMap.dict.set(i._id, i.name)
      })
    })

    function formateType (i: IHour) {
      const time = dayjs(i.createDate).format('YYYY年MM月DD日 HH:mm') // '25/01/2019'
      return COURSE_HOUR_ACTION_TYPE_LABEL[i.type] + ' ' + time
    }

    return { ...toRefs(data), loadList, ...toRefs(studentMap), formateType }
  }
})
</script>
<style lang="scss" scoped>

</style>
