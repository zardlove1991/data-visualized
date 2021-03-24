<template>
  <div class="contentplan" id="contentplan">
    <div class="contentplan-wrap">
      <div class="wrap-top sys-flex sys-flex-center flex-justify-between">
        <div class="top_left">
          <div class="top_title">今日选题</div>
          <div class="total-num sys-flex sys-flex-center">
            <div class="num-list hg-flex"  v-for="(v, k) in topic_today_amount" :key="k"><span>{{v}}</span></div>
          </div>
          <div class="pic_title">近7日走势</div>
          <div class="jinri_echart">
            <chart :options="barOptions" :autoResize="true"></chart>
          </div>
        </div>
        <div class="top_right">
          <div class="top_title">今日完成</div>
          <div class="total-num sys-flex sys-flex-center">
            <div class="num-list hg-flex"  v-for="(v, k) in topic_today_finish_amount" :key="k"><span>{{v}}</span></div>
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
import { contentPlanning } from '@/servers/interface'
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
      topic_today_amount: [],
      topic_today_finish_amount: [],
      barOptions: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            fontSize: 24
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
          left: 20,
          right: 20,
          top: 0
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
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: '#3c66ff'},
                  {offset: 1, color: '#072365'}
                ])
              }
            },
            data: [150, 120, 230, 180, 100, 130, 160, 150]
          }
        ]
      },
      barOptions1: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['02', '03', '04', '05', '06', '07', '08', '09'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            fontSize: 24
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
          left: 20,
          right: 20,
          top: 0
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
            data: [150, 120, 230, 180, 100, 130, 160, 150]
          }
        ]
      },
      barOptions2: {
        splitLine: {
          show: false
        },
        color: ['#827705', '#01616f'],
        legend: {
          icon: 'circle',
          data: ['累计选题', '累计完成'],
          textStyle: {
            color: '#fff',
            fontSize: 34
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
          left: 0,
          right: 40,
          bottom: 0,
          top: 70,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            fontSize: 30
          }
        },
        yAxis: {
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            fontSize: 30
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
            data: [600, 850, 1000, 600, 550, 450, 310],
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
            data: [279, 300, 201, 334, 290, 300, 210],
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
  created () {
    this.contentPlanning()
    this.initData()
  },
  methods: {
    contentPlanning () {
      contentPlanning().then(res => {
        if (!res.data.error_code) {
          // 今日选题
          let topicVal = res.data.result.topic_today_amount.toString()
          let topicValLength = topicVal.length
          let chaTopicValLength = 8 - topicValLength
          for (let i = 0; i < chaTopicValLength; i++) {
            this.topic_today_amount.push(0)
          }
          for (let j = 0; j < topicValLength; j++) {
            this.topic_today_amount.push(topicVal[j])
          }
          // 今日完成
          let finishVal = res.data.result.topic_today_finish_amount.toString()
          let finishValLength = finishVal.length
          let chaFinishValLength = 8 - finishValLength
          for (let i = 0; i < chaFinishValLength; i++) {
            this.topic_today_finish_amount.push(0)
          }
          for (let j = 0; j < finishValLength; j++) {
            this.topic_today_finish_amount.push(finishVal[j])
          }
        }
      })
    },
    funGetDateStr (pCount) {
      var dd = new Date()
      dd.setDate(dd.getDate() + pCount)
      var d = dd.getDate()
      return d < 10 ? '0' + d : d
    },
    funGetDateStr1 (pCount) {
      var dd = new Date()
      dd.setDate(dd.getDate() + pCount)
      var m = dd.getMonth() + 1
      var d = dd.getDate()
      return (m < 10 ? '0' + m : m) + '.' + (d < 10 ? '0' + d : d)
    },
    initData () {
      var dateList = []
      for (var i = -7; i < 1; i++) {
        let tempData = this.funGetDateStr(i).toString()
        dateList.push(tempData)
      }
      var dateList1 = []
      for (var j = -6; j < 1; j++) {
        let tempData1 = this.funGetDateStr1(j).toString()
        dateList1.push(tempData1)
      }
      this.barOptions.xAxis.data = dateList
      this.barOptions1.xAxis.data = dateList
      this.barOptions2.xAxis.data = dateList1
    }
  },
  mounted () {
    this.setFontsize('contentplan')
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 1920 * 100 + 'px'
    console.log(document.documentElement.getBoundingClientRect().width)
  },
  components: {
    chart: echarts
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.contentplan {
  width: pxrem(1920px);
  height: pxrem(1080px);
  padding: pxrem(27px) pxrem(50px);
  position: relative;
  background: #0b072d;
  box-sizing: border-box;
  .contentplan-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(99px) pxrem(115px) pxrem(0px);
    color: #fff;
    box-sizing: border-box;
    .wrap-top {
      width: 100%;
      height: pxrem(375px);
      background-size: 100% 100%;
      margin-bottom: pxrem(51px);
      .top_left{
        width: pxrem(750px);
        height: pxrem(375px);
        background: url("./assets/topBack.png") no-repeat center;
        background-size: 100% 100%;
        padding: pxrem(25px) pxrem(50px) pxrem(0px) pxrem(50px);
        box-sizing: border-box;
        .top_title{
          font-size: pxrem(34px);
          font-weight: bold;
          color: #fff;
          text-align: left;
          margin-bottom: pxrem(24px);
          font-stretch: ultra-expanded;
        }
        .total-num {
          margin-bottom: pxrem(45px);
          .num-list {
            width: pxrem(80px);
            height: pxrem(37px);
            background: url('./assets/numBack.png') no-repeat center;
            margin-right: pxrem(8px);
            &:last-of-type {
              margin-right: 0;
            }
            span {
              font-size: pxrem(34px);
              color: #13fee3;
              font-weight: 600;
              font-stretch: ultra-expanded;
            }
            span.zero{
              color: #719be2;
            }
          }
        }
        .pic_title{
          font-size: pxrem(30px);
          font-weight: 500;
          color: #fff;
          text-align: left;
          margin-bottom: pxrem(16px);
          font-stretch: ultra-expanded;
        }
        .jinri_echart{
          height: pxrem(150px);
        }
      }
      .top_right{
        width: pxrem(750px);
        height: pxrem(375px);
        background: url("./assets/topBack.png") no-repeat center;
        background-size: 100% 100%;
        padding: pxrem(25px) pxrem(50px) pxrem(0px) pxrem(50px);
        box-sizing: border-box;
        .top_title{
          font-size: pxrem(34px);
          font-weight: bold;
          color: #fff;
          text-align: left;
          margin-bottom: pxrem(24px);
          font-stretch: ultra-expanded;
        }
        .total-num {
          margin-bottom: pxrem(45px);
          .num-list {
            width: pxrem(80px);
            height: pxrem(37px);
            background: url('./assets/numBack.png') no-repeat center;
            margin-right: pxrem(8px);
            &:last-of-type {
              margin-right: 0;
            }
            span {
              font-size: pxrem(34px);
              color: #13fee3;
              font-weight: 600;
              font-stretch: ultra-expanded;
            }
            span.zero{
              color: #719be2;
            }
          }
        }
        .pic_title{
          font-size: pxrem(30px);
          font-weight: 500;
          color: #fff;
          text-align: left;
          margin-bottom: pxrem(16px);
        }
        .jinri_echart{
          height: pxrem(150px);
        }
      }
    }
    .wrap-bottom{
      margin-top: pxrem(62px);
      .leiji{
        width: pxrem(350px);
        height: pxrem(44px);
        background: url("./assets/leijiBg.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: pxrem(19px);
      }
      .leiji_echart{
        height: pxrem(380px);
      }
    }
  }
}
</style>