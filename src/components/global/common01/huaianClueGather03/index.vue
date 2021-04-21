<template>
  <div class="common01-cluegather-other">
    <div class="cluegather-wrap common01-border">
      <div class="wrap-content">
        <div class="list-sort">
            <img class="imgHeight" :src='require("./assets/weibo.png")'  alt="">
        </div>
        <div class="item-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title, 'marginBottom75': customSize}" :style="{'animation-delay' : k/2+'s'}">
          <div v-if="k == 0" class="common01-ft32 idx1">{{k+1}}</div>
          <div v-else-if="k == 1" class="common01-ft32 idx2">{{k+1}}</div>
          <div v-else-if="k == 2" class="common01-ft32 idx3">{{k+1}}</div>
          <div v-else class="common01-ft32 idx4">{{k+1}}</div>
          <div class="title common01-ft40 overhidden" :style="setFontSize(50)">{{v.title}}</div>
          <div class="source common01-ft32" :style="setFontSize(45)">{{v.source}}</div>
          <div class="time common01-ft32">{{v.date | dateFormat(5, 16)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHotsList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'huaianClueGather03',
  data () {
    return {
      activeIdx: 0,
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      dataList: [],
      dataList02: [],
      dataList03: [],
      customSize: false,
      source: []
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getHotsList('weiBo')
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getHotsList (type) {
      getHotsList(type, 1, 5, this.source).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data
            }, 100)
            if (this.isPaging) {
              this.page += 1
              if (this.page > this.maxPage) {
                this.page = 1
              }
            }
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-cluegather-other {
  width: 100%;
  height: 100%;
  padding: 0 pxrem(40px) pxrem(40px);
  .cluegather-wrap {
    padding: pxrem(110px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    background: url(./assets/ClueGather03.png) no-repeat center;
    background-size: 100% 100%;
    .wrap-content {
      .marginBottom75 {
        margin-bottom: pxrem(75px)!important;
      }
      .list-sort{
        text-align: center;
        img{
          width: 25%;
        }
        .imgHeight{
          height: pxrem(94px);
        }
      }
      .item-list {
        overflow: hidden;
        margin: pxrem(90px) 0;
        &:last-of-type {
          margin-bottom: pxrem(170px);
        }
        .title {
          width: 60%;
          text-align: left;
          flex: 1;
          margin-left: pxrem(20px);
          font-size: 0.4rem !important;
        }
        .source{
          font-size: 0.32rem !important;
          opacity: 0.8;
          flex: .3;
        }
        .time{
          font-size: 0.32rem !important;
          opacity: 0.8;
        }
        .idx1{
            width:pxrem(56px);
            height:pxrem(56px);
            line-height: pxrem(56px);
            text-align: center;
            background:rgba(238,79,79,1);
            border-radius:pxrem(5px);
        }
        .idx2{
            width:pxrem(56px);
            height:pxrem(56px);
            background:rgba(230,124,39,1);
            border-radius:pxrem(5px);
        }
        .idx3{
            width:pxrem(56px);
            height:pxrem(56px);
            background:rgba(173,79,238,1);
            border-radius:pxrem(5px);
        }
        .idx4{
            width:pxrem(56px);
            height:pxrem(56px);
            background:rgba(4,102,255,1);
            border-radius:pxrem(5px);
        }
        .read {
          img {
            width: pxrem(30px);
            height: pxrem(30px);
            margin-right: pxrem(18px);
          }
        }
      }
    }
  }
}
</style>
