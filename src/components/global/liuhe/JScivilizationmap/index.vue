<template>
  <div class="commom-civilizationmap">
    <!-- 一级页面 -->
    <div class="common01-border civilizationmap_onepage" v-show="depath === 1">
       <div class="common01-title">{{viewAttr.header || '文明项目'}}</div>
       <div class="civilization_map" id="js-map"></div>
       <div class="organize-list">
         <div class="organize-list-nav flex flex-center" v-for="(item, index) in orgNavList" :key="item.name" @click="toOrgList(item, index)">
           <div class="organize-list-nav-icon hg-flex">
             <img src="./assets/icon_station@2x.png" alt="" class="icon_station1" :class="{icon_station2: index === 1}" v-if="index === 0 || index === 1">
              <span class="organize-list-nav-cir" :class="{organize_list_nav_cir1: index === 3}" v-if="index === 2 || index === 3"></span>
           </div>
           <p class="organize_name">{{item.name}}</p><span class="organize_num"><span v-if="item.number"> （{{item.number}}）</span> </span>
         </div>
       </div>
    </div>
    <!-- 二级页面 -->
    <div class="common01-border civilizationmap_twopage" v-if="depath === 2">
      <div class="common01-title">{{viewAttr.header || '站点列表'}}</div>
      <div class="civilization_list">
        <div class="civilization_list_top flex flex-center">
          <div class="list_top_info flex-one flex flex-center">
            <img src="./assets/icon_station@2x.png" alt="" class="top_info_image">
            <span class="top_info_title">{{currentTitle}}</span>
          </div>
          <!-- <div class="list_top_des">详情</div> -->
        </div>
        <div class="civilization_list_item flex">
          <div v-for="list in currentOrgList" :key="list.id" class="list_item flex flex-center">
            <div class="list_item_left flex-one flex">
              <span class="list_item_name" @click="toOrgDetail(list)">{{list.name}}（{{list.value[2]}}人）</span>
            </div>
            <img src="./assets/icon_detail@2x.png" alt="" class="item_detail_icon" @click="toOrgDetail(list)">
          </div>
        </div>
      </div>
      <div class="back-btn common01-ft36" @click="depath = 1; canBack = false">返回</div>
    </div>
    <!-- 三级页面 -->
    <div class="common01-border civilizationmap_twopage" v-if="depath === 3">
       <div class="common01-title">{{viewAttr.header || '站点详情'}}</div>
       <div class="civilization_list">
         <div class="civilization_list_top flex flex-center">
            <div class="list_top_info  flex flex-center">
              <img src="./assets/icon_station@2x.png" alt="" class="top_info_image">
              <span class="top_info_title">{{orgDetailInfo.name}}</span>
            </div>
         </div>
         <div class="org_detail_info">
           <div class="detail_info_top flex">
             <div class="detail_info_top_left flex-one flex">
               <div class="detail_info_number  flex" v-if="orgDetailInfo.title">
                 <img src="./assets/icon_name.png" alt="">
                 <span class="detail_info_number_span">队伍名称&nbsp;&nbsp;</span><p>{{orgDetailInfo.title}}</p>
               </div>
               <div class="detail_info_number flex">
                 <img src="./assets/icon_member@2x.png" alt="">
                 <span class="detail_info_number_span">志愿者人数&nbsp;&nbsp;{{orgDetailInfo.volunteer_num}}人</span>
               </div>
               <div class="detail_info_number detail_info_number_add flex">
                 <img src="./assets/icon_location@2x.png"  alt="">
                 <span class="detail_info_number_span">地址&nbsp;&nbsp;</span><p>{{orgDetailInfo.address}}</p>
               </div>
             </div>
             <div class="detail_info_top_right" v-if="orgDetailInfo.image">
               <img :src="img.host+ '160X120/' + img.filename" alt="" v-for="img in orgDetailInfo.image" :key="img.filename" class="detail_image">
             </div>
           </div>
           <div class="org_detail_line"></div>
           <div class="detail_info_bottom">
             <div class="org_features flex">
               <img src="./assets/icon_program@2x.png" alt="" >
               <span class="org_features_span">特色项目&nbsp;&nbsp;</span>
               <p class="org_features_name flex-one">{{orgDetailInfo.features[0].name}}</p>
             </div>
             <div class="org_features org_features_dec flex">
               <span class="features_des">项目简介&nbsp;&nbsp;</span>
               <p class="flex-one">{{orgDetailInfo.features[0].desc}}</p>
             </div>
           </div>
         </div>
       </div>
        <div class="back-btn back-btn-last common01-ft36" @click="pageBack">上一级</div>
        <div class="back-btn common01-ft36" @click="depath = 1; canBack = false">返回</div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getAllOrgList, getOrgNavList, getOrganizeDetail } from '@/servers/interface'
let JSicon = require('./assets/icon_station@2x.png')
let jsMap = require(`./jsonData/jsmap.json`)
echarts.registerMap('jsmap', jsMap)
export default {
  data () {
    return {
      canBack: false,
      depath: 1, // 页面层级
      orgDetailInfo: {}, // 组织详情
      currentOrgList: [], // 当前组织列表
      currentTitle: '金山区新时代文明实践中心',
      orgNavList: [],
      allOrgData: [], // 全部组织列表
      option: {
        geo: {
          map: 'jsmap',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false, // 禁止地图放大缩小
          itemStyle: {
            areaColor: 'rgb(0, 36, 109)',
            shadowColor: 'rgba(4, 77, 191)',
            shadowBlur: 20,
            borderColor: 'rgb(0, 36, 109)',
            emphasis: {
              color: 'rgba(0, 36, 109)'
            }
          },

          left: 20,
          right: 30,
          bottom: 20,
          top: 20
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'click',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            let x = 0 // x坐标位置
            let y = 0 // y坐标位置
            // 当前鼠标位置
            let pointX = point[0]
            let pointY = point[1]
            // 外层div大小
            // let viewWidth = size.viewSize[0];
            // let viewHeight = size.viewSize[1];
            // 提示框大小
            let boxWidth = size.contentSize[0]
            let boxHeight = size.contentSize[1]
            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = pointX + 10
            } else { // 左边放的下
              x = pointX - boxWidth - 20
            }
            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = pointY
            } else { // 上边放得下
              y = pointY - boxHeight + 30
            }
            return [x, y]
          },
          formatter (params) {
            let res = '<div id="specialLook"  onclick="tooltipClick(\'' + params.data.id + '\')"><p>站点名称: ' + params.data.name + '</p><p>站点人数: ' + params.data.value[2] + '人</p><p>站点地址: ' + params.data.address + '</p></div>'
            return res
          },
          textStyle: {
            align: 'left'
          }
          // position: function (pos, params, dom, rect, size) {
          //   // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
          //   let obj = {top: 60}
          //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
          //   return obj
          // }
        },
        series: [
          {
            name: '金山区新时代文明实践中心',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 30,
            symbolKeepAspect: true,
            symbol: `image://${JSicon}`,
            symbolOffset: [-40, 0],
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            // emphasis: {
            //   label: {
            //     color: 'rgba(255, 0, 0, 1)'
            //   }
            // },
            hoverAnimation: true,
            label: {
              clickable: true,
              normal: {
                formatter: '{b}',
                position: 'right',
                fontSize: 18,
                fontWeight: 600,
                fontFamily: 'Source Han Sans SC',
                show: true
              }
            },
            itemStyle: {
              color: '#0BFCFF'
            },
            zlevel: 4
          },
          {
            name: '金山区新时代文明实践分中心',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 16,
            symbol: `image://${JSicon}`,
            symbolKeepAspect: true,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            // emphasis: {
            //   label: {
            //     color: 'rgba(255, 0, 0, 1)'
            //   }
            // },
            hoverAnimation: true,
            label: {
              normal: {
                formatter (params) {
                  let strs = params.name.split('') // 字符串数组
                  let str = ''
                  for (let i = 0; i <= strs.length - 1; i++) { // 遍历字符串数组
                    str += strs[i]
                    if (!((i + 1) % 7)) str += '\n' // 按需要求余
                  }
                  return str
                },
                lineHeight: 17,
                fontWeight: 'bolder',
                position: ['100%', 0],
                show: true
              }
            },
            itemStyle: {
              color: '#ffffff'
            },
            zlevel: 3
          },
          {
            name: '金山区新时代文明实践站',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 6,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            emphasis: {
              itemStyle: {
                color: 'rgba(217, 0, 0, 1)'
              }
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              }
            },
            itemStyle: {
              color: 'rgba(255,255,0,1)'
            },
            zlevel: 2
          },
          {
            name: '金山区新时代文明实践点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 4,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            emphasis: {
              itemStyle: {
                color: 'rgba(217, 0, 0, 1)'
              }
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              }
            },
            itemStyle: {
              color: 'rgba(11,252,255,1)'
            },
            zlevel: 1
          }
        ]
      }
    }
  },
  mounted () {
    let myMap = echarts.init(document.getElementById('js-map'))
    this.getOrgNavList()
    this.getAllOrgList().then(res => {
      this.option.series[0].data = this.allOrgData[0]
      this.option.series[1].data = this.allOrgData[1]
      this.option.series[2].data = this.allOrgData[2]
      this.option.series[3].data = this.allOrgData[3]
      myMap.setOption(this.option)
    })
    let _this = this
    window.tooltipClick = function (id) {
      _this.canBack = true
      myMap.dispatchAction({
        type: 'hideTip' // 默认显示江苏的提示框
      })
      _this.toOrgDetail({ id })
    }
  },
  methods: {
    // 获取全部组织列表
    getAllOrgList () {
      return getAllOrgList().then(res => {
        let _result = res.data.result
        let orgDepath1Data = []
        let orgDepath2Data = []
        let orgDepath3Data = []
        let orgDepath4Data = []
        _result.forEach(val => {
          switch (val.depth) {
            case 1:
              orgDepath1Data.push({
                id: val.id,
                name: val.name,
                address: val.address,
                value: [val.longitude, val.latitude, val.volunteer_num]
              })
              break
            case 2:
              orgDepath2Data.push({
                id: val.id,
                name: val.name,
                address: val.address,
                value: [val.longitude, val.latitude, val.volunteer_num]
              })
              break
            case 3:
              orgDepath3Data.push({
                id: val.id,
                name: val.name,
                address: val.address,
                value: [val.longitude, val.latitude, val.volunteer_num]
              })
              break
            case 4:
              orgDepath4Data.push({
                id: val.id,
                name: val.name,
                address: val.address,
                value: [val.longitude, val.latitude, val.volunteer_num]
              })
              break
          }
        })
        this.allOrgData = [orgDepath1Data, orgDepath2Data, orgDepath3Data, orgDepath4Data]
        return _result
      })
    },
    getOrgNavList () {
      getOrgNavList().then(res => {
        this.orgNavList = res.data.result
      })
    },
    toOrgList (item, index) {
      if (!index) {
        this.depath = 3
        this.canBack = true
        this.toOrgDetail(this.allOrgData[index][0])
        return false
      }
      this.currentTitle = item.name
      this.depath = 2
      this.currentOrgList = index ? [...this.allOrgData[index]] : [...this.allOrgData[1]]
    },
    // 组织详情
    toOrgDetail (item) {
      getOrganizeDetail(item.id).then(res => {
        this.depath = 3
        this.orgDetailInfo = res.data.result
      })
    },
    pageBack () {
      if (this.canBack) {
        this.depath = 1
        this.canBack = false
        return false
      }
      this.depath = this.depath - 1
    }
  }
}
</script>

<style lang="scss">
#specialLook{
	pointer-events: all;
}
@import "~@/styles/index.scss";
@import "../style/index.scss";
.commom-civilizationmap{
    width: 100%;
    height: 100%;
    padding: pxrem(40px);
    background: #0a1742;
    * {
    font-family: "SourceHanSansSC-Medium";
  }
  .civilizationmap_twopage{
    position: relative;
    padding: 1.61rem 0.743rem 1.223rem 0.743rem;
    .civilization_list{
      width: 100%;
      height: 100%;
      .civilization_list_top{
        height: 1.265rem;
        width: 100%;
        padding: 0 0.474rem;
        background:rgba(0,55,137,1);
        .list_top_info{
          .top_info_image{
            width: 0.68rem;
            height: 0.6rem;
          }
          .top_info_title{
            font-weight:500;
            color:rgba(0,255,246,1);
            font-size: 0.443rem;
            margin-left: 0.284rem;
          }
        }
        .list_top_des{
          width: 1.55rem;
          height: 0.6rem;
          line-height: 0.6rem;
          background:linear-gradient(108deg,rgba(0,90,255,1),rgba(0,150,255,1));
          border-radius:0.3rem;
          color: #ffffff;
          font-size:0.316rem;
        }
      }
      .civilization_list_item{
        width: 100%;
        height: calc(100% - 1.265rem);
        flex-wrap: wrap;
        overflow-y: auto;
        .list_item{
          width: 50%;
          height: 1.58rem;
          padding: 0 0.732rem 0 0.316rem;
          &:nth-child(4n+1) {
            background: rgba(13,99,223, 0.15);
          }
          &:nth-child(4n+2) {
            background: rgba(13,99,223, 0.15);
          }
          &:nth-child(4n+3) {
            background: rgba(13,99,223, 0.05);
          }
          &:nth-child(4n+4) {
            background: rgba(13,99,223, 0.05);
          }
          .list_item_name{
            text-align: left;
            font-weight:500;
            color:rgba(255,255,255,1);
            font-size: 0.348rem;
          }
          .item_detail_icon{
            width: 0.316rem;
            height: 0.348rem;
          }
        }
      }
      .org_detail_info{
         width: 100%;
         height: calc(100% - 1.265rem);
         overflow-y: auto;
         padding: 0.553rem 0.633rem 0 0.633rem;
         .detail_info_top{
          //  height: 1.9rem;
           align-items: center;
           margin-bottom: 0.6rem;
           padding-left: 0.221rem;
           .detail_info_top_left{
             flex-direction: column;
             justify-content: space-between;
             align-items: flex-start;
            //  padding: 0.19rem 0;
             .detail_info_number{
               text-align: left;
               color:#ffffff;
               font-size: 0.348rem;
               margin-bottom: 0.3rem;
               img{
                  width: 0.348rem;
                  height: 0.348rem;
                  margin-top: 0.07rem;
                  margin-right: 0.1rem;
                }
               .detail_info_number_span{
                 white-space: nowrap;
               }
             }
             .detail_info_number_add{
               margin-bottom: 0;
             }
           }
           .detail_info_top_right{
             .detail_image{
               display:  inline-block;
               width: 2.53rem;
               height: 1.9rem;
               border-radius:4px;
               margin-right: 0.158rem;
             }
           }
         }
         .org_detail_line{
           height: 1px;
           background:rgba(255,255,255,0.3);
         }
         .detail_info_bottom{
           padding: 0.79rem 0.221rem 0 0.221rem;
           .org_features_dec{
             margin-top: 0.616rem;
           }
           .org_features{
             text-align: left;
             color:rgba(255,255,255,1);
             font-size:0.348rem;
             .org_features_name{
               color:rgba(0,192,255,1);
               font-size: 0.38rem;
             }
             .org_features_span{
               margin-left: 0.16rem;
             }
             .features_des{
               margin-left: 0.443rem;
             }
             img{
                margin-top: 0.1rem;
                width: 0.285rem;
                height: 0.285rem;
             }
           }
         }
      }
    }
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
      background-position: 0 0.08rem;
    }
    .back-btn-last{
      background: url("./assets/icon_parent@2x.png") no-repeat;
      background-size: 0.36rem 0.36rem;
      background-position: 0 0.08rem;
      right: 2.8rem;
    }
  }
  .civilization_map{
    position: absolute;
    width: 11.8rem;
    height: 8rem;
    top: 1rem;
    right: 0.8rem;
  }
  .organize-list{
    position: absolute;
    left: 0.6rem;
    bottom: 0.731rem;
    .organize-list-nav{
      margin-bottom: 0.269rem;
      .organize-list-nav-icon{
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.237rem;
        .icon_station1{
          width: 0.68rem;
          height: 0.6rem;
        }
        .icon_station2{
          width: 0.41rem;
          height: 0.348rem;
        }
        .organize-list-nav-cir{
          display: inline-block;
          width: 0.19rem;
          height: 0.19rem;
          border-radius: 50%;
          background: #FFFF00;
        }
        .organize_list_nav_cir1{
          background: #0BFCFF;
        }
      }
      .organize_name{
        font-size: 0.395rem;
        font-weight:500;
        color: #ffffff;
      }
      .organize_num{
        font-size: 0.395rem;
        color: #00C0FF;
      }
    }
  }
}
</style>
