<template>
  <div>
    <van-loading size="24px" vertical v-if="loading">加载中...</van-loading>
    <Message type="error" :msg="info" v-if="showError"></Message>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Loading } from 'vant'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'Share',

  components: {
    [Loading.name]: Loading
  },

  setup () {
    const route = useRoute()

    const showError = ref(false)
    const loading = ref(true)
    const info = ref('')

    onMounted(async () => {
      const { id } = route.query

      if (id) {
        const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6bce565776a81ced&redirect_uri=http%3A%2F%2Fyangjin-art.top%2Ftrial-student%2F&response_type=code&scope=snsapi_userinfo&state=${id}#wechat_redirect`
        location.replace(url)
      } else {
        loading.value = false
        showError.value = true
        info.value = '没有商品id'
      }
    })

    return { showError, loading, info }
  }
})
</script>
