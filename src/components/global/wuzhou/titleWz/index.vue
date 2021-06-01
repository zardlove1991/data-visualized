<template>
    <div class="wz-wrap" id="wzTitle">
        <div class="content">
          <div class="main-title">
          </div>
          <div class="time">
            {{currentTime}}
          </div>
        </div>     
    </div>
</template>  
<script>
export default {
  name: 'titleWz',
  data () {
    return {
      currentTime: ''
    }
  },
  created () {

  },
  mounted () {
    this.setFontsize('wzTitle')
    this.timer = setInterval(() => {
      this.showTime()
    }, 1000)
  },
  methods: {
    // 时钟显示
    showTime () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = this.displayClock(date.getHours())
      let minute = this.displayClock(date.getMinutes())
      let second = this.displayClock(date.getSeconds())
      this.currentTime = year + '年' + month + '月' + day + '日' + '  ' + hour + ':' + minute + ':' + second
    },
    displayClock (num) {
      return num < 10 ? '0' + num : num
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.wz-wrap{
    // width: pxrem(5620px);
    // height: pxrem(860px);
    // padding: pxrem(108px) pxrem(75px) pxrem(112px) pxrem(65px);
    width: 100%;
    height: 100%;
    padding: pxrem(108px) pxrem(75px) pxrem(112px) pxrem(65px);
    .content{
      width: 100%;
      height: 100%;
      .main-title{
        width: 100%;
        height: pxrem(618px);
        background: url('./assets/title.png')  center center no-repeat;
        background-size: pxrem(5139px) pxrem(618px);
      }
      .time{
        width: pxrem(1896px);
        height: pxrem(170px);
        line-height: pxrem(170px);
        color: #fff;
        font-weight: bold;
        background: url('./assets/time_bg.png') 100% no-repeat;
        margin: pxrem(65px) auto;

      }
    }
}

</style>
