<template>
  <div class="common-activityInfo ">
    <div class="activityInfo-page common01-border" v-if="!showDetail">
      <div class="common01-title">{{viewAttr.header || '活动资讯'}}</div>
      <div class="list-title">
        <div class="list-item flex sys-flex-center animated"
          :class="{'flipInX' : v.title}"
          :style="{'animation-delay' : k/2 + 's'}"
          v-for="(v, k) in dataList"
          @click="showContentDetail(v)"
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
            <span class="">{{v.publish_time.slice(5, 16)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="activityInfo-detail common01-border" v-if="showDetail">
      <div class="detail-title sys-flex sys-flex-center">
        <div class="back" @click="backList">
          <img src="../newArticle/assets/back.png" />
        </div>
        <div class="title common01-ft60 overhidden">{{detailData.title}}</div>
      </div>
      <div class="detail-list sys-flex sys-flex-center common01-ft30">
        <div class="source overhidden">来源：{{detailData.source}}</div>
        <div class="author overhidden">作者：{{detailData.author}}</div>
        <div class="time">{{detailData.create_time}}</div>
        <div class="read sys-flex sys-flex-center" v-if="detailData.click_num">
          <img src="../newArticle/assets/read.png" />
          <span>{{detailData.click_num}}</span>
        </div>
        <div class="comment sys-flex sys-flex-center" v-if="detailData.comment_num">
          <img src="../newArticle/assets/comment.png" />
          <span>{{detailData.comment_num}}</span>
        </div>
      </div>
      <div class="detail-content common01-ft36">
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
      </div>
    </div>
  </div>
</template>

<script>
import { getM2OPlusPublish, getM2OPLUSArticleDetail } from '@/servers/interface'
export default {
  name: 'manuscript',
  data () {
    return {
      dataList: [],
      count: 12,
      detailData: {},
      showDetail: false,
      page: 1,
      isPaging: true,
      typeList: {
        article: '文稿',
        gallery: '图集',
        topic: '专题',
        link: '外链',
        video: '视频'
      },
      frequency: 25000
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('lishui-manuscriptoutput')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    backList () {
      this.showDetail = false
    },
    showContentDetail (value) {
      this.showDetail = true
      getM2OPLUSArticleDetail(value.id, value.type, this.currentViewId).then(res => {
        if (res && res.data && res.data.result) {
          this.detailData = res.data.result
          this.detailData.listType = value.type
          if (this.detailData.listType === 'm2o' && this.detailData.type === 'vod') {
            this.detailData.content = {
              autoplay: true, // 自动播放
              controls: true, // 是否显示控制栏
              muted: true,
              fluid: true,
              width: 820,
              sourceOrder: true,
              flash: { hls: { withCredentials: false } },
              html5: { hls: { withCredentials: false } },
              sources: [
                {
                  withCredentials: false,
                  type: 'application/x-mpegURL',
                  src: this.detailData.content
                }
              ],
              poster: this.detailData.thumb_url, // 播放器默认图片
              controlBar: {
                // 配置控制栏
                timeDivider: false, // 时间分割线
                durationDisplay: false, // 总时间
                progressControl: true, // 进度条
                customControlSpacer: true, // 未知
                fullscreenToggle: true // 全屏
              }
            }
          }
        }
      })
    },
    getDataList () {
      getM2OPlusPublish(this.count, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data && res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data.map(v => {
                return {
                  ...v,
                  typeName: this.typeList[(v.type)]
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
      margin-right:1.12rem;
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
      .back {
        width: pxrem(44px);
        height: pxrem(44px);
        margin-right: pxrem(40px);
      }
      .title {
        font-weight: bold;
      }
    }
    .detail-list {
      color: #05D9FF;
      border-bottom: pxrem(2px) dashed #00EAFF;
      padding: pxrem(40px) pxrem(20px) pxrem(35px) pxrem(80px);
      .source {
        width: 30%;
        text-align: left;
        margin-right: pxrem(15px);
      }
      .author {
        width: 17%;
        text-align: left;
        margin-right: pxrem(15px);
      }
      .read {
        margin-left: auto;
        img {
          width: pxrem(42px);
          height: pxrem(30px);
          margin-right: pxrem(10px);
        }
      }
      .comment {
        margin-left: pxrem(50px);
        img {
          width: pxrem(34px);
          height: pxrem(31px);
          margin-right: pxrem(10px);
        }
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
  }
}

</style>
