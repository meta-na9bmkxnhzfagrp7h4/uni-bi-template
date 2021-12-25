import Mock from 'mockjs'

const loginData = () => {    
    return {
        code: 200,
        message: 'success',
        data: {
            token: 'testToken'
        }
    }
}

const deviceNodeData = () => {
    return {
        code: 200,
        msg: 'sucess',
        data: [
            {
                nodeId: 123,
                nodeName: '节点名称1'
            },
            {
                nodeId: 234,
                nodeName: '节点名称2'
            }
        ]
    }
}


const RolueData = () => {
    return {
        code: 200,
        msg: 'sucess',
        data: [
            {
                rolueId: 123,
                rolueName: '预测长度名称1'
            },
            {
                rolueId: 234,
                rolueName: '预测长度名称2'
            }
        ]
    }
}

const tableData = () => {
    let dataArray = []

    for(let i = 0;i< 1000;i++) {
        dataArray.push(
            {
                item: '2021/12/' + i,
                predictionData: Math.floor(Math.random()*100 + 1),
                trueData: Math.floor(Math.random()*100 + 1)
            }
        )
    }

    return {
        code: 200,
        msg: 'sucess',
        data: dataArray
    }
}


Mock.mock('/login', loginData)
Mock.mock('/getDeviceNodeList', deviceNodeData)
Mock.mock('/getCalculateRolueList', RolueData)
Mock.mock('/getPredictionResult', tableData)