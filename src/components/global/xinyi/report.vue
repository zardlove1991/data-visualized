<template>
  <div class="xy-report" id="xy-report">
    <div class="report-wrap">
      <div
        class="report-list animated sys-flex sys-flex-center"
        :class="{'fadeInLeft' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="report-user">{{v.project_user_name}}</div>
        <div class="report-time">{{v.create_time | format}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getReportData } from '@/servers/xinyi'
export default {
  name: 'report',
  data () {
    return {
      list: [],
      dataList: [],
      count: 0
    }
  },
  filters: {
    format: inputTime => {
      inputTime = parseInt(inputTime) * 1000
      var date = new Date(inputTime)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      var second = date.getSeconds()
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      var time = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      return time.slice(5, 10)
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('xy-report')
  },
  methods: {
    getDataList () {
      getReportData().then(res => {
        if (res && res.data && res.data.data) {
          this.list = res.data.data
          this.initList()
        }
      })
    },

    initList () {
      this.dataList = this.list.slice(this.count, this.count + 4)
      // this.count += 4
      // this.listInterval = setInterval(() => {
      //   if (this.count < this.list.length) {
      //     this.dataList = []
      //     setTimeout(() => {
      //       this.dataList = this.list.slice(this.count, this.count + 4)
      //       this.count += 4
      //     }, 100)
      //   } else {
      //     this.dataList = []
      //     clearInterval(this.listInterval)
      //     this.count = 0
      //     this.getDataList()
      //   }
      // }, 10000)
    }
  }
}
</script>

<style lang="scss" scoped>
.xy-report {
  width: 500px;
  height: 500px;
  .sys-flex{display: -webkit-flex;display: -ms-flexbox;display: flex;}
.sys-flex-center{-webkit-align-items: center;-ms-flex-align: center;align-items: center;}
.list-title {
        flex: 1;
      }
}
</style>
