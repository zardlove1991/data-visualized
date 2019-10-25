<template>
  <div class="main-wrap" id="ls-operateData">
    <div class="operate-data-wrap sys-flex flex-justify-between">
      <div class="micro-box box-item sys-flex sys-vertical flex-justify-between">
        <div v-for="(v, i) in microList" :key="i" class="list-item sys-flex flex-justify-between sys-flex-center">
          <span class="item-lable">{{v.lable}}</span>
          <span class="item-value">{{v.value | numberFormat}}</span>
        </div>
      </div>
      <div class="app-box box-item sys-flex sys-vertical flex-justify-between">
        <div v-for="(v, i) in appList" :key="i" class="list-item sys-flex flex-justify-between sys-flex-center">
          <span class="item-lable">{{v.lable}}</span>
          <span class="item-value">{{v.value | numberFormat}}</span>
        </div>
      </div>
      <div class="web-box box-item sys-flex sys-vertical flex-justify-between">
        <div v-for="(v, i) in webList" :key="i" class="list-item sys-flex flex-justify-between sys-flex-center">
          <span class="item-lable">{{v.lable}}</span>
          <span class="item-value">{{v.value | numberFormat}}</span>
        </div>
      </div>
      <div class="content-box box-item sys-flex sys-vertical flex-justify-between">
        <div v-for="(v, i) in contentList" :key="i" class="list-item sys-flex flex-justify-between sys-flex-center">
          <span class="item-lable">{{v.lable}}</span>
          <span class="item-value">{{v.value | numberFormat}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { } from '@/servers/lishui'
export default {
  name: 'operateData',
  data () {
    return {
      microList: [
        {
          lable: '昨日阅读数：',
          value: 0
        }, {
          lable: '今日新消息数：',
          value: 0
        }, {
          lable: '新增粉丝数：',
          value: 0
        }, {
          lable: '累计粉丝数：',
          value: 0
        }
      ],
      appList: [
        {
          lable: '昨日浏览量数：',
          value: 0
        }, {
          lable: '今日发布数：',
          value: 0
        }, {
          lable: '新增注册数：',
          value: 0
        }, {
          lable: '累计注册数：',
          value: 0
        }
      ],
      webList: [
        {
          lable: '昨日阅读数：',
          value: 0
        }, {
          lable: '今日点赞数：',
          value: 0
        }, {
          lable: '新增粉丝数：',
          value: 0
        }, {
          lable: '累计粉丝数：',
          value: 0
        }
      ],
      contentList: [
        {
          lable: '昨日点赞数：',
          value: 0
        }, {
          lable: '今日新消息数：',
          value: 0
        }, {
          lable: '新增粉丝数：',
          value: 0
        }, {
          lable: '累计粉丝数：',
          value: 0
        }
      ]
    }
  },

  created () {
  },

  mounted () {
    this.setFontsize('ls-operateData')
    this.microList = [
      {
        lable: '昨日阅读数：',
        value: 123
      }, {
        lable: '今日新消息数：',
        value: 234
      }, {
        lable: '新增粉丝数：',
        value: 0
      }, {
        lable: '累计粉丝数：',
        value: 0
      }
    ]
  }
}
</script>

<style lang='scss' scoped>
.main-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 11px;
  .operate-data-wrap{
    width: 100%;
    height: 100%;
    padding: 1.2em 0.45em 0.5em 0.45em;
    background: url('./assets/border.png') no-repeat center center;
    background-size: 100% 100%;
    .box-item {
      width: 22%;
      height: 100%;
      padding: 0.8em 0.3em 0.3em;
      .list-item {
        width: 100%;
        height: 25%;
        .item-lable {
          font-size: 0.2em;
          color: #ffffff;
        }
        .item-value {
          font-size: 0.36em;
        }
      }
    }
    .micro-box {
      background: url('./assets/micro.png') no-repeat center center;
      background-size: 100% 100%;
      .item-value {
        color: #C9BA3D;
      }
    }
    .app-box {
      background: url('./assets/app.png') no-repeat center center;
      background-size: 100% 100%;
      .item-value {
        color: #23DF9F;
      }
    }
    .web-box {
      background: url('./assets/web.png') no-repeat center center;
      background-size: 100% 100%;
      .item-value {
        color: #B732D3;
      }
    }
    .content-box {
      background: url('./assets/content.png') no-repeat center center;
      background-size: 100% 100%;
      .item-value {
        color: #D85C30;
      }
    }
  }
}
</style>
