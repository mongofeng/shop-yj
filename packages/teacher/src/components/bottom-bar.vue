<template>
  <div>
    <van-tabbar route>
      <van-tabbar-item replace to="/shop" icon="home-o"> 课包商城 </van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="friends-o"> 个人 </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Tabbar, TabbarItem } from 'vant'

export default defineComponent({
  name: 'Bar',

  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  setup () {
    return { }
  }
})
</script>
