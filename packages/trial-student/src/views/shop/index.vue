<template>
  <div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadList"
    >
      <van-cell v-for="item in list" :key="item" :title="item.name" />
    </van-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { compositionList } from '@root/common/composition/list'
import * as api from '@root/common/api/package'
import { List, Cell } from 'vant'
export default defineComponent({
  name: 'shop',

  components: {
    [List.name]: List,
    [Cell.name]: Cell
  },

  setup () {
    const { loadList, data } = compositionList(api.getPackageList)
    return { ...toRefs(data), loadList }
  }
})
</script>
<style lang="scss" scoped>
</style>
