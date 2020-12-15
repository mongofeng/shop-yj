<template>
  <div>
    <van-empty
      image="error"
      description="暂无数据"
      v-if="!all.trialStudent.length"
    />
    <van-popup
      v-model:show="show"
      closeable
      position="bottom"
      :style="{ height: '60%' }"
      teleport="body"
    >
      <van-form @submit="onSubmit">
        <van-field name="num" label="课时">
          <template #input>
            <van-stepper v-model="num" />
          </template>
        </van-field>

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

    <van-cell-group>
      <van-cell
        :title="i.name"
        v-for="i of all.trialStudent"
        :key="i.id"
        is-link
        @click="showPopup(i.id)"
      >
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script lang="ts">
import { getTrialStudentList } from '@root/common/api/trial-student'
import { sign } from '@root/common/api/trial-course-record'
import { TrialCourseSignVo } from '@root/common/const/type/trial-course-record'
import { TrialStudent } from '@root/common/const/type/trial-student'
import { Button, Cell, CellGroup, Empty, Field, Form, Stepper, Toast } from 'vant'
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'TrialStudent',
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
      trialStudent: TrialStudent[];
    }>({
      trialStudent: []
    })

    const show = ref(false)
    const loading = ref(false)
    const currentId = ref('')
    const store = useStore()

    const data = reactive({
      num: 0,
      desc: ''
    })

    const showPopup = (id: string) => {
      currentId.value = id
      show.value = true
    }

    async function onSubmit (values: { num: number; desc: string }) {
      if (loading.value) {
        return
      }
      console.log('submit', values)
      const teacherId = store.state.oauth.userid
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
        const params: TrialCourseSignVo = {
          courseId: props.courseId,
          courseName: props.courseName,
          desc: values.desc,
          num: values.num,
          studentId: currentId.value,
          teacherId: teacherId
        }
        const {
          data: { data: result }
        } = await sign(params)
        const { motify, record, wechatInfo } = result
        if (motify) {
          const total: number = wechatInfo.errcode === 0 ? 1 : 0
          Toast(
            `签到成功,成功扣除课时, 成功推送微信消息${total}条, 课时记录：${record._id}`
          )
        } else {
          Toast('签到失败, 扣除课时失败')
        }
        loading.value = false
      } catch (error) {
        loading.value = false
      }
    }

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

    return {
      ...toRefs(data),
      all,
      show,
      loading,
      onSubmit,
      showPopup
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
