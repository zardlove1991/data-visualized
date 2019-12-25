<template>
  <div class="call-wrap sys-flex" v-if="call_Show">
    <div id="call-main" class="rong-container sys-flex sys-flex-center flex-justify-center">
      <div class="call-user" v-if="!online">
        <img class="call-reporter-avatar" v-if="info_item.avatar" :src="info_item.avatar.uri" />
        <img
          class="call-reporter-avatar"
          v-if="!info_item.avatar"
          src="./assets/default_avatar.png"
        />
        <img class="call-reporter-line" src="./assets/pic_soundwave.png" />
        <span class="call-status">连接{{info_item.member_name}}中...</span>
      </div>
      <div class="video-info">
        <span class="video-time">{{time}}</span>
        <span class="hug-btn" @click="hangUp"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { initRong } from '@/rongyun/init'
import { server } from '@/rongyun/callServer'

export default {
  name: 'call',
  data () {
    return {
      online: false,
      time: '00:00',
      onlineTime: 0,
      info_item: {},
      call_Show: false,
      invite_call: false,
      invite_tip: '邀请您进行视频会议'
    }
  },
  props: {
    infoItem: {
      type: Object,
      default: {}
    },
    callType: '',
    callShow: false
  },
  watch: {
    infoItem (res) {
      this.info_item = res
    },
    callShow (res) {
      if (res) {
        this.call_Show = res
        this.call()
      }
    },
    callType (res) {
      this.callType = res
    }
  },
  mounted () {
    setTimeout(() => {
      initRong()
      this.RongCall = server(res => {
        this.commandMap(res)
      })
    }, '2000')
  },
  methods: {
    commandMap (res) {
      switch (res.messageType) {
        case 'InviteMessage':
          console.log('InviteMessage')
          break
        case 'RingingMessage':
          console.log('RingingMessage')
          break
        case 'AcceptMessage':
          console.log('AcceptMessage')
          this.RongCall.pause()
          break
        case 'HungupMessage':
          console.log('HungupMessage')
          this.RongCall.pause()
          this.hangUp()
          break
        case 'SummaryMessage':
          console.log('SummaryMessage')
          break
      }
    },
    call () {
      setTimeout(() => {
        let params = {
          targetId: this.info_item.member_id.toString(),
          inviteUserIds: [this.info_item.member_id.toString()]
        }
        this.initTime()
        if (this.callType === 'video') {
          this.RongCall.callVideo(params, 'call-main')
        } else {
          this.RongCall.callAudio(params, 'call-main')
        }
      }, '1000')
    },
    accept () {
      this.RongCall.pause()
      this.onlineTime = 0
      this.initTime()
      this.RongCall.acceptVideo('call-main')
      this.invite_tip = '正在连线'
      this.online = true
    },
    reject () {
      this.RongCall.pause()
      this.RongCall.reject()
      this.close()
    },
    initTime () {
      this.callTimer = setInterval(() => {
        this.onlineTime++
        this.time = this.formatSeconds(this.onlineTime)
      }, 1000)
    },
    formatSeconds (value) {
      let s = parseInt(value)
      let m = 0
      if (s > 60) {
        m = parseInt(s / 60)
        s = parseInt(s % 60)
      }
      let min = m
      let sec = s
      if (m < 10) {
        min = '0' + m
      }

      if (s < 10) {
        sec = '0' + s
      }
      return min + ':' + sec
    },
    hangUp () {
      this.RongCall.hangUp()
      this.onlineTime = 0
      clearInterval(this.callTimer)
      this.close()
    },
    close () {
      this.call_Show = false
      this.online = false
      this.onlineTime = 0
      this.$emit('update:callShow', false)
      this.$emit('update:infoItem', {})
      this.invite_call = false
      this.invite_tip = '邀请您进行视频会议'
    }
  }
}
</script>

<style lang="scss">
.call-wrap {
  width: 100%;
  height: 100%;
  border: pxrem(2px) solid rgba(96, 186, 236, 0.2);
  background: rgba(31, 57, 103, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  #call-main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #000;
    position: relative;
    overflow: hidden;
    padding: 0.1rem;
    .call-user {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      .call-status {
        width: 100%;
        color: #fff;
        text-align: center;
        display: block;
        font-size: 0.8rem;
        margin-top: -0.1rem;
      }
      .call-reporter-avatar {
        width: 6rem;
        height: 6rem;
        margin: 3rem auto 0 auto;
        display: block;
        border-radius: 50%;
      }
      .call-reporter-line {
        width: 5.6rem;
        height: 1.25rem;
        margin: 0.5rem auto;
        display: block;
      }
    }

    .rong-min-window {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      span {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 0.5rem;
        color: #ddd;
      }
    }
    .rong-max-window {
      width: 18rem;
      height: 16rem;
      background: rgba(0, 0, 0, 0.4);
      border: 0.01rem solid #ddd;
      border-radius: 0.03rem;
      cursor: pointer;
      position: absolute;
      overflow: hidden;
      top: 1rem;
      right: 0.5rem;
    }
    .rong-max-window {
      video {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .rong-min-window {
      video {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .rong-calllib-remote {
      canvas {
        position: absolute;
        top: 0;
        right: 0;
        width: 100% !important;
        height: 100% !important;
        z-index: 9;
      }
    }
    div {
      &:nth-of-type(2) {
        canvas {
          position: absolute;
          top: 0;
          right: 0;
          width: 1rem !important;
          height: 1rem !important;
          z-index: 99999 !important;
        }
      }
    }
    .video-info {
      width: 3rem;
      height: 3rem;
      position: absolute;
      bottom: 3rem;
      left: calc(50% - 1.5rem);
      z-index: 999999;
      .video-time {
        display: block;
        width: 2rem;
        height: 1rem;
        line-height: 1rem;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 0.25rem;
        text-align: center;
        font-size: 0.8rem;
        color: #00fdfe;
        margin: 0 auto;
        margin-bottom: 0.5rem;
      }
      .hug-btn {
        display: block;
        width: 3rem;
        height: 3rem;
        background: url(./assets/icon_videoff.png) no-repeat
          center center;
        background-size: 3rem 3rem;
        cursor: pointer;
        margin: 0 auto;
      }
    }
  }
  .main-wrap {
    .call-reporter-avatar {
      display: block;
      width: 2.5rem;
      height: 2.5rem;
      margin: 0 auto;
      border-radius: 50%;
    }
    .call-reporter-line {
      display: block;
      width: 5.6rem;
      height: 2.49rem;
      margin: 0 auto;
    }
    .call-status {
      display: block;
      color: #fff34a;
      font-size: 0.8rem;
      margin-top: -0.8rem;
      margin-bottom: 0.2rem;
      text-align: center;
    }
    .call-btn {
      display: block;
      width: 1rem;
      height: 1rem;
      margin: 0 0.2rem;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .call-info-wrap {
    width: 3.08rem;
    height: 3.78rem;
    background-size: 5.08rem 5.78rem;
    margin-right: 0.8rem;
    padding: 1rem;
    &.invite-info-wrap {
      span {
        display: block;
        text-align: center;
        font-size: 0.3rem;
        color: #fff;
        margin-top: 0.3rem;
        &.invite-name {
          font-size: 0.5rem;
          margin-top: 0.5rem;
          font-weight: bold;
          color: #02ffea;
        }
      }
    }
    .reporter-name {
      display: block;
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      text-indent: 1rem;
      font-size: 0.36rem !important;
      text-align: left;
      color: #00ffea;
      background-size: 0.82rem 0.28rem;
    }
    .info-list {
      display: block;
      text-align: left;
      font-size: 0.24rem;
      color: #00ffea;
      margin: 0.2rem 0;
      &.introduce {
        height: 0.28rem;
        background-position: center left;
        background-size: 1rem;
      }
    }
  }
  .close-btn {
    display: block;
    width: 0.97rem;
    height: 0.28rem;
    background-size: 0.97rem 0.28rem;
    cursor: pointer;
  }
}
</style>