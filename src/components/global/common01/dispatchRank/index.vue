<template>
  <div class="common01-dispatchrank">
    <div class="dispatchrank-wrap common01-border">
      <div class="common01-title">发稿量排行</div>
      <div class="wrap-content sys-flex sys-flex-center sys-flex-wrap">
        <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four':k > 2}">{{k + 1}}</div>
          <div class="title common01-ft40">{{v}}</div>
          <div class="num common01-ft36"><span class="common01-ft60">{{dataArr[v]}}</span>条</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPublishDataRank } from '@/servers/interface'
export default {
  name: 'dispatchRank',
  data () {
    return {
      dataArr: {},
      dataList: []
    }
  },
  created () {
    this.getPublishDataRank()
    setInterval(() => {
      this.getPublishDataRank()
    }, 60000)
  },
  methods: {
    getPublishDataRank () {
      getPublishDataRank().then(res => {
        if (!res.data.error_code) {
          this.dataArr = res.data.result
          this.dataList = Object.keys(this.dataArr)
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
.common01-dispatchrank {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .dispatchrank-wrap {
    padding: pxrem(159px) pxrem(96px) pxrem(57px) pxrem(74px);
    color: #fff;
    .wrap-content {
      .item-list {
        width: pxrem(800px);
        height: pxrem(100px);
        background: url("./assets/back.png") no-repeat center;
        background-size: 100%;
        padding: 0 pxrem(82px) 0 pxrem(38px);
        margin-bottom: pxrem(14px);
        &:nth-of-type(odd) {
          margin-right: pxrem(70px);
        }
        &:nth-of-type(n+13) {
          margin-bottom: 0;
        }
        .index {
          width: pxrem(60px);
          height: pxrem(60px);
          background: no-repeat center;
          background-size: 100%;
          line-height: pxrem(60px);
          &.one {
            background-image: url("../clickRank/assets/one.png");
          }
          &.two {
            background-image: url("../clickRank/assets/two.png");
          }
          &.three {
            background-image: url("../clickRank/assets/three.png");
          }
          &.four {
            background-image: url("../clickRank/assets/four.png");
          }
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
.common01-border {
  width: 100%;
  height: 100%;
  background: url("../../../../assets/common/common01Border.png") no-repeat center;
  background-size: 100% 100%;
  position: relative;
}
.common01-title {
  font-size: pxrem(58px);
  font-weight: 500;
  text-shadow: 0 pxrem(16px) pxrem(16px) rgba(0, 222, 255, 0.2);
  position: absolute;
  top: pxrem(54px);
  left: pxrem(72px);
}
.common01-ft60 {
  font-size: pxrem(60px);
}
.common01-ft40 {
  font-size: pxrem(40px);
}
.common01-ft36 {
  font-size: pxrem(36px);
}
.common01-ft32 {
  font-size: pxrem(32px);
}
.common01-ft30 {
  font-size: pxrem(30px);
}
</style>
