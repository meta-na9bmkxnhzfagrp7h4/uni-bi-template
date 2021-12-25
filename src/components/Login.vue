<template>
    <div class="container">
        <a-alert :message="errText" type="warning" class="alert-tips" show-icon v-if="isErr" />
        <div class="cal-login-card">
            <div class="cal-login-card-title">
                <span>负荷预测平台</span>
            </div>
            <div class="cal-login-card-small-title">
                <span>欢迎登录负荷预测平台</span>
            </div>
            <div class="cal-login-card-user cal-login-card-input">
                <a-input
                    placeholder="用户名"
                    v-model:value="username"
                >
                    <template #prefix>
                        <user-outlined type="user" />
                    </template>
                </a-input>
            </div>
            <div class="cal-login-card-password cal-login-card-input">
                <a-input-password
                    placeholder="密码"
                    v-model:value="password"
                >
                    <template #prefix>
                        <UnlockOutlined type="unlockOutline" />
                    </template>
                </a-input-password>
            </div>
            <div class="cal-login-card-extra">
                <div>
                    <a-checkbox v-model:checked="remeberPassword"><span>记住密码</span></a-checkbox>
                </div>
                <div class="cal-login-card-extra-remeber"><span>忘记密码?</span></div>
            </div>
            <div class="cal-login-card-login">
                <a-button type="primary" block @click="login">登入</a-button>
            </div>
            <div class="cal-login-card-tips">
                <span>负荷预测平台</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" >
    import { UserOutlined, InfoCircleOutlined, UnlockOutlined } from '@ant-design/icons-vue';
    import  {reactive, toRefs, defineComponent, onMounted } from 'vue'
    import { loginRequest } from '@/api/path/login';
    import { useRouter } from 'vue-router';
    export default defineComponent({
        name: 'App',
        components: {
            UserOutlined,
            InfoCircleOutlined,
            UnlockOutlined
        },
        setup() {
            const data = reactive({
                username: '',
                password: '',
                errText: '',
                isErr: false,
                remeberPassword: true
            })
            let router = useRouter()
            let clearAlert = (time: number) => {
                setTimeout(() => {
                    data.isErr = false
                    data.errText = ''
                }, time)      
            }
            let login = () => {
                if (data.username === '') {
                    data.errText = '用户名不能为空'
                    data.isErr = true
                    clearAlert(2000)
                    return
                }
                if (data.password === '') {
                    data.errText = '密码不能为空'
                    data.isErr = true
                    clearAlert(2000)
                    return
                }

                onMounted(() => {
                    let remeberPwd = localStorage.getItem('pwd')
                    if (remeberPwd) {
                        let userInfo = JSON.parse(remeberPwd)
                        data.username = userInfo.username
                        data.password = userInfo.password
                    }
                })

                loginRequest({
                    username: data.username,
                    password: data.password
                }).then((res: any) => {
                    if (res.code === 200) {
                        localStorage.setItem('pwd', JSON.stringify({username: data.username, password: data.password}))
                        localStorage.setItem('token', res.data.token)
                        router.push('/home')
                    } else {
                        data.errText = res.msg
                        data.isErr = true
                        clearAlert(2000)
                    }
                })
            }
            return {
                ...toRefs(data),
                login
            }
        }
    })
</script>
<style lang="less" scoped>
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Exo", sans-serif;
    color: #fff;
    background: linear-gradient(-45deg, #ee7752, #D65DB1, #23a6d5, #00C9A7);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
    text-align: center;


    @keyframes gradientBG {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .alert-tips{
        position: absolute;
        top:20%
    }
    .cal-login-card {
        width: 450px;
        height: 380px;
        background: white;
        border-radius: 30px;
        box-shadow: 0px 0px 10px rgb(0 0 0 / 31%);
        display: flex;
        flex-direction: column;
        padding: 20px;

        .cal-login-card-title {
            font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
            margin-top: 25px;
            font-weight: 400;
            font-size: 28px;
            color: black;
        }

        .cal-login-card-small-title {
            font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
            margin-top: 5px;
            margin-bottom: 20px;
            font-size: 14px;
            color: #BCBCBC;
        }

        .cal-login-card-password {
            font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
            margin-top: 15px;
            margin-bottom: 5px;
            font-size: 14px;
            color: #BCBCBC;
        }
        .cal-login-card-input {
            margin-left: 20px;
            margin-right: 20px;
            
            .ant-input {
                height: 30px;
            }
        }
        .cal-login-card-extra {
            display: flex;
            padding-left: 20px;
            padding-right: 20px;
            justify-content: space-between;

            .cal-login-card-extra-remeber {
                span {
                    color: #AAAAAA;
                    cursor: pointer;
                }
            }
        }

        .cal-login-card-login {
            margin-top: 30px;
            margin-left: 20px;
            margin-right: 20px;

            .ant-btn {
                height: 40px;
                border-radius: 5px;
            }
        }

        .cal-login-card-tips {

            margin-top: 20px;

            span {
                color: #6b6b6b;
                font-weight: 400;
                font-size: 12px;
            }
        }
    }
}


</style>