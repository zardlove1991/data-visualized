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
    .wrap-content {
      text-align:left;
      .item-list {
        margin-bottom: pxrem(20px);
        padding:pxrem(30px) pxrem(26px);
        width:24%;
        display:inline-block;
        background: url("./assets/itemBg.png") no-repeat center;
        background-size: 100% 100%;
        margin-right:1%;
        background-color:rgba(0,96,255,0.2);
        .item-img{
          width: pxrem(135px);
          height: pxrem(170px);
          background: #1181e9;
          border-radius: 3px;
          overflow: hidden;
          float: left;
          margin-right: pxrem(30px);
          img{
            width:100%;
          }
        }
        .item-info{
          .item-title {
            text-align: left;
            font-size:pxrem(38px);
            line-height:pxrem(50px);
            margin-bottom:pxrem(36px);
            height:pxrem(90px);
            overflow:hidden;
          }
          .item-time{
            font-size:pxrem(32px);
            color:#00f6ff;
          }
        }
      }
    }
  }
}
</style>
