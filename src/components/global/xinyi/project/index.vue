<template>
  <div class="xy-project" id="xy-project">
    <div class="project-wrap sys-flex sys-vertical">
      <div class="project-title">{{projectTitle}}</div>
      <div
        class="project-list animated sys-flex sys-flex-center overhidden"
        :class="{'fadeInLeft' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-user">{{v.project_user_name}}</div>
        <div class="list-time">{{v.create_time | format}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectData } from '@/servers/xinyi'
export default {
  name: 'project',
  data () {
    return {
      projectTitle: '选题展示',
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
    this.setFontsize('xy-project')
  },
  methods: {
    getDataList () {
      getProjectData().then(res => {
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
.xy-project {
  width: 100%;
  padding: px1em(14px);
  .project-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/topic-inset-bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: px1em(17px) px1em(11px);
  }
  .project-title {
    text-align: left;
    height: 20%;
    font-size: px1em(22px);
    // font-size: 1.5em;
    color: #d6e6ff;
  }
  .project-list {
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
