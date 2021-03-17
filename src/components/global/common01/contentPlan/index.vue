<template>
  <div class="contentplan" id="contentplan">
    <div class="contentplan-wrap">
      <div class="wrap-top sys-flex sys-flex-center flex-justify-between">
        <div class="top_left">
          <div class="top_title">今日选题</div>
          <div class="total-num sys-flex sys-flex-center">
            <div class="num-list hg-flex"><span class="zero">0</span></div>
            <div class="num-list hg-flex"><span class="zero">0</span></div>
            <div class="num-list hg-flex"><span class="zero">0</span></div>
            <div class="num-list hg-flex"><span>1</span></div>
            <div class="num-list hg-flex"><span>0</span></div>
            <div class="num-list hg-flex"><span>2</span></div>
            <div class="num-list hg-flex"><span>1</span></div>
            <div class="num-list hg-flex"><span>9</span></div>
          </div>
          <div class="pic_title">近7日走势</div>
          <div class="jinri_echart">
            <chart :options="barOptions" :autoResize="true"></chart>
          </div>
        </div>
        <div class="top_right">
          <div class="top_title">今日完成</div>
          <div class="total-num sys-flex sys-flex-center">
            <div class="num-list hg-flex"><span class="zero">0</span></div>
            <div class="num-list hg-flex"><span class="zero">0</span></div>
            <div class="num-list hg-flex"><span class="zero">0</span></div>
            <div class="num-list hg-flex"><span>1</span></div>
            <div class="num-list hg-flex"><span>0</span></div>
            <div class="num-list hg-flex"><span>2</span></div>
            <div class="num-list hg-flex"><span>1</span></div>
            <div class="num-list hg-flex"><span>9</span></div>
          </div>
          <div class="pic_title">近7日走势</div>
          <div class="jinri_echart">
            <chart :options="barOptions1" :autoResize="true"></chart>
          </div>
        </div>
      </div>
      <div class="wrap-bottom">
        <div class="leiji"></div>
        <div class="leiji_echart">
          <chart :options="barOptions2" :autoResize="true"></chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/line'
export default {
  name: 'contentPlan',
  data () {
    return {
      barOptions: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            fontSize: '26'
          }
        },
        yAxis: {
          type: 'value',
          show: false,
          splitLine: {
            show: false
          }
        },
        grid: {
          left: '4%',
          right: '4%',
          top: '0%'
        },
        splitLine: {
          show: true
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
              color: '#2041ad',
              width: 5
            },
            // color: '#133085',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: '#3c66ff'},
                  {offset: 1, color: '#072365'}
                ])
              }
            },
            data: [
              ['02', 150],
              ['03', 120],
              ['04', 230],
              ['05', 180],
              ['06', 100],
              ['07', 130],
              ['08', 160],
              ['09', 150]
            ]
          }
        ]
      },
      barOptions1: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            fontSize: '26'
          }
        },
        yAxis: {
          type: 'value',
          show: false,
          splitLine: {
            show: false
          }
        },
        grid: {
          left: '4%',
          right: '4%',
          top: '0%'
        },
        splitLine: {
          show: true
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
              color: '#004a82',
              width: 5
            },
            color: '#0074a0',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: '#0093b8'},
                  {offset: 1, color: '#053273'}
                ])
              }
            },
            data: [
              ['02', 150],
              ['03', 120],
              ['04', 230],
              ['05', 180],
              ['06', 100],
              ['07', 130],
              ['08', 160],
              ['09', 150]
            ]
          }
        ]
      },
      barOptions2: {
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'cross',
        //     label: {
        //       backgroundColor: '#6a7985'
        //     }
        //   }
        // },
        splitLine: {
          show: false
        },
        color: ['#827705', '#01616f'],
        legend: {
          icon: 'circle',
          data: ['累计选题', '累计完成'],
          textStyle: {
            color: '#fff',
            fontSize: 40
          },
          itemWidth: 80,
          itemHeight: 30,
          itemGap: 83
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '0%',
          top: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['10.12', '10.13', '10.14', '10.15', '10.16', '10.16', '10.16'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            fontSize: '30'
          }
        },
        yAxis: {
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            fontSize: '30'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#222952',
              width: 2
            }
          }
        },
        series: [
          {
            name: '累计选题',
            type: 'line',
            // stack: '总量',
            // emphasis: {
            //   focus: 'series'
            // },
            data: [600, 850, 1000, 600, 550, 450, 310],
            // color: '#827705',
            // symbol: 'true',
            lineStyle: {
              color: '#ffe50c',
              width: 5
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: '#827600'},
                  {offset: 1, color: '#04072a'}
                ])
              }
            },
            symbolSize: 30,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#ffe50c',
                borderColor: '#ffe50c',
                borderWidth: 2
              }
            }
          },
          {
            name: '累计完成',
            type: 'line',
            // stack: '总量',
            // areaStyle: {},
            // emphasis: {
            //   focus: 'series'
            // },
            data: [279, 300, 201, 334, 290, 300, 210],
            // color: '#01616f',
            lineStyle: {
              color: '#00f8e4',
              width: 5
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: '#01616f'},
                  {offset: 1, color: '#04072a'}
                ])
              }
            },
            symbolSize: 30,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#00f8e4',
                borderColor: '#00f8e4',
                borderWidth: 2
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.setFontsize('contentplan')
  },
  components: {
    chart: echarts
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.contentplan {
  width: 100%;
  height: 100%;
  padding: pxrem(58px) pxrem(50px) pxrem(53px) pxrem(50px);
  position: relative;
  background: #030520;
  .contentplan-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(220px) pxrem(126px) pxrem(0px);
    color: #fff;
    .wrap-top {
      width: 100%;
      height: pxrem(750px);
      background-size: 100% 100%;
      margin-bottom: pxrem(102px);
      .top_left{
        width: pxrem(750px);
        height: 100%;
        background: url("./assets/topBack.png") no-repeat center;
        background-size: 100% 100%;
        padding: pxrem(50px);
        box-sizing: border-box;
        .top_title{
          font-size: pxrem(44px);
          font-weight: bold;
          color: #fff;
          text-align: left;
          margin-bottom: pxrem(55px);
        }
        .total-num {
          margin-bottom: pxrem(80px);
          .num-list {
            width: pxrem(80px);
            height: pxrem(75px);
            background: url('./assets/numBack.png') no-repeat center;
            margin-right: pxrem(8px);
            &:last-of-type {
              margin-right: 0;
            }
            span {
              font-size: pxrem(44px);
              color: #13fee3;
              font-weight: 600;
            }
            span.zero{
              color: #719be2;
            }
          }
        }
        .pic_title{
          font-size: pxrem(36px);
          font-weight: 500;
          color: #fff;
          text-align: left;
          margin-bottom: pxrem(42px);
        }
        .jinri_echart{
          height: pxrem(330px);
        }
      }
      .top_right{
        width: pxrem(750px);
        height: 100%;
        background: url("./assets/topBack.png") no-repeat center;
        background-size: 100% 100%;
        padding: pxrem(50px);
        box-sizing: border-box;
        .top_title{
          font-size: pxrem(44px);
          font-weight: bold;
          color: #fff;
          text-align: left;
          margin-bottom: pxrem(55px);
        }
        .total-num {
          margin-bottom: pxrem(80px);
          .num-list {
            width: pxrem(80px);
            height: pxrem(75px);
            background: url('./assets/numBack.png') no-repeat center;
            margin-right: pxrem(8px);
            &:last-of-type {
              margin-right: 0;
            }
            span {
              font-size: pxrem(44px);
              color: #13fee3;
              font-weight: 600;
            }
            span.zero{
              color: #719be2;
            }
          }
        }
        .pic_title{
          font-size: pxrem(36px);
          font-weight: 500;
          color: #fff;
          text-align: left;
          margin-bottom: pxrem(42px);
        }
        .jinri_echart{
          height: pxrem(330px);
        }
      }
    }
    .wrap-bottom{
      margin-top: pxrem(125px);
      .leiji{
        width: pxrem(350px);
        height: pxrem(88px);
        background: url("./assets/leijiBg.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: pxrem(38px);
      }
      .leiji_echart{
        height: pxrem(700px);
      }
    }
  }
}
</style>