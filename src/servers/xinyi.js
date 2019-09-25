import { httpsbaseUrl, createAPI } from './api'

export const getReportData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallReportList&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ`)
export const getProjectData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ`)
export const getWebsitList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ`)
export const getWechatList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ`)
export const getWeiboList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ`)
export const getTaskList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallTaskList&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ`)
export const getTaskAccess = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallTaskAccess&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ`)
export const getRankList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=m2odata&a=getRankList&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ`)
export const getRankCommentList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=m2odata&a=newsCommentRank&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ`)
export const getHotTopicList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=getHotTopicList&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ`)
export const getTopicTrend = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=topicTrend&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ&id=${id}`)
export const getTopicEmotion = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=topicEmotion&custom_appid=401&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7&id=${id}`)
export const getTopicPubArea = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=hotspot&a=topicPubArea&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ&id=${id}`)
export const getConnecterList = (id) => createAPI(`${httpsbaseUrl}//index.php?m=Apidaping&c=stat&a=getWorkCallConnecterList&custom_appid=401&custom_appkey=bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ`)
export const getTvList = (id) => createAPI(`http://mapi.zyrb.com.cn/api/open/ziyang/daping_channel.php?appid=m2ox476nugyemljjju&appkey=cbb268bdc1b57938c834bb50f94859ab`)
