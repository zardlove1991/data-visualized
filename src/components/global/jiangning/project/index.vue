<template>
  <div class="jn-project">
    <div class="project-wrap">
      <div class="wrap-title">选题汇总</div>
      <div class="wrap-content">
        <div class="content-total sys-flex sys-flex-center flex-justify-between">
          <div class="total-left">今日选题<span>28</span>篇</div>
          <div class="total-right">完成<span>25</span>篇，进行中<span>2</span>篇</div>
        </div>
        <div class="content-list">
          <div class="list-box sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
            <div class="title overhidden">{{v.title}}</div>
            <div class="name">{{v.name}}</div>
            <div class="status">{{v.status}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'project',
  data () {
    return {
      dataList: [{
        status: '进行中',
        name: '张昊',
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航'
      }, {
        status: '进行中',
        name: '张昊',
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航'
      }, {
        status: '进行中',
        name: '张昊',
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航'
      }, {
        status: '进行中',
        name: '张昊',
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航'
      }, {
        status: '进行中',
        name: '张昊',
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-project {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .project-wrap {
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
          padding: 0 pxrem(150px) 0 pxrem(36px);
          &:last-of-type {
            margin-bottom: 0;
          }
          .title {
            font-size: pxrem(40px);
            margin: 0 pxrem(180px) 0 pxrem(33px);
          }
          .name {
            font-size: pxrem(34px);
            color: #00F6FF;
          }
          .status {
            margin-left: auto;
            font-size: pxrem(34px);
          }
        }
      }
    }
  }
}
</style>