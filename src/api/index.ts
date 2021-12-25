import axios from 'axios'
import { useRouter } from 'vue-router'

const http = axios.create({
    baseURL: '/',
    timeout: 10000
})

http.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers = {
            token: token
        }
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

http.interceptors.response.use(res => {
    if (res.data.code === 205) {
        localStorage.removeItem('token')
        // let router = useRouter()
        // router.push('login')
        window.location.href = '/'
    }
    console.log(res);
    return res.data
}, (error) => {
    return Promise.reject(error)
})

export default http
