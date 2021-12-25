<template>
    <div class="container">
        设置
    </div>
</template>
<script lang="ts">
    import {reactive, toRefs} from 'vue'
    export default {
        name: 'App',
        setup() {
            const data = reactive({

            })

            return {
                ...toRefs(data)
            }
        }
    }
</script>
<style lang="less">
</style>