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
        <!-- <div class="wechat_child wechat1">
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
        </div> -->
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(v, k) in dataList" :key="k">
            <div class="wechat_child">
              <div class="wechat_top">
                <img v-if="v.account_avatar" :src="v.account_avatar" />
                <img v-if="!v.account_avatar" src="./assets/numBack.png" />
                <div class="title">{{v.account_name}}</div>
                <div class="num">{{v.article_count}}</div>
              </div>
              <div class="wechat_bottom">
                <p class="weixin">微信粉丝数：<i>{{v.cumulate_user}}</i></p>
                <p class="weibo">微博阅读量：<i>{{v.int_page_read_count}}</i></p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { operationalData } from '@/servers/interface'
export default {
  name: 'operationData',
  data () {
    return {
      app_install_amount: '',
      app_user_amount: '',
      web_click_amount: '',
      web_user_amount: '',
      dataList: [],
      swiperOption: {
        init: false,
        loop: true,
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 3000,
        autoplay: true
      }
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
          this.dataList = res.data.result.wechat
        }
      })
    }
  },
  watch: {
    dataList: function () {
      var _this = this
      _this.$nextTick(function () {
        let swiper = this.$refs.mySwiper.swiper
        swiper.init()
        swiper.effect = 'fade'
      })
    }
  },
  components: {
    swiper,
    swiperSlide
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
        font-size: pxrem(48px);
        // text-align: center;
        i{
          font-style: normal;
          font-size: pxrem(48px);
          font-weight: 600;
          color: #fe7e16;
        }
      }
      .anzhuang{
        width: 200%;
        position: absolute;
        bottom: pxrem(224px);
        left: -50%;
        transform: scale(0.5,1);
        text-align: left;
        padding-left: pxrem(220px);
      }
      .yonghu{
        width: 200%;
        position: absolute;
        bottom: pxrem(79px);
        left: -50%;
        transform: scale(0.5,1);
        text-align: left;
        padding-left: pxrem(220px);
      }
    }
    .web_div{
      width: pxrem(422px);
      height: pxrem(656px);
      background: url('./assets/web_xin.png') no-repeat left bottom;
      background-size: 100% 100%;
      position: relative;
      box-sizing: border-box;
      p{
        font-size: pxrem(48px);
        // text-align: center;
        i{
          font-style: normal;
          font-size: pxrem(48px);
          font-weight: 600;
          color: #dac300;
        }
      }
      .fangwen{
        width: 200%;
        position: absolute;
        bottom: pxrem(224px);
        left: -50%;
        transform: scale(0.5,1);
        text-align: left;
        padding-left: pxrem(220px);
      }
      .yonghu{
        width: 200%;
        position: absolute;
        bottom: pxrem(79px);
        left: -50%;
        transform: scale(0.5,1);
        text-align: left;
        padding-left: pxrem(220px);
      }
    }
    .wechat_div{
      width: pxrem(822px);
      height: pxrem(656px);
      background: url('./assets/wechat_xin.png') no-repeat left bottom;
      background-size: 100% 100%;
      position: relative;
      .swiper-container{
        width: 100%;
        height: pxrem(656px);
        .swiper-wrapper{
          height: pxrem(656px);
          .swiper-slide{
            // width: pxrem(375px)!important;
            height: 100%;
            // margin-right: pxrem(50px);
            display: inline-block;
            .wechat_child{
              position: absolute;
              left: pxrem(0px);
              top: pxrem(0px);
              width: pxrem(420px);
              height: pxrem(656px);
              display: table-cell;
              text-align: center;
              .wechat_top{
                height: pxrem(115px);
                padding-left: pxrem(72px);
                // position: absolute;
                // left: 50%;
                // transform: translateX(-50%);
                position: relative;
                display: inline-block;
                top: pxrem(50px);
                left: pxrem(50px);
                img{
                  width: pxrem(57px);
                  height: pxrem(114px);
                  vertical-align: middle;
                  position: absolute;
                  left: pxrem(0px);
                  top: pxrem(0px);
                }
                .title{
                  font-size: pxrem(36px);
                  font-weight: 600;
                  color: #fff;
                  transform-origin: 0 0;
                  transform: scale(0.5,1);
                }
                .num{
                  background: url('./assets/article.png') no-repeat left center;
                  font-size: pxrem(30px);
                  color: #00a2ff;
                  margin-top: pxrem(20px);
                  text-align: left;
                  padding-left: pxrem(48px);
                  background-size: auto 100%;
                  transform-origin: 0 0;
                  transform: scale(0.5,1);
                }
              }
              .wechat_bottom{
                p{
                  font-size: pxrem(48px);
                  text-align: center;
                  font-stretch: ultra-condensed;
                  i{
                    font-style: normal;
                    font-size: pxrem(48px);
                    font-weight: 600;
                    // padding-left: pxrem(43px);
                    color: #01feb6;
                  }
                }
                .weixin{
                  width: pxrem(840px);
                  position: absolute;
                  left: -50%;
                  bottom: pxrem(224px);
                  // padding-left: pxrem(60px);
                  transform: scale(0.5,1);
                  text-align: left;
                  padding-left: pxrem(220px);
                }
                .weibo{
                  width: pxrem(840px);
                  position: absolute;
                  left: -50%;
                  bottom: pxrem(79px);
                  // padding-left: pxrem(60px);
                  transform: scale(0.5,1);
                  text-align: left;
                  padding-left: pxrem(220px);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>