import { httpsbaseUrl, createAPI } from './api'
const baseid = '401'
const basekey = 'bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ'

/* 记者连线 */
export const getConnecterList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT_main&a=getWorkCallConnectList`)
/* 运营数据 */
export const getOperateData = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT_main&a=getOperateData`)
/* 获取热点话题 */
export const getHotTopicList = (count = 4, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT_main&a=getHotsTopicList&count=${count}&page=${page}`)
/* 舆情分析 */
export const getHotsTopicTrend = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT_main&a=getHotsTopicTrend&id=${id}`)
/* 活跃媒体 */
export const getHotsTopicActiveMedia = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT_main&a=getHotsTopicActiveMedia&id=${id}`)
/* 媒体传播分布 */
export const getHotsTopicMedia = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT_main&a=getHotsTopicMedia&id=${id}`)
/* 热点话题分析 */
export const getHotTopicDetail = (id, num) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=mediaAnalysis&id=${id}&num=${num}&custom_appid=${baseid}&customAppkey=${basekey}`)
/* 获取选题 */
export const getProjectData = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT_main&a=getWorkCallSubjectList&count=${count}&page=${page}`)
/* 获取报题 */
export const getReportData = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT_main&a=getWorkCallReportList&count=${count}&page=${page}`)
/* 任务列表 */
export const getTaskList = (count = 8, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT_main&a=getWorkCallTaskList&count=${count}&page=${page}`)
