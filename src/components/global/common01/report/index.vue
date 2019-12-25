<template>
  <div class="common01-report">
    <div class="report-wrap common01-border">
      <div class="common01-title">报题展示</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="status common01-ft30" :class="{'one': v.audit_status === '0', 'two': v.audit_status === '1', 'three': v.audit_status === '2', 'four': v.audit_status === '4'}">{{v.audit_status === '0' ? '待审核' : v.audit_status === '1' ? '通过' : v.audit_status === '2' ? '打回' : '报审'}}</div>
          <div class="title common01-ft40 overhidden">{{v.title}}</div>
          <div class="name common01-ft32">{{v.project_user_name}}</div>
          <div class="time common01-ft32">{{v.update_time | dateFormat}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getWorkCallReportList } from '@/servers/interface'
export default {
  name: 'report',
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      dataList: []
    }
  },
  created () {
    this.getWorkCallReportList()
    setInterval(() => {
      this.getWorkCallReportList()
    }, this.frequency)
  },
  methods: {
    getWorkCallReportList () {
      getWorkCallReportList(5, this.page, this.currentViewId).then((res) => {
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
              this.getWorkCallReportList()
            }
          }
        }
      })
    }
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
    padding: pxrem(250px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(90px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .status {
          width: pxrem(120px);
          height: pxrem(50px);
          line-height: pxrem(50px);
          border-radius: pxrem(2px);
          &.one {
            background-color: #0466FF;
          }
          &.two {
            background-color: #39C78D;
          }
          &.three {
            background-color: #EA4A68;
          }
          &.four {
            background-color: #FF9A02;
          }
        }
        .title {
          text-align: left;
          width: 60%;
          margin: 0 pxrem(175px) 0 pxrem(37px);
        }
        .time {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
