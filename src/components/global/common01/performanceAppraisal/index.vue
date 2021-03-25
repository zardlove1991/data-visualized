<template>
  <div class="performanceAppraisal" id="performanceAppraisal">
    <div class="performanceAppraisal-wrap">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(v, k) in dataList" :key="k">
          <div class="item_top">
            <div class="touxiang">
              <img src="./assets/head.png"/>
              <p class="user_name">{{v.userName}}</p>
            </div>
            <div class="top_right">
              <div class="pro right_div">
                生产量<i>{{v.total_amount}}</i>
              </div>
              <div class="dev right_div">
                发布量<i>{{v.total_publish_amount}}</i>
              </div>
            </div>
          </div>
          <div class="split_line"></div>
          <div class="item_bottom">
            <div class="click bottom_div">
              <p class="num">{{v.total_click_amount}}</p>
              <p class="tit">总点击量</p>
            </div>
            <div class="comment bottom_div">
              <p class="num">{{v.total_forward_amount}}</p>
              <p class="tit">总评论量</p>
            </div>
            <div class="zan bottom_div">
              <p class="num">{{v.total_like_amount}}</p>
              <p class="tit">总点赞量</p>
            </div>
            <div class="share bottom_div">
              <p class="num">{{v.total_share_amount}}</p>
              <p class="tit">总分享量</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { performanceAppraisal } from '@/servers/interface'
export default {
  name: 'performanceAppraisal',
  data () {
    return {
      dataList: [],
      swiperOption: {
        init: false,
        loop: true,
        slidesPerView: 4,
        spaceBetween: 40,
        freeMode: true,
        slidesPerGroup: 1,
        speed: 5000,
        grabCursor: true,
        autoplay: {
          delay: 1,
          disableOnInteraction: false
        }
      }
    }
  },
  created () {
    this.performanceAppraisal()
  },
  mounted () {
    this.setFontsize('performanceAppraisal')
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 1920 * 100 + 'px'
  },
  methods: {
    performanceAppraisal () {
      performanceAppraisal().then(res => {
        if (!res.data.error_code) {
          // let topicVal = res.data.result.topic_today_amount.toString()
          this.dataList.push({
            userImg: './assets/head.png',
            userName: '陈小依',
            total_amount: res.data.result.total_amount,
            total_publish_amount: res.data.result.total_publish_amount,
            total_click_amount: res.data.result.total_click_amount,
            total_forward_amount: res.data.result.total_forward_amount,
            total_like_amount: res.data.result.total_like_amount,
            total_share_amount: res.data.result.total_share_amount
          }, {
            userImg: './assets/head.png',
            userName: '梁苗苗',
            total_amount: res.data.result.total_amount,
            total_publish_amount: res.data.result.total_publish_amount,
            total_click_amount: res.data.result.total_click_amount,
            total_forward_amount: res.data.result.total_forward_amount,
            total_like_amount: res.data.result.total_like_amount,
            total_share_amount: res.data.result.total_share_amount
          }, {
            userImg: './assets/head.png',
            userName: '葛中流',
            total_amount: res.data.result.total_amount,
            total_publish_amount: res.data.result.total_publish_amount,
            total_click_amount: res.data.result.total_click_amount,
            total_forward_amount: res.data.result.total_forward_amount,
            total_like_amount: res.data.result.total_like_amount,
            total_share_amount: res.data.result.total_share_amount
          }, {
            userImg: './assets/head.png',
            userName: '洛小天',
            total_amount: res.data.result.total_amount,
            total_publish_amount: res.data.result.total_publish_amount,
            total_click_amount: res.data.result.total_click_amount,
            total_forward_amount: res.data.result.total_forward_amount,
            total_like_amount: res.data.result.total_like_amount,
            total_share_amount: res.data.result.total_share_amount
          })
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
      })
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style>
  .swiper-container-free-mode > .swiper-wrapper {
		transition-timing-function: linear!important;
	}
</style>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.performanceAppraisal {
  width: pxrem(1920px);
  height: pxrem(1080px);
  padding: pxrem(55px) pxrem(25px);
  position: relative;
  background: #0b072d;
  box-sizing: border-box;
  .performanceAppraisal-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(198px) pxrem(57px) pxrem(0px);
    color: #fff;
    box-sizing: border-box;
    .swiper-container{
      width: 100%;
      height: pxrem(690px);
      .swiper-wrapper{
        height: pxrem(690px);
        .swiper-slide{
          // width: pxrem(375px)!important;
          height: 100%;
          background: url("./assets/topBack.png") no-repeat center;
          background-size: 100% 100%;
          box-sizing: border-box;
          // margin-right: pxrem(50px);
          display: inline-block;
          padding: pxrem(50px) pxrem(37px) pxrem(0px);
          .item_top{
            height: pxrem(190px);
            // padding-left: pxrem(25px);
            .touxiang{
              // width: pxrem(55px);
              height: pxrem(190px);
              float: left;
              img{
                width: pxrem(55px);
                height: pxrem(110px);
                vertical-align: middle;
              }
              .user_name{
                font-size: pxrem(34px);
                color: #fff;
                margin-top: pxrem(28px);
                text-align: center;
                transform: scale(0.5,1);
                transform-origin: 50% 0;
              }
            }
            .top_right{
              // width: pxrem(160px);
              width: 100%;
              position: absolute;
              height: pxrem(190px);
              padding-right: pxrem(37px);
              // float: right;
              padding-top: pxrem(20px);
              box-sizing: border-box;
              .right_div{
                height: pxrem(50px);
                font-size: pxrem(40px);
                color: #fff;
                letter-spacing: pxrem(3px);
                transform: scale(0.5,1);
                transform-origin: 100% 0;
                // margin-right: pxrem(100px);
                i{
                  font-style: normal;
                  font-size: pxrem(40px);
                  color: #13fee3;
                  margin-left: pxrem(40px);
                }
              }
              .dev{
                margin-top: pxrem(60px);
              }
            }
          }
          .split_line{
            height: pxrem(7px);
            background: url('./assets/split_line.png') no-repeat;
            background-size: 100% 100%;
            margin-top: pxrem(57px);
          }
          .item_bottom{
            margin-top: pxrem(60px);
            // overflow: hidden;
            .bottom_div{
              width: 50%;
              float: left;
              .num{
                font-size: pxrem(46px);
                font-weight: 600;
                color: #00d8ff;
                transform: scale(0.5,1);
              }
              .tit{
                font-size: pxrem(30px);
                color: #fff;
                margin-top: pxrem(18px);
                transform: scale(0.5,1);
              }
            }
            .zan{
              margin-top: pxrem(65px);
            }
            .share{
              margin-top: pxrem(65px);
            }
          }
        }
      }
    }
  }
}
</style>