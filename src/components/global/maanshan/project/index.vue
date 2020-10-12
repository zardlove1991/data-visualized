<template>
  <div class="maanshan-project" id="maanshan-project">
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
</template>

<script>
import { getWorkCallSubjectList } from '@/servers/interface'
export default {
  name: 'project',
  data () {
    return {
      componentTitle: '选题展示',
      dataList: [],
      count: 4,
      page: 1,
      isPaging: true,
      frequency: 10000,
      maxPage: 10
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('maanshan-project')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getWorkCallSubjectList(this.count, this.page, this.currentViewId).then((res) => {
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
              this.getDataList()
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.maanshan-project {
  width: 100%;
  height: 100%;
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
    height: 1em;
    text-align: left;
    font-size: 0.8em;
    font-weight: bold;
    color: #D6E6FF;
    margin-bottom: 1.25em;
  }
  .project-list {
    padding-left: 0.5em;
    margin-bottom: 0.97em;
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
   .project-status{
      width: 15%;
      text-align: center;
      display: block;
      margin: 0 pxrem(64px) 0 pxrem(32px);
      text-align: center;
      border-radius: 0.08rem;
      font-size: pxrem(32px);
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
      font-size: pxrem(32px);
      text-align: center;
      .progress-total{
        width: 70%;
        height: pxrem(22px);
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
        line-height: pxrem(32px);
        font-size: pxrem(32px);
        margin-left: pxrem(30px);
        color:rgba(255,255,255,1);
      }
    }
}
</style>
