<template>
  <div class="common01-report">
    <div class="report-wrap common01-border">
      <div class="common01-title">报题展示</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="status common01-ft30" :class="{'one': v.audit_status === '0', 'two': v.audit_status === '1', 'three': v.audit_status === '2', 'four': v.audit_status === '4'}">{{v.audit_status === '0' ? '待审核' : v.audit_status === '1' ? '通过' : v.audit_status === '2' ? '打回' : '报审'}}</div>
          <div class="title common01-ft40 overhidden">{{v.title}}</div>
          <div class="name common01-ft32">{{v.name}}</div>
          <div class="time common01-ft32">{{v.time}}</div>
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
        audit_status: '0',
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        name: '周卉',
        time: '10-22 14:26'
      }, {
        audit_status: '1',
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        name: '周卉',
        time: '10-22 14:26'
      }, {
        audit_status: '2',
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        name: '周卉',
        time: '10-22 14:26'
      }, {
        audit_status: '4',
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        name: '周卉',
        time: '10-22 14:26'
      }, {
        audit_status: '0',
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        name: '周卉',
        time: '10-22 14:26'
      }]
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-report {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .report-wrap {
    padding: pxrem(250px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(90px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .status {
          width: pxrem(120px);
          height: pxrem(50px);
          line-height: pxrem(50px);
          border-radius: pxrem(2px);
          &.one {
            background-color: #0466FF;
          }
          &.two {
            background-color: #39C78D;
          }
          &.three {
            background-color: #EA4A68;
          }
          &.four {
            background-color: #FF9A02;
          }
        }
        .title {
          text-align: left;
          width: 60%;
          margin: 0 pxrem(175px) 0 pxrem(37px);
        }
        .time {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
