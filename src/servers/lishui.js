import { httpsbaseUrl, createAPI } from './api'
const baseid = '401'
const basekey = 'bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ'

/* 记者连线 */
export const getConnecterList = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=PROJECT_MGZlNTdhOT&a=getWorkCallConnectList`)
/* 获取热点话题 */
export const getHotTopicList = (page, size) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=getHotTopicList&flag=weekly&category=politics&custom_appid=${baseid}&customAppkey=${basekey}&size=${size}&page=${page}`)
/* 热点话题分析 */
export const getHotTopicDetail = (id, num) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=mediaAnalysis&id=${id}&num=${num}&custom_appid=${baseid}&customAppkey=${basekey}`)
/* 获取选题 */
export const getProjectData = (count = 8, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=${baseid}&custom_appkey=${basekey}&count=${count}&page=${page}`)
/* 获取报题 */
export const getReportData = (count = 8, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallReportList&custom_appid=${baseid}&custom_appkey=${basekey}&count=${count}&page=${page}`)
/* 任务列表 */
export const getTaskList = (count = 8, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallTaskList&custom_appid=${baseid}&custom_appkey=${basekey}&count=${count}&page=${page}`)
