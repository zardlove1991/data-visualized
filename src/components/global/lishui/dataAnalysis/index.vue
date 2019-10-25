<template>
  <div class="main-wrap" id="ls-dataAnalysis">
    <div class="data-analysis-wrap sys-flex flex-justify-between">
      <div class="data-analysis-list sys-flex sys-vertical flex-justify-between">
        <div
          v-show="typeActive == 'internet'"
          class="data-list animated sys-flex sys-vertical flex-justify-between"
          v-for="(v , k) in newsList"
          :key="k"
          :class="{'active' : curIndex == k,'fadeInLeft' : v.topic_name}"
          v-bind:style="{'animation-delay' : k/2+'s'}"
        >
          <div class="data-title overhidden">{{v.topic_name}}</div>
          <div class="data-brief">{{v.topic_info}}</div>
        </div>
      </div>
      <div class="data-echarts sys-flex sys-vertical flex-justify-between">
        <div class="echarts-top sys-flex flex-justify-between">
          <div class="data-channel">
            <p v-if="typeActive == 'internet'" class="channel-title">分渠道数据分析</p>
            <div class="channel-box">
              <chart v-if="typeActive == 'internet'" :options="lineOptions" :autoResize="true"></chart>
            </div>
          </div>
          <div class="data-media">
            <p v-if="typeActive == 'internet'" class="media-title">媒体占比</p>
            <div class="media-box">
              <chart v-if="typeActive == 'internet'" :options="pieOptions" :autoResize="true"></chart>
            </div>
          </div>
        </div>
        <div class="echarts-bottom">
          <div class="data-source">
            <p v-if="typeActive == 'internet'" class="source-title">TOP 10 活跃新闻媒体来源</p>
            <div class="source-box">
              <chart v-if="typeActive == 'internet'" :options="top10options" :autoResize="true"></chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/gauge'
import { getHotTopicList, getHotTopicDetail } from '@/servers/lishui'
export default {
  name: 'dataAnalysis',
  data () {
    return {
      typeActive: 'internet',
      newsList: [],
      localNewsList: [],
      page: 1,
      size: 4,
      currentNewsData: {
        title: '',
        result: {
          media_distribution: {},
          sex_scale: {},
          emotion: [],
          age: [],
          area: {}
        }
      },
      top10options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '2%',
          right: '0%',
          bottom: '4%',
          top: '7%',
          containLabel: true
        },
        // calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLabel: {
              interval: 0,
              rotate: 20,
              color: '#fff',
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            gridIndex: 0,
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
              color: '#fff',
              fontSize: 12,
              formatter: '{value}',
              interval: 30
            },

            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            }
          }
        ],
        series: [
          {
            name: '文稿',
            type: 'bar',
            barCategoryGap: '60%',
            barWidth: '60%',
            itemStyle: {
              normal: {
                color: '#0541ff',
                width: 15,
                lineStyle: {
                  color: '#0541ff'
                },
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 14,
                    color: 'white'
                  }
                }
              }
            },
            data: []
          }
        ]
      },
      pieOptions: {
        title: {
          text: '',
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 0,
          icon: 'circle',
          textStyle: {
            color: '#fff',
            fontSize: 8
          }
        },
        series: [
          {
            name: '发布渠道占比',
            type: 'pie',
            radius: ['20%', '70%'],
            minAngle: 5,
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                length: 2,
                // formatter: '{b}:{d}%',
                formatter: '{d}%',
                position: 'outside'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 12,
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 20
              }
            },
            data: []
          }
        ]
      },
      lineOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          orient: 'vertical',
          right: 0,
          icon: 'circle',
          textStyle: {
            color: '#fff',
            fontSize: 8
          },
          data: []
        },

        grid: {
          left: '0%',
          right: '0%',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: [1, 2, 3],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            gridIndex: 0,
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
              color: '#fff',
              fontSize: 10,
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            }
          }
        ],
        series: []
      },

      localbar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '3%',
          top: '5%',
          containLabel: true
        },
        // calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLabel: {
              interval: 0,
              rotate: 20,
              color: '#fff',
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            gridIndex: 0,
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
              color: '#fff',
              fontSize: 12,
              formatter: '{value}',
              interval: 30
            },

            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            }
          }
        ],
        series: [
          {
            name: '文稿',
            type: 'bar',
            barCategoryGap: '60%',
            barWidth: '60%',
            itemStyle: {
              normal: {
                color: '#0541ff',
                width: 15,
                lineStyle: {
                  color: '#0541ff'
                },
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 14,
                    color: 'white'
                  }
                }
              }
            },
            data: []
          }
        ]
      },
      localpie: {
        title: {
          text: '',
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 0,
          icon: 'circle',
          textStyle: {
            color: '#fff',
            fontSize: 8
          }
        },
        series: [
          {
            name: '发布渠道占比',
            type: 'pie',
            radius: ['20%', '70%'],
            minAngle: 5,
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                length: 2,
                // formatter: '{b}:{d}%',
                formatter: '{d}%',
                position: 'outside'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 12,
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 20
              }
            },
            data: []
          }
        ]
      },
      localline: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          orient: 'vertical',
          right: 0,
          icon: 'circle',
          textStyle: {
            color: '#fff',
            fontSize: 8
          },
          data: []
        },

        grid: {
          left: '0%',
          right: '0%',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            inverse: true
          }
        ],
        yAxis: [
          {
            type: 'value',
            gridIndex: 0,
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
              color: '#fff',
              fontSize: 10,
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            }
          }
        ],
        series: []
      },

      type: {
        '21': '媒体站点',
        '22': '博客',
        '23': '论坛贴吧',
        '24': '视频站点',
        '25': '电子报',
        '26': '其他',
        '104': '微信公众号',
        '303': '新浪微博',
        '100': '腾讯社交',
        '102': '浏览器',
        '103': '手机管家'
      },
      curIndex: 0,
      loaclCurIndex: 0
    }
  },
  components: {
    chart: echarts
  },

  created () {
    this.initNewsList()
    setInterval(() => {
      if (this.typeActive === 'internet') {
        this.curIndex += 1
        if (this.curIndex > 3 || this.curIndex >= this.newsList.length) {
          this.curIndex = 0
          this.initNewsList()
        }
        this.getHotTopicDetail()
      }
    }, '10000')
  },
  mounted () {
    this.setFontsize('ls-dataAnalysis')
  },

  methods: {

    // 初始化新闻列表
    initNewsList () {
      getHotTopicList(1, this.size).then(response => {
        this.newsList = []
        setTimeout(() => {
          this.newsList = response.data.result
          if (this.curIndex === 0) {
            this.getHotTopicDetail()
          }
        }, 100)
      })
    },

    // 获取详细数据
    getHotTopicDetail () {
      let id = this.newsList[this.curIndex]['topic_id']
      // var lineArray = {}
      var _this = this
      let index = this.curIndex + 1 === 5 ? 1 : this.curIndex + 1
      getHotTopicDetail(id, index).then(response => {
        if (response.data.result && response.data.result.channel_list) {
          _this.lineOptions.legend.data = []
          this.lineOptions.xAxis[0].data = []
          this.lineOptions.series = []
          this.lineOptions.xAxis[0].data = response.data.result.channel_list.x
          for (
            let i = 0;
            i < Object.values(response.data.result.channel_list.y).length;
            i++
          ) {
            _this.lineOptions.legend.data.push(
              _this.type[Object.keys(response.data.result.channel_list.y)[i]]
            )
            _this.lineOptions.series.push({
              type: 'line',
              name:
                _this.type[Object.keys(response.data.result.channel_list.y)[i]],
              smooth: true,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'white'
                    }
                  }
                }
              },
              data: Object.values(response.data.result.channel_list.y)[i]
            })
          }
        }
        if (response.data.result && response.data.result.list) {
          this.pieOptions.series[0].data = []
          for (var i = 0; i < response.data.result.list.length; i++) {
            this.pieOptions.series[0].data.push({
              value: response.data.result.list[i]['heat'],
              name: this.type[response.data.result.list[i]['channel']],
              label: {
                fontSize: 12
              }
            })
            if (response.data.result.list[i]['channel'] === '21') {
              var topSourceList =
                response.data.result.list[i]['top_list'][1]['top_source_list']
              var top10optionsXAxis = []
              var top10optionsSeries = []
              for (var j = 0; j < topSourceList.length; j++) {
                top10optionsXAxis.push(topSourceList[j]['from'])
                top10optionsSeries.push(topSourceList[j]['count'])
              }
              if (top10optionsXAxis.length > 0) {
                this.top10options.xAxis[0].data = top10optionsXAxis
                this.top10options.series[0].data = top10optionsSeries
              }
            }
          }
        }
      })
    }

    // 循环加载新闻
    // getNextNews(){
    //     this.getNewsDetails();
    //     this.curIndex++;
    //     this.newsInterval = setInterval(()=>{
    //         if(this.curIndex < this.newsList.length){
    //             setTimeout(()=>{
    //                 this.getNewsDetails();
    //                 this.curIndex++;
    //             },100)
    //         }else{
    //             this.curIndex = 0;
    //             clearInterval(this.newsInterval);
    //             this.getNewsDetails();
    //         }
    //     },30000)
    // }
  }
}
</script>

<style lang='scss' scoped>
.main-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 11px;
  .data-analysis-wrap {
    width: 100%;
    height: 100%;
    padding: 1.2em 0.45em 0.5em 0.45em;
    background: url('./assets/border.png') no-repeat center center;
    background-size: 100% 100%;
    .data-analysis-list {
      width: 48%;
      height: 100%;
      padding: 0.3em;
      background: url('./assets/news-border.png') no-repeat center center;
      background-size: 100% 100%;
    }
    .data-list {
      height: 1.7em;
      background: rgb(16, 43, 95);
      padding: 0.2em;
      border: 0.02em dotted transparent;
      &.active {
        background: rgb(10, 67, 183);
        border: 0.02em dotted rgba(0, 255, 240, 1);
        .data-title {
          color: #F7F02B;
        }
      }
      .data-title {
        width: 100%;
        height: 1em;
        line-height: 1em;
        font-size: 0.27em;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #ffffff;
        text-align: left;
      }
      .data-brief {
        font-size: 0.2em;
        color: #fff;
        height: 3.25em;
        overflow: hidden;
      }
    }
    .data-echarts {
      width: 48%;
      height: 100%;
      .echarts-top {
        width: 100%;
        height: 3.85em;
        .data-channel {
          width: 4.6em;
          height: 3.85em;
          background: url('./assets/channel-border.png') no-repeat center center;
          background-size: 100% 100%;
          position: relative;
          padding: 0.2em;
          .channel-title {
            font-size: 0.24em;
            color: #fff;
            text-align: left;
          }
          .channel-box {
            width: 4.2em;
            height: 3.2em;
            .echarts {
              width: 100%;
              height: 100%;
            }
          }
        }
        .data-media {
          width: 3.8em;
          height: 3.85em;
          background: url('./assets/media-border.png') no-repeat center center;
          background-size: 100% 100%;
          position: relative;
          padding: 0.2em;
          .media-title {
            font-size: 0.24em;
            color: #fff;
            text-align: left;
          }
          .media-box {
            width: 3.4em;
            height: 3.2em;
            .echarts {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .echarts-bottom {
        width: 100%;
        height: 4.5em;
        .data-source {
          width: 100%;
          height: 4.5em;
          background: url('./assets/source-border.png') no-repeat center center;
          background-size: 100% 100%;
          padding: 0.2em;
          .source-title {
            font-size: 0.24em;
            color: #fff;
            text-align: left;
          }
          .source-box {
            width: 100%;
            height: 3.85em;
            .echarts {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
