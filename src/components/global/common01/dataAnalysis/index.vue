<template>
  <div class="common01-report">
    <div class="report-wrap common01-border">
       <div class="common01-title">{{viewAttr.header || '舆情分析'}}</div>
       <div class="geographical-distribution chart-box">
          <chart :options="geoOpt" :autoResize="true"></chart>
        </div>
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import 'echarts-wordcloud'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
export default {
  name: 'dataAnalysis',
  components: {
    chart: echarts
  },
  data () {
    return {
      proportion: 1
    }
  },
  created () {
  },
  computed: {
    geoOpt () {
      return {
        color: ['#4da2fe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: this.proportion * 30,
          right: this.proportion * 60,
          top: this.proportion * 80,
          bottom: this.proportion * 15,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              show: true,
              margin: 15,
              textStyle: {
                color: '#fff',
                fontSize: 30 // 更改坐标轴文字大小
              }
            },
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            data: ['江苏', '江苏', '江苏', '江苏', '江苏', '江苏', '江苏']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              interval: 1,
              margin: 15,
              textStyle: {
                fontSize: 30,
                color: '#fff'
              }
            },
            axisTick: {
              show: false,
              // interval:15,
              alignWithLabel: true
            },
            color: '#fff',
            axisLine: {
              lineStyle: {
              // show:false,
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            // max: 100,
            splitLine: {
              // interval:15,
              lineStyle: {
                color: ['rgba(113,164,242,0.1)'],
                width: '1',
                type: 'solid'
              }
            }
          }
        ],
        series: [
          {
            name: '地域分布',
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: 'top',
                  //   formatter: '{c}%',
                  color: '#ffffff'
                },
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 1, color: '#0066FF' },
                    { offset: 0, color: '#18BBFF' }
                  ]
                )
              }
            },
            data: [600, 500, 400, 350, 390, 330, 220]
          }
        ]
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-report {
  width: 100%;
  height: 100%;
  padding: pxrem(30px);
  .report-wrap{
      padding: pxrem(100px);
     .chart-box {
        position: relative;
        width: 60%;
        height: 60%;
        padding: 1% 0 0 1%;
        .echarts {
            width: 100%;
            height: 100%;
        }
     }
  }
}
</style>
