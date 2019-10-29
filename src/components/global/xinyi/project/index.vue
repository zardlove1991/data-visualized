<template>
  <div class="xy-project" id="xy-project">
    <!--  :class="[{'warp-bg' : showDefault}]" -->
    <div class="project-wrap sys-flex sys-vertical">
      <div class="project-title sys-flex sys-flex-center">{{projectTitle}}</div>
      <div
        class="project-list animated sys-flex sys-flex-center overhidden"
        :class="{'fadeInLeft' : v}"
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
import { getProjectData } from '@/servers/xinyi'
export default {
  name: 'project',
  data () {
    return {
      projectTitle: '选题展示',
      dataList: [],
      dataInterval: null,
      count: 8,
      page: 1
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
      getProjectData(this.count, this.page).then(res => {
        if (res && res.data && res.data.data && res.data.data[0]) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = res.data.data
            if (res.data.data.length < this.count) {
              this.page = 1
            } else {
              this.page++
            }
          }, 100)
        }
      })
      this.intervalData()
    },

    intervalData () {
      this.dataInterval = setInterval(() => {
        getProjectData(this.count, this.page).then(res => {
          if (res && res.data && res.data.data && res.data.data[0]) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.data
              if (res.data.data.length < this.count) {
                this.page = 1
              } else {
                this.page++
              }
            }, 100)
          } else {
            this.page = 1
            clearInterval(this.dataInterval)
            this.getDataList()
          }
        })
      }, 10000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-project {
  width: 100%;
  padding: 0.25vh 0.1vw;
  .project-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0 px1em(17px);
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .project-title {
    text-align: left;
    height: 15%;
    font-size: px1em(22px);
    font-weight: bold;
    color: #d6e6ff;
  }
  .project-list {
    height: 10%;
    color: #d6e6ff;
    background-size: 100%;
    .list-title {
      flex: 1;
      font-size: px1em(18px);
      text-align: left;
    }
    .list-user {
      flex-basis: 20%;
      font-size: px1em(14.5px);
      color: rgba(243, 248, 254, 0.5);
    }
    .list-time {
      flex-basis: 20%;
      font-size: px1em(14.5px);
      color: rgba(243, 248, 254, 0.5);
    }
  }
}
</style>
