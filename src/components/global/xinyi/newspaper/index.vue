<template>
  <div class="xy-newspaper" id="xy-newspaper" :style="defineBg()">
    <!--  :class="[{'warp-bg' : showDefault}]"  -->
    <div class="newspaper-wrap sys-flex sys-vertical">
      <div class="newspaper-title sys-flex sys-flex-center">{{newspaperTitle}}</div>
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
      newspaperTitle: '数字报',
      url: `http://szb.xy.gov.cn/`
    }
  },
  created () {
  },
  mounted () {
    this.setFontsize('xy-newspaper')
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-newspaper {
  width: 100%;
  padding: 0.25vh 0.25vw;
  .newspaper-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0 px1em(17px);
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .newspaper-title {
    text-align: left;
    height: 20%;
    font-size: px1em(22px);
    color: #d6e6ff;
  }
  .newspaper-box {
    width: 80%;
    height: 70%;
    margin: 0 auto;
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
