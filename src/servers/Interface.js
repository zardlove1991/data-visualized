import { httpsbaseUrl, createAPI, GUID } from './api'

/* 获取报题 */
export const getWorkCallReportList = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getWorkCallReportList&count=${count}&page=${page}`)

/* 获取选题 */
export const getWorkCallSubjectList = (count = 10, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getWorkCallSubjectList&count=${count}&page=${page}`)

/* 任务列表 */
export const getWorkCallTaskList = (count = 8, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getWorkCallTaskList&count=${count}&page=${page}`)

/* 任务数目 */
export const getWorkCallTaskNum = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getWorkCallTaskNum`)

/* 线索汇聚
plateForm:类型{
  website: '网站'，
  weChat：‘微信’，
  weBo: '微博'
}
*/
export const getCluesTogether = (plateForm = 'website', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getCluesTogether&plateForm=${plateForm}&count=${count}&page=${page}`)
// 新沂市单独接口
export const getCluesTogether149434 = (plateForm = 'website', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getCluesTogether&plateForm=${plateForm}&count=${count}&page=${page}&source=149434`)
export const getCluesTogether149433 = (plateForm = 'website', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getCluesTogether&plateForm=${plateForm}&count=${count}&page=${page}&source=149433`)

/* 稿件排行
desc：类型{
  click_num: '点击量',
  comment_num: '评论量'
}
*/
export const getM2OPlusRankList = (desc = 'website', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getM2OPlusRankList&desc=${desc}&count=${count}&page=${page}`)

/* 热点话题 */
export const getHotsTopicList = (count = 4, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getHotsTopicList&count=${count}&page=${page}`)

/* 热度走势 */
export const getHotsTopicTrend = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getHotsTopicTrend&id=${id}`)

/* 情感分析 */
export const getHotsTopicEmotion = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getHotsTopicEmotion&id=${id}`)

/* 地域分布 */
export const getHotsTopicPubArea = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getHotsTopicPubArea&id=${id}`)

/* 电视直播 */
export const getM2OPlusChannelList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=${GUID}&a=getM2OPlusChannelList`)
