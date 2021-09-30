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
          <div class="data-content sys-flex">
            <div class="echart-left">
              <div class="echart-center">
                <img :src="centerLogo" alt="">
                <p>{{echartTitle}}</p>
              </div>
              <chart :options="pieOptions" :autoResize="true"></chart>
            </div>
            <div class="datalist">
              <div class="data-item sys-flex sys-flex-center animated flipInX" v-for="(item, index) in dataList" :key="item.name" :style="{'animation-delay' : index/2 +'s'}">
                <div class="icon" :style="{background: item.icon_color}"></div>
                <div class="item-title">{{item.name}}</div>
                <div class="item-count">{{item.value}}</div>
                <div class="item-count item-percent">{{item.percent}}%</div>
              </div>
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
import { getPluswebStatisticalData, getPlusAppStatisticalData } from '@/servers/interface'
export default {
  name: 'operateDate',
  data () {
    return {
      operateDataTitle: '运营数据',
      centerLogo: require('./assets/data_web.png'),
      echartTitle: '网站',
      frequency: 15000,
      date: '',
      active: 'web',
      dataList: [],
      pieOptions: {
        tooltip: {
          trigger: 'item'
        },
        color: [
          '#ee6666',
          '#5470c6',
          '#fac858'
        ],
        series: [
          {
            type: 'pie',
            radius: ['60%', '100%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#021d6a',
              borderWidth: 18
            },
            label: {
              show: false,
              position: 'center'
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
    this.formatDate()
  },
  mounted () {
    this.setFontsize('xy-operate')
    this.getWebDate()
    // this.getAppData()
    setInterval(() => {
      if (this.active === 'web') {
        this.getWebDate()
      } else {
        this.getAppData()
      }
    }, this.frequency)
  },
  methods: {
    formatDate () {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      this.date = `${year}-${month}-${day}`
    },
    getWebDate () {
      getPluswebStatisticalData(this.date, this.date, 0).then((res) => {
        if (res.data && res.data.error_code === 0) {
          this.active = 'app'
          const data = res.data.result.data[0]
          const total = data.web_ip_amount + data.web_pv_amount + data.web_uv_amount
          this.echartTitle = '网站'
          this.centerLogo = require('./assets/data_web.png')
          this.dataList = [
            {
              name: '网站PV',
              icon_color: '#c8355f',
              value: data.web_pv_amount,
              percent: total ? Math.round(data.web_pv_amount / total * 100) : 0
            },
            {
              name: '网站UV',
              icon_color: '#176cff',
              value: data.web_uv_amount,
              percent: total ? Math.round(data.web_uv_amount / total * 100) : 0
            },
            {
              name: '网站IP',
              icon_color: '#e8854a',
              value: data.web_ip_amount,
              percent: total ? Math.round(data.web_ip_amount / total * 100) : 0
            }
          ]
          this.pieOptions.series[0].data = this.dataList
        }
      })
    },
    getAppData () {
      getPlusAppStatisticalData(this.date, this.date, 0).then((res) => {
        if (res.data && res.data.error_code === 0) {
          this.active = 'web'
          const data = res.data.result.data[0]
          const total = data.app_install_amount + data.app_pv_amount + data.app_uv_amount
          this.echartTitle = 'APP'
          this.centerLogo = require('./assets/data_app.png')
          this.dataList = [
            {
              name: 'APP启动数',
              icon_color: '#c8355f',
              value: data.app_pv_amount,
              percent: total ? Math.round(data.app_pv_amount / total * 100) : 0
            },
            {
              name: 'APP安装数',
              icon_color: '#176cff',
              value: data.app_install_amount,
              percent: total ? Math.round(data.app_install_amount / total * 100) : 0
            },
            {
              name: 'APP活跃数',
              icon_color: '#e8854a',
              value: data.app_uv_amount,
              percent: total ? Math.round(data.app_uv_amount / total * 100) : 0
            }
          ]
          this.pieOptions.series[0].data = this.dataList
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
@import '../../common01/style/index.scss';
@import 'src/styles/index.scss';
.xy-operate {
  width: 100%;
  height: 100%;
  padding: pxrem(80px);
  .operate-wrap {
    color: #fff;
    padding: pxrem(106px) 0 0 pxrem(85px);
    background: url(./assets/bg.png);
    background-repeat: no-repeat;
    .operate-box {
      margin-right: pxrem(256px);
      .operate {
        background: url(./assets/operate_bg.png);
        width: pxrem(751px);
        height: pxrem(1382px);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: pxrem(236px);
        .operate-logo {
          height: pxrem(110px);
          transform: scaleY(2);
          margin-bottom: pxrem(152px);
        }
        .operate-box-title {
          font-size: pxrem(40px);
          color: #00fffc;
          letter-spacing: pxrem(3px);
          margin-bottom: pxrem(98px);
          font-weight: bold;
          transform: scaleY(2);
        }
        .split {
          height: pxrem(8px);
          margin-bottom: pxrem(130px);
        }
        .text {
          font-size: pxrem(34px);
          color:#fff;
          transform: scaleY(2);
          margin-bottom: pxrem(130px);
        }
      }
    }
    .data-statistics {
      .data-title-bar {
        align-items: center;
        margin-bottom: pxrem(386px);
        .data-pre {
          height: pxrem(88px);
          margin-right: pxrem(16px);
        }
        .data-title {
          font-size: pxrem(50px);
          font-weight: bold;
          color: #fff;
          transform: scaleY(2);
        }
      }
      .data-content {
        .echart-left {
          width: pxrem(525px);
          height: pxrem(525px);
          position: relative;
          margin-right: pxrem(164px);
          transform: scaleY(2);
          .echart-center {
            position: absolute;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              height: pxrem(120px);
              margin-left: pxrem(15px);
              margin-bottom: pxrem(30px);
            }
            p {
              font-size: pxrem(48px);
              // transform: scaleY(2);
            }
          }
        }
        .datalist {
          transform: scaleY(2);
          .data-item {
            width: pxrem(940px);
            height: pxrem(140px);
            background: rgba(14,34,75,0.25);
            border: pxrem(2px) solid rgba(1, 150, 255, 0.3);
            margin-bottom: pxrem(96px);
            .icon {
              width: pxrem(26px);
              height: pxrem(26px);
              margin-right: pxrem(28px);
              margin-left: pxrem(51px);
              border-radius: 50%;
            }
            .item-title {
              font-size: pxrem(36px);
              margin-right: pxrem(300px);
            }
            .item-count {
              font-size: pxrem(48px);
              font-weight: bold;
              color: #00fffc;
              margin-right: pxrem(126px);
              width: .7rem;
              text-align: left;
            }
            .item-percent {
              margin-right: pxrem(50px);
            }
          }
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
    margin-bottom: pxrem(186px);
    transform: scaleY(2);
  }
  .mbt12 {
    font-size: 0.4em;
    margin-bottom: 1em;
    color: #ffffff;
    transform: scaleY(2);
  }
  .mr119 {
    margin-right: pxrem(119px);
  }
  .mr100 {
    margin-right: 1em;
  }
}
</style>
