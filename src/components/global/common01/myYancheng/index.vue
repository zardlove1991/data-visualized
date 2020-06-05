<template>
  <div class="common01-report">
    <div class="report-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '我的盐城'}}</div>
      <div class="content-wrap sys-flex">
          <div class="left"></div>
          <div class="center">
              <div class="rank-list"></div>
              <div class="new-user-chart">
                  <div class="chart-box">
                    <chart :options="newuserOpt" :autoResize="true"></chart>
                  </div>
              </div>
          </div>
          <div class="right">
              <div class="right-top sys-flex sys-flex-wrap">
                  <div class="chart-box" style="width:50%;">
                    <chart :options="userfromOpt" :autoResize="true"></chart>
                  </div>
                  <div class="chart-box sys-flex sys-flex-wrap" style="width:50%;">
                    <chart class="percent-chart" :options="percentOpt" :autoResize="true"></chart>
                    <chart class="percent-chart" :options="percentOpt" :autoResize="true"></chart>
                    <chart class="percent-chart" :options="percentOpt" :autoResize="true"></chart>
                    <chart class="percent-chart" :options="percentOpt" :autoResize="true"></chart>
                  </div>
              </div>
              <div class="right-bottom">
                  <div class="chart-box">
                    <chart :options="geoOpt" :autoResize="true"></chart>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDataConfig } from '@/utils/model'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
export default {
  name: 'myyancheng',
  components: {
    chart: echarts
  },
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      dataList: [],
      customSize: false,
      proportion: 1
    }
  },
  computed: {
    newuserOpt () {
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            show: true,
            margin: 15,
            textStyle: {
              color: '#fff',
              fontSize: 15 // 更改坐标轴文字大小
            }
          },
          data: ['06-01', '06-01', '06-01', '06-01', '06-01', '06-01', '06-01']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            margin: 15,
            textStyle: {
              color: '#fff',
              fontSize: 15 // 更改坐标轴文字大小
            }
          },
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
              type: 'dashed'
            }
          }
        },
        series: [{
          data: [100, 200, 400, 200, 590, 330, 120],
          type: 'line',
          areaStyle: {},
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#1CD8D2' // 0% 处的颜色
              }, {
                offset: 1, color: '#ffffff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#ffffff' // 0% 处的颜色
              }, {
                offset: 0.5, color: '#5865FF' // 0% 处的颜色
              }, {
                offset: 1, color: '#ffffff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }]
      }
    },
    geoOpt () {
      return {
        color: ['#4da2fe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // grid: {
        //   left: this.proportion * 15,
        //   right: this.proportion * 15,
        //   top: this.proportion * 15,
        //   bottom: this.proportion * 15,
        //   containLabel: true
        // },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              show: true,
              margin: 10,
              textStyle: {
                color: '#fff',
                fontSize: 15 // 更改坐标轴文字大小
              },
              formatter: function (params) {
                var newParamsName = ''
                var paramsNameNumber = params.length
                var provideNumber = 4 // 一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ''
                    var start = p * provideNumber
                    var end = start + provideNumber
                    if (p === rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                    newParamsName += tempStr
                  }
                } else {
                  newParamsName = params
                }
                return newParamsName
              }
            },
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            data: ['盐城', '盐城', '盐城', '盐城', '盐城', '盐城', '盐城']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              interval: 1,
              margin: 10,
              textStyle: {
                fontSize: 15,
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
    },
    userfromOpt () {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        grid: {
          left: this.proportion * 30,
          right: this.proportion * 60,
          top: this.proportion * 80,
          bottom: this.proportion * 15,
          containLabel: true
        },
        legend: {
          orient: 'vertical',
          left: 100,
          bottom: 10,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '40%'], // 设置饼图位置
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      }
    },
    percentOpt () {
      return {
        title: {
          show: true,
          text: '80%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 25,
            color: 'rgba(0,255,246,1)',
            fontWeight: 'normal'
          }
        },
        color: ['rgb(0,148,240)', 'rgb(15,74,148)'],
        tooltip: {
          trigger: 'item',
          formatter: '{d}%',
          show: false
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          show: false
        },
        series:
        {
          name: '',
          type: 'pie',
          radius: ['70%', '90%'],
          avoidLabelOverlap: true,
          hoverAnimation: false,
          // animationDelay: function (idx) {
          //     // 越往后的数据延迟越大
          //     return idx * 10000;
          // },
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 0.8, name: ''},
            {value: 1 - 0.8, name: ''}
          ]
        }
      }
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-report {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .content-wrap {
      width: 100%;
      height: 100%;
      padding: pxrem(125px) pxrem(45px) pxrem(6
      5px);
      .left{
        width: 20%;
        height: 100%;
      }
      .center{
        width: 30%;
        height: 100%;
        .rank-list{
            height: 60%;
        }
        .new-user-chart{
            height: 40%;
        }
      }
      .right{
        width: 50%;
        height: 100%;
        .right-top{
            height: 60%;
        }
        .right-bottom{
            height: 40%;
        }
      }
      .chart-box{
        width: 100%;
        height: 100%;
        .percent-chart{
            width: 50% !important;
            height: 50% !important;
        }
        .echarts {
            width: 100%;
            height: 100%;
        }
     }
  }
}
</style>
