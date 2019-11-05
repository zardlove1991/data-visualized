<template>
  <div class="lishui-manuscriptoutput" id="lishui-manuscriptoutput">
    <div class="manuscriptoutput-wrap">
      <div class="wrap-list sys-flex sys-flex-center animated" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2 + 's'}" v-for="(v, k) in dataList" :key="k">
        <div class="list-status sys-flex sys-flex-center">
          <img v-if="k === 0" src="./assets/new.png" />
          <span v-if="k !== 0">【{{v.typeName}}】</span>
        </div>
        <div class="list-text overhidden">{{v.title}}</div>
        <div class="list-time list-span sys-flex sys-flex-center">
          <img src="./assets/time.png" />
          <span>{{v.publish_time}}</span>
        </div>
        <div class="list-read list-span sys-flex sys-flex-center">
          <img src="./assets/read.png" />
          <span>{{v.click_num}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticleList } from '@/servers/lishui'
export default {
  name: 'manuscriptOutput',
  data () {
    return {
      dataList: [],
      page: 1
    }
  },
  mounted () {
    this.setFontsize('lishui-manuscriptoutput')
  },
  created () {
    this.getArticleList()
    setInterval(() => {
      this.getArticleList()
    }, 25000)
  },
  methods: {
    getArticleList () {
      getArticleList(this.page, 5).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = res.data.result
          }, 100)
          this.dataList.forEach(val => {
            switch (val.type) {
              case 'article':
                val.typeName = '文稿'
                break
              case 'gallery':
                val.typeName = '图集'
                break
              case 'topic':
                val.typeName = '专题'
                break
              case 'link':
                val.typeName = '外链'
                break
              case 'video':
                val.typeName = '视频'
                break
              default:
                break
            }
          })
          if (res.data.result.length < 5) {
            this.page = 1
          } else {
            this.page += 1
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-manuscriptoutput {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .manuscriptoutput-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    padding: px2em(210px) px2em(128px) px2em(130px) px2em(96px);
    color: #fff;
    .wrap-list {
      margin-bottom: px2em(95px);
      &:last-of-type {
        margin-bottom: 0;
      }
      .list-status {
        span {
          font-size: px2em(38px);
          color: #0AFBF2;
        }
        img {
          width: px2em(107px);
          height: px2em(48px);
          margin: 0 px2em(20px);
        }
      }
      .list-text {
        font-size: px2em(38px);
      }
      .list-span {
        span {
          font-size: px2em(32px);
          color: #FEFEFF;
        }
      }
      .list-time {
        margin: 0 px2em(70px) 0 auto;
        img {
          width: px2em(30px);
          height: px2em(30px);
          margin-right: px2em(20px);
        }
      }
      .list-read {
        img {
          width: px2em(42px);
          height: px2em(30px);
          margin-right: px2em(20px);
        }
      }
    }
  }
}
</style>