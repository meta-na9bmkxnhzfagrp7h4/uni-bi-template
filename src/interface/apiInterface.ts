interface DeviceNode {
    nodeId: number,
    nodeName: string
}

interface CalculateRoule {
    rolueId: number,
    rolueName: string
}

interface TableData {
    item: string,
    predictionData: number,
    trueData: number
}

interface TableRenderData {
    item: string,
    type: string,
    value: number
}

export {
    DeviceNode,
    CalculateRoule,
    TableData,
    TableRenderData
}