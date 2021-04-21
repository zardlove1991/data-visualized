<template>
  <div class="position-relative">
    <span class="off" v-if="!isConnection">websocket断连，页面已刷新5次</span>
    <!-- <div class="wrap" v-show="type == 'm2o_plus'"> -->
    <div class="wrap">
        <intelligence-briefing></intelligence-briefing>
        <character-information :id="id" :facePath="facePath"></character-information>
        <related-reports :id="id"></related-reports>
         <click-list :id="id"></click-list>
    </div>
    <!-- <workcall-infoMap v-show="type == 'old'"></workcall-infoMap> -->
  </div>
</template>
<script>
import characterInformation from '../characterInformation/index'
import clickList from '../clickList/index'
import relatedReports from '../relatedReports/index'
import intelligenceBriefing from '../intelligenceBriefing/index'
import workcallInfoMap from '../workcallInfoMap/index'
import { getNowTime } from '@/utils/utils'
import { storage } from '@/utils/storage'
export default {
  name: 'characterOne',
  data () {
    return {
      id: 313,
      token: '',
      type: 'm2o_plus',
      startTime: '',
      endTime: '',
      times: '',
      isConnection: true,
      facePath: '',
      from: ''
    }
  },
  components: {
    characterInformation,
    relatedReports,
    intelligenceBriefing,
    workcallInfoMap,
    clickList
  },
  created () {
    // 初始化数据
    storage.set('characterAll', 6)
    this.startTime = (new Date()).getTime()
    // 获取页面来源
    if (window.location.href.split('?')[1]) {
      this.from = window.location.href.split('?')[1].substring(5)
    }
    // 发送数据建立websocket
    window.socketClient = new WebSocket('wss://pushserver-api.cloud.hoge.cn/server_all/comment/live_358888?custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d&device_token=32432weqdwaqdqw')
    window.socketClient.onopen = () => {
      console.log('~~~~ send connect ~~~~')
    }
    // 定时器循环
    setInterval(() => {
      this.times = storage.get('characterAll')
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
          storage.set('characterAll', this.times)
          // 发送websocket断连通知
          let link = 'wss://pushserver-api.cloud.hoge.cn/server_all/comment/live_358888?custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d&device_token=32432weqdwaqdqw'
          let name = '人物信息/融媒首页/稿件排行'
          this.$api.isWebsocket(link, name).then(res => {
            console.log(res, '123')
          })
          // 长链接断开时间大于一分钟 刷新页面
          console.log('页面刷新')
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
      console.log(window.socketClient)
      if (window.socketClient.readyState === 1) {
        window.socketClient.send(JSON.stringify(msg))
      }
    }, 60000)
  },
  mounted () {
    // 接收数据
    window.socketClient.onmessage = (evt) => {
      console.log('12312')
      storage.set('characterAll', 6)
      // 长链接正常一直记录开始时间
      this.startTime = (new Date()).getTime()
      var res = JSON.parse(evt.data)
      console.log(res)
      if (res.text) {
        if (JSON.parse(res.text) && JSON.parse(res.text).type === 'refresh_data') {
          window.location.reload()
        } else if (JSON.parse(res.text) && JSON.parse(res.text).type === 'send_all') {
        //   return
          console.log('1231')
        } else {
          this.facePath = JSON.parse(res.text)['face_path']
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
<style lang="scss" scoped>
    .wrap {
        display: flex;
        flex-wrap: wrap;
        div {
            width: 50%;
            height: 50vh;
        }
    }
</style>
