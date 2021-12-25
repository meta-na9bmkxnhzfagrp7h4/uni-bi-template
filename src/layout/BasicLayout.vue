<template>
    <a-layout class="layout">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" >
            <ApiFilled />
            <span v-show="!collapsed">用电量负荷预算</span>
        </div>
        <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
            <a-menu-item v-for="(menu, index) in menuData" :key="index" @click="goPage(menu.path)">
                <!-- <UserOutlined/> -->
                <component :is="menu.meta?.icon"></component>
                <span>{{ menu.meta?.title }}</span>
            </a-menu-item>
        </a-menu>
        </a-layout-sider>
        <a-layout>
        <a-layout-header class="layout-header" style="background: #fff; padding: 0">
            <div>
                    <menu-unfold-outlined
                        v-if="collapsed"
                        class="trigger"
                        @click="() => (collapsed = !collapsed)"
                        style="margin-left: 24px;"
                    />
                    <menu-fold-outlined style="margin-left: 24px;" v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        
            </div>
            <div style="margin-right:24px;cursor: pointer;">
                <div @click="logout"><span>退出登录</span></div>
            </div>
        </a-layout-header>
        <a-layout-content >
            <router-view></router-view>
        </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
import {
    CreditCardOutlined,
    SearchOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ApiFilled,
    EyeOutlined
} from '@ant-design/icons-vue';
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import routeData from './../router/router'

export default defineComponent({
    components: {
        CreditCardOutlined,
        SearchOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        ApiFilled,
        EyeOutlined
    },
    setup() {
        let data = reactive({
            menuData: routeData,
            selectedKeys: [0],
            collapsed: false
        })

        let router = useRouter()

        let goPage = (path: string) => {
            router.push(path)
        }

        let logout = () => {
            localStorage.removeItem('token')
            router.push('/login')
        }

        data.menuData = data.menuData.filter(item => {
            return item.meta?.isMenu
        })


        return {
            ...toRefs(data),
            goPage,
            logout
        };
    },
});
</script>
<style lang="less" scoped>
.layout {
    width: 100vw;
    height: 100vh;
}
.layout-header {
    display: flex;
    align-items: center;
    padding-left: 24px;
    justify-content: space-between;
}
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}

.logo {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        color: white;
        font-size: 18px;
        margin-left: 8px;
    }
}
</style>
