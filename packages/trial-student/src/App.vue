<template>
  <router-view/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers, useStore } from 'vuex'
const { mapState } = createNamespacedHelpers('oauth') // specific module name
export default defineComponent({
  name: 'Main',

  setup () {
    const store = useStore()

    // const { fetch } = useActions(['fetch']);
    // const { article, comments } = useState(['article', 'comments']);
    // return {
    //     // both are computed compositions for to the store
    //     article,
    //     comments
    // }
    console.log(store.state.oauth.openid)
    return { }
  }
})
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
