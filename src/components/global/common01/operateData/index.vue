<template>
  <div class="common-operatedata01">
    <div class="cluegather-wrap common01-border">
      <div class="common01-title">线索汇聚</div>
      <div class="wrap-content">
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'clueGather',
  data () {
    return {
      dataList: [{
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        source: '科技',
        read: 123456
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        source: '科技',
        read: 123456
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        source: '科技',
        read: 123456
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        source: '科技',
        read: 123456
      }, {
        title: '深度解析蹴鞠在中国历史上的发展：生于战国，盛于唐宋，亡于明清',
        source: '科技',
        read: 123456
      }]
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/global/index.scss';
.common-cluegather {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .cluegather-wrap {
    padding: pxrem(250px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(90px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          width: 70%;
          text-align: left;
        }
        .read {
          img {
            width: pxrem(42px);
            height: pxrem(30px);
            margin-right: pxrem(18px);
          }
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
</style>