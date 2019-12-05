<template>
  <div class="jn-news">
    <div class="news-wrap">
      <div class="wrap-title">稿件统计</div>
      <div class="wrap-content sys-flex flex-justify-between">
        <div class="content-left">
          <div class="left-title sys-flex sys-flex-center flex-justify-center">本周稿件总数<span>598</span></div>
          <div class="left-one sys-flex sys-flex-center flex-justify-between">
            <div class="pass">
              <div>已通过</div>
              <div>497</div>
            </div>
            <div class="examine">
              <div>待审核</div>
              <div>598</div>
            </div>
            <div class="publish">
              <div>待发布</div>
              <div>426</div>
            </div>
          </div>
          <div class="left-two sys-flex sys-flex-center flex-justify-between">
            <div class="two-progress">
              <div class="percent">95%</div>
              <div class="progress-total">
                <span class="progress on-progress" :style="{'width' : 95 + '%'}"></span>
              </div>
              <div class="article">稿件通过率</div>
            </div>
            <div class="two-progress">
              <div class="percent">87%</div>
              <div class="progress-total">
                <span class="progress on-progress" :style="{'width' : 87 + '%'}"></span>
              </div>
              <div class="article">稿件发布率</div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="date sys-flex sys-flex-center flex-justify-between">
            <div class="day" v-for="(v, k) in dayList" :key="k" :class="{'active': k === currentIndex}">{{v}}</div>
          </div>
          <div class="publish-article">已发布稿件<span>298</span></div>
          <div class="line">
            <chart :options="barOptions" :autoResize="true"></chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
export default {
  name: 'news',
  data () {
    return {
      currentIndex: 0,
      dayList: ['今日', '本周', '本月'],
      barOptions: {
        xAxis: {
          type: 'category',
          data: ['待审核', '已打回', '已通过', '已发布'],
          axisLabel: {
            interval: 0,
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold'
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
            formatter: '{value}',
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold'
          }
        },
        series: [{
          type: 'bar',
          name: '阅读量',
          barWidth: 45,
          itemStyle: {
            normal: {
              // 颜色渐变
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#3FB0FF'
              }, {
                offset: 1,
                color: '#003CFF'
              }])
            }
          },
          data: [10, 50, 5, 20]
        }]
      }
    }
  },
  mounted () {
    setInterval(() => {
      this.currentIndex++
      if (this.currentIndex >= this.dayList.length) {
        this.currentIndex = 0
      }
    }, 5000)
  },
  components: {
    chart: echarts
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-news {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .news-wrap {
    width: 100%;
    height: 100%;
    background: url('../../../../assets/common/border@2x.png') no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(30px);
    color: #fff;
    .wrap-title {
      font-size: pxrem(50px);
      font-weight: 600;
      margin-top: pxrem(-16px);
      margin-bottom: pxrem(40px);
    }
    .wrap-content {
      .content-left {
        width: pxrem(820px);
        .left-title {
          width: 100%;
          height: pxrem(160px);
          background-color: #0B295E;
          font-size: pxrem(40px);
          span {
            font-size: pxrem(60px);
            color: #FF3C3C;
            margin-left: pxrem(39px);
          }
        }
        .left-one {
          width: 100%;
          height: pxrem(325px);
          background-color: #0B204C;
          font-size: pxrem(34px);
          border-bottom: 1px solid #fff;
          padding: 0 pxrem(87px) 0 pxrem(75px);
          .pass {
            div:last-of-type {
              color: #00F6FF;
              font-size: pxrem(56px);
              margin-top: pxrem(8px);
            }
          }
          .examine {
            div:last-of-type {
              color: #2684FA;
              font-size: pxrem(56px);
              margin-top: pxrem(8px);
            }
          }
          .publish {
            div:last-of-type {
              color: #FF9A02;
              font-size: pxrem(56px);
              margin-top: pxrem(8px);
            }
          }
        }
        .left-two {
          width: 100%;
          height: pxrem(334px);
          background-color: #0B204C;
          padding: 0 pxrem(87px) 0 pxrem(75px);
          .two-progress {
            .percent {
              font-size: pxrem(60px);
              color: #00F6FF;
            }
            .progress-total {
              width: pxrem(240px);
              height: pxrem(20px);
              background: RGBA(68, 97, 115, 1);
              border-radius: pxrem(10px);
              overflow: hidden;
              margin: pxrem(20px) 0;
              .progress {
                display: block;
                height: 100%;
                border-radius: pxrem(10px);
                &.on-progress {
                  background: -webkit-linear-gradient(left, #0272ff, #80bfff);
                  background: -o-linear-gradient(right, #0272ff, #80bfff);
                  background: -moz-linear-gradient(right, #0272ff, #80bfff);
                  background: linear-gradient(to right, #0272ff, #80bfff);
                }
                &.on-stop {
                  background: #ff3366;
                }
                &.on-done {
                  background: -webkit-linear-gradient(left, #09de74, #2ff6c5);
                  background: -o-linear-gradient(right, #09de74, #2ff6c5);
                  background: -moz-linear-gradient(right, #09de74, #2ff6c5);
                  background: linear-gradient(to right, #09de74, #2ff6c5);
                }
              }
            }
            .article {
              font-size: pxrem(34px);
            }
          }
        }
      }
      .content-right {
        width: 50%;
        .date {
          padding: 0 pxrem(80px);
          .day {
            width: pxrem(140px);
            height: pxrem(60px);
            border-radius: pxrem(8px);
            background-color: #2684FA;
            font-size: pxrem(34px);
            line-height: pxrem(60px);
            &.active {
              background-color: #FF9A02;
            }
          }
        }
        .publish-article {
          font-size: pxrem(34px);
          span {
            color: #00FF9C;
            font-size: pxrem(56px);
            margin-left: pxrem(25px);
          }
          margin: pxrem(30px) 0 pxrem(20px);
        }
        .line {
          width: 100%;
          height: pxrem(670px);
        }
      }
    }
  }
}
</style>