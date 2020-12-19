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
import { RedirectUrl } from '@root/common/utils/redirct'
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
        console.log(process.env)
        const {
          VUE_APP_BASE_HOST,
          VUE_APP_BASE_URL
        } = process.env
        const path = `${VUE_APP_BASE_HOST}${VUE_APP_BASE_URL}`
        const host = encodeURIComponent(path)

        const url = RedirectUrl(host, `${id}`)

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
