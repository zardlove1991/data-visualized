<template>
  <div class="jn-report">
    <div class="report-wrap">
      <div class="wrap-title">报题展示</div>
      <div class="wrap-content">
        <div class="content-total sys-flex sys-flex-center flex-justify-between">
          <div class="total-left">今日报题<span>28</span>篇</div>
          <div class="total-right">通过<span>25</span>篇，待审核<span>2</span>篇，打回<span>1</span>篇</div>
        </div>
        <div class="content-list">
          <div class="list-box sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
            <div class="status" :class="{'one': v.status === 0, 'two': v.status === 1, 'three': v.status === 2, 'four': v.status === 3}">{{v.status === 0 ? '待审核' : v.status === 1 ? '通过' : v.status === 2 ? '打回' : '报审'}}</div>
            <div class="title overhidden">{{v.title}}</div>
            <div class="name">{{v.name}}</div>
            <div class="time">{{v.time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'report',
  data () {
    return {
      dataList: [{
        status: 0,
        name: '张昊',
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航',
        time: '05-25  13:51'
      }, {
        status: 1,
        name: '张昊',
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航',
        time: '05-25  13:51'
      }, {
        status: 2,
        name: '张昊',
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航',
        time: '05-25  13:51'
      }, {
        status: 3,
        name: '张昊',
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航',
        time: '05-25  13:51'
      }, {
        status: 0,
        name: '张昊',
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航',
        time: '05-25  13:51'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-report {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .report-wrap {
    width: 100%;
    height: 100%;
    background: url('../../../../assets/common/border@2x.png') no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(30px);
    color: #fff;
    .wrap-title {
      font-size: pxrem(50px);
      font-weight: 600;
      margin-top: pxrem(-16px);
    }
    .wrap-content {
      .content-total {
        font-size: pxrem(36px);
        text-align: left;
        margin-bottom: pxrem(40px);
        padding-left: pxrem(20px);
        span {
          font-size: pxrem(50px);
          font-weight: 600;
          color: #00F6FF;
          margin: 0 pxrem(8px);
        }
      }
      .content-list {
        .list-box {
          width: 100%;
          height: pxrem(140px);
          background-color: #0B295E;
          margin-bottom: pxrem(30px);
          padding: 0 pxrem(36px);
          &:last-of-type {
            margin-bottom: 0;
          }
          .status {
            width: pxrem(130px);
            height: pxrem(52px);
            line-height: pxrem(52px);
            font-size: pxrem(30px);
            border-radius: pxrem(5px);
            &.one {
              background-color: #2684FA;
            }
            &.two {
              background-color: #1AC8C6;
            }
            &.three {
              background-color: #DE4646;
            }
            &.four {
              background-color: #FF9A02;
            }
          }
          .title {
            font-size: pxrem(40px);
            margin: 0 pxrem(135px) 0 pxrem(33px);
          }
          .name {
            font-size: pxrem(34px);
            color: #00F6FF;
          }
          .time {
            margin-left: auto;
            font-size: pxrem(34px);
          }
        }
      }
    }
  }
}
</style>