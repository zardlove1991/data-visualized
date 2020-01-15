<template>
  <div class="common01-heatmap">
    <div class="heatmap-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '用户热力图'}}</div>
      <div class="wrap-content flex">
        <div class="heat-map flex-one">

        </div>
        <div class="user-info">
          <div class="user-label flex flex-center common01-ft40"><div class="user-icon"></div>省内用户TOP5</div>
          <div class="" v-for="(item, index) in provinceList" :key="index">
            <span>{{item.name}}</span>
          </div>
          <div class="user-label flex flex-center common01-ft40"><div class="user-icon"></div>国内前三占比</div>
          <div class="">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'userHeatmap',
  data () {
    return {
      frequency: 15000,
      provinceList: [{
        count: 12,
        name: '123'
      }, {
        count: 12,
        name: '123'
      }, {
        count: 12,
        name: '123'
      }, {
        count: 12,
        name: '123'
      }, {
        count: 12,
        name: '123'
      }]
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-heatmap {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  color: #fff;
  .heatmap-wrap {
    padding: pxrem(200px) pxrem(96px) pxrem(80px) pxrem(78px);
    color: #fff;
    .heat-map{
      width: 100%;
      height: 100%;
      background: url("./assets/back.png") no-repeat center;
      background-size: 100% 100%;
    }
    .user-info{
      width: pxrem(530px);
      padding: pxrem(40px);
    }
    .user-label{
      color: #49F1DF;
      font-size: pxrem(34px);
      .user-icon{
        width: pxrem(36px);
        height: pxrem(33px);
        background: url('./assets/tip.png');
        background-size: 100%;
        margin-right: pxrem(12px);
      }
    }
  }
}
</style>
