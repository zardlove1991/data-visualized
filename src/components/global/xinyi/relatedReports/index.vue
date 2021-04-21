<template>
  <div class="main-wrap">
    <div class="related-reports">
      <div class="reports-title">相关报道</div>
      <div class="reports-body" v-if="articleList.length">
        <div class="reports_left">
          <div class="reports_m_title">人物新闻</div>
          <ul class="news">
            <li
              class="animated fadeInLeft"
              v-for="(item,index) in articleList"
              :key="index"
              v-bind:style="{'animation-delay' : index/2 +'s'}"
            >
              <div class="news_img" v-if="item.index_pic">
                <img :src="item.index_pic" alt />
              </div>
              <div class="news_text">
                <div :class="{'no_pic':!item.index_pic}">{{item.title}}</div>
                <div>{{item.created_time.slice(0, 16)}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="reports_right">
          <div>
            <div class="reports_m_title img_mb">人物图片</div>
            <div class="click-title overhidden">
              <swiper :options="swiperOption" ref="swiper" class="swiper">
                <!-- slides -->
                <swiper-slide class="swiper-item" v-for="(item,index) in galleryList" :key="index">
                  <img :src="item.index_pic" v-if="item.index_pic" />
                  <div class="no_pic_box" v-else>
                    <img src="./assets/logo.png" alt />
                  </div>
                  <div class="title_bg">
                    <div class="title overhidden">{{item.title}}</div>
                  </div>
                </swiper-slide>
              </swiper>
              <!-- Optional controls -->
              <div class="swiper-pagination swiper-pagination1"></div>
            </div>
          </div>
          <div class="right_bottom">
            <div class="reports_m_title aff_mb">人物风采</div>
            <div class="click-title overhidden">
              <swiper :options="swiperOption2" ref="swiper2" class="swiper swiper2">
                <!-- slides -->
                <swiper-slide class="swiper-item" v-for="(item,index) in videoList" :key="index">
                  <img :src="item.index_pic" v-if="item.index_pic" />
                  <div class="no_pic_box" v-else>
                    <img src="./assets/logo.png" alt />
                  </div>
                  <div class="title_bg">
                    <div class="title overhidden">{{item.title}}</div>
                  </div>
                </swiper-slide>
              </swiper>
              <!-- Optional controls -->
              <div class="swiper-pagination swiper-pagination2"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="reports-body" v-else>
        <div class="no_data flex-justify-center sys-flex-center sys-flex">
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getContentDetail } from '@/servers/api'
export default {
  name: 'relatedReports',
  data () {
    return {
      articleList: [], // 人物新闻列表
      galleryList: [], // 人物图片列表
      videoList: [], // 人物风采列表
      swiperOption: {
        // 人物图片
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        loop: true,
        loopAdditionalSlides: 3,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        spaceBetween: 4,
        slidesPerView: 1.5,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination1',
          type: 'bullets'
        }
      },
      swiperOption2: {
        // 人物风采
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        loop: true,
        loopAdditionalSlides: 3,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        spaceBetween: 0,
        slidesPerView: 1.7,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination2',
          type: 'bullets'
        }
      }
    }
  },
  props: {
    id: Number
  },
  watch: {
    id (val) {
      if (val) {
        this.id = val
        console.log('id', this.id)
        this.getArticle()
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper () {
      return this.$refs.swiper.swiper
    }
  },
  created () {
    if (this.id) {
      this.getArticle()
    }
  },
  methods: {
    getArticle () {
      if (this.id) {
        getContentDetail(this.id).then(response => {
          console.log('相关报道', response)
          if (response && response.data && response.data.result) {
            this.articleList = []
            this.galleryList = []
            this.videoList = []
            this.articleList = response.data.result.topic_article
            this.galleryList = response.data.result.topic_gallery
            this.videoList = response.data.result.topic_video
          // this.articleList = this.split_array(
          //   this._articleList ? this._articleList : [],
          //   3
          // );
          }
        })
      }
    },
    split_array (arr, len) {
      let aLen = arr.length
      let result = []
      for (let i = 0; i < aLen; i += len) {
        result.push(arr.slice(i, i + len))
      }
      return result
    }
  }
}
</script>
<style lang="scss">
@import 'src/styles/index.scss';
.main-wrap {
  .related-reports {
    width: 100%;
    height: 100%;
    padding: px1em(10px) px1em(30px);
    color: #fff;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .reports-title {
      width: 100%;
      height: px1em(80px);
      background: url("./assets/title_bg2.png") no-repeat center top;
      background-size: 100% 100%;
      text-align: center;
      font-weight: 600;
      padding-top:px1em(10px);
      // margin-bottom: px1em(10px);
      font-size: px1em(40px);
    }
    .reports-body {
      display: flex;
      justify-content: space-between;
      .no_data {
        width: 100%;
        height: px1em(862px);
        div {
          width: px1em(758px);
          height: px1em(592px);
          background: url("./assets/no_data.png") no-repeat center top;
          background-size: 100% 100%;
          margin-bottom: px1em(300px);
        }
      }
      .reports_left {
        // flex-basis: 51%;
        width:px1em(700px);
       
        .reports_m_title {
          margin-bottom: px1em(20px);
          font-size: px1em(30px);
          font-weight: 500;
          text-align:left;
          color: #fff;
        }
        .news {
          // height: 7.53rem;
          overflow: hidden;
          li {
            // width: px1em(987px);
            height: px1em(140px);
            background: url("./assets/baodao_list_bg.png") no-repeat;
            background-size: 100% 100%;
            padding: px1em(13px) px1em(16px);
            display: flex;
            margin-bottom: px1em(28px);
            .news_img {
              width: px1em(135px);
              height: px1em(85px);
              display: block;
              border-radius: px1em(1px);
              margin-right: px1em(30px);
              img {
                width: 100%;
                height: 100%;
              }
            }
            .news_text {
              .no_pic {
                width: px1em(900px) !important;
              }
              div:first-of-type {
                width: px1em(500px);
                // height: px1em(108px);
                font-size: px1em(18px);
                font-weight: 400;
                color: #fff;
                // line-height: 0.54rem;
                margin-bottom: px1em(13px);
                overflow: hidden;
                // white-space: nowrap;
                text-overflow: ellipsis;
                text-align: left;
              }
              div:last-of-type {
                // height: px1em(30px);
                font-size: px1em(12px);
                font-weight: 400;
                color: #fff;
                text-align: left;
              }
            }
          }
        }
      }
      .reports_right {
        // flex-basis: 41%;
        width:px1em(520px);
        .right_bottom {
          margin-top: px1em(63px);
        }
        div {
          .img_mb {
            margin-bottom: px1em(20px);
          }
          .aff_mb {
            margin-bottom: px1em(10px) !important;
          }
          .reports_m_title {
            // height: 0.5rem;
            // line-height: 0.5rem;
            margin-bottom: px1em(20px);
            font-size: px1em(30px);
            font-weight: 500;
            text-align: left;
            color: rgba(255, 255, 255, 1);
          }
          .click-title {
            width: px1em(520px);
            height: px1em(200px);
            .swiper2 {
              height: px1em(200px) !important;
              border-radius: px1em(10px);
              img {
                width: 100%;
                height: 100%;
                border-radius: 0 !important;
              }
            }
            .swiper {
              color: #fff;
              height: px1em(200px);
              .swiper-slide-active {
                opacity: 1 !important;
              }
              .swiper-item {
                position: relative;
                height: 100%;
                white-space: normal;
                background: rgba(0, 0, 0, 0.5);
                opacity: 0.5;
                .no_pic_box {
                  width: 100%;
                  height: 100%;
                  border-radius: px1em(10px);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: #fff;
                  img {
                    width: px1em(114px);
                    height: px1em(114px);
                  }
                }
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: px1em(10px);
                }
                .title_bg {
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  height: px1em(95px);
                  background: linear-gradient(
                    0deg,
                    rgba(0, 0, 0, 0.8),
                    rgba(255, 255, 255, 0)
                  );
                  .title {
                    // width: 100%;
                    text-align: center;
                    z-index: 99999;
                    margin: 0 px1em(30px);
                    margin-top: px1em(30px);
                    font-size: px1em(30px);
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                  }
                }
              }
            }
            .swiper-pagination,
            .swiper-pagination2 {
              width: px1em(520px);
              margin-top: -px1em(15px);
              // height: 0.12rem;
              // margin-top: 0.22rem;
            }
            .swiper-pagination-bullet {
              width: px1em(12px);
              height: px1em(12px);
              background: #00edff;
              opacity: 0.4;
              margin-right: px1em(12px);
            }
            .swiper-pagination-bullet-active {
              background: #00edff;
              opacity: 1 !important;
              width: px1em(40px);
              height: px1em(12px);
              border-radius: px1em(10px);
            }
          }
        }
      }
    }
  }
}
</style>
