<template>
  <div>
    <van-notice-bar
      left-icon="volume-o"
      text="杨瑾美术推出年终钜惠学习礼包"
    />
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadList"
    >

      <van-card
        v-for="item in list" :key="item.id"
        :num="item.count"
        @click="onTap(item)"
        tag="标签"
        :price="item.amount"
        :desc="item.desc"
        :title="item.name"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        :origin-price="item.amount"
      />
    </van-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { compositionList } from '@root/common/composition/list'
import * as api from '@root/common/api/package'
import { List, Card, NoticeBar } from 'vant'
import { IPackage } from '@root/common/const/type/package'
import { useRouter } from 'vue-router'
import { PackageStatus } from '@root/common/const/enum'
export default defineComponent({
  name: 'shop',

  components: {
    [List.name]: List,
    [NoticeBar.name]: NoticeBar,
    [Card.name]: Card
  },

  setup () {
    const router = useRouter()
    const { loadList, data } = compositionList(api.getPackageList)
    data.query = {
      status: PackageStatus.UpTrial
    }
    function onTap (info: IPackage) {
      console.log(info)
      if (!info._id) {
        return
      }
      router.push({
        name: 'Good',
        params: {
          id: info._id
        }
      })
    }
    return { ...toRefs(data), loadList, onTap }
  }
})
</script>
<style lang="scss" scoped>
</style>
