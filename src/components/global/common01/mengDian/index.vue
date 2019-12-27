<template>
  <div class="common-mengdian ">
    <div class="mengdian-page common01-border">
	    <div class="title">蒙点号</div>
	   	<div class="member-info">
	   	  <div class="member-all flex">
	   	    <div class="member-title flex-one">
	   	    <img class="icon" src="./assets/icon.png" />
	   	    入驻商家:</div>
	   	    <div class="member-num flex-one">2</div>
	   	  </div>
	   	  <div class="member-list">
	   	    <div class="member-item animated" 
	   	    :class="{'flipInX' : v.title}"
            :style="{'animation-delay' : k/2 + 's'}" 
            v-for="(v, k) in dataList">
	   	      <div class="member-icon">
	   	        <img src="./assets/title-img.png" />
	   	      </div>
	   	      <div class="member-name">{{v.title}}</div>
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
      dataList: [{
        title: '智慧内蒙古'
      }, {
        title: '智慧内蒙古'
      }]
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common-mengdian{
	.mengdian-page{
		padding:0 0.7rem;
		.title{
		  color:#fff;
		  font-size:0.58rem;
		  text-align:left;
		  padding-top:0.53rem;
		  margin-bottom:1.30rem;
		}
		.member-info{
		  padding:0 1rem;
		  margin-top:0.6rem;
		}
		.member-all{
		  width:100%;
		  height:1.45rem;
		  line-height:1.45rem;
		  border:3px solid rgba(0,156,255,1);
		  align-items:center;
		  margin-botttom:0.6rem;
		}
		.member-title{
			font-size:0.4rem;
		  color:#fff;
		  text-align:right;
		  padding-right:0.88rem;
		}
		.member-num{
		  display:inline-block;
		  color:#0BFCFF;
		  font-size:0.7rem;
		  line-height:1.45rem;
		  text-align:left;
		}
		.member-list{
		  margin-top:0.6rem;
		  text-align:left;
		}
		.member-item{
		  display:inline-block;
		  margin-right:1.47rem;
		  margin-bottom:1rem;
		  text-align:center;
		}
		.member-icon{
		  width:1.5rem;
		  height:1.5rem;
		  overflow:hidden;
		  border-radius:0.05rem;
		  margin-bottom:0.28rem;
		  display:inline-block;
		  img{
		    width:100%;
		    height:100%;
		  }
		}
		.member-name{
		  font-size:0.34rem;
		  color:#fff;
		}
	}
	.icon{
	  width:0.46rem;
	  height:0.4rem;
	}
}

</style>
