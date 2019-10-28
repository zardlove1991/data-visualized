<template>
  <div class="lishui-manuscriptoutput" id="lishui-manuscriptoutput">
    <div class="manuscriptoutput-wrap">
      <div class="wrap-list sys-flex sys-flex-center" v-for="(v, k) in dataList" :key="k">
        <div class="list-status sys-flex sys-flex-center">
          <img v-if="k === 0" src="./assets/new.png" />
          <span v-if="k !== 0">【{{v.status}}】</span>
        </div>
        <div class="list-text">{{v.text}}</div>
        <div class="list-time list-span sys-flex sys-flex-center">
          <img src="./assets/time.png" />
          <span>{{v.time}}</span>
        </div>
        <div class="list-read list-span sys-flex sys-flex-center">
          <img src="./assets/read.png" />
          <span>{{v.read}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'manuscriptOutput',
  data () {
    return {
      dataList: [{
        status: 1,
        text: 'Interbrand全球品牌榜：华为成为唯一上榜中国品牌',
        time: '10-08 12:13',
        read: '12345'
      }, {
        status: '文稿',
        text: 'Interbrand全球品牌榜：华为成为唯一上榜中国品牌',
        time: '10-08 12:13',
        read: '12345'
      }, {
        status: '文稿',
        text: 'Interbrand全球品牌榜：华为成为唯一上榜中国品牌',
        time: '10-08 12:13',
        read: '12345'
      }, {
        status: '文稿',
        text: 'Interbrand全球品牌榜：华为成为唯一上榜中国品牌',
        time: '10-08 12:13',
        read: '12345'
      }, {
        status: '文稿',
        text: 'Interbrand全球品牌榜：华为成为唯一上榜中国品牌',
        time: '10-08 12:13',
        read: '12345'
      }]
    }
  },
  mounted () {
    this.setFontsize('lishui-manuscriptoutput')
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-manuscriptoutput {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .manuscriptoutput-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    padding: px2em(210px) px2em(128px) px2em(130px) px2em(96px);
    color: #fff;
    .wrap-list {
      margin-bottom: px2em(95px);
      &:last-of-type {
        margin-bottom: 0;
      }
      .list-status {
        span {
          font-size: px2em(38px);
          color: #0AFBF2;
        }
        img {
          width: px2em(107px);
          height: px2em(48px);
          margin: 0 px2em(20px);
        }
      }
      .list-text {
        font-size: px2em(38px);
      }
      .list-span {
        span {
          font-size: px2em(32px);
          color: #FEFEFF;
        }
      }
      .list-time {
        margin: 0 px2em(70px) 0 auto;
        img {
          width: px2em(30px);
          height: px2em(30px);
          margin-right: px2em(20px);
        }
      }
      .list-read {
        img {
          width: px2em(42px);
          height: px2em(30px);
          margin-right: px2em(20px);
        }
      }
    }
  }
}
</style>