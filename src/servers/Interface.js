import { httpsbaseUrl, createAPI, GUID } from './api'

/* 获取报题 */
export const getWorkCallReportList = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallReportList?count=${count}&page=${page}`)

/* 获取选题 */
export const getWorkCallSubjectList = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectList?count=${count}&page=${page}`)

/* 任务列表 */
export const getWorkCallTaskList = (count = 8, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallTaskList?count=${count}&page=${page}`)

/* 任务数目 */
export const getWorkCallTaskNum = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallTaskNum`)

/* 线索汇聚
plateForm:类型{
  website: '网站'，
  weChat：‘微信’，
  weBo: '微博'
}
*/
export const getCluesTogether = (plateForm = 'website', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getCluesTogether?plateForm=${plateForm}&count=${count}&page=${page}`)
// 新沂市单独接口
export const getCluesTogether149434 = (plateForm = 'website', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getCluesTogether?plateForm=${plateForm}&count=${count}&page=${page}&source=149434`)
export const getCluesTogether149433 = (plateForm = 'website', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getCluesTogether?plateForm=${plateForm}&count=${count}&page=${page}&source=149433`)

/* 稿件排行
desc：类型{
  click_num: '点击量',
  comment_num: '评论量'
}
*/
export const getM2OPlusRankList = (desc = 'website', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusRankList?desc=${desc}&count=${count}&page=${page}`)

/* 在线记者 */
export const getWorkCallConnectList = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallConnectList`)

/* 热点话题 */
export const getHotsTopicList = (count = 4, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicList?count=${count}&page=${page}`)

/* 热度走势 */
export const getHotsTopicTrend = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicTrend?id=${id}`)

/* 情感分析 */
export const getHotsTopicEmotion = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicEmotion?id=${id}`)

/* 地域分布 */
export const getHotsTopicPubArea = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicPubArea?id=${id}`)

/* 电视直播 */
export const getM2OPlusChannelList = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusChannelList`)

/* 发稿统计(个人) */
export const getM2OPlusWorkRank = (count = 8, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusWorkRank?count=${count}&page=${page}`)

/* 部门统计 */
export const getM2OPlusWorkDepartRank = (count = 8, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusWorkDepartRank?count=${count}&page=${page}`)
