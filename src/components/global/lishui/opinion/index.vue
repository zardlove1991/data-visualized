<template>
  <div class="lishui-opinion">
    <div class="opinion-wrap" v-if="!showDetail">
      <div class="wrap-list overhidden animated" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}" @click="showContentDetail(v)" v-for="(v, k) in dataList" :key="k">{{v.title}}</div>
    </div>
    <div class="opinion-detail" v-if="showDetail">
      <div class="back" @click="backList">
        <img src="./assets/back.png" />
      </div>
      <iframe :src="url" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: 'opinion',
  data () {
    return {
      url: '',
      showDetail: false,
      count: 0,
      dataList: [],
      list: [{
        title: '栖凤北路路况',
        url: 'http://www.ls114.cn/thread-486764-1-1.html'
      }, {
        title: '关于福田社区蝉山村新农村建设村容村貌的疑问',
        url: 'http://www.ls114.cn/thread-486608-1-1.html'
      }, {
        title: '树枝已段，非常有安全隐患，无人管理 ',
        url: 'http://www.ls114.cn/thread-486670-1-1.html'
      }, {
        title: '石山公园的蓝球架，有架无板',
        url: 'http://www.ls114.cn/thread-486838-1-1.html'
      }, {
        title: '屏溪佳苑小区还能多增加娱乐休闲设施',
        url: 'http://www.ls114.cn/thread-486636-1-1.html'
      }, {
        title: '请问开发区沙河村的过渡费什么时候发？',
        url: 'http://www.ls114.cn/thread-486820-1-1.html'
      }, {
        title: '请问秋湖嘉苑一期何时能领房产证',
        url: 'http://www.ls114.cn/thread-486827-1-1.html'
      }, {
        title: '轻轨溧水站西面的小吃街',
        url: 'http://www.lsxww.net/thread-61775-1-1.html'
      }, {
        title: '荷花嘉苑地下车库太脏',
        url: 'http://www.lsxww.net/thread-61795-1-1.html'
      }, {
        title: '广成北门车库作为商铺严重影响小区环境和治安',
        url: 'http://www.lsxww.net/thread-60422-1-1.html'
      }]
    }
  },
  created () {
    setTimeout(() => {
      this.initList()
    }, 100)
  },
  methods: {
    initList () {
      this.dataList = this.list.slice(
        this.count,
        this.count + 5 > this.list.length ? this.list.length : this.count + 5
      )
      this.count += 5
      this.countNum = setInterval(() => {
        if (this.count < this.list.length) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = this.list.slice(this.count, this.count + 5)
            this.count += 5
          }, 100)
        } else {
          this.dataList = []
          clearInterval(this.countNum)
          this.count = 0
          setTimeout(() => {
            this.initList()
          }, 100)
        }
      }, 15000)
    },
    showContentDetail (value) {
      this.showDetail = true
      this.url = value.url
    },
    backList () {
      this.showDetail = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-opinion {
  width: 100%;
  height: 100%;
  padding: pxrem(33px) pxrem(26px) pxrem(53px) pxrem(50px);
  .opinion-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: pxrem(200px) pxrem(100px) pxrem(50px);
    color: #fff;
    .wrap-list {
      font-size: pxrem(40px);
      text-align: left;
      margin-bottom: pxrem(100px);
      cursor: pointer;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .opinion-detail {
    width: 100%;
    height: 100%;
    position: relative;
    padding: pxrem(100px) pxrem(60px) 0;
    iframe {
      width: 100%;
      height: 100%;
    }
    .back {
      width: pxrem(44px);
      height: pxrem(44px);
      position: absolute;
      top: 0;
      left: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }
}
</style>