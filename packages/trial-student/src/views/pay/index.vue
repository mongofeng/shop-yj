<template>
  <div class="weui-form-preview pay">
    <div class="weui-form-preview__hd">
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">付款金额</label>
        <em class="weui-form-preview__value">¥{{price}}</em>
      </div>
    </div>
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">商品</label>
        <span class="weui-form-preview__value">{{name}}</span>
      </div>
    </div>
    <div class="weui-form-preview__ft">

      <button  class="weui-btn  weui-btn_primary" :class="{'weui-btn_loading': loading}" @click="toPay" >
        <span v-if="loading" class="weui-primary-loading weui-primary-loading_transparent"><i class="weui-primary-loading__dot"></i></span>
        支付{{loading ? '中...' : ''}}
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Toast } from 'vant'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { addOrder } from '@root/common/api/pay'
import { wxPay, WxPayResponse } from '@root/common/utils/wx-pay'
export default defineComponent({
  name: 'pay',

  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const loading = ref(false)

    const price = ref(route.query.price)
    const name = ref(route.query.name)

    const payRequest = reactive({
      appId: '', // 公众号名称，由商户传入
      timeStamp: '', // 时间戳，自1970年以来的秒数
      nonceStr: '', // 随机串
      package: '',
      signType: 'MD5', // 微信签名方式：
      paySign: '', // 微信签名
      isFetchOrder: true
    })

    async function gotToPay () {
      const ret = await wxPay(payRequest)

      if (ret === WxPayResponse.ok) {
        payRequest.isFetchOrder = true
        Toast('支付成功')
        router.replace({
          name: 'Shop'
        })
      } else if (ret === WxPayResponse.cancel) {
        payRequest.isFetchOrder = false
        Toast('支付过程中用户取消')
      } else if (ret === WxPayResponse.fail) {
        payRequest.isFetchOrder = true
        Toast('支付失败')
      } else {
        payRequest.isFetchOrder = true
        Toast('未知异常')
      }
    }

    async function getPreOrder () {
      const {
        orderId,
        studentId
      } = route.query
      try {
        const { data: { data } } = await addOrder({
          openid: store.state.oauth.openid,
          packageId: orderId as string,
          studentId: studentId as string
        })
        payRequest.appId = data.appId
        payRequest.timeStamp = data.timeStamp
        payRequest.nonceStr = data.nonceStr
        payRequest.package = data.package
        payRequest.signType = data.signType
        payRequest.paySign = data.paySign
        // 不要去获取接口
        payRequest.isFetchOrder = false
      } catch (error) {
        Toast('生成预订单接口出错')
        throw new Error('生成预订单接口出错')
      }
    }

    async function toPay () {
      const {
        orderId,
        studentId
      } = route.query

      if (!store.state.oauth.openid) {
        Toast('没有openid')
        return
      }

      if (!orderId) {
        Toast('没有订单信息')
        return
      }

      if (!studentId) {
        Toast('没有学生信息')
        return
      }
      if (loading.value) {
        return
      }
      loading.value = true
      try {
        if (payRequest.isFetchOrder) { // 是否去调用订单
          await getPreOrder()
        }

        await gotToPay()
        loading.value = false
      } catch (error) {
        loading.value = false
      }
    }
    return { toPay, ...toRefs(payRequest), loading, price, name }
  }
})
</script>
<style lang="scss" scoped>
.pay {
  padding: 18px;
}
</style>
