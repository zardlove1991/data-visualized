import { getStyle } from '@/utils/model'
const curPath = getStyle()

const getComponent = modules => () => {
  // 不加载不属于套系内的组建
  if (modules.indexOf(curPath) > -1) {
    return import(`./${modules}`)
  }
  return false
}

/* 柳河套系 */
export const liuhecomponentTitle = getComponent('liuhe/title')
export const liuhecomponentAllProvinceData = getComponent('liuhe/allProvinceData') // 数据分析
export const liuhecomponentWebWeixinHotNews = getComponent('liuhe/webWeixinHotNews') // 网微端热点
export const liuhecomponentHotwords = getComponent('liuhe/hotwords') // 全网热词
export const liuhecomponentNewsdata = getComponent('liuhe/newsdata') // 新闻统计
export const liuhecomponentOperationControlData = getComponent('liuhe/operationControlData') // 终端统计
export const liuhecomponentFusionMediaData = getComponent('liuhe/fusionMediaData') // 融媒大数据
export const liuhecomponentWorkcallInfoMap = getComponent('liuhe/workcallInfoMap') // 在线记者
export const liuhecomponentWorkcallInfoList = getComponent('liuhe/workcallInfoList') // 指挥调度
export const liuhecomponentFusionMediaScroll = getComponent('liuhe/fusionMediaScroll')
export const liuhecomponentFusionMediaList = getComponent('liuhe/fusionMediaList')
export const liuhecomponentAllProvinceDataMap = getComponent('liuhe/allProvinceDataMap')
export const liuhecomponentAllProvinceDataChart = getComponent('liuhe/allProvinceDataChart')
export const liuhecomponentVideoList = getComponent('liuhe/videoList') // 直播监看
export const liuhecomponentVideoChart = getComponent('liuhe/videoList/videoChart') // 直播数据统计
export const liuhecomponentWorkcallCommand = getComponent('liuhe/workcallCommand') // 协同指挥
export const liuhecomponentWechatPublicStatistics = getComponent('liuhe/wechatPublicStatistics') // 媒体热度榜
/* 柳河套系 end */

/* 磐石套系 */
export const panshicomponentTitle = getComponent('panshi/title')
export const panshicomponentAllProvinceData = getComponent('panshi/allProvinceData') // 数据分析
export const panshicomponentWebWeixinHotNews = getComponent('panshi/webWeixinHotNews') // 网微端热点
export const panshicomponentNewsdata = getComponent('panshi/newsData') // 新闻统计
export const panshicomponentOperationControlData = getComponent('panshi/operationControlData') // 终端统计
export const panshicomponentFusionMediaData = getComponent('panshi/fusionMediaData') // 融媒大数据
export const panshicomponentWorkcallInfoMap = getComponent('panshi/workcallInfoMap') // 在线记者
export const panshicomponentWorkcallInfoList = getComponent('panshi/workcallInfoList') // 指挥调度
export const panshicomponentAllProvinceDataMap = getComponent('panshi/allProvinceDataMap') // 数据分析地图
export const panshicomponentAllProvinceDataChart = getComponent('panshi/allProvinceDataChart')
export const panshicomponentVideoList = getComponent('panshi/videoList') // 直播监看
export const panshicomponentVideoChart = getComponent('panshi/videoList/videoChart') // 直播数据统计
export const panshicomponentHotwords = getComponent('panshi/hotwords') // 全网热词
export const panshicomponentHotConvergence = getComponent('panshi/hotConvergence') // 热点汇聚
export const panshicomponentDynamicInformation = getComponent('panshi/dynamicInformation') // 动态资讯
/* 磐石套系 end */

/* 江宁套系 */
export const jiangningcomponentProject = getComponent('jiangning/project') // 江宁大屏-选题展示
export const jiangningcomponentTaskShow = getComponent('jiangning/taskShow') // 江宁大屏-任务统计
export const jiangningcomponentClueGather = getComponent('jiangning/clueGather') // 江宁大屏-线索汇聚
export const jiangningcomponentReport = getComponent('jiangning/report') // 江宁大屏-报题展示
export const jiangningcomponentReporterMap = getComponent('jiangning/reporterMap') // 江宁大屏-报题展示
/* 江宁套系 end */

/* 吉林套系 */
export const jilincomponentWorkcallInfoMap = getComponent('jilin/workcallInfoMap') // 在线记者
export const jilincomponentWebWeixinHotNews = getComponent('jilin/webWeixinHotNews') // 网微端热点
export const jilincomponentAllProvinceData = getComponent('jilin/allProvinceData') // 数据分析
export const jilincomponentNewsdata = getComponent('jilin/newsData') // 新闻统计
export const jilincomponentHotword = getComponent('jilin/hotwords') // 全网热词
export const jilincomponentHotConvergence = getComponent('jilin/hotConvergence') // 热点汇聚
export const jilincomponentFusionMediaData = getComponent('jilin/fusionMediaData') // 融媒大数据
export const jilincomponentVideoList = getComponent('jilin/videoList') // 直播监看
export const jilincomponentWorkcallCommand = getComponent('jilin/workcallCommand') // 协同指挥
/* 吉林套系 end */

/* 新沂套系 */
export const xinyicomponentReport = getComponent('xinyi/report')
export const xinyicomponentProject = getComponent('xinyi/project')
export const xinyicomponentClueGather = getComponent('xinyi/clueGather')
export const xinyicomponentTask = getComponent('xinyi/task')
