<template>
  <div class="common01-operatedata02" id="common01-operatedata02">
    <div class="operate-wrap sys-flex sys-vertical common01-border">
      <div class="common01-title">运营数据</div>
      <div class="operate-list sys-flex sys-vertical">
        <div class="sys-flex">
          <div class="one-img img-box">
            <img src="./assets/app.png" />
          </div>
          <div class="one-left mr100">
            <div class="mbt12 common01-ft40">今日稿件发布数</div>
            <numCount :num-info="manuscript_total" :fontcolor="'yellow'"></numCount>
          </div>
          <div class="one-right">
            <div class="mbt12 common01-ft40">今日新增用户数</div>
            <numCount :num-info="manuscript_today" :fontcolor="'yellow'"></numCount>
          </div>
        </div>
        <div class="operate-line mtt22"></div>
        <div class="sys-flex">
          <div class="two-img img-box">
            <img src="./assets/web.png" />
          </div>
          <div class="two-left mr100">
            <div class="mbt12 common01-ft40">累计网站访问量</div>
            <numCount :num-info="web_total" :fontcolor="'red'"></numCount>
          </div>
          <div class="two-right">
            <div class="mbt12 common01-ft40">当日网站访问量</div>
            <numCount :num-info="web_regist" :fontcolor="'red'"></numCount>
          </div>
        </div>
        <div class="operate-line mtt22"></div>
        <div class="sys-flex">
          <div class="three-img img-box">
            <img src="./assets/wechat.png" />
          </div>
          <div class="three-left mr100">
            <div class="mbt12 common01-ft40">累计微信粉丝总数</div>
            <numCount :num-info="wechat_total" :fontcolor="'green'"></numCount>
          </div>
          <div class="three-right">
            <div class="mbt12 common01-ft40">昨日阅读总数</div>
            <numCount :num-info="wechat_regist" :fontcolor="'green'"></numCount>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOperationalData01 } from '@/servers/interface'
import numCount from './numCount'
export default {
  name: 'operateDate',
  data () {
    return {
      manuscript_total: [0, 0, 0, 0, 0, 0, 0, 0],
      manuscript_today: [0, 0, 0, 0, 0, 0, 0, 0],
      web_total: [0, 0, 0, 0, 0, 0, 0, 0],
      web_regist: [0, 0, 0, 0, 0, 0, 0, 0],
      wechat_total: [0, 0, 0, 0, 0, 0, 0, 0],
      wechat_regist: [0, 0, 0, 0, 0, 0, 0, 0],
      frequency: 35000
    }
  },
  components: {
    numCount
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('common01-operatedata02')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getOperationalData01('website,weChat,app,weiBo,shortVideo', this.currentViewId).then(res => {
        console.log(res, 'ressss')
        setTimeout(() => {
          // 稿件总数
          this.manuscript_total = this.preFixInterge(123, 8)
          this.manuscript_today = this.preFixInterge(321, 8)
          // 微信总数
          this.wechat_total = this.preFixInterge(111, 8)
          this.wechat_regist = this.preFixInterge(222, 8)
          // 网站总数
          this.web_total = this.preFixInterge(333, 8)
          this.web_regist = this.preFixInterge(444, 8)
        }, 100)
      })
    },
    preFixInterge (num, n) {
      return (Array(n).join(0) + num).slice(-n).split('')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/index.scss';
@import '../style/index.scss';
.common01-operatedata02 {
  width: 100%;
  padding: pxrem(40px);
  text-align: left;
  .operate-wrap {
    padding: pxrem(207px) pxrem(96px) pxrem(95px) pxrem(78px);
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  }
  .operate-title {
    text-align: left;
    height: 15%;
    font-size: px1em(22px);
    font-weight: bold;
    color: #d6e6ff;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .operate-line {
    width: 100%;
    height: pxrem(20px);
    background: url("./assets/line.png") no-repeat center;
    margin: pxrem(39px) 0;
    background-size: 100%;
  }
  .img-box {
    width: pxrem(168px);
    height: pxrem(168px);
    margin-right: pxrem(48px);
  }
  .mbt12 {
    font-size: 0.4em;
    margin-bottom: 0.5em;
    color: #ffffff;
  }
  .mr100 {
    margin-right: 2em;
  }
}
</style>
