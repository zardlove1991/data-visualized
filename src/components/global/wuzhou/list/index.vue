<template>
<div class="news-list flex sys-vertical flex-justify-around">
  <div class="list-item flex sys-flex-center  animated"  v-for="(item,index) in list" :key="index" :class="{'flipInX' : item.title}" :style="{'animation-delay' : index/4+'s'}">
    <slot name="status" :item="item"></slot>
    <div class="title overhidden"><span class="icon-index" :class="'icon-index'+index" v-if="showIndex">{{index+1}}</span>{{item.title}}</div>
    <div class="name" v-if="showPublisher">{{showName(item)}}</div>
    <slot name="progress" :item="item"></slot>
    <div class="time" v-if="showTime">{{showTime == 2?item.publish_time:$options.filters.dateFormat(item.update_time)}}</div>
    <div class="click-num" v-if="showNum">{{item.click_num}}</div>
  </div>
</div>
</template>
<script>
export default {
  name: 'commonList',
  props: ['showIndex', 'list', 'showNum', 'showPublisher', 'showTime'],
  data () {
    return {
    }
  },
  methods: {
    showName (item) {
      let name
      switch (this.showPublisher) {
        case 1:
          name = item.category
          break
        case 2:
        case 3:
          name = item.project_user_name
          break
        case 4:
          name = item.task_user_name
          break
      }
      return name
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.news-list{
  .list-item{
    color: #ffffff;
    font-size: pxrem(32px);
    margin-bottom: 0.3rem;
    .icon-index{
      width: pxrem(60px);
      height: pxrem(60px);
      line-height: pxrem(60px);
      display: inline-block;
      text-align: center;
      margin-right: pxrem(20px);
      background: url("./assets/4.png")  no-repeat; 
      &.icon-index0{
         background: url("./assets/1.png") no-repeat center center;
      }
      &.icon-index1{
        background: url("./assets/2.png") no-repeat  center center;
      }
      &.icon-index2{
        background: url("./assets/3.png") no-repeat  center center;
      }
      &.icon-index3{
        background: url("./assets/4.png") no-repeat  center center;
      }
    }
    .name{
      width: 15%;
    }
    .title{
      flex: 1;
      font-size: pxrem(40px);
      text-align: left;
      margin-right: pxrem(20px);
    }
    .click-num{
      background: url("./assets/icon-read.png") left  no-repeat;
      background-size: pxrem(42px)  pxrem(30px);
      padding-left: pxrem(63px);
      margin-left: pxrem(50px);
    }
  }

}          
</style>
