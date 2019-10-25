<template>
  <div class="lishui-daytask" id="lishui-daytask">
    <div class="daytask-wrap sys-flex sys-flex-center flex-justify-between">
      <div class="wrap-left">
        <div class="left-list">
          <div class="sys-flex sys-flex-center"><span>总任务：</span><span>4361</span></div>
          <div class="progress-total">
            <span class="progress" :style="{'width' : total + '%'}"></span>
          </div>
        </div>
        <div class="left-list">
          <div class="sys-flex sys-flex-center"><span>待开始：</span><span>1698</span></div>
          <div class="progress-total">
            <span class="progress" :style="{'width' : start + '%'}"></span>
          </div>
        </div>
        <div class="left-list">
          <div class="sys-flex sys-flex-center"><span>进行中：</span><span>4361</span></div>
          <div class="progress-total">
            <span class="progress" :style="{'width' : img + '%'}"></span>
          </div>
        </div>
        <div class="left-list">
          <div class="sys-flex sys-flex-center"><span>已完成：</span><span>4361</span></div>
          <div class="progress-total">
            <span class="progress" :style="{'width' : finish + '%'}"></span>
          </div>
        </div>
      </div>
      <div class="wrap-right">
        <div class="right-list sys-flex sys-flex-center" v-for="(v,k) in listData" :key="k">
          <div class="list-status">
            <img v-if="v.status === 1" src="./assets/start.png" />
            <img v-if="v.status === 2" src="./assets/ing.png" />
            <img v-if="v.status === 3" src="./assets/finish.png" />
          </div>
          <div class="list-text">{{v.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dayTask',
  data () {
    return {
      listData: [{
        status: 1,
        text: '军运会今晚武汉开幕 这些“硬核”精彩不容错过'
      }, {
        status: 2,
        text: '军运会今晚武汉开幕 这些“硬核”精彩不容错过'
      }, {
        status: 2,
        text: '军运会今晚武汉开幕 这些“硬核”精彩不容错过'
      }, {
        status: 3,
        text: '这对60后夫妻隐居山林16年，过着人们最“向往的生活”'
      }, {
        status: 3,
        text: '军运会今晚武汉开幕 这些“硬核”精彩不容错过'
      }],
      total: 100,
      start: 50,
      img: 80,
      finish: 20
    }
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
  position: relative;
  .daytask-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    padding: px2em(198px) px2em(103px) px2em(106px) px2em(108px);
    color: #fff;
    .wrap-left {
      width: px2em(420px);
      height: px2em(680px);
      background: url('./assets/miniBorder.png') no-repeat center;
      background-size: 100% 100%;
      padding: px2em(52px) px2em(60px);
      .left-list {
        margin-bottom: px2em(73px);
        &:last-of-type {
          margin-bottom: 0;
        }
        span:first-of-type {
          font-size: px2em(32px);
        }
        span:last-of-type {
          font-size: px2em(54px);
          color: #00FFF6;
        }
        .progress-total {
          width: px2em(300px);
          height: px2em(10px);
          border-radius: px2em(5px);
          background-color: #0F385A;
          overflow: hidden;
          margin-top: px2em(15px);
          .progress {
            height: 100%;
            display: block;
            background-color: #247BF1;
            border-radius: px2em(5px);
          }
        }
      }
    }
    .wrap-right {
      .right-list {
        margin-bottom: px2em(92px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .list-status {
          width: px2em(130px);
          height: px2em(54px);
          margin-right: px2em(30px);
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .list-text {
          font-size: px2em(38px)
        }
      }
    }
  }
}
</style>