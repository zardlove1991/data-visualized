<template>
  <div class="contentSpread" id="contentSpread">
    <div class="contentSpread-wrap">
      <div class="wrap-top sys-flex sys-flex-center flex-justify-between">
        <div class="top_left"></div>
        <div class="top_right">
          <div class="top_right_pro content_div">
            <div class="top_title">内容总生产量</div>
            <div class="total-num sys-flex sys-flex-center">
              <div class="num-list hg-flex"  v-for="(v, k) in content_total_amount" :key="k"><span>{{v}}</span></div>
            </div>
          </div>
          <div class="top_right_pub content_div">
            <div class="top_title">内容总发布量</div>
            <div class="total-num sys-flex sys-flex-center">
              <div class="num-list hg-flex"  v-for="(v, k) in content_total_publish_amount" :key="k"><span>{{v}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-bottom">
        <div class="item click">
          <p class="title">点击量</p>
          <p class="num">{{total_click_amount}}</p>
        </div>
        <div class="item zan">
          <p class="title">点赞量</p>
          <p class="num">{{total_like_amount}}</p>
        </div>
        <div class="item share">
          <p class="title">分享量</p>
          <p class="num">{{total_share_amount}}</p>
        </div>
        <div class="item zhuanfa">
          <p class="title">转发量</p>
          <p class="num">{{total_forward_amount}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { contentDistribution } from '@/servers/interface'
export default {
  name: 'contentSpread',
  data () {
    return {
      content_total_amount: [],
      content_total_publish_amount: [],
      total_click_amount: '',
      total_like_amount: '',
      total_share_amount: '',
      total_forward_amount: ''
    }
  },
  created () {
    this.contentDistribution()
  },
  mounted () {
    this.setFontsize('contentSpread')
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 1920 * 100 + 'px'
    console.log(document.documentElement.getBoundingClientRect().width)
  },
  methods: {
    contentDistribution () {
      contentDistribution().then(res => {
        if (!res.data.error_code) {
          // 总生产量
          let totalProVal = res.data.result.content_total_amount.toString()
          let totalProValLength = totalProVal.length
          let chaTotalProValLength = 8 - totalProValLength
          for (let i = 0; i < chaTotalProValLength; i++) {
            this.content_total_amount.push(0)
          }
          for (let j = 0; j < totalProValLength; j++) {
            this.content_total_amount.push(totalProVal[j])
          }
          // 总发布量
          let publishVal = res.data.result.content_total_publish_amount.toString()
          let publishValLength = publishVal.length
          let chaPublishValLength = 8 - publishValLength
          for (let i = 0; i < chaPublishValLength; i++) {
            this.content_total_publish_amount.push(0)
          }
          for (let j = 0; j < publishValLength; j++) {
            this.content_total_publish_amount.push(publishVal[j])
          }
          this.total_click_amount = res.data.result.total_click_amount
          this.total_like_amount = res.data.result.total_like_amount
          this.total_share_amount = res.data.result.total_share_amount
          this.total_forward_amount = res.data.result.total_forward_amount
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.contentSpread {
  width: pxrem(1920px);
  height: pxrem(1080px);
  padding: pxrem(27px) pxrem(50px);
  position: relative;
  background: #0b072d;
  .contentSpread-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(65px) pxrem(126px) pxrem(0px) pxrem(26px);
    color: #fff;
    .wrap-top {
      width: 100%;
      margin-bottom: pxrem(70px);
      .top_left{
        width: pxrem(830px);
        height: pxrem(415px);
        background: url('./assets/topleft_bg.png') no-repeat;
        background-size: 100% 100%;
      }
      .top_right{
        width: pxrem(730px);
        height: pxrem(415px);
        padding-top: pxrem(65px);
        box-sizing: border-box;
        .content_div{
          background: url('./assets/split.png') no-repeat left center;
          padding-left: pxrem(67px);
          margin-bottom: pxrem(80px);
          .top_title{
            font-size: pxrem(40px);
            font-weight: bold;
            color: #fff;
            text-align: left;
            margin-bottom: pxrem(22px);
            transform: scale(1,0.5);
          }
          .total-num {
            .num-list {
              width: pxrem(80px);
              height: pxrem(37px);
              background: url('./assets/numBack.png') no-repeat center;
              margin-right: pxrem(8px);
              &:last-of-type {
                margin-right: 0;
              }
              span {
                font-size: pxrem(50px);
                color: #13fee3;
                font-weight: 600;
                transform: scale(1,0.5);
              }
              span.zero{
                color: #719be2;
              }
            }
          }
        }
        .top_right_pub{
          // margin-top: pxrem(160px);
          margin-bottom: pxrem(0px);
        }
      }
    }
    .wrap-bottom{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-left: pxrem(100px);
      .item{
        width: pxrem(724px);
        height: pxrem(185px);
        background: url('./assets/bottombg.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        .title{
          font-size: pxrem(42px);
          color: #fff;
          font-weight: 600;
          position: absolute;
          left: pxrem(56px);
          top: pxrem(15px);
          transform: scale(1,0.5);
        }
        .num{
          font-size: pxrem(84px);
          color: #00fff6;
          font-weight: 600;
          height: pxrem(185px);
          line-height: pxrem(185px);
          transform: scale(1,0.5);
        }
      }
      .click{
        margin-bottom: pxrem(52px);
      }
      .zan{
        margin-bottom: pxrem(52px);
      }
    }
  }
}
</style>