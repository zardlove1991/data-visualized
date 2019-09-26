<template>
  <div class="xy-tv" id="xy-tv" :style="defineBg()">
    <!--  :class="[{'warp-bg' : showDefault}]" -->
    <div class="tv-wrap sys-flex sys-vertical">
      <div class="tv-title sys-flex sys-flex-center">{{tvTitle}}</div>
      <div class="tv-main">
        <div class="name-box sys-flex sys-flex-center flex-justify-around">
          <div class="tv-name">《新闻频道》</div>
          <div class="tv-name">《生活频道》</div>
        </div>
        <div class="sys-flex sys-flex-center flex-justify-around sys-flex-wrap tv-box">
          <div v-for="(v,k) in tvList" :key="k" class="tv-list list-box">
            <video-player
              class="vjs-custom-skin"
              ref="videoPlayer"
              :options="v.playerOpt"
              :playsinline="true"
              customEventName="customstatechangedeventname"
            ></video-player>
            <!-- <div class="tv-name">{{v.name}}</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-contrib-hls'
import { getTvList } from '@/servers/xinyi'
export default {
  name: 'tv',
  data () {
    return {
      tvTitle: '电视直播',
      tvList: []
    }
  },
  components: {
    videoPlayer
  },
  created () {
    this.getTvList()
  },
  mounted () {
    this.setFontsize('xy-tv')
  },
  methods: {
    getTvList () {
      getTvList().then(res => {
        if (res && res.data && res.data.length) {
          let data = res.data
          data.forEach(value => {
            value.playerOpt = {
              autoplay: true, // 自动播放
              controls: true, // 是否显示控制栏
              muted: true,
              fluid: true,
              width: 820,
              // techOrder: ['flash', 'html5'], // 兼容顺序
              sourceOrder: true,
              flash: { hls: { withCredentials: false } },
              html5: { hls: { withCredentials: false } },
              sources: [
                {
                  withCredentials: false,
                  type: 'application/x-mpegURL',
                  src: value.m3u8
                }
              ],
              poster:
                value.snap.host +
                value.snap.dir +
                value.snap.filepath +
                value.snap.filename, // 播放器默认图片
              controlBar: {
                // 配置控制栏
                timeDivider: false, // 时间分割线
                durationDisplay: false, // 总时间
                progressControl: true, // 进度条
                customControlSpacer: true, // 未知
                fullscreenToggle: true // 全屏
              }
            }
          })
          this.tvList = data.slice(0, 2)
          .concat(data.slice(0, 2))
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-tv {
  width: 100%;
  padding: 0.25vh 0.1vw;
  .tv-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0 px1em(17px);
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .tv-title {
    text-align: left;
    height: 15%;
    font-size: px1em(22px);
    color: #d6e6ff;
  }
  .tv-main {
    width: 80%;
    height: 75%;
    margin: 0 auto;
    .tv-box {
      padding: 5% 5% 0 0;
      height: 90%;
      background: url("./assets/tvbg.png") no-repeat center;
      background-size: 100% 100%;
    }
    .name-box {
      height: 10%;
      padding-right: 5%;
    }
    .tv-name {
      width: 45%;
      font-size: px1em(15px);
      color: #d6e6ff;
    }
    .tv-list {
      position: relative;
      width: 40%;
      // height: 40%;
      .vjs-custom-skin {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .video-js.vjs-fluid,
        .video-js.vjs-16-9,
        .video-js.vjs-4-3 {
          width: 100%;
          max-width: 100%;
          height: 100% !important;
        }
      }
      .tv-name {
        color: #00fff6;
        font-size: 0.36em;
        text-align: center;
        margin-top: 0.15em;
      }
    }
    .tv-list::after{
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      display: block;
      height: 25%;
      width: 15%;
      border-left: px1em(1px) solid white;
      border-top: px1em(1px) solid white;
    }
    .tv-list::before{
      position: absolute;
      bottom: -(px1em(2px));
      right: -(px1em(2px));
      content: '';
      display: block;
      height: 25%;
      width: 15%;
      border-right: px1em(1px) solid white;
      border-bottom: px1em(1px) solid white;
    }
  }
}
</style>
