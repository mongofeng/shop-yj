<template>
  <div>
    <van-loading size="24px" vertical v-if="loading">加载中...</van-loading>
    <Message type="error" :msg="info" v-if="showError"></Message>
  </div>

</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Loading } from 'vant'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Auth',

  components: {
    [Loading.name]: Loading
  },

  setup () {
    const store = useStore()
    const router = useRouter()

    const showError = ref(false)
    const loading = ref(true)
    const info = ref('')

    onMounted(async () => {
      try {
        const ret = await store.dispatch('oauth/fetchOpenId')
        loading.value = false
        console.log(ret)
        if (ret) { // 跳转
          router.replace('good')
        } else {
          showError.value = true
          info.value = '当前没有code,请在微信中打开'
        }
      } catch (err) {
        loading.value = false
        showError.value = true
        info.value = '接口出错,请稍后重试'
      }
    })

    return { showError, loading, info }
  }
})
</script>
