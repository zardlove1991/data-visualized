import { httpsbaseUrl, createAPI } from './api'
const GUID = 'MGNlYzAyMT'

/* 记者连线 */
export const getWorkCallConnectList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getWorkCallConnectList`)
/* 获取热点话题 */
export const getHotsTopicList = (count = 4, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getHotsTopicList&count=${count}&page=${page}`)
/* 舆情分析 */
export const getHotsTopicTrend = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getHotsTopicTrend&id=${id}`)
/* 活跃媒体 */
export const getHotsTopicActiveMedia = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getHotsTopicActiveMedia&id=${id}`)
/* 媒体传播分布 */
export const getHotsTopicMedia = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getHotsTopicMedia&id=${id}`)
/* 获取选题 */
export const getProjectData = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getWorkCallSubjectList&count=${count}&page=${page}`)
/* 获取报题 */
export const getReportData = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getWorkCallReportList&count=${count}&page=${page}`)
/* 内容统计 */
export const getM2OPlusRankList = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getM2OPlusRankList&count=${count}&page=${page}`)
/* 发稿统计 */
export const getM2OPlusWorkRank = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getM2OPlusWorkRank&count=${count}&page=${page}`)
/* 部门统计 */
export const getM2OPlusWorkDepartRank = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getM2OPlusWorkDepartRank&count=${count}&page=${page}`)
