<template>
    <div class="container">
        <div class="home-context">
            <div class="home-context-view">
                <div class="home-context-view-title">
                    <div class="home-context-view-title-screen">
                        <span>起点时间：</span>
                        <a-select
                            v-model:value="selectedDeviceNode"
                            size="small"
                            class="home-context-view-title-screen-rolue"
                            showSearch
                            optionFilterProp="label"
                            @change="getTableData"
                        >
                            <a-select-option 
                                v-for="node in deviceNodeList" 
                                :key="node.nodeId" 
                                :value="node.nodeId"
                                :label="node.nodeName"
                            >
                                <span > {{ node.nodeName }}</span>
                            </a-select-option>
                        </a-select>                       
                        <span>起点时间：</span>
                        <a-date-picker 
                            @ok="getStartTime"
                            showTime
                            size="small"
                            :disabled="!selectedDeviceNode"
                        ></a-date-picker>
                        <span>终点时间：</span>
                        <a-date-picker 
                            @ok="getEndTime"
                            showTime
                            size="small"
                            :disabled="!selectedDeviceNode"
                        ></a-date-picker>
                        <span>预测长度：</span>
                        <a-select 
                            v-model:value="selectedRolueNode"
                            size="small" 
                            class="home-context-view-title-screen-rolue"
                            :disabled="!selectedDeviceNode"
                            showSearch
                            optionFilterProp="label"
                            @change="getTableData"
                        >
                            <a-select-option 
                                v-for="roule in rouleLst" 
                                :key="roule.rolueId" 
                                :value="roule.rolueId"
                                :label="roule.rolueName"
                            >
                                <span > {{ roule.rolueName }}</span>
                            </a-select-option>
                        </a-select>
                    </div>
                    <div class="home-context-view-title-scale">
                        <a-radio-group 
                            v-model:value="timeRolue" 
                            button-style="solid"
                            @change="getTableData"
                        >
                            <a-radio-button value="quarter">15分钟</a-radio-button>
                            <a-radio-button value="day">1天</a-radio-button>
                            <a-radio-button value="week">1周</a-radio-button>
                            <a-radio-button value="month">1月</a-radio-button>
                        </a-radio-group>
                    </div>
                </div>
                <g2-line :source-data="tableData" v-if="tableData.length > 0" class="g2-line"></g2-line>
                <div class="g2-line g2-empty"  v-else>
                    <a-empty description="暂无数据"></a-empty>
                </div>
            </div>
        </div>
        <!-- <div class="home-log">
            <a-row style="height:100%">
                <a-col :span="16">
                    <div class="home-log-system-log"> 
                    </div>
                </a-col>
                <a-col :span="8">
                    <div class="home-log-system-info">111</div>
                </a-col>
            </a-row>
        </div> -->
    </div>
</template>
<script lang="ts">
    import {reactive, toRefs, defineComponent, onMounted} from 'vue'
    import G2Line from './G2/G2Line.vue'
    import { getDeviceNodeList, getCalculateRolueList, getPredictionResult } from '@/api/path/console'
    import { notification } from 'ant-design-vue'
    import { DeviceNode, CalculateRoule, TableData } from '@/interface/apiInterface'
    import { Moment } from 'moment'
    export default defineComponent({
        name: 'App',
        components: {
            G2Line
        },
        setup() {
            const data = reactive({
                timeRolue: 'day',
                deviceNodeList: [] as Array<DeviceNode>,
                selectedDeviceNode: null,
                rouleLst: [] as Array<CalculateRoule>,
                selectedRolueNode: null,
                startTime: 0,
                endTime: 0,
                tableData: [] as Array<TableData>
            })

            let getDeviceList = () => {
                getDeviceNodeList().then((res:any) => {
                    if (res.code === 200) {
                        data.deviceNodeList = res.data
                    } else {
                        notification.error({
                            message: '获取设备节点错误',
                            description: res.msg
                        })
                    }
                })
            }

            let getRolueList = () => {
                getCalculateRolueList().then((res:any) => {
                    if (res.code === 200) {
                        data.rouleLst = res.data
                    } else {
                        notification.error({
                            message: '获取预测长度类型错误',
                            description: res.msg
                        })
                    }
                })
            }

            let getStartTime = (time: Moment) => {
                data.startTime = time.valueOf()
                getTableData()
            }

            let getEndTime = (time: Moment) => {
                data.endTime = time.valueOf()
                getTableData()
            }

            let getTableData = () => {
                if (data.startTime && data.endTime && data.selectedDeviceNode && data.selectedRolueNode) {
                    getPredictionResult({
                        startTime: data.startTime,
                        endTime: data.endTime,
                        nodeId: data.selectedDeviceNode,
                        rolueId: data.selectedRolueNode,
                        scale: data.timeRolue
                    }).then((res:any) => {
                        if (res.code === 200) {
                            data.tableData = res.data
                        } else {
                            notification.error({
                                message: '获取图表数据失败',
                                description: res.msg
                            })
                        }
                    })
                }
            }

            getDeviceList()
            getRolueList()

            return {
                ...toRefs(data),
                getStartTime,
                getEndTime,
                getTableData
            }
        }
    })
</script>
<style lang="less" scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .home-context {
            height: 100%;
            margin: 14px 14px 7px 14px;
            background: #fff;

            .home-context-view {
                .home-context-view-title {
                    padding: 7px;
                    .home-context-view-title-screen {
                        display: flex;
                        span {
                            margin-left: 10px;
                        }

                        .home-context-view-title-screen-rolue {
                            width: 150px;
                        }
                    }
                }
                .home-context-view-title-scale {
                    display: flex;
                    justify-content: end;
                    margin-top: 14px;
                    margin-right: 14px
                }
            }
        }

        .home-log {
            height: 26%;
            margin: 7px 14px 14px 14px;

            .home-log-system-log {
                height: 100%;
                margin-right: 14px;
                background: #fff;
            }

            .home-log-system-info {
                height: 100%;
                background: #fff;
            }
        }
    }
    .g2-line {
        width: 100%;
        height: 85vh;
    }

    .g2-empty {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>