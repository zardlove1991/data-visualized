<template>
    <div class="wz-wrap" id="wzOperationData">
      <div class="content">
        <div class="main-title">运营数据</div>
        <div class="main-wrap">
            <div class="section1 hg-flex flex-justify-between">
                <div class="section1-item app flex">
                    <div class="item-left">
                        <img src="./assets/icon-app.png" class="item-img">
                    </div>
                    <div class="item-right flex sys-vertical flex-justify-between">
                        <div class="app">APP安装量：<span class="num">{{app_install_amount}}</span></div>
                        <div class="app">APP用户量：<span class="num">{{app_user_amount}}</span></div>
                    </div>
                </div>
                <div class="section1-item  flex">
                    <div class="item-left">
                        <img src="./assets/icon-web.png" class="item-img">
                    </div>
                    <div class="item-right flex sys-vertical flex-justify-between">
                        <div class="web">网站访问量：<span class="num">{{web_click_amount}}</span></div>
                        <div class="web">网站用户量：<span class="num">{{web_user_amount}}</span></div>
                    </div>
                </div>
            </div>
            <div class="section2 flex flex-justify-between">
                <div class="section2-item" v-for="(item,index) in channelList" :key="index">
                  <div class="item-top flex">
                    <div class="channel-ava">
                      <img :src="item.snap" class="channel-img">
                    </div>
                    <div class="channel-info">
                      <div class="name">{{item.name}}</div>
                      <!-- <div class="num flex sys-flex-center"><span class="icon-news"></span>{{item.num}}</div> -->
                    </div>
                  </div>
                  <div class="item-bottom flex sys-vertical flex-justify-between">                     
                    <div class="item">微信粉丝数：<span class="num">{{item.fans_amount}}</span></div>
                    <div class="item">微信阅读量：<span class="num">{{item.read_amount}}</span></div>
                  </div>      
                </div>      
            </div>
        </div>

      </div>    
    </div>
</template>
<script>
import { getImageUrl } from '@/utils/utils'
import { getOperationData } from '@/servers/interface'
export default {
  name: 'operationData',
  data () {
    return {
      app_install_amount: 0,
      app_user_amount: 0,
      web_click_amount: 0,
      web_user_amount: 0,
      channelList: []
    }
  },
  created () {
    this.getData()
    // setInterval(() => {
    //   this.getDataList()
    // }, 5000)
  },
  mounted () {
    this.setFontsize('wzOperationData')
  },
  methods: {
    getData () {
      getOperationData().then(res => {
        if (!res.data.error_code) {
          if (Object.keys(res.data.result).length) {
            let result = res.data.result
            this.app_install_amount = result.app_install_amount
            this.app_user_amount = result.app_user_amount
            this.web_click_amount = result.web_click_amount
            this.web_user_amount = result.web_user_amount
            this.channelList = result.wechat.map((item) => {
              item.snap = getImageUrl(item.snap)
              return item
            })
          }
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.wz-wrap{
    width: 100%;
    height:100%;
    padding: 1%;
    .content{
        width: 100%;
        height:100%;
        padding: 1.5%;
        background: url("./assets/main-bg.png") no-repeat;
        background-size: 100% 100%;
        .main-title{
            font-size: pxrem(58px);
            font-weight: 500;
            color: #ffffff;
            text-align: left;
        }
        .main-wrap{
            width: 100%;
            margin-top: pxrem(100px);
            .section1-item{
                width: 48%;
                height:pxrem(226px);
                background: rgba(4,132,250,0.06);
                padding: pxrem(26px);
                .item-left{
                  width: pxrem(168px);
                  height: pxrem(168px);
                  img{
                    width: 100%;
                    height: 100%;
                  }
                }
                .item-right{
                  color:#ffffff;
                  font-size: pxrem(30px);
                  margin-left: pxrem(60px);
                  .num{
                    font-size: pxrem(46px);
                    color: #FF6600;
                    font-weight: 600;
                  }
                  .web .num{
                    color: #E2B70B;
                  }
                }
            }
            .section2{
                width: 100%;
                height:pxrem(430px);
                background: rgba(4,132,250,0.06);
                margin-top: pxrem(58px);
                padding: pxrem(60px);
                .section2-item{
                  width: 28%;
                  border-right: 1px solid #0484fa;
                  padding-right: pxrem(80px);
                  &:last-child{
                    border:none;
                  }
                }
                .channel-ava{
                  width: pxrem(88px);
                  height: pxrem(88px);
                  margin-right:pxrem(32px);
                  .channel-img{
                    width: 100%;
                    height: 100%;
                    border-radius: 12px;
                  }
                }
                .channel-info{
                  color: #ffffff;
                  font-size: pxrem(36px);
                  .num{
                    color:#00A2FF;
                    font-size: pxrem(30px);
                    margin-top: pxrem(10px);
                    .icon-news{
                      width:pxrem(24px);
                      height:pxrem(26px);
                      margin-right:pxrem(15px);
                      display:inline-block;
                      background: url("./assets/icon-news.png") no-repeat;
                    }
                  }
                }
                .item-bottom{
                  margin-top: pxrem(80px);
                  text-align: left;
                  .item{
                    color: #ffffff;
                    font-size: pxrem(30px);
                    .num{
                      color: #01FEB6;
                      font-size: pxrem(46px);
                      font-weight: 600;
                      text-align: left;
                    }
                  }
                }

            }
        }
    }


}
</style>
