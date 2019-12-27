<template>
  <div class="common-cluegather ">
    <div class="manuscript-page common01-border">
	    <div class="title">稿件生产</div>
	    <div class="list-title">
        <div class="list-item flex sys-flex-center animated"
          :class="{'flipInX' : v.title}"
          :style="{'animation-delay' : k/2 + 's'}"
          v-for="(v, k) in dataList"
          :key="k">
          <div class="type-area sys-flex sys-flex-center">
            <img v-if="k === 0" src="./assets/new.png" />
            <span v-if="k !== 0">【{{v.typeName}}】</span>
          </div>
          <div class="list-text overhidden">{{v.title}}</div>
          <div class="list-time flex">
            <div class="img-icon">
              <img src="@/assets/common/time.png" />
            </div>
          {{v.publish_time.slice(5, 16)}}</div>
          <div class="list-read flex">
             <div class="img-icon">
              <img src="@/assets/common/reader.png" />
            </div>
          {{v.click_num}}</div>
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
      dataList: [{
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
      span {
        font-size:0.38rem;
        color: #0afbf2;
      }
      img {
        width: 1.07rem;
        height: 0.48rem;
        margin: 0 0.225rem;
      }
		}
		.list-title{
		  color:#fff;
		  font-size:0.38rem;
		  margin-right:1.12rem;
		  text-align:left;
		}
    .list-text {
      font-size: 0.38rem;
      width: 60%;
      text-align: left;
    }
		.list-viewer{
		  font-size:0.32rem;
		  color:#fff;
		  margin-right:0.71rem;
		  align-items:center;
		}
    .list-time {
      margin: 0 0.8rem 0 0.65rem;
      font-size:0.32rem;
      .img-icon {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
    .list-read {
      font-size:0.32rem;
      .img-icon {
        width: 0.42rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
	}
}

</style>
