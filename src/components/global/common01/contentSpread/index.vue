<template>
  <div class="contentSpread" id="contentSpread">
    <div class="contentSpread-wrap">
      <div class="wrap-top sys-flex sys-flex-center flex-justify-between">
        <div class="top_left"></div>
        <div class="top_right">
          <div class="top_right_pro content_div">
            <div class="top_title">内容总生产量</div>
            <div class="total-num sys-flex sys-flex-center">
              <div class="num-list hg-flex"><span class="zero">0</span></div>
              <div class="num-list hg-flex"><span class="zero">0</span></div>
              <div class="num-list hg-flex"><span class="zero">0</span></div>
              <div class="num-list hg-flex"><span>1</span></div>
              <div class="num-list hg-flex"><span>0</span></div>
              <div class="num-list hg-flex"><span>2</span></div>
              <div class="num-list hg-flex"><span>1</span></div>
              <div class="num-list hg-flex"><span>9</span></div>
            </div>
          </div>
          <div class="top_right_pub content_div">
            <div class="top_title">内容总发布量</div>
            <div class="total-num sys-flex sys-flex-center">
              <div class="num-list hg-flex"><span class="zero">0</span></div>
              <div class="num-list hg-flex"><span class="zero">0</span></div>
              <div class="num-list hg-flex"><span class="zero">0</span></div>
              <div class="num-list hg-flex"><span>1</span></div>
              <div class="num-list hg-flex"><span>0</span></div>
              <div class="num-list hg-flex"><span>2</span></div>
              <div class="num-list hg-flex"><span>1</span></div>
              <div class="num-list hg-flex"><span>9</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-bottom">
        <div class="item click">
          <p class="title">点击量</p>
          <p class="num">122,560</p>
        </div>
        <div class="item zan">
          <p class="title">点赞量</p>
          <p class="num">122,560</p>
        </div>
        <div class="item share">
          <p class="title">分享量</p>
          <p class="num">122,560</p>
        </div>
        <div class="item zhuanfa">
          <p class="title">转发量</p>
          <p class="num">122,560</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'contentSpread',
  // data () {
  //   return {
  //   }
  // },
  mounted () {
    this.setFontsize('contentSpread')
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.contentSpread {
  width: 100%;
  height: 100%;
  padding: pxrem(58px) pxrem(50px) pxrem(53px) pxrem(50px);
  position: relative;
  background: #030520;
  .contentSpread-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(130px) pxrem(126px) pxrem(0px) pxrem(26px);
    color: #fff;
    .wrap-top {
      width: 100%;
      margin-bottom: pxrem(135px);
      .top_left{
        width: pxrem(830px);
        height: pxrem(830px);
        background: url('./assets/topleft_bg.png') no-repeat;
        background-size: 100% 100%;
      }
      .top_right{
        width: pxrem(730px);
        height: pxrem(830px);
        padding-top: pxrem(180px);
        box-sizing: border-box;
        .content_div{
          background: url('./assets/split.png') no-repeat left center;
          padding-left: pxrem(67px);
          margin-bottom: pxrem(160px);
          .top_title{
            font-size: pxrem(44px);
            font-weight: bold;
            color: #fff;
            text-align: left;
            margin-bottom: pxrem(44px);
          }
          .total-num {
            .num-list {
              width: pxrem(80px);
              height: pxrem(75px);
              background: url('./assets/numBack.png') no-repeat center;
              margin-right: pxrem(8px);
              &:last-of-type {
                margin-right: 0;
              }
              span {
                font-size: pxrem(44px);
                color: #13fee3;
                font-weight: 600;
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
        height: pxrem(370px);
        background: url('./assets/bottombg.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        .title{
          font-size: pxrem(44px);
          color: #fff;
          font-weight: 600;
          position: absolute;
          left: pxrem(56px);
          top: pxrem(31px);
        }
        .num{
          font-size: pxrem(84px);
          color: #00fff6;
          font-weight: 600;
          height: pxrem(370px);
          line-height: pxrem(370px);
        }
      }
      .click{
        margin-bottom: pxrem(105px);
      }
      .zan{
        margin-bottom: pxrem(105px);
      }
    }
  }
}
</style>