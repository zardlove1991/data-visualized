<template>
  <div class="lishui-tvthree" id="lishui-tvthree">
    <div class="tvthree-wrap hg-flex">
      <video-player
        class="vjs-custom-skin"
        ref="videoPlayer"
        :options="test.playerOpt"
        :playsinline="true"
        customEventName="customstatechangedeventname"
      ></video-player>
    </div>
  </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-contrib-hls'
export default {
  name: 'tvThree',
  data () {
    return {
      test: {}
    }
  },
  components: {
    videoPlayer
  },
  mounted () {
    this.setFontsize('lishui-tvthree')
  },
  created () {
    this.test.playerOpt = {
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
          src: 'http://live.sczytv.com/zynews/playlist.m3u8?_upt=be7814571572253910'
        }
      ],
      poster:
        'http://img1.zyrb.com.cn/' +
        '' +
        '' +
        '2019071634a55745cca8a8ea197aaf5a4d009efb.jpg', // 播放器默认图片
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
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-tvthree {
  width: 100%;
  height: 100%;
  padding: px2em(26px) px2em(48px);
  position: relative;
  .tvthree-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    .vjs-custom-skin {
      width: px2em(1820px);
      height: px2em(1024px);
      overflow: hidden;
    }
  }
}
</style>