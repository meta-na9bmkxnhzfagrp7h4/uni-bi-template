<template>
    <a-layout class="container">
        <router-view></router-view>
    </a-layout>
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
<style lang="less" scoped>
</style>