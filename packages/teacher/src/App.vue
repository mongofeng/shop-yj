<template>
  <div>
    <van-loading size="24px" vertical v-if="loading">加载中...</van-loading>
    <Message type="error" :msg="info" v-if="showError"></Message>
    <router-view/>
    <router-view  name="bar"></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import oauthWechat from '@root/common/composition/oauth'
import { Loading } from 'vant'

export default defineComponent({
  name: 'Main',

  components: {
    [Loading.name]: Loading
  },

  setup () {
    const { showError, loading, info } = oauthWechat('CourseList')
    return { showError, loading, info }
  }
})
</script>
