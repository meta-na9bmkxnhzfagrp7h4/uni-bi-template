<template>
    <div class="container">
        宏观预测
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