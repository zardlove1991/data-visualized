import { httpsbaseUrl, createAPI } from './api'
const baseid = '401'
const basekey = 'bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ'

export const getReportData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallReportList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 报题
export const getProjectData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 选题
export const getWebsitList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 线索汇聚-网站
export const getWechatList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 线索汇聚-微信
export const getWeiboList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 线索汇聚-微博
export const getTaskList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallTaskList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 任务列表
export const getTaskAccess = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallTaskAccess&custom_appid=${baseid}&custom_appkey=${basekey}`) // 任务统计
export const getRankList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=m2odata&a=getRankList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 稿件排行-阅读量
export const getRankCommentList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=m2odata&a=newsCommentRank&custom_appid=${baseid}&custom_appkey=${basekey}`) // 稿件排行-推荐量
export const getHotTopicList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=getHotTopicList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 热点新闻-列表
export const getTopicTrend = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=topicTrend&custom_appid=${baseid}&custom_appkey=${basekey}&id=${id}`) // 热点新闻-热度走势
export const getTopicEmotion = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=topicEmotion&custom_appid=${baseid}&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7&id=${id}`) // 热点新闻-情感分析
export const getTopicPubArea = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=topicPubArea&custom_appid=${baseid}&custom_appkey=${basekey}&id=${id}`) // 热点新闻-地域分布
export const getConnecterList = (id) => createAPI(`${httpsbaseUrl}//index.php?m=Apidaping&c=stat&a=getWorkCallConnecterList&custom_appid=${baseid}&custom_appkey=${basekey}`) // 记者连线
export const getTvList = (id) => createAPI(`http://mapi.zyrb.com.cn/api/open/ziyang/daping_channel.php?appid=m2ox476nugyemljjju&appkey=cbb268bdc1b57938c834bb50f94859ab`) // 电视直播
