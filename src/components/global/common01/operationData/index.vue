<template>
  <div class="operationData" id="operationData">
    <div class="operationData-wrap">
      <div class="app_div">
        <p class="anzhuang">APP安装量：<i>{{app_install_amount}}</i></p>
        <p class="yonghu">APP用户量：<i>{{app_user_amount}}</i></p>
      </div>
      <div class="web_div">
        <p class="fangwen">网站访问量：<i>{{web_click_amount}}</i></p>
        <p class="yonghu">网站用户量：<i>{{web_user_amount}}</i></p>
      </div>
      <div class="wechat_div">
        <div class="wechat_child wechat1">
          <div class="wechat_top">
            <img src="./assets/numBack.png"/>
            <div class="title">黄河频道</div>
            <div class="num">12</div>
          </div>
          <div class="wechat_bottom">
            <p class="weixin">微信粉丝数：<i>{{weChat_click_amount}}</i></p>
            <p class="weibo">微博阅读量：<i>{{weChat_user_amount}}</i></p>
          </div>
        </div>
        <div class="wechat_child wechat2">
          <div class="wechat_top">
            <img src="./assets/numBack.png"/>
            <div class="title">山西卫视</div>
            <div class="num">16</div>
          </div>
          <div class="wechat_bottom">
            <p class="weixin">微信粉丝数：<i>{{weChat_click_amount}}</i></p>
            <p class="weibo">微博阅读量：<i>{{weChat_user_amount}}</i></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { operationalData } from '@/servers/interface'
export default {
  name: 'operationData',
  data () {
    return {
      app_install_amount: '',
      app_user_amount: '',
      web_click_amount: '',
      web_user_amount: '',
      weChat_click_amount: '',
      weChat_user_amount: ''
    }
  },
  created () {
    this.operationalData()
  },
  mounted () {
    this.setFontsize('operationData')
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 1920 * 100 + 'px'
  },
  methods: {
    operationalData () {
      operationalData().then(res => {
        if (!res.data.error_code) {
          this.app_install_amount = res.data.result.app_install_amount
          this.app_user_amount = res.data.result.app_user_amount
          this.web_click_amount = res.data.result.web_click_amount
          this.web_user_amount = res.data.result.web_user_amount
          this.weChat_click_amount = res.data.result.weChat_click_amount
          this.weChat_user_amount = res.data.result.weChat_user_amount
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.operationData {
  width: pxrem(1920px);
  height: pxrem(1080px);
  padding: pxrem(58px) pxrem(25px) pxrem(53px);
  position: relative;
  background: #0b072d;
  .operationData-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(220px) pxrem(63px) pxrem(0px);
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .app_div{
      width: pxrem(422px);
      height: pxrem(656px);
      background: url('./assets/app.png') no-repeat left bottom;
      background-size: 100% 100%;
      position: relative;
      box-sizing: border-box;
      p{
        font-size: pxrem(40px);
        text-align: center;
        i{
          font-style: normal;
          font-size: pxrem(40px);
          font-weight: 600;
          // padding-left: pxrem(43px);
          color: #fe7e16;
        }
      }
      .anzhuang{
        position: absolute;
        bottom: pxrem(224px);
        left: 50%;
        transform: translateX(-50%);
      }
      .yonghu{
        position: absolute;
        bottom: pxrem(79px);
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .web_div{
      width: pxrem(422px);
      height: pxrem(656px);
      background: url('./assets/web.png') no-repeat left bottom;
      background-size: 100% 100%;
      position: relative;
      box-sizing: border-box;
      p{
        font-size: pxrem(40px);
        text-align: center;
        i{
          font-style: normal;
          font-size: pxrem(40px);
          font-weight: 600;
          // padding-left: pxrem(43px);
          color: #dac300;
        }
      }
      .fangwen{
        position: absolute;
        bottom: pxrem(224px);
        left: 50%;
        transform: translateX(-50%);
      }
      .yonghu{
        position: absolute;
        bottom: pxrem(79px);
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .wechat_div{
      width: pxrem(822px);
      height: pxrem(656px);
      background: url('./assets/wechat.png') no-repeat left bottom;
      background-size: 100% 100%;
      position: relative;
      .wechat_child{
        width: pxrem(420px);
        height: pxrem(656px);
        .wechat_top{
          height: pxrem(115px);
          padding-left: pxrem(72px);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: pxrem(40px);
          img{
            width: pxrem(57px);
            height: pxrem(114px);
            vertical-align: middle;
            position: absolute;
            left: pxrem(0px);
            top: pxrem(0px);
          }
          .title{
            font-size: pxrem(24px);
            font-weight: 600;
            color: #fff;
          }
          .num{
            background: url('./assets/article.png') no-repeat left center;
            font-size: pxrem(24px);
            color: #00a2ff;
            margin-top: pxrem(20px);
            text-align: left;
            padding-left: pxrem(24px);
          }
        }
        .wechat_bottom{
          p{
            font-size: pxrem(40px);
            text-align: center;
            i{
              font-style: normal;
              font-size: pxrem(40px);
              font-weight: 600;
              // padding-left: pxrem(43px);
              color: #01feb6;
            }
          }
          .weixin{
            position: absolute;
            left: pxrem(0px);
            bottom: pxrem(224px);
            padding-left: pxrem(70px);
          }
          .weibo{
            position: absolute;
            left: pxrem(0px);
            bottom: pxrem(79px);
            padding-left: pxrem(70px);
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
            padding-left: pxrem(77px);
          }
          .weibo{
            padding-left: pxrem(77px);
          }
        }
      }
    }
  }
}
</style>