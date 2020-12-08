<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        label="name"
        placeholder="请填写用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />

      <!-- 允许输入数字，调起带符号的纯数字键盘 -->
      <van-field v-model="age" type="number" label="年龄" name="age" placeholder="请填写小朋友的年龄" :rules="[{ required: true, message: '请填写小朋友的年龄' }]" />

      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="phone" type="tel" label="手机号" name="phone" placeholder="请填写手机号" :rules="[{ required: true, message: '请填写手机号' }]" />

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Button, Form, Field } from 'vant'
export default defineComponent({
  name: 'Form',

  component: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field
  },

  setup () {
    const data = reactive({
      name: '',
      phone: '',
      age: ''
    })
    function onSubmit (values: any) {
      console.log('submit', values)
    }
    return {
      ...toRefs(data),
      onSubmit
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
