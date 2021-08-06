<template>
    <div class="wz-wrap" id="wzPerformanceRank">
      <div class="content">
        <div class="main-title">绩效考核排行</div>
          <div class="main-wrap" v-for="(item,index) in dataList" :key="index">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide>       
              <div class="main-item flex sys-flex-center">
                <div class="item-left">
                  <div class="avatar">
                    <img src="./assets/ava-default.png" alt="" class="avatar-img">
                  </div>
                  <p class="name">{{item.username}}</p>
                </div>
                <div class="item-middle flex sys-vertical flex-justify-around">
                    <div>生产量：<span class="num">{{item.total_amount}}</span></div>
                    <div>发布量：<span class="num">{{item.total_publish_amount}}</span></div>
                </div>
                <div class="item-right flex flex-justify-between">
                    <div class="item">
                      <p class="num">{{item.total_click_amount}}</p>
                      <p>总点击量</p>
                    </div>
                    <div class="item">
                      <p class="num">{{item.total_forward_amount}}</p>
                      <p>总评论量</p>
                    </div>
                    <div class="item">
                      <p class="num">{{item.total_like_amount}}</p>
                      <p>总点赞量</p>
                    </div>
                    <div class="item">
                      <p class="num">{{item.total_share_amount}}</p>
                      <p>总分享量</p>
                    </div>
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
import { performanceAppraisal } from '@/servers/interface'
export default {
  name: 'performanceRank',
  data () {
    return {
      dataList: [],
      swiperOption: {
        speed: 5000,
        autoplay: true,
        autoHeight: true,
        slidesPerView: 3,
        slidesPerGroup: 3,
        effect: 'flip',
        initialSlide: 0,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        paginationClickable: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  created () {
    this.getDataList()
    // setInterval(() => {
    //   this.getDataList()
    // }, 5000)
  },
  mounted () {
    this.setFontsize('wzPerformanceRank')
  },
  methods: {
    getDataList () {
      performanceAppraisal().then(res => {
        if (!res.data.error_code) {
          this.dataList = res.data.result
        }
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
$color: #00F6FF;
@mixin numStyle{
  color: $color;
  font-weight: 500;
}
.wz-wrap{
    width: 100%;
    height:100%;
    padding: 1%;
    .content{
        width: 100%;
        height:100%;
        padding: 1.5%;
        background: url("./assets/main-bg.png") no-repeat;
        background-size: 100% 100%;
        .main-title{
          font-size: pxrem(58px);
          font-weight: 500;
          color: #ffffff;
          text-align: left;
        }
        .swiper-container{
          width: 100%;
          height: 100%;
          .swiper-slide{
            width: 100%!important;
          }
        }
        .main-wrap{
            width: 100%;
            margin-top: 1.5%;
            .main-item{
              width: 100%;
              height: pxrem(220px);
              padding: 0 pxrem(59px);
              font-size: pxrem(32px);
              color: #ffffff;
              background: url("./assets/item-bg.png") no-repeat;
              background-size: 100% 100%;
              margin-bottom: pxrem(30px);
              &:nth-child(1) .avatar{
                border: 4px solid #f44461;
              }
                &:nth-child(2) .avatar{
                border: 4px solid #FC6A22;
              }
                &:nth-child(3) .avatar{
                border: 4px solid #F6A904;
              }
              .item-left{
                width: 5%;
                .avatar{
                  width: pxrem(110px);
                  height: pxrem(110px);
                  border-radius: 50%;
                  .avatar-img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                  }
                }
                .name{
                  font-size: pxrem(34px);
                  margin-top: pxrem(19px);
                }
              }
              .item-middle{
                 width: 20%;
                 height: pxrem(179px);
                 margin-left: pxrem(85px);
                 padding-right: pxrem(69px);
                 border-right: 1px solid #009cff;
                .num{
                  font-size: pxrem(36px);
                  @include numStyle;
                }
              }
              .item-right{
                width: 60%;
                margin-left: pxrem(69px);
                .num{
                  font-size: pxrem(46px);
                  @include numStyle;
                  margin-bottom: pxrem(42px);
                }   
              }
            }
        }
    }


}
</style>
