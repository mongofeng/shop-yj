<template>
  <div class="goods">
    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.name }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
    </van-cell-group>

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
import * as api from '@root/common/api/course'

import { useStore } from 'vuex'
import { getTrialStudentPackageList } from '@root/common/api/trial-student-package'
import wx from 'wx-jdk'
import { jsTicket } from '@root/common/api/wechat'
import { ICourse } from '@root/common/const/type/course'
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

    const course = reactive({
      name: '网络错误，请不要购买',
      id: '',
      studentIds: [],
      trialStudentIds: []
    })

    // fetch the user information when params change
    watch(
      () => route.params,
      async newParams => {
        if (typeof newParams.id === 'string') {
          const {
            data: { data }
          } = await api.getCourse(newParams.id)
          course.name = data.name
          course.id = newParams.id
          course.studentIds = data.studentIds as any
          course.trialStudentIds = data.trialStudentIds as any
        }
      },
      {
        immediate: true
      }
    )

    return {

      course,
      loading

    }
  }
})
</script>
<style lang="scss">
.goods {
  padding-bottom: 50px;

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
