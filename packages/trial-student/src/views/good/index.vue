<template>
  <div class="goods">
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
      @cancel="onCancel"
    />

    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.name }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">课时：{{ goods.count }}</van-col>
        <van-col span="14">课时有效期：{{ goods.period }}月</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="分享" icon="shop-o" is-link @click="onShow">
        <!-- <template v-slot:title>
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>-->
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>

    <!-- <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group> -->

    <div style="margin: 16px">
      <van-button round block type="primary" :disabled="loading" @click="buy">购买</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, onMounted } from 'vue'
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  Button,
  ActionSheet
} from 'vant'
import { useRoute, useRouter } from 'vue-router'
import * as api from '@root/common/api/package'
import * as trial from '@root/common/api/trial-student'
import { useStore } from 'vuex'
import { getTrialStudentPackageList } from '@root/common/api/trial-student-package'
import wx from 'wx-jdk'
import { jsTicket } from '@root/common/api/wechat'
export default defineComponent({
  name: 'Good',
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const loading = ref(false)

    const {
      VUE_APP_BASE_HOST,
      VUE_APP_BASE_URL
    } = process.env
    const path = `${VUE_APP_BASE_HOST}${VUE_APP_BASE_URL}`

    const goods = reactive({
      name: '网络错误，请不要购买',
      price: 0,
      count: 0,
      period: 1,
      id: '',
      thumb: [
        `${path}static-imag/banner.png`
      ]
    })

    const formatPrice = () => {
      return '¥' + goods.price
    }

    const sorry = () => {
      // Toast('暂无后续逻辑~')
      // wx.getLocation({
      //   type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //   success: (res: any) => {
      //     // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //     // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //     // var speed = res.speed; // 速度，以米/每秒计
      //     // var accuracy = res.accuracy; // 位置精度
      //     alert(JSON.stringify(res))
      //   }
      // })

      wx.openLocation({
        latitude: 22.958388, // 纬度，浮点数，范围为90 ~ -90
        longitude: 113.084940, // 经度，浮点数，范围为180 ~ -180。
        name: '杨瑾美术', // 位置名
        address: '广东省佛山市顺德区乐从镇新马路40号', // 地址详情说明
        scale: 24, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: 'http://baidu.com' // 在查看位置界面底部显示的超链接,可点击跳转
      })
    }

    const onClickCart = () => {
      router.push('cart')
    }

    const show = ref(false)
    const actions = [
      { name: '分享到朋友', value: 'f' },
      { name: '分享到朋友圈', value: 'q' }
    ]
    const onCancel = () => {
      show.value = false
    }

    const onShow = () => {
      show.value = true
    }

    // fetch the user information when params change
    watch(
      () => route.params,
      async newParams => {
        if (typeof newParams.id === 'string') {
          const {
            data: { data }
          } = await api.getPackage(newParams.id)
          goods.name = data.name
          goods.price = data.priceAmount || data.amount
          goods.count = data.count
          goods.period = data.period
          goods.id = newParams.id
        }
      },
      {
        immediate: true
      }
    )

    async function initWx () {
      const url = location.href.split('#')[0]
      // 不能encode妈的
      const {
        data: { data }
      } = await jsTicket({ url: url })
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        jsApiList: [
          'getLocation',
          'openLocation',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'updateAppMessageShareData',
          'updateTimelineShareData'
        ]
      })
      wx.ready(() => {
        console.log('any')
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      })
      wx.error((res: any) => {
        console.log(res)
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    }

    onMounted(() => initWx())

    async function buy () {
      if (!store.state.oauth.openid) {
        Toast('没有openid')
        return
      }

      if (!store.state.oauth.isTrial) {
        Toast('不好意思，查询到微信正式学员，暂时没法购买，请联系管理员')
        return
      }

      try {
        // 查询是否已经登记了正式学员的身份
        const {
          data: {
            data: { list }
          }
        } = await trial.getTrialStudentList({
          page: 1,
          limit: 50,
          query: {
            openId: store.state.oauth.openid
          }
        })

        if (list && list.length) {
          // 去购买
          const {
            data: {
              data: { list: packages }
            }
          } = await getTrialStudentPackageList({
            page: 1,
            limit: 50,
            query: {
              studentId: list[0].id
            }
          })

          if (packages.length) {
            Toast('查询已经购买过体验包')
            return
          }
          // 购买的逻辑
          router.push({
            name: 'Pay',
            query: {
              orderId: goods.id,
              price: goods.price,
              name: goods.name,
              studentId: list[0].id
            }
          })
        } else {
          router.push({
            name: 'Form',
            query: {
              orderId: goods.id,
              price: goods.price,
              name: goods.name,
              routeName: 'Pay'
            }
          })
        }
      } catch (error) {
        Toast('查询学生信息出错')
      }
    }

    const title = '杨瑾美术新生钜惠'
    const desc = '联合新生课包只需499元'

    const link = path + 'share?id=' + route.params.id
    console.log(path)
    const imgUrl = `${path}static-imag/logo.png`

    function onMenuShareAppMessage () {
      wx.updateAppMessageShareData({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: () => {
          // 设置成功
          Toast('请点击右上角分享给好友')
        }
      })
    }

    function onMenuShareTimeline () {
      wx.updateTimelineShareData({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: () => {
          // 设置成功
          Toast('请点击右上角分享给好友圈')
        }
      })
    }

    const onSelect = (item: { value: string }) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // show.value = false;
      if (item.value === 'f') {
        onMenuShareAppMessage()
      } else {
        onMenuShareTimeline()
      }
    }

    return {
      show,
      actions,
      onSelect,
      onCancel,
      goods,
      formatPrice,
      sorry,
      onClickCart,
      loading,
      buy,
      onMenuShareTimeline,
      onShow,
      onMenuShareAppMessage
    } // 这里返回的任何内容都可以用于组件的其余部分
  }
})
</script>
<style lang="scss">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
