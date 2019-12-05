<template>
  <div class="jn-publish">
    <div class="publish-wrap">
      <div class="wrap-title">传播分析</div>
      <div class="wrap-content sys-flex sys-flex-center">
        <div class="content-left">
          <div class="left-one positionAb">
            <div>{{onePercent}}</div>
            <div>无线江宁APP</div>
          </div>
          <div class="left-two positionAb">
            <div>{{twoPercent}}</div>
            <div>短视频</div>
          </div>
          <div class="left-three positionAb">
            <div>{{threePercent}}</div>
            <div>微信</div>
          </div>
          <div class="left-four positionAb">
            <div>{{fourPercent}}</div>
            <div>微博</div>
          </div>
          <div class="left-total positionAb">
            <div>{{total}}</div>
            <div>总用户数</div>
          </div>
          <chart :options="pieOption" :autoResize="true"></chart>
        </div>
        <div class="content-right">
          <div class="right-list" v-for="(v, k) in dataList" :key="k">
            <div class="title"><span :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four': k === 3}"></span>{{v.title}}</div>
            <div class="num">{{v.num}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOperationalData } from '@/servers/interface'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
export default {
  name: 'publish',
  data () {
    return {
      total: 0,
      onePercent: 0,
      twoPercent: 0,
      threePercent: 0,
      fourPercent: 0,
      currentIndex: -1,
      dataList: [],
      // 数据
      pieOption: {
        tooltip: {
          // 设置悬停出现的弹框样式
          show: false,
          trigger: 'item',
          position: [340, 220],
          formatter: '{b}: {d}%',
          textStyle: {
            fontSize: '10',
            fontWeight: 'bold'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '90%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [],
            itemStyle: {
              normal: {
                // 设置饼图间隔
                borderColor: '#000f31',
                borderWidth: 12,
                color: function (params) {
                  // 随机设置柱子的颜色
                  var colorList = ['#E8854A', '#2684FA', '#DE4646', '#1AC8C6']
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
    }
  },
  created () {
    this.getOperationalData()
  },
  methods: {
    GetPercent (num, total) {
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%'
    },
    getOperationalData () {
      getOperationalData().then(res => {
        let dataArr = Object.values(res.data.result)
        if (dataArr && dataArr[0]) {
          dataArr.forEach(value => {
            this.total += value.cumulate_user
          })
        }
        this.pieOption.series[0].data = [{
          value: dataArr[0].cumulate_user,
          name: '无线江宁APP'
        }, {
          value: dataArr[3].cumulate_user,
          name: '短视频'
        }, {
          value: dataArr[2].cumulate_user,
          name: '微信'
        }, {
          value: dataArr[1].cumulate_user,
          name: '微博'
        }]
        this.dataList = [{
          title: '无线江宁APP',
          num: dataArr[0].cumulate_user
        }, {
          title: '短视频',
          num: dataArr[3].cumulate_user
        }, {
          title: '微信',
          num: dataArr[2].cumulate_user
        }, {
          title: '微博',
          num: dataArr[1].cumulate_user
        }]
        this.onePercent = this.GetPercent(dataArr[0].cumulate_user, this.total)
        this.twoPercent = this.GetPercent(dataArr[3].cumulate_user, this.total)
        this.threePercent = this.GetPercent(dataArr[2].cumulate_user, this.total)
        this.fourPercent = this.GetPercent(dataArr[1].cumulate_user, this.total)
      })
    }
  },
  mounted () {
    // setInterval(() => {
    //   var dataLen = this.pieOption.series[0].data.length
    //   // 取消之前高亮的图形
    //   echarts.dispatchAction({
    //     type: 'downplay',
    //     seriesIndex: 0,
    //     dataIndex: this.currentIndex
    //   })
    //   this.currentIndex = (this.currentIndex + 1) % dataLen
    //   // 高亮当前图形
    //   echarts.dispatchAction({
    //     type: 'highlight',
    //     seriesIndex: 0,
    //     dataIndex: this.currentIndex
    //   })
    //   // 显示 tooltip
    //   echarts.dispatchAction({
    //     type: 'showTip',
    //     seriesIndex: 0,
    //     dataIndex: this.currentIndex
    //   })
    // }, 1000)
  },
  components: {
    chart: echarts
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-publish {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .publish-wrap {
    width: 100%;
    height: 100%;
    background: url("../../../../assets/common/border@2x.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(30px);
    color: #fff;
    .wrap-title {
      font-size: pxrem(50px);
      font-weight: 600;
      margin-top: pxrem(-16px);
    }
    .wrap-content {
      width: 100%;
      height: pxrem(680px);
      margin-top: pxrem(140px);
      .content-left {
        width: 80%;
        height: 100%;
        position: relative;
        .positionAb {
          position: absolute;
          div:first-of-type {
            font-size: pxrem(60px);
            font-weight: bold;
            margin-bottom: pxrem(10px);
          }
          div:last-of-type {
            font-size: pxrem(34px);
          }
        }
        .left-one {
          top: pxrem(80px);
          left: pxrem(180px);
        }
        .left-two {
          top: pxrem(80px);
          right: pxrem(180px);
        }
        .left-three {
          bottom: pxrem(80px);
          left: pxrem(180px);
        }
        .left-four {
          bottom: pxrem(80px);
          right: pxrem(180px);
        }
        .left-total {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .content-right {
        width: 20%;
        .right-list {
          font-size: pxrem(40px);
          text-align: left;
          margin-bottom: pxrem(60px);
          &:last-of-type {
            margin-bottom: 0;
          }
          .title {
            span {
              display: inline-block;
              width: pxrem(24px);
              height: pxrem(24px);
              border-radius: 50%;
              margin-right: pxrem(15px);
              &.one {
                background-color: #E8854A;
              }
              &.two {
                background-color: #2684FA;
              }
              &.three {
                background-color: #DE4646;
              }
              &.four {
                background-color: #1AC8C6;
              }
            }
          }
          .num {
            padding: pxrem(10px) 0 0 pxrem(35px);
          }
        }
      }
    }
  }
}
</style>