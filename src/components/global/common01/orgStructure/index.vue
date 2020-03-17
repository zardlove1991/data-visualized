<template>
  <div class="common-orgStructure ">
    <div class="orgStructure-page common01-border">
      <div class="common01-title">{{viewAttr.header || '组织架构'}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orgStructure',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common-orgStructure{
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .orgStructure-page{
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    .list-item{
      margin-bottom: pxrem(110px);
      align-items:center;
    }
    .type-area{
      color:#0AFBF2;
      span {
        color: #0afbf2;
      }
      img {
        width: 1.07rem;
        height: 0.48rem;
        margin: 0 0.225rem;
      }
    }
    .list-title{
      color:#fff;
      font-size:0.38rem;
      margin-right:1.12rem;
      text-align:left;
    }
    .list-text {
      width: 40%;
      text-align: left;
    }
    .list-time {
      .img-icon {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
    .list-read {
      margin: 0 0.8rem 0 0.65rem;
      font-size:0.32rem;
      .img-icon {
        width: 0.42rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
  }
  .activityInfo-detail {
    padding: pxrem(100px) pxrem(72px) pxrem(10px);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .detail-title {
      .back {
        width: pxrem(44px);
        height: pxrem(44px);
        margin-right: pxrem(40px);
      }
      .title {
        font-weight: bold;
      }
    }
    .detail-list {
      color: #05D9FF;
      border-bottom: pxrem(2px) dashed #00EAFF;
      padding: pxrem(40px) pxrem(20px) pxrem(35px) pxrem(80px);
      .source {
        width: 30%;
        text-align: left;
        margin-right: pxrem(15px);
      }
      .author {
        width: 17%;
        text-align: left;
        margin-right: pxrem(15px);
      }
      .read {
        margin-left: auto;
        img {
          width: pxrem(42px);
          height: pxrem(30px);
          margin-right: pxrem(10px);
        }
      }
      .comment {
        margin-left: pxrem(50px);
        img {
          width: pxrem(34px);
          height: pxrem(31px);
          margin-right: pxrem(10px);
        }
      }
    }
    .detail-content {
      width: 100%;
      height: 6.2rem;
      overflow: hidden;
      margin-top: pxrem(40px);
      &>div {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
      }
      .pic {
        img {
          margin-bottom: pxrem(20px);
        }
      }
      .video {
        .vjs-custom-skin {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }
}

</style>
