<template>
  <div class="lishui-opinion">
    <div class="opinion-wrap" v-if="!showDetail">
      <div class="wrap-list sys-flex sys-flex-center flex-justify-between" @click="showContentDetail(v)" v-for="(v, k) in dataList" :key="k">
        <div class="title overhidden">{{v.title}}</div>
        <div class="time sys-flex sys-flex-center">
          <img src="../manuscriptOutput/assets/time.png" />
          <span>{{v.time}}</span>
        </div>
      </div>
    </div>
    <div class="opinion-detail" v-if="showDetail">
      <div class="detail-title sys-flex sys-flex-center">
        <div class="back" @click="backList">
          <img src="./assets/back.png" />
        </div>
        <div class="title">{{detail.title}}</div>
      </div>
      <div class="detail-content">
        <div>{{detail.content}}</div>
        <div v-if="detail.imgs && detail.imgs[0]" class="imgs">
          <img :src="v" v-for="(v, k) in detail.imgs" :key="k" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'opinion',
  data () {
    return {
      detail: {},
      showDetail: false,
      dataList: [{
        title: '栖凤北路路况',
        time: '2020-01-13 04:12',
        content: '栖凤北路红绿灯路口路面好长时间没有修复，大概有4个月了，存在安全隐患。',
        imgs: ['http://cdnapp.ls114.cn/pic/20200113/1578859801213837_977.jpg', 'http://cdnapp.ls114.cn/pic/20200113/1578859801229212_334.jpg'],
        url: 'http://www.ls114.cn/thread-486764-1-1.html'
      }, {
        title: '关于福田社区蝉山村新农村建设村容村貌的疑问',
        time: '2020-01-11 09:35',
        content: '2019年10月份溧水区响应中央文件精神，花巨资对开发区福田社区蝉山村的村容村貌的进行了整治，当时使村里的环境焕然一新，可这次回村却发现村里的环境又恢复到了整治前的那样一塌糊涂，建筑垃圾，生活垃圾到处堆放无人清理，村里的道路两边护栏被损坏无人修补，触目惊心，当初耗费钱财人力去做整治为了应付领导的视察，可领导视察完后福田社区和蝉村委会就不管不问，请问福田社区和村委会的各位领导你们就是如此应付工作的吗？财政拨款的资金到底被你们如此挥霍，你们不觉得可耻和浪费吗？请福田社区的领导不要整天在办公室喝茶聊天玩手机了到村上去实地走访看下吧，毕竟福田社区办公场所就在蝉山村进村口，把图片晒出来给你们领导看看吧，你们这是为人民办事吗',
        imgs: ['http://cdnapp.ls114.cn/pic/20200111/157868361476795994.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683615577206731.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683616344884458.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683617172663762.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683618000944423.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683618798217263.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683679889084419.jpg'],
        url: 'http://www.ls114.cn/thread-486608-1-1.html'
      }, {
        title: '树枝已段，非常有安全隐患，无人管理',
        time: '2020-01-11 10:42',
        content: '洪兰吕家边一进村有棵大树，树下是停车场，大树由于年数较多，一个大树枝已断裂，经常砸到停放在下面的车辆，人来人去非常危险。村里领导不管不问，请有关部门尽快协调处理，不要等出了人命了再处理。',
        imgs: ['http://cdnapp.ls114.cn/pic/20200111/1578732881702485_87.jpg'],
        url: 'http://www.ls114.cn/thread-486670-1-1.html'
      }, {
        title: '石山公园的蓝球架，有架无板',
        time: '2020-01-13 13:32',
        content: '石湫政府领导，请求领导百忙之中，过问一下石山公园的蓝球架，有架无板了，是因为前不久学生打球所致，盼近期修复，谢谢',
        url: 'http://www.ls114.cn/thread-486838-1-1.html'
      }, {
        title: '请问开发区沙河村的过渡费什么时候发？',
        time: '2020-01-13 10:44',
        content: '永阳镇都发了，开发区什么时候发？年前还能不能发？',
        url: 'http://www.ls114.cn/thread-486820-1-1.html'
      }, {
        title: '请问秋湖嘉苑一期何时能领房产证',
        time: '2020-01-13 12:14',
        content: '请问秋湖嘉苑一期何时能领房产证',
        url: 'http://www.ls114.cn/thread-486827-1-1.html'
      }, {
        title: '轻轨溧水站西面的小吃街',
        time: '2020-01-06 14:23',
        content: '轻轨溧水站旁边的小吃街怎幺没动静了？',
        url: 'http://www.lsxww.net/thread-61775-1-1.html'
      }, {
        title: '荷花嘉苑地下车库太脏',
        time: '2019-12-29 09:55',
        content: '荷花嘉苑地下车库，通道路面破损严重，垃圾常年无人打扫。车库地面灰尘垃圾十分恶心。电梯通道蜘蛛撞头。电灯不亮。快过年了，恳请相关领导和社区关心。让百姓干干净净过年。',
        url: 'http://www.lsxww.net/thread-61795-1-1.html'
      }, {
        title: '广成北门车库作为商铺严重影响小区环境和治安',
        time: '2019-10-31 21:29',
        content: '广成北门91栋、92栋、93栋的一楼车库现在大批量的被改造成为服装店、水果店、美容店等等。这些车库改造成为商铺危害如下：一、没有营业执照，商品质量无保证，属于无证经营。恳请工商局领导好好查查这些无证经营的店铺。二、影响居民夜间休息，很多服装店一直到十点十一点还灯火通明，在楼下大声喧哗，严重影响居民正常休息。三、影响小区交通，本来广成作为老小区，停车压力巨大，这些商铺吸引了顾客来，很多顾客直接把车停在车库门口或者道路上，导致其他车辆出入堵塞。四、影响小区治安，很多不属于本小区的人经常以光顾店铺为名在小区游荡，对居民的财产安全存在重大隐患。五、消防隐患重大。这些店铺没有通风设施，没有安全通道，一旦发生火灾，后果不堪设想，甚至对整栋楼的住户都构成威胁。综上所述，希望永阳街道的领导能够结合相关部门针对这些车库商铺进行一次重点整顿，必须清除这些重大隐患，还居民一片安静、安全、安心。',
        url: 'http://www.lsxww.net/thread-60422-1-1.html'
      }, {
        title: '强烈建议，天鸿国际到机场路改为单向一车道',
        time: '2020-01-13 08:33',
        content: '改为单向一车道双向两车道后 ，司机们才有更多的时间看花坛风景，理解设计者的苦衷',
        url: 'http://www.ls114.cn/thread-486786-1-1.html'
      }]
    }
  },
  methods: {
    showContentDetail (value) {
      this.showDetail = true
      this.detail = value
    },
    backList () {
      this.showDetail = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-opinion {
  width: 100%;
  height: 100%;
  padding: pxrem(33px) pxrem(26px) pxrem(53px) pxrem(50px);
  color: #fff;
  .opinion-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: pxrem(150px) pxrem(100px) pxrem(50px);
    .wrap-list {
      font-size: pxrem(40px);
      margin-bottom: pxrem(22px);
      cursor: pointer;
      &:last-child {
        margin-bottom: 0;
      }
      .title {
        width: 70%;
        text-align: left;
      }
      .time {
        font-size: pxrem(36px);
        img {
          width: pxrem(30px);
          height: pxrem(30px);
          object-fit: cover;
          margin-right: pxrem(18px);
        }
      }
    }
  }
  .opinion-detail {
    width: 100%;
    height: 100%;
    padding: pxrem(50px) pxrem(60px) 0;
    .detail-title {
      padding-bottom: pxrem(20px);
      border-bottom: pxrem(2px) dashed #00EAFF;
      .back {
        width: pxrem(44px);
        height: pxrem(44px);
        cursor: pointer;
        margin-right: pxrem(20px);
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }
      .title {
        font-size: pxrem(50px);
        font-weight: bold;
      }
    }
    .detail-content {
      width: 100%;
      height: pxrem(800px);
      font-size: pxrem(36px);
      margin-top: pxrem(40px);
      overflow-y: scroll;
      text-align: left;
      img {
        width: 100%;
        margin-top: pxrem(20px);
      }
    }
  }
}
</style>
