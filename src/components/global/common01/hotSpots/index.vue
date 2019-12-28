<template>
  <div class="common-hotspots ">
    <div class="hotspots-page common01-border">
      <div class="common01-title">市县热点</div>
	    <div class="tab-line">
	      <div class="tabs-item common01-ft42" :class="{'active': active === 'chifeng'}" @click="changeTab('chifeng')">赤峰</div>
	      <div class="tabs-item common01-ft42" :class="{'active': active === 'wulan'}" @click="changeTab('wulan')">乌兰察布</div>
	    </div>
	    <div class="hot-list">
	      <div class="list-item flex sys-flex-center animated"
	        :class="{'flipInX' : v.title}"
          :style="{'animation-delay' : k/2 + 's'}"
          v-for="(v, k) in dataList">
	        <div class="list-title overhidden common01-ft38 flex-one">
	        	{{v.title}}
	        </div>
	        <div class="list-viewer flex">
            <img class="img-icon" src="@/assets/common/reader.png" />
            <span class="common01-ft32">{{v.click_num}}</span></div>
	        <div class="list-time flex">
            <img class="img-icon" src="@/assets/common/reader.png" />
            <span class="common01-ft32">{{v.publish_time.slice(5, 16)}}</span>
	        </div>
	      </div>
	    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'chifeng',
      dataList: [],
      chiList: [{
        typeName: '文稿',
        title: '刷脸取件被小学生“破解”！丰巢紧急下线',
        click_num: 111,
        publish_time: '2019-10-12 12:13'
      }, {
        typeName: '图集',
        title: '手绘长卷:今年总书记这10个妙喻深入人心',
        click_num: 1211,
        publish_time: '2019-10-21 12:13'
      }, {
        typeName: '专题',
        title: '2020年起，这些新规将影响你我生活！',
        click_num: 1211,
        publish_time: '2019-10-20 12:13'
      }, {
        typeName: '视频',
        title: '变害为利 造福人民——习近平生态文明思想在福建木兰溪的先行探索',
        click_num: 1211,
        publish_time: '2019-10-18 12:13'
      }, {
        typeName: '图集',
        title: '国家市场监管总局：明年食品安全抽检合格率要达到98%',
        click_num: 1211,
        publish_time: '2019-10-02 12:13'
      }],
      wulanList: [{
        typeName: '文稿',
        title: '刷脸取件被小学生“破解”！丰巢紧急下线',
        click_num: 111,
        publish_time: '2019-10-12 12:13'
      }, {
        typeName: '图集',
        title: '手绘长卷:今年总书记这10个妙喻深入人心',
        click_num: 1211,
        publish_time: '2019-10-21 12:13'
      }, {
        typeName: '专题',
        title: '2020年起，这些新规将影响你我生活！',
        click_num: 1211,
        publish_time: '2019-10-20 12:13'
      }, {
        typeName: '视频',
        title: '变害为利 造福人民——习近平生态文明思想在福建木兰溪的先行探索',
        click_num: 1211,
        publish_time: '2019-10-18 12:13'
      }, {
        typeName: '图集',
        title: '国家市场监管总局：明年食品安全抽检合格率要达到98%',
        click_num: 1211,
        publish_time: '2019-10-02 12:13'
      }]
    }
  },
  created () {
    this.dataList = this.chiList
  },
  methods: {
    changeTab (item) {
      this.active = item
      this.dataList = []
      if (this.active === 'wulan') {
        this.dataList = this.wulanList
      } else {
        this.dataList = []
        this.dataList = this.chiList
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common-hotspots{
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
	.hotspots-page{
    padding: pxrem(130px) pxrem(96px) pxrem(95px) pxrem(78px);
		.tab-line{
		  margin-top:0.16rem;
		  text-align:center;
		  margin-bottom:0.7rem;
		  .tabs-item{
		    height:0.9rem;
		    line-height:0.9rem;
		    background: url("../../../../assets/common/tabsborder.png") no-repeat center;
		    width:3.2rem;
		    background-size: 100% 100%;
		    color:#fff;
		    text-align:center;
		    display:inline-block;
		  }
		  .active{
		    background-color:#02D2FF;
		  }
		}
		.list-item{
		  margin-bottom:1.2rem;
		}
		.list-viewer{
		  color:#fff;
		  align-items:center;
		  width:10%;
		}
		.list-time{
		  color:#fff;
		  align-items:center;
		}
		.img-icon{
		  width:0.42rem;
		  height:0.3rem;
		  margin-right:0.2rem;
		}
		.list-title{
		  color:#fff;
		  text-align:left;
		}
	}
}

</style>
