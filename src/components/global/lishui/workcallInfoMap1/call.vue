<template>
  <div class="lishui-call-wrap sys-flex" v-if="call_Show">
    <div class="connect-wrap" @click="fullScreen('')" v-show="online">
      <div id="call-main" class="flex flex-center">
        <!-- 对方 -->
        <div class="rong-min-window-wrap">
          <div class="screen_all" @click.stop="fullScreen('min')"></div>
          <div class="call-info">
            <img class="user-avatar" :src="(info_item.avatar && info_item.avatar.uri) || defaultAvatar" alt="" />
            <div class="user-name">{{info_item.member_name}}</div>
            <div class="user-role">{{info_item.org_title}}-{{info_item.role_title}}</div>
            <div class="loading">等待连线...</div>
          </div>
          <div id="rong-min-window-list" class="min-window-list">
            <!-- 调试用 -->
            <!-- <div class="rong-min-window"><video id="18357" autoplay="" userid="18357"></video></div> -->
          </div>
        </div>
        <!-- 调试用 主叫方 -->
        <!-- <div class="rong-max-window"><video id="18358" autoplay="" userid="18358"></video></div> -->
        <div class="max-window-prepare">
          <div class="screen_all" @click.stop="fullScreen('max')"></div>
          <div class="call-info">
            <img class="user-avatar" :src="defaultLogo" alt="" />
            <div class="user-name">指挥调度中心</div>
          </div>
          <div class="times-info">
            <span class="video-time">{{time}}</span>
            <img class="hangUp-btn" src="./assets/icon_voiceoff.png" @click="hangUp">
          </div>
        </div>
      </div>
    </div>
    <!-- 邀请连线 正在连线-->
    <div class="call-info-wrap invite-info-wrap" v-if="invite_call">
      <span class="invite-name">{{info_item.member_name}}</span>
      <span class="invite-tip">{{invite_tip}}</span>
    </div>
    <!-- <span class="close-btn" @click="close">返回</span> -->
  </div>
</template>

<script>

import {initRong} from '@/rongyun/init'
import {getDataConfig} from '@/utils/model'
import {server} from '@/rongyun/callServer'
import { getIndexMemberDetail } from '@/servers/interface'
import loadRongyun from '@/utils/loadRongyun.js'

export default {
  name: 'call',
  data () {
    return {
      defaultAvatar: require('@/assets/avatar/touxiang.png'),
      defaultLogo: require('./assets/logo.png'),
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
      default: () => {}
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
    let _this = this
    loadRongyun().then(() => {
      getDataConfig().then((data) => {
        initRong(data.rongInfo)
        _this.RongCall = server((res) => {
          _this.commandMap(res)
        })
      })
    })
  },

  methods: {

    commandMap (res) {
      switch (res.messageType) {
        case 'InviteMessage':
          getIndexMemberDetail(res.senderUserId).then((response) => {
            if (!response.data.error_code) {
              this.info_item = {
                member_id: response.data.result.user_id,
                member_name: response.data.result.member_name,
                avatar: response.data.result.avatar && response.data.result.avatar.host ? response.data.result.avatar.host + response.data.result.avatar.dir + response.data.result.avatar.filename : ''
              }
            }
            this.RongCall.ring()
            this.$emit('updateList')
            this.call_Show = true
            this.invite_call = true
          })
          break
        case 'RingingMessage':
          console.log('RingingMessage')
          break
        case 'AcceptMessage':
          console.log('AcceptMessage')
          this.RongCall.pause()
          break
        case 'HungupMessage':
          console.log(res, 'HungupMessage')
          if (res.messageUId) {
            this.RongCall.pause()
            this.hangUp()
          }
          break
        case 'SummaryMessage':
          console.log('SummaryMessage')
          // this.RongCall.pause();
          // this.hangUp();
          break
      }
    },

    call () {
      this.online = true
      setTimeout(() => {
        let params = {
          targetId: (this.info_item.member_id).toString(),
          inviteUserIds: [(this.info_item.member_id).toString()]
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
      this.time = '00:00'
      clearInterval(this.callTimer)
      this.$emit('update:callShow', false)
      this.$emit('update:infoItem', {})
      this.invite_call = false
      this.invite_tip = '邀请您进行视频会议'
    },
    fullScreen (type) {
      let min = document.getElementsByClassName('rong-min-window-wrap')[0] || {}
      let max = document.getElementsByClassName('rong-max-window')[0] || {}
      let maxprepare = document.getElementsByClassName('max-window-prepare')[0] || {}
      clearClass()
      if (type === 'min') {
        min.className = 'rong-min-window-wrap full_screen'
      } else if (type === 'max') {
        max.className = 'rong-max-window full_screen2'
        maxprepare.className = 'max-window-prepare full_screen'
      }
      function clearClass () {
        min.className = 'rong-min-window-wrap'
        max.className = 'rong-max-window'
        maxprepare.className = 'max-window-prepare'
      }
    }
  }
}
</script>

<style lang="scss">
// px转rem,第二个参数可以控制倍数
@function pxrem($px-values,$base-multiple: 18.75, $baseline-px:16px,$support-for-ie:false){
  //Conver the baseline into rems
  $baseline-rem: $baseline-px / 1rem * $base-multiple;
  //Print the first line in pixel values
  @if $support-for-ie {
      @return $px-values;
  }
  //if there is only one (numeric) value, return the property/value line for it.
  @if type-of($px-values) == "number"{
      @return $px-values / $baseline-rem;
  }
  @else {
      //Create an empty list that we can dump values into
      $rem-values:();
      @each $value in $px-values{
          // If the value is zero or not a number, return it
          @if $value == 0 or type-of($value) != "number"{
              $rem-values: append($rem-values, $value / $baseline-rem);
          }
      }
      @return $rem-values;
  }
}
.lishui-call-wrap{
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  z-index: 10;
  .connect-wrap{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  #call-main{
    margin: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    position: relative;
    overflow: hidden;
    padding: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .screen_all{
      cursor: pointer;
      position: absolute;
      top: pxrem(65px);
      right: pxrem(88px);
      width: pxrem(70px);
      height: pxrem(70px);
      background-image:url(./assets/screen_all.png);
      background-size: 100%;
    }
    .call-info{
      z-index: 1;
      width: pxrem(800px);
      position: absolute;
      top: pxrem(450px);
      left: 50%;
      transform: translate(-50%, 0%);
      .user-avatar{
        background: #fff;
        width: pxrem(400px);
        height: pxrem(400px);
        border-radius: 50%;
        border: solid 0.03rem #00E4FF;
        overflow: hidden;
      }
      .user-name{
        font-size: pxrem(90px);
        color: #00E4FF;
      }
      .user-role{
        font-size: pxrem(72px);
        color: #00E4FF;
      }
      .loading{
        margin-top: pxrem(600px);
        color: #fff;
        font-size: pxrem(88px);
      }
    }
    // 对方
    .rong-min-window-wrap{
      width: 8rem;
      height: 7.2rem;
      border: solid 0.02rem #00E4FF;
      background:linear-gradient(0deg,rgba(1,24,87,1),rgba(1,47,83,1));
      overflow: hidden;
      overflow-x: scroll;
      position: absolute;
      top: calc(50% - 4rem);
      left: calc(50% - 8.2rem);
      .min-window-list{
        position: absolute;
        width: 80%;
        height: 100%;
        top: 0;
        left: 10%;
        z-index: 2;
        display: flex;
        flex: 1;
        .rong-min-window{
          width: 100%;
          height: 100%;
          cursor: pointer;
          border: 0.01em solid #ddd;
          border-radius: 0.03em;
          overflow: hidden;
          background: rgba(0,0,0,0.4);
          margin-right: 0.1em;
          video{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    // 主叫准备
    .max-window-prepare{
      width: 8rem;
      height: 7.2rem;
      top: calc(50% - 4rem);
      right: calc(50% - 8.2rem);
      background:linear-gradient(0deg,rgba(1,24,87,1),rgba(1,47,83,1));
      border: solid 0.02rem #00E4FF;
      position: absolute;
      z-index: 1;
      .times-info{
        z-index: 3;
        position: absolute;
        bottom: pxrem(50px);
        left: 50%;
        transform: translate(-50%, 0%);
        .video-time{
          margin-bottom: pxrem(46px);
          display: block;
          border-radius:0.25em;
          text-align: center;
          font-size: pxrem(60px);
          color: #fff;
        }
        .hangUp-btn{
          margin: 0 auto;
          display: block;
          width: pxrem(164px);
          height: pxrem(164px);
          cursor: pointer;
          &:hover{
            opacity: 0.8;
          }
        }
      }
    }
    // 主叫方
    .rong-max-window {
      width: 8rem;
      height: 4.7rem;
      top: calc(50% - 3rem);
      right: calc(50% - 8.2rem);
      position: absolute;
      z-index: 2;
      video{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    // 全屏样式
    .full_screen{
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 2;
    }
    .full_screen2{
      width: 100%;
      height: 80%;
      top: 8%;
      left: 0;
      z-index: 3;
    }
    .rong-calllib-emote{
      canvas{
        position: absolute;
        top: 0;
        right: 0;
        width: 100%!important;
        height: 100%!important;
        // width: 3.25em!important;
        // height: 5.78em!important;
        z-index: 9;
      }
    }
    div{
      &:nth-of-type(2){
        canvas{
          position: absolute;
          top: 0;
          right: 0;
          width: 1em!important;
          height: 1em!important;
          z-index: 99999!important;
        }
      }
    }
    .video-info{
      width: 1.3em;
      height: 1.3em;
      position: absolute;
      bottom : -0.19em;
      left : calc(50% - 0.8em);
      z-index:999999;
      .video-time{
        display: block;
        height: 0.5em;
        line-height: 0.5em;
        background:rgba(0,0,0,0.5);
        border-radius:0.25em;
        text-align: center;
        font-size: 0.24em;
        color: #00FDFE;
      }
      .hug-btn{
        display: block;
        width: 0.8em;
        height: 0.8em;
        background:url(./assets/icon_videoff.png) no-repeat center center;
        background-size: 0.8em 0.8em;
        cursor: pointer;
        margin: 0.16em auto;
      }

    }

  }
  .main-wrap{
    .call-reporter-avatar{
      display: block;
      width: 2.5em;
      height: 2.5em;
      margin: 0 auto;
      border-radius: 50%;
    }
    .call-reporter-line{
      display: block;
      width: 5.6em;
      height: 2.49em;
      margin: 0 auto;
    }
    .call-status{
      display: block;
      color: #FFF34A;
      font-size: 0.24em;
      margin-top: -0.8em;
      margin-bottom: 0.2em;
      text-align: center;
    }
    .call-btn{
      display: block;
      width: 1em;
      height: 1em;
      margin: 0 0.2em;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
  }
  .call-info-wrap{
    width: 3.08em;
    height: 3.78em;
    padding-top: 0.8em;
    padding-left: 0.1em;
    &.invite-info-wrap{
      span{
        display: block;
        text-align: center;
        font-size: 0.3em;
        color: #fff;
        margin-top: 0.3em;
        &.invite-name{
          font-size: 0.5em;
          margin-top: 0.5em;
          font-weight: bold;
          color: #02ffea;
        }
      }
    }
    .reporter-name{
      display: block;
      width: 100%;
      height: 1em;
      line-height: 1em;
      // text-indent: 1em;
      font-size:0.36em!important;
      text-align: left;
      color: #00ffea;
      // background: url(./assets/pic_arrow_big.png) no-repeat center left;
      // background-size : 0.82em 0.28em;
    }
    .info-list{
      display: block;
      text-align: left;
      font-size:0.24em;
      color:#00ffea;
      margin : 0.2em 0;
      &.introduce{
        height: 0.28em;
        background-image:url(./assets/icon_date.png);
        background-position: center left;
        background-size:1em
      }
    }
  }
  .close-btn{
    position: absolute;
    display: block;
    bottom: 0.5em;
    right: 0.5em;
    left: 25.5em;
    // width: 4em;
    height: 2em;
    line-height: 2em;
    font-size: 0.3em;
    color: #02ffea;
    border: 0.01em solid #02ffea;
    // background:url(./assets/btn_return.png) no-repeat center center;
    // background-size: 0.97em 0.28em;
    cursor: pointer;
    &.close-btn:hover {
      cursor: pointer;
    }
  }
}
</style>
