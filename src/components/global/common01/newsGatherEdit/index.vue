<template>
  <div class="newsgatheredit" id="newsgatheredit">
    <div class="newsgatheredit-wrap">
      <div class="top-total sys-flex sys-flex-center">
        <div class="total-text">内容总数：</div>
        <div class="total-num sys-flex sys-flex-center">
          <div class="num-list hg-flex"  v-for="(v, k) in content_amount" :key="k"><span>{{v}}</span></div>
        </div>
      </div>
      <div class="new_add sys-flex sys-flex-center flex-justify-between">
        <div class="new_left new_div">
          <div class="title">今日新增</div>
          <div class="num"><p>{{today_create_amount}}</p></div>
        </div>
        <div class="new_middle new_div">
          <div class="title">本周新增</div>
          <div class="num"><p>{{week_create_amount}}</p></div>
        </div>
        <div class="new_right new_div">
          <div class="title">本月新增</div>
          <div class="num"><p>{{month_create_amount}}</p></div>
        </div>
      </div>
      <div class="wrap-bottom">
        <div class="type"></div>
        <div class="echart_div sys-flex sys-flex-center flex-justify-between">
          <div class="echart_left">
            <chart :options="barOptions1" :autoResize="true"></chart>
          </div>
          <div class="echart_right">
            <chart :options="barOptions2" :autoResize="true"></chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { newsPro } from '@/servers/interface'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/line'
export default {
  name: 'newsGatherEdit',
  data () {
    return {
      content_amount: [],
      today_create_amount: '',
      week_create_amount: '',
      month_create_amount: '',
      barOptions1: {
        legend: {
          icon: 'rect',
          data: ['文稿', '图集', '视频', '专题'],
          textStyle: {
            color: '#fff',
            fontSize: 34
          },
          itemWidth: 40,
          itemHeight: 14,
          itemGap: 35,
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
            radius: ['40%', '70%'],
            center: ['50%', '35%'], // 图的位置，距离左跟上的位置
            avoidLabelOverlap: false,
            itemStyle: {
              // borderRadius: 20,
              borderColor: '#07093A',
              borderWidth: 20
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
                  borderWidth: 5,
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      },
      barOptions2: {
        xAxis: {
          type: 'category',
          data: ['文稿', '图集', '视频', '专题'],
          axisLabel: {
            fontWeight: 'bold',
            show: true,
            interval: 0,
            textStyle: {
              color: '#ccc'
            },
            fontSize: 34
          }
        },
        barWidth: 90,
        yAxis: {
          type: 'value',
          show: false,
          splitLine: {
            show: false
          }
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          top: 30,
          containLabel: true
        },
        series: [{
          data: [],
          type: 'bar',
          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示
                position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: '#fff',
                  fontSize: 40
                }
              },
              color: function (params) {
                var colorlist = ['#0D5EE4', '#01C0FF', '#E8854A', '#791FE2']
                return colorlist[params.dataIndex]
              }
            }
          }
        }]
      }
    }
  },
  mounted () {
    this.setFontsize('newsgatheredit')
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 1920 * 100 + 'px'
  },
  created () {
    this.newsPro()
  },
  methods: {
    newsPro () {
      newsPro().then(res => {
        if (!res.data.error_code) {
          // 总内容
          // console.log(res.data);
          let allVal = res.data.result.content_amount.toString()
          let allValLength = allVal.length
          let chaAllValLength = 10 - allValLength
          for (let i = 0; i < chaAllValLength; i++) {
            this.content_amount.push(0)
          }
          for (let j = 0; j < allValLength; j++) {
            this.content_amount.push(allVal[j])
          }
          this.today_create_amount = res.data.result.today_create_amount
          this.week_create_amount = res.data.result.week_create_amount
          this.month_create_amount = res.data.result.month_create_amount
          let articleSum = res.data.result.publish_num.article
          let gallerySum = res.data.result.publish_num.gallery
          let videoSum = res.data.result.publish_num.video
          let topicSum = res.data.result.publish_num.topic
          this.barOptions1.series[0].data.push({value: articleSum, name: '文稿'}, {value: gallerySum, name: '图集'}, {value: videoSum, name: '视频'}, {value: topicSum, name: '专题'})
          this.barOptions2.series[0].data.push(articleSum, gallerySum, videoSum, topicSum)
          this.barOptions1.legend.formatter = function (name) {
            var data = []
            data.push({value: articleSum, name: '文稿'}, {value: gallerySum, name: '图集'}, {value: videoSum, name: '视频'}, {value: topicSum, name: '专题'})
            var total = 0
            var tarValue
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value
              if (data[i].name === name) {
                tarValue = data[i].value
              }
            }
            var p = (tarValue / total * 100).toFixed(0)
            return ' ' + ' ' + name + ' ' + ' ' + p + '%'
          }
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
.newsgatheredit {
  width: pxrem(1920px);
  height: pxrem(1080px);
  padding: pxrem(27px) pxrem(50px);
  position: relative;
  background: #0b072d;
  box-sizing: border-box;
  .newsgatheredit-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(99px) pxrem(115px) pxrem(0px);
    color: #fff;
    box-sizing: border-box;
    .top-total{
      width: 100%;
      height: pxrem(90px);
      border: pxrem(1px) solid #0896fa;
      box-sizing: border-box;
      padding-left: pxrem(120px);
      .total-text {
        font-size: pxrem(50px);
        font-weight: 600;
        width: pxrem(280px);
        margin-right: pxrem(50px);
        transform: scale(1,0.5);
      }
      .total-num {
        .num-list {
          width: pxrem(95px);
          height: pxrem(55px);
          background: url('./assets/numBack.png') no-repeat center;
          margin-right: pxrem(8px);
          &:last-of-type {
            margin-right: 0;
          }
          span {
            font-size: pxrem(50px);
            color: #00FFF6;
            transform: scale(1,0.5);
          }
          span.zero{
            color: #719be2;
          }
        }
      }
    }
    .new_add{
      margin-top: pxrem(48px);
      .new_div{
        width: pxrem(500px);
        height: pxrem(250px);
        background: rgba(0,152,248,0.08);
        box-sizing: border-box;
        padding-top: pxrem(15px);
        position: relative;
        .title{
          font-size: pxrem(44px);
          color: #fff;
          font-weight: 500;
          text-align: center;
          transform: scale(1,0.5);
        }
        .num{
          width: pxrem(374px);
          height: pxrem(175px);
          font-size: pxrem(64px);
          font-weight: bold;
          color: #00ffe2;
          background: url("./assets/new_bg.png") no-repeat center pxrem(25px);
          background-size: 100% 100%;
          position: absolute;
          bottom: pxrem(0px);
          left: 50%;
          transform: translateX(-50%);
          p{
            text-align: center;
            transform: scale(1,0.5);
          }
        }
      }
    }
    .wrap-bottom{
      margin-top: pxrem(62px);
      .type{
        width: pxrem(350px);
        height: pxrem(44px);
        background: url("./assets/typeBg.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: pxrem(19px);
      }
      .echart_div{
        .echart_left{
          width: pxrem(700px);
          height: pxrem(350px);
        }
        .echart_right{
          width: pxrem(794px);
          height: pxrem(350px);
        }
      }
    }
  }
}
</style>