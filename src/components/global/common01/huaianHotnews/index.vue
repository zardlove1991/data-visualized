<template>
  <div class="common01-report">
    <div class="report-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '全网热点'}}</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="title common01-ft40 overhidden" :style="setFontSize(50)">{{v.title}}</div>
          <div class="name common01-ft32 overhidden" :style="setFontSize(45)">{{v.class_name}}</div>
          <div class="time common01-ft32" :style="setFontSize(45)">{{v.create_time.substr(5,11)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHotsTopicList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'huaianHotnews',
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      dataList: [],
      customSize: false
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getHotsTopicList()
  },
  mounted () {
    setInterval(() => {
      this.getHotsTopicList()
    }, this.frequency)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getHotsTopicList () {
      getHotsTopicList(5, this.page, this.currentViewId).then((res) => {
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
          } else {
            if (this.page !== 1) {
              this.page = 1
              this.getHotsTopicList()
            }
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
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    .wrap-content {
      .item-list {
        height: pxrem(90px);
        padding: pxrem(10px) 0 pxrem(10px) pxrem(22px);
        background: url(./assets/itemBg.png) no-repeat left center;
        background-size: contain;
        margin-bottom: pxrem(56px)!important;
        &:last-of-type {
          margin-bottom: 0;
        }
        .status {
          width: pxrem(120px);
          height: pxrem(52px);
          line-height: pxrem(52px);
          border-radius: pxrem(2px);
          font-size: 0.3rem !important;
          margin-left: pxrem(20px)!important;
          font-weight: 500;
          &.one {
            background-color: #E69200;
          }
          &.two {
            background-color: #07AA7E;
          }
          &.three {
            background-color: #D74E4E;
          }
          &.four {
            background-color: #FF9A02;
          }
        }
        .title {
          text-align: left;
          width: 70%;
          margin: 0 0 0 pxrem(30px);
          font-size: 0.4rem !important;
          font-weight: 500;
        }
        .name {
          width: 9%;
          text-align: left;
          font-size: 0.32rem !important;
          color: #00f6ff;
        }
        .time {
          margin-left: auto;
          font-size: 0.32rem !important;
          color: #00f6ff;
        }
      }
    }
  }
}
</style>
