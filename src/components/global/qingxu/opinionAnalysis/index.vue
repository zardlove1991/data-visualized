<template>
  <div class="qx-opinionAnalysis" id="qx-opinionAnalysis">
    <div class="opinion-analysis-wrap sys-flex flex-justify-between sys-vertical">
      <!-- <swiper :options="swiperOption" ref="mySwiper" >
        <swiper-slide v-for="(v) in 10" :key="v">
          {{v}}
        </swiper-slide>
      </swiper> -->
      <div class="data-title overhidden">{{localNews.title}}</div>
      <div class="data-echarts sys-flex flex-justify-between">
        <div class="sentiment-analysis sys-flex flex-justify-between sys-vertical">
          <div class="sentiment-title"></div>
          <div class="chart-box">
            <chart :options="sentimentOpt" :autoResize="true"></chart>
          </div>
        </div>
        <div class="line"></div>
        <div class="key-word sys-flex flex-justify-between sys-vertical">
          <div class="key-title"></div>
          <div class="chart-box">
            <chart :options="keyOpt" :autoResize="true"></chart>
          </div>
        </div>
        <div class="line"></div>
        <div class="geographical-analysis sys-flex flex-justify-between sys-vertical">
          <div class="geographical-title"></div>
          <div class="chart-box">
            <chart :options="geoOpt" :autoResize="true"></chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/gauge'
import 'echarts-wordcloud'
import { getHotsTopicList, getHotsTopicEmotion, getHotsTopicPubArea, getHotsTopicHotWord } from '@/servers/qingxu'
export default {
  name: 'opinionAnalysis',
  components: {
    swiper,
    swiperSlide,
    chart: echarts
  },
  data () {
    return {
      localList: [],
      localNews: {},
      localIndex: 0,
      newsList: [],
      page: 1,
      count: 12,
      curIndex: 0,
      curId: null,
      sentimentData: {
        series: []
      },
      keyWordsList: [],
      areaData: {
        geo: [{ value: 0 }],
        reg: [{ value: 0 }]
      }
    }
  },
  computed: {
    sentimentOpt () {
      return {
        color: ['#ce4272', '#0554f5', '#f3972e', '#008aed', '#14da7d'],
        textStyle: {
          color: '#fff'
        },
        series: [
          {
            name: '情感分析',
            type: 'pie',
            // center: ['45%', '50%'],
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                formatter: '{b}: {d}%',
                textStyle: {
                  color: 'rgba(214, 230, 255, 0.5)',
                  fontSize: this.proportion * 14,
                  fontWeight: 'bold'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: this.proportion * 18,
                  fontWeight: 'bold',
                  color: 'rgba(214, 230, 255, 0.5)'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.sentimentData.series
          }
        ]
      }
    },
    geoOpt () {
      return {
        color: ['#4da2fe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: this.proportion * 15,
          right: this.proportion * 15,
          top: this.proportion * 15,
          bottom: this.proportion * 15,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              fontSize: this.proportion * 12
            },
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            data: this.areaData.geo.slice(0, 7).map(v => v.name)
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              interval: 15,
              formatter: '{value}%',
              fontSize: this.proportion * 12,
              textStyle: {
                // fontSize:'13'
              }
            },
            axisTick: {
              show: false,
              fontSize: this.proportion * 12,
              alignWithLabel: true
            },
            color: '#fff',
            axisLine: {
              lineStyle: {
              // show:false,
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            splitLine: {
              // interval:15,
              lineStyle: {
                color: ['rgba(113,164,242,0.1)'],
                width: '1',
                type: 'solid'
              }
            },
            axisPointer: {
              show: true
            }
          }
        ],
        series: [
          {
            name: '地域分布',
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{c}%',
                  color: '#ffffff',
                  fontSize: this.proportion * 10
                },
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 1, color: '#0066FF' },
                    { offset: 0, color: '#18BBFF' }
                  ]
                )
              }
            },
            data: this.areaData.geo.slice(0, 7).map(v => v.value)
          }
        ]
      }
    },
    keyOpt () {
      return {
        series: [
          {
            type: 'wordCloud',
            gridSize: this.proportion * 20,
            sizeRange: [10, 30],
            rotationRange: [0, 90],
            rotationStep: 90,
            shape: 'square',
            width: '80%',
            height: '80%',
            textStyle: {
              normal: {
                color: function () {
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255)
                    ].join(',') +
                    ')'
                  )
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: this.keyWordsList
          }
        ]
      }
    }
  },
  watch: {
    curId: {
      handler: function (newValue) {
        this.getHotTopicDetail()
      }
    }
  },
  created () {
    // this.initNewsList()
    // setInterval(() => {
    //   this.curIndex += 1
    //   if (this.curIndex > 3 || this.curIndex >= this.newsList.length) {
    //     this.curIndex = 0
    //     this.page++
    //     this.initNewsList()
    //   } else {
    //     this.curId = this.newsList[this.curIndex]['id']
    //   }
    // }, 15000)

    // 本地模拟分页效果
    this.initLocalList()
    setInterval(() => {
      this.localIndex += 1
      if (this.localIndex <= 11) {
        setTimeout(() => {
          this.localNews = this.localList[this.localIndex]
          this.curId = this.localNews['id']
        }, 100)
      } else {
        this.localIndex = 0
        this.initLocalList()
      }
    }, 15000)
  },
  mounted () {
    this.proportion = this.getProportion('xy-hot')
    this.setFontsize('qx-opinionAnalysis')
  },

  methods: {
    // 本地模拟分页效果
    initLocalList () {
      getHotsTopicList(this.count).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.localList = res.data.result.data
            this.localNews = this.localList[this.localIndex]
            this.curId = this.localNews['id']
          }
        }
      })
    },
    // 初始化新闻列表
    initNewsList () {
      // getHotTopicList(this.count, this.page).then(res => {
      //   if (!res.data.error_code) {
      //     if (res.data.result.data.length) {
      //       this.newsList = []
      //       setTimeout(() => {
      //         this.newsList = res.data.result.data
      //         // this.curId = this.newsList[this.curIndex]['id']
      //       }, 100)
      //     } else {
      //       this.page = 1
      //     }
      //   }
      // })
    },

    // 获取详细数据
    getHotTopicDetail () {
      getHotsTopicEmotion(this.curId).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.sentimentData.series = res.data.result.map(v => {
            return {
              value: v.count,
              name: v.name_zh
            }
          })
        }
      })
      getHotsTopicPubArea(this.curId).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          let total = res.data.result.reduce((past, cur) => past + cur.count, 0)
          this.areaData.geo = res.data.result.map(v => {
            return {
              value: parseInt(v.count / total * 100),
              name: v.name_zh.replace(/省|市|自治区|维吾尔|壮族|回族/g, '')
            }
          })
        }
      })
      getHotsTopicHotWord(this.curId).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.keyWordsList = res.data.result.map(v => {
            return {
              value: v.count,
              name: v.name_zh
            }
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'src/styles/index.scss';
.qx-opinionAnalysis {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(40px);
  .opinion-analysis-wrap {
    width: 100%;
    height: 100%;
    padding: pxrem(150px) pxrem(72px) pxrem(20px);
    background: url('./assets/border.png') no-repeat center center;
    background-size: 100% 100%;
    .data-title {
      width: 100%;
      height: 1.5em;
      font-size: pxrem(48px);
      color: #00FFE4;
    }
    .data-echarts {
      width: 100%;
      height: calc(100% - 1rem);
      .sentiment-analysis {
        width: 24%;
        .sentiment-title {
          height: pxrem(88px);
          width: pxrem(330px);
          background: url('./assets/sentiment.png') no-repeat center center;
          background-size: 100% 100%;
        }
        .chart-box {
          height: 80%;
        }
      }
      .key-word {
        width: 26%;
        .key-title {
          height: pxrem(88px);
          width: pxrem(330px);
          background: url('./assets/keyword.png') no-repeat center center;
          background-size: 100% 100%;
        }
        .chart-box {
          height: 80%;
        }
      }
      .geographical-analysis {
        width: 45%;
        .geographical-title {
          height: pxrem(88px);
          width: pxrem(330px);
          background: url('./assets/area.png') no-repeat center center;
          background-size: 100% 100%;
        }
        .chart-box {
          height: 80%;
        }
      }
      .line {
        height: 100%;
        width: 0.1rem;
        background: url('./assets/border.png') no-repeat center center;
        // background-size: 100% 100%;
      }
    }
  }
}
</style>
