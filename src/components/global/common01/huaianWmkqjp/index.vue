<template>
  <div class="huaian-common01-wechat" id="huaian-common01-wechat">
    <div class="wechat-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '外媒看清江浦'}}</div>
      <div class="wrap-content">
        <div class="item-list animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="item-img">
            <img :src="v.index_pic+'?imageView/0/w/270/h/170'" />
          </div>
          <div class="item-info">
            <div class="item-title">{{v.title}}</div>
            <div class="item-tips sys-flex sys-flex-center">
              <div class="item-time">{{v.publish_time_stamp | dateFormat}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHuaianPlusList } from '@/servers/interface'
export default {
  name: 'huaianWmkqjp',
  data () {
    return {
      frequency: 15000,
      count: 0,
      dataList: [],
      column_id: 279,
      page: 1,
      isPaging: true,
      maxPage: 3
    }
  },
  created () {
    this.getHuaianPlusList()
    setInterval(() => {
      this.getHuaianPlusList()
    }, this.frequency)
  },
  mounted () {
    this.setFontsize('huaian-common01-wechat')
    document.querySelector('html').style.fontSize = '100px'
  },
  methods: {
    getHuaianPlusList () {
      getHuaianPlusList(this.column_id, this.page, 12).then(res => {
        if (res.data.length) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = res.data
          }, 100)
          if (this.isPaging) {
            this.page += 1
            if (this.page > this.maxPage) {
              this.page = 1
            }
          }
        } else {
          if (this.page !== 1) {
            this.page = 1
            this.getHuaianPlusList()
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
@import '../style/index.scss';
.huaian-common01-wechat {
  background: url(./assets/bg.png) no-repeat center;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .wechat-wrap {
    padding: pxrem(190px) pxrem(40px) pxrem(95px) pxrem(78px);
    background: url("./assets/huaianAreaBg.png") no-repeat center;
    background-size: 100% 100%;
    color: #fff;
    .common01-title{
      font-size: pxrem(60px);
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 1px;
      text-shadow: pxrem(16px) pxrem(20px) pxrem(20px) rgba(0,222,255,0.20); 
      transform: scaleX(0.5);
      left:0;
    }
    .wrap-content {
      text-align:left;
      .item-list {
        height: pxrem(230px);
        margin-bottom: pxrem(20px);
        padding:pxrem(30px) pxrem(26px);
        width:24%;
        display:inline-block;
        background: url("./assets/itemBg.png") no-repeat center;
        background-size: 100% 100%;
        margin-right:1%;
        background-color:rgba(0,96,255,0.2);
        // display: inline-flex;
        position: relative;
        .item-img{
          position: absolute;
          left: pxrem(-40px);
          top: pxrem(30px);
          // float: left;
          // flex: 1;
          width: pxrem(270px);
          // width: 17%;
          transform: scaleX(0.5);
          height: pxrem(170px);
          background: #1181e9;
          border-radius: 3px;
          overflow: hidden;
          margin-right: pxrem(15px);
          // margin-right: 1.5%;
          img{
            width:100%;
          }
        }
        .item-info{
          position: absolute;
          right: pxrem(-80px);
          top: pxrem(30px);
          // float: left;
          // flex: 2;
          width: pxrem(410px);
          // width: 30%;
          transform: scaleX(0.5);
          .item-title {
            text-align: left;
            font-size:pxrem(50px);
            line-height:pxrem(60px);
            margin-bottom:pxrem(20px);
            height:pxrem(110px);
            overflow:hidden;
          }
          .item-time{
            font-size:pxrem(40px);
            color:#00f6ff;
          }
        }
      }
    }
  }
}
</style>
