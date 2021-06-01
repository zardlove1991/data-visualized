<template>
    <div class="wz-wrap" id="wzContentDistribute">
      <div class="content">
        <div class="main-title">内容策划</div>
        <div class="main-wrap">
          <div class="main-num1 flex sys-flex-center flex-justify-between">
            <div class="num-item hg-flex">今日选题<span class="num">{{amount}}</span></div>
            <div class="num-item hg-flex">今日完成<span class="num">{{finish_amount}}</span></div>
            <div class="num-item hg-flex">累计选题<span class="num">{{topic_today_amount}}</span></div>
            <div class="num-item hg-flex">累计完成<span class="num">{{topic_today_finish_amount}}</span></div>
          </div>
          <div class="list-wrap flex flex-justify-between">
            <div class="list">
              <common-list  :list="dataList1" :showNum="true" :showPublisher="1"></common-list>
            </div>
            <div class="list list-project">
              <common-list  :list="dataList2"  :showPublisher="2">
                <template v-slot:progress="progressFlag">
                  <div  class="list-progress flex flex-justify-between sys-flex-center" :class="'list-progress'+progressFlag.item.status">
                    <div class="progress-text">{{progressFlag.item.status_show}}</div>
                    <div class="progress-bar">
                      <div class="progress-status" :style="'width:'+progressFlag.item.percent+'%'"></div>
                    </div>
                    <div class="progress-percent">{{Math.ceil(progressFlag.item.percent)}}%</div>
                  </div>
                </template>
              </common-list>
            </div>
            <div class="list list-report">
              <common-list  :list="dataList3"  :showPublisher="3" :showTime="true">
                <template v-slot:status="statusFlag">
                  <div  class="list-status" :class="'list-status'+statusFlag.item.audit_status"></div>
                </template>
              </common-list>
            </div>
            <div class="list  list-task">
              <common-list  :list="dataList4" :showNum="true"  :showPublisher="4" :showTime="true"></common-list>
            </div>
          </div>       
        </div>
      </div> 
        
    </div>
</template>
<script>
import commonList from '../list'
import { getContentPlan, getWorkCallSubjectList, getWorkCallReportList, getWorkCallTaskList, getCloudNewsList } from '@/servers/interface'
export default {
  name: 'contentPlot',
  data () {
    return {
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      count: 5,
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      frequency: 10000,
      maxPage: 10,
      amount: 0,
      finish_amount: 0,
      topic_today_amount: 0,
      topic_today_finish_amount: 0
    }
  },
  created () {
    this.getDataList()
    this.getNum()
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  mounted () {
    this.setFontsize('wzContentDistribute')
    // document.documentElement.style.fontSize = document.documentElement.clientWidth / 1920 * 100 + 'px'
  },
  methods: {
    getNum () {
      getContentPlan().then((res) => {
        if (!res.data.error_code) {
          if (Object.keys(res.data.result).length) {
            let result = res.data.result
            this.amount = result.amount.amount
            this.finish_amount = result.finish_amount.amount
            this.topic_today_amount = result.topic_today_amount.amount
            this.topic_today_finish_amount = result.topic_today_finish_amount.amount
          }
        }
      })
    },
    getDataList () {
      // 热点
      getCloudNewsList(this.page1, this.count, this.currentViewId).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList1 = []
            setTimeout(() => {
              this.dataList1 = res.data.result.data
            }, 100)
            this.page1 += 1
            if (this.page1 > this.maxPage) {
              this.page1 = 1
            }
          } else {
            if (this.page1 !== 1) {
              this.page1 = 1
              // this.getDataList()
            }
          }
        }
      })
      // 选题
      getWorkCallSubjectList(this.count, this.page2, this.currentViewId).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList2 = []
            setTimeout(() => {
              this.dataList2 = res.data.result.data
            }, 100)
            this.page2 += 1
            if (this.page2 > this.maxPage) {
              this.page2 = 1
            }
          } else {
            if (this.page2 !== 1) {
              this.page2 = 1
              // this.getDataList()
            }
          }
        }
      })
      // 报题
      getWorkCallReportList(this.count, this.page3, this.currentViewId).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList3 = []
            setTimeout(() => {
              this.dataList3 = res.data.result.data
            }, 100)
            this.page3 += 1
            if (this.page3 > this.maxPage) {
              this.page3 = 1
            }
          } else {
            if (this.page3 !== 1) {
              this.page3 = 1
              // this.getDataList()
            }
          }
        }
      })
      // 任务
      getWorkCallTaskList(this.count, this.page4, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList4 = []
            setTimeout(() => {
              this.dataList4 = res.data.result.data
            }, 100)
            this.page4 += 1
            if (this.page > this.maxPage) {
              this.page4 = 1
            }
          } else {
            if (this.page4 !== 1) {
              this.page4 = 1
              // this.getDataList()
            }
          }
        }
      })
    }
  },
  components: {
    'common-list': commonList
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
$color: #15FEF5;
.wz-wrap{
    // width: pxrem(1920px);
    // height: pxrem(1080px);
    // padding: pxrem(33px);
    width: 100%;
    height:100%;
    padding: 1.5vh 1.5vw;
    .content{
      // width: pxrem(1840px);
      // height: pxrem(1000px);
      // padding: pxrem(54px) pxrem(100px) pxrem(56px) pxrem(71px);
      width: 100%;
      height: 100%;
      padding: 5vh 4vw;
      background: url("./assets/main-bg.png") no-repeat;
      background-size: 100% 100%;
      .main-title{
          font-size: pxrem(29px);
          font-weight: 500;
          color: #ffffff;
          text-align: left;
      }
      .main-wrap{
          width: 100%;
          height: 90%;
          margin-top: pxrem(25px);
          .main-num1{
            .num-item{
                // width: pxrem(740px);
                // height: pxrem(65px);
                width: 24%;
                height: pxrem(80px);
                color: #ffffff;
                font-size: pxrem(19px);
                background: url('./assets/top-bg.png') no-repeat;
                background-size: 100% 100%;
                .num{
                  font-size: pxrem(32px);
                  font-weight: 700;
                  color: $color;
                  margin-left: pxrem(30px);
                }
              }
          }
          
          .list-wrap{
             margin-top: pxrem(42px);
             height: 85%; 
             flex-wrap: wrap;
             .list{
               width: 49%;
               height: pxrem(360px);
               margin-bottom: pxrem(30px);
               padding: pxrem(49px) pxrem(30px) 0;
               background: url('./assets/title-hot.png') no-repeat;
               background-size: 100%;
               &.list-project{
                  background: url('./assets/title-project.png') no-repeat;
                  background-size: 100%;
               }
                &.list-report{
                  background: url('./assets/title-report.png') no-repeat;
                  background-size: 100%;
                }
                &.list-task{
                   background: url('./assets/title-task.png') no-repeat;
                   background-size: 100%;
                }
                /deep/ .list-item{
                  font-size: pxrem(16px);
                  .title{
                    font-size: pxrem(20px);
                  }
                  .click-num{
                    background-size: pxrem(21px)  pxrem(15px);
                    padding-left: pxrem(31px);
                    margin-left: pxrem(25px);
                  }
                }
                .list-status{
                  width: pxrem(60px);
                  height: pxrem(25px); 
                  margin-right: pxrem(20px); 
                  &.list-status0{
                    background: url('./assets/tag-wait.png') no-repeat;
                    background-size: 100% 100%;
                  }
                  &.list-status2{
                    background: url('./assets/tag-refuse.png') no-repeat;
                    background-size: 100% 100%;
                  }
                  &.list-status1{
                    background: url('./assets/tag-pass.png') no-repeat;
                    background-size: 100% 100%;
                  }
                }
                .list-progress{
                   width: 30%;
                   color: #0FBFFA;
                   .progress-bar{
                      width: pxrem(110px);
                      height: pxrem(8px);
                      background: #2B3A57;
                      border-radius: pxrem(4px);
                      .progress-status{
                        height: 100%;
                        border-radius: pxrem(4px);
                        background: linear-gradient(#035af9 0%, #4dd2f2 100%);
                     }
                   }
                   &.list-progress1{
                     color: #0FBFFA;
                     .progress-status{
                       background: linear-gradient(#035af9 0%, #4dd2f2 100%);
                     }                
                   }
                   &.list-progress3{
                     color:#30D18B;
                      .progress-status{
                       background: linear-gradient(#18dd7b 0%, #34f5c7 100%);
                     } 
                   }
                   &.list-progress4{
                     color:#F45557;
                     .progress-status{
                      background: linear-gradient(#ed3537 0%, #f55b5c 100%);
                     } 
                   }

                }
             }
          }
          
      }
    }

}

</style>
