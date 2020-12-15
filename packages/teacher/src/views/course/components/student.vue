<template>
 <div>
   <van-popup
      v-model:show="show"
      closeable
      position="bottom"
      :style="{ height: '60%' }"
      teleport="body"
    >
      <van-form @submit="onConfirm">
        <van-field name="num" label="课时">
          <template #input>
            <van-stepper v-model="num" />
          </template>
        </van-field>

        <van-field
          v-model="desc"
          name="desc"
          label="备注"
          placeholder="请填写备注"
        />

        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :disabled="loading"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
  <van-empty image="error" description="暂无数据"  v-if="!all.student.length"/>

  <van-cell-group v-else>
    <van-cell :title="i.name"  v-for="i of all.student" :key="i.id"/>
  </van-cell-group>
 </div>
</template>
<script lang="ts">
import { getStudentList } from '@root/common/api/student'
import { IStudent } from '@root/common/const/type/student'
import { ISign } from '@root/common/const/type/student-operation'
import { sign } from '@root/common/api/student-operation'
import {
  Button,
  Cell,
  CellGroup,
  Dialog,
  Empty,
  Field,
  Form,
  Stepper,
  Toast
} from 'vant'
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { getHourrList } from '@root/common/api/hour'
export default defineComponent({
  name: 'Student',
  props: {
    ids: {
      type: Array
    },
    courseId: {
      type: String,
      default: ''
    },
    courseName: {
      type: String,
      default: ''
    }
  },

  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Stepper.name]: Stepper,
    [Form.name]: Form,
    [Field.name]: Field,
    [Empty.name]: Empty
  },

  setup (props) {
    const all = reactive<{
      student: IStudent[];

    }>({
      student: []
    })

    const show = ref(false)
    const loading = ref(false)
    const currentId = ref('')
    const store = useStore()
    const teacherId = store.state.oauth.userid

    const data = reactive({
      num: 0,
      desc: ''
    })

    const showPopup = (id: string) => {
      currentId.value = id
      show.value = true
    }

    async function getRecord () {
      const date = new Date()
      date.setHours(0)
      date.setMinutes(0)
      const { data: { data: { count } } } = await getHourrList({
        page: 1,
        limit: 1,
        query: {
          studentId: currentId.value,
          createDate: {
            $gte: date.toISOString()
          }
        },
        sort: {
          createDate: -1
        }
      })
      return count > 0
    }

    async function onSubmit (values: { num: number; desc: string }) {
      const params: ISign = {
        courseName: props.courseName,
        desc: values.desc,
        num: values.num,
        studentId: currentId.value,
        teacherId: teacherId,
        course: [
          {
            id: props.courseId,
            name: props.courseName,
            count: values.num
          }
        ]
      }

      const { data: { data: result } } = await sign(params)
      const { studentPackage, templateMsg } = result
      const str = (studentPackage.ok === 1 && studentPackage.n !== 0) ? '签到成功,成功扣除课时' : '签到失败,扣除课时失败'
      const total: number = templateMsg.reduce((tatal: number, item: {
          errcode: number;
        }) => {
        return item.errcode === 0 ? tatal + 1 : tatal
      }, 0)
      Toast(`${str}, 成功推送微信消息${total}条`)
    }

    async function onConfirm (values: { num: number; desc: string }) {
      if (loading.value) {
        return
      }

      if (!values.num) {
        Toast('请填写课时')
        return
      }
      if (!teacherId) {
        Toast('没有教师id')
        return
      }
      loading.value = true

      try {
        const ret = await getRecord()
        if (ret) {
          await Dialog.confirm({
            title: '警告',
            message: '该生今天已经有一个签到记录，是否继续签到？'
          })
        }

        await onSubmit(values)
        loading.value = false
      } catch (error) {
        loading.value = false
      }
    }

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

    return {
      ...toRefs(data),
      all,
      show,
      loading,
      onConfirm,
      showPopup
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
