<template>
  <div class="shishi-index" id="shishi-index">
    <div class="websitecontent-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">石狮网首页</div>
      <iframe allowfullscreen="allowfullscreen" id="urlIframe" :src="url" scrolling="auto" frameborder="no" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: 'websiteContent',
  data () {
    return {
      url: `https://www.chinashishi.net/`
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
  padding: pxrem(40px);
  position: relative;
  .websitecontent-wrap {
    padding: pxrem(160px) pxrem(96px) pxrem(75px) pxrem(78px);
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