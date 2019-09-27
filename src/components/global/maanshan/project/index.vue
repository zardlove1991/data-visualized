<template>
  <div class="maanshan-project" id="maanshan-project" :style="defineBg()">
    <!-- :class="[{'warp-bg' : showDefault}]" -->
    <div class="project-wrap sys-flex sys-vertical" >
      <div class="project-title sys-flex sys-flex-center">{{componentTitle}}</div>
      <div
        class="project-list animated sys-flex sys-flex-center"
        :class="{'flipInX' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-user overhidden">{{v.project_user_name}}</div>
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
      componentTitle: '选题展示',
      list: [],
      dataList: [],
      count: 0
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('maanshan-project')
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
.maanshan-project {
  width: 100%;
  padding: 0.4em;
  .project-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0.85em;
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .project-title {
    text-align: left;
    font-size: 0.8em;
    font-weight: bold;
    color: #D6E6FF;
    margin-bottom: 1em;
  }
  .project-list {
    height: 0.75em;
    padding-left: 0.5em;
    margin-bottom: 0.9em;
    color: #ffffff;
    background-size: 100%;
    .list-title {
      flex: 1;
      font-size: 0.58em;
      text-align: left;
    }
    .list-user {
      flex-basis: 10%;
      font-size: 0.42em;
    }
    .list-time {
      flex-basis: 20%;
      font-size: 0.42em;
    }
  }
}
</style>
