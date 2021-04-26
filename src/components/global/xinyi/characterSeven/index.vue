<template>
  <div class="position-relative">
    <span class="off" v-if="!isConnection">websocket断连，页面已刷新5次</span>
    <related-reports :id="id"></related-reports>
  </div>
</template>
<script>
import relatedReports from '../relatedReports/index'
import { getNowTime } from '@/utils/utils'
import { storage } from '@/utils/storage'
export default {
  name: 'characterSeven',
  data () {
    return {
      id: 0,
      token: '',
      type: 'old',
      startTime: '',
      endTime: '',
      times: '',
      isConnection: true
    }
  },
  components: {
    relatedReports
  },
  created () {
    // 初始化数据
    storage.set('characterSeven', 6)
    this.startTime = (new Date()).getTime()
    // 发送数据建立websocket
    window.socketClient = new WebSocket('wss://pushserver-api.cloud.hoge.cn/server_all/comment/live_358888?custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ&device_token=32432weqdwaqdqw')
    window.socketClient.onopen = () => {
      console.log('~~~~ send connect ~~~~')
    }
    // 定时器循环
    setInterval(() => {
      this.times = storage.get('characterSeven')
      // 每天8:0定时刷新
      if (getNowTime() === '8:0') {
        window.location.reload()
      }
      // 定时器中一直记录结束时间
      this.endTime = (new Date()).getTime()
      console.log(this.endTime - this.startTime)
      if ((this.endTime - this.startTime) > 60000) {
        if (this.times > 0) {
          // times次数减少
          this.times--
          storage.set('characterSeven', this.times)
          // 发送websocket断连通知
          let link = 'wss://pushserver-api.cloud.hoge.cn/server_all/comment/live_358888?custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ&device_token=32432weqdwaqdqw'
          // let name = '相关报道/最热内容/短视频榜'
          let name = '相关报道'
          this.$api.isWebsocket(link, name).then(res => {
            console.log(res)
          })
          // 长链接断开时间大于一分钟 刷新页面
          console.log('页面刷新')
          // window.location.reload()
        } else {
          this.isConnection = false
        }
      }
      // 发送消息
      let msg = {type: 'send_all'}
      if (window.socketClient.readyState === 1) {
        window.socketClient.send(JSON.stringify(msg))
      }
    }, 60000)
  },
  mounted () {
    // 接收数据
    window.socketClient.onmessage = (evt) => {
      storage.set('characterSeven', 6)
      // 长链接正常一直记录开始时间
      this.startTime = (new Date()).getTime()
      var res = JSON.parse(evt.data)
      console.log(res.text)
      if (res.text) {
        if (JSON.parse(res.text) && JSON.parse(res.text).type === 'refresh_data') {
          window.location.reload()
        } else if (JSON.parse(res.text) && JSON.parse(res.text).type === 'send_all') {
          // return
        } else {
          this.type = JSON.parse(res.text).type
          let id = JSON.parse(res.text)['figure_id']
          if (this.type === 'workcall') {
            this.token = JSON.parse(res.text).token
          }
          this.id = Number(id)
        }
      }
    }
  }
}
</script>
