<template>
  <div class="common01-report">
    <div class="report-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '盐城市微信排行榜'}}</div>
      <div class="wrap-content sys-flex sys-flex-wrap">
          <div class="list-item sys-flex sys-flex-center flex-justify-between animated" :class="{'mr70': k % 2 == 0, 'flipInX' : item.name}" v-for="(item,k) in list" :key="k" :style="{'animation-delay' : k/2+'s'}">
              <div class="rank-text">{{k+1}}</div>
              <img class="avatar" src="" alt="">
              <div class="title">{{item.name}}</div>
              <div class="num-box">
                  {{item.num}}<span>条</span>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { getWorkCallReportList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'wechatrank',
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      dataList: [],
      customSize: false,
      list: [{name: '黄海发布', num: 96}, {name: '城南财政', num: 84}, {name: '盐城教育发布', num: 77}, {name: '平安盐南', num: 73}, {name: '城南清风', num: 65}, {name: '城南高新区河长办', num: 60}, {name: '青春盐南', num: 53}, {name: '城南社保', num: 50}]
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    // this.getWorkCallReportList()
    // setInterval(() => {
    //   this.getWorkCallReportList()
    // }, this.frequency)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    }
    // getWorkCallReportList () {
    //   getWorkCallReportList(5, this.page, this.currentViewId).then((res) => {
    //     if (!res.data.error_code) {
    //       if (res.data.result.data.length) {
    //         this.dataList = []
    //         setTimeout(() => {
    //           this.dataList = res.data.result.data
    //         }, 100)
    //         if (this.isPaging) {
    //           this.page += 1
    //           if (this.page > this.maxPage) {
    //             this.page = 1
    //           }
    //         }
    //       } else {
    //         if (this.page !== 1) {
    //           this.page = 1
    //           this.getWorkCallReportList()
    //         }
    //       }
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-report {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .report-wrap {
    padding: pxrem(200px) pxrem(84px) pxrem(40px);
    color: #fff;
    .wrap-content {
        height: 100%;
        .list-item{
            width: pxrem(800px);
            height: pxrem(140px);
            border: 1px solid red;
            margin-bottom: pxrem(40px);
            padding: pxrem(25px) pxrem(40px);
            font-size: pxrem(50px);
            &.mr70{
                margin-right: pxrem(70px);
            }
            .rank-text{
              font-size: pxrem(40px);
            }
            .avatar{
                width: pxrem(88px);
                height: pxrem(88px);
                border: 1px solid #ccc;
                margin: 0 pxrem(40px);
                border-radius: 50%;
            }
            .title{
                flex: 1;
                text-align: left;
                font-size: pxrem(40px);
            }
            .num-box{
                color: #0BFCFF;
                font-size: pxrem(60px);
                span{
                  font-size: pxrem(36px);
                }
            }
        }
    }
  }
}
</style>
