<template>
  <div class="common01-newarticle">
    <div class="newarticle-wrap common01-border">
      <div class="common01-title">最新稿件</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="title common01-ft40 overhidden">{{v.title}}</div>
          <div class="source common01-ft32">{{v.source}}</div>
          <div class="time common01-ft32">{{v.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'newArticle',
  data () {
    return {
      dataList: [{
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        source: '人民网',
        time: '10-22 14:26'
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        source: '人民网',
        time: '10-22 14:26'
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        source: '人民网',
        time: '10-22 14:26'
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        source: '人民网',
        time: '10-22 14:26'
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        source: '人民网',
        time: '10-22 14:26'
      }]
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
.common01-newarticle {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .newarticle-wrap {
    padding: pxrem(250px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(90px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          text-align: left;
          width: 72%;
        }
        .source {
          margin: 0 pxrem(98px) 0 auto;
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
