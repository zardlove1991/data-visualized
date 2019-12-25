<template>
  <div class="common-cluegather ">
    <div class="manuscript-page common01-border">
	    <div class="title">稿件生产</div>
	    <div class="report-list">
	      <div class="list-item flex">
	        <div class="type-area">【文稿】</div>
	        <div class="list-title flex-one">
	          地球碳循环已经严重失衡，我们正身处一个物种大灭
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
}
</script>

<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common-cluegather{
	.manuscript-page{
		padding:0 0.7rem;
		.title{
		  color:#fff;
		  font-size:0.58rem;
		  text-align:left;
		  padding-top:0.53rem;
		  margin-bottom:1.30rem;
		}
		.report-list{
		  padding:0 0.26rem;
		  font-size:0.38rem;
		}
		.list-item{
		  margin-bottom:1.11rem;
		  align-items:center;
		}
		.type-area{
		  color:#0AFBF2;
		  font-size:0.38rem;
		}
		.list-title{
		  color:#fff;
		  font-size:0.38rem;
		  margin-right:1.12rem;
		  text-align:left;
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
		
	}
}

</style>
