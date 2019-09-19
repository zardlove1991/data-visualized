<template>
  <div class="xy-hot" id="xy-hot">
    <div class="hot-wrap sys-flex sys-vertical">
      <div class="hot-title hidden">{{hotNews.title}}</div>
      <div class="hot-charts sys-flex sys-flex-wrap flex-justify-between">
        <div class="heat-trend chart-box">
          <chart :options="heatOpt" :autoResize="true"></chart>
        </div>
        <div class="sentiment-analysis chart-box">
          <chart :options="sentimentOpt" :autoResize="true"></chart>
        </div>
        <div class="geographical-distribution chart-box">
          <chart :options="geoOpt" :autoResize="true"></chart>
        </div>
        <div class="regional-distribution chart-box">
          <chart :options="regionalOpt" :autoResize="true"></chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotTopicList, getTopicTrend, getTopicEmotion, getTopicPubArea } from '@/servers/xinyi'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import china from 'echarts/map/json/china.json'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
echarts.registerMap('china', china)
export default {
  name: 'hotStats',
  components: {
    chart: echarts
  },
  data () {
    return {
      hotNews: {},
      list: [],
      count: 0,
      proportion: 1,
      heatData: {
        xAxis: [],
        series: []
      },
      sentimentData: {
        series: []
      },
      areaData: {
        geo: []
      },
      seriesData: []
    }
  },
  computed: {
    heatOpt () {
      return {
        color: ['#14da7d', '#8c6bf9', '#f36764', '#005edd'],
        title: {
          text: '分渠道热度走势',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 18
          }
        },
        grid: {
          bottom: this.proportion * 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['网站', '微信', '微博'],
          right: this.proportion * 60,
          top: this.proportion * 20,
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 14
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            name: '日期',
            // nameLocation:'start',
            nameGap: 5,
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            axisTick: {
              show: false,
              // interval:15,
              alignWithLabel: true
            },
            data: this.heatData.xAxis
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              // formatter: '{value} °C'
              formatter: '{value}'
            },
            name: '访问量',
            nameGap: 10,
            color: '#fff',
            axisTick: {
              show: false,
              // interval:15,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            splitLine: {
              // show:false
              lineStyle: {
                color: ['rgba(113,164,242,0.3)'],
                width: '1',
                type: 'dashed'
              }
            },
            axisPointer: {
              show: true
            }
          }
        ],
        series: this.heatData.series
      }
    },
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
        title: {
          text: '地域分布Top5',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 18
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          bottom: this.proportion * 30,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            // axisLabel: {
            //   interval: 0,
            //   rotate: -45
            // },
            data: this.areaData.geo.slice(0, 5).map(v => v.name)
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              interval: 15,
              formatter: '{value}',
              textStyle: {
                // fontSize:'13'
              }
            },
            axisTick: {
              show: false,
              // interval:15,
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
                  formatter: '{c}'
                }
              }
            },
            data: this.areaData.geo.slice(0, 5).map(v => v.value)
          }
        ]
      }
    },
    regionalOpt () {
      return {
        title: {
          text: '区域分布',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 18
          }
        },
        tooltip: {
          show: false,
          trigger: 'item'
        },
        visualMap: {
          show: false,
          min: 0,
          max: this.areaData.geo[0].value,
          left: 'center',
          top: 'bottom',
          inRange: {
            color: ['#6d9ce6', '#0763f3']
          },
          textStyle: {
            color: '#fff'
          },
          itemWidth: 10,
          itemHeight: 70,
          text: ['高', '低'],
          calculable: true
        },
        series: [
          {
            name: '区域分析',
            type: 'map',
            mapType: 'china',
            left: 'center',
            showLegendSymbol: true,
            roam: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#567bb6'
              },
              emphasis: {
                areaColor: '#567bb6'
              }
            },
            data: this.areaData.geo
          }
        ]
      }
    }
  },
  watch: {
    'hotNews.eventId': {
      handler (newValue) {
        this.getEchartData(newValue)
      }
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.proportion = this.getProportion('xy-hot') * 1.5
    this.setFontsize('xy-hot')
  },
  methods: {
    getDataList () {
      getHotTopicList().then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.list = res.data.result
          this.initList()
        }
      })
    },

    getEchartData (value) {
      getTopicTrend(value).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.heatData.xAxis = res.data.result[0].count.map(v => v.field.slice(5))
          this.heatData.series = res.data.result.map(v => {
            return {
              name: v.name_zh,
              smooth: true,
              type: 'line',
              data: v.count.map(c => c.value)
            }
          })
        }
      })
      getTopicEmotion(value).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.sentimentData.series = res.data.result.map(v => {
            return {
              value: v.count,
              name: v.name_zh
            }
          })
        }
      })
      getTopicPubArea(value).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.areaData.geo = res.data.result.map(v => {
            return {
              value: v.count,
              name: v.name_zh
            }
          })
        }
      })
    },

    initList () {
      this.hotNews = this.list[this.count]
      this.count++
      this.listInterval = setInterval(() => {
        if (this.count < this.list.length) {
          this.hotNews = ''
          setTimeout(() => {
            this.hotNews = this.list[this.count]
            this.count++
          }, 100)
        } else {
          this.dataList = ''
          clearInterval(this.listInterval)
          this.count = 0
          this.getDataList()
        }
      }, 10000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.xy-hot {
  width: 100%;
  padding: px1em(14px);
  .hot-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/f-top-right.png") no-repeat center;
    background-size: 100% 100%;
    padding: px1em(17px) px1em(11px);
  }
  .hot-title {
    height: px1em(100px);
    text-align: center;
    font-size: px1em(11px);
    color: #d6e6ff;
  }
  .hidden {
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .hot-charts {
    flex: 1;
    .chart-box {
      width: 50%;
      height: 45%;
      .echarts {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
