<template>
  <div class="common01-report">
    <div class="report-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '城南区微信矩阵'}}</div>
      <div class="wrap-content">
          <div class="title sys-flex sys-flex-center flex-justify-center">公众号：<span> 23</span></div>
          <div class="list sys-flex flex-justify-between sys-flex-wrap">
              <div class="list-item sys-flex sys-vertical flex-justify-center sys-flex-center" v-for="(item,i) in list" :key="i">
                  <img class="avatar" src="" alt="">
                  <p class="list-title">{{item.name}}</p>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'wechatMatrix',
  data () {
    return {
      list: [{name: '黄海发布', num: 100}, {name: '千年珠溪', num: 100}, {name: '幸福新都', num: 100}, {name: '新河街道', num: 100}, {name: '城南财政', num: 100}, {name: '城南社保', num: 100}, {name: '城南教育发布', num: 100}, {name: '城南清风', num: 100}, {name: '青春盐南', num: 100}, {name: '盐城盐南公安', num: 100}, {name: '平安盐南', num: 100}, {name: '城南高新区河长办', num: 100}]
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-report {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .report-wrap {
      padding: pxrem(180px) pxrem(100px) 0;
      .title{
        width: 100%;
        height: pxrem(145px);
        line-height: pxrem(145px);
        font-size: pxrem(40px);
        color: #fff;
        border: 1px solid red;
        span{
          font-size: pxrem(74px);
          color: #00F6FF;
        }
      }
      .list{
            width: 100%;
            padding-top: pxrem(60px);
            .list-item{
                width: 16.6%;
                height: pxrem(280px);
                .avatar{
                    width: pxrem(150px);
                    height: pxrem(150px);
                    margin-bottom: pxrem(28px);
                    border: 1px solid red;
                }
                p.list-title{
                    font-size: pxrem(34px);
                    color: #fff;
                }
            }
      }
  }
}
</style>
