import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import BasicLayout from './layout/BasicLayout.vue'
import DefaultLayout from './layout/DefaultLayout.vue'
require('./mock/index')

let vue = createApp(App)

vue.component('basic-layout', BasicLayout)
vue.component('default-layout', DefaultLayout)

vue.use(store)
    .use(router)
    .use(antd)
    .mount('#app')
