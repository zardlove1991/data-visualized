<template>
  <div class="main-wrap" id="click-list-box">
    <div class="click-wrap">
      <!-- <div class="click-title overhidden"> -->
        <div class="click-title-2">文明新沂</div>
        <div class="click-list-wrap">
          <div
            class="click-list sys-flex sys-flex-center animated"
            v-for="(v,k) in reportList"
            :key="k"
            :class="{'fadeInLeft' : v.title}"
            v-bind:style="{'animation-delay' : k/2+'s'}"
          >
            <div class="click-rank first" v-if="k===0">01</div>
            <div class="click-rank second" v-if="k===1">02</div>
            <div class="click-rank third" v-if="k===2">03</div>
            <div class="click-rank others" v-if="k>2">0{{k+1}}</div>
            <div class="click-list-title overhidden">{{v.title}}</div>
            <div class="click-user">{{v.author}}</div>
            <div class="click-count">{{v.click_num}}</div>
          </div>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { getRankList } from '@/servers/api'
export default {
  name: 'clickList',
  data () {
    return {
      reportList: [],
      count: 0
    }
  },

  created () {
    this.getReportList()
  },
  mounted () {
    this.setFontsize('click-list-box')
  },
  methods: {
    getReportList () {
      if (this.countNum) {
        this.reportList = []
        clearInterval(this.countNum)
        this.count = 0
      }
      getRankList().then(response => {
        console.log(response, 'ree')
        if (response.data[0].data.length) {
          this.list = response.data[0].data
          this.initList()
        }
      })
    },

    getList () {
      setTimeout(() => {
        this.initList()
      }, 1000000)
    },

    initList () {
      this.reportList = this.list.slice(
        this.count,
        this.count + 6 > this.list.length ? this.list.length : this.count + 6
      )
      this.count += 6
      this.countNum = setInterval(() => {
        if (this.count < this.list.length) {
          this.reportList = []
          setTimeout(() => {
            this.reportList = this.list.slice(this.count, this.count + 6)
            this.count += 6
          }, 100)
        } else {
          this.reportList = []
          clearInterval(this.countNum)
          this.count = 0
          // this.getList();
          this.getReportList()
        }
      }, 15000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/index.scss';
.main-wrap {
  width: 100%;
  height: 100%;
  // padding: 0 px1em(30px) px1em(15px);
  padding: 0.3% 0.5%;
  position: relative;
  background: url("./assets/bg.png") no-repeat center center;
  background-size: 100% 100%;
  .click-wrap {
    width: 100%;
    height: 100%;
  }
  .click-title-2{
    width: 100%;
    height: 15%;
    background: url("./assets/title_bg2.png") no-repeat center top;
    background-size: 100% 100%;
    text-align: center;
    font-weight: 600;
    font-size: px1em(22px);
    color:#fff;
  }
  .click-list {
    background: url("./assets/border.png") no-repeat center center;
    background-size: 100% 100%;
    color: #fff;
    width: 100%;
    height: 15%;
    font-family: PingFangSC-Regular;
    margin-bottom: 1%;
    padding: 1% 2%;
    .click-rank {
      font-size: px1em(14px);
      padding:px1em(5px) px1em(10px);
      border-radius: px1em(6px);
      &.first {
        background: rgba(240, 65, 65, 1);
      }
      &.second {
        background: rgba(240, 168, 65, 1);
      }
      &.third {
        background: rgba(193, 65, 240, 1);
      }
      &.others {
        background: rgba(50, 205, 228, 1);
      }
    }
    .click-list-title {
      font-size: px1em(18px);
      font-weight: 400;
      padding-left: px1em(30px);
      flex:1;
      text-align: left;
    }
    .click-user {
      background: url("./assets/name.png") no-repeat center left;
      background-size: px1em(25px) px1em(28px);
      padding-left: px1em(40px);
      font-size: px1em(14.5px);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #fff;
      width: 12%;
      text-align: left;
    }
    .click-count {
      background: url("./assets/click.png") no-repeat center left;
      background-size: px1em(30px) px1em(28px);
      padding-left: px1em(50px);
      font-size: px1em(14.5px);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #fff;
    }
  }
}
</style>
