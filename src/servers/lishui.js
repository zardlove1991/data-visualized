import { httpsbaseUrl, createAPI } from './api'
const baseid = '401'
const basekey = 'bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ'

const customAppid = '358'
const customAppkey = 'u2H7JB2scb0mPg0Pu7Vpguifg5rMbO1v'
const baseUrl = 'https://monitor-screen.cloud.hoge.cn'

/* 记者连线 */
export const getConnecterList = (id) => createAPI(`${httpsbaseUrl}//index.php?m=Apidaping&c=stat&a=getWorkCallConnecterList&customAppid=${baseid}&customAppkey=${basekey}`)
/* 获取热点话题 */
export const getHotTopicList = (page, size) => createAPI(`${baseUrl}/index.php?m=Apidaping&c=hotspot&a=getHotTopicList&flag=weekly&category=politics&customAppid=${customAppid}&customAppkey=${customAppkey}&size=${size}&page=${page}`)
/* 热点话题分析 */
export const getHotTopicDetail = (id, num) => createAPI(`${baseUrl}/index.php?m=Apidaping&c=hotspot&a=mediaAnalysis&id=${id}&num=${num}&customAppid=${customAppid}&customAppkey=${customAppkey}`)
/* 获取选题 */
export const getProjectData = (count, page) => createAPI(`${baseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&create_time=1&custom_appid=${customAppid}&custom_appkey=${customAppkey}&count=${count}&page=${page}`)
/* 获取报题 */
export const getReportData = (count = 8, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallReportList&custom_appid=${baseid}&custom_appkey=${basekey}&count=${count}&page=${page}`)
