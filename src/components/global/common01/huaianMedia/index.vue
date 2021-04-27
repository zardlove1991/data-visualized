<template>
  <div class="common01-report">
    <div class="report-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '媒体矩阵'}}</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="imgBox">
            <img :src="v.index_pic+'?imageView/0/w/240/h/240'" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHuaianPlusList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'huaianMedia',
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      dataList: [],
      customSize: false,
      offset: 0,
      column_id: 280
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getHuaianPlusList()
  },
  mounted () {
    setInterval(() => {
      this.getHuaianPlusList()
    }, this.frequency)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getHuaianPlusList () {
      getHuaianPlusList(this.column_id, this.page, 9, this.offset).then((res) => {
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
          this.offset += res.data.length
        } else {
          if (this.page !== 1) {
            this.offset = 0
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
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-report {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .common01-title{
    font-size: pxrem(60px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 1px;
    text-shadow: pxrem(16px) pxrem(20px) pxrem(20px) rgba(0,222,255,0.20); 
  }
  .report-wrap {
    background: url(./assets/huaianAreaBg.png) no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(330px) 0 pxrem(95px) 0;
    color: #fff;
    .wrap-content {
      width: pxrem(1538px);
      height: pxrem(514px);
      margin: 0 auto;
      background: url(./assets/conBg.png) no-repeat left center;
      background-size: contain;
      position: relative;
      .item-list {
        height: pxrem(90px);
        padding: pxrem(10px) 0 pxrem(10px) pxrem(22px);
        background: url(./assets/itemBg.png) no-repeat left center;
        background-size: contain;
        margin-bottom: pxrem(56px)!important;
        &:first-child{
          position: absolute;
          top:pxrem(-175px);
          left:pxrem(605px);
          width: pxrem(318px);
          height: pxrem(318px);
          padding: 0;
          .imgBox{
            width: pxrem(180px);
            height: pxrem(180px);
            border-radius: 50%;
            overflow: hidden;
            margin: pxrem(70px);
            img{
              width: 118%;
              margin: pxrem(-10px) 0 0 pxrem(-10px);
            }
          }
        }
        &:nth-of-type(2){
          position: absolute;
          top:pxrem(24px);
          left:pxrem(104px);
          width: pxrem(190px);
          height: pxrem(190px);
          padding: 0;
          .imgBox{
            width: pxrem(100px);
            height: pxrem(100px);
            border-radius: 50%;
            overflow: hidden;
            margin: pxrem(50px) auto;
            img{
              width: 124%;
              margin: pxrem(-14px) 0 0 pxrem(-10px);
            }
          }
        }
        &:nth-of-type(3){
          position: absolute;
          top:pxrem(138px);
          left:pxrem(345px);
          width: pxrem(230px);
          height: pxrem(230px);
          padding: 0;
          .imgBox{
            width: pxrem(120px);
            height: pxrem(120px);
            border-radius: 50%;
            overflow: hidden;
            margin: pxrem(50px) auto;
            img{
              width: 118%;
              margin: pxrem(-10px) 0 0 pxrem(-10px);
            }
          }
        }
        &:nth-of-type(4){
          position: absolute;
          top:pxrem(138px);
          right:pxrem(345px);
          width: pxrem(230px);
          height: pxrem(230px);
          padding: 0;
          .imgBox{
            width: pxrem(120px);
            height: pxrem(120px);
            border-radius: 50%;
            overflow: hidden;
            margin: pxrem(50px) auto;
            img{
              width: 118%;
              margin: pxrem(-10px) 0 0 pxrem(-10px);
            }
          }
        }
        &:nth-of-type(5){
          position: absolute;
          top:pxrem(24px);
          right:pxrem(124px);
          width: pxrem(190px);
          height: pxrem(190px);
          padding: 0;
          .imgBox{
            width: pxrem(100px);
            height: pxrem(100px);
            border-radius: 50%;
            overflow: hidden;
            margin: pxrem(50px) auto;
            img{
              width: 124%;
              margin: pxrem(-14px) 0 0 pxrem(-10px);
            }
          }
        }
        &:nth-of-type(6){
          position: absolute;
          top:pxrem(173px);
          left:pxrem(-93px);
          width: pxrem(180px);
          height: pxrem(180px);
          padding: 0;
          .imgBox{
            width: pxrem(90px);
            height: pxrem(90px);
            border-radius: 50%;
            overflow: hidden;
            margin: pxrem(30px) auto;
            img{
              width: 118%;
              margin: pxrem(-10px) 0 0 pxrem(-10px);
            }
          }
        }
        &:nth-of-type(7){
          position: absolute;
          bottom:pxrem(-45px);
          left:pxrem(160px);
          width: pxrem(200px);
          height: pxrem(200px);
          padding: 0;
          .imgBox{
            width: pxrem(100px);
            height: pxrem(100px);
            border-radius: 50%;
            overflow: hidden;
            margin: pxrem(30px) auto;
            img{
              width: 130%;
              margin: pxrem(-10px) 0 0 pxrem(-14px);
            }
          }
        }
        &:nth-of-type(8){
          position: absolute;
          bottom:pxrem(-45px);
          right:pxrem(160px);
          width: pxrem(200px);
          height: pxrem(200px);
          padding: 0;
          .imgBox{
            width: pxrem(100px);
            height: pxrem(100px);
            border-radius: 50%;
            overflow: hidden;
            margin: pxrem(30px) auto;
            img{
              width: 130%;
              margin: pxrem(-10px) 0 0 pxrem(-14px);
            }
          }
        }
        &:last-child{
          position: absolute;
          top:pxrem(173px);
          right:pxrem(-40px);
          width: pxrem(180px);
          height: pxrem(180px);
          padding: 0;
          .imgBox{
            width: pxrem(90px);
            height: pxrem(90px);
            border-radius: 50%;
            overflow: hidden;
            margin: pxrem(30px) auto;
            img{
              width: 130%;
              margin: pxrem(-10px) 0 0 pxrem(-14px);
            }
          }
        }
      }
    }
  }
}
</style>
