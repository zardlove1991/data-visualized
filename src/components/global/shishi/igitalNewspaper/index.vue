<template>
  <div class="shishi-igitalNewspaper" id="shishi-igitalNewspaper">
    <div class="websitecontent-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">数据报/APP</div>
      <div class="sys-flex flex-justify-between">
        <div class="data-box">
          <div class="left-title">日报数字报</div>
          <div class="data-main sys-flex">
            <img class="left-icon" src="./assets/left.png" alt="">
            <iframe :src="dataUrl"></iframe>
            <img class="right-icon" src="./assets/right.png" alt="">
          </div>
        </div>
        <div class="data-box">
          <div class="left-title">看石狮<span class="en-title">APP</span></div>
          <div class="data-main sys-flex">
            <img class="left-icon" src="./assets/left.png" alt="">
            <iframe :src="appUrl"></iframe>
            <img class="right-icon" src="./assets/right.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'websiteContent',
  data () {
    return {
      dataUrl: `http://www.xepaper.com/ssrb/html/2021-09/16/node_1.htm?v=1`,
      appUrl: ``
    }
  },
  mounted () {
    this.setFontsize('shishi-igitalNewspaper')
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
.shishi-igitalNewspaper {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  position: relative;
  .websitecontent-wrap {
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    .data-box {
      background: url(./assets/data_bg.png);
      background-size: 100%;
      background-repeat: no-repeat;
      width: pxrem(828px);
      height: pxrem(730px);
      position: relative;
      .left-title {
        width: pxrem(48px);
        position: absolute;
        left: pxrem(35px);
        top: pxrem(225px);
        font-size: pxrem(48px);
        font-weight: 500;
        text-align: left;
        color: #ffffff;
        line-height: pxrem(60px);
        .en-title {
          position: relative;
          left: pxrem(-20px);
        }
      }
      .data-main {
        height: 100%;
        margin-left: pxrem(141px);
        align-items: center;
        .left-icon {
          width: pxrem(37px);
          height: pxrem(72px);
        }
        .right-icon {
          width: pxrem(37px);
          height: pxrem(72px);
        }
        iframe {
          margin:0 pxrem(36px);
          display: block;
          width: pxrem(495px);
          height: 100%;
          outline: none;
          border: none;
          box-shadow: none;
          -webkit-appearance: none;
        }
      }
        
    }
  }
}
</style>