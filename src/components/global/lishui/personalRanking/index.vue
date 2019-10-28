<template>
  <div class="lishui-personalranking" id="lishui-personalranking">
    <div class="personalranking-wrap sys-flex sys-flex-center sys-flex-wrap flex-justify-between">
      <div class="rank-list sys-flex sys-flex-center flex-justify-between" v-for="(v, k) in rankList" :key="k">
        <div class="serial hg-flex"><span>{{k + 1}}</span></div>
        <div class="information sys-flex sys-flex-center">
          <img :src="v.img" />
          <span>{{v.name}}</span>
        </div>
        <div class="num sys-flex sys-flex-center">
          <span>{{v.num}}</span>
          <span>条</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personalRanking',
  data () {
    return {
      rankList: [{
        img: 'http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg',
        name: '张亮',
        num: 85
      }, {
        img: 'http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg',
        name: '张亮',
        num: 85
      }, {
        img: 'http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg',
        name: '张亮',
        num: 85
      }, {
        img: 'http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg',
        name: '张亮',
        num: 85
      }, {
        img: 'http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg',
        name: '吴亦凡',
        num: 85
      }, {
        img: 'http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg',
        name: '张亮',
        num: 85
      }, {
        img: 'http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg',
        name: '张亮',
        num: 85
      }, {
        img: 'http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg',
        name: '张亮',
        num: 85
      }]
    }
  },
  mounted () {
    this.setFontsize('lishui-personalranking')
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-personalranking {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .personalranking-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    padding: px2em(152px) px2em(128px) px2em(110px) px2em(114px);
    color: #fff;
    .rank-list {
      width: px2em(780px);
      height: px2em(140px);
      background: url('./assets/back.png') no-repeat center;
      background-size: 100% 100%;
      padding: 0 px2em(57px) 0 px2em(94px);
      position: relative;
      .serial {
        width: px2em(55px);
        height: px2em(65px);
        position: absolute;
        background: url('./assets/one.png') no-repeat center;
        background-size: 100% 100%;
        left: 0;
        top: 0;
        span {
          font-size: px2em(32px);
          padding-bottom: px2em(50px);
        }
      }
      .information {
        img {
          width: px2em(94px);
          height: px2em(94px);
          border-radius: 50%;
          margin-right: px2em(20px);
        }
        span {
          font-size: px2em(42px);
        }
      }
      .num {
        color: #00FCFF;
        span:first-of-type {
          font-size: px2em(72px);
          margin-right: px2em(20px);
        }
        span:last-of-type {
          font-size: px2em(36px);
        }
      }
    }
  }
}
</style>