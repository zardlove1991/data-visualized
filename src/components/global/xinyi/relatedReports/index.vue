<template>
  <div class="xy-relatedReports" id="xy-relatedReports">
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
  mounted () {
    this.setFontsize('xy-relatedReports')
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
.xy-relatedReports {
  height: 100%;
  padding: 0.25vh 0.1vw;
  .related-reports {
    width: 100%;
    height: 100%;
    padding: 0.4em;
    color: #fff;
    font-size: pxrem(48px);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .reports-title {
      width: 100%;
      height:  pxrem(113px);
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
      margin-bottom:  pxrem(25px);
    }
    .reports-body {
      display: flex;
      justify-content: space-between;
      height: 100%;
      .no_data {
        width: 100%;
        height:  pxrem(862px);
        div {
          width: pxrem(758px);
          height: pxrem(576px);
          background: url("./assets/no_data.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .reports_left {
        margin-right: pxrem(64px);
        .reports_m_title {
          height:  pxrem(50px);
          line-height: pxrem(50px);
          margin-bottom: pxrem(39px);
          font-size:  pxrem(40px);
          font-weight: 500;
          width: 9rem;
          color: rgba(255, 255, 255, 1);
        }
        .news {
          height:  pxrem(753px);
          overflow: hidden;
          li {
            width: pxrem(987px);
            height:  pxrem(223px);
            background: url("./assets/baodao_list_bg.png") no-repeat;
            background-size: 100%;
            padding: pxrem(26px) pxrem(33px);
            display: flex;
            margin-bottom: pxrem(28px);
            .news_img {
              width: pxrem(270px);
              height: pxrem(170px);
              border-radius: pxrem(100px);
              margin-right: pxrem(30px);
              img {
                width: 100%;
                height: 100%;
              }
            }
            .news_text {
              .no_pic {
                width: pxrem(900px) !important;
              }
              div:first-of-type {
                width: pxrem(615px);
                height: pxrem(108px);
                font-size: pxrem(36px);
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: pxrem(54px);
                margin-bottom: pxrem(26px);
                overflow: hidden;
                // white-space: nowrap;
                text-overflow: ellipsis;
              }
              div:last-of-type {
                height: pxrem(30px);
                font-size: pxrem(24px);
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
      }
      .reports_right {
        .right_bottom {
          margin-top: pxrem(63px);
        }
        div {
          .img_mb {
            margin-bottom: pxrem(39px);
          }
          .aff_mb {
            margin-bottom: pxrem(33px) !important;
          }
          .reports_m_title {
            height: pxrem(50px);
            line-height: pxrem(50px);
            margin-bottom: pxrem(39px);
            font-size: pxrem(40px);
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
          .click-title {
            width: pxrem(788px);
            height: pxrem(300px);
            .swiper2 {
              height: pxrem(260px) !important;
              border-radius: pxrem(10px);
              img {
                width: 100%;
                height: 100%;
                border-radius: 0 !important;
              }
            }
            .swiper {
              color: #fff;
              height: pxrem(300px);
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
                  border-radius: pxrem(10px);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: #fff;
                  img {
                    width: pxrem(114px);
                    height: pxrem(114px);
                  }
                }
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: pxrem(10px);
                }
                .title_bg {
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  height: pxrem(95px);
                  background: linear-gradient(
                    0deg,
                    rgba(0, 0, 0, 0.8),
                    rgba(255, 255, 255, 0)
                  );
                  .title {
                    // width: 100%;
                    text-align: center;
                    z-index: 99999;
                    margin: 0 pxrem(30px);
                    margin-top: pxrem(30px);
                    font-size: pxrem(30px);
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                  }
                }
              }
            }
            .swiper-pagination,
            .swiper-pagination2 {
              width: pxrem(788px);
              margin-top: -pxrem(15px);
              // height: 0.12rem;
              // margin-top: 0.22rem;
            }
            .swiper-pagination-bullet {
              width: pxrem(12px);
              height: pxrem(12px);
              background: #00edff;
              opacity: 0.4;
              margin-right: pxrem(12px);
            }
            .swiper-pagination-bullet-active {
              background: #00edff;
              opacity: 1 !important;
              width: pxrem(40px);
              height: pxrem(12px);
              border-radius: pxrem(10px);
            }
          }
        }
      }
    }
  }
}
</style>
