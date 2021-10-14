<template>
  <div class="shishi-releaseStatistics">
    <div class="releaseStatistics-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '发稿统计'}}</div>
      <div class="wrap-content sys-flex flex-justify-between">
        <div class="content-left">
          <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in leftList" :key="k" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2+'s'}">
            <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four':k > 2}">{{k + 1}}</div>
            <img class="avatar common01-ft40" :src="v.avatar || defaultImg">
            <div class="title common01-ft40">{{v.name}}</div>
            <div class="num common01-ft36"><span class="common01-ft60">{{v.publish}}</span>条</div>
          </div>
        </div>
        <div class="content-right" v-if="rightList && rightList[0]">
          <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in rightList" :key="k" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2+'s'}">
            <div class="index common01-ft40" :class="{'one': k + 4 === 0, 'two': k + 4 === 1, 'three': k + 4 === 2, 'four':k + 4 > 2}">{{k + 5}}</div>
            <img class="avatar common01-ft40" :src="v.avatar || defaultImg">
            <div class="title common01-ft40">{{v.name}}</div>
            <div class="num common01-ft36"><span class="common01-ft60">{{v.publish}}</span>条</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getReleaseStatistics } from '@/servers/interface'
export default {
  name: 'releaseStatistics',
  data () {
    return {
      leftList: [],
      rightList: [],
      defaultImg: require('./assets/default_avatar.jpeg')
    }
  },
  created () {
    this.getDataList()
    setInterval(() => {
      this.getDataList()
    }, 60000)
  },
  methods: {
    getDataList () {
      getReleaseStatistics(this.currentViewId).then(res => {
        if (!res.data.error_code) {
          let dataList = res.data.result.data
          if (dataList && dataList.length > 4) {
            this.leftList = dataList.slice(0, 4)
            this.rightList = dataList.slice(4, 8)
          } else {
            this.leftList = dataList.slice(0, 8)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../../common01/style/index.scss';
.shishi-releaseStatistics {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .releaseStatistics-wrap {
    padding: pxrem(220px) pxrem(96px) pxrem(57px) pxrem(86px);
    color: #fff;
    .wrap-content {
      .content-left {
        width: 48%;
        .item-list {
          // margin-right: pxrem(70px);
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .content-right {
        width: 48%;
        .item-list {
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .item-list {
        // width: pxrem(800px);
        height: pxrem(140px);
        background: url("./assets/back.png") no-repeat center;
        background-size: 100% 100%;
        padding: 0 pxrem(82px) 0 pxrem(38px);
        margin-bottom: pxrem(50px);
        .index {
          width: pxrem(60px);
          height: pxrem(60px);
          background: no-repeat center;
          background-size: 100% 100%;
          line-height: pxrem(60px);
          &.one {
            background-image: url("../../common01/clickRank/assets/one.png");
          }
          &.two {
            background-image: url("../../common01/clickRank/assets/two.png");
          }
          &.three {
            background-image: url("../../common01/clickRank/assets/three.png");
          }
          &.four {
            background-image: url("../../common01/clickRank/assets/four.png");
          }
        }
        .avatar {
          width: pxrem(88px);
          height: pxrem(88px);
          border-radius: 50%;
          border: 2px solid #00deff;
          margin-left: pxrem(46px);
        }
        .title {
          text-align: left;
          width: 40%;
          margin-left: pxrem(40px);
        }
        .num {
          margin-left: auto;
          color: #00FCFF;
        }
      }
    }
  }
}
</style>
