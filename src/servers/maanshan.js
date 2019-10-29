import { httpsbaseUrl, createAPI } from './api'
const baseid = '401'
const basekey = 'bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ'

export const getReportData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallReportList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 报题
export const getProjectData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 选题
export const getWebsitList = (count = 6, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=website&custom_appid=${baseid}&custom_appkey=${basekey}&platform=workcall&custom_id=188&count=${count}&page=${page}`) // 线索汇聚-网站
export const getWechatList = (count = 6, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=wechat&custom_appid=${baseid}&custom_appkey=${basekey}&platform=workcall&custom_id=188&count=${count}&page=${page}`) // 线索汇聚-微信
export const getWeiboList = (count = 6, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=weibo&custom_appid=${baseid}&custom_appkey=${basekey}&platform=workcall&custom_id=188&count=${count}&page=${page}`) // 线索汇聚-微博
export const getTaskList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallTaskList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 任务列表
export const getHotTopicList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=getHotTopicList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 热点新闻-列表
export const getTopicTrend = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=topicTrend&custom_appid=${baseid}&custom_appkey=${basekey}&id=${id}`) // 热点新闻-热度走势
export const getTopicEmotion = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=topicEmotion&custom_appid=${baseid}&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7&id=${id}`) // 热点新闻-情感分析
export const getTopicPubArea = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=topicPubArea&custom_appid=${baseid}&custom_appkey=${basekey}&id=${id}`) // 热点新闻-地域分布
