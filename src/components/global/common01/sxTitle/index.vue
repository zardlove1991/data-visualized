<template>
  <div class="common01-sxtitle" id="common01-sxtitle">
  </div>
</template>

<script>
export default {
  name: 'sxTitle',
  data () {
    return {
      titleTitle: ''
    }
  },
  mounted () {
    this.setFontsize('common01-sxtitle')
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 1920 * 100 + 'px'
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.common01-sxtitle {
  width: pxrem(1920px);
  height: pxrem(1080px);
  background: #0b072d url('./assets/titlebg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0rem;
  left: 0rem;
}
</style>
