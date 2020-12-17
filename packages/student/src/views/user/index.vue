<template>
  <div>
    <!-- <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"> -->
    <!-- <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>
    </van-row> -->

    <!-- <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group> -->

    <van-cell-group>
      <van-cell icon="points" title="学生课时" is-link  to="/student-record"/>
      <van-cell icon="gold-coin-o" title="试课学生课时" is-link to="/trial-student-record"/>
      <!-- <van-cell icon="gift-o" title="我收到的礼物" is-link /> -->
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Row, Col, Icon, Cell, CellGroup } from 'vant'
export default defineComponent({
  name: 'User',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  setup (props) {
    console.log(props) // { user: '' }

    return {} // 这里返回的任何内容都可以用于组件的其余部分
  }
})
</script>
<style lang="scss" scoped>

</style>
