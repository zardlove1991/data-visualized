<template>
  <div class="shishi-igitalNewspaper" id="shishi-igitalNewspaper">
    <div class="websitecontent-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">数据报/APP</div>
      <div class="sys-flex flex-justify-between">
        <div class="data-box">
          <div class="left-title">日报数字报</div>
          <div class="data-main sys-flex">
            <swiper :options="swiperOption" ref="mySwiper" >
              <swiper-slide class="sys-flex sys-flex-wrap" style="height:100%!important;align-content:space-between;" v-for="(item,k) in dataList" :key="k">
                  <iframe :src="item"></iframe>
              </swiper-slide>
              <img class="left-icon swiper-button-prev" src="./assets/left.png" alt="">
              <img class="right-icon swiper-button-next" src="./assets/right.png" alt="">
            </swiper>
          </div>
        </div>
        <div class="data-box">
          <div class="left-title">看石狮<span class="en-title">APP</span></div>
          <div class="data-main sys-flex">
            <!-- <img class="left-icon swiper-button-prev" src="./assets/left.png" alt=""> -->
            <!-- <iframe :src="appUrl"></iframe> -->
            <!-- <img class="right-icon swiper-button-next" src="./assets/right.png" alt=""> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'websiteContent',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        // notNextTick: true,
        speed: 2000,
        autoplay: false,
        // autoplay: {
        //   delay: 15000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false
        // },
        autoHeight: true,
        // direction: 'vertical',
        effect: 'flip',
        initialSlide: 0,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        paginationClickable: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      // dataUrl: `http://ssqb.ssrb.com.cn/h5`,
      dataList: [
        'http://ssqb.ssrb.com.cn/h5',
        'http://epaper.dfsc.com.cn/h5',
        'http://ssjy.ssrb.com.cn/h5'
      ],
      appUrl: ``
    }
  },
  mounted () {
    this.setFontsize('shishi-igitalNewspaper')
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
@import '../../common01/style/index.scss';
.shishi-igitalNewspaper {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  position: relative;
  .websitecontent-wrap {
    padding: pxrem(230px) pxrem(78px) pxrem(95px) pxrem(78px);
    .data-box {
      background: url(./assets/data_bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: pxrem(828px);
      height: pxrem(730px);
      position: relative;
      .left-title {
        width: pxrem(48px);
        position: absolute;
        left: pxrem(35px);
        top: pxrem(225px);
        font-size: pxrem(48px);
        font-weight: 500;
        text-align: left;
        color: #ffffff;
        line-height: pxrem(60px);
        .en-title {
          position: relative;
          left: pxrem(-20px);
        }
      }
      .data-main {
        height: 100%;
        margin-left: pxrem(130px);
        align-items: center;
        .swiper-container{
          width: 100%;
          height: 100%;
          .swiper-wrapper{
            height: 100%;
          }
        }
        .left-icon {
          width: pxrem(37px);
          height: pxrem(72px);
          left: pxrem(24px)
        }
        .right-icon {
          width: pxrem(37px);
          height: pxrem(72px);
          right: pxrem(43px);
        }
        iframe {
          margin: pxrem(16px) 0 0 pxrem(95px);
          display: block;
          width: pxrem(495px);
          height: pxrem(700px);
          outline: none;
          border: none;
          box-shadow: none;
          z-index: 999;
          -webkit-appearance: none;
          background-color: #ffffff;
        }
      }
        
    }
  }
}
</style>