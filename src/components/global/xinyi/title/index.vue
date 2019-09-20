<template>
  <div class="xy-title sys-flex sys-flex-center" id="xy-title" :class="[{'warp-bg' : showDefault}]" :style="defineBg()">
    <div class="title-title">{{titleTitle}}</div>
  </div>
</template>

<script>
export default {
  name: 'title',
  data () {
    return {
      titleTitle: '新沂市融媒体指挥调度中心',
      proportion: 1
    }
  },
  mounted () {
    this.proportion = this.getProportion('xy-task') * 1.5
    this.setFontsize('xy-task')
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.xy-title {
  width: 100%;
  height: 100%;
  padding: 0.25vh 0.5vw;
  // background: url("./assets/bg-01.png") no-repeat center;
  // background-size: 100%;
  .title-title {
    width: 100%;
    font-size: px1em(190px);
    font-weight: bold;
    color: #ffffff;
  }
}
.warp-bg {
  background: url('./assets/bg-01.png') no-repeat center;
  background-size: 100% 100%;
}
</style>