<template>
  <div class="common01-report">
    <div class="report-wrap">
        <div class="rong-box">
            <img src="./assets/image.jpeg" alt="">
        </div>
        <div class="bo-box">
            <img class="bo-logo" src="./assets/hhfb.png" alt="">
            <!-- <img class="bo2" src="./assets/bo2.png" alt=""> -->
            <p>盐城广播</p>
        </div>
        <div class="bao-box"></div>
        <div class="wang-box">
            <div class="wang-list">
                <div class="wang-list-item">
                    马化腾已经对库克动手了，网友 们表示：就看马云的了
                </div>
                <div class="wang-list-item">
                     马化腾已经对库克动手了，网友 们表示：就看马云的了
                </div>
                <div class="wang-list-item">
                     马化腾已经对库克动手了，网友 们表示：就看马云的了
                </div>
                <div class="wang-list-item">
                     马化腾已经对库克动手了，网友 们表示：就看马云的了
                </div>
            </div>
        </div>
        <div class="wei-box">
            <div class="wei-list">
                <div class="wei-list-item">
                    <img src="./assets/hhfb.png" alt="">
                    <div>
                        <p class="wei-title">黄海街道“娃娃趣说到...</p>
                        <p class="wei-tag">黄海街道</p>
                    </div>
                </div>
                  <div class="wei-list-item">
                    <img src="./assets/hhfb.png" alt="">
                    <div>
                        <p class="wei-title">黄海街道“娃娃趣说到...</p>
                        <p class="wei-tag">黄海街道</p>
                    </div>
                </div>
                <div class="wei-list-item">
                    <img src="./assets/qnzx.png" alt="">
                    <div>
                        <p class="wei-title">黄海街道“娃娃趣说到...</p>
                        <p class="wei-tag">黄海街道</p>
                    </div>
                </div>
                <div class="wei-list-item">
                    <img src="./assets/cnsb.png" alt="">
                    <div>
                        <p class="wei-title">黄海街道“娃娃趣说到...</p>
                        <p class="wei-tag">黄海街道</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="duan-box">
            <div class="duan-list">
                <div class="duan-list-item">
                    <p class="duan-title">俄媒：中国对美博弈可能“不战...</p>
                    <p class="duan-tag">青年网  06-02 13:09</p>
                </div>
                <div class="duan-list-item">
                    <p class="duan-title">俄媒：中国对美博弈可能“不战...</p>
                    <p class="duan-tag">青年网  06-02 13:09</p>
                </div>
                <div class="duan-list-item">
                    <p class="duan-title">俄媒：中国对美博弈可能“不战...</p>
                    <p class="duan-tag">青年网  06-02 13:09</p>
                </div>
                <div class="duan-list-item">
                    <p class="duan-title">俄媒：中国对美博弈可能“不战...</p>
                    <p class="duan-tag">青年网  06-02 13:09</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'yanchengGather',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-report {
  width: 100%;
  height: 100%;
  padding: pxrem(20px) pxrem(40px) pxrem(40px);
  .report-wrap{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
        .rong-box{
            width: pxrem(1230px);
            height: pxrem(1040px);
            background: url("./assets/rong.png") no-repeat;
            padding: pxrem(200px) pxrem(40px) pxrem(40px) pxrem(230px);
            img{
                width: 100%;
                height: 100%;
            }
        }
        .bo-box{
            width: pxrem(910px);
            height: pxrem(1040px);
            background: url("./assets/bo1.png") no-repeat;
            position: relative;
            .bo-logo{
                width: pxrem(150px);
                height: pxrem(150px);
                position: absolute;
                top: 30%;
                left: 52%;
            }
            .bo2{
                width: 100%;
                height: pxrem(265px);
            }
            p{
                font-size:pxrem(70px);
                font-family:PingFang SC;
                font-weight:600;
                text-align: center;
                color:rgba(255,255,255,1);
                position: absolute;
                top: 48%;
                left: 45%;
            }
        }
        .bao-box{
            width: pxrem(870px);
            height: pxrem(1040px);
            background: url("./assets/bao.png") no-repeat;
        }
        .wang-box{
            width: pxrem(970px);
            height: pxrem(1040px);
            background: url("./assets/wang.png") no-repeat;
            padding: pxrem(240px) pxrem(40px) pxrem(40px) pxrem(230px);
            .wang-list{
                width: 100%;
                height: 100%;
                .wang-list-item{
                    padding: pxrem(20px);
                    width:pxrem(660px);
                    height:pxrem(146px);
                    background:linear-gradient(180deg,rgba(26,118,255,0.24) 0%,rgba(0,110,252,0) 100%);
                    margin-bottom: pxrem(50px);
                    text-align: left;
                    font-size: pxrem(40px);
                    font-family:PingFang SC;
                    font-weight:400;
                    color:rgba(254,254,254,1);
                }
            }
        }
        .wei-box{
            width: pxrem(950px);
            height: pxrem(1040px);
            background: url("./assets/wei.png") no-repeat;
            padding: pxrem(240px) pxrem(40px) pxrem(40px) pxrem(230px);
            .wei-list-item{
                width:pxrem(660px);
                height:pxrem(146px);
                display: flex;
                flex-direction: row;
                margin-bottom: pxrem(50px);
                img{
                    width: pxrem(150px);
                    height: pxrem(150px);
                    margin-right: pxrem(20px);
                }
                .wei-title{
                    font-size:pxrem(40px);
                    font-family:PingFang SC;
                    font-weight:400;
                    text-align: left;
                    color:rgba(255,255,255,1);
                    margin-bottom: pxrem(20px);
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .wei-tag{
                    font-size: pxrem(36px);
                    font-family:PingFang SC;
                    font-weight:400;
                    color:rgba(0,198,255,1);
                    text-align: left;
                }
            }
        }
        .duan-box{
            width: pxrem(960px);
            height: pxrem(1040px);
            background: url("./assets/duan.png") no-repeat;
            padding: pxrem(240px) pxrem(40px) pxrem(40px) pxrem(230px);
            .duan-list-item{
                width:pxrem(660px);
                height:pxrem(146px);
                margin-bottom: pxrem(50px);
                border-bottom:2px dashed rgba(0,222,255,1);
                    .duan-title{
                    font-size:pxrem(40px);
                    font-family:PingFang SC;
                    font-weight:400;
                    text-align: left;
                    color:rgba(255,255,255,1);
                    margin-bottom: pxrem(20px);
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .duan-tag{
                    font-size: pxrem(36px);
                    font-family:PingFang SC;
                    font-weight:400;
                    color:rgba(0,198,255,1);
                    text-align: left;
                }
            }
        }
  }
}

</style>
