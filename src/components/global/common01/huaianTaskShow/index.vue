<template>
  <div class="ls-task" id="ls-task">
    <div class="task-wrap">
      <div class="common01-title" :style="setFontSize(63)">任务展示</div>
      <swiper :options="swiperOption" ref="mySwiper" >
        <swiper-slide class="sys-flex sys-flex-wrap" style="height:100%!important;align-content:space-between;" v-for="(item,k) in dataList" :key="k">
          <div class="task-list" v-for="(list,key) in item" :key="key">
            <div class="task-nav sys-flex sys-flex-center">
              <div class="project-title sys-flex-one overhidden">所属选题：{{list.project_title}}</div>
              <div class="task-status normal" v-if="list.priority == 1">普通</div>
              <div class="task-status emergency" v-if="list.priority == 2">紧急</div>
              <div class="task-status urgent" v-if="list.priority == 3">加急</div>
            </div>
            <div class="task-content sys-flex sys-vertical  flex-justify-between">
              <div class="brief">{{list.title}}</div>
              <div class="task-info sys-flex sys-flex-center overhidden flex-justify-between">
                <div class="task-create-user">{{list.task_user_name}}</div>
                <div class="task-create-time">{{list.update_time | dateFormat(0, 16)}}</div>
                <div class="task-type sys-flex-one" :class="{'on-start': list.status == 1,'on-progress' :  list.status == 2 , 'on-stop' : list.status == 3 , 'on-done' : list.status == 4}">{{list.status_show}}</div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getWorkCallTaskList } from '@/servers/interface'
export default {
  name: 'huaianTaskShow',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        // notNextTick: true,
        speed: 2000,
        // autoplay : false,
        autoplay: {
          delay: 15000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        autoHeight: true,
        // direction: 'vertical',
        effect: 'flip',
        initialSlide: 0,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        paginationClickable: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      dataList: [],
      count: 24,
      page: 1,
      isPaging: true
    }
  },
  created () {
    this.getDataList()
    setInterval(() => {
      this.getDataList()
    }, 45000)
  },
  mounted () {
    this.setFontsize('ls-task')
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getDataList () {
      getWorkCallTaskList(this.count, this.page, this.currentViewId).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            this.dataList = this.split_array(res.data.result.data, 8)
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
    },
    split_array (arr, len) {
      let arrlen = arr.length
      let result = []
      for (let i = 0; i < arrlen; i += len) {
        result.push(arr.slice(i, i + len))
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.ls-task {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 17px;
  background-color: #121D58;
  .task-wrap {
    width: 100%;
    height: 100%;
    padding: pxrem(55px) pxrem(70px);
    background: url("./assets/bg01.png") no-repeat center;
    background-size: 100% 100%;
    // background-color: #0F1C46;
    .common01-title{
        text-align: left;
        color: #ffffff;
        position: unset;
        font-size: pxrem(58px);
        margin-bottom: pxrem(50px);
    }
    .swiper-container{
      width: 100%;
      height: 85%;
      .swiper-wrapper{
        height: 85%;
      }
    }
    .task-list{
      width: 24.5%;
      height: 48%;
      background: rgba(47,82,143,0.1);
      border: 0.01rem solid rgba(5, 69, 131, 0.5);
      margin-right: 0.5%;
      .task-nav{
        width: 100%;
        height: 25%;
        padding: pxem(33px, 12.5);
        background: rgba(15,98,223,0.15);
        .project-title{
          font-size: pxrem(32px);
          font-family: PingFang SC;;
          font-weight: 500;
          text-align: left;
          color:#00E3FE;
        }
        .task-status{
          width: pxrem(96px);
          height: pxrem(50px);
          line-height: pxrem(50px);
          border-radius: 0.02rem;
          text-align: center;
          font-size: pxrem(30px);
          color: #fff;
          &.normal{
            background: rgba(7,98,243,1);
          }
          &.emergency{
            background: rgba(234,74,104,1);
          }
          &.urgent{
            background: RGBA(217, 67, 110, 1);
          }
        }
      }
      .task-content{
        height: 74%;
        padding: pxem(40px, 12.5) pxem(33px, 12.5);
        background: #0C2779;
        .brief{
          font-size: pxrem(40px);
          line-height: 1.5em;
          height: 3em;
          font-weight: 400;
          color: #fff;
          text-align: left;
          overflow: hidden;
        }
        .task-info{
          width: 100%;
          .task-create-user{
            font-size: pxrem(30px);
            opacity: 0.8;
            // padding-left: pxrem(40px); 
            color: #fff;
            // background: url('./assets/user.png') no-repeat center left;
            // background-size: pxrem(25px) pxrem(28px);
            margin-right: pxrem(40px); 
          }
          .task-create-time{
            font-size: pxrem(32px);
            opacity: 0.8;
            // padding-left: pxrem(40px);  
            color:#fff;
            // background: url('./assets/time.png') no-repeat center left;
            // background-size: pxrem(29px) pxrem(29px);
          }
          .task-type{
            font-size: pxrem(30px);
            text-align: right;
            color: #fff;
            font-family: Adobe Heiti Std R;
            font-weight: normal;
            &.on-progress {
              color: #01DF76;
            }
            &.on-stop {
              color: #F34A4A;
            }
            &.on-done {
              color: #14e087;
            }
          }
        }
      }
    }
  }
}
</style>
