<template>
  <div class="common01-heatmap">
    <div class="heatmap-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '用户热力图'}}</div>
      <div class="wrap-content">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'userHeatmap',
  data () {
    return {
      frequency: 15000
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-heatmap {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  color: #fff;
  .heatmap-wrap {
  }
}
</style>
