<template>
  <div class="lishui-hotword">
    <div class="hotword-wrap" id="word-cloud">
      <div class="word-cloud" ref="wordcloud" v-if="hotWordsList.length"></div>
    </div>
  </div>
</template>
<script>
import { getNewsList, getHotWordsList } from '@/servers/interface'
import echarts from 'echarts'
import 'echarts-wordcloud'
export default {
  name: 'hotword',
  data () {
    return {
      newsList: [],
      index: 0,
      id: null,
      proportion: 1,
      hotWordsList: []
    }
  },
  created () {
    this.getNewsList()
    setInterval(() => {
      this.chaneIndex()
    }, 15000)
  },
  methods: {
    initWordCloud () {
      const _this = this
      _this.myChart = echarts.init(this.$refs.wordcloud)
      _this.options = {
        series: [
          {
            type: 'wordCloud',
            gridSize: this.proportion * 25,
            sizeRange: [30, 100],
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
      _this.myChart.setOption(_this.options)
    },
    getNewsList () {
      getNewsList(1, 20).then(res => {
        this.newsList = res.data.result.data || []
        this.id = this.newsList[0] ? this.newsList[0].id : ''
        this.getWordsList(this.id)
      })
    },
    getWordsList (id) {
      getHotWordsList(id).then(res => {
        if (res.data.result && res.data.result[0]) {
          let newList = []
          let list = res.data.result
          list.forEach(element => {
            let obj = {
              name: element.name_zh,
              value: element.count
            }
            newList.push(obj)
          })
          this.hotWordsList = newList
          this.$nextTick(() => {
            this.initWordCloud()
          })
        }
      })
    },
    chaneIndex () {
      if (this.index === this.newsList.length - 1) {
        this.index = 0
        this.id = this.newsList[0].id
        this.getWordsList(this.id)
      } else {
        this.index += 1
        this.id = this.newsList[this.index]
          ? this.newsList[this.index].id
          : ''
        this.getWordsList(this.id)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-hotword {
  width: 100%;
  height: 100%;
  padding: pxrem(33px) pxrem(26px) pxrem(53px) pxrem(50px);
  .hotword-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: pxrem(150px) pxrem(50px) pxrem(50px);
    .word-cloud {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
