<template>
  <div class="xy-clue" id="xy-clue">
    <div class="clue-wrap sys-flex sys-vertical">
      <div class="clue-title">{{clueTitle}}</div>
      <div class="title-list sys-flex sys-flex-center">
        <div class="list-item sys-flex sys-flex-center flex-justify-center" v-for="(v,k) in titleList" :key="k" :class="{'active': currentIndex === k}">
          {{v.name}}
        </div>
      </div>
      <div
        class="clue-list animated sys-flex sys-flex-center overhidden"
        :class="{'flipInX' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-user">{{v.project_user_name}}</div>
        <div class="list-time">{{v.create_time | format}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWebsitList, getWechatList, getWeiboList } from '@/servers/xinyi'
export default {
  name: 'clue',
  data () {
    return {
      clueTitle: '线索汇聚',
      titleList: [{
        name: '互联网',
        type: 0
      }, {
        name: '微信',
        type: 1
      }, {
        name: '微博',
        type: 2
      }],
      currentIndex: 0,
      list: [],
      dataList: [],
      count: 0
    }
  },
  filters: {
    format: inputTime => {
      inputTime = parseInt(inputTime) * 1000
      var date = new Date(inputTime)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      var second = date.getSeconds()
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      var time = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      return time.slice(5, 10)
    }
  },
  created () {
    this.getData(this.titleList[this.currentIndex].type)
    setInterval(() => {
      this.currentIndex++
      if (this.currentIndex >= this.titleList.length) {
        this.currentIndex = 0
        this.getData(this.titleList[this.currentIndex].type)
      } else {
        this.getData(this.titleList[this.currentIndex].type)
      }
    }, 10000)
  },
  mounted () {
    this.setFontsize('xy-clue')
  },
  methods: {
    getData (type) {
      this.dataList = []
      if (type === 0) {
        getWebsitList().then(res => {
          if (res && res.data && res.data.data) {
            this.dataList = res.data.data.slice(0, 8)
          }
        })
      } else if (type === 1) {
        getWechatList().then(res => {
          if (res && res.data && res.data.data) {
            this.dataList = res.data.data.slice(0, 8)
          }
        })
      } else if (type === 2) {
        getWeiboList().then(res => {
          if (res && res.data && res.data.data) {
            this.dataList = res.data.data.slice(0, 8)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-clue {
  width: 100%;
  padding: px1em(11px) px1em(6px);
  .clue-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/topic-inset-bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: px1em(17px) px1em(11px);
  }
  .clue-title {
    text-align: left;
    font-size: px1em(11.5px);
    // font-size: 1.5em;
    color: #d6e6ff;
  }
  .title-list {
    width: 100%;
    height: 10%;
    margin-bottom: px1em(11.5px);
    .list-item {
      width: px1em(160px);
      height: px1em(60px);
      margin-right: 2%;
      font-size: px1em(8.5px);
      color: #d6e6ff;
      background: url('./assets/clue-btn.png') no-repeat center;
      background-size: 100%;
    }
    .active {
      background: url('./assets/clue-active-btn.png') no-repeat center;
      background-size: 100%;
    }
  }
  .clue-list {
    height: 10%;
    padding: 0.2em;
    color: #d6e6ff;
    background: url('./assets/user-list-bg.png') no-repeat center;
    background-size: 100%;
    .list-title {
      flex: 1;
      font-size: px1em(9.5px);
      text-align: left;
    }
    .list-user {
      flex-basis: 20%;
      font-size: px1em(6.5px);
      color: rgba(243, 248, 254, 0.5);
    }
    .list-time {
      flex-basis: 20%;
      font-size: px1em(6.5px);
      color: rgba(243, 248, 254, 0.5);
    }
  }
}
</style>
