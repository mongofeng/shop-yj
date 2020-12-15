<template>
  <div>
    <van-empty
      image="error"
      description="暂无数据"
      v-if="!all.trialStudent.length"
    />
    <van-cell-group>
      <van-cell :title="i.name" v-for="i of all.trialStudent" :key="i.id" />
    </van-cell-group>
  </div>
</template>
<script lang="ts">
import { getTrialStudentList } from '@root/common/api/trial-student'

import { TrialStudent } from '@root/common/const/type/trial-student'
import { Cell, CellGroup, Empty } from 'vant'
import { defineComponent, reactive, watch } from 'vue'
export default defineComponent({
  name: 'TrialStudent',
  props: {
    ids: {
      type: Array
    }
  },

  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Empty.name]: Empty
  },

  setup (props) {
    const all = reactive<{
      trialStudent: TrialStudent[];
    }>({
      trialStudent: []
    })

    // 试用学员
    async function fetchTrialStudent (ids: string[]) {
      if (!ids.length) {
        return
      }
      const {
        data: {
          data: { list }
        }
      } = await getTrialStudentList({
        page: 1,
        limit: ids.length,
        query: {
          _id: {
            $in: ids
          }
        },
        sort: {
          createDate: -1
        }
      })

      all.trialStudent = list
    }

    // fetch the user information when params change
    watch(
      () => props.ids,
      async (newParams: any) => {
        return fetchTrialStudent(newParams.ids)
      },
      {
        immediate: true
      }
    )

    return { all }
  }
})
</script>
<style lang="scss" scoped>
</style>
