<template>
  <div class="shishi-nonEditedSignal">
    <div class="nonEditedSignal-wrap common01-border sys-flex sys-flex-center flex-justify-center">
        <div class="block-title" :style="setFontSize(63)">非编状态信号</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'nonEditedSignal',
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
.shishi-nonEditedSignal {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .nonEditedSignal-wrap {
    // padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    .block-title {
        font-size: pxrem(58px);
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        letter-spacing: pxrem(1px);
        text-shadow: 0 pxrem(16px) pxrem(16px) rgba(0, 222, 255, 0.2);      
    }
  }
}
</style>
