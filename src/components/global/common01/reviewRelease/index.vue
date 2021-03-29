<template>
  <div class="reviewRelease" id="reviewRelease">
    <div class="reviewRelease-wrap">
      <div class="wrap-top">
        <div class="num_div sys-flex sys-flex-center flex-justify-between">
          <div class="y_sh sys-flex sys-flex-center">
            <div class="top_title">已审核:</div>
            <div class="number">{{audited_publish_amount}}</div>
          </div>
          <div class="connect_div"></div>
          <div class="n_sh sys-flex sys-flex-center">
            <div class="top_title">待审核:</div>
            <div class="number">{{waiting_publish_amount}}</div>
          </div>
        </div>
        <div class="shenhe_echart">
            <chart :options="barOptions1" :autoResize="true"></chart>
        </div>
      </div>
      <div class="wrap-bottom">
        <div class="num_div sys-flex sys-flex-center flex-justify-between">
          <div class="y_sh sys-flex sys-flex-center">
            <div class="top_title">已发布:</div>
            <div class="number">{{already_publish_amount}}</div>
          </div>
          <div class="connect_div"></div>
          <div class="n_sh sys-flex sys-flex-center">
            <div class="top_title">待发布:</div>
            <div class="number">{{announced_publish_amount}}</div>
          </div>
        </div>
        <div class="fabu_echart">
            <chart :options="barOptions2" :autoResize="true"></chart>
        </div>
      </div>  
    </div>
  </div>
</template>
<script>
import { waiting } from '@/servers/interface'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/line'
export default {
  name: 'reviewRelease',
  data () {
    return {
      audited_publish_amount: '',
      waiting_publish_amount: '',
      already_publish_amount: '',
      announced_publish_amount: '',
      barOptions1: {
        legend: {
          data: ['已审核', '待审核'],
          textStyle: {
            color: '#fff',
            fontSize: 40
          },
          itemWidth: 40,
          itemHeight: 26,
          itemGap: 100,
          padding: [5, 15, 0, 0],
          x: 'center',
          y: 'top',
          formatter: function (name) {
            return ' ' + ' ' + name
          }
        },
        barWidth: 60,
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          top: '25%',
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['文稿', '图集', '视频', '专题'],
            axisLabel: {
              fontWeight: 'bold',
              show: true,
              interval: 0,
              textStyle: {
                color: '#ccc'
              },
              fontSize: '40'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
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
            },
            splitNumber: 4
          }
        ],
        series: [
          {
            name: '已审核',
            type: 'bar',
            data: [600, 250, 700, 420],
            itemStyle: {
              normal: {
                color: '#d15900'
              }
            },
            showBackground: true,
            backgroundStyle: {
              color: '#121455'
            },
            barGap: '0%'
          },
          {
            name: '待审核',
            type: 'bar',
            data: [180, 420, 380, 50],
            itemStyle: {
              normal: {
                color: '#e7b448'
              }
            },
            showBackground: true,
            backgroundStyle: {
              color: '#121455'
            }
          }
        ]
      },
      barOptions2: {
        legend: {
          data: ['已发布', '待发布'],
          textStyle: {
            color: '#fff',
            fontSize: 40
          },
          itemWidth: 40,
          itemHeight: 26,
          itemGap: 100,
          padding: [5, 15, 0, 0],
          x: 'center',
          y: 'top',
          formatter: function (name) {
            return ' ' + ' ' + name
          }
        },
        barWidth: 60,
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          top: '25%',
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['文稿', '图集', '视频', '专题'],
            axisLabel: {
              fontWeight: 'bold',
              show: true,
              interval: 0,
              textStyle: {
                color: '#ccc'
              },
              fontSize: '40'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
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
            },
            splitNumber: 4
          }
        ],
        series: [
          {
            name: '已发布',
            type: 'bar',
            data: [600, 250, 700, 420],
            itemStyle: {
              normal: {
                color: '#136eff'
              }
            },
            showBackground: true,
            backgroundStyle: {
              color: '#121455'
            },
            barGap: '0%'
          },
          {
            name: '待发布',
            type: 'bar',
            data: [180, 420, 380, 50],
            itemStyle: {
              normal: {
                color: '#17ffe6'
              }
            },
            showBackground: true,
            backgroundStyle: {
              color: '#121455'
            }
          }
        ]
      }
    }
  },
  created () {
    this.waiting()
  },
  mounted () {
    this.setFontsize('reviewRelease')
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 1920 * 100 + 'px'
    console.log(document.documentElement.getBoundingClientRect().width)
  },
  methods: {
    waiting () {
      waiting().then(res => {
        if (!res.data.error_code) {
          this.audited_publish_amount = res.data.result.audited_publish_amount
          this.waiting_publish_amount = res.data.result.waiting_publish_amount
          this.already_publish_amount = res.data.result.already_publish_amount
          this.announced_publish_amount = res.data.result.announced_publish_amount
        }
      })
    }
  },
  components: {
    chart: echarts
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.reviewRelease {
  width: pxrem(1920px);
  height: pxrem(1080px);
  padding: pxrem(27px) pxrem(50px);
  position: relative;
  background: #0b072d;
  .reviewRelease-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(99px) pxrem(115px) pxrem(0px);
    color: #fff;
    .wrap-top {
      width: 100%;
      height: pxrem(420px);
      margin-bottom: pxrem(51px);
      .num_div{
        .y_sh{
          width: pxrem(740px);
          height: pxrem(90px);
          background: url('./assets/num_bg.png') no-repeat;
          background-size: 100% 100%;
          box-sizing: border-box;
          padding-left: pxrem(100px);
          .top_title{
            font-size: pxrem(38px);
            color: #fff;
            margin-right: pxrem(95px);
            letter-spacing: 3px;
            transform: scale(1,0.5);
          }
          .number{
            font-size: pxrem(54px);
            color: #15fef5;
            transform: scale(1,0.5);
          }
        }
        .connect_div{
          width: pxrem(89px);
          height: pxrem(51px);
          background: url('./assets/connect_bg.png') no-repeat;
          background-size: 100% 100%;
        }
        .n_sh{
          width: pxrem(740px);
          height: pxrem(90px);
          background: url('./assets/num_bg.png') no-repeat;
          background-size: 100% 100%;
          box-sizing: border-box;
          padding-left: pxrem(100px);
          .top_title{
            font-size: pxrem(38px);
            color: #fff;
            margin-right: pxrem(95px);
            letter-spacing: 3px;
            transform: scale(1,0.5);
          }
          .number{
            font-size: pxrem(54px);
            color: #15fef5;
            transform: scale(1,0.5);
          }
        }
      }
      .shenhe_echart{
        // height: pxrem(290px);
        margin-top: pxrem(35px);
        height: pxrem(580px);
        transform: scale(1,0.5);
        transform-origin: 0 0;
      }
    }
    .wrap-bottom{
      width: 100%;
      height: pxrem(420px);
      .num_div{
        .y_sh{
          width: pxrem(740px);
          height: pxrem(90px);
          background: url('./assets/num_bg.png') no-repeat;
          background-size: 100% 100%;
          box-sizing: border-box;
          padding-left: pxrem(100px);
          .top_title{
            font-size: pxrem(38px);
            color: #fff;
            margin-right: pxrem(95px);
            letter-spacing: 3px;
            transform: scale(1,0.5);
          }
          .number{
            font-size: pxrem(54px);
            color: #15fef5;
            transform: scale(1,0.5);
          }
        }
        .connect_div{
          width: pxrem(89px);
          height: pxrem(51px);
          background: url('./assets/connect_bg.png') no-repeat;
          background-size: 100% 100%;
        }
        .n_sh{
          width: pxrem(740px);
          height: pxrem(90px);
          background: url('./assets/num_bg.png') no-repeat;
          background-size: 100% 100%;
          box-sizing: border-box;
          padding-left: pxrem(100px);
          .top_title{
            font-size: pxrem(38px);
            color: #fff;
            margin-right: pxrem(95px);
            letter-spacing: 3px;
            transform: scale(1,0.5);
          }
          .number{
            font-size: pxrem(54px);
            color: #15fef5;
            transform: scale(1,0.5);
          }
        }
      }
      .fabu_echart{
        // height: pxrem(290px);
        margin-top: pxrem(35px);
        height: pxrem(580px);
        transform: scale(1,0.5);
        transform-origin: 0 0;
      }
    }
  }
}
</style>