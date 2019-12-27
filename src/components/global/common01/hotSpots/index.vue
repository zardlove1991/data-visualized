<template>
  <div class="common-hotspots ">
    <div class="hotspots-page common01-border">
	    <div class="title">市县热点</div>
	    <div class="tab-line">
	      <div class="tabs-item" :class="{'active': active === 'chifeng'}" @click="changeTab('chifeng')">赤峰</div>
	      <div class="tabs-item" :class="{'active': active === 'wulan'}" @click="changeTab('wulan')">乌兰察布</div>
	    </div>
	    <div class="hot-list">
	      <div class="list-item flex sys-flex-center animated"
	        :class="{'flipInX' : v.title}"
          :style="{'animation-delay' : k/2 + 's'}" 
          v-for="(v, k) in dataList">
	        <div class="list-title overhidden">
	        	{{v.title}}
	        </div>
	        <div class="list-viewer flex">
	          <div class="img-icon">
	          	<img src="@/assets/common/reader.png" />
	          </div>
	        {{v.click_num}}</div>
	        <div class="list-time flex">
	           <div class="img-icon">
	          	<img src="@/assets/common/reader.png" />
	          </div>
	        {{v.publish_time.slice(5, 16)}}</div>
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
	.hotspots-page{
		padding:0 0.7rem;
		.title{
		  color:#fff;
		  font-size:0.58rem;
		  text-align:left;
		  padding-top:0.53rem;
		  margin-bottom:0.9rem;
		}
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
		    font-size:0.42rem;
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
		  font-size:0.32rem;
		  color:#fff;
		  align-items:center;
		  width:10%;
		}
		.list-time{
		  font-size:0.32rem;
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
		  font-size:0.38rem;
		  width:75%;
		  text-align:left;
		}
	}
}

</style>
