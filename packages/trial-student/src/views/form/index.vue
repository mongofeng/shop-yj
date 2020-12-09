<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        name="name"
        label="用户名"
        placeholder="请填写用户名"
      />

      <!-- 允许输入数字，调起带符号的纯数字键盘 -->
      <van-field v-model="age" type="number" label="年龄" name="age"  placeholder="请填写小朋友的年龄"  />

      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="phone" type="tel" label="手机号" name="phone"  placeholder="请填写手机号" />

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit" :disabled="loading">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { Button, Form, Field, Toast } from 'vant'
import * as api from '@root/common/api/trial-student'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'Form',

  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field
  },

  setup () {
    const store = useStore()
    const router = useRouter()

    const route = useRoute()

    const loading = ref(false)

    console.log(store.state.oauth.openid)
    const data = reactive({
      name: '',
      phone: '',
      age: ''
    })
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
        const { data: { data } } = await api.addStudent({
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
      ...toRefs(data),
      loading,
      onSubmit
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
