<template>
    <div class="wz-wrap" id="wzHotWords">
      <div class="content">
        <div class="main-title">全网热词</div>
        <div class="main-wrap">
            <chart :options="echartOpt" :autoResize="true"></chart>
        </div>

      </div>    
    </div>
</template>
<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts-wordcloud'
import { getHotsTopicHotWord, getHotsTopicList } from '@/servers/interface'
export default {
  name: 'hotWords',
  components: {
    chart: echarts
  },
  data () {
    return {
      hotList: [],
      keyWordsList: [],
      count: 12,
      index: 0
    }
  },
  computed: {
    echartOpt () {
      return {
        tooltip: {},
        series: [
          {
            type: 'wordCloud',
            gridSize: 50, // 字体分布的密集程度
            sizeRange: [10, 30], // 字体大小的范围
            rotationRange: [0, 90], // 字体旋转的角度
            rotationStep: 90,
            shape: 'square',
            width: '80%',
            height: '80%',
            textStyle: {
              normal: {
                fontWeight: 'bold',
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
  created () {
    this.getHotsTopicList()
  },
  mounted () {
    this.setFontsize('wzHotWords')
  },
  methods: {
    getHotsTopicHotWord (id) {
      getHotsTopicHotWord(id).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.length) {
            this.keyWordsList = res.data.result.map(v => {
              return {
                value: v.count,
                name: v.name_zh
              }
            })
          }
        }
      })
    },
    getHotsTopicList () {
      getHotsTopicList(this.count, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.hotList = res.data.result.data
            this.getHotsTopicHotWord(this.hotList[this.index].id)
            this.$nextTick(() => {
              setInterval(() => {
                if (this.index < 12) {
                  this.index++
                  this.keyWordsList = []
                } else {
                  this.index = 0
                }
                this.getHotsTopicHotWord(this.hotList[this.index].id)
              }, 15000)
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.wz-wrap{
    // width: pxrem(1920px);
    // height: pxrem(1080px);
    // padding: pxrem(33px);
    width: 100%;
    height:100%;
    padding: 1.5vh 1.5vw;
    .content{
        width: 100%;
        height:100%;
        padding: 5vh 4vw;
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
            margin-top: pxrem(30px);
            #wordCloud{
              height: 100%;       
            }  
        }
    }


}
</style>
