import { httpsbaseUrl, createAPI } from './api'

/* 记者连线 */
export const getConnecterList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getWorkCallConnectList`)
/* 运营数据 */
export const getOperateData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getOperateData`)
/* 获取热点话题 */
export const getHotTopicList = (count = 4, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getHotsTopicList&count=${count}&page=${page}`)
/* 舆情分析 */
export const getHotsTopicTrend = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getHotsTopicTrend&id=${id}`)
/* 活跃媒体 */
export const getHotsTopicActiveMedia = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getHotsTopicActiveMedia&id=${id}`)
/* 媒体传播分布 */
export const getHotsTopicMedia = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getHotsTopicMedia&id=${id}`)
/* 获取选题 */
export const getProjectData = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getWorkCallSubjectList&count=${count}&page=${page}`)
/* 获取报题 */
export const getReportData = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getWorkCallReportList&count=${count}&page=${page}`)
/* 任务列表 */
export const getTaskList = (count = 8, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getWorkCallTaskList&count=${count}&page=${page}`)
/* 辅屏任务数目 */
export const getDaytaskNum = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getWorkCallTaskNum`)
/* 辅屏成稿产出 */
export const getArticleList = (page, size) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getM2OPlusPublish&page=${page}&size=${size}`)
/* 辅屏传播效果 */
export const getEffect = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getM2OPlusEffects`)
/* 辅屏个人排行 */
export const getRankList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=MGZlNTdhOT&a=getM2OPlusWorkRank`)
