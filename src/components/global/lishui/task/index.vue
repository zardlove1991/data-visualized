<template>
  <div class="ls-task" id="ls-task">
    <div class="task-wrap">
      <swiper :options="swiperOption" ref="mySwiper" >
        <swiper-slide class="sys-flex sys-flex-wrap flex-justify-left" style="height:100%!important;" v-for="(item,k) in taskList" :key="k">
          <div class="task-list" v-for="(list,key) in item" :key="key">
            <div class="task-nav sys-flex sys-flex-center">
              <div class="project-title sys-flex-one overhidden">所属选题：{{list.project_title}}</div>
              <div class="task-status normal" v-if="list.priority == 1">普通</div>
              <div class="task-status emergency" v-if="list.priority == 2">紧急</div>
              <div class="task-status urgent" v-if="list.priority == 3">加急</div>
            </div>
            <div class="task-content">
              <div class="brief">{{list.title}}</div>
              <div class="task-info sys-flex sys-flex-center overhidden flex-justify-between">
                <div class="task-create-user">{{list.task_user_name}}</div>
                <div class="task-create-time">{{list.create_time | dateFormat}}</div>
                <div class="task-type sys-flex-one not-beginning">{{list.status_show}}</div>
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
import { getTaskList } from '@/servers/lishui'
export default {
  name: 'task',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      taskList: [],
      swiperOption: {
        slidesPerView: 4,
        slidesPerColumn: 2,
        // notNextTick: true,
        speed: 2000,
        // autoplay : false,
        autoplay: {
          delay: 5000,
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
      currentIndex: 1,
      contentShow: false,
      contentDetail: null
    }
  },
  created () {
    this.getDataList()
    setInterval(() => {
      this.getDataList()
    }, 5000)
  },
  mounted () {
    this.setFontsize('ls-task')
  },
  methods: {
    getDataList () {
      getTaskList(this.count, this.current).then((response) => {
        if (!response.data.ErrorCode) {
          if (response.data.data.length) {
            this.taskList = []
            this.taskList = response.data.data
            this.current += 1
          } else {
            this.current = 1
            this.getDataList()
          }
        }
        console.log(this.taskList)
      })
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
  .task-wrap {
    width: 100%;
    height: 100%;
    padding: pxem(115px) pxem(100px) pxem(58px);
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    .swiper-container{
      width: 100%;
      height: 100%;
      .swiper-wrapper{
        height: 100%;
      }
    }
    .task-list{
      width: 24%;
      height: 48%;
      background: rgba(2,122,186,0.2);
      border: 0.01rem solid rgba(2, 122, 186, 0.5);
      margin-bottom: 0.15rem;
      &:not(:nth-of-type(4n)){
        margin-right: 0.15rem;
      }
      .task-nav{
        width: 100%;
        height: 22%;
        padding: 0 0.16rem;
        background: rgba(9,44,111,1);
        .project-title{
          font-size: 0.16rem;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(174,183,209,1);
        }
        .task-status{
          width: 0.4rem;
          height: 0.2rem;
          line-height: 0.2rem;
          border-radius:0.025rem;
          text-align: center;
          font-size: 0.15rem;
          color: #fff;
          &.normal{
            background: RGBA(34, 115, 238, 1);
          }
          &.emergency{
            background: RGBA(226, 118, 46, 1);
          }
          &.urgent{
            background: RGBA(217, 67, 110, 1);
          }
        }
      }
      .task-content{
        height: 80%;
        padding: 0.1rem 0.16rem;
        background:rgba(23,52,76,0);
        .brief{
          height: 0.5rem;
          font-size: 0.18rem;
          margin-bottom: 0.1rem;
          font-weight:400;
          color:#fff;
          overflow: hidden;
        }
        .task-info{
          width: 100%;
          .task-create-user{
            // width: 18%;
            font-size: 0.15rem;
            padding-left: 0.2rem; 
            color:#fff;
            background: url('./assets/user.png') no-repeat center left;
            background-size:0.125rem 0.14rem;
            margin-right: 0.15rem; 
          }
          .task-create-time{
            font-size: 0.15rem;
            padding-left: 0.2rem; 
            color:#fff;
            background: url('./assets/time.png') no-repeat center left;
            background-size: 0.125rem 0.125rem;
          }
          .task-type{
            font-size: 0.15rem;
            text-align: right;
            color: #fff;
            font-family: Adobe Heiti Std R;
            font-weight: normal;
            // &.not-beginning{
                // color
            // }
          }
        }
      }
    }
  }
}
</style>
