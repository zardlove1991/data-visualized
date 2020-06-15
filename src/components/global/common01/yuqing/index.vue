<template>
 <div class="yuhuatai">
   <div class="yuqing flex">
    <div class="left">
      <div class="title">5G时代</div>
      <ul class="leftList">
        <li v-for="(item, index) in leftList.slice(0,8)" :key="index">
          <span class="dian"></span>
          <p>{{item.name}}</p>  
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="rightTop flex">
        <div class="emotional">
          <div class="titleIcon">
            <img src="./asset/qinggan.png" alt="">
          </div>
          <div class="emotional-wrap" ref="emotionalWrap"></div>
        </div>
        <div class="line"></div>
        <div class="keywords">
          <div class="titleIcon">
            <img src="./asset/keywords.png" alt="">
          </div>
          <div class="hot-wrap">
            <div class="hotword-wrap flex" id="word-cloud">
                <div class="word-cloud" ref="wordcloud" v-if="hotWordsList.length"></div>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="content">
          <div class="titleIcon">
            <img src="./asset/neirong.png" alt="">
          </div>
          <div class="content-analysis" ref="analysis"></div>
        </div>

      </div>
      <div class="rightBottom flex">
        <div class="media">
          <div class="titleIcon">
            <img src="./asset/meiti.png" alt="">
          </div>
          <div class="media-chart" ref="mediaChart"></div>
        </div>
        <div class="line"></div>
        <div class="hot">
           <div class="titleIcon">
            <img src="./asset/hot.png" alt="">
          </div>
          <div class="hot-chart" ref="hotChart"></div>
        </div>
      </div>
    </div>
    </div>
 </div>
</template>
<script>
// import { getCloudHotword } from '@/servers/interface'
import echarts from 'echarts'
import 'echarts-wordcloud'
export default {
  name: 'yuqing',
  data () {
    return {
      proportion: 1,
      leftList: [],
      hotWordsList: []
    }
  },
  created () {
    this.getLeftList()
    this.getEmotional()
    this.getKeywords()
    this.getContentList()
    this.getMediaList()
    this.getHotList()
  },
  methods: {
    getLeftList () {
      this.leftList = [
        { name: '阳光宝贝育儿园没有幼儿园资质，' },
        { name: '阳光宝贝育，要求学校退费并协调安排孩子上其他幼儿园' },
        { name: '协调安排孩子上其他幼儿园' },
        { name: '阳光宝贝育儿园没有幼儿园资质，而且给孩子食用过期食物，要求学校退费并协调安排孩子上其他幼儿园' },
        { name: '阳光宝贝育儿园没' },
        { name: '阳光宝贝育儿园没有幼儿园资质，而且给孩子食子上其他幼儿园' },
        { name: '阳光宝贝育儿园没有幼儿退费并协调安排孩子上其他幼儿园' },
        { name: '阳光宝贝育儿园没有幼儿园资质，而且给孩子食用' },
        { name: '儿园没有幼儿园资质，而且给孩子食用过期食物，要求学校退费并协调安排孩子上其他幼儿园' },
        { name: '阳光园' }
      ]
    },
    getEmotional () {
      let legendData = ['乐观', '消极', '中立']
      let seriesData = [
        { value: 335, name: '乐观', itemStyle: { color: '#003CFF' } },
        { value: 310, name: '消极', itemStyle: { color: '#DE3766' } },
        { value: 234, name: '中立', itemStyle: { color: '#DE9937' } }
      ]
      this.$nextTick(() => {
        this.initEmotional(legendData, seriesData)
      })
    },
    initEmotional (legendData, seriesData) {
      const _this = this
      _this.myChart = echarts.init(this.$refs.emotionalWrap)
      let options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 20,
          itemGap: 25,
          data: legendData,
          formatter: function (name) {
            let total = 0
            let target
            for (let i = 0, l = seriesData.length; i < l; i++) {
              total += seriesData[i].value
              if (seriesData[i].name === name) {
                target = seriesData[i].value
              }
            }
            return name + '    ' + ((target / total) * 100).toFixed(0) + '%'
          },
          textStyle: { color: '#fff', fontSize: '18', padding: [ 0, 0, 0, 10 ] }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            center: ['50%', '38%'],
            radius: [0, '20%'],
            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '乐观', selected: true, itemStyle: { color: '#003CFF' } }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                color: '#fff',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: seriesData
          }
        ]
      }
      _this.myChart.setOption(options)
    },
    getKeywords () {
      this.hotWordsList = [
        { name: 'w道', value: 1089 },
        { name: 'w我', value: 2012 },
        { name: 'w我也不递', value: 38425 },
        { name: 'w我也不是', value: 44566 },
        { name: 'w我也是', value: 5744 },
        { name: 'w道', value: 11089 },
        { name: 'w我', value: 20312 },
        { name: 'w我也不递', value: 48425 },
        { name: 'w我也不是', value: 64566 },
        { name: 'w我也是', value: 5844 },
        { name: 'w道', value: 1099 },
        { name: 'w我', value: 2012 },
        { name: 'w我也不递', value: 33425 },
        { name: 'w我也不是', value: 44466 },
        { name: 'w我也是', value: 5754 },
        { name: 'w道', value: 1289 },
        { name: 'w我', value: 2612 },
        { name: 'w我也不递', value: 88425 },
        { name: 'w我也不是', value: 9566 },
        { name: 'w我也是', value: 5724 }
      ]
      this.$nextTick(() => {
        this.initWordCloud()
      })
    },
    initWordCloud () {
      const _this = this
      let options = {
        series: [
          {
            type: 'wordCloud',
            sizeRange: [18, 48],
            rotationRange: [0, 90],
            rotationStep: 90,
            shape: 'square',
            width: '100%',
            height: '100%',
            top: 0,
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
            data: this.hotWordsList
          }
        ]
      }
      _this.myChart = echarts.init(this.$refs.wordcloud)
      _this.myChart.setOption(options)
    },
    getContentList () {
      this.$nextTick(() => {
        this.initContent()
      })
    },
    initContent () {
      const _this = this
      _this.myChart = echarts.init(this.$refs.analysis)
      _this.option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'center',
          textStyle: { // 图例的公用文本样式。
            fontSize: 15,
            color: '#fff'
          }
        },
        radar: [
          {
            indicator: [
              {text: '生活', max: 100, color: 'rgba(255,255,255,1)'},
              {text: '国际', max: 100, color: 'rgba(255,255,255,1)'},
              {text: '社会', max: 100, color: 'rgba(255,255,255,1)'},
              {text: '科技', max: 100, color: 'rgba(255,255,255,1)'},
              {text: '财经', max: 100, color: 'rgba(255,255,255,1)'},
              {text: '军事', max: 100, color: 'rgba(255,255,255,1)'}
            ],
            center: ['50%', '40%'],
            name: {
              textStyle: {
                fontSize: 18,
                color: '#fff'
              }
            },
            radius: 80,
            axisLine: { // (圆内的几条直线)坐标轴轴线相关设置
              lineStyle: {
                color: '#00E4FF',
                // 坐标轴线线的颜色。
                width: 1,
                // 坐标轴线线宽。
                type: 'solid'
                // 坐标轴线线的类型。
              }
            },
            splitLine: { // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
              lineStyle: {
                color: '#00E4FF',
                // 分隔线颜色
                width: 1
                // 分隔线线宽
              }
            },
            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
              show: true,
              areaStyle: { // 分隔区域的样式设置。
                color: ['rgba(0,228,255,0.3)', 'rgba(0,228,255,0.1)']
                // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              }
            }
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            lineStyle: {
              normal: {
                color: 'rgba(248,134,0,0.66)'
              }
            },
            areaStyle: {
              normal: {
                color: 'rgba(248,134,0,1)'
              }
            },
            data: [
              {
                value: [70, 40, 85, 40, 70, 80]
              }
            ]
          }
        ]
      }
      _this.myChart.setOption(_this.option)
    },
    getMediaList () {
      let legendData = ['APP', '微信', '网站', '论坛', '微博', '报刊']
      let seriesData = [
        { value: 335, name: 'APP', itemStyle: { color: '#003CFF' } },
        { value: 310, name: '微信', itemStyle: { color: '#44CF98' } },
        { value: 234, name: '网站', itemStyle: { color: '#DE9937' } },
        { value: 335, name: '论坛', itemStyle: { color: '#941BF2' } },
        { value: 310, name: '微博', itemStyle: { color: '#DE3766' } },
        { value: 234, name: '报刊', itemStyle: { color: '#DE6E00' } }
      ]
      this.$nextTick(() => {
        this.initMediaChart(legendData, seriesData)
      })
    },
    initMediaChart (legendData, seriesData) {
      const _this = this
      _this.myChart = echarts.init(this.$refs.mediaChart)
      let options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 40,
          itemGap: 30,
          data: legendData,
          formatter: function (name) {
            let total = 0
            let target
            for (let i = 0, l = seriesData.length; i < l; i++) {
              total += seriesData[i].value
              if (seriesData[i].name === name) {
                target = seriesData[i].value
              }
            }
            return name + '    ' + ((target / total) * 100).toFixed(0) + '%'
          },
          textStyle: { color: '#fff', fontSize: '18', padding: [ 0, 0, 0, 10 ] }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['30%', '40%'],
            center: ['50%', '25%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                color: '#fff',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: seriesData
          }
        ]
      }
      _this.myChart.setOption(options)
    },
    getHotList () {
      this.$nextTick(() => {
        this.initHotChart()
      })
    },
    initHotChart () {
      const _this = this
      _this.myChart = echarts.init(this.$refs.hotChart)
      _this.option = {
        title: {
          text: ''
        },
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
          data: ['微信', '微博', '网站'],
          textStyle: {
            fontSize: '18',
            color: '#fff'
          },
          icon: 'circle'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['10.11', '10.12', '10.13', '10.14', '10.15', '10.16', '10.17'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#FFFFFF'
              },
              fontSize: 18// 字体大小
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255, 0.5)',
                width: 1 // 这里是为了突出显示加上的
              }
            }
            // splitLine: {
            //   show: true,
            //   lineStyle: {
            //     color: 'rgba(255,255,255, 1)', // 网格线的颜色
            //     width: 1,
            //     type: 'solid'
            //   }
            // }
          }
        ],
        yAxis: [
          {
            type: 'value',
            nameTextStyle: {
              fontSize: '18'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#FFFFFF'
              },
              fontSize: 18
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255, 1)',
                width: 1 // 这里是为了突出显示加上的
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255, 0.1)', // 网格线的颜色
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
        series: [
          {
            name: '微信',
            type: 'line',
            stack: '总量',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
              // 三种由深及浅的颜色
                [ {
                  offset: 0,
                  color: '#0098F8'
                }, {
                  offset: 0.5,
                  color: 'rgba(0,152,248,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(0,152,248,0)'
                } ])
            },
            itemStyle: {
              normal: {
                color: '#0098F8',
                lineStyle: {
                  color: '#0098F8'
                }
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '微博',
            type: 'line',
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#9E00F8',
                lineStyle: {
                  color: '#9E00F8'
                }
              }
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
              // 三种由深及浅的颜色
                [ {
                  offset: 0,
                  color: '#9E00F8'
                }, {
                  offset: 0.5,
                  color: 'rgba(212,156,59,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(212,156,59,0)'
                } ])
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '网站',
            type: 'line',
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#D49C3B',
                lineStyle: {
                  color: '#D49C3B'
                }
              }
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
              // 三种由深及浅的颜色
                [ {
                  offset: 0,
                  color: '#D49C3B'
                }, {
                  offset: 0.5,
                  color: 'rgba(212,156,59, 0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(255,255,255,0)'
                } ])
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }
      _this.myChart.setOption(_this.option)
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.yuhuatai{
  background: url(./asset/kuang.png) center center no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
}
.yuqing {
  padding: pxrem(27px) pxrem(20px) pxrem(49px) pxrem(37px);
  margin-top: pxrem(79px);
  .left{
    margin-top: pxrem(50px);
    background: url(./asset/yuqing.png) center center no-repeat;
    background-size: contain;
    width:pxrem(400px);
    height:pxrem(870px);
    // padding: 0 pxrem(98px);
    .title{
      background: url(./asset/title.png) center center no-repeat;
      background-size: contain;
      width: pxrem(203px);
      height: pxrem(40px);
      color:rgba(0,255,228,1);
      font-size:pxrem(32px);
      font-family:Source Han Sans CN;
      font-weight:500;
      margin: pxrem(47px) auto;
    }
    .leftList{
      color: #fff;
      font-size: pxrem(19px);
      li{
        margin-left: pxrem(28px);
        margin-right: pxrem(27px);
        margin-bottom: pxrem(45px);
        display: flex;
        p{
          width: pxrem(333px);
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: left;
        }
        .dian{
          width: pxrem(10px);
          height: pxrem(10px);
          background: url(./asset/newsIcon.png) center center no-repeat;
          background-size: contain;
          display: block;
          margin-right: pxrem(10px);
          margin-top: pxrem(10px);
        }
      }
    }
  }
  .right{
    margin-left: pxrem(48px);
    width: 100%;
    margin-top: pxrem(50px);
    // height: 100%;
    .titleIcon{
      width: pxrem(175px);
      height: pxrem(44px);
      img{
        width: 100%;
        height: 100%;
      }
    }
    .rightTop{
      height: 50%;
      .line{
        width: pxrem(1px);
        height: pxrem(260px);
        background: url(./asset/line1.png) center center no-repeat;
        background-size: contain;
        margin-top: pxrem(64px);
        margin-right: pxrem(15px);
      }
      .emotional{
        width: 33%;
        flex: 1;
        .emotional-wrap{
          height: 90%;
          width: 100%;
        }
      }
      .keywords{
        flex: 1;
        width: 33%;
        .hot-wrap{
          width: 100%;
          height: 100%;
          background-size: 100% 100%;
          position: relative;
          .hotword-wrap {
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
            position: relative;
            padding: pxrem(50px);
            .word-cloud {
              height: 100%;
              flex: 1;
            }
          }
        }
      }
      .content{
        flex: 1;
        width: 33%;
        .content-analysis{
          height: 90%;
          width: 100%;
        }
      }
    }
    .rightBottom{
      height: 50%;
      .line{
        width: pxrem(1px);
        height: pxrem(358px);
        background: url(./asset/line2.png) center center no-repeat;
        background-size: contain;
        margin-top: pxrem(64px);
        margin-right: pxrem(15px);
      }
      .media{
        flex: 1;
        .media-chart{
          height: 90%;
          width: 100%;
        }
      }
      .hot{
        flex: 2;
        .hot-chart{
          height: 90%;
          width: 100%;
        }
      }
    }
  }
}
</style>
