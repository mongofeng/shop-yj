<template>
  <div>
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
import { List, Card } from 'vant'
import { IPackage } from '@root/common/const/type/package'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'shop',

  components: {
    [List.name]: List,
    [Card.name]: Card
  },

  setup () {
    const router = useRouter()
    const { loadList, data } = compositionList(api.getPackageList)
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
