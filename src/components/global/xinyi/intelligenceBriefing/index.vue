<template>
  <div class="main-wrap position-relative">
    <span class="off" v-if="!isConnection">websocket断连，页面已刷新5次</span>
    <div class="intelligence-briefing">
      <div class="briefing-title">智能前台</div>
      <div class="briefing-body sys-flex sys-flex-center flex-justify-between">
        <div class="ai-left" :class="list && list[0] ? 'width1' : 'width2'">
          <!-- <video :src="videoUrl" autoplay loop controls muted></video> -->
          <video src="http://vod.plus.yongzhou.gov.cn/video/2021/04/13/83b761ca171eaca13afb6cc944c1ad5c.mp4" style="width:100%;height:100%;object-fit:fill;" autoplay loop controls muted></video>
          <!-- <video id="monitor-video" style="width:100%;height:100%;object-fit:fill;" class="video-js vjs-default-skin vjs-big-play-centered"></video> -->
        </div>
        <div class="ai-right" v-if="list && list[0]">
          <div class="img-box sys-flex sys-flex-center flex-justify-center" :class="{'select': curentIndex === k}" v-for="(v, k) in list" :key="k">
            <img :src="v.extend_info ? v.extend_info.face_path : ''" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'video.js/dist/video-js.min.css'
// import Videojs from 'video.js'
import 'videojs-contrib-hls'
import 'videojs-flash'
import { setInterval, clearInterval } from 'timers'
import { getNowTime } from '@/utils/utils'
import { storage } from '@/utils/storage'
// import { startScan } from '@/servers/api'
export default {
  name: 'intelligenceBriefing',
  data () {
    return {
      list: [],
      curentIndex: 0,
      callback_url: '',
      newList: [],
      timer: null,
      token: '',
      startTime: '',
      startTime2: '',
      endTime2: '',
      times: '',
      isConnection: true,
      startTime3: '',
      times2: '',
      videoUrl: '',
      from: ''
    }
  },
  created () {
    // 初始化数据
    storage.set('intelligenceBriefing', 6)
    this.startTime2 = (new Date()).getTime()
    storage.set('aiWebsocket', 6)
    this.startTime3 = (new Date()).getTime()
    // 获取来源
    if (window.location.href.split('?')[1]) {
      this.from = window.location.href.split('?')[1].substring(5)
    }
    // if (window.location.href.indexOf('monitor.zyrb.com.cn') > -1) {
    //   window.location.href = 'http://monitor.zyrb.com.cn/#/intelligenceBriefing'
    // }
    // 获取宣传视频
    // this.getVideo()
    // 定时器循环
    setInterval(() => {
      this.times = storage.get('intelligenceBriefing')
      this.times2 = storage.get('aiWebsocket')
      // 每天8:0定时刷新
      if (getNowTime() === '8:0') {
        let link = ''
        let name = '早八点定时刷新'
        this.$api.isWebsocket(link, name).then(res => {
          console.log(res)
        })
        window.location.reload()
      }
      // 定时器中一直记录结束时间
      this.endTime2 = (new Date()).getTime()
      if ((this.endTime2 - this.startTime2) > 60000) {
        if (this.times > 0) {
          // times次数减少
          this.times--
          storage.set('intelligenceBriefing', this.times)
          // 发送websocket断连通知
          let link = 'wss://pushserver-api.cloud.hoge.cn/server_all/comment/live_358888?custom_appid=316&custom_appkey=hCSxFPczZxine4Uu9ZQRQVqfeB5vfiNm&device_token=32432weqdwaqdqw'
          let name = '智能人物'
          this.$api.isWebsocket(link, name).then(res => {
            console.log(res)
          })
          // 长链接断开时间大于一分钟 刷新页面
          window.location.reload()
        } else {
          this.isConnection = false
        }
      }
      // 发送消息
      let msg = {type: 'send_all'}
      if (this.from) {
        msg.from = 'hoge'
      }
      console.log('readyState', window.socketClient.readyState)
      if (window.socketClient.readyState === 1) {
        window.socketClient.send(JSON.stringify(msg))
      }
      // 判断ai长链接是否断掉
      console.log('11--111---111111')
      if ((this.endTime2 - this.startTime3) > 60000) {
        console.log('2222222--111---111111')
        if (this.times2 > 0) {
          this.times2--
          storage.set('aiWebsocket', this.times2)
          // 发送websocket断连通知
          let link = ''
          // if (this.from) {
          //   link = 'ws://172.31.2.4:8011/websocket/receive'
          // } else {
          //   link = 'ws://172.31.2.4:8011/websocket/receive'
          // }
          if (this.from) {
            link = 'ws://10.0.1.111:8011/websocket/receive'
          } else {
            link = 'ws://10.0.1.111:8011/websocket/receive'
          }
          let name = 'ai人像识别'

          this.$api.isWebsocket(link, name).then(res => {
            console.log(res, '123')
          })
          window.location.reload()
        } else {
          this.isConnection = false
        }
      }
    }, 60000)
    this.initData()
  },
  methods: {
    initData () {
      // 获取token
      // this.$api.getUserId().then((res) => {
      //   this.token = res.data.result.access_token
      // })
      // 接收ai数据建立websocket
      // if (this.from) {
      //   this.socketClient = new WebSocket('ws://172.31.2.4:8011/websocket/receive')
      // } else {
      //   this.socketClient = new WebSocket('ws://172.31.2.4:8011/websocket/receive')
      // }
      if (this.from) {
        this.socketClient = new WebSocket('ws://10.0.1.111:8011/websocket/receive')
      } else {
        this.socketClient = new WebSocket('ws://10.0.1.111:8011/websocket/receive')
      }
      this.socketClient.onopen = () => {
        console.log('~~~~ receive connect ~~~~')
      }
      this.socketClient.onerror = () => {
        console.log('websocket.error')
      }
      this.socketClient.onmessage = (evt) => {
        storage.set('aiWebsocket', 6)
        this.startTime3 = (new Date()).getTime()
        let data = evt.data
        // let data = ''
        console.log('socketClientData', data)
        if (typeof data === 'string' && data.length > 0 && !this.isJsonString(data)) {
          this.callback_url = data
          // console.log(this.callback_url)
          // 开启直播
          this.start()
          // 开启直播记录当前开始时间
          if (!this.startTime) {
            this.startTime = (new Date()).getTime()
          }
        } else if (typeof data === 'string' && data.length > 0 && this.isJsonString(data)) {
          // 有人进来替换开始时间
          this.startTime = (new Date()).getTime()
          this.handleData(this.isJsonString(data))
        } else if (typeof data === 'string' && data.length === 0) {
          // 没数据返回一直记录时间
          let time = (new Date()).getTime()
          // 十分钟
          if ((time - this.startTime) > 60000) {
            let msg = {'type': 'old', 'figure_id': 0, 'face_path': ''}
            if (this.from) {
              msg.from = 'hoge'
            }
            if (window.socketClient.readyState === 1) {
              window.socketClient.send(JSON.stringify(msg))
            }
            this.newList = []
            this.list = []
            this.curentIndex = 0
            // 清除定时器
            clearInterval(this.timer)
            this.timer = null
          }
          // return
        }
      }
      // 发送数据建立websocket
      window.socketClient = new WebSocket('wss://pushserver-api.cloud.hoge.cn/server_all/comment/live_358888?custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d&device_token=32432weqdwaqdqw')
      window.socketClient.onopen = () => {
        console.log('~~~~ send connect ~~~~')
      }
      window.socketClient.onmessage = (evt) => {
        storage.set('intelligenceBriefing', 6)
        // 长链接正常一直记录开始时间
        this.startTime2 = (new Date()).getTime()
        var res = JSON.parse(evt.data)
        if (res.text) {
          let type = JSON.parse(res.text).type
          if (type === 'refresh_data') {
            window.location.reload()
          } else if (type === 'send_all') {
            // return
          }
        }
      }
    },
    start () {
      this.$api.startScan(this.callback_url).then((res) => {
        // console.log(res,'res')
        // let url = 'rtmp://10.0.1.111/live/test_sd'
        // this.player = new Videojs('monitor-video', {
        //   sources: [{
        //     type: 'rtmp/flv',
        //     src: url
        //   }],
        //   preload: 'auto',
        //   controls: true,
        //   autoplay: true
        // }, () => {
        // })
      })
    },
    // 判断字符串是否为json字符串
    isJsonString (str) {
      if (typeof str === 'string') {
        try {
          let obj = JSON.parse(str)
          if (typeof obj === 'object' && obj) {
            return obj
          } else {
            return false
          }
        } catch (error) {
          return false
        }
      }
    },
    // 处理ai返回的数据信息
    handleData (data) {
      console.log('handleData', data)
      if (data && data[0]) {
        data.forEach(value => {
          if (value.extend_info) {
            this.newList.push(value)
          }
        })
        this.list = this.newList.slice(-4)
        if (this.list && this.list[0]) {
          if (!this.timer) {
            let msg = {'type': this.list[this.curentIndex].extend_info.system, 'figure_id': this.list[this.curentIndex].extend_info.extend_info, 'face_path': this.list[this.curentIndex].extend_info.face_path}
            console.log('msg2', msg)
            if (this.from) {
              msg.from = 'hoge'
            }
            // if (msg.type === 'workcall' && this.token) {
            //   msg.token = this.token
            // }
            console.log('444')
            if (window.socketClient.readyState === 1) {
              console.log('666', msg)
              window.socketClient.send(JSON.stringify(msg))
              console.log('777')
            }
            this.timer = setInterval(() => {
              this.curentIndex++
              if (this.curentIndex >= this.list.length) {
                this.curentIndex = 0
              }
              let msg = {'type': this.list[this.curentIndex].extend_info.system, 'figure_id': this.list[this.curentIndex].extend_info.extend_info, 'face_path': this.list[this.curentIndex].extend_info.face_path}
              if (this.from) {
                msg.from = 'hoge'
              }
              // if (msg.type === 'workcall' && this.token) {
              //   msg.token = this.token
              // }
              if (window.socketClient.readyState === 1) {
                window.socketClient.send(JSON.stringify(msg))
              }
            }, 15000)
          }
        }
      }
    },
    // 对象数组去重
    // removal (arr) {
    //   let obj = {}
    //   arr = arr.reduce((item, next) => {
    //     obj[next.title] ? '' : obj[next.title] = true && item.push(next)
    //     return item
    //   }, [])
    //   return arr
    // },
    // 获取宣传视频
    getVideo () {
      this.$api.getVideo().then(res => {
        this.videoUrl = res.data.result.url
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .intelligence-briefing {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    // padding-top: 0;
    color: #fff;
    font-size: 0.48rem;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.4rem;
    }
    .briefing-title {
      width: 100%;
      height: 1.13rem;
      background:linear-gradient(0deg,rgba(38,182,241,0.46) 0%,rgba(38,182,241,0.01) 99%);
      background-size: 100%;
      // background-image: url('../../assets/img/title_bg2.png');
      background-repeat: no-repeat;
      background-position: center 30%;
      text-align: center;
      font-weight: 600;
      // line-height: 1.13rem;
      margin-bottom: 0.25rem;
    }
    .briefing-body {
      width: 100%;
      height: 8.61rem;
      // background: url('../../assets/img/briefing/tongyong_bg01.png') no-repeat center;
      background-size: 100%;
      padding: 0.3rem 0.34rem 0.3rem 0.3rem;
      .width1 {
        width: 15.5rem;
      }
      .width2 {
        width: 100%;
      }
      .ai-left {
        height: 8rem;
        video {
          width: 100%;
          height: 100%;
        }
      }
      .ai-right {
        height: 100%;
        overflow: scroll;
        .select {
          opacity: 1!important;
        }
        .img-box {
          opacity: 0.6;
          width: 1.92rem;
          height: 1.9rem;
          // background: url('../../assets/img/briefing/touxiang_bg.png') no-repeat center;
          background-size: 100%;
          margin-bottom: 0.12rem;
          img {
            width: 1.8rem;
            height: 1.78rem;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
