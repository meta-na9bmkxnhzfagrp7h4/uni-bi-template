import { RouteRecordRaw } from 'vue-router';

const router:Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./../components/Login.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        component:  () => import('./../components/Home.vue'),
        meta: {
            layout: 'basic',
            isMenu: true,
            title: '控制台',
            icon: 'CreditCardOutlined'
        }
    },
    // {
    //     path: '/setting',
    //     name: 'Setting',
    //     component:  () => import('./../components/Setting.vue'),
    //     meta: {
    //         layout: 'basic',
    //         isMenu: true,
    //         title: '数据查询',
    //         icon: 'SearchOutlined'
    //     }
    // },
    // {
    //     path: '/macro',
    //     name: 'Macro',
    //     component:  () => import('./../components/MacroPrediction.vue'),
    //     meta: {
    //         layout: 'basic',
    //         isMenu: true,
    //         title: '宏观预测',
    //         icon: 'EyeOutlined'
    //     }
    // }
]

export default router