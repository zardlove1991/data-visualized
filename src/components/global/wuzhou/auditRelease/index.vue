<template>
    <div class="wz-wrap" id="auditRelease">
      <div class="content">
        <div class="main-title">审核发布</div>
        <div class="main-wrap">
          <div class="echart-wrap flex flex-justify-between">
            <chart :options="option1" :autoResize="true"></chart>
            <chart :options="option2" :autoResize="true"></chart>
          </div>
          <div class="list-wrap flex flex-justify-between">
            <div class="list-left list">
              <div class="title">待审核内容</div>
              <div class="line"></div>
              <ul class="list-ul flex sys-vertical sys-flex-center">
                <li class="overhidden"  v-for="(item,index) in dataList1" :key="index" :class="{'flipInX' : item.title}" :style="{'animation-delay' : index/4+'s'}"><span class="dot"></span>{{item.title}}</li>
              </ul>
            </div>
            <div class="list-right list">
              <div class="title">已发布内容</div>
              <div class="line"></div>
              <ul class="list-ul flex sys-vertical sys-flex-center">
                <li class="overhidden"  v-for="(item,index) in dataList2" :key="index" :class="{'flipInX' : item.title}" :style="{'animation-delay' : index/4+'s'}"><span class="dot"></span>{{item.title}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import * as echarts from 'vue-echarts'
import { getWaiting, getWaitAudit, getAudit } from '@/servers/interface'
export default {
  name: 'auditRelease',
  data () {
    return {
      dataList1: [],
      dataList2: [],
      page1: 1,
      page2: 1,
      count: 6,
      maxPage: 10,
      option1: {
        // 全局调色盘。
        color: ['#E8854A', '#E7662D'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        textStyle: {
          fontSize: '32rem',
          color: '#ffffff'
        },
        legend: {
          data: ['待审核', '已审核'],
          textStyle: {
            color: '#ffffff'
          },
          top: '2%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'transparent'
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          },
          splitLine: {
            show: false
          },
          data: ['文稿', '图集', '视频', '专题']
        },
        series: [
          {
            name: '待审核',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          },
          {
            name: '已审核',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ]
      },
      option2: {
        // 全局调色盘。
        color: ['#038AD8', '#115FDE'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        textStyle: {
          fontSize: '32rem',
          color: '#ffffff'
        },
        legend: {
          data: ['待发布', '已发布'],
          textStyle: {
            color: '#ffffff'
          },
          top: '2%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'transparent'
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          },
          splitLine: {
            show: false
          },
          data: ['文稿', '图集', '视频', '专题']
        },
        series: [
          {
            name: '待发布',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          },
          {
            name: '已发布',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ]
      }
    }
  },
  created () {
    this.getEchartList()
    this.getDataList1()
    this.getDataList2()
    setInterval(() => {
      this.getDataList1()
      this.getDataList2()
    }, 15000)
  },
  mounted () {
    this.setFontsize('auditRelease')
  },
  methods: {
    // 图表
    getEchartList () {
      getWaiting().then(res => {
        if (!res.data.error_code) {
          if (Object.keys(res.data.result).length) {
            let noNumObj = {article: 0, gallery: 0, video: 0, topic: 0}
            let {
              waiting_publish: {article: waitingArticle, gallery: waitingGallery, video: waitingVideo, topic: waitingTopic} = noNumObj,
              already_publish: {article: alreadyArticle, gallery: alreadyGallery, video: alreadyVideo, topic: alreadyTopic} = noNumObj,
              audited_publish: {article: auditedArticle, gallery: auditedGallery, video: auditedVideo, topic: auditedTopic} = noNumObj,
              announced_publish: {article: announcedArticle, gallery: announcedGallery, video: announcedVideo, topic: announcedTopic} = noNumObj
            } = res.data.result
            this.option1.series[0].data.push(waitingArticle, waitingGallery, waitingVideo, waitingTopic)
            this.option1.series[1].data.push(auditedArticle, auditedGallery, auditedVideo, auditedTopic)
            this.option2.series[0].data.push(announcedArticle, announcedGallery, announcedVideo, announcedTopic)
            this.option2.series[1].data.push(alreadyArticle, alreadyGallery, alreadyVideo, alreadyTopic)
          }
        }
      })
    },
    // 待审核内容
    getDataList1 () {
      getWaitAudit(this.page1, this.count).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList1 = []
            setTimeout(() => {
              this.dataList1 = res.data.result.data
            }, 100)
            this.page1 += 1
            if (this.page1 > this.maxPage) {
              this.page1 = 1
            }
          } else {
            if (this.page1 !== 1) {
              this.page1 = 1
            }
          }
        }
      })
    },
    // 已发布内容
    getDataList2 () {
      getAudit(this.page2, this.count).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList2 = []
            setTimeout(() => {
              this.dataList2 = res.data.result.data
            }, 100)
            this.page2 += 1
            if (this.page2 > this.maxPage) {
              this.page2 = 1
            }
          } else {
            if (this.page2 !== 1) {
              this.page2 = 1
            }
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
$color: #15FEF5;
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
          height: 95%;
          margin-top: pxrem(50px); 
          .echart-wrap{
            width: 100%;
            height: 45%;
            padding: 1%;
            background: url("./assets/top-border.png") no-repeat;
            background-size: 100% 100%;
          }
          .list-wrap{
            width: 100%;
            height: 53%;
            margin-top: 2%;
            overflow: hidden;
            .list{
              width: 48%;
              .title{
                color: $color;
                font-size: pxrem(44px);
                font-weight: 500;
              }
              .line{
                width: 100%;
                height: pxrem(17px);
                background: url("./assets/line.png") no-repeat;
                background-size: 100% 100%;
                margin-top: pxrem(5px);
              }
              .list-ul>li{
                width: 100%;
                height: pxrem(120px);
                padding: pxrem(40px);
                background: rgba(0,255,246,0.05);
                color:#ffffff;
                font-size: pxrem(36px);
                margin-top: pxrem(25px);
                .dot{
                  display:inline-block;
                  width: pxrem(17px);
                  height: pxrem(17px);
                  background: #ffffff;
                  border-radius: 50%;
                  margin-right: pxrem(20px);
                }
              }

            }

          }
      }
    }

}

</style>
