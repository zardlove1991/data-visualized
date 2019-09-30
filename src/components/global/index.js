import { getStyle } from '@/utils/model'
const curPath = getStyle()

const getComponent = modules => () => {
  // 不加载不属于套系内的组建
  if (modules.indexOf(curPath) > -1) {
    return import(`./${modules}`)
  }
  return false
}

/* 吉林套系 */
export const jilincomponentWorkcallInfoMap = getComponent('jilin/workcallInfoMap') // 在线记者
/* 吉林套系 end */

/* 新沂套系 */
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
