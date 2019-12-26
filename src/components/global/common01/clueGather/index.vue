<template>
  <div class="common01-cluegather">
    <div class="cluegather-wrap common01-border">
      <div class="common01-title">线索汇聚</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="title common01-ft40 overhidden">{{v.title}}</div>
          <div class="source common01-ft32">{{v.source}}</div>
          <div class="read common01-ft32 sys-flex sys-flex-center">
            <img src="../../../../assets/common/time.png" />
            <span>{{v.date.slice(5, 16)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { getHotsNewsList } from '@/servers/interface'
import { getCluesTogether } from '@/servers/interface'
export default {
  name: 'clueGather',
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      dataList: []
    }
  },
  created () {
    this.getCluesTogether()
    setInterval(() => {
      this.getCluesTogether()
    }, this.frequency)
  },
  methods: {
    getCluesTogether () {
      getCluesTogether('website', 5, this.page).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data
            }, 100)
            if (this.isPaging) {
              this.page += 1
              if (this.page > this.maxPage) {
                this.page = 1
              }
            }
          } else {
            if (this.page !== 1) {
              this.page = 1
              this.getCluesTogether()
            }
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
.common01-cluegather {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .cluegather-wrap {
    padding: pxrem(250px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(90px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          width: 60%;
          text-align: left;
        }
        .read {
          img {
            width: pxrem(30px);
            height: pxrem(30px);
            margin-right: pxrem(18px);
          }
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
</style>