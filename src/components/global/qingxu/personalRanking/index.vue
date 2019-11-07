<template>
  <div class="qx-personalranking" id="qx-personalranking">
    <div class="personalranking-wrap sys-flex sys-flex-wrap flex-justify-between">
      <div class="rank-list sys-flex sys-flex-center flex-justify-between animated" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2 + 's'}" v-for="(v, k) in rankList" :key="k">
        <div class="serial hg-flex" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four': k > 2}">
          <span class="serial-number">{{k + 1}}</span>
        </div>
        <div class="information sys-flex sys-flex-center">
          <img :src="v && v.avatar ? v.avatar.host + v.avatar.filepath + v.avatar.filename : defaultImg" class="info-img" />
          <span class="info-name">{{v.name}}</span>
        </div>
        <div class="num sys-flex sys-flex-center">
          <span class="num-text">{{v.publish}}</span>
          <span class="num-unit">条</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getM2OPlusWorkRank } from '@/servers/qingxu'
export default {
  name: 'personalRanking',
  data () {
    return {
      rankList: [],
      defaultImg: require('../../../../assets/avatar/touxiang.png')
    }
  },
  mounted () {
    this.setFontsize('qx-personalranking')
  },
  created () {
    this.getDataList()
    setInterval(() => {
      this.getDataList()
    }, 15000)
  },
  methods: {
    getDataList () {
      getM2OPlusWorkRank().then(res => {
        if (res && res.data && res.data.result && res.data.result && res.data.result[0]) {
          this.rankList = res.data.result
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.qx-personalranking {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(40px);
  .personalranking-wrap {
    width: 100%;
    height: 100%;
    padding: pxrem(150px) pxrem(72px) pxrem(20px);
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    align-content: space-around;
    .rank-list {
      width: 47%;
      height: 17%;
      background: url('./assets/back.png') no-repeat center;
      background-size: 100% 100%;
      padding: 0 pxrem(57px) 0 pxrem(94px);
      position: relative;
      .serial {
        width: pxrem(60px);
        height: pxrem(70px);
        position: absolute;
        background: no-repeat center;
        background-size: 100% 100%;
        left: 0;
        top: 0;
        .serial-number {
          font-size: pxrem(40px);
          padding-bottom: 0.5em;
          color: #ffffff;
        }
        &.one {
          background-image: url('./assets/one.png');
        }
        &.two {
          background-image: url('./assets/two.png');
        }
        &.three {
          background-image: url('./assets/three.png');
        }
        &.four {
          background-image: url('./assets/four.png');
        }
      }
      .information {
        .info-img {
          width: pxrem(94px);
          height: pxrem(94px);
          border-radius: 50%;
          margin-right: pxrem(40px);
        }
        .info-name {
          font-size: pxrem(42px);
          color: #FFFFFF;
        }
      }
      .num {
        color: #00FCFF;
        .num-text {
          font-size: pxrem(60px);
        }
        .num-unit {
          font-size: pxrem(36px);
        }
      }
    }
  }
}
</style>