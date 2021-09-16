<template>
  <div class="shishi-index" id="shishi-index">
    <div class="websitecontent-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">石狮网首页</div>
      <iframe :src="url"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: 'websiteContent',
  data () {
    return {
      url: `https://www1.chinashishi.net/`
    }
  },
  mounted () {
    this.setFontsize('shishi-index')
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
<style lang="scss" scoped>
@import "~@/styles/index.scss";
@import '../../common01/style/index.scss';
.shishi-index {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .websitecontent-wrap {
    padding: px2em(194px) px2em(274px) px2em(80px) px2em(270px);
    iframe {
      display: block;
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      box-shadow: none;
      -webkit-appearance: none;
    }
  }
}
</style>