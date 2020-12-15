<template>
  <div class="common01-live">
      <div class="live-wrap sys-flex sys-flex-center flex-justify-center">
        <!-- <img src="./assets/camera.png" alt=""> -->
         <video-player
              class="vjs-custom-skin"
              ref="videoPlayer"
              :options="playerOpt"
              :playsinline="true"
          ></video-player>
      </div>
  </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-contrib-hls'
export default {
  name: 'liveCamera',
  data () {
    return {
      playerOpt: {
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
            src: 'http://stream.0515yc.cn/netshow/sd/live.m3u8'
          }
        ],
        poster: './assets/camera.png',
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
  },
  created () {
  },
  methods: {
  },
  components: {
    videoPlayer
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-live {
    padding: pxrem(40px);
    width: 100%;
    height: 100%;
    .live-wrap{
      height: 100%;
      background: url("./assets/border.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
      img{
          width: 99%;
          height: 99%;
      }
      .video-player {
          width: 99%;
          height: 99%;
      }
    }
}
</style>
