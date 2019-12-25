<template>
  <div class="common01-newarticle">
    <div class="newarticle-wrap common01-border">
      <div class="common01-title">最新稿件</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="title common01-ft40 overhidden">{{v.title}}</div>
          <div class="source common01-ft32">{{v.source}}</div>
          <div class="time common01-ft32">{{v.create_time.replace('T', ' ').slice(5)}}</div>
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
      getNewArticleList().then(res => {
        if (!res.data.error_code) {
          this.list = res.data.result
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
@import '~@/styles/index.scss';
.common01-newarticle {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .newarticle-wrap {
    padding: pxrem(250px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(90px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          text-align: left;
          width: 72%;
        }
        .source {
          margin: 0 pxrem(98px) 0 auto;
        }
      }
    }
  }
}
.common01-border {
  width: 100%;
  height: 100%;
  background: url("../../../../assets/common/common01Border.png") no-repeat center;
  background-size: 100% 100%;
  position: relative;
}
.common01-title {
  font-size: pxrem(58px);
  font-weight: 500;
  text-shadow: 0 pxrem(16px) pxrem(16px) rgba(0, 222, 255, 0.2);
  position: absolute;
  top: pxrem(54px);
  left: pxrem(72px);
}
.common01-ft40 {
  font-size: pxrem(40px);
}
.common01-ft32 {
  font-size: pxrem(32px);
}
.common01-ft30 {
  font-size: pxrem(30px);
}
</style>
