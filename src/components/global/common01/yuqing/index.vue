<template>
 <div class="huhuatai">
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
        <div class="keywords">
          <div class="titleIcon">
            <img src="./asset/keywords.png" alt="">
          </div>
          <div class="hotword-wrap flex" id="word-cloud">
            <div class="word-cloud" ref="wordcloud" v-if="hotWordsList.length"></div>
          </div>
        </div>
        <div class="content">
          <div class="titleIcon">
            <img src="./asset/neirong.png" alt="">
          </div>
        </div>

      </div>
      <div class="rightBottom"></div>
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
    // this.initEmotional()
    this.getKeywords()
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
      this.initEmotional()
    },
    initEmotional () {
      const _this = this
      console.log(this.$refs.emotionalWrap)
      _this.myChart = echarts.init(this.$refs.emotionalWrap)
      let options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }
      _this.myChart.setOption(options)
    },
    getKeywords () {
      this.hotWordsList = [
        { name: 'w我也不知道', value: 1 },
        { name: 'w我也不知道asdadas', value: 2 },
        { name: 'w我也不知道bcfv递四方速递', value: 3 },
        { name: 'w我也不知道 许昌是士大夫不都是', value: 4 },
        { name: 'w我也不知道 儿童氛围佛挡杀佛但是', value: 5 }
      ]
      // this.initWordCloud()
      this.$nextTick(() => {
        this.initWordCloud()
      })
    },
    initWordCloud () {
      const _this = this
      console.log(this.$refs.wordcloud)
      _this.myChart = echarts.init(this.$refs.wordcloud)
      _this.options = {
        series: [
          {
            type: 'wordCloud',
            gridSize: this.proportion * 50,
            sizeRange: [80, 180],
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
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.huhuatai{
  background: url(./asset/kuang.png) center center no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
}
.yuqing {
  padding: pxrem(27px) pxrem(20px) pxrem(49px) pxrem(37px);
  margin-top: pxrem(79px);
  .left{
    // flex: 1;
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
    height: 100%;
    .rightTop{
      height: 50%;
      .titleIcon{
        width: pxrem(175px);
        height: pxrem(44px);
        img{
          width: 100%;
          height: 100%;
        }
      }
      .emotional{
        width: 33%;
        flex: 1;
      }
      .keywords{
        flex: 1;
        width: 33%;
        .hotword-wrap {
          width: 100%;
          height: 100%;
          background-size: 100% 100%;
          position: relative;
          padding: pxrem(120px) pxrem(50px) pxrem(50px);
          .word-cloud {
            height: 100%;
            flex: 1;
          }
        }
      }
      .content{
        flex: 1;
        width: 33%;

      }
    }
  }
}
</style>
