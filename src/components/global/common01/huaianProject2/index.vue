<template>
  <div class="huaian-common01-project" id="huaian-common01-project">
    <div class="project-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '选题展示'}}</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in projectList" :key="k" :class="{'flipInX' : v.title, 'marginBottom75': customSize}" :style="{'animation-delay' : k/2+'s'}">
          <div class="title common01-ft40 overhidden" :style="setFontSize(50)">{{v.title}}</div>
          <div class="name overhidden common01-ft32" :style="setFontSize(45)">{{v.project_user_name}}</div>
          <div class="project-status common01-ft32" :style="setFontSize(45)" :class="{'on-progress' : v.status == 1 || v.status == 2 , 'on-stop' : v.status==4 , 'on-done' : v.status==3}">{{v.status_show}}</div>
          <div class="project-progress common01-ft32 sys-flex sys-flex-center overhidden" :style="setFontSize(45)">
            <div class="progress-total">
              <span class="progress" :class="{'on-progress' : v.status == 1 || v.status == 2 , 'on-stop' : v.status==4 , 'on-done' : v.status==3}" :style="{'width' : v.percent + '%'}"></span>
            </div>
            <div class="percent common01-ft32" :style="setFontSize(45)" :class="{'on-progress' : v.status == 1 || v.status == 2 , 'on-stop' : v.status==4 , 'on-done' : v.status==3}">{{Math.ceil(v.percent)}}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getWorkCallSubjectList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'huaianProject2',
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      projectList: [],
      customSize: false
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getWorkCallSubjectList()
    setInterval(() => {
      this.getWorkCallSubjectList()
    }, this.frequency)
  },
  mounted () {
    this.setFontsize('huaian-common01-project')
    document.querySelector('html').style.fontSize = '100px'
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getWorkCallSubjectList () {
      getWorkCallSubjectList(5, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.projectList = []
            setTimeout(() => {
              this.projectList = res.data.result.data
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
              this.getWorkCallSubjectList()
            }
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
@import '../style/index.scss';
.huaian-common01-project {
  background: url(./assets/bg.png) no-repeat center;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .project-wrap {
    background: url(./assets/huaianAreaBg.png) no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(220px) pxrem(80px) pxrem(95px) pxrem(78px);
    color: #fff;
    .common01-title{
      font-size: pxrem(60px);
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 1px;
      text-shadow: pxrem(16px) pxrem(20px) pxrem(20px) rgba(0,222,255,0.20); 
    }
    .wrap-content {
      .marginBottom75 {
        margin-bottom: pxrem(75px)!important;
      }
      .item-list {
        height: pxrem(90px);
        padding: pxrem(10px) 0 pxrem(10px) pxrem(22px);
        background: url(./assets/itemBg.png) no-repeat left center;
        background-size: contain;
        margin-bottom: pxrem(56px)!important;
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          text-align: left;
          width: 65%;
          font-size: 0.4rem !important;
          padding-left:pxrem(32px);
          font-weight: 500;
        }
        .name {
          text-align: left;
          width: 10%!important;
          font-size: 0.32rem !important;
          color: #00f6ff;
        }
        .project-status {
          width: pxrem(170px);
          font-size: 0.32rem !important;
          text-align: justifyLeft;
          &.on-progress {
            color: #00f6ff;
          }
          &.on-stop {
            color: #f24444;
          }
          &.on-done {
            color: #00de74;
          }
        }
        .project-progress {
          margin-left: auto;
          .progress-total {
            width: pxrem(220px)!important;
            height: pxrem(20px);
            background: #314b7f;
            border-radius: pxrem(10px);
            overflow: hidden;
            .progress {
              display: block;
              height: 100%;
              border-radius: pxrem(10px);
              &.on-progress {
                background: -webkit-linear-gradient(left, #057aff, #4ad2f4);
                background: -o-linear-gradient(right, #057aff, #4ad2f4);
                background: -moz-linear-gradient(right, #057aff, #4ad2f4);
                background: linear-gradient(to right, #057aff, #4ad2f4);
              }
              &.on-stop {
                background: -webkit-linear-gradient(left, #ee3232, #f65959);
                background: -o-linear-gradient(right, #ee3232, #f65959);
                background: -moz-linear-gradient(right, #ee3232, #f65959);
                background: linear-gradient(to right, #ee3232, #f65959);
              }
              &.on-done {
                background: -webkit-linear-gradient(left, #00de74, #2bf6c5);
                background: -o-linear-gradient(right, #00de74, #2bf6c5);
                background: -moz-linear-gradient(right, #00de74, #2bf6c5);
                background: linear-gradient(to right, #00de74, #2bf6c5);
              }
            }
          }
          .percent {
            margin-left: pxrem(20px);
            width: pxrem(100px);
            font-size: 0.32rem !important;
            font-weight: 500;
            color: #ffffff;
            &.on-progress {
              color: #00f6ff;
            }
            &.on-stop {
              color: #f24444;
            }
            &.on-done {
              color: #00de74;
            }
          }
        }
      }
    }
  }
}
</style>
