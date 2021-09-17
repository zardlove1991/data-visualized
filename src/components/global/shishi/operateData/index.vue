<template>
  <div class="xy-operate" id="xy-operate">
    <!--  :class="[{'warp-bg' : showDefault}]"  -->
    <div class="operate-wrap common01-border sys-flex sys-vertical">
      <div class="operate-title sys-flex sys-flex-center">{{operateDataTitle}}</div>
      <div class="sys-flex">
        <div class="operate-box sys-flex">
          <div class="operate mr119">
            <img src="./assets/operate_web.png" alt="" class="operate-logo">
            <div class="operate-box-title">石狮网站</div>
            <img class="split" src="./assets/split.png"/>
            <div class="text">网站PV</div>
            <div class="text">网站UV</div>
            <div class="text">网站IP</div>
          </div>
          <div class="operate">
            <img src="./assets/operate_app.png" alt="" class="operate-logo">
            <div class="operate-box-title">看石狮客户端</div>
            <img class="split" src="./assets/split.png"/>
            <div class="text">APP启动数</div>
            <div class="text">APP安装数</div>
            <div class="text">APP活跃数</div>
          </div>
        </div>
        <div class="data-statistics">
          <div class="data-title-bar sys-flex">
            <img src="./assets/pre_icon.png" alt="" class="data-pre">
            <div class="data-title">数据统计</div>
          </div>
          <div class="data-content">
            <div class="echart_left">
              <chart :options="barOptions" :autoResize="true"></chart>
            </div>
            <div class="datalist">
              <div class="data-item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
// import { getAppStatisticalData } from '@/servers/interface'
export default {
  name: 'operateDate',
  data () {
    return {
      operateDataTitle: '运营数据',
      barOptions: {
        legend: {
          icon: 'rect',
          data: ['文稿', '图集', '视频', '专题'],
          textStyle: {
            color: '#fff',
            fontSize: 34
          },
          itemWidth: 40,
          itemHeight: 14,
          itemGap: 50,
          padding: [0, 15, 0, 0],
          x: 'center',
          y: 'bottom'
        },
        grid: {
          containLabel: true
        },
        color: ['#0d5ee4', '#01c0ff', '#e8854a', '#791fe2'],
        series: [
          {
            type: 'pie',
            radius: ['35%', '65%'],
            center: ['50%', '38%'], // 图的位置，距离左跟上的位置
            avoidLabelOverlap: false,
            itemStyle: {
              // borderRadius: 20,
              borderColor: '#07093A',
              borderWidth: 10
            },
            label: {
              // show: false,
              // position: 'center'
              normal: {
                show: false,
                position: 'center',
                formatter: function (data) { // 设置圆饼图中间文字排版
                  return data.percent.toFixed(0) + '%\n' + data.name
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 40,
                  color: '#fff',
                  borderWidth: 5
                  // fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      }
    }
  },
  created () {
    // this.getDataList()
  },
  mounted () {
    this.setFontsize('xy-operate')
    // setInterval(() => {
    // this.getDataList()
    // }, this.frequency)
  },
  methods: {
    // getDataList () {
    //   this.getAppData()
    //   this.getWechatData()
    // },
    // getAppData () {
    //   getAppStatisticalData().then((res) => {
    //     this.app_total_install = this.preFixInterge(res.data.result.app_total_install, 8)
    //     this.app_pv_amount = this.preFixInterge(res.data.result.app_statistics[0].app_pv_amount, 8)
    //     this.app_uv_amount = this.preFixInterge(res.data.result.app_statistics[0].app_uv_amount, 8)
    //     this.app_yesterday_read_total = this.preFixInterge(res.data.result.app_click.yesterday[3].total, 8)
    //   })
    // },
  },
  components: {
    chart: echarts
  }
}
</script>
<style lang="scss" scoped>
@import '../../common01/style/index.scss';
@import 'src/styles/index.scss';
.xy-operate {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .operate-wrap {
    color: #fff;
    padding: pxrem(53px) 0 0 pxrem(85px);
    background: url(./assets/bg.png);
    background-repeat: no-repeat;
    .operate-box {
      margin-right: pxrem(245px);
      .operate {
        background: url(./assets/operate_bg.png);
        width: pxrem(751px);
        height: pxrem(691px);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: pxrem(68px);
        .operate-logo {
          height: pxrem(110px);
          margin-bottom: pxrem(38px);
        }
        .operate-box-title {
          font-size: pxrem(40px);
          color: #00fffc;
          letter-spacing: pxrem(3px);
          margin-bottom: pxrem(49px);
          font-weight: bold;
        }
        .split {
          height: pxrem(7px);
          margin-bottom: pxrem(58px);
        }
        .text {
          font-size: pxrem(34px);
          color:#fff;
          margin-bottom: pxrem(50px);
        }
      }
    }
    .data-statistics {
      .data-title-bar {
        align-items: center;
        margin-bottom: pxrem(93px);
        .data-pre {
          height: pxrem(44px);
          margin-right: pxrem(16px);
        }
        .data-title {
          font-size: pxrem(50px);
          font-weight: bold;
          color: #fff;
        }
      }

    }
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .operate-title {
    text-align: left;
    height: pxrem(55px);
    font-size: pxrem(58px);
    font-weight: bold;
    color: #ffffff;
    margin-bottom: pxrem(93px);
  }
  .mbt12 {
    font-size: 0.4em;
    margin-bottom: 0.5em;
    color: #ffffff;
  }
  .mr119 {
    margin-right: pxrem(119px);
  }
  .mr100 {
    margin-right: 1em;
  }
}
</style>
