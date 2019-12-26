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
	          	<img src="@/assets/common/time.png" />
	          </div>
	        12345</div>
	        <div class="list-time flex">
	           <div class="img-icon">
	          	<img src="@/assets/common/reader.png" />
	          </div>
	        12345</div>
	      </div>
	    </div>
	    <div class="manuscriptoutput-wrap">
	      <div
	        class="wrap-list sys-flex sys-flex-center animated"
	        :class="{'flipInX' : v.title}"
	        :style="{'animation-delay' : k/2 + 's'}"
	        v-for="(v, k) in dataList"
	        :key="k"
	      >
        <div class="list-status sys-flex sys-flex-center">
          <img v-if="k === 0" />
          <span v-if="k !== 0">【{{v.typeName}}】</span>
        </div>
        <div class="list-text overhidden">{{v.title}}</div>
        <div class="list-time list-span sys-flex sys-flex-center">
          <img src="@/assets/common/time.png" />
          <span>{{v.publish_time.slice(5, 16)}}</span>
        </div>
        <div class="list-read list-span sys-flex sys-flex-center">
          <img src="@/assets/common/reader.png" />
          <span>{{v.click_num}}</span>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { getM2OPlusPublish } from '@/servers/interface'
export default {
  name: 'manuscriptOutput',
  data () {
    return {
      dataList: [],
      count: 5,
      page: 1,
      isPaging: true,
      typeList: {
        article: '文稿',
        gallery: '图集',
        topic: '专题',
        link: '外链',
        video: '视频'
      },
      frequency: 25000
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('lishui-manuscriptoutput')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getM2OPlusPublish(this.count, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data && res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data.map(v => {
                return {
                  ...v,
                  typeName: this.typeList[(v.type)]
                }
              })
            }, 100)
            if (this.isPaging) {
              this.page += 1
              if (this.page > this.maxPage) {
                this.page = 1
              }
            }
          } else {
            if (this.page !== 1) {
              this.page = 1
              this.getDataList()
            }
          }
        }
      })
    }
  }
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
