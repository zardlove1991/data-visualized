<template>
  <div class="common01-report">
    <div class="report-wrap">
      <div class="content-wrap sys-flex">
          <div class="left sys-flex sys-vertical flex-justify-between">
            <div class="left-item" v-for="(item,i) in leftList" :key="i">
              <div class="title-box sys-flex sys-flex-center">
                <p>{{item.name}}</p>
                <img class="title-icon" src="./assets/left_icon.png"/>
              </div>
              <p class="name-text">{{item.num}}</p>
              <img class="split" src="./assets/split.png" alt="">
            </div>
          </div>
          <div class="center">
              <div class="common-title-box">
                <img src="./assets/title.png" alt="">
                <p>部门服务使用总量排行</p>
              </div>
              <div class="rank-list">
                <div class="rank-item sys-flex sys-flex-center animated" v-for="(item,i) in rankList" :key="i" :class="{'flipInX' : item.title}" :style="{'animation-delay' : i/2+'s'}">
                  <div class="rank-num" :class="{'rank-one':i === 0,'rank-two':i === 1,'rank-three':i === 2}">{{i+1}}</div>
                  <div class="rank-title">{{item.title}}</div>
                  <div class="rank-count">{{item.count}}</div>
                </div>
              </div>
              <div class="common-title-box" style="margin-bottom:0;">
                <img src="./assets/title.png" alt="">
                <p>前7天新增用户数</p>
              </div>
              <div class="new-user-chart">
                  <div class="chart-box" style="height:80%;">
                    <chart :options="newuserOpt" :autoResize="true"></chart>
                  </div>
              </div>
          </div>
          <div class="right">
              <div class="right-top sys-flex sys-flex-wrap">
                  <div class="right-top-box" style="width:40%;">
                    <div class="common-title-box">
                      <img src="./assets/title.png" alt="">
                      <p>用户渠道分布</p>
                    </div>
                    <div class="chart-box" style="height:50%;">
                      <chart :options="userfromOpt" :autoResize="true"></chart>
                    </div>
                  </div>
                  <div class="right-top-box" style="width:60%">
                    <div class="common-title-box">
                      <img src="./assets/title.png" alt="">
                      <p>高频服务分布TOP4</p>
                    </div>
                    <div class="chart-box sys-flex sys-flex-wrap" style="height:70%;">
                      <div class="percent-box">
                        <chart class="percent-chart" :options="percentOpt" :autoResize="true"></chart>
                        <div class="percent-title">公积金服务</div>
                      </div>
                      <div class="percent-box">
                        <chart class="percent-chart" :options="percentOpt" :autoResize="true"></chart>
                        <div class="percent-title">预约挂号服务</div>
                      </div>
                      <div class="percent-box" style="margin-top:0.2rem;">
                        <chart class="percent-chart" :options="percentOpt" :autoResize="true"></chart>
                        <div class="percent-title">社保服务</div>
                      </div>
                      <div class="percent-box" style="margin-top:0.2rem;">
                        <chart class="percent-chart" :options="percentOpt" :autoResize="true"></chart>
                        <div class="percent-title">生活缴费服务</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="right-bottom" style="height:42%;">
                  <div class="common-title-box" style="margin-bottom:0;">
                      <img src="./assets/title.png" alt="">
                      <p>各委办局接入服务排行</p>
                  </div>
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
      proportion: 1,
      leftList: [
        {name: '总下载量', num: 7056},
        {name: '总注册量', num: 2749},
        {name: '总实名用户', num: 1652},
        {name: '日活跃量', num: 1588}
      ],
      rankList: [
        {title: '盐城市公积金中心', count: 26550},
        {title: '盐城市城市建设投资集团有限公司', count: 21678},
        {title: '盐城市人力资源和社会保障局', count: 20032},
        {title: '盐城市城市医疗保障局', count: 19860},
        {title: '盐城市卫生健康委员会', count: 16504},
        {title: '盐城市交通投资控股集团有限公司', count: 13900}
      ]
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
            data: ['盐城市公积金中心', '盐城', '盐城', '盐城', '盐城', '盐城', '盐城']
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
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
          show: false
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '50%'], // 设置饼图位置
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
  .report-wrap{
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    .content-wrap {
        width: 100%;
        height: 100%;
        padding: pxrem(125px) pxrem(45px) pxrem(65px);
        .left{
          width: pxrem(250px);
          height: 100%;
          background: url("./assets/left_bg.png") no-repeat center;
          background-size: 100% 100%;
          position: relative;
          padding: pxrem(45px) pxrem(30px);
          margin-right: 50px;
          .left-item{
            text-align: left;
            .title-box{
              p{
                font-size:pxrem(22px);
                color: #fff;
              }
              .title-icon{
                width: pxrem(33px);
                height: pxrem(15px);
                margin-left: pxrem(10px);
              }
            }
            .name-text{
              font-size:pxrem(40px);
              color: #4AFBE8;
              padding: pxrem(18px) 0 pxrem(15px);
            }
            .split{
              height: pxrem(8px);
            }
          }
        }
        .center{
          width: 30%;
          height: 100%;
          margin-right: pxrem(100px);
          .rank-list{
            margin-bottom: pxrem(72px);
            .rank-item{
              margin-bottom: pxrem(30px);
              .rank-num{
                width: pxrem(30px);
                height: pxrem(30px);
                line-height: pxrem(30px);
                font-size:pxrem(20px);
                color: #fff;
                background:rgba(0,108,255,0.45);
                border-radius:5px;
                &.rank-one{
                  background:rgba(251,49,97,0.45);
                }
                &.rank-two{
                  background:rgba(251,173,49,0.45);
                }
                &.rank-three{
                  background:rgba(192,49,251,0.45);
                }
              }
              .rank-title{
                flex: 1;
                font-size:pxrem(22px);
                color: #fff;
                text-align: left;
                padding-left: 17px;
              }
              .rank-count{
                font-size:pxrem(22px);
                color: #0BA0FF;
              }
            }
          }
          .new-user-chart{
              height: 50%;
          }
        }
        .right{
          width: 50%;
          height: 100%;
          .right-top{
              height: 63%;
              .right-top-box{
                width: 50%;
                .percent-box{
                  width: 50%;
                  height: 50%;
                  .percent-title{
                    color: #fff;
                    font-size:pxrem(22px);
                  }
                }
              }
          }
          .right-bottom{
              height: 37%;
          }
        }
        .chart-box{
          width: 100%;
          height: 100%;
          .percent-chart{
              width: 100% !important;
              height: 80% !important;
          }
          .echarts {
              width: 100%;
              height: 100%;
          }
       }
    }
  }
  .common-title-box{
    display: flex;
    align-items: center;
    margin-bottom: pxrem(60px);
    img{
      width: pxrem(21px);
      height: pxrem(20px);
      margin-right: pxrem(10px);
    }
    p{
      font-size: pxrem(22px);
      color: #49F1DF;
      font-weight:600;
    }
  }
}
</style>
