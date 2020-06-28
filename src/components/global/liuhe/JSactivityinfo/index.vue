<template>
  <div class="common-activityInfo-js">
    <div class="activityInfo-page common01-border" v-if="!showDetail">
      <div class="common01-title page-title">{{ viewAttr.header || '资讯信息' }}</div>
      <!-- <div class="tab-btn sys-flex">
        <div
          :class="showOrg?'btn common01-ft38 act':'btn common01-ft38'"
          @click="showOrg=!showOrg"
        >活动资讯</div>
        <div
          :class="showOrg?'btn common01-ft38':'btn common01-ft38 act'"
          @click="showOrg=!showOrg"
        >先进典型</div>
      </div> -->
      <div class="list-title">
        <div
          class="list-item flex sys-flex-center animated"
          :class="{ flipInX: v.title }"
          :style="{ 'animation-delay': k / 2 + 's' }"
          v-for="(v, k) in dataList"
          @click="getDetail(v)"
          :key="k"
        >
          <!--  -->
          <div class="list-text overhidden common01-ft38 flex-one">
            <div class="flex">
              <div class="type-area sys-flex sys-flex-center">
                <img v-if="k === 0" src="./assets/new.png" />
                <img v-if="k === 1" src="./assets/icon_hot.png" />
              </div>
              <div :class="k<2?'title-div haveico':'title-div'">
                <p>{{ v.title }}</p>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="right-part">
            <div class="flex">
              <div class="list-read flex flex-center">
                <img class="img-icon" src="@/assets/common/reader.png" />
                <span class="common01-ft32 click-span">{{ v.click_num }}</span>
              </div>
              <div class="list-time flex flex-center">
                <img class="img-icon" src="@/assets/common/time.png" />
                <span class="common01-ft32">{{ v.showTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll_icon"> 
        <!-- <i class="el-icon-top" :class="{icon_opcity: page === 1}" @click="lastPage"></i>
        <i class="el-icon-bottom" :class="{icon_opcity: page === PageTotal}"  @click="nextPage"></i> -->
        <img class="icon_up" :class="{icon_opcity: page === 1}" src="./assets/arrow_up.png" @click="lastPage"/>
        <img class="icon_up" src="./assets/arrow_down.png" :class="{icon_opcity: page === PageTotal}" @click="nextPage"/>
      </div>
    </div>
    <div class="activityInfo-detail common01-border" v-if="showDetail">
      <!-- <div class="back-line">
        <div @click="backList()" class="back">
          <div class="back-img">
            <img src="./assets/icon_back.png" />
          </div>
          <span class="back-text">返回</span>
        </div>
      </div> -->
      <div class="back-btn common01-ft36" @click="backList()">返回</div>
      <swiper
        :options="swiperOption"
        @slideChangeTransitionEnd='swiperChange'
        ref="mySwiper"
      >
        <swiper-slide v-for="(v, k) in swiperDataList" :key="k" class="content-swiper">
          <div class="detail-title">{{ v.title }}</div>
          <div class="detail-list">
            <div class="source">来源：{{ v.source }}</div>
            <div class="author">发布时间：{{ v.showTime }}</div>
            <div class="bg-line">
              <p class="line"></p>
            </div>
          </div>
          <div
            class="detail-content common01-ft36"
            :style="setFontSize(40)"
            v-if="v.contentDetail"
          >
            <div class="video" v-if="v.videoList.length">
              <video-player
                v-for="video in v.videoList"
                :key="video.file_name"
                class="vjs-custom-skin"
                ref="videoPlayer"
                :options="video.options"
                :playsinline="true"
                customEventName="customstatechangedeventname"
              ></video-player>
            </div>
            <div class="contnet-detail-div" v-html="handelHtml(v.contentDetail)"></div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev swiper-button-white"></div>
      <div class="swiper-button-next swiper-button-white"></div>
    </div>
  </div>
</template>

<script>
import { getJSActivityInfo, getActivityInfoDetail } from '@/servers/interface'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-contrib-hls'
export default {
  name: 'manuscript',
  data () {
    return {
      // showOrg: true,
      columnId: 0,
      dataList: [],
      PageTotal: 0,
      swiperDataList: [],
      count: 5,
      detailData: {},
      showDetail: false,
      page: 1,
      maxPage: 3,
      currentPage: 1,
      swiperLeftPage: 1, // 定位swiper滑动边界页码
      swiperRightPage: 1, // 定位swiper滑动边界页码
      showIndex: 0,
      isPaging: true,
      typeList: {
        article: '文稿',
        gallery: '图集',
        topic: '专题',
        link: '外链',
        video: '视频'
      },
      frequency: 10000,
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
        loop: false,
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
    // setInterval(() => {
    //   if (!this.showDetail) {
    //     this.getDataList()
    //   }
    // }, this.frequency)
  },
  watch: {
    // showOrg (val) {
    //   this.columnId = val ? 0 : 1246
    //   this.getDataList()
    // }
  },
  methods: {
    // 下一页
    nextPage () {
      if (this.page === this.PageTotal) return false
      this.page += 1
      this.getDataList()
    },
    // 上一页
    lastPage () {
      if (this.page === 1) return false
      this.page -= 1
      this.getDataList()
    },
    swiperChange () {
      if (this.$refs.videoPlayer && this.$refs.videoPlayer.length) {
        this.$refs.videoPlayer.forEach(e => {
          e.player.pause()
        })
      }
    },
    // goBefore () {
    //   console.log(this.swiperDataList)
    //   if (this.currentPage > 1 && this.$refs.mySwiper.swiper.realIndex < 1) {
    //     this.getMoreList(this.currentPage--, 'left')
    //   }
    // },
    // goNext () {
    //   if (this.$refs.mySwiper.swiper.realIndex === this.dataList.length - 1) {
    //     this.getMoreList(this.currentPage++, 'right')
    //   }
    // },
    getDetail (item) {
      // 保存swiper所需数据
      this.showIndex = 0
      this.dataList.forEach((v, index) => {
        if (v.id === item.id) {
          this.showIndex = index
        }
      })
      this.swiperDataList = [...this.dataList]
      this.getListcontent()
      this.swiperOption.initialSlide = this.showIndex
      setTimeout(() => {
        this.showDetail = true
      }, 0)
    },
    backList () {
      this.showDetail = false
    },
    getListcontent () {
      this.swiperDataList.forEach((val, index) => {
        if (val.contentDetail) {
          return false
        }
        this.getContent(index)
      })
    },
    // 滑动获取更多
    // getMoreList (pageNum, type) {
    //   // 接口需要调整 获取更多
    //   getJSActivityInfo(pageNum, this.count).then(res => {
    //     if (!res.data.error_code) {
    //       if (res.data.result.data && res.data.result.data.length) {
    //         let newSwiperData = res.data.result.data
    //         newSwiperData.map(v => {
    //           v.contentDetail = ''
    //           let newDate = v.create_time.split('-').join('/')
    //           let _date = new Date(newDate)
    //           let month = (_date.getMonth() + 1).toString().padStart(2, '0')
    //           let day = _date
    //             .getDate()
    //             .toString()
    //             .padStart(2, '0')
    //           let hour = _date
    //             .getHours()
    //             .toString()
    //             .padStart(2, '0')
    //           let min = _date
    //             .getMinutes()
    //             .toString()
    //             .padStart(2, '0')
    //           v.showTime = month + '-' + day + '  ' + hour + ':' + min
    //         })
    //         if (type === 'right') {
    //           this.swiperDataList = [...this.swiperDataList, ...newSwiperData]
    //           this.getListcontent()
    //         }
    //         if (type === 'left') {
    //           this.swiperDataList = [...newSwiperData, ...this.swiperDataList]
    //           this.getListcontent()
    //         }
    //       }
    //     }
    //   })
    // },
    getDataList () {
      let config = {
        site_id: 143,
        page: this.page,
        count: this.count,
        status: 1
      }
      getJSActivityInfo({ params: config }).then(res => {
        this.currentPage = this.page
        if (!res.data.error_code) {
          if (res.data.result.data && res.data.result.data.length) {
            this.dataList = []
            this.PageTotal = Math.ceil(res.data.result.total / 5)
            setTimeout(() => {
              this.dataList = res.data.result.data.map(v => {
                let newDate = v.create_time.split('-').join('/')
                let _date = new Date(newDate)
                let month = (_date.getMonth() + 1).toString().padStart(2, '0')
                let day = _date
                  .getDate()
                  .toString()
                  .padStart(2, '0')
                let hour = _date
                  .getHours()
                  .toString()
                  .padStart(2, '0')
                let min = _date
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')
                v.showTime = month + '-' + day + '  ' + hour + ':' + min
                v.contentDetail = ''
                return {
                  ...v
                }
              })
            }, 100)
            // if (this.isPaging) {
            //   this.page += 1
            //   if (this.page > this.maxPage) {
            //     this.page = 1
            //   }
            // }
          } else {
            // if (this.page !== 1) {
            //   this.page = 1
            //   this.getDataList()
            // }
          }
        }
      })
    },
    getContent (k) {
      getActivityInfoDetail(this.swiperDataList[k].id).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.content) {
            let videoList = []
            this.$set(this.swiperDataList[k], 'contentDetail', res.data.result.content)
            if (res.data.result.attachments && res.data.result.attachments.length) {
              res.data.result.attachments.forEach(val => {
                if (val.type === 'video') {
                  val.options = {
                    autoplay: false, // 自动播放
                    controls: true, // 是否显示控制栏
                    muted: true,
                    fluid: true,
                    width: 820,
                    sourceOrder: true,
                    sources: [
                      {
                        src: 'http://vodjs.newsjs.net/' + val.file_path + val.file_name
                      }
                    ],
                    poster: 'http://imgjs.newsjs.net/' + val.index_pic, // 播放器默认图片
                    controlBar: {
                      // 配置控制栏
                      timeDivider: false, // 时间分割线
                      durationDisplay: false, // 总时间
                      progressControl: true, // 进度条
                      customControlSpacer: true, // 未知
                      fullscreenToggle: true // 全屏
                    }
                  }
                  videoList.push(val)
                }
              })
            }
            this.$set(this.swiperDataList[k], 'videoList', videoList)
          }
        }
      })
    },
    handelHtml (html) {
      let rel = /style\s*?=\s*?([‘"])[\s\S]*?\1/gi
      return html.replace(rel, '')
    },
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    videoPlayer
  }
}
</script>

<style lang="scss">
@import "~@/styles/index.scss";
@import "../style/index.scss";
.common-activityInfo-js {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  background: #0a1742;
  * {
    outline: 0;
    font-family: "SourceHanSansSC-Medium";
  }
  .activityInfo-page {
    position: relative;
    padding: pxrem(200px) pxrem(120px) pxrem(95px) pxrem(78px);
    .scroll_icon{
      position: absolute;
      right: 0.4rem;
      top: 5.1rem;
      display: flex;
      flex-direction: column;
      img{
        margin-top: 0.2rem;
        width: 0.585rem;
        height: 0.664rem;;
      }
      .icon_opcity{
        opacity: 0.4;
      }
    }
    .tab-btn {
      position: absolute;
      outline: none;
      z-index: 2;
      top: pxrem(90px);
      right: pxrem(77px);
      .btn {
        width: pxrem(253px);
        height: pxrem(94px);
        line-height: pxrem(98px);
        text-align: center;
        font-weight: bold;
        color: #fff;
        background: url("./assets/rectangle.png") no-repeat center;
        background-size: 100%;
      }
      .btn.act {
        background: url("./assets/rectangle_pre.png") no-repeat center;
        background-size: 100%;
      }
    }
    .page-title {
      font-weight: 600;
    }
    .list-item {
      padding: 0.2rem 0.2rem 0.2rem 0;
      margin-bottom: pxrem(60px);
      align-items: center;
      background: url(/static/img/box@2x.d7de315.png);
      background-size: 100% 100%;
    }
    .type-area {
      color: #0afbf2;
      span {
        color: #0afbf2;
      }
      img {
        width: 1.07rem;
        height: 0.48rem;
        margin: 0 0.225rem;
      }
    }
    .list-title {
      color: #fff;
      font-size: 0.38rem;
      text-align: left;
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
    .title-div {
      width: 100%;
      &.haveico {
        width: calc(100% - 1.06rem);
      }
      > p {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
    }
    .right-part {
      width: 5.4rem;
    }
    .list-read {
      margin: 0 0.3rem 0 0.45rem;
      font-size: 0.32rem;
      .click-span {
        display: inline-block;
        width: 1.1rem;
      }
      .img-icon {
        width: 0.42rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
  }
  .activityInfo-detail {
    padding: 0.7rem pxrem(72px) pxrem(10px);
    .back-btn{
      position: absolute;
      z-index: 1;
      right: 0.8rem;
      bottom: 0.5rem;
      padding-left: 0.55rem;
      color: #00ffea;
      font-weight: bold;
      background: url("./assets/icon_back.png") no-repeat;
      background-size: 0.36rem 0.28rem;
      background-position: 0 0.11rem;
    }
    .content-swiper {
      height: pxrem(800px);
      overflow-y: scroll;
    }
    .back-line {
      position: absolute;
      z-index: 10;
      right: pxrem(80px);
      bottom: pxrem(50px);
    }
    .back {
      display: inline-block;
      font-weight: bold;
    }
    .back-text {
      font-size: 0.34rem;
      color: #00ffea;
    }
    .back-img {
      display: inline-block;
      width: 0.36rem;
      height: 0.28rem;
      margin-right: 0.2rem;
    }
    // img {
    //   width: 100%;
    //   height: 100%;
    //   object-fit: cover;
    //   display: block;
    // }
    .detail-title {
      display: inline-block;
      width: pxrem(1250px);
      font-weight: bold;
      font-size: 0.52rem;
      // line-height:0.52rem;
      color: #fff;
      margin-bottom: 0.3rem;
      text-align: center;
    }
    .detail-list {
      color: #fff;
      margin: 0 auto;
      text-align: center;
      .source {
        margin-right: 0.34rem;
        display: inline-block;
        font-size: 0.28rem;
      }
      .author {
        display: inline-block;
        font-size: 0.28rem;
      }
      .bg-line {
        margin-top: pxrem(12px);
        .line {
          width: pxrem(1017px);
          height: pxrem(2px);
          margin: 0 auto;
          background: linear-gradient(
            90deg,
            rgba(64, 107, 173, 0) 0%,
            rgba(64, 107, 173, 0.99) 48%,
            rgba(64, 107, 173, 0) 100%
          );
        }
      }
    }
    .detail-content {
      width: 100%;
      // height: 6.2rem;
      overflow-y: scroll;
      margin-top: pxrem(40px);
      padding: 0 pxrem(30px);
      .video{
        margin: 0 auto;
        width: 12rem;
        height: 6rem;
        .vjs-custom-skin {
          width: 100%;
          height: 100%;
          overflow: hidden;
          .vjs-big-play-button{
            left: calc(50% - 1.5em);
            top: calc(50% - 0.8em);
          }
        }
      }
      & > div {
        width: 100%;
      }
      .pic {
        img {
          margin-bottom: pxrem(20px);
        }
      }
      .contnet-detail-div {
        line-height: 0.8rem;
        font-size: pxrem(40px);
        color: #eeeeee;
        img {
          width: auto;
          max-width: 100%;
        }
      }
    }
    .swiper-slide {
      width: 100% !important;
    }
    .swiper-button-prev {
      background-image: url(./assets/icon_left.png) !important;
      width: 0.4rem;
      height: 0.78rem;
      background-size: 100%;
    }
    .swiper-button-next {
      background-image: url(./assets/icon_right.png) !important;
      width: 0.4rem;
      height: 0.78rem;
      background-size: 100%;
    }
    .swiper-button-prev:focus,
    .swiper-button-next:focus {
      outline: none;
    }
  }
}
</style>
