<template>
  <div class="common01-leader-news" id="huaianLeaderNews01">
    <div class="leader-news01 common01-border">
      <div class="common01-title">领导动态</div>
      <div class="wrap-top sys-flex flex-justify-around">
        <img :src='person.index_pic' alt="" />
        <div class="detail-box">
          <div class="person-name">{{person.title}}</div>
          <div class="person-title">{{person.brief}}</div>
          <div class="swiper-box sys-flex sys-flex-center">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide v-for="(v, k) in swiperList" :key="k">
                <img :src="v.index_pic + '?imageView/3/w/906/h/510/q/50'" alt="">
                <div class="swiper-title overhidden">{{v.title}}</div>
              </swiper-slide>
            </swiper>
            <div class="swiper-pagination swiper-pagination2"></div>
          </div>
        </div>
      </div>
      <ul class="wrap-list">
        <li v-for="(v, k) in contentList" :key="k" :style="{'animation-delay' : k/2+'s'}" :class="{'flipInX' : v}" class="animated overhidden">
          <div class="li-title overhidden">{{v.title}}</div>
          <div class="li-sub">
            <span>作者：{{v.create_user_name}}</span>
            <span>{{v.created_at.slice(0, -3)}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getContentList } from '@/servers/interface'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'huaianLeaderNews01',
  data () {
    return {
      person: {},
      contentList: [],
      swiperList: [],
      swiperOption: {
        init: false,
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        speed: 3000,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-default',
          bulletActiveClass: 'swiper-pagination-active'
        },
        direction: 'horizontal',
        observer: true,
        observeParents: true,
        paginationClickable: true
      }
    }
  },
  created () {
    this.getContentList(278)
  },
  mounted () {
    // this.setFontSize('huaianLeaderNews01')
    document.querySelector('html').style.fontSize = '100px'
  },
  watch: {
    swiperList: function () {
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
  },
  methods: {
    getContentList (id) {
      getContentList(id).then(res => {
        if (!res.data.error_code) {
          this.person = res.data.slice(0, 1)[0]
          this.swiperList = res.data.slice(1, 5)
          this.contentList = res.data.slice(5, 9)
        }
      })
    }
    // setFontSize (size) {
    //   if (this.customSize && size && size > 0) {
    //     return `font-size: ${size / 100}rem!important`
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
@import "../style/index.scss";
.common01-leader-news {
  width: 100%;
  height: 100%;
  padding: 0 pxrem(40px) pxrem(40px);
  .leader-news01 {
    background: url(./assets/bg02.png) no-repeat center;
    padding: 2.2rem 0.8rem 0.95rem 0.78rem;
    padding-top: 2rem !important;
    padding-right: 0.8rem !important;
    color: #fff;
    .common01-title {
      font-size: pxrem(60px);
      font-family: Source Han Sans CN Bold, Source Han Sans CN Bold-Bold;
      font-weight: 700;
      text-align: left;
      color: #ffffff;
      text-shadow: 0px pxrem(16px) pxrem(20px) pxrem(20px) rgba(0,222,255,0.20); 
    }
    .wrap-top {
      img {
        width: pxrem(557px);
        height: pxrem(810px);
        margin-right: pxrem(82px);
      }
      .detail-box {
        text-align: left;
        .person-name {
          text-align: left;
          font-size: pxrem(70px);
          font-family: PingFang SC Semibold, PingFang SC Semibold-Semibold;
          font-weight: 600;
          color: #00fcff;
          margin-bottom: pxrem(25px);
        }
        .person-title {
          font-size: pxrem(50px);
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
          font-weight: 500;
          color: #ffffff;
          line-height: pxrem(46px);
          margin-bottom: pxrem(44px);
        }
        .swiper-box {
          position: relative;
          background: url(./assets/img_bg.png) no-repeat center;
          background-size: 100% 100%;
          width: pxrem(980px);
          height: pxrem(600px);
          .swiper-container, .swiper-slide {
            width: pxrem(906px) !important;
            height: pxrem(510px);
            img {
              width: pxrem(906px);
              height: pxrem(510px);
              position: relative;
            }
            .swiper-title{
              width: pxrem(819px);
              left: pxrem(29px);
              position: absolute;
              bottom: pxrem(28px);
              font-size: pxrem(38px);
              font-family: PingFang SC Medium, PingFang SC Medium-Medium;
              font-weight: 500;
              text-align: left;
              color: #ffffff;
              line-height: pxrem(48px);
            }
          }
        }
      }
    }
    .wrap-list{
      margin-top: pxrem(132px);
      li {
        padding: pxrem(31px) pxrem(50px);
        background: url(./assets/news_bg.png) no-repeat center;
        background-size: 100% 100%;
        height: pxrem(181px);
        text-align: left;
        box-sizing: border-box;
        margin-bottom: pxrem(49px);
        .li-title {
          width: 1452px;
          font-size: pxrem(42px);
          font-family: Source Han Sans CN Bold, Source Han Sans CN Bold-Bold;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: pxrem(20px);
        }
        .li-sub {
          width: pxrem(1452px);
          font-size: pxrem(32px);
          font-family: Source Han Sans CN Medium, Source Han Sans CN Medium-Medium;
          font-weight: 500;
          color: #00f6ff;
          span:first-child {
            margin-right: pxrem(44px);
          }
        }
      }
    }
    .swiper-pagination-default {
      background: url(./assets/swiper_default.png) no-repeat center;
      background-size: 100% 100%;
      width: pxrem(40px);
      height: pxrem(12px);
      display: inline-block;
    }
    .swiper-pagination-active {
      background: url(./assets/swiper_selected.png) no-repeat center;
      background-size: 100% 100%;
      width: pxrem(40px);
      height: pxrem(12px);
      display: inline-block;
    }
    .swiper-pagination2 {
      bottom: pxrem(15px);
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
