<template>
  <div class="common-operatedata01">
    <div class="operatedata01-wrap common01-border">
      <div class="common01-title">运营数据</div>
      <div class="wrap-content sys-flex">
        <div class="icon-box">
          <div class="wechat img-box">
            <img :src="currentIndex === 0 ? wechat02 : wechat01" />
          </div>
          <div class="app img-box">
            <img :src="currentIndex === 1 ? app02 : app01" />
          </div>
        </div>
        <div class="data-list sys-flex-one">
          <div class="title sys-flex sys-flex-center common01-ft36">
            <div v-for="(v, k) in titleList" :key="k">{{v}}</div>
          </div>
          <div class="body sys-flex sys-flex-center common01-ft38" v-for="(v, k) in dataList" :key="k">
            <div class="img-title sys-flex sys-flex-center flex-justify-center">
              <img :src="v.img" />
              <span>{{v.title}}</span>
            </div>
            <div class="one">{{v.one}}</div>
            <div class="two">{{v.two}}</div>
            <div class="three">{{v.three}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'clueGather',
  data () {
    return {
      currentIndex: 0,
      wechat01: require('./assets/wechat01.png'),
      wechat02: require('./assets/wechat02.png'),
      app01: require('./assets/app01.png'),
      app02: require('./assets/app02.png'),
      titleList: ['名称', '安装量', '注册用户', '日活量'],
      dataList: [{
        img: 'http://dmimg.5054399.com/allimg/pkm/pk/22.jpg',
        title: '智慧翁牛特',
        one: 32102145,
        two: 32102145,
        three: 32102145
      }, {
        img: 'http://dmimg.5054399.com/allimg/pkm/pk/22.jpg',
        title: '智慧翁牛特',
        one: 32102145,
        two: 32102145,
        three: 32102145
      }, {
        img: 'http://dmimg.5054399.com/allimg/pkm/pk/22.jpg',
        title: '智慧翁牛特',
        one: 32102145,
        two: 32102145,
        three: 32102145
      }, {
        img: 'http://dmimg.5054399.com/allimg/pkm/pk/22.jpg',
        title: '智慧翁牛特',
        one: 32102145,
        two: 32102145,
        three: 32102145
      }, {
        img: 'http://dmimg.5054399.com/allimg/pkm/pk/22.jpg',
        title: '智慧翁牛特',
        one: 32102145,
        two: 32102145,
        three: 32102145
      }]
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/global/index.scss';
.common-operatedata01 {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .operatedata01-wrap {
    padding: pxrem(183px) pxrem(72px) pxrem(74px) pxrem(82px);
    color: #fff;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .wrap-content {
      .icon-box {
        margin-right: pxrem(36px);
        .wechat {
          margin-bottom: pxrem(40px);
        }
        .img-box {
          width: pxrem(150px);
          height: pxrem(150px);
        }
      }
      .data-list {
        width: 100%;
        .title {
          height: pxrem(90px);
          background: #0F4BB1;
          color: #00EAFF;
          div {
            width: 25%;
          }
        }
        .body {
          height: pxrem(130px);
          &:nth-of-type(odd) {
            background: #103D95;
          }
          &:nth-of-type(even) {
            background: #10398C;
          }
          div {
            width: 25%;
          }
          .img-title {
            img {
              width: pxrem(75px);
              height: pxrem(75px);
              border-radius: 50%;
              margin-right: pxrem(20px);
            }
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
.common01-ft38 {
  font-size: pxrem(38px);
}
.common01-ft36 {
  font-size: pxrem(36px);
}
.common01-ft32 {
  font-size: pxrem(32px);
}
</style>