<template>
  <div class="operationData" id="operationData">
    <div class="operationData-wrap">
      <div class="app_div">
        <p class="anzhuang">APP安装量：<i>326,502</i></p>
        <p class="yonghu">APP用户量：<i>326,502</i></p>
      </div>
      <div class="web_div">
        <p class="fangwen">网站访问量：<i>326,502</i></p>
        <p class="yonghu">网站用户量：<i>326,502</i></p>
      </div>
      <div class="wechat_div">
        <div class="wechat_child wechat1">
          <div class="wechat_top">
            <img src="./assets/numBack.png"/>
            <div class="title">黄河频道</div>
            <div class="num">12</div>
          </div>
          <div class="wechat_bottom">
            <p class="weixin">微信粉丝数：<i>326,502</i></p>
            <p class="weibo">微博阅读量：<i>326,502</i></p>
          </div>
        </div>
        <div class="wechat_child wechat2">
          <div class="wechat_top">
            <img src="./assets/numBack.png"/>
            <div class="title">山西卫视</div>
            <div class="num">12</div>
          </div>
          <div class="wechat_bottom">
            <p class="weixin">微信粉丝数：<i>326,502</i></p>
            <p class="weibo">微博阅读量：<i>326,502</i></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'operationData',
  // data () {
  //   return {
  //   }
  // },
  mounted () {
    this.setFontsize('operationData')
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.operationData {
  width: 100%;
  height: 100%;
  padding: pxrem(58px) pxrem(50px) pxrem(53px) pxrem(50px);
  position: relative;
  background: #030520;
  .operationData-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(220px) pxrem(126px) pxrem(0px);
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .app_div{
      width: pxrem(844px);
      height: pxrem(656px);
      background: url('./assets/app.png') no-repeat left bottom;
      position: relative;
      box-sizing: border-box;
      p{
        font-size: pxrem(40px);
        i{
          font-style: normal;
          font-size: pxrem(60px);
          font-weight: 600;
          padding-left: pxrem(86px);
          color: #fe7e16;
        }
      }
      .anzhuang{
        position: absolute;
        left: pxrem(0px);
        bottom: pxrem(224px);
        padding-left: pxrem(150px);
      }
      .yonghu{
        position: absolute;
        left: pxrem(0px);
        bottom: pxrem(79px);
        padding-left: pxrem(150px);
      }
    }
    .web_div{
      width: pxrem(844px);
      height: pxrem(656px);
      background: url('./assets/web.png') no-repeat left bottom;
      position: relative;
      box-sizing: border-box;
      p{
        font-size: pxrem(40px);
        i{
          font-style: normal;
          font-size: pxrem(60px);
          font-weight: 600;
          padding-left: pxrem(86px);
          color: #dac300;
        }
      }
      .fangwen{
        position: absolute;
        left: pxrem(0px);
        bottom: pxrem(224px);
        padding-left: pxrem(150px);
      }
      .yonghu{
        position: absolute;
        left: pxrem(0px);
        bottom: pxrem(79px);
        padding-left: pxrem(150px);
      }
    }
    .wechat_div{
      width: pxrem(1645px);
      height: pxrem(656px);
      background: url('./assets/wechat.png') no-repeat left bottom;
      position: relative;
      .wechat_child{
        width: pxrem(840px);
        height: pxrem(656px);
        .wechat_top{
          height: pxrem(115px);
          padding-left: pxrem(145px);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: pxrem(40px);
          img{
            width: pxrem(115px);
            height: pxrem(115px);
            vertical-align: middle;
            position: absolute;
            left: pxrem(0px);
            top: pxrem(0px);
          }
          .title{
            font-size: pxrem(44px);
            font-weight: 600;
            color: #fff;
          }
          .num{
            background: url('./assets/article.png') no-repeat left center;
            font-size: pxrem(34px);
            color: #00a2ff;
            margin-top: pxrem(20px);
            text-align: left;
            padding-left: pxrem(48px);
          }
        }
        .wechat_bottom{
          p{
            font-size: pxrem(40px);
            i{
              font-style: normal;
              font-size: pxrem(60px);
              font-weight: 600;
              padding-left: pxrem(86px);
              color: #01feb6;
            }
          }
          .weixin{
            position: absolute;
            left: pxrem(0px);
            bottom: pxrem(224px);
            padding-left: pxrem(140px);
          }
          .weibo{
            position: absolute;
            left: pxrem(0px);
            bottom: pxrem(79px);
            padding-left: pxrem(140px);
          }
        }
      }
      .wechat1{
        position: absolute;
        left: pxrem(0px);
        top: pxrem(0px);
      }
      .wechat2{
        position: absolute;
        right: pxrem(0px);
        top: pxrem(0px);
        .wechat_bottom{
          .weixin{
            padding-left: pxrem(155px);
          }
          .weibo{
            padding-left: pxrem(155px);
          }
        }
      }
    }
  }
}
</style>