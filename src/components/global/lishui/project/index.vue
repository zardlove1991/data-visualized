<template>
  <div class="ls-project" id="ls-project">
    <div class="project-wrap">
      <div class="project-list-wrap sys-flex sys-flex-wrap flex-justify-between">
        <!-- @click="showContent(v,k)" -->
        <div
          class="project-list sys-flex sys-flex-center flex-justify-between animated"
          v-for="(v,k) in projectList"
          :key="k"
          :class="{'flipInX' : v.title}"
          v-bind:style="{'animation-delay' : k/2+'s'}"
        >
          <div class="project-title overhidden">{{v.title}}</div>
          <div class="project-user">{{v.project_user_name}}</div>
          <div class="project-status" :class="{'status-progress' : v.status == 1 || v.status == 2 , 'status-stop' : v.status == 4 , 'status-done' : v.status == 3}">{{v.status_show}}</div>
          <div class="project-progress sys-flex sys-flex-center">
            <div class="progress-total">
              <span
                class="progress"
                :class="{'on-progress' : v.status == 1 || v.status == 2 , 'on-stop' : v.status == 4 , 'on-done' : v.status == 3}"
                :style="{'width' : v.percent + '%'}"
              ></span>
            </div>
            <div class="percent">{{Math.ceil(v.percent)}}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectData } from '@/servers/lishui'
export default {
  name: 'project',
  data () {
    return {
      keyword: '',
      projectList: [],
      count: 10,
      current: 1,
      contentShow: false,
      contentDetail: null
    }
  },
  created () {
    this.getDataList()
    setInterval(() => {
      this.getDataList()
    }, 15000)
  },
  mounted () {
    this.setFontsize('ls-project')
  },
  methods: {
    getDataList () {
      getProjectData(this.count, this.current).then((response) => {
        if (!response.data.ErrorCode) {
          if (response.data.data.length) {
            this.projectList = []
            this.projectList = response.data.data
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
.ls-project {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 17px;
  .project-wrap {
    width: 100%;
    height: 100%;
    padding: pxem(115px) pxem(100px) pxem(58px);
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    .project-list-wrap{
      height: 100%;
    }
  }
  .project-list{
    width: 48%;
    color : #fff;
    height: 20%;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    .project-title{
      width: 60%;
      font-size: pxrem(38px, 12.5);
      text-align: left;
    }

    .project-user{
      width: 10%;
      text-align: left;
      line-height: pxrem(32px, 12.5);
      font-size: pxrem(32px, 12.5);
      color:rgba(255,255,255,1);
      margin-right: 0.1rem;
      margin-left: 0.1rem;
    }

    .project-status{
      width: 15%;
      text-align: center;
      display: block;
      margin: 0 pxrem(64px, 12.5) 0 pxrem(32px, 12.5);
      text-align: center;
      border-radius: 0.08rem;
      font-size: pxrem(32px, 12.5);
      color: rgba(255,255,255,0.7);
    }
    .status-progress{
      color: #00F6FF;
    }
    .status-stop{
      color: #F34A4A;
    }
    .status-done{
      color: #01DF76;
    }

    .project-progress{
      width: 25%;
      color : rgba(255,255,255,0.7);
      font-size: pxrem(32px, 12.5);
      text-align: center;
      .progress-total{
        width: 70%;
        height: pxrem(22px, 12.5);
        background: RGBA(68, 97, 115, 1);
        border-radius: 0.11rem;
        overflow: hidden;
        .progress{
          display: block;
          height: 100%;
          border-radius: 0.055rem;
          &.on-progress{
            background: -webkit-linear-gradient(left,  #0272ff , #80bfff);
            background: -o-linear-gradient(right,  #0272ff , #80bfff);
            background: -moz-linear-gradient(right,  #0272ff , #80bfff);
            background: linear-gradient(to right, #0272ff , #80bfff);
          }
          &.on-stop{
            background: -webkit-linear-gradient(left,  #EE3232 , #F65959);
            background: -o-linear-gradient(right,  #EE3232 , #F65959);
            background: -moz-linear-gradient(right, #EE3232 , #F65959);
            background: linear-gradient(to right, #EE3232 , #F65959);
          }
          &.on-done{
            background: -webkit-linear-gradient(left,  #09de74 , #2ff6c5);
            background: -o-linear-gradient(right,  #09de74 , #2ff6c5);
            background: -moz-linear-gradient(right,  #09de74 , #2ff6c5);
            background: linear-gradient(to right, #09de74 , #2ff6c5);
          }
        }
      }
      .percent{
        line-height: pxrem(32px, 12.5);
        font-size: pxrem(32px, 12.5);
        margin-left: pxrem(30px, 12.5);
        color:rgba(255,255,255,1);
      }
    }
  }
}
</style>
