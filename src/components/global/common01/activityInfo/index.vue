<template>
  <div class="common-activityInfo ">
    <div class="activityInfo-page common01-border" v-if="!showDetail">
      <div class="common01-title">{{viewAttr.header || '活动资讯'}}</div>
      <div class="list-title">
        <div class="list-item flex sys-flex-center animated"
          :class="{'flipInX' : v.title}"
          :style="{'animation-delay' : k/2 + 's'}"
          v-for="(v, k) in dataList"
          @click="getDetail(v)"
          :key="k">
          <div class="type-area sys-flex sys-flex-center">
            <img v-if="k === 0" src="./assets/new.png" />
            <span class="common01-ft38" v-if="k !== 0">【{{v.typeName || '文稿'}}】</span>
          </div>
          <div class="list-text overhidden common01-ft38 flex-one">{{v.title}}</div>
          <div class="list-read flex flex-center">
            <img class="img-icon" src="@/assets/common/reader.png" />
            <span class="common01-ft32">{{v.click_num}}</span>
          </div>
          <div class="list-time flex flex-center">
            <img class="img-icon" src="@/assets/common/time.png" />
            <span class="common01-ft32">{{v.click_num}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="activityInfo-detail common01-border" v-if="showDetail">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(v, k) in dataList" :key="k" >
          <div class="detail-title common01-ft60 overhidden">{{v.title}}</div>
          <div class="detail-list">
            <div class="source">来源：{{v.source}}</div>
            <div class="author">发布时间：{{v.create_time}}</div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev swiper-button-white" @click="goBefore()"></div>
      <div class="swiper-button-next swiper-button-white" @click="goNext"></div>
      <!--<div class="detail-content common01-ft36">
        <div class="news" v-if="detailData.listType === 'weChat' || (detailData.listType === 'm2o' && detailData.type === 'news')" v-html="detailData.listType === 'weChat' ? handelHtml(detailData.content) : handelHtml(detailData.content.html)"></div>
        <div class="pic" v-if="detailData.listType === 'm2o' && detailData.type === 'tuji'">
          <img :src="v.pic" v-for="(v, k) in detailData.content" :key="k" />
        </div>
        <div class="video" v-if="detailData.listType === 'm2o' && detailData.type === 'vod'">
          <video-player
            class="vjs-custom-skin"
            ref="videoPlayer"
            :options="detailData.content"
            :playsinline="true"
            customEventName="customstatechangedeventname"
          ></video-player>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { getActivityInfo } from '@/servers/interface'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'manuscript',
  data () {
    return {
      dataList: [],
      count: 12,
      detailData: {},
      showDetail: false,
      page: 1,
      showIndex: 0,
      isPaging: true,
      typeList: {
        article: '文稿',
        gallery: '图集',
        topic: '专题',
        link: '外链',
        video: '视频'
      },
      frequency: 25000,
      swiperOption: {
        notNextTick: true,
        initialSlide: 0,
        speed: 1000,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        },
        direction: 'horizontal',
        loop: true,
        observer: true,
        observeParents: true,
        paginationClickable: true
      }
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('lishui-manuscriptoutput')
    setInterval(() => {
      if (!this.showDetail) {
        this.getDataList()
      }
    }, this.frequency)
  },
  methods: {
    goBefore () {
      console.log(this.$refs.mySwiper.swiper.realIndex + 1)
    },
    goNext () {
      console.log(this.$refs.mySwiper.swiper.realIndex)
      if (this.$refs.mySwiper.swiper.realIndex === this.dataList.length - 2) {
        this.getMoreList()
      }
    },
    getDetail (item) {
      this.showDetail = true
      this.showIndex = 0
      this.dataList.forEach((v, index) => {
        if (v.id === item.id) {
          this.showIndex = index
        }
      })
      this.swiperOption.initialSlide = this.showIndex - 1
    },
    backList () {
      this.showDetail = false
    },
    getMoreList () { // 接口需要调整 获取更多
      console.log(this.dataList)
      this.dataList = this.dataList.concat(this.dataList)
    },
    getDataList () {
      getActivityInfo(this.count, this.page).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data && res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data.map(v => {
                return {
                  ...v
                }
              })
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
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common-activityInfo{
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .activityInfo-page{
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    .list-item{
      margin-bottom: pxrem(110px);
      align-items:center;
    }
    .type-area{
      color:#0AFBF2;
      span {
        color: #0afbf2;
      }
      img {
        width: 1.07rem;
        height: 0.48rem;
        margin: 0 0.225rem;
      }
    }
    .list-title{
      color:#fff;
      font-size:0.38rem;
      text-align:left;
    }
    .list-text {
      width: 40%;
      text-align: left;
    }
    .list-time {
      .img-icon {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
    .list-read {
      margin: 0 0.8rem 0 0.65rem;
      font-size:0.32rem;
      .img-icon {
        width: 0.42rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
  }
  .activityInfo-detail {
    padding: pxrem(100px) pxrem(72px) pxrem(10px);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .detail-title {
        font-weight: bold;
        font-size:0.52rem;
        line-height:0.52rem;
        color:#fff;
        margin-bottom:0.38rem;
        text-align:center;
    }
    .detail-list {
      color: #fff;
      margin:0 auto;
      text-align:center;
      .source {
        margin-right: 0.34rem;
        display:inline-block;
        font-size:0.28rem;
      }
      .author{
        display:inline-block;
        font-size:0.28rem;
      }
    }
    .detail-content {
      width: 100%;
      height: 6.2rem;
      overflow: hidden;
      margin-top: pxrem(40px);
      &>div {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
      }
      .pic {
        img {
          margin-bottom: pxrem(20px);
        }
      }
      .video {
        .vjs-custom-skin {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }
    .swiper-slide{
      width:100%!important;
    }
    .swiper-button-prev{
      background-image:url(./assets/icon_left.png)!important;
      width:0.4rem;
      height:0.78rem;
      background-size:100%;
      cursor:pointer;
    }
    .swiper-button-next{
      background-image:url(./assets/icon_right.png)!important;
      width:0.4rem;
      height:0.78rem;
      background-size:100%;
      cursor:pointer;
    }
  }
}

</style>
