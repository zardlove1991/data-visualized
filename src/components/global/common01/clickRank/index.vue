<template>
  <div class="common01-clickrank">
    <div class="clickrank-wrap common01-border">
      <div class="common01-title">点击量排行</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="index"></div>
          <div class="title common01-ft40 overhidden">{{v.title}}</div>
          <div class="read common01-ft32 sys-flex sys-flex-center">
            <img src="../../../../assets/common/read.png" />
            <span>{{v.read}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'clickRank',
  data () {
    return {
      dataList: [{
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        read: 36045
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        read: 36045
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        read: 36045
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        read: 36045
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        read: 36045
      }]
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
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
.common01-border {
  width: 100%;
  height: 100%;
  background: url("../../../../assets/common/common01Border.png") no-repeat center;
  background-size: 100% 100%;
  position: relative;
}
.common01-title {
  font-size: pxrem(58px);
  font-weight: 500;
  text-shadow: 0 pxrem(16px) pxrem(16px) rgba(0, 222, 255, 0.2);
  position: absolute;
  top: pxrem(54px);
  left: pxrem(72px);
}
.common01-ft40 {
  font-size: pxrem(40px);
}
.common01-ft32 {
  font-size: pxrem(32px);
}
.common01-ft30 {
  font-size: pxrem(30px);
}
</style>
