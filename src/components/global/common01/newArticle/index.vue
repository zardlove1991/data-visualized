<template>
  <div class="common01-newarticle">
    <div class="newarticle-wrap common01-border">
      <div class="common01-title">最新稿件</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="title common01-ft40 overhidden">{{v.title}}</div>
          <div class="source common01-ft32 overhidden">{{v.source}}</div>
          <div class="time common01-ft32">{{v.create_time.slice(5, 16)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getNewArticleList } from '@/servers/interface'
export default {
  name: 'newArticle',
  data () {
    return {
      frequency: 15000,
      count: 0,
      dataList: []
    }
  },
  created () {
    this.getNewArticleList()
  },
  methods: {
    getNewArticleList () {
      if (this.countNum) {
        this.dataList = []
        clearInterval(this.countNum)
        this.count = 0
      }
      getNewArticleList(this.currentViewId).then(res => {
        if (!res.data.error_code) {
          this.list = res.data.result.data
          this.initList()
        }
      })
    },
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
          this.getNewArticleList()
        }
      }, this.frequency)
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-newarticle {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .newarticle-wrap {
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(80px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          text-align: left;
          width: 55%;
        }
        .source {
          width: 15%;
          text-align: left;
          margin: 0 pxrem(58px) 0 auto;
        }
      }
    }
  }
}
</style>
