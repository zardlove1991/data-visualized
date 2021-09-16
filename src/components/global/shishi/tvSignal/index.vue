<template>
  <div class="shishi-tvSignal">
    <div class="tvSignal-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">电视信号</div>
      <div class="wrap-content">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tvSignal',
  data () {
    return {
    }
  },
  created () {},
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
.shishi-tvSignal {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .tvSignal-wrap {
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
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
