<template>
  <div class="xy-project" id="xy-project" :style="defineBg()">
    <!--  :class="[{'warp-bg' : showDefault}]" -->
    <div class="project-wrap sys-flex sys-vertical">
      <div class="project-title sys-flex sys-flex-center">{{projectTitle}}</div>
      <div
        class="project-list animated sys-flex sys-flex-center overhidden"
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
          this.list = res.data.data.slice(0, 8)
          this.initList()
        }
      })
    },

    initList () {
      this.dataList = this.list.slice(this.count, this.count + 8)
      this.count += 8
      this.listInterval = setInterval(() => {
        if (this.count < this.list.length) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = this.list.slice(this.count, this.count + 8)
            this.count += 8
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
      font-size: px1em(15px);
      text-align: left;
    }
    .list-user {
      flex-basis: 20%;
      font-size: px1em(13.5px);
      color: rgba(243, 248, 254, 0.5);
    }
    .list-time {
      flex-basis: 20%;
      font-size: px1em(13.5px);
      color: rgba(243, 248, 254, 0.5);
    }
  }
}
</style>
