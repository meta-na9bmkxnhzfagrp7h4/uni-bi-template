import http from '../index'

const getDeviceNodeList = () => {
    return http({
        url: '/getDeviceNodeList',
        method: 'GET'
    })
}

const getCalculateRolueList = () => {
    return http({
        url: '/getCalculateRolueList',
        method: 'GET'
    })
}

const getPredictionResult = (data: any) => {
    return http({
        url: '/getPredictionResult',
        method: 'POST',
        data: data
    })
}

export {
    getDeviceNodeList,
    getCalculateRolueList,
    getPredictionResult
}