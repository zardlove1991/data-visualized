<template>
  <div class="xy-operate" id="xy-operate">
    <!--  :class="[{'warp-bg' : showDefault}]"  -->
    <div class="operate-wrap sys-flex sys-vertical">
      <div class="operate-title sys-flex sys-flex-center">{{operateDataTitle}}</div>
      <div class="operate-list sys-flex">
        <div class="date_now">
          <span class="date">{{date}}</span>&nbsp;
          <span class="week">{{'星'}}</span>
          <span class="week">{{'期'}}</span>
          <span class="week">{{week}}</span>
        </div>
        <div class="split-img">
            <img src="./assets/split_line.png" />
        </div>
        <div class="sys-flex sys-vertical">
          <div class="operate-item sys-flex">
            <div class="one-img img-box">
              <img src="./assets/app.png" />
            </div>
            <div class="one-left mr100">
              <div class="mbt12">APP安装总数</div>
              <numCount :num-info="app_total_install" :fontcolor="'yellow'"></numCount>         
            </div>
            <div class="one-img img-box">
                <img src="./assets/app.png" />
            </div>
            <div class="one-right">
              <div class="mbt12">APP昨日阅读数</div>
              <numCount :num-info="app_yesterday_read_total" :fontcolor="'yellow'"></numCount>
            </div>
          </div>
          <!-- <div class="operate-line mtt22 operate-item"></div> -->
          <div class="operate-item sys-flex">
            <div class="two-img img-box">
              <img src="./assets/app.png" />
            </div>
            <div class="two-left mr100">
              <div class="mbt12">APP当日启动数量</div>
              <numCount :num-info="app_pv_amount" :fontcolor="'red'"></numCount>      
            </div>
            <div class="one-img img-box">
                <img src="./assets/app.png" />
            </div>
            <div class="two-right">
              <div class="mbt12">APP日活用户数</div>
              <numCount :num-info="app_uv_amount" :fontcolor="'red'"></numCount>        
            </div>
          </div>
          <!-- <div class="operate-line mtt22 operate-item"></div> -->
          <div class="operate-item sys-flex">
            <div class="three-img img-box">
              <img src="./assets/wechat.png" />
            </div>
            <div class="three-left mr100">
              <div class="mbt12">今日诗城微信用户数</div>
              <numCount :num-info="wechat_total" :fontcolor="'green'"></numCount>        
            </div>
            <div class="three-img img-box">
              <img src="./assets/wechat.png" />
            </div>
            <div class="three-right">
              <div class="mbt12">今日诗城微信阅读量</div>
              <numCount :num-info="wechat_read_total" :fontcolor="'green'"></numCount>        
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numCount from './numCount'
import { getAppStatisticalData } from '@/servers/interface'
export default {
  name: 'operateDate',
  data () {
    return {
      operateDataTitle: '运营数据',
      app_total_install: [0, 0, 0, 0, 0, 0, 0, 0],
      app_yesterday_read_total: [0, 0, 0, 0, 0, 0, 0, 0],
      app_pv_amount: [0, 0, 0, 0, 0, 0, 0, 0],
      app_uv_amount: [0, 0, 0, 0, 0, 0, 0, 0],
      wechat_total: [0, 0, 0, 0, 0, 0, 0, 0],
      wechat_read_total: [0, 0, 0, 0, 0, 0, 0, 0],
      frequency: 35000,
      date: '',
      week: ''
    }
  },
  components: {
    numCount
  },
  created () {
    this.getDataList()
    this.date = this.$moment(Date.now()).format('YYYY/MM/DD')
    this.week = this.$moment(Date.now()).format('dddd').slice(2)
  },
  mounted () {
    this.setFontsize('xy-operate')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      this.getAppData()
      this.getWechatData()
    },
    getAppData () {
      getAppStatisticalData().then((res) => {
        this.app_total_install = this.preFixInterge(res.data.result.app_total_install, 8)
        this.app_pv_amount = this.preFixInterge(res.data.result.app_statistics[0].app_pv_amount, 8)
        this.app_uv_amount = this.preFixInterge(res.data.result.app_statistics[0].app_uv_amount, 8)
        this.app_yesterday_read_total = this.preFixInterge(res.data.result.app_click.yesterday[3].total, 8)
      })
    },
    getWechatData () {
      // this.$api.getWeixinTotal().then((res) => {
      //   if(res && res.data && res.data.result){
      //     setTimeout(() => {
      //       // 微信总数
      //       this.wechat_total = this.preFixInterge(res.data.result.cumulate_user, 8)
      //       this.wechat_regist = this.preFixInterge(res.data.result.int_page_read_count, 8)
      //     },100)
      //   }
      // })
      setTimeout(() => {
        this.wechat_total = this.preFixInterge('186537', 8)
        this.wechat_read_total = this.preFixInterge('15636', 8)
      }, 100)
    },
    preFixInterge (num, n) {
      return (Array(n).join(0) + num).slice(-n).split('')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-operate {
  width: 100%;
  padding: 0.25vh 0.1vw;
  text-align: left;
  .operate-wrap {
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
  .operate-title {
    text-align: left;
    height: 15%;
    font-size: px1em(22px);
    font-weight: bold;
    color: #d6e6ff;
    margin-bottom: 1.2em;
  }
  .operate-list {
    height: 85%;
    padding: 0 3%;
    .operate-item {
      margin-bottom: 1.2em
    }
    .date_now {
      color:#ffffff;
      font-size: px1em(12px);
      word-break: break-word;
      width: 0.1em;
      margin-right:2em;
      margin-top: 1em;
      .week{
        margin-left:-.2em;
      }
      // writing-mode: vertical-lr;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .operate-line {
    width: 100%;
    height: 0.2em;
    background: url("./assets/line.png") no-repeat center;
    background-size: 100%;
  }
  .img-box {
    width: 1.6em;
    height: 1.6em;
    margin-right: .2em;
  }
  .split-img {
    margin-right:1em;
    img {
      width: .2em;
      height: 7.2em;
    }
  }
  .mbt12 {
    font-size: 0.4em;
    margin-bottom: 0.5em;
    color: #ffffff;
  }
  .mtt22 {
    margin: 0.8em 0;
  }
  .mr100 {
    margin-right: 1em;
  }
}
</style>
