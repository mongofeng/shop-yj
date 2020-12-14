import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default function oauthWechat (name: string) {
  const store = useStore()
  const router = useRouter()

  const showError = ref(false)
  const loading = ref(true)
  const info = ref('')

  onMounted(async () => {
    try {
      const ret = await store.dispatch('oauth/fetchOpenId')

      console.log(ret)
      const {
        message,
        state
      } = await store.dispatch('oauth/fetchUserId')
      loading.value = false
      if (state) {
        router.push({
          name: name
        })
      } else {
        showError.value = true
        info.value = message
      }
    } catch (err) {
      loading.value = false
      showError.value = true
      info.value = '接口出错,请稍后重试'
    }
  })

  return { showError, loading, info }
}
