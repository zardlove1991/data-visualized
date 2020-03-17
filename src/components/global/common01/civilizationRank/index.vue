<template>
  <div class="common01-civilizationrank">
    <div class="dispatchrank-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '文明排行'}}</div>
      <div class="title-tab sys-flex">
          <div class="item">
            <div>
              <h4>志愿服务总时长(时)</h4>
              <p>2093</p>
            </div>
          </div>
          <div class="item">
              <div>
                <h4>服务队总数(个)</h4>
                <p>137</p>
              </div>
          </div>
          <div class="item">
              <div>
                <h4>志愿者总数(人)</h4>
                <p>751</p>
              </div>
          </div>
      </div>
      <div class="wrap-content sys-flex flex-justify-between">
        <div class="content-left">
          <div class="title">志愿组织排行<span class="unit">(时长/h)</span></div>
          <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in leftList" :key="k" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2+'s'}">
            <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four':k > 2}">{{k + 1}}</div>
            <div class="title common01-ft40 overhidden" :style="setFontSize(50)">{{v.name}}</div>
            <div class="num common01-ft36" :style="setFontSize(40)"><span class="common01-ft60" :style="setFontSize(65)">{{v.publish}}</span>h</div>
          </div>
        </div>
        <div class="content-right" v-if="rightList && rightList[0]">
          <div class="title">志愿者排行<span class="unit">(时长/h)</span></div>
          <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in rightList" :key="k" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2+'s'}">
            <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four':k > 2}">{{k + 1}}</div>
            <div class="img">
              <img src="../clickRank/assets/two.png" alt="">
            </div>
            <div class="title common01-ft40 overhidden" :style="setFontSize(50)">{{v.name}}</div>
            <div class="num common01-ft36" :style="setFontSize(40)"><span class="common01-ft60" :style="setFontSize(65)">{{v.publish}}</span>h</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPublishDataRank } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'civilizationRank',
  data () {
    return {
      leftList: [
        {name: 'appleappleappleappleappleappleappleappleappleappleappleappleappleappleappleapple', publish: 1234567},
        {name: 'orange', publish: 1234},
        {name: 'banana', publish: 1234},
        {name: 'juice', publish: 1234}
      ],
      rightList: [
        {name: '苹果', publish: 1234},
        {name: '橙子', publish: 1234},
        {name: '香蕉', publish: 1234},
        {name: '果汁', publish: 1234}
      ],
      customSize: false
    }
  },
  created () {
    // getDataConfig().then(res => {
    //   if (Number(res.customSize)) {
    //     this.customSize = true
    //   }
    // })
    // this.getPublishDataRank()
    // setInterval(() => {
    //   this.getPublishDataRank()
    // }, 60000)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getPublishDataRank () {
      getPublishDataRank(this.currentViewId).then(res => {
        if (!res.data.error_code) {
          let dataList = res.data.result.data
          if (dataList && dataList.length > 7) {
            this.leftList = dataList.slice(0, 7)
            this.rightList = dataList.slice(7)
          } else {
            this.leftList = dataList
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-civilizationrank {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .dispatchrank-wrap {
    padding: pxrem(159px) pxrem(96px) pxrem(57px) pxrem(74px);
    color: #fff;
    .title-tab {
      width: 100%;
      padding-bottom: pxrem(8px);
      .item {
        flex: 1;
        position: relative;
        font-size: pxrem(40px);
        background: #115ea2;
        padding: pxrem(5px) 0;
        >div{
          display: inline-block;
          >p{
            text-align: left;
            color: #4545ec;
          }  
        }  
      }
      >.item:not(:last-child)::after{
        display: block;
        content: '';
        width: pxrem(1px);
        height: 80%;
        position: absolute;
        right: 0;
        top: 10%;
        background-color: #fff;
      }
    }
    .wrap-content {
      .content-left {
        >div.title {
          text-align: left;
          font-size: pxrem(40px);
          .unit {font-size: pxrem(25px);}
        }
        .item-list {
          margin-right: pxrem(70px);
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .content-right {
        >div.title{
          text-align: left;
          font-size: pxrem(40px);
          .unit {font-size: pxrem(25px);}
        }  
        .item-list {
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .item-list {
        width: pxrem(800px);
        height: pxrem(100px);
        background: url("./assets/back.png") no-repeat center;
        background-size: 100%;
        padding: 0 pxrem(38px) 0 pxrem(38px);
        margin-bottom: pxrem(14px);
        .index {
          width: pxrem(60px);
          height: pxrem(60px);
          background: no-repeat center;
          background-size: 100%;
          line-height: pxrem(60px);
          &.one {
            background-image: url("../clickRank/assets/one.png");
          }
          &.two {
            background-image: url("../clickRank/assets/three.png");
          }
          &.three {
            background-image: url("../clickRank/assets/two.png");
          }
          &.four {
            background-image: url("../clickRank/assets/four.png");
          }
        }
        .img{
          width: pxrem(70px);
          height: pxrem(70px);
          border-radius: 50%;
          overflow: hidden;
          margin-left: pxrem(40px);
          >img{
            width: 100%;
            height: 100%;
          }
        }
        .title {
          text-align: left;
          width: pxrem(400px);
          margin-left: pxrem(20px);
        }
        .num {
          margin-left: auto;
          color: #00FCFF;
        }
      }
    }
  }
}
</style>
