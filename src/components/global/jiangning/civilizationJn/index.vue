<template>
  <div class="jn-civilization">
    <div class="civilization-wrap">
      <div class="wrap-title">文明江宁</div>
      <div class="wrap-content">
        <div class="content-total">共<span>30</span>条</div>
        <div class="content-list">
          <div class="list-box sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" v-bind:style="{'animation-delay' : k/2+'s'}">
            <!-- <span class="status" :class="{'new': v.status === 0, 'hot': v.status === 1, 'report': v.status === 2}"><span>{{v.status === 0 ? '新' : v.status === 1 ? '热' : '报'}}</span></div> -->
            <div class="status report"><span>报</span></div>
            <div class="title overhidden">{{v.Title}}</div>
            <div class="time">{{v.CreateTime.slice(5)}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getcivilizationJN } from '@/servers/interface'
export default {
  name: 'civilizationJn',
  data () {
    return {
      dataList: [],
      count: 0
    }
  },
  created () {
    this.getcivilizationJN()
  },
  methods: {
    getcivilizationJN () {
      getcivilizationJN().then(res => {
        if (!res.data.error_code) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = res.data.result.slice(0, 5)
          }, 100)
        }
      })
    }
    // initList () {
    //   this.dataList = this.list.slice(
    //     this.count,
    //     this.count + 5 > this.list.length ? this.list.length : this.count + 5
    //   )
    //   this.count += 5
    //   this.countNum = setInterval(() => {
    //     if (this.count < this.list.length) {
    //       this.dataList = []
    //       setTimeout(() => {
    //         this.dataList = this.list.slice(this.count, this.count + 5)
    //         this.count += 5
    //       }, 100)
    //     } else {
    //       this.dataList = []
    //       clearInterval(this.countNum)
    //       this.count = 0
    //       this.getcivilizationJN()
    //     }
    //   }, 10000)
    // }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-civilization {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .civilization-wrap {
    width: 100%;
    height: 100%;
    background: url('../../../../assets/common/border@2x.png') no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(30px);
    color: #fff;
    .wrap-title {
      font-size: pxrem(50px);
      font-weight: 600;
      margin-top: pxrem(-16px);
    }
    .wrap-content {
      .content-total {
        font-size: pxrem(36px);
        text-align: left;
        margin-bottom: pxrem(40px);
        padding-left: pxrem(20px);
        span {
          color: #00F6FF;
          margin: 0 pxrem(8px);
        }
      }
      .content-list {
        .list-box {
          width: 100%;
          height: pxrem(140px);
          background-color: #0B295E;
          margin-bottom: pxrem(30px);
          padding: 0 pxrem(36px);
          &:last-of-type {
            margin-bottom: 0;
          }
          .status {
            width: pxrem(86px);
            height: pxrem(71px);
            background: no-repeat center;
            background-size: 100%;
            font-size: pxrem(36px);
            line-height: pxrem(71px);
            margin-right: pxrem(30px);
            &.new {
              background-image: url('./assets/new@2x.png');
            }
            &.hot {
              background-image: url('./assets/hot@2x.png');
            }
            &.report {
              background-image: url('./assets/report@2x.png');
            }
            span {
              padding-right: pxrem(15px);
            }
          }
          .title {
            font-size: pxrem(40px);
          }
          .time {
            margin-left: auto;
            font-size: pxrem(34px);
          }
        }
      }
    }
  }
}
</style>