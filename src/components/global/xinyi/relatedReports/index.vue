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
.main-wrap {
  .related-reports {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.1rem 0.35rem 0.1rem;
    color: #fff;
    font-size: 0.48rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .reports-title {
      width: 100%;
      height: 1.13rem;
      background: linear-gradient(
        0deg,
        rgba(38, 182, 241, 0.46) 0%,
        rgba(38, 182, 241, 0.01) 99%
      );
      background-size: 100%;
      background-image: url("./assets/title_bg2.png");
      background-repeat: no-repeat;
      background-position: center 30%;
      text-align: center;
      font-weight: 600;
      // line-height: 1.13rem;
      margin-bottom: 0.25rem;
    }
    .reports-body {
      display: flex;
      justify-content: space-between;
      .no_data {
        width: 100%;
        height: 8.62rem;
        div {
          width: 7.58rem;
          height: 5.76rem;
          background: url("./assets/no_data.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .reports_left {
        margin-right: 0.64rem;
        .reports_m_title {
          height: 0.5rem;
          line-height: 0.5rem;
          margin-bottom: 0.39rem;
          font-size: 0.4rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
        .news {
          height: 7.53rem;
          overflow: hidden;
          li {
            width: 9.87rem;
            height: 2.23rem;
            border: 0.01px solid rgba(63, 230, 255, 1);
            background: url("./assets/baodao_list_bg.png") no-repeat;
            background-size: 100%;
            padding: 0.26rem 0.33rem;
            display: flex;
            margin-bottom: 0.28rem;
            .news_img {
              width: 2.7rem;
              height: 1.7rem;
              border-radius: 1rem;
              margin-right: 0.3rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .news_text {
              .no_pic {
                width: 9rem !important;
              }
              div:first-of-type {
                width: 6.15rem;
                height: 1.08rem;
                font-size: 0.36rem;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 0.54rem;
                margin-bottom: 0.26rem;
                overflow: hidden;
                // white-space: nowrap;
                text-overflow: ellipsis;
              }
              div:last-of-type {
                height: 0.3rem;
                font-size: 0.24rem;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
      }
      .reports_right {
        .right_bottom {
          margin-top: 0.63rem;
        }
        div {
          .img_mb {
            margin-bottom: 0.39rem;
          }
          .aff_mb {
            margin-bottom: 0.33rem !important;
          }
          .reports_m_title {
            height: 0.5rem;
            line-height: 0.5rem;
            margin-bottom: 0.39rem;
            font-size: 0.4rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
          .click-title {
            width: 7.88rem;
            height: 3rem;
            .swiper2 {
              height: 2.6rem !important;
              border-radius: 0.1rem;
              img {
                width: 100%;
                height: 100%;
                border-radius: 0 !important;
              }
            }
            .swiper {
              color: #fff;
              height: 3rem;
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
                  border-radius: 0.1rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: #fff;
                  img {
                    width: 1.14rem;
                    height: 1.14rem;
                  }
                }
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 0.1rem;
                }
                .title_bg {
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  height: 0.95rem;
                  background: linear-gradient(
                    0deg,
                    rgba(0, 0, 0, 0.8),
                    rgba(255, 255, 255, 0)
                  );
                  .title {
                    // width: 100%;
                    text-align: center;
                    z-index: 99999;
                    margin: 0 0.3rem;
                    margin-top: 0.3rem;
                    font-size: 0.3rem;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                  }
                }
              }
            }
            .swiper-pagination,
            .swiper-pagination2 {
              width: 7.88rem;
              margin-top: -0.15rem;
              // height: 0.12rem;
              // margin-top: 0.22rem;
            }
            .swiper-pagination-bullet {
              width: 0.12rem;
              height: 0.12rem;
              background: #00edff;
              opacity: 0.4;
              margin-right: 0.12rem;
            }
            .swiper-pagination-bullet-active {
              background: #00edff;
              opacity: 1 !important;
              width: 0.4rem;
              height: 0.12rem;
              border-radius: 0.1rem;
            }
          }
        }
      }
    }
  }
}
</style>
