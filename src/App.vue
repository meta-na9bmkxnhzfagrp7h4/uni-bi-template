<template>
  <div id="app">
    <component :is="layout">
        <router-view/>
    </component>
  </div>
</template>

<script lang="ts">
  import { computed, reactive, toRefs, defineComponent } from "vue"
import { useRoute } from 'vue-router'
  export default defineComponent({
    name: 'App',
    setup() {
      let data = reactive({
        default_layout: 'default'
      })

      const route = useRoute()

      let layout = computed(() => {
        return (route.meta.layout || data.default_layout) + '-layout'
      })

      return {
        ...toRefs(data),
        layout
      }
    }
  })
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>
