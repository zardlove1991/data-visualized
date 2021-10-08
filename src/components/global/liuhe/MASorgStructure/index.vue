<template>
  <div class="common-orgStructure">
    <!-- 一级页面 -->
    <div class="orgStructure-page common01-border" v-if="!showDetailPage">
      <div class="common01-title">{{viewAttr.header || '组织架构'}}</div>
        <img v-if="showUnit" class="unit_icon" src="../../../../assets/common/allunit.png" alt="" @click="showEvery()">
        <img v-if="!showUnit" class="unit_icon" src="../../../../assets/common/unit.png" alt="" @click="showAll()">
      <div class="tab-btn sys-flex">
        <div v-for="(item,index) in orgNav" :key='index'
          :class="currentIndex === index?'btn common01-ft38 act':'btn common01-ft38'"
          @click="changeIndex(index)"
        >{{item}}</div>
        <!-- <div
          :class="showOrg?'btn common01-ft38':'btn common01-ft38 act'"
          @click="showOrg=!showOrg"
        >成员名单</div> -->
      </div>
      <!-- <div class="org-div" v-if="currentIndex === 0">
        <div class="total">
          <p>志愿服务总队</p>
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
      </div> -->
      <div class="org-div" v-if="currentIndex === 0">
        <div class="total">
          <p>志愿服务总队</p>
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
          v-if="orgIndexData.leftCenterTopInfo.name"
          class="name common01-ft36 animated flipInX left-center-top-info"
          @click="showChildDetail(orgIndexData.leftCenterTopInfo.id, orgIndexData.leftCenterTopInfo.name)"
        >{{orgIndexData.leftCenterTopInfo.name}}</div>
        <div
          v-if="orgIndexData.leftCenterTopInfo.name"
          class="name common01-ft36 animated flipInX left-center-bottom-info"
          @click="showChildDetail(orgIndexData.leftCenterBottomInfo.id, orgIndexData.leftCenterBottomInfo.name)"
        >{{orgIndexData.leftCenterBottomInfo.name}}</div>
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
          v-if="orgIndexData.rightCenterTopInfo.name"
          class="name common01-ft36 animated flipInX right-center-top-info"
          @click="showChildDetail(orgIndexData.rightCenterTopInfo.id, orgIndexData.rightCenterTopInfo.name)"
        >{{orgIndexData.rightCenterTopInfo.name}}</div>
        <div
          v-if="orgIndexData.rightCenterBottomInfo.name"
          class="name common01-ft36 animated flipInX right-center-bottom-info"
          @click="showChildDetail(orgIndexData.rightCenterBottomInfo.id, orgIndexData.rightCenterBottomInfo.name)"
        >{{orgIndexData.rightCenterBottomInfo.name}}</div>
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
          class="number left-center-top-info"
          @click="showChildDetail(orgIndexData.leftCenterTopInfo.id, orgIndexData.leftCenterTopInfo.name)"
        >{{orgIndexData.leftCenterTopInfo.number}}</div>
        <div
          class="number left-center-bottom-info"
          @click="showChildDetail(orgIndexData.leftCenterBottomInfo.id, orgIndexData.leftCenterBottomInfo.name)"
        >{{orgIndexData.leftCenterBottomInfo.number}}</div>
        <div
          class="number top-info"
          @click="showChildDetail(orgIndexData.leftBottomInfo.id, orgIndexData.leftBottomInfo.name)"
        >{{orgIndexData.leftBottomInfo.number}}</div>
        <div
          class="number right-top-info"
          @click="showChildDetail(orgIndexData.rightTopInfo.id, orgIndexData.rightTopInfo.name)"
        >{{orgIndexData.rightTopInfo.number}}</div>
        <div
          class="number right-center-top-info"
          @click="showChildDetail(orgIndexData.rightCenterTopInfo.id, orgIndexData.rightCenterTopInfo.name)"
        >{{orgIndexData.rightCenterTopInfo.number}}</div>
        <div
          class="number right-center-bottom-info"
          @click="showChildDetail(orgIndexData.rightCenterBottomInfo.id, orgIndexData.rightCenterBottomInfo.name)"
        >{{orgIndexData.rightCenterBottomInfo.number}}</div>
        <div
          class="number right-bottom-info"
          @click="showChildDetail(orgIndexData.rightBottomInfo.id, orgIndexData.rightBottomInfo.name)"
        >{{orgIndexData.rightBottomInfo.number}}</div>
      </div>
      <!-- 成员名单 -->
      <div class="member-div sys-flex" v-if="currentIndex === 1">
        <div class="left-part sys-flex-one">
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
        </div>
      </div>
    </div>
    <!-- 二级页面 -->
    <div class="orgStructure-detail-page common01-border" v-if="showDetailPage" v-loading="loading"  element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(9, 40, 94, 0.9)">
      <div class="back-btn back-btn-last common01-ft36" v-if="depath" @click="childDetailPageBack">上一级</div>
      <div class="common01-ft36" :class="depath? ' back-btn-first':'back-btn'"  @click="pageBack">返回</div>
      <img v-if="showUnit" class="unit_icon" src="../../../../assets/common/allunit.png" alt="" @click="showEvery1()">
      <img v-if="!showUnit" class="unit_icon" src="../../../../assets/common/unit.png" alt="" @click="showAll()">
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
        <div class="list-box sys-flex" v-if="detailInfo && detailInfo.length > 0 && !showList">
          <div class="item" v-for="(item, index) in detailInfo" :key="index">
            <div class="img-box" @click="getSixPlatformInfo(item)">
              <img v-if="item.head_pic" :src="item.head_pic" alt />
              <img v-else src="./assets/icon_group.png" alt />
            </div>
            <div class="name">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
        <!-- 三级页面 -->
        <div class="list-box sys-flex" v-if="detailInfo && detailInfo.length > 0 && showList">
          <div class="item" v-for="(item, index) in detailInfo" :key="index">
            <div class="img-box-volunteer">
              <img v-if="item.head_pic" :src="item.head_pic" alt />
              <img v-else src="./assets/icon_volunteer.png" alt />
            </div>
            <div class="volunteer-name">
              <span class="volunteer-name__span">{{item.real_name}}</span>
            </div>
            <div class="volunteer-name">
              <span class="volunteer-time">服务时长:</span>
              <span class="volunteer-hours">{{item.total}}</span>
            </div>
          </div>
        </div>
        <!-- 暂无数据 -->
        <div class="list-box sys-flex" v-if="!detailInfo.length">
         <p class="no-more">暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {GUID} from '@/servers/api'
import { getVolunteerOrganizeList, getVolunteerOrganizeDetail, getVolunteerMemberList, getSixPlatformInfo, getVolunteersInfo } from '@/servers/interface'
export default {
  name: 'orgStructure',
  data () {
    return {
      orgNav: ['组织结构'],
      showUnit: true,
      orgImg: require('./assets/icon_group.png'),
      currentIndex: 0,
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
        leftCenterTopInfo: {
          title: '',
          score: 0,
          id: ''
        },
        leftCenterBottomInfo: {
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
        rightCenterTopInfo: {
          title: '',
          score: 0,
          id: ''
        },
        rightCenterBottomInfo: {
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
      detailInfo: [],
      guid: GUID,
      detailId: '',
      detailName: '',
      // 三级页面
      depath: false,
      showList: false,
      list: [],
      count: 0,
      loading: true,
      timer: null
    }
  },
  created () {
    if (this.$route.query.currentIndex) {
      this.currentIndex = +this.$route.query.currentIndex
      console.log(this.$route.query.currentIndex)
    }
    if (this.$route.query.detailId) {
      this.detailId = this.$route.query.detailId
      this.detailName = this.$route.query.detailName
      this.showChildDetail(this.detailId, this.detailName)
    }
    this.getVolunteerOrganizeList()
    this.getVolunteerMemberList()
    if (window.location.href.indexOf('All') >= 0) {
      this.showUnit = true
    } else {
      this.showUnit = false
    }
  },
  computed: {
  },
  methods: {
    changeIndex (index) {
      this.currentIndex = index
    },
    showAll () {
      var url = window.location.origin + '/' + this.guid + '/All'
      window.location.href = url
    },
    showEvery () {
      var url = window.location.origin + '/' + this.guid + '/orgStructure' + '?currentIndex=' + this.currentIndex
      window.location.href = url
    },
    showEvery1 () {
      var url = window.location.origin + '/' + this.guid + '/orgStructure' + '?detailId=' + this.detailId + '&detailName=' + this.detailName
      window.location.href = url
    },
    getSixPlatformInfo (item) {
      this.loading = true
      // console.log(this.detailInfo)
      // if (this.detailTitle !== '六大平台' && item.isShow !== true) {
      //   return false
      // }
      if (item.isShow === true || this.detailTitle !== '六大平台') {
        this.depath = true
        this.showList = true
        getVolunteersInfo(item.id).then(res => {
          if (!res.data.error_code) {
            let _result = res.data.result
            if (_result) {
              this.detailTitle = item.name
              this.dimensionalArr.push({
                name: item.name,
                data: _result
              })
              this.timer = setTimeout(() => {
                this.detailInfo = _result
                this.loading = false
              }, 2000)
            }
          }
        })
      } else {
        getSixPlatformInfo(item.id).then(res => {
          if (!res.data.error_code) {
            let _result = res.data.result
            _result.forEach(val => {
              val['isShow'] = true
            })
            if (_result) {
              this.detailTitle = item.name
              this.dimensionalArr.push({
                name: item.name,
                data: _result
              })
              this.timer = setTimeout(() => {
                this.detailInfo = _result
                this.loading = false
              }, 2000)
            }
            // this.timer = setTimeout(() => {
            //   this.loading = false
            // }, 2000)
          }
        })
      }
    },
    checkCanShow (num) {
      if (this.detailInfo && this.detailInfo.length > num) {
        return true
      } else {
        return false
      }
    },
    // 获取组织架构
    getVolunteerOrganizeList () {
      getVolunteerOrganizeList().then(res => {
        // console.log(res.datsa.result.organize_cate, 'res')
        if (!res.data.error_code) {
          let _result = res.data.result.organize_cate
          if (_result && _result.length > 0) {
            this.orgIndexData.total = res.data.result.total
            this.orgIndexData.topInfo = _result[3]
            this.orgIndexData.leftTopInfo = _result[2]
            this.orgIndexData.leftBottomInfo = _result[1]
            this.orgIndexData.rightTopInfo = _result[0]
            this.orgIndexData.rightBottomInfo = _result[4]
            this.orgIndexData.leftCenterTopInfo = _result[5]
            this.orgIndexData.leftCenterBottomInfo = _result[6]
            this.orgIndexData.rightCenterTopInfo = _result[7]
            this.orgIndexData.rightCenterBottomInfo = _result[8]
            _result.forEach(e => {
              // if (/专业/.test(e.name)) {
              //   this.orgIndexData.topInfo = e
              // }
              // if (/区直/.test(e.name)) {
              //   this.orgIndexData.leftTopInfo = e
              // }
              // if (/六大/.test(e.name)) {
              //   this.orgIndexData.leftBottomInfo = e
              // }
              // if (/乡镇/.test(e.name)) {
              //   this.orgIndexData.rightTopInfo = e
              // }
              // if (/社会/.test(e.name)) {
              //   this.orgIndexData.rightBottomInfo = e
              // }
            })
          }
        }
      })
    },
    // 获取组织架构（子组织）
    showChildDetail (id, name) {
      this.count = 0
      this.detailId = id
      this.detailName = name
      if (name !== '六大平台') {
        this.depath = false
      } else {
        this.depath = true
      }
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
          this.loading = false
        }
      })
    },
    // 二级页面返回
    childDetailPageBack () {
      this.count += 1
      if (this.dimensionalArr.length > 1) {
        if (this.dimensionalArr.length === 2) {
          this.showList = false
          this.dimensionalArr = this.dimensionalArr.splice(0, 1)
          this.detailInfo = this.dimensionalArr[0].data
          this.detailTitle = this.dimensionalArr[0].name
          this.count = 0
        } else {
          this.showList = false
          this.dimensionalArr = this.dimensionalArr.splice(0, 2)
          this.detailInfo = this.dimensionalArr[1].data
          this.detailTitle = this.dimensionalArr[1].name
        }
        if (this.count === 2) {
          this.dimensionalArr = this.dimensionalArr.splice(0, 1)
          this.detailInfo = this.dimensionalArr[0].data
          this.detailTitle = this.dimensionalArr[0].name
        }
      } else {
        this.showDetailPage = false
        this.detailInfo = []
        this.dimensionalArr = []
        this.detailTitle = ''
        this.depath = false
        this.showList = false
      }
    },
    pageBack () {
      this.showDetailPage = false
      this.detailInfo = []
      this.dimensionalArr = []
      this.detailTitle = ''
      this.depath = false
      this.showList = false
    },
    // 成员名单
    getVolunteerMemberList () {
      getVolunteerMemberList().then(res => {
        if (!res.data.error_code) {
          let _result = res.data.result
          if (_result) {
            _result.forEach(e => {
              if (/实践中心/.test(e.title)) {
                this.memberIndexData.leftMember.title = e.title
                this.memberIndexData.leftMember.data = e.relation
              } else {
                this.memberIndexData.rightMember.title = e.title
                this.memberIndexData.rightMember.data = e.relation
              }
            })
          }
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
@import "../style/index.scss";
.common-orgStructure {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  background: #0a1742;
  * {
    font-family: "SourceHanSansSC-Medium";
  }
  .orgStructure-page {
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    .common01-title {
      height: pxrem(56px);
      font-weight: 600;
      line-height: 1;
      text-shadow: 0px 16px 16px rgba(7, 222, 255, 0.2);
    }
    .unit_icon {
      z-index: 1;
      width: pxrem(58px);
      height: pxrem(58px);
      position: absolute;
      top: pxrem(90px);
      right: pxrem(40px);
    }
    .tab-btn {
      position: absolute;
      z-index: 2;
      top: pxrem(90px);
      right: pxrem(150px);
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
      width: pxrem(1179px);
      height: pxrem(806px);
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
        top: pxrem(360px);
        left: pxrem(440px);
        p {
          font-size: pxrem(42px);
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
        top: pxrem(-86px);
        // left: pxrem(354px);
        right: pxrem(500px);
      }
      .name.left-top-info {
        // width: pxrem(294px);
        top: pxrem(165px);
        right: pxrem(1000px);
      }
      .name.left-center-top-info{
        top: pxrem(323px);
        right: pxrem(1200px);
      }
      .name.left-center-bottom-info{
        top: pxrem(514px);
        right: pxrem(1200px);
      }
      .name.left-bottom-info {
        // width: pxrem(374px);
        bottom: pxrem(48px);
        // right: pxrem(1306px);
        right: pxrem(1005px);
      }
      .name.right-top-info {
        // width: pxrem(294px);
        top: pxrem(160px);
        left: pxrem(1000px);
      }
      .name.right-center-top-info{
        top: pxrem(323px);
        left: pxrem(1200px);
      }
      .name.right-center-bottom-info{
        top: pxrem(514px);
        left: pxrem(1200px);
      }
      .name.right-bottom-info {
        // width: pxrem(408px);
        bottom: pxrem(50px);
        left: pxrem(1000px);
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
        top: pxrem(60px);
        left: pxrem(515px);
      }
      .number.left-top-info {
        top: pxrem(135px);
        left: pxrem(315px);
        color: #0ce7e6;
      }
      .number.left-center-top-info {
        top: pxrem(290px);
        left: pxrem(210px);
        color: #0ce7e6;
      }
      .number.left-center-bottom-info {
        top: pxrem(485px);
        left: pxrem(205px);
        color: #0ce7e6;
      }
      .number.left-bottom-info {
        bottom: pxrem(15px);
        left: pxrem(314px);
      }
      .number.right-top-info {
        top: pxrem(135px);
        right: pxrem(325px);
        color: #0ce7e6;
      }
      .number.right-center-top-info {
        top: pxrem(290px);
        right: pxrem(210px);
        color: #0ce7e6;
      }
      .number.right-center-bottom-info {
        top: pxrem(485px);
        right: pxrem(205px);
        color: #0ce7e6;
      }
      .number.right-bottom-info {
        bottom: pxrem(15px);
        right: pxrem(324px);
      }
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
    .unit_icon {
      z-index: 1;
      width: pxrem(58px);
      height: pxrem(58px);
      position: absolute;
      top: pxrem(90px);
      right: pxrem(40px);
    }
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
    .back-btn-first {
      position: absolute;
      z-index: 1;
      left: pxrem(350px);
      top: pxrem(80px);
      padding-left: pxrem(55px);
      color: #00ffea;
      font-weight: bold;
      background: url("./assets/icon_back.png") no-repeat;
      background-size: pxrem(36px) pxrem(28px);
      background-position: 0 pxrem(8px);
    }
    .back-btn {
      position: absolute;
      z-index: 1;
      left: pxrem(80px);
      top: pxrem(80px);
      padding-left: pxrem(55px);
      color: #00ffea;
      font-weight: bold;
      background: url("./assets/icon_back.png") no-repeat;
      background-size: pxrem(36px) pxrem(28px);
      background-position: 0 pxrem(8px);
    }
    .back-btn-last{
      background: url("./assets/icon_parent@2x.png") no-repeat;
      background-size: 0.36rem 0.36rem;
      background-position: 0 0.075rem;
      left: pxrem(80px);
    }
    .top-part {
      padding-top: pxrem(150px);
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
      padding-top: pxrem(51px);
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
        -webkit-transform: translateX(pxrem(4px));
        -moz-transform: translateX(pxrem(4px));
        -ms-transform: translateX(pxrem(4px));
        -o-transform: translateX(pxrem(4px));
        transform: translateX(pxrem(4px));
        box-shadow: 0px 0px pxrem(10px) pxrem(4px) #05e8f1;
      }
      .first-line {
        width: pxrem(2px);
        height: pxrem(60px);
        border-left: pxrem(2px) solid #03f6ff;
        border-right: none;
      }
    }
    .list-box {
      position: relative;
      width: pxrem(1758px);
      height: pxrem(480px);
      overflow-y: scroll;
      flex-flow: row wrap;
      margin: pxrem(59px) auto 0;
      justify-content: center;
      .no-more {
        color: #fff;
      }
      .item {
        width: pxrem(293px);
        height: pxrem(283px);
        padding-bottom: pxrem(16px);
        margin-bottom: pxrem(60px);
        .img-box {
          margin-bottom: pxrem(16px);
          img {
            width: pxrem(150px);
            height: pxrem(150px);
            border-radius: pxrem(20px);
          }
        }
        .img-box-volunteer {
          margin-bottom: pxrem(16px);
          img {
            width: pxrem(150px);
            height: pxrem(150px);
            border-radius: 50%;
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
        .volunteer-name {
          display: -webkit-box;
          font-size: pxrem(32px);
          color: #fff;
          width: pxrem(277px);
          height: pxrem(66px);
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: normal;
          word-break: break-all;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: center;
          .volunteer-name__span {
            display: inline-block;
            text-align: left;
          }
          .volunteer-time {
            font-size: pxrem(28px);
            color: #cccccc;
          }
          .volunteer-hours {
            font-size: pxrem(28px);
            color:#00fffa;
          }
        }
      }
    }
  }
}
</style>
