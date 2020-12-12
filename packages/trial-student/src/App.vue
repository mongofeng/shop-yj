<template>
  <div>
    <router-view/>
    <router-view class="view two" name="bar"></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Main',

  setup () {
    return { }
  }
})
</script>
