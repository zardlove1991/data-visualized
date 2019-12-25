<template>
  <div class="common-personRank ">
    <div class="personRank-page common01-border">
	    <div class="title">个人排行</div>
	   	<div class="rank-list">
	   	  <div class="list-item">
	   	    <div class="flex item-detail">
	   	    	<div class="item-index index-1">1</div>
	   	    	<div class="flex-one person-info flex">
	   	    	  <div class="person-avatar"></div>
	   	    	  <div class="person-name">张良</div>
	   	    	</div>
	   	    	<div class="item-num">
	   	    	  <div class="num">11</div>
	   	    	  <span class="num-label">条</span></div>
	   	    </div>
	   	  </div>
	   	  <div class="list-item">
	   	    <div class="flex item-detail">
	   	    	<div class="item-index index-2">2</div>
	   	    	<div class="flex-one person-info flex">
	   	    	  <div class="person-avatar"></div>
	   	    	  <div class="person-name">张良</div>
	   	    	</div>
	   	    	<div class="item-num">
	   	    	  <div class="num">11</div>
	   	    	  <span class="num-label">条</span></div>
	   	    </div>
	   	  </div>
	   	  <div class="list-item">
	   	    <div class="flex item-detail">
	   	    	<div class="item-index index-3">3</div>
	   	    	<div class="flex-one person-info flex">
	   	    	  <div class="person-avatar"></div>
	   	    	  <div class="person-name">张良</div>
	   	    	</div>
	   	    	<div class="item-num">
	   	    	  <div class="num">11</div>
	   	    	  <span class="num-label">条</span></div>
	   	    </div>
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
.common-personRank{
	.personRank-page{
		padding:0 0.7rem;
		.title{
		  color:#fff;
		  font-size:0.58rem;
		  text-align:left;
		  padding-top:0.53rem;
		  margin-bottom:0.9rem;
		}
		.rank-list{
		  text-align:left;
		  .list-item{
		    width:45%;
		    height:1.4rem;
		    padding:0 0.4rem;
		    margin-bottom:0.5rem;
		    background:linear-gradient(0deg,rgba(7,141,255,0.7) 0%,rgba(37,132,250,0.01) 52%,rgba(7,141,255,0.7) 100%);
				border-radius:5px;
				display:inline-block;
				&:nth-child(odd) {
				  margin-right:8%;
				}
				.item-detail{
				  align-items:center;
				  height:100%;
				}
		  }
		  .item-num{
		    .num{
		      font-size:0.6rem;
		    	color:#0BFCFF;
		      display:inline-block;
		    }
		    .num-label{
		      font-size:0.36rem;
		      color:#0BFCFF;
		      display:inline-block;
		    }
		  }
		}
		.item-index{
		  width:0.6rem;
			height:0.6rem;
			background:rgba(0,108,255,0.45);
			border:1px solid rgba(251, 49, 97, 1);
			border-radius:5px;
			color:#fff;
			font-size:0.4rem;
			text-align:center;
			line-height:0.6rem;
			font-family:PingFangSC-Medium;
		}
		.index-1{
		  background:rgba(251,49,97,0.45);
		}
		.index-2{
			background:rgba(251,173,49,0.45);
		}
		.index-3{
			background:rgba(192,49,251,0.45);
		}
	}
	.common01-border{
	  width: 100%;
	  height: 100%;
	  background: url("../../../../assets/common/common01Border.png") no-repeat center;
	  background-size: 100% 100%;
	  position: relative;
	}
	.person-info{
	  padding-left:0.46rem;
	  align-items:center;
	  .person-avatar{
		  width:0.88rem;
		  height:0.88rem;
		  border:1px solid #078DFF;
		  border-radius:50%;
		}
		.person-name{
		  font-size:0.4rem;
		  color:#fff;
		  margin-left:0.4rem;
		}
	}
}

</style>
