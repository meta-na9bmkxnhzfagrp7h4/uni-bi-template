<template>
    <div class="con" id="c1"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, watch} from 'vue';
import { Chart } from '@antv/g2'
import { TableData, TableRenderData } from '@/interface/apiInterface'

export default defineComponent({
    name: 'HelloWorld',
    props: {
        sourceData: Array as  PropType<Array<TableData>>
    },
    setup(props) {
        let chart : Chart
        let renderTable = () => {
            chart = new Chart({
                container: 'c1',
                // width: 30 * data.length,
                // height: 500,
                autoFit: true,
                limitInPlot: true,
            });

            const { sourceData } = props

            chart.data(transfromData(sourceData!));
                    
            chart.scale({
                item: {
                    nice:true
                },
                value: {
                    min: -50,
                    max: 200
                },
            });



            chart.tooltip({
                showCrosshairs: true,
                shared: true,
            });


            chart
                .line()
                .position('item*value')
                .color('type')
                .label('smooth')
                .animate({
                    appear: {
                        animation: 'fade-in', // 动画名称
                        easing: 'easeQuadIn', // 动画缓动效果
                        delay: 100, // 动画延迟执行时间
                        duration: 600 // 动画执行时间
                    },
                    enter: {
                        animation: 'clipIn', // 动画名称
                        // easing: 'easeQuadIn', // 动画缓动效果
                        delay: 100, // 动画延迟执行时间
                        duration: 600 // 动画执行时间
                    },
                })
                .shape('smooth');

            chart
                .point()
                .position('item*value')
                .color('type')
                .label('circle');

            chart.interaction('brush');

            chart.annotation().line({
                top: true,
                start: ['2021/12/15', -50],
                end: ['2021/12/15', 300],
                style: {
                    stroke: '#595959',
                    lineWidth: 1,
                    lineDash: [3, 3],
                },
                text: {
                position: 'start',
                style: {
                    fill: '#8c8c8c',
                    fontSize: 12,
                    fontWeight: 300,
                },
                content: '历史数据分割线',
                offsetY: -600,
                },
            });
            chart.option('scrollbar', {
                type: 'horizontal',
            });
            chart.interaction('element-visible-filter');
            chart.interaction('plot-mousewheel-scroll', {
                start: [
                { trigger: 'plot:mousewheel', action: 'mousewheel-scroll:scroll', arg: { wheelDelta: 5 } },
                ],
            });


            chart.render();
            // chart.getCanvas().on('mousewheel', (ev: Event) => {ev.preventDefault();})

        }

        let transfromData = (dataList: Array<TableData>): Array<TableRenderData> => {
            let fin = [] as Array<TableRenderData>
            dataList.forEach(item => {
                if (item.predictionData) {
                    fin.push({
                        item: item.item,
                        type: 'predictionData',
                        value: item.predictionData
                    })
                }
                if (item.trueData) {
                    fin.push({
                        item: item.item,
                        type: 'trueData',
                        value: item.trueData
                    })
                }
            })

            return fin
        }

        watch(() => props.sourceData, (val) => {
            chart.changeData(transfromData(val!))
        })


        onMounted(() => {
            renderTable()
            const e = document.createEvent('Event')
            e.initEvent('resize', true, true)
            window.dispatchEvent(e)

            })
        }
    });
</script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    .con {
        width: 100%;
        height: 100%;
        padding: 50px;
        overflow: scroll;
    }
</style>
