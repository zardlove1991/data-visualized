<template>
  <div class="jn-practice">
    <div class="practice-wrap">
      <div class="wrap-title">思想与实践</div>
      <div class="wrap-content">
        <div class="content-img sys-flex flex-justify-between">
          <div class="img-left">
            <img src="http://img4.imgtn.bdimg.com/it/u=3648707932,2530958242&fm=26&gp=0.jpg" />
          </div>
          <div class="img-right">
            <div class="right-one">
              <img src="http://img4.imgtn.bdimg.com/it/u=3648707932,2530958242&fm=26&gp=0.jpg" />
            </div>
            <div class="right-two">
              <img src="http://img4.imgtn.bdimg.com/it/u=3648707932,2530958242&fm=26&gp=0.jpg" />
            </div>
          </div>
        </div>
        <div class="content-scroll">
          <div class="scroll-list sys-flex sys-flex-center">
            <div class="list-top">置顶</div>
            <div class="list-title overhidden">中国稳投资多管齐下 专项债等新政给投资添活力</div>
            <div class="list-time">05-25  13:51</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ideologicalPractice',
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-practice {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .practice-wrap {
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
      .content-img {
        margin: pxrem(80px) 0 pxrem(63px);
        .img-left {
          width: pxrem(860px);
          height: pxrem(613px);
        }
        .img-right {
          div {
            width: pxrem(885px);
            height: pxrem(285px);
          }
          .right-one {
            margin-bottom: pxrem(44px);
          }
        }
      }
      .content-scroll {
        width: 100%;
        height: pxrem(140px);
        background-color: #0B295E;
        .scroll-list {
          padding: pxrem(50px) pxrem(40px);
          .list-top {
            width: pxrem(110px);
            height: pxrem(52px);
            background-color: #DE4646;
            border-radius: pxrem(5px);
            font-size: pxrem(30px);
            margin-right: pxrem(30px);
          }
          .list-title {
            font-size: pxrem(40px);
          }
          .list-time {
            margin-left: auto;
            font-size: pxrem(36px);
          }
        }
      }
    }
  }
}
</style>