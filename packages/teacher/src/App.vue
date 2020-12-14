<template>
  <div>
    <van-loading size="24px" vertical v-if="loading">加载中...</van-loading>
    <Message type="error" :msg="info" v-if="showError"></Message>
    <router-view/>
    <router-view class="view two" name="bar"></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import oauthWechat from '@root/common/composition/oauth'

export default defineComponent({
  name: 'Main',

  setup () {
    const { showError, loading, info } = oauthWechat('Shop')
    return { showError, loading, info }
  }
})
</script>
