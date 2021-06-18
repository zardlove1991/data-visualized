<template>
    <div class="wz-wrap" id="wzNewsGather">
      <div class="content">
        <div class="main-title">新闻采编</div>
        <div class="main-wrap flex flex-justify-between">
            <div class="main-left"> 
              <div class="main-left-top flex sys-flex-center flex-justify-around">
                <div class="item-num">
                  <div class="num">{{content_amount}}</div>
                  <div class="type">内容总数</div>
                </div>
                <div class="item-num">
                  <div class="num">{{today_create_amount}}</div>
                  <div class="type">今日新增</div>
                </div>
                <div class="item-num">
                  <div class="num">{{week_create_amount}}</div>
                  <div class="type">本周新增</div>
                </div>
                <div class="item-num">
                  <div class="num">{{month_create_amount}}</div>
                  <div class="type">本月新增</div>
                </div>
              </div>
              <div class="main-left-bottom">
                  <div class="news-type"></div>
                  <div class="news-echarts flex flex-justify-between">
                    <div id="echarts1">
                       <chart :options="barOptions1" :autoResize="true"></chart>
                    </div>
                    <div id="echarts2">
                       <chart :options="barOptions2" :autoResize="true"></chart>
                    </div>
                  </div>
              </div>
            </div>
            <div class="main-right">
              <div class="news-title">
              </div>
               <common-list  :list="dataList"  :showNum="true" :showTime="2"></common-list>
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
import commonList from '../list'
import { getM2OPlusPublish, getNewsPro, getNewsType } from '@/servers/interface'
export default {
  name: 'newsGather',
  data () {
    return {
      count: 5,
      page: 1,
      isPaging: true,
      frequency: 10000,
      maxPage: 10,
      content_amount: 0,
      month_create_amount: 0,
      today_create_amount: 0,
      week_create_amount: 0,
      dataList: [],
      barOptions1: {
        legend: {
          icon: 'rect',
          data: ['文稿', '图集', '视频', '专题'],
          textStyle: {
            color: '#fff',
            fontSize: '28rem'
          },
          padding: [0, 15, 0, 0],
          x: 'center',
          y: 'bottom'
        },
        roseType: 'area',
        grid: {
          containLabel: true
        },
        color: ['#0D5EE4', '#E6324B', '#791FE2', '#E8854A'],
        series: [
          {
            type: 'pie',
            radius: ['35%', '65%'],
            center: ['50%', '50%'], // 图的位置，距离左跟上的位置
            avoidLabelOverlap: false,
            itemStyle: {
              // borderRadius: 20,
              borderColor: '#07093A',
              borderWidth: 10
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
                  fontSize: '28rem',
                  color: '#fff',
                  borderWidth: 5
                  // fontWeight: 'bold'
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
            show: true,
            interval: 0,
            textStyle: {
              color: '#ccc'
            },
            fontSize: '34rem'
          }
        },
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
          top: 60,
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
                  fontSize: '28rem'
                }
              },
              color: function (params) {
                var colorlist = ['#0D5EE4', '#E6324B', '#E8854A', '#791FE2']
                return colorlist[params.dataIndex]
              }
            }
          }
        }]
      }

    }
  },
  created () {
    this.getDataList()
    this.getNewsType()
    this.getNewsPro()
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  mounted () {
    this.setFontsize('wzNewsGather')
  },
  methods: {
    // 稿件列表
    getDataList () {
      getM2OPlusPublish(this.count, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data
            }, 100)
            if (this.isPaging) {
              this.page += 1
              if (this.page > this.maxPage) {
                this.page = 1
              }
            }
          } else {
            if (this.page !== 1) {
              this.page = 1
              this.getDataList()
            }
          }
        }
      })
    },
    // 总数
    getNewsPro () {
      getNewsPro().then(res => {
        if (!res.data.error_code) {
          if (Object.keys(res.data.result).length) {
            let result = res.data.result
            this.content_amount = result.content_amount
            this.month_create_amount = result.month_create_amount
            this.today_create_amount = result.today_create_amount
            this.week_create_amount = result.week_create_amount
          }
        }
      })
    },
    // 稿件类型
    getNewsType () {
      getNewsType().then(res => {
        if (!res.data.error_code) {
          if (Object.keys(res.data.result).length) {
            let result = res.data.result
            let {article: {count: articleCount}, gallery: {count: galleryCount}, topic: {count: topicCount}, video: {count: videoCount}} = result
            this.barOptions1.series[0].data = [
              {value: articleCount, name: '文稿'},
              {value: galleryCount, name: '图集'},
              {value: topicCount, name: '专题'},
              {value: videoCount, name: '视频'}
            ]
            this.barOptions2.series[0].data = [articleCount, galleryCount, topicCount, videoCount]
          }
        }
      })
    }
  },
  components: {
    chart: echarts,
    'common-list': commonList
  }

}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.wz-wrap{
    width: 100%;
    height:100%;
    padding: 1%;
    .content{
        width: 100%;
        height: 100%;
        padding: 1.5%;
        background: url("./assets/main-bg.png") no-repeat;
        background-size: 100% 100%;
        .main-title{
            font-size: pxrem(58px);
            font-weight: 500;
            color: #ffffff;
            text-align: left;
        }
        .main-wrap{
            width: 100%;
            height: 90%;
            margin-top: pxrem(32px);
            .main-left{
               width: 48%;
               .main-left-top{
                 width: 100%;
                 height: pxrem(189px);
                 background: url("./assets/top-bg.png") no-repeat;
                 background-size: 100% 100%;
                 font-size: pxrem(30px);
                 color: #ffffff;
                 .num{
                   color:#00FFF6;
                   font-size: pxrem(56px);
                   margin-bottom: pxrem(30px);
                 }
               }
               .main-left-bottom{
                 margin-top: pxrem(53px);
                 .news-type{
                    width: pxrem(350px);
                    height: pxrem(88px);
                    background: url("./assets/title-type.png") no-repeat;
                    background-size: 100% 100%;            
                 }
                 .news-echarts{
                    height: pxrem(400px);
                 }   
                 #echarts1{
                    width: 50%;
                    // height: pxrem(490px);
                 }
                 #echarts2{
                     width: 50%;
                    //  height: pxrem(490px);
                 }
               }
            }
            .main-right{
                width: 48%;
               .news-title{
                  width: pxrem(350px);
                  height: pxrem(88px);
                  margin-bottom: pxrem(40px);
                  background: url("./assets/title-list.png")  no-repeat;
                  background-size: 100%  100%;
                }
               .news-list{
                  height: 85%;
                  /deep/  .list-item{
                    font-size: pxrem(32px);
                    .title{
                      font-size: pxrem(38px);               
                      margin-right: pxrem(20px);
                    }
                    .click-num{
                      background-size: pxrem(42px)  pxrem(30px);
                      padding-left: pxrem(63px);
                      margin-left: pxrem(50px);
                    }
                  }
               }

            }
        }
    }


}
</style>
