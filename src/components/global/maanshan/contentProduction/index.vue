<template>
  <div class="maanshan-contentproduction" id="maanshan-contentproduction">
    <div class="contentproduction-wrap">
      <div class="wrap-top sys-flex sys-flex-center">
        <div class="top-total sys-flex sys-flex-center">
          <div class="total-text">总内容：</div>
          <div class="total-num sys-flex sys-flex-center">
            <div class="num-list hg-flex" v-for="(v, k) in testList" :key="k"><span>{{v}}</span></div>
          </div>
        </div>
        <div class="top-right top-pass sys-flex sys-flex-center">
          <span>已通过：</span>
          <span>8433</span>
        </div>
        <div class="top-right sys-flex sys-flex-center flex-justify-between">
          <span>未过审：</span>
          <span>346</span>
        </div>
      </div>
      <div class="wrap-bottom sys-flex sys-flex-center flex-justify-between">
        <div class="bottom-left">
          <div class="left-list sys-flex sys-flex-center flex-justify-between" v-for="(v, k) in dateList" :key="k" :class="{'active': k === currentIndex}">
            <div class="list-date sys-flex sys-flex-center">
              <span>{{v.text}}：</span>
              <span>{{v.date}}</span>
            </div>
            <div class="list-rank">
              部门日排行：{{v.num}}
            </div>
          </div>
        </div>
        <div class="bottom-right">
          <chart :options="barOptions.data" :autoResize="true"></chart>
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
export default {
  name: 'contentProduction',
  data () {
    return {
      testList: [0, 0, 0, 1, 5, 6, 8, 4],
      dateList: [{
        text: '日',
        date: '52',
        num: '2'
      }, {
        text: '周',
        date: '374',
        num: '4'
      }, {
        text: '月',
        date: '1307',
        num: '3'
      }, {
        text: '年',
        date: '10689',
        num: '3'
      }],
      currentIndex: 0,
      frequency: 25000,
      proportion: ''
    }
  },
  computed: {
    barOptions () {
      return {
        data: {
          legend: {
            itemWidth: 60 * this.proportion,
            itemHeight: 30 * this.proportion,
            itemGap: 50 * this.proportion,
            data: [{
              name: '已通过',
              textStyle: {
                color: '#fff',
                fontSize: 30 * this.proportion
              }
            }, {
              name: '已过审',
              textStyle: {
                color: '#fff',
                fontSize: 30 * this.proportion
              }
            }]
          },
          grid: {
            left: this.proportion * 30,
            right: this.proportion * 60,
            top: this.proportion * 105,
            bottom: this.proportion * 15,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['文稿', '图集', '视频', '外链'],
            axisLabel: {
              interval: 0,
              color: '#fff',
              fontSize: 30 * this.proportion,
              fontWeight: 'bold',
              margin: 15
            },
            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 0.5,
                opacity: 0.5,
                type: 'dashed',
                color: '#4A6AA8'
              }
            },
            axisLabel: {
              formatter: function () {
                return ''
              }
            }
          },
          series: [{
            type: 'bar',
            name: '已通过',
            stack: 'sum',
            barWidth: 120 * this.proportion,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#064DFF']
                  return colorList[params.dataIndex]
                }
              }
            },
            data: [70, 30, 50, 15]
          }, {
            type: 'bar',
            name: '已过审',
            stack: 'sum',
            barWidth: 60 * this.proportion,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#DC355C']
                  return colorList[params.dataIndex]
                }
              }
            },
            data: [25, 10, 20, 5]
          }]
        }
      }
    }
  },
  components: {
    chart: echarts
  },
  created () {
  },
  mounted () {
    this.proportion = this.getProportion('maanshan-contentproduction')
    this.setFontsize('maanshan-contentproduction')
    setInterval(() => {
      this.currentIndex++
      if (this.currentIndex >= this.dateList.length) {
        this.currentIndex = 0
      }
    }, this.frequency)
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.maanshan-contentproduction {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .contentproduction-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    padding: px2em(172px) px2em(133px) px2em(70px) px2em(102px);
    color: #fff;
    .wrap-top {
      width: 100%;
      height: px2em(145px);
      background: url('./assets/back.png') no-repeat center;
      background-size: 100% 100%;
      padding: 0 px2em(90px) 0 px2em(66px);
      margin-bottom: px2em(65px);
      .top-total {
        .total-text {
          font-size: px2em(36px);
        }
        .total-num {
          .num-list {
            width: px2em(58px);
            height: px2em(75px);
            background: url('./assets/numBack.png') no-repeat center;
            margin-right: px2em(8px);
            &:last-of-type {
              margin-right: 0;
            }
            span {
              font-size: px2em(60px);
              color: #00FFF6;
            }
          }
        }
      }
      .top-pass {
        margin: 0 px2em(100px) 0 auto;
      }
      .top-right {
        span:first-of-type {
          font-size: px2em(36px);
        }
        span:last-of-type {
          font-size: px2em(48px);
          font-weight: bold;
          color: #00FFF6;
        }
      }
    }
    .wrap-bottom {
      .bottom-left {
        .left-list {
          width: px2em(649px);
          height: px2em(105px);
          background: rgba(15,134,218,0.15);
          border: px2em(2px) solid rgba(0, 150, 255, 0.2);
          margin-bottom: px2em(30px);
          padding: 0 px2em(80px) 0 px2em(68px);
          &.active {
            background: rgba(15,134,218,0.4);
            border-color: rgba(0, 210, 255, 0.9);
          }
          &:last-of-type {
            margin-bottom: 0;
          }
          .list-date {
            color: #00FFF6;
            span:first-of-type {
              font-size: px2em(40px);
            }
            span:last-of-type {
              font-size: px2em(48px);
            }
          }
          .list-rank {
            font-size: px2em(36px);
          }
        }
      }
      .bottom-right {
        width: px2em(900px);
        height: px2em(550px);
      }
    }
  }
}
</style>