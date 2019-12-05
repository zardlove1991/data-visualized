<template>
  <div class="jn-agency">
    <div class="agency-wrap">
      <div class="wrap-title">新华社</div>
      <div class="wrap-content">
        <div class="content-total">共<span>{{total}}</span>条</div>
        <div class="content-list">
          <div class="list-box sys-flex sys-flex-center flex-justify-between animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" v-bind:style="{'animation-delay' : k/2+'s'}">
            <div class="title overhidden">{{v.title}}</div>
            <div class="time">{{v.create_time.slice(5)}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getM2OPLUSArticleList } from '@/servers/interface'
export default {
  name: 'newsAgency',
  data () {
    return {
      count: 5,
      page: 1,
      total: 0,
      dataList: []
    }
  },
  created () {
    this.getM2OPLUSArticleList()
    setInterval(() => {
      this.getM2OPLUSArticleList()
    }, 10000)
  },
  methods: {
    getM2OPLUSArticleList () {
      getM2OPLUSArticleList(this.count, this.page).then(res => {
        if (!res.data.error_code) {
          this.total = res.data.result.total
          this.dataList = []
          setTimeout(() => {
            this.dataList = res.data.result.data
          }, 100)
          if (res.data.result.data.length < 5) {
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
@import "src/styles/index.scss";
.jn-agency {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .agency-wrap {
    width: 100%;
    height: 100%;
    background: url('../../../../assets/common/border@2x.png') no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(30px);
    color: #fff;
    .wrap-title {
      font-size: pxrem(50px);
      font-weight: 600;
      margin-top: pxrem(-16px);
    }
    .wrap-content {
      .content-total {
        font-size: pxrem(36px);
        text-align: left;
        margin-bottom: pxrem(40px);
        padding-left: pxrem(20px);
        span {
          color: #00F6FF;
          margin: 0 pxrem(8px);
        }
      }
      .content-list {
        .list-box {
          width: 100%;
          height: pxrem(140px);
          background-color: #0B295E;
          margin-bottom: pxrem(30px);
          padding: 0 pxrem(36px);
          &:last-of-type {
            margin-bottom: 0;
          }
          .title {
            font-size: pxrem(40px);
          }
          .time {
            font-size: pxrem(34px);
          }
        }
      }
    }
  }
}
</style>