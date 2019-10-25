import { getStyle } from '@/utils/model'
const curPath = getStyle()

const getComponent = modules => () => {
  // 不加载不属于套系内的组件
  if (modules.indexOf(curPath) > -1) {
    return import(`./${modules}`)
  }
  return false
}

/* 新沂套系 */
// 因为该套系在圆形高出来前就做了，所以样式并非按照原型图做的，存在字体边距等较大差距
export const xinyicomponentReport = getComponent('xinyi/report')
export const xinyicomponentProject = getComponent('xinyi/project')
export const xinyicomponentClueGather = getComponent('xinyi/clueGather')
export const xinyicomponentTask = getComponent('xinyi/task')
export const xinyicomponentNews = getComponent('xinyi/news')
export const xinyicomponentOperateData = getComponent('xinyi/operateData')
export const xinyicomponentHotStats = getComponent('xinyi/hotStats')
export const xinyicomponentTitle = getComponent('xinyi/title')
export const xinyicomponentWorkcallInfoMap = getComponent('xinyi/workcallInfoMap')
export const xinyicomponentNewspaper = getComponent('xinyi/newspaper')
export const xinyicomponentTv = getComponent('xinyi/tv')

/* 马鞍山套系 */
export const maanshancomponentReport = getComponent('maanshan/report')
export const maanshancomponentProject = getComponent('maanshan/project')
export const maanshancomponentClueGather = getComponent('maanshan/clueGather')
export const maanshancomponentOpinionAnalysis = getComponent('maanshan/opinionAnalysis')

/* 溧水套系 */
// 主屏部分
export const lishuicomponentWorkcallInfoMap = getComponent('lishui/workcallInfoMap')
export const lishuicomponentDayTask = getComponent('lishui/dayTask')
