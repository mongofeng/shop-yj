<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.name }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">课时：{{ goods.count }}</van-col>
        <van-col span="14">课时有效期：{{ goods.period }}年</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template v-slot:title>
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group>

    <!-- <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="sorry">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button>
    </van-goods-action> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem
} from 'vant'
import { useRoute, useRouter } from 'vue-router'
import * as api from '@root/common/api/package'
export default defineComponent({
  name: 'Good',
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  setup (props) {
    const router = useRouter()
    const route = useRoute()

    const goods = reactive({
      name: '课时包',
      price: 0,
      count: 0,
      period: 1,
      thumb: [
        'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
      ]
    })

    const formatPrice = () => {
      return '¥' + goods.price
    }

    const sorry = () => {
      Toast('暂无后续逻辑~')
    }

    const onClickCart = () => {
      router.push('cart')
    }

    // fetch the user information when params change
    watch(
      () => route.params,
      async (newParams) => {
        if (typeof newParams.id === 'string') {
          const { data: { data } } = await api.getPackage(newParams.id)
          goods.name = data.name
          goods.price = data.priceAmount || data.amount
          goods.count = data.count
          goods.period = data.period
        }
      },
      {
        immediate: true
      }
    )

    return { goods, formatPrice, sorry, onClickCart } // 这里返回的任何内容都可以用于组件的其余部分
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
