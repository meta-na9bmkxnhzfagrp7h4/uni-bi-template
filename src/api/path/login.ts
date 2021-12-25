import http from './../index'

const loginRequest = (data: any) => {
    return http({
        data: data,
        method: 'post',
        url: '/login'
    })
} 

export {
    loginRequest
}