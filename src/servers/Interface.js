import { httpsbaseUrl, createAPI, GUID } from './api'

/* 获取报题 */
export const getJnWorkCallReportList = (count = 10, page = 1, createtime) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallReportList?count=${count}&page=${page}&create_time=${createtime}`)

/* 获取选题 */
export const getJnWorkCallSubjectList = (count = 10, page = 1, createtime) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectList?count=${count}&page=${page}&create_time=${createtime}`)

/* 获取报题 */
export const getWorkCallReportList = (count = 10, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallReportList?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 获取选题 */
export const getWorkCallSubjectList = (count = 10, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectList?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 任务列表 */
export const getWorkCallTaskList = (count = 8, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallTaskList?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 任务数目 */
export const getWorkCallTaskNum = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallTaskNum&view_id=${currentViewId}`)

/* 线索汇聚
plateForm:类型{
  website: '网站'，
  weChat：‘微信’，
  weBo: '微博'
}
*/
export const getCluesTogether = (plateForm = 'website', count = 6, page = 1, source) => (source ? createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getCluesTogether?plateForm=${plateForm}&count=${count}&page=${page}&source=${source}`) : createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getCluesTogether?plateForm=${plateForm}&count=${count}&page=${page}`))

/* 稿件排行
desc：类型{
  click_num: '点击量',
  comment_num: '评论量'
}
*/
export const getM2OPlusRankList = (desc = 'website', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusRankList?desc=${desc}&count=${count}&page=${page}`)

export const getMicroOperationArticleList = (id = '748', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getMicroOperationArticleList?bind_id=${id}&count=${count}&page=${page}`)

/* 在线记者 */
export const getWorkCallConnectList = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallConnectList&view_id=${currentViewId}`)

/* 记者详情 */
export const getIndexMemberDetail = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getIndexMemberDetail?user_id=${id}`)

/* 溧水运营数据 */
export const getOperateData = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getOperateData&view_id=${currentViewId}`)

/* 成稿产出 */
export const getM2OPlusPublish = (count = 5, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusPublish?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 辅屏传播效果 */
export const getM2OPlusEffects = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusEffects&view_id=${currentViewId}`)

/* 热点话题 */
export const getHotsTopicList = (count = 4, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicList?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 热度走势 */
export const getHotsTopicTrend = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicTrend?id=${id}`)

/* 情感分析 */
export const getHotsTopicEmotion = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicEmotion?id=${id}`)

/* 关联热词 */
export const getHotsTopicHotWord = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicHotWord?id=${id}`)

/* 地域分布 */
export const getHotsTopicPubArea = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicPubArea?id=${id}`)

/* 媒体占比 */
export const getHotsTopicActiveMedia = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicActiveMedia?id=${id}`)

/* 活跃媒体来源top10 */
export const getHotsTopicMedia = (id) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getHotsTopicMedia?id=${id}`)

/* 电视直播 */
export const getM2OPlusChannelList = (currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusChannelList&view_id=${currentViewId}`)

/* 发稿统计(个人) */
export const getM2OPlusWorkRank = (count = 8, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusWorkRank?count=${count}&page=${page}&view_id=${currentViewId}`)

/* 部门统计 */
export const getM2OPlusWorkDepartRank = (count = 8, page = 1, currentViewId) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPlusWorkDepartRank?count=${count}&page=${page}&view_id=${currentViewId}`)

// 江宁思想与实践
export const getThoughtPractice = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getThoughtPractice`)
// 江宁荔枝云
// export const getLitchiCloud = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getLitchiCloud`)
// 江宁新华社
export const getM2OPLUSArticleList = (count = 5, page = 1) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getM2OPLUSArticleList?category_id=49&date_search=0&count=${count}&page=${page}`)
// 文明江宁
export const getcivilizationJN = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getCivilizationJN`)
// 选题汇总
export const getJnProject = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectPie?model=d`)
// 报题展示
export const getJnReport = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectPie?model=d&module_id=report`)
// 传播分析
export const getOperationalData = () => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getOperationalData?source=app,weiBo,weChat,shortVideo`)
// 稿件统计
export const getWorkCallSubjectPie = (model) => createAPI(`${httpsbaseUrl}/Apidaping/${GUID}/getWorkCallSubjectPie?model=${model}`)
