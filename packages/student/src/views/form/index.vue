<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="data.name"
        name="name"
        label="姓名"
        placeholder="请填写学生姓名"
      />

      <van-field
        readonly
        clickable
        name="birthday"
        :value="data.birthday"
        label="生日"
        placeholder="请填写生日"
        @click="showCalendar = true"
      />
      <van-calendar v-model="showCalendar" @confirm="onConfirm" />

      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="data.sex" direction="horizontal">
            <van-radio :name="1">男</van-radio>
            <van-radio :name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model="data.contacts"
        name="contacts"
        label="联系人"
        placeholder="请填写联系人"
      />

      <!-- 输入手机号，调起手机号键盘 -->
      <van-field
        v-model="data.phone"
        type="tel"
        label="手机号"
        name="phone"
        placeholder="请填写手机号"
      />

      <van-field
        readonly
        clickable
        name="area"
        :value="address"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model:show="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onAreaConfirm"
          @cancel="showArea = false"
        />
      </van-popup>

      <van-field
        v-model="data.address"
        name="address"
        label="地址"
        placeholder="请填写地址"
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
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import {
  Button,
  Form,
  Field,
  Toast,
  Calendar,
  RadioGroup,
  Radio,
  Popup,
  Area
} from 'vant'
import * as api from '@root/common/api/trial-student'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { IStudent } from '@root/common/const/type/student'
import * as enums from '@root/common/const/enum'
import arealist from '@root/common/data/area'
import dayjs from 'dayjs'
export default defineComponent({
  name: 'Form',

  components: {
    [Button.name]: Button,
    [Calendar.name]: Calendar,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [Form.name]: Form,
    [Field.name]: Field
  },

  setup () {
    const store = useStore()
    const router = useRouter()

    const route = useRoute()

    const loading = ref(false)

    const showCalendar = ref(false)
    const showArea = ref(false)

    console.log(store.state.oauth.openid)
    const areaList = reactive(arealist)
    const address = ref('')
    const data = reactive<IStudent>({
      _id: '',
      name: '',
      phone: '',
      birthday: '',
      sex: enums.ESEX.man,
      age: 0,
      contacts: '',
      province: '',
      city: '',
      region: '',
      address: '',
      status: enums.STUDENT_STATUS.Review,
      desc: '学员自动填写',
      isSendTemplate: false
    })

    function onConfirm (date: Date) {
      data.birthday = dayjs(date).format('YYYY-MM-DD')
      showCalendar.value = false
    }

    const obj = [
      (name: string) => {
        data.province = name
      },
      (name: string) => {
        data.city = name
      },
      (name: string) => {
        data.region = name
      }
    ]

    function onAreaConfirm (values: any[]) {
      address.value = values
        .filter((item) => !!item)
        .map((item, i) => {
          if (obj[i] && typeof obj[i] === 'function') {
            obj[i](item.name)
          }
          return item.name
        })
        .join('/')
      showArea.value = false
    }

    async function onSubmit (values: any) {
      if (loading.value) {
        return
      }
      console.log('submit', values)
      if (!values.name) {
        Toast('请填写用户名')
        return
      }
      if (!values.phone) {
        Toast('请填写手机号')
        return
      }
      if (!values.age) {
        Toast('请填写小朋友的年龄')
      }
      loading.value = true
      try {
        const {
          data: { data }
        } = await api.addTrialStudent({
          ...values,
          openId: store.state.oauth.openid
        })
        loading.value = false
        if (route.query && route.query.routeName === 'Pay') {
          router.replace({
            name: 'Pay',
            query: {
              ...route.query,
              studentId: data._id
            }
          })
        } else {
          router.back()
        }
      } catch (error) {
        loading.value = false
      }
    }
    return {
      data,
      loading,
      address,
      showArea,
      showCalendar,
      onAreaConfirm,
      onSubmit,
      areaList,
      onConfirm
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
