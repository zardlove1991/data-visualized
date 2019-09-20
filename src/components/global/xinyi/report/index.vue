<template>
  <div class="xy-report" id="xy-report">
    <div class="report-wrap sys-flex sys-vertical" :class="[{'warp-bg' : showDefault}]" :style="defineBg()">
      <div class="report-title">{{reportTitle}}</div>
      <div
        class="report-list animated sys-flex sys-flex-center overhidden"
        :class="{'flipInX' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-user">{{v.project_user_name}}</div>
        <div class="list-time">{{v.create_time | dateFormat}}</div>
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
      reportTitle: '报题展示',
      list: [],
      dataList: [],
      count: 0
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
      this.count += 4
      this.listInterval = setInterval(() => {
        if (this.count < this.list.length) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = this.list.slice(this.count, this.count + 4)
            this.count += 4
          }, 100)
        } else {
          this.dataList = []
          clearInterval(this.listInterval)
          this.count = 0
          this.getDataList()
        }
      }, 10000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-report {
  width: 100%;
  padding: 0.25vh 0.25vw;
  .report-wrap {
    width: 100%;
    height: 100%;
    // background: url('./assets/bg.png') no-repeat center;
    // background-size: 100% 100%;
    padding: px1em(17px) px1em(11px);
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .report-title {
    text-align: left;
    height: 20%;
    font-size: px1em(22px);
    // font-size: 1.5em;
    color: #d6e6ff;
  }
  .report-list {
    height: 20%;
    padding: 0.2em;
    color: #d6e6ff;
    background: url('./assets/user-list-bg.png') no-repeat center;
    background-size: 100%;
    .list-title {
      flex: 1;
      font-size: px1em(18.5px);
      text-align: left;
    }
    .list-user {
      flex-basis: 20%;
      font-size: px1em(16.5px);
      color: rgba(243, 248, 254, 0.5);
    }
    .list-time {
      flex-basis: 20%;
      font-size: px1em(16.5px);
      color: rgba(243, 248, 254, 0.5);
    }
  }
}
</style>
