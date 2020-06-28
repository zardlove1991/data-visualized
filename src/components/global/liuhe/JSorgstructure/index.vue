<template>
  <div class="common-orgStructure-js">
    <!-- 一级页面 -->
    <div class="orgStructure-page common01-border" v-if="!showDetailPage">
      <div class="common01-title">{{viewAttr.header || '组织架构'}}</div>
      <div class="tab-btn sys-flex">
        <div
          :class="showOrg?'btn common01-ft38 act':'btn common01-ft38'"
          @click="showOrg=!showOrg"
        >组织机构</div>
        <div
          :class="showOrg?'btn common01-ft38':'btn common01-ft38 act'"
          @click="showOrg=!showOrg"
        >先进典型</div>
      </div>
      <div class="org-div"  v-if="showOrg">
        <div class="total">
          <p>服务总队</p>
          <span>{{orgIndexData.total}}</span>
        </div>
        <div
          v-if="orgIndexData.topInfo.name"
          class="name common01-ft36 animated flipInX left-bottom-info"
          @click="showChildDetail(orgIndexData.topInfo.id, orgIndexData.topInfo.name)"
        >{{orgIndexData.topInfo.name}}</div>
        <div
          v-if="orgIndexData.leftTopInfo.name"
          class="name common01-ft36 animated flipInX left-top-info"
          @click="showChildDetail(orgIndexData.leftTopInfo.id, orgIndexData.leftTopInfo.name)"
        >{{orgIndexData.leftTopInfo.name}}</div>
        <div
          v-if="orgIndexData.leftBottomInfo.name"
          class="name common01-ft36 animated flipInX top-info"
          @click="showChildDetail(orgIndexData.leftBottomInfo.id, orgIndexData.leftBottomInfo.name)"
        >{{orgIndexData.leftBottomInfo.name}}</div>
        <div
          v-if="orgIndexData.rightTopInfo.name"
          class="name common01-ft36 animated flipInX right-top-info"
          @click="showChildDetail(orgIndexData.rightTopInfo.id, orgIndexData.rightTopInfo.name)"
        >{{orgIndexData.rightTopInfo.name}}</div>
        <div
          v-if="orgIndexData.rightBottomInfo.name"
          class="name common01-ft36 animated flipInX right-bottom-info"
          @click="showChildDetail(orgIndexData.rightBottomInfo.id, orgIndexData.rightBottomInfo.name)"
        >{{orgIndexData.rightBottomInfo.name}}</div>

        <div
          class="number left-bottom-info"
          @click="showChildDetail(orgIndexData.topInfo.id, orgIndexData.topInfo.name)"
        >{{orgIndexData.topInfo.number}}</div>
        <div
          class="number left-top-info"
          @click="showChildDetail(orgIndexData.leftTopInfo.id, orgIndexData.leftTopInfo.name)"
        >{{orgIndexData.leftTopInfo.number}}</div>
        <div
          class="number top-info"
          @click="showChildDetail(orgIndexData.leftBottomInfo.id, orgIndexData.leftBottomInfo.name)"
        >{{orgIndexData.leftBottomInfo.number}}</div>
        <div
          class="number right-top-info"
          @click="showChildDetail(orgIndexData.rightTopInfo.id, orgIndexData.rightTopInfo.name)"
        >{{orgIndexData.rightTopInfo.number}}</div>
        <div
          class="number right-bottom-info"
          @click="showChildDetail(orgIndexData.rightBottomInfo.id, orgIndexData.rightBottomInfo.name)"
        >{{orgIndexData.rightBottomInfo.number}}</div>
      </div>
      <!-- 成员名单 -->
      <div class="org-div" :class="{org_div_add: !showOrg}" v-if="!showOrg && advanceList.length">
        <div class="total advance_total">
          <p>先进典型</p>
          <span>{{advanceTotal}}</span>
        </div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position1" @click="getDataList(0)">{{advanceList[0].name}}</div>
        <div v-if="advanceList.length" class="name1 common01-ft36 animated flipInX advance_position2" @click="getDataList(1)">{{advanceList[1].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position3" @click="getDataList(2)">{{advanceList[2].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position4" @click="getDataList(3)">{{advanceList[3].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position5" @click="getDataList(4)">{{advanceList[4].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position6" @click="getDataList(5)">{{advanceList[5].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position7" @click="getDataList(6)">{{advanceList[6].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position8" @click="getDataList(7)">{{advanceList[7].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position9" @click="getDataList(8)">{{advanceList[8].name}}</div>
        <div class="number advance_position1" @click="getDataList(0)">{{advanceList[0].publish_number}}</div>
        <div class="number advance_position2" @click="getDataList(1)">{{advanceList[1].publish_number}}</div>
        <div class="number advance_position3" @click="getDataList(2)">{{advanceList[2].publish_number}}</div>
        <div class="number advance_position4" @click="getDataList(3)">{{advanceList[3].publish_number}}</div>
        <div class="number advance_position5" @click="getDataList(4)">{{advanceList[4].publish_number}}</div>
        <div class="number advance_position6" @click="getDataList(5)">{{advanceList[5].publish_number}}</div>
        <div class="number advance_position7" @click="getDataList(6)">{{advanceList[6].publish_number}}</div>
        <div class="number advance_position8" @click="getDataList(7)">{{advanceList[7].publish_number}}</div>
        <div class="number advance_position9" @click="getDataList(8)">{{advanceList[8].publish_number}}</div>
        <!-- <div class="left-part sys-flex-one">
          <div class="title">
            <div class="img-div">
              <img src="./assets/arrow_list.png" alt />
            </div>
            <span>{{memberIndexData.leftMember.title}}</span>
          </div>
          <div class="member-list">
            <div
              :class="item.title === '成员'?'item type-member':'item type-leader'"
              v-for="(item, index) in memberIndexData.leftMember.data"
              :key="index"
            >
              <div class="type-title">
                <span>{{item.title}}</span>
                <span>:</span>
              </div>
              <div class="member sys-flex" v-for="(item2, index2) in item.data" :key="index2">
                <div class="name">
                  <div>
                    <span>{{item2.name}}</span>
                  </div>
                </div>
                <div class="position">{{item2.duty}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-part sys-flex-one">
          <div class="title">
            <div class="img-div"  v-if="memberIndexData.rightMember.title">
              <img src="./assets/arrow_list.png" alt />
            </div>
            <span>{{memberIndexData.rightMember.title}}</span>
          </div>
          <div class="member-list">
            <div
              :class="item.title === '成员'?'item type-member':'item type-leader'"
              v-for="(item, index) in memberIndexData.rightMember.data"
              :key="index"
            >
              <div class="type-title">
                <span>{{item.title}}</span>
                <span>:</span>
              </div>
              <div class="member sys-flex" v-for="(item2, index2) in item.data" :key="index2">
                <div class="name">
                  <div>
                    <span>{{item2.name}}</span>
                  </div>
                </div>
                <div class="position">{{item2.duty}}</div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- 组织二级页面 -->
    <div class="orgStructure-detail-page common01-border" v-if="showDetailPage && !showAdvancePage && !showAdvanceDeatil"">
      <div class="back-btn common01-ft36" @click="childDetailPageBack">返回</div>
      <div class="box">
        <div class="top-part">
          <div class="page-title">
            <div class="title-box">
              <div class="sys-flex">
                <div class="title-left">
                  <img src="./assets/namebox_left.png" alt />
                </div>
                <div class="title">
                  {{detailTitle}}
                  <span
                    class="num"
                    v-if="detailInfo && detailInfo.length > 0"
                  >({{detailInfo.length}})</span>
                </div>
                <div class="title-right">
                  <img src="./assets/namebox_right.png" alt />
                </div>
              </div>
            </div>
            <div class="bg-div">
              <img src="./assets/bg_ladder.png" alt />
            </div>
          </div>
        </div>
        <div class="list-line sys-flex">
          <div class="first-line line" v-if="checkCanShow(0)"></div>
          <div class="line" v-if="checkCanShow(1)"></div>
          <div class="line" v-if="checkCanShow(2)"></div>
          <div class="line" v-if="checkCanShow(3)"></div>
          <div class="line" v-if="checkCanShow(4)"></div>
          <div class="line" v-if="checkCanShow(5)"></div>
        </div>
        <div class="list-box sys-flex" v-if="detailInfo && detailInfo.length > 0">
          <div class="item" v-for="(item, index) in detailInfo" :key="index">
            <div class="img-box">
              <img v-if="item.head_pic" :src="item.head_pic" alt />
              <img v-else src="./assets/icon_group.png" alt />
            </div>
            <div class="name">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 先进典型列表页 -->
    <div class="activityInfo-page common01-border" v-if="showDetailPage && showAdvancePage">
        <div class="back-btn common01-ft36" @click="advanceListBack">返回</div>
        <div class="common01-title page-title">{{ viewAttr.header || '先进典型' }}</div>
        <div class="list-title">
          <div
            class="list-item flex sys-flex-center animated"
            :class="{ flipInX: v.title }"
            :style="{ 'animation-delay': k / 2 + 's' }"
            v-for="(v, k) in dataList"
            @click="getDetail(v)"
            :key="k"
          >
            <p>{{ v.title }}</p>
            <div>{{ v.brief }}</div>
            <!--  -->
          </div>
        </div>
        <div class="scroll_icon"> 
          <img class="icon_up" :class="{icon_opcity: page === 1}" src="./assets/arrow_up.png" @click="lastPage"/>
          <img class="icon_up" src="./assets/arrow_down.png" :class="{icon_opcity: page === PageTotal}" @click="nextPage"/>
        </div>
    </div>
    <!-- 人物详情页 -->
    <div class="activityInfo-detail common01-border" v-if="showDetailPage && showAdvanceDeatil">
      <!-- <div class="back-line">
        <div @click="backList()" class="back">
          <div class="back-img">
            <img src="./assets/icon_back.png" />
          </div>
          <span class="back-text">返回</span>
        </div>
      </div> -->
      <div class="back-btn common01-ft36" @click="backList()">返回</div>
      <swiper
        :options="swiperOption"
        ref="mySwiper"
      >
        <swiper-slide v-for="(v, k) in swiperDataList" :key="k" class="content-swiper">
          <div class="detail-title">{{ v.title }}</div>
          <div class="detail-list">
            <div class="source">来源：{{ v.source }}</div>
            <div class="author">发布时间：{{ v.showTime }}</div>
            <div class="bg-line">
              <p class="line"></p>
            </div>
          </div>
          <div  class="detail-content common01-ft36" :style="setFontSize(40)" v-if="v.contentDetail">
            <div class="contnet-detail-img" v-html="handelHtml(v.imgContent)"></div>
            <div class="contnet-detail-div" v-html="handelHtml(v.contentDetail)"></div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev swiper-button-white"></div>
      <div class="swiper-button-next swiper-button-white"></div>
    </div>
  </div>
</template>

<script>
import { getVolunteerOrganizeList, getVolunteerOrganizeDetail, getAdvancedList, getJSActivityInfo, getActivityInfoDetail } from '@/servers/interface'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'orgStructure',
  data () {
    return {
      orgImg: require('./assets/icon_group.png'),
      showOrg: false,
      showAdvancePage: false,
      showAdvanceDeatil: false,
      advanceList: [],
      showIndex: 0,
      swiperDataList: [], // 轮播图列表
      currentIndex: 0,
      advanceTotal: 0,
      dataList: [],
      PageTotal: 1,
      swiperOption: {
        notNextTick: true,
        initialSlide: 0,
        speed: 1000,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        },
        direction: 'horizontal',
        loop: false,
        observer: true,
        observeParents: true,
        paginationClickable: true
      },
      page: 1,
      count: 5,
      orgIndexData: {
        total: 0,
        topInfo: {
          title: '',
          score: 0,
          id: ''
        },
        leftTopInfo: {
          title: '',
          score: 0,
          id: ''
        },
        leftBottomInfo: {
          title: '',
          score: 0,
          id: ''
        },
        rightTopInfo: {
          title: '',
          score: 0,
          id: ''
        },
        rightBottomInfo: {
          title: '',
          score: 0,
          id: ''
        }
      },
      dimensionalArr: [],
      memberIndexData: {
        leftMember: {
          title: '',
          data: []
        },
        rightMember: {
          title: '',
          data: []
        }
      },
      // 二级页面
      showDetailPage: false,
      detailTitle: '',
      detailInfo: []
    }
  },
  created () {
    this.getVolunteerOrganizeList()
    this.getAdvancedList()
    // this.getVolunteerMemberList()
  },
  watch: {
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    // 返回先进典型列表页
    backList () {
      this.showAdvanceDeatil = false
      this.showAdvancePage = true
    },
    handelHtml (html) {
      let rel = /style\s*?=\s*?([‘"])[\s\S]*?\1/gi
      return html.replace(rel, '')
    },
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    // 获取详情的content
    getContent (k) {
      getActivityInfoDetail(this.swiperDataList[k].id).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.content) {
            let imgContent = ''
            let textContent = ''
            let content = res.data.result.content
            if (content.indexOf('<img') > -1) {
              textContent = content.substring(0, content.indexOf('<img')) + content.substring(content.indexOf('"/>') + 3, content.length)
              imgContent = content.substring(content.indexOf('<img'), content.indexOf('"/>') + 3)
            } else {
              textContent = content
            }
            this.$set(this.swiperDataList[k], 'contentDetail', textContent)
            this.$set(this.swiperDataList[k], 'imgContent', imgContent)
          }
        }
      })
    },
    getListcontent () {
      this.swiperDataList.forEach((val, index) => {
        if (val.contentDetail) {
          return false
        }
        this.getContent(index)
      })
    },
    // 获取先进典型轮播图数据
    getDetail (item) {
      // 保存swiper所需数据
      this.showIndex = 0
      this.dataList.forEach((v, index) => {
        if (v.id === item.id) {
          this.showIndex = index
        }
      })
      this.swiperDataList = [...this.dataList]
      this.getListcontent()
      this.swiperOption.initialSlide = this.showIndex
      setTimeout(() => {
        this.showAdvancePage = false
        this.showAdvanceDeatil = true
      }, 0)
    },
    advanceListBack () {
      this.showAdvancePage = false
      this.showDetailPage = false
      this.dataList = []
    },
    // 下一页
    nextPage () {
      if (this.page === this.PageTotal) return false
      this.page += 1
      this.getDataList(this.currentIndex, 'sign')
    },
    // 上一页
    lastPage () {
      if (this.page === 1) return false
      this.page -= 1
      this.getDataList(this.currentIndex, 'sign')
    },
    getDataList (i, sign) {
      if (!sign) {
        this.page = 1
      }
      this.showAdvancePage = true
      this.showDetailPage = true
      this.currentIndex = i
      let config = {
        site_id: 143,
        page: this.page,
        count: this.count,
        status: 1,
        column_id: this.advanceList[i].id
      }
      getJSActivityInfo({ params: config }).then(res => {
        this.currentPage = this.page
        if (!res.data.error_code) {
          if (res.data.result.data && res.data.result.data.length) {
            this.dataList = []
            this.PageTotal = Math.ceil(res.data.result.total / 5)
            setTimeout(() => {
              this.dataList = res.data.result.data.map(v => {
                let newDate = v.create_time.split('-').join('/')
                let _date = new Date(newDate)
                let month = (_date.getMonth() + 1).toString().padStart(2, '0')
                let day = _date
                  .getDate()
                  .toString()
                  .padStart(2, '0')
                let hour = _date
                  .getHours()
                  .toString()
                  .padStart(2, '0')
                let min = _date
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')
                v.showTime = month + '-' + day + '  ' + hour + ':' + min
                v.contentDetail = ''
                v.imgContent = ''
                return {
                  ...v
                }
              })
            }, 100)
          }
        }
      })
    },
    checkCanShow (num) {
      if (this.detailInfo && this.detailInfo.length > num) {
        return true
      } else {
        return false
      }
    },
    // 获取先进典型列表
    getAdvancedList () {
      getAdvancedList().then(res => {
        if (!res.data.error_code) {
          this.advanceList = res.data.result
          this.advanceList.forEach(val => {
            this.advanceTotal += Number(val.publish_number)
          })
        }
      })
    },
    // 获取组织架构
    getVolunteerOrganizeList () {
      getVolunteerOrganizeList().then(res => {
        if (!res.data.error_code) {
          let _result = res.data.result.organize_cate
          if (_result && _result.length > 0) {
            this.orgIndexData.total = res.data.result.total
            this.orgIndexData.topInfo = _result[3]
            this.orgIndexData.leftTopInfo = _result[2]
            this.orgIndexData.leftBottomInfo = _result[1]
            this.orgIndexData.rightTopInfo = _result[0]
            this.orgIndexData.rightBottomInfo = _result[4]
            _result.forEach(e => {
            })
          }
        }
      })
    },
    // 获取组织架构（子组织）
    showChildDetail (id, name) {
      getVolunteerOrganizeDetail(id).then(res => {
        if (!res.data.error_code) {
          let _result = res.data.result
          if (_result) {
            this.detailTitle = name
            this.detailInfo = _result.data
            this.dimensionalArr.push({
              name: name,
              data: _result.data
            })
            this.showDetailPage = true
          }
        }
      })
    },
    // 二级页面返回
    childDetailPageBack () {
      if (this.dimensionalArr.length > 1) {
        this.dimensionalArr = this.dimensionalArr.splice(0, 1)
        this.detailInfo = this.dimensionalArr[0].data
        this.detailTitle = this.dimensionalArr[0].name
      } else {
        this.showDetailPage = false
        this.detailInfo = []
        this.dimensionalArr = []
        this.detailTitle = ''
      }
    }
    // 成员名单
    // getVolunteerMemberList () {
    //   getVolunteerMemberList().then(res => {
    //     if (!res.data.error_code) {
    //       let _result = res.data.result
    //       if (_result) {
    //         this.memberIndexData.leftMember.title = _result[0].title
    //         this.memberIndexData.leftMember.data = _result[0].relation
    //         this.memberIndexData.rightMember.title = _result[1].title
    //         this.memberIndexData.rightMember.data = _result[1].relation
    //       }
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss">
@import "~@/styles/index.scss";
@import "../style/index.scss";
.common-orgStructure-js {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  background: #0a1742;
  * {
    outline: 0;
    font-family: "SourceHanSansSC-Medium";
  }
  .activityInfo-detail {
    padding: 0.7rem pxrem(72px) pxrem(10px);
    .back-btn{
      position: absolute;
      z-index: 1;
      right: 0.8rem;
      bottom: 0.5rem;
      padding-left: 0.55rem;
      color: #00ffea;
      font-weight: bold;
      background: url("./assets/icon_back.png") no-repeat;
      background-size: 0.36rem 0.28rem;
      background-position: 0 0.11rem;
    }
    .content-swiper {
      height: pxrem(820px);
      overflow-y: scroll;
    }
    .back-line {
      position: absolute;
      z-index: 10;
      right: pxrem(80px);
      bottom: pxrem(50px);
    }
    .back {
      display: inline-block;
      font-weight: bold;
    }
    .back-text {
      font-size: 0.34rem;
      color: #00ffea;
    }
    .back-img {
      display: inline-block;
      width: 0.36rem;
      height: 0.28rem;
      margin-right: 0.2rem;
    }
    // img {
    //   width: 100%;
    //   height: 100%;
    //   object-fit: cover;
    //   display: block;
    // }
    .detail-title {
      display: inline-block;
      width: pxrem(1250px);
      font-weight: bold;
      font-size: 0.52rem;
      // line-height:0.52rem;
      color: #fff;
      margin-bottom: 0.3rem;
      text-align: center;
    }
    .detail-list {
      color: #fff;
      margin: 0 auto;
      text-align: center;
      .source {
        margin-right: 0.34rem;
        display: inline-block;
        font-size: 0.28rem;
      }
      .author {
        display: inline-block;
        font-size: 0.28rem;
      }
      .bg-line {
        margin-top: pxrem(12px);
        .line {
          width: pxrem(1017px);
          height: pxrem(2px);
          margin: 0 auto;
          background: linear-gradient(
            90deg,
            rgba(64, 107, 173, 0) 0%,
            rgba(64, 107, 173, 0.99) 48%,
            rgba(64, 107, 173, 0) 100%
          );
        }
      }
    }
    .detail-content {
      width: 100%;
      // height: 6.2rem;
      overflow-y: scroll;
      margin-top: pxrem(40px);
      padding: 0 pxrem(30px);
      display: flex;
      .video{
        margin: 0 auto;
        width: 12rem;
        height: 6rem;
        .vjs-custom-skin {
          width: 100%;
          height: 100%;
          overflow: hidden;
          .vjs-big-play-button{
            left: calc(50% - 1.5em);
            top: calc(50% - 0.8em);
          }
        }
      }
      // & > div {
      //   width: 100%;
      // }
      .pic {
        img {
          margin-bottom: pxrem(20px);
        }
      }
      .contnet-detail-div {
        flex: 1;
        line-height: 0.6rem;
        font-size: pxrem(35px);
        text-indent: 2em;
        text-align: left;
        color: #eeeeee;
        p{
          br{
            display: none;
          }
        }
      }
      .contnet-detail-img{
        max-width: 31%;
        margin-right: 0.3rem;
        display: flex;
        img {
          object-fit: contain;
          max-width: 100%;
          max-height: 6.4rem;
        }
      }
    }
    .swiper-slide {
      width: 100% !important;
    }
    .swiper-button-prev {
      background-image: url(./assets/icon_left.png) !important;
      width: 0.4rem;
      height: 0.78rem;
      background-size: 100%;
    }
    .swiper-button-next {
      background-image: url(./assets/icon_right.png) !important;
      width: 0.4rem;
      height: 0.78rem;
      background-size: 100%;
    }
    .swiper-button-prev:focus,
    .swiper-button-next:focus {
      outline: none;
    }
  }
  .activityInfo-page {
    position: relative;
    padding: pxrem(200px) pxrem(120px) pxrem(95px) pxrem(78px);
    .back-btn {
      position: absolute;
      z-index: 1;
      right: 0.8rem;
      bottom: 0.5rem;
      padding-left: pxrem(55px);
      color: #00ffea;
      font-weight: bold;
      background: url("./assets/icon_back.png") no-repeat;
      background-size: pxrem(36px) pxrem(28px);
      background-position: 0 pxrem(11px);
    }
    .scroll_icon{
      position: absolute;
      right: 0.4rem;
      top: 5.1rem;
      display: flex;
      flex-direction: column;
      img{
        margin-top: 0.2rem;
        width: 0.585rem;
        height: 0.664rem;;
      }
      .icon_opcity{
        opacity: 0.4;
      }
    }
    .tab-btn {
      position: absolute;
      outline: none;
      z-index: 2;
      top: pxrem(90px);
      right: pxrem(77px);
      .btn {
        width: pxrem(253px);
        height: pxrem(94px);
        line-height: pxrem(98px);
        text-align: center;
        font-weight: bold;
        color: #fff;
        background: url("./assets/rectangle.png") no-repeat center;
        background-size: 100%;
      }
      .btn.act {
        background: url("./assets/rectangle_pre.png") no-repeat center;
        background-size: 100%;
      }
    }
    .page-title {
      font-weight: 600;
    }
    .list-item {
      background: url('./assets/box@2x.png');
      background-size: 100% 100%;
      margin-bottom: 0.5rem;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem 0.2rem 0.2rem 0 ;
    }
    .type-area {
      color: #0afbf2;
      span {
        color: #0afbf2;
      }
      img {
        width: 1.07rem;
        height: 0.48rem;
        margin: 0 0.225rem;
      }
    }
    .list-title {
      color: #fff;
      font-size: 0.38rem;
      text-align: left;
    }
    .list-text {
      width: 40%;
      text-align: left;
    }
    .list-time {
      .img-icon {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
    .title-div {
      width: 100%;
      &.haveico {
        width: calc(100% - 1.06rem);
      }
      > p {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
    }
    .right-part {
      width: 5.4rem;
    }
    .list-read {
      margin: 0 0.3rem 0 0.45rem;
      font-size: 0.32rem;
      .click-span {
        display: inline-block;
        width: 1.1rem;
      }
      .img-icon {
        width: 0.42rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
  }
  .orgStructure-page {
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    .common01-title {
      height: pxrem(56px);
      font-weight: 600;
      line-height: 1;
      text-shadow: 0px 16px 16px rgba(7, 222, 255, 0.2);
    }
    .tab-btn {
      position: absolute;
      z-index: 2;
      top: pxrem(90px);
      right: pxrem(77px);
      .btn {
        width: pxrem(253px);
        height: pxrem(94px);
        line-height: pxrem(98px);
        text-align: center;
        font-weight: bold;
        color: #fff;
        background: url("./assets/rectangle.png") no-repeat center;
        background-size: 100%;
      }
      .btn.act {
        background: url("./assets/rectangle_pre.png") no-repeat center;
        background-size: 100%;
      }
    }
    .org-div {
      position: absolute;
      width: pxrem(1678px);
      height: pxrem(810px);
      bottom: pxrem(35px);
      // background: url("./assets/bg_group_new2.png") no-repeat center;
      background: url("./assets/bg_group_new3.png") no-repeat center;
      background-size: 100%;
      left: 52%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
      .total,
      .name,
      .number {
        position: absolute;
      }
      .total {
        width: pxrem(314px);
        height: pxrem(189px);
        text-align: center;
        top: pxrem(338px);
        left: pxrem(667px);
        p {
          font-size: pxrem(52px);
          height: pxrem(50px);
          line-height: 1;
          letter-spacing: pxrem(3px);
          margin-top: pxrem(32px);
          color: #fff;
        }
        span {
          font-size: pxrem(68px);
          color: #00f6ff;
          font-weight: 800;
          letter-spacing: pxrem(11px);
        }
      }
      .advance_total{
        top: 3.58rem;
      }
      .name {
        height: pxrem(76px);
        line-height: pxrem(76px);
        color: #fff;
        font-weight: bold;
        letter-spacing: pxrem(2px);
        background: url("./assets/box_3.png") no-repeat center;
        background-size: 100% 100%;
        white-space: nowrap;
      }
      .name1{
        position: absolute;
        position: relative;
        color: #fff;
        max-width: 4.3rem;
        height: 1.32rem;
        letter-spacing: pxrem(2px);
        font-weight: bold;
        background: url("./assets/3@2x.png") no-repeat center;
        background-size: 100% 100%;
        padding: 0.15rem 0.3rem;
      }
      .name1::before {
        left: 0;
        top: 0;
        position: absolute;
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/1@2x.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name1::after {
        right: 0;
        top: 0;
        position: absolute;
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/2@2x.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name::before {
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/box_1.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name::after {
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/box_2.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name.top-info {
        // width: pxrem(294px);
        top: 0;
        // left: pxrem(354px);
        right: pxrem(1029px);
      }
      .name.left-top-info {
        // width: pxrem(294px);
        top: pxrem(230px);
        right: pxrem(1300px);
      }
      .name.left-bottom-info {
        // width: pxrem(374px);
        bottom: pxrem(38px);
        // right: pxrem(1306px);
        right: pxrem(1260px);
      }
      .name.right-top-info {
        // width: pxrem(294px);
        top: pxrem(180px);
        left: pxrem(1270px);
      }
      .name.right-bottom-info {
        // width: pxrem(408px);
        bottom: pxrem(54px);
        left: pxrem(1270px);
      }
      .name.advance_position1 {
        top: -0.1rem;
        left: 3rem;
      }
      .name.advance_position3{
        left: 13.2rem;
        top: 4rem;
      }
      .name.advance_position4{
        left: 13rem;
        top: 5.5rem;
      }
      .name.advance_position5{
        left: 11.4rem;
        top: 7.45rem;
      }
      .name.advance_position6{
        left: 0.75rem;
        top: 7.45rem;
      }
      .name.advance_position7{
        left: -0.8rem;
        top: 5.5rem;
      }
      .name.advance_position8{
        left: -0.8rem;
        top: 4.05rem;
      }
      .name.advance_position9{
        left: 1.45rem;
        top: 1.7rem;
      }
      .name1.advance_position2{
        left: 12.3rem;
        top: 1.5rem;
      }
      .number {
        width: pxrem(138px);
        height: pxrem(138px);
        text-align: center;
        font-size: pxrem(48px);
        line-height: pxrem(138px);
        font-weight: bold;
        letter-spacing: pxrem(2px);
        color: #becfff;
      }
      .number.top-info {
        top: pxrem(20px);
        left: pxrem(750px);
      }
      .number.left-top-info {
        top: pxrem(248px);
        left: pxrem(428px);
        color: #0ce7e6;
      }
      .number.left-bottom-info {
        bottom: pxrem(96px);
        left: pxrem(482px);
      }
      .number.right-top-info {
        top: pxrem(250px);
        right: pxrem(462px);
        color: #0ce7e6;
      }
      .number.right-bottom-info {
        bottom: pxrem(96px);
        right: pxrem(514px);
      }
      .number.advance_position1{
        top: 0.83rem;
        left: 7.52rem;
      }
      .number.advance_position2{
        top: 1.57rem;
        left: 9.64rem;
        color: #0ce7e6;
      }
      .number.advance_position3{
        top: 3.28rem;
        left: 10.6rem;
      }
      .number.advance_position4{
        top: 5.26rem;
        left: 10.32rem;
        color: #0ce7e6;
      }
      .number.advance_position5{
        top: 6.6rem;
        left: 8.9rem;
      }
      .number.advance_position6{
        top: 6.58rem;
        left: 6.16rem;
      }
      .number.advance_position7{
        top: 5.28rem;
        left: 4.8rem;
        color: #0ce7e6;
      }
      .number.advance_position8{
        top: 3.28rem;
        left: 4.6rem;
      }
      .number.advance_position9{
        top: 1.57rem;
        left: 5.58rem;
        color: #0ce7e6;
      }
    }
    .org_div_add{
      background: url("./assets/bg_new.png") no-repeat center;
      background-size: auto 100%;
    }
    .member-div {
      .left-part {
        margin-right: pxrem(80px);
      }
      .title {
        height: pxrem(40px);
        font-size: pxrem(42px);
        line-height: 1;
        text-align: left;
        font-weight: bold;
        color: #fff;
        margin-bottom: pxrem(33px);
        .img-div {
          display: inline-block;
          width: pxrem(80px);
          height: pxrem(28px);
          > img {
            width: 100%;
          }
        }
      }
      .member-list {
        // width: pxrem(800px);
        height: pxrem(629px);
        background: rgba(0, 132, 255, 0.15);
        padding-left: pxrem(51px);
        overflow-y: scroll;
        .item.type-leader {
          background: url("./assets/icon_leader.png") no-repeat;
          background-size: pxrem(29px) pxrem(36px);
          background-position: 0 pxrem(45px);
        }
        .item.type-member {
          background: url("./assets/icon_member.png") no-repeat;
          background-size: pxrem(41px) pxrem(26px);
          background-position: 0 pxrem(50px);
        }
        .item {
          padding: pxrem(43px) 0 0 pxrem(51px);
          text-align: left;
          font-size: pxrem(36px);
          line-height: pxrem(36px);
          color: #fff;
          .type-title {
            span {
              display: inline-block;
              min-width: pxrem(105px);
              text-align: justify;
              text-align-last: justify;
              text-justify: distribute-all-lines;
            }
            span::after {
              display: inline-block;
              content: "";
              overflow: hidden;
              width: 100%;
              height: 0;
            }
          }
          .member {
            margin-top: pxrem(34px);
            padding-right: pxrem(30px);
            .name {
              color: #0bfcff;
              font-weight: bold;
              word-break: keep-all;
              > div {
                width: pxrem(181px);
              }
              span {
                display: inline-block;
                width: pxrem(110px);
                text-align-last: justify;
                text-align: justify;
                text-justify: distribute-all-lines;
              }
              span::after {
                display: inline-block;
                content: "";
                overflow: hidden;
                width: 100%;
                height: 0;
              }
            }
            .position {
              font-size: pxrem(30px);
            }
          }
        }
        > .item:last-child {
          padding-bottom: pxrem(43px);
        }
      }
    }
  }
  // 二级页面
  .orgStructure-detail-page {
    .box {
      height: 100%;
      position: relative;
    }
    .box::after {
      position: absolute;
      display: block;
      content: "";
      bottom: pxrem(23px);
      width: 100%;
      box-shadow: 0px 8px 22px 12px rgba(14, 34, 84, 0.7);
    }
    .back-btn {
      position: absolute;
      z-index: 1;
      right: pxrem(80px);
      bottom: pxrem(50px);
      padding-left: pxrem(55px);
      color: #00ffea;
      font-weight: bold;
      background: url("./assets/icon_back.png") no-repeat;
      background-size: pxrem(36px) pxrem(28px);
      background-position: 0 pxrem(11px);
    }
    .top-part {
      padding-top: 0.95rem;
      .page-title {
        .title-box {
          display: inline-block;
          position: relative;
          z-index: 1;
          font-size: pxrem(56px);
          color: #fff;
          line-height: pxrem(131px);
          justify-content: center;
          box-shadow: 0px pxrem(25px) pxrem(40px) rgba(14, 34, 84, 0.7);
          .title {
            background: url("./assets/namebox_mid.png") no-repeat center;
            background-size: 100% 100%;
            .num {
              font-size: pxrem(60px);
              color: #00fffa;
            }
          }
          .sys-flex > div {
            height: pxrem(131px);
            > img {
              height: 100%;
            }
          }
        }
        .bg-div {
          width: pxrem(1451px);
          height: pxrem(70px);
          margin: pxrem(-20px) auto 0;
          position: relative;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .list-line {
      height: pxrem(121px);
      width: pxrem(1464px);
      padding-top: 0.24rem;
      padding-bottom: pxrem(10px);
      margin: 0 auto;
      justify-content: center;
      .line {
        position: relative;
        width: pxrem(291px);
        border-top: pxrem(2px) solid #03f6ff;
        border-right: pxrem(2px) solid #03f6ff;
      }
      .line::before,
      .line::after {
        display: block;
        content: "";
        position: absolute;
      }
      .line::before {
        // right: 0;
        // top: 0;
        // width: pxrem(2px);
        // height: pxrem(58px);
        // background:#03F6FF;
      }
      .line::after {
        width: pxrem(10px);
        height: pxrem(10px);
        border-radius: 50%;
        background: #03f6ff;
        bottom: pxrem(-10px);
        right: 0;
        -webkit-transform: translateX(pxrem(6px));
        -moz-transform: translateX(pxrem(6px));
        -ms-transform: translateX(pxrem(6px));
        -o-transform: translateX(pxrem(6px));
        transform: translateX(pxrem(6px));
        box-shadow: 0px 0px pxrem(10px) pxrem(4px) #05e8f1;
      }
      .first-line {
        width: pxrem(2px);
        // height: pxrem(60px);
        border-left: pxrem(2px) solid #03f6ff;
        border-right: none;
        &::after{
          -webkit-transform: translateX(pxrem(4px));
          -moz-transform: translateX(pxrem(4px));
          -ms-transform: translateX(pxrem(4px));
          -o-transform: translateX(pxrem(4px));
          transform: translateX(pxrem(4px));
        }
      }
    }
    .list-box {
      position: relative;
      width: pxrem(1758px);
      height: pxrem(460px);
      overflow-y: scroll;
      flex-flow: row wrap;
      margin: 0.13rem auto 0;
      justify-content: center;
      .item {
        width: pxrem(293px);
        height: pxrem(283px);
        padding-bottom: pxrem(16px);
        .img-box {
          // margin-bottom: pxrem(16px);
          img {
            width: pxrem(150px);
            height: pxrem(150px);
            border-radius: pxrem(20px);
          }
        }
        .name {
          display: -webkit-box;
          font-size: pxrem(34px);
          color: #fff;
          width: pxrem(277px);
          height: pxrem(96px);
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: normal;
          word-break: break-all;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: center;
          > span {
            display: inline-block;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
