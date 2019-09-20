<template>
  <div class="xy-news" id="xy-news">
    <div class="news-wrap sys-flex sys-vertical">
      <div class="news-title">{{newsTitle}}</div>
      <div class="title-list sys-flex sys-flex-center">
        <div class="list-item sys-flex sys-flex-center flex-justify-center" v-for="(v,k) in titleList" :key="k" :class="{'active': currentIndex === k}">
          {{v.name}}
        </div>
      </div>
      <div
        class="news-list animated sys-flex sys-flex-center overhidden"
        :class="{'flipInX' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div 
          class="list-icon"
          :class="{'bgzero': k === 0, 'bgfir': k === 1, 'bgsec': k === 2, 'bgthi': k === 3}"
        >{{k+1}}</div>
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-number sys-flex sys-flex-center flex-justify-center">
          <img class="list-number-icon" src="./assets/read.png" alt="">
          <span class="list-number-text">{{v.click_number}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRankList, getRankCommentList } from '@/servers/xinyi'
export default {
  name: 'news',
  data () {
    return {
      newsTitle: '稿件排行',
      titleList: [{
        name: '阅读量',
        type: 0
      }, {
        name: '评论',
        type: 1
      }],
      currentIndex: 0,
      list: [],
      dataList: [],
      count: 0
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
    this.setFontsize('xy-news')
  },
  methods: {
    getData (type) {
      this.dataList = []
      if (type === 0) {
        getRankList().then(res => {
          // if (res && res.data && res.data.data) {
          //   this.dataList = res.data.data.slice(0, 4)
          // }

          // 接口没有数据，模拟数据
          this.dataList = [
            {
              title: '江苏新沂市局(分公司)利用共享汽车提高市场走访效率小记',
              click_number: 785
            },
            {
              title: '新沂市人民检察院上线运行“公益生态监测平台',
              click_number: 694
            },
            {
              title: '新沂市总工会平安志愿者服务站,积极开展平安创建工作',
              click_number: 603
            },
            {
              title: '江苏新沂市统战部部长周树兵被查:涉嫌严重违纪违法',
              click_number: 544
            }
          ]
        })
      } else if (type === 1) {
        getRankCommentList().then(res => {
          // if (res && res.data && res.data.data) {
          //   this.dataList = res.data.data.slice(0, 4)
          // }

          // 接口没有数据，模拟数据
          this.dataList = [
            {
              title: '新沂市中医医院搬迁公告',
              click_number: 985
            },
            {
              title: '苏北小城新沂市房价六千左右,未来价格还能涨吗?',
              click_number: 842
            },
            {
              title: '746亩,10月份徐州新沂市乡镇拆迁又来了,看看有没有你村?',
              click_number: 763
            },
            {
              title: '2019徐州新沂市劳务派遣教师招聘600名公告',
              click_number: 684
            }
          ]
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-news {
  width: 100%;
  padding: 0.25vh 0.5vw;
  .news-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: px1em(17px) px1em(11px);
  }
  .news-title {
    text-align: left;
    font-size: px1em(22px);
     margin-bottom: px1em(5px);
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
      font-size: px1em(17px);
      color: #d6e6ff;
      background: url('./assets/news-btn.png') no-repeat center;
      background-size: 100%;
    }
    .active {
      background: url('./assets/news-active-btn.png') no-repeat center;
      background-size: 100%;
    }
  }
  .news-list {
    height: 20%;
    padding: 0.2em;
    color: #d6e6ff;
    background: url('./assets/user-list-bg.png') no-repeat center;
    background-size: 100%;
    .list-icon {
      width: px1em(50px);
      height: px1em(50px);
      line-height: px1em(50px);
      font-size: px1em(18.5px);
      margin-right: px1em(18.5px);
      text-align: center;
    }
    .bgzero {
      background-color: #3f8aff;
    }
    .bgfir {
      background-color: #fc8e26;
    }
    .bgsec {
      background-color: #9f60ec;
    }
    .bgthi {
      background-color: #1f56ab;
    }
    .list-title {
      flex: 1;
      font-size: px1em(18.5px);
      text-align: left;
    }
    .list-number {
      flex-basis: 20%;
      color: rgba(243, 248, 254, 0.5);
      .list-number-icon {
        font-size: px1em(14px);
        width: px1em(40px);
        height: px1em(40px);
        margin-right: px1em(10px);
      }
      .list-number-text {
        font-size: px1em(14px) !important;
      }
    }
  }
}
</style>
