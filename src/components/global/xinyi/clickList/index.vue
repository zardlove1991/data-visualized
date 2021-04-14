<template>
  <div class="main-wrap">
    <div class="click-wrap">
      <div class="click-title overhidden">
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
      </div>
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

  methods: {
    getReportList () {
      if (this.countNum) {
        this.reportList = []
        clearInterval(this.countNum)
        this.count = 0
      }
      getRankList().then(response => {
        if (response.data[0].data.length) {
          this.list = response.data[0].data
          this.initList()
        }
      })
    },

    getList () {
      setTimeout(() => {
        this.initList()
      }, 1000)
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
html, body, #app{
  font-size: 20px;
}
.main-wrap {
  width: 100%;
  height: 10.8rem;
  padding: 0rem 0.3rem 0.15rem;
  position: relative;
  background: url("./assets/bg.png") no-repeat center center;
  background-size: 100% 100%;
  .click-wrap {
    width: 100%;
    height: 100%;
    .click-title {
      width: 100%;
      height: 100%;
      background: url("./assets/title.png") no-repeat top center;
      background-size: 100%;
    }
    .click-list-wrap {
      margin-top: 2rem;
    }
    background-size: 100% 100%;
    .click-list {
      background: url("./assets/border.png") no-repeat center center;
      background-size: 100% 100%;
      color: #fff;
      width: 100%;
      height: 1.2rem;
      font-size: 0.32rem;
      font-family: PingFangSC-Regular;
      margin-bottom: 0.26rem;
      padding: 0 0.3rem;
      .click-rank {
        width: 0.44rem;
        height: 0.44rem;
        line-height: 0.44rem;
        font-size: 0.28rem;
        text-align: center;
        border-radius: 0.06rem;
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
        font-size: 0.42rem;
        font-weight: 400;
        padding-left: 0.4rem;
        width: 75%;
        text-align: left;
      }
      .click-user {
        background: url("./assets/name.png") no-repeat center left;
        background-size: 0.25rem 0.28rem;
        padding-left: 0.4rem;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #fff;
        width: 12%;
        text-align: left;
      }
      .click-count {
        background: url("./assets/click.png") no-repeat center left;
        background-size: 0.3rem 0.28rem;
        padding-left: 0.5rem;
        font-size: 0.34rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #fff;
      }
    }
  }
}
</style>
