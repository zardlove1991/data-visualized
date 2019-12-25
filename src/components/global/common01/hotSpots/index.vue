<template>
  <div class="common-hotspots ">
    <div class="hotspots-page common01-border">
	    <div class="title">市县热点</div>
	    <div class="tab-line">
	      <div class="tabs-item" :class="{'active': active === 'chifeng'}" @click="changeTab('chifeng')">赤峰</div>
	      <div class="tabs-item" :class="{'active': active === 'wulan'}" @click="changeTab('wulan')">乌兰察布</div>
	    </div>
	    <div class="hot-list">
	      <div class="list-item flex">
	        <div class="list-title flex-one">
	        	半世纪以前人类对2020年的想象，与现实相比，差距有多大？
	        </div>
	        <div class="list-viewer flex">
	          <div class="img-icon">
	          	<img src="@/assets/common/reader.png" />
	          </div>
	        12345</div>
	        <div class="list-time flex">
	           <div class="img-icon">
	          	<img src="@/assets/common/reader.png" />
	          </div>
	        12345</div>
	      </div>
	      <div class="list-item flex">
	        <div class="list-title flex-one">
	        	半世纪以前人类对2020年的想象，与现实相比，差距有多大？
	        </div>
	        <div class="list-viewer flex">
	          <div class="img-icon">
	          	<img src="@/assets/common/reader.png" />
	          </div>
	        12345</div>
	        <div class="list-time flex">
	           <div class="img-icon">
	          	<img src="@/assets/common/reader.png" />
	          </div>
	        12345</div>
	      </div>
	    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'chifeng'
    }
  },
  methods: {
    changeTab (item) {
      this.active = item
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
		  margin-right:0.71rem;
		  align-items:center;
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
		  margin-right:1.12rem;
		  text-align:left;
		}
	}
}

</style>
