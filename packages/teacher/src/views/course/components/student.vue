<template>
 <div>
   <!-- 通用错误 -->
  <van-empty image="error" description="暂无数据"  v-if="!all.student.length"/>
  <van-cell-group v-else>
    <van-cell :title="i.name"  v-for="i of all.student" :key="i.id"/>
  </van-cell-group>
 </div>
</template>
<script lang="ts">
import { getStudentList } from '@root/common/api/student'
import { IStudent } from '@root/common/const/type/student'
import { Cell, CellGroup, Empty } from 'vant'
import { defineComponent, reactive, watch } from 'vue'
export default defineComponent({
  name: 'Student',
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
      student: IStudent[];

    }>({
      student: []
    })

    // 正式学员
    async function fetchStudent (ids: string[]) {
      if (!ids.length) {
        return
      }
      const {
        data: {
          data: { list }
        }
      } = await getStudentList({
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

      all.student = list
    }

    // fetch the user information when params change
    watch(
      () => props.ids,
      async (newParams: any) => {
        return fetchStudent(newParams.ids)
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
