<template>
  <div class="xy-newspaper" id="xy-newspaper">
    <div class="newspaper-wrap sys-flex sys-vertical" :class="[{'warp-bg' : showDefault}]" :style="defineBg()">
      <div class="newspaper-box">
        <iframe :src="url"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'newspaper',
  data () {
    return {
      url: `http://szb.xy.gov.cn/`
    }
  },
  created () {
  },
  mounted () {
    this.setFontsize('xy-report')
  }
}
</script>
<style lang="scss" scoped>
.xy-newspaper {
  width: 100%;
  padding: 0.25vh 0.25vw;
  .newspaper-wrap {
    width: 100%;
    height: 100%;
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .newspaper-box {
    padding: 2.5%;
    width: 100%;
    height: 100%;
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
