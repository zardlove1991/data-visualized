<template>
  <div class="common01-web">
      <div class="toutiao-wrap common01-border">
        <div class="common01-title">城南聚焦</div>
        <div class="list">
            <div class="list-item sys-flex animated" v-for="(item,k) in list" :key="k" :class="{'flipInX' : item.title}" :style="{'animation-delay' : k/2+'s'}">
                <div class="list-right sys-flex sys-vertical flex-justify-center">
                    <div class="title overhidden">{{item.title}}</div>
                    <div class="info">
                        <span class="source">{{item.project_user_name}}</span>
                        <span>{{item.update_time | dateFormat}}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import { getWorkCallReportList } from '@/servers/interface'
export default {
  name: 'chengnan',
  data () {
    return {
      list: [],
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      customSize: false
    }
  },
  created () {
    this.getList()
    setInterval(() => {
      this.getList()
    }, this.frequency)
  },
  methods: {
    getList () {
      getWorkCallReportList(7, this.page, this.currentViewId).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.list = []
            setTimeout(() => {
              this.list = res.data.result.data
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
              this.getList()
            }
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
.common01-web {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .toutiao-wrap{
      padding: pxrem(200px) pxrem(72px) pxrem(72px);
     .list{
        height: 100%;
        .list-item{
            height: pxrem(218px);
            margin-bottom: pxrem(44px);
            background-color: rgb(3,45,123);
            &:last-of-type {
              margin-bottom: 0;
            }
            .list-right{
                padding: pxrem(40px) 0;
                padding-left: pxrem(78px);
                text-align: left;
                .title{
                    color: #fff;
                    font-size: pxrem(44px);
                    flex: 1;
                }
                .info{
                    padding-top: pxrem(20px);
                    color: #00C0FF;
                    font-size: pxrem(32px);
                    .source{
                        margin-right: pxrem(40px);
                    }
                }
            }
        }
     }
  }
}
</style>
