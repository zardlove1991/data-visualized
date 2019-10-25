<template>
  <div class="lishui-daytask" id="lishui-daytask">
    <div class="daytask-wrap">
      <div class="wrap-left">
        <div class="left-total">
          <div>总任务：<span>4361</span></div>
          <div></div>
        </div>
        <div class="left-start">
          <div>待开始：<span>1698</span></div>
          <div></div>
        </div>
        <div class="left-ing">
          <div>进行中：<span>4361</span></div>
          <div></div>
        </div>
        <div class="left-finish">
          <div>已完成：<span>4361</span></div>
          <div></div>
        </div>
      </div>
      <div class="wrap-right">
        <div class="right-list">
          <div class="list-status"></div>
          <div class="list-text"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dayTask',
  data () {
    return {}
  },
  mounted () {
    this.setFontsize('lishui-daytask')
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-daytask {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
}
</style>