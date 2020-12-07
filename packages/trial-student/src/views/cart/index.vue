<template>
  <div>
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <van-checkbox
        class="card-goods__item"
        v-for="item in goods"
        :key="item.id"
        :name="item.id"
      >
        <van-card
          :title="item.title"
          :desc="item.desc"
          :num="item.num"
          :price="formatPrice(item.price)"
          :thumb="item.thumb"
        />
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar
      :price="totalPrice"
      :disabled="!checkedGoods || !checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts">
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant'
import { computed, defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'Cart',

  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },

  setup () {
    const data = reactive(
      {
        checkedGoods: ['1', '2', '3'],
        goods: [{
          id: '1',
          title: '进口香蕉',
          desc: '约250g，2根',
          price: 200,
          num: 1,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
        }, {
          id: '2',
          title: '陕西蜜梨',
          desc: '约600g',
          price: 690,
          num: 1,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
        }, {
          id: '3',
          title: '美国伽力果',
          desc: '约680g/3个',
          price: 2680,
          num: 1,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
        }]
      }
    )

    const submitBarText = computed(() => {
      const count = data.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
    })

    const totalPrice = computed(() => data.goods.reduce((total, item) => total + (data.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0))

    function formatPrice (price: number) {
      return (price / 100).toFixed(2)
    }

    function onSubmit () {
      Toast('点击结算')
    }

    const resData = toRefs(data)

    return {
      ...resData,
      formatPrice,
      onSubmit,
      totalPrice,
      submitBarText
    }
  }

})
</script>

<style lang="scss">
.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
  }
}
</style>
