<template>
    <div class="wz-wrap" id="wzContentDistribute">
      <div class="content">
        <div class="main-title">内容传播</div>
        <div class="main-wrap">
          <div class="main-num1 flex sys-flex-center flex-justify-between">
            <div class="num-item hg-flex">内容生产量：<span class="num">{{content_total_amount}}</span></div>
            <div class="line"></div>
            <div class="num-item hg-flex">内容发布量：<span class="num">{{content_total_publish_amount}}</span></div>
          </div>
          <div class="main-num2 flex sys-flex-center flex-justify-around">
            <div class="num-item hg-flex">点击数：<span class="num">{{total_click_amount}}</span></div>
            <div class="num-item hg-flex">评论数：<span class="num">{{total_comment_amount}}</span></div>
            <div class="num-item hg-flex">分享数：<span class="num">{{total_share_amount}}</span></div>
          </div>
          <div class="main-list">
            <div class="news-title"></div>
            <common-list :showIndex="true" :showNum="true" :list="dataList"></common-list>
          </div>
         
        </div>
      </div> 
        
    </div>
</template>
<script>
import commonList from '../list'
import { getM2OPlusRankList, contentDistribution } from '@/servers/interface'
export default {
  name: 'contentDistribute',
  data () {
    return {
      count: 9,
      page: 1,
      isPaging: true,
      frequency: 10000,
      maxPage: 10,
      dataList: [],
      desc: 'click_num',
      content_total_amount: 0,
      content_total_publish_amount: 0,
      total_click_amount: 0,
      total_comment_amount: 0,
      total_share_amount: 0
    }
  },
  created () {
    this.getContentDistribution()
    this.getDataList()
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  mounted () {
    this.setFontsize('wzContentDistribute')
  },
  methods: {
    getContentDistribution () {
      contentDistribution().then((res) => {
        if (!res.data.error_code) {
          if (Object.keys(res.data.result).length) {
            let result = res.data.result
            this.content_total_amount = result.content_total_amount
            this.content_total_publish_amount = result.content_total_publish_amount
            this.total_click_amount = result.total_click_amount
            this.total_comment_amount = result.total_comment_amount
            this.total_share_amount = result.total_share_amount
          }
        }
      })
    },
    getDataList () {
      // 稿件排行
      getM2OPlusRankList(this.desc, this.count, this.page).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result
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
    }
  },
  components: {
    'common-list': commonList
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
$color: #15FEF5;
.wz-wrap{
    // width: pxrem(1920px);
    // height: pxrem(1080px);
    // padding: pxrem(33px);
    width: 100%;
    height:100%;
    padding: 1.5vh 1.5vw;
    .content{
      // width: pxrem(1840px);
      // height: pxrem(1000px);
      // padding: pxrem(54px) pxrem(100px) pxrem(56px) pxrem(71px);
      width: 100%;
      height: 100%;
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
          margin-top: pxrem(50px);
          .main-num1{
             width: 100%;
             height: pxrem(130px);
            .num-item{
                width: 48%;
                height: 100%;
                color: #ffffff;
                font-size: pxrem(36px);
                background: url('./assets/top-bg.png') no-repeat;
                background-size: 100% 100%;
                .num{
                  font-size: pxrem(60px);
                  font-weight: 700;
                  color: $color;
                  margin-left: pxrem(46px);
                }
              }
            .line{
                width: pxrem(92px);
                height: pxrem(40px);
                background: url('./assets/line.png') no-repeat;
                background-size: 100% 100%;
            } 
          }
          .main-num2{
             width: 100%;
             height: pxrem(140px);
             color: #ffffff;
             font-size: pxrem(34px);
             margin-top: 2%;
             background: url('./assets/middle-bg.png') no-repeat;
             background-size: 100% 100%;
            .num{
              font-size: pxrem(54px);
              font-weight: 500;
              color: $color;
              margin-left: pxrem(56px);
            }
          }
          .main-list{
             margin-top: 4%;
             height: 85%;
            .news-title{
              width: pxrem(350px);
              height: pxrem(88px);
              margin-bottom: pxrem(90px);
              background: url("./assets/title-bg.png")  no-repeat;
              background-size: 100%  100%;
            }
            .news-list{
              height: 80%;
            }
          }
          
      }
    }

}

</style>
