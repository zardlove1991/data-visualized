<template>
  <div class="newsgatheredit" id="newsgatheredit">
    <div class="newsgatheredit-wrap">
      <div class="top-total sys-flex sys-flex-center">
        <div class="total-text">内容总数：</div>
        <div class="total-num sys-flex sys-flex-center">
          <div class="num-list hg-flex"><span class="zero">0</span></div>
          <div class="num-list hg-flex"><span class="zero">0</span></div>
          <div class="num-list hg-flex"><span class="zero">0</span></div>
          <div class="num-list hg-flex"><span>1</span></div>
          <div class="num-list hg-flex"><span>0</span></div>
          <div class="num-list hg-flex"><span>2</span></div>
          <div class="num-list hg-flex"><span>1</span></div>
          <div class="num-list hg-flex"><span>9</span></div>
          <div class="num-list hg-flex"><span>1</span></div>
          <div class="num-list hg-flex"><span>9</span></div>
        </div>
      </div>
      <div class="new_add sys-flex sys-flex-center flex-justify-between">
        <div class="new_left new_div">
          <div class="title">今日新增</div>
          <div class="num">625</div>
        </div>
        <div class="new_middle new_div">
          <div class="title">本周新增</div>
          <div class="num">1,589</div>
        </div>
        <div class="new_right new_div">
          <div class="title">本月新增</div>
          <div class="num">48,917</div>
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
      barOptions1: {
        // tooltip: {
        //   trigger: 'item'
        // },
        legend: {
          icon: 'rect',
          data: ['文稿', '图集', '视频', '专题'],
          textStyle: {
            color: '#fff',
            fontSize: 40
          },
          itemWidth: 34,
          itemHeight: 26,
          itemGap: 60,
          padding: [0, 15, 0, 0],
          x: 'center',
          y: 'bottom',
          formatter: function (name) {
            var data = [
              {value: 12, name: '文稿'},
              {value: 20, name: '图集'},
              {value: 16, name: '视频'},
              {value: 52, name: '专题'}
            ]
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
        },
        grid: {
          // bottom: '60%',
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
                  return data.percent + '%\n\n' + data.name
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '46',
                  color: '#fff',
                  borderWidth: 5,
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 12, name: '文稿'},
              {value: 20, name: '图集'},
              {value: 16, name: '视频'},
              {value: 52, name: '专题'}
            ]
          }
        ]
      },
      barOptions2: {
        xAxis: {
          type: 'category',
          data: ['文稿', '图集', '视频', '外链'],
          axisLabel: {
            fontWeight: 'bold',
            show: true,
            interval: 0,
            textStyle: {
              color: '#ccc'
            },
            fontSize: '40'
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
          top: '0%',
          containLabel: true
        },
        series: [{
          data: [12, 20, 16, 52],
          type: 'bar',
          // showBackground: true,
          // backgroundStyle: {
          //   color: 'rgba(180, 180, 180, 0.2)'
          // },
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
  },
  components: {
    chart: echarts
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.newsgatheredit {
  width: 100%;
  height: 100%;
  padding: pxrem(58px) pxrem(50px) pxrem(53px) pxrem(50px);
  position: relative;
  background: #0b072d;
  .newsgatheredit-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(198px) pxrem(126px) pxrem(0px);
    color: #fff;
    .top-total{
      width: 100%;
      height: pxrem(180px);
      border: pxrem(1px) solid #0896fa;
      box-sizing: border-box;
      padding-left: pxrem(120px);
      .total-text {
        font-size: pxrem(52px);
        font-weight: 600;
        width: pxrem(280px);
        margin-right: pxrem(50px);
      }
      .total-num {
        .num-list {
          width: pxrem(95px);
          height: pxrem(110px);
          background: url('./assets/numBack.png') no-repeat center;
          margin-right: pxrem(8px);
          &:last-of-type {
            margin-right: 0;
          }
          span {
            font-size: pxrem(72px);
            color: #00FFF6;
          }
          span.zero{
            color: #719be2;
          }
        }
      }
    }
    .new_add{
      margin-top: 0.97rem;
      .new_div{
        width: pxrem(500px);
        height: pxrem(500px);
        background: rgba(0,152,248,0.08);
        box-sizing: border-box;
        padding-top: pxrem(50px);
        position: relative;
        .title{
          font-size: pxrem(44px);
          color: #fff;
          font-weight: 500;
          text-align: center;
        }
        .num{
          width: pxrem(374px);
          height: pxrem(350px);
          font-size: pxrem(64px);
          font-weight: bold;
          color: #00ffe2;
          background: url("./assets/new_bg.png") no-repeat center bottom;
          position: absolute;
          bottom: pxrem(0px);
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .wrap-bottom{
      margin-top: pxrem(125px);
      .type{
        width: pxrem(350px);
        height: pxrem(88px);
        background: url("./assets/typeBg.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: pxrem(38px);
      }
      .echart_div{
        .echart_left{
          width: pxrem(700px);
          height: pxrem(700px);
        }
        .echart_right{
          width: pxrem(794px);
          height: pxrem(700px);
        }
      }
    }
  }
}
</style>