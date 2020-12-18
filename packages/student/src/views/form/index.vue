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
        v-model="data.birthday"
        label="出生年月"
        placeholder="请填写出生年月"
        @click="showPicker = true"
      />

      <van-popup v-model:show="showPicker" position="bottom">
        <van-datetime-picker
          :visible-item-count="50"
          type="date"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

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
        v-model="address"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model:show="showArea" position="bottom">
        <van-area
          value="440606"
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
import { defineComponent, reactive, ref } from 'vue'
import {
  Button,
  Form,
  Field,
  Toast,
  Calendar,
  RadioGroup,
  Radio,
  Popup,
  Area,
  DatetimePicker
} from 'vant'
import * as api from '@root/common/api/student'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
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
    [DatetimePicker.name]: DatetimePicker,
    [Field.name]: Field
  },

  setup () {
    const store = useStore()
    const router = useRouter()

    const loading = ref(false)

    const showPicker = ref(false)
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
      console.log(date)
      showPicker.value = false
    }

    const validate: {
      [key in string]: string
    } = {
      name: '请填写姓名',
      phone: '请填写手机号码',
      birthday: '请选择出生年月',
      contacts: '请填写联系人',
      province: '请选择省市区',
      address: '请填写详细地址'
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

      for (const key in validate) {
        if (key in data && !(data as any)[key]) {
          Toast(validate[key])
          return
        }
      }

      if (!store.state.oauth.openid) {
        Toast('请重新登录')
        return
      }
      loading.value = true
      try {
        const {
          data: { data: ret }
        } = await api.addStudent({
          ...data,
          openId: [store.state.oauth.openid]
        })
        // Toast.success('添加成功')
        router.replace({ name: 'Success' })

        loading.value = false
      } catch (error) {
        Toast.fail('添加失败')
        loading.value = false
      }
    }
    return {
      data,
      loading,
      address,
      showArea,
      showPicker,
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
