<template>
  <div class="shishi-liveSignal">
    <div class="liveSignal-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">直播信号</div>
        <img class="img-icon" src="./assets/live-icon.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'liveSignal',
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../../common01/style/index.scss';
.shishi-liveSignal {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .liveSignal-wrap {
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    .img-icon {
      width: pxrem(120px);
      height: pxrem(120px);
      position: absolute;
      bottom: pxrem(45px);
      right: pxrem(72px);
    }
    .wrap-content {
      .marginBottom75 {
        margin-bottom: pxrem(75px)!important;
      }
      .item-list {
        margin-bottom: pxrem(90px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          width: 60%;
          text-align: left;
        }
        .read {
          img {
            width: pxrem(30px);
            height: pxrem(30px);
            margin-right: pxrem(18px);
          }
        }
      }
    }
  }
}
</style>
