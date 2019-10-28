<template>
  <div class="ls-report" id="ls-report">
    <div class="report-wrap">
      <div class="report-list-wrap sys-flex sys-flex-wrap flex-justify-between">
        <div class="report-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v,k) in reportList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="report-status">
            <span v-if="v.audit_status==2" class="reject"></span>
            <span v-if="v.audit_status==1" class="pass"></span>
            <span v-if="v.audit_status==0" class="review"></span>
            <span v-if="v.audit_status==4" class="baoshen"></span>
          </div>
          <div class="report-title overhidden">{{v.title}}</div>
          <div class="report-user">{{v.project_user_name}}</div>
          <div class="report-time">{{v.create_time | dateFormat}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getReportData } from '@/servers/lishui'
export default {
  name: 'report',
  data () {
    return {
      keyword: '',
      reportList: [],
      count: 10,
      current: 1
    }
  },
  created () {
    this.getDataList()
    setInterval(() => {
      this.getDataList()
    }, 15000)
  },
  mounted () {
    this.setFontsize('ls-report')
  },
  methods: {
    getDataList () {
      getReportData(this.count, this.current).then((response) => {
        if (!response.data.ErrorCode) {
          if (response.data.data.length) {
            this.reportList = []
            this.reportList = response.data.data
            this.current += 1
          } else {
            this.current = 1
            this.getDataList()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.ls-report {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 17px;
  .report-wrap {
    width: 100%;
    height: 100%;
    padding: pxem(115px) pxem(100px) pxem(58px);
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    .report-list-wrap{
      height: 100%;
    }
  }
  .report-list{
    color : #fff;
    width: 48%;
    height: 20%;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    .report-status{
      width: pxrem(130px);
      height: pxrem(52px);
      text-align: center;
      span{
        display: block;
        margin : 0 auto;
        width: 100%;
        height: 100%;
        line-height: 100%;
        text-align: center;
        border-radius: 0.025rem;
        &.pass{
          background: url('./assets/pass.png') no-repeat center center;
          background-size: 100% 100%;
        }
        &.reject{
          background: url('./assets/reject.png') no-repeat center center;
          background-size: 100% 100%;
        }
        &.review{
          background: url('./assets/review.png') no-repeat center center;
          background-size: 100% 100%;
        }
        &.baoshen{
          background: url('./assets/submit.png') no-repeat center center;
          background-size: 100% 100%;
        }
      }
    }
    .report-title{
      flex: 1;
      font-size: pxrem(38px);
      margin-left: pxrem(24px);
      text-align: left;
    }
    .report-user{
      width: 10%;
      margin-right: pxrem(20px);
      font-size: pxrem(32px);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0,246,255,1);
    }
    .report-time{
      font-size: pxrem(32px);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0,246,255,1);
    }
  }
}
</style>
