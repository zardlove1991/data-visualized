import { httpsbaseUrl, createAPI } from './api'

export const getWorkCallReportList = (count = 4, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=ZWY2NzkyMT&a=getWorkCallReportList&count=${count}&page=${page}`) // 报题
export const getWorkCallSubjectList = (count = 4, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=ZWY2NzkyMT&a=getWorkCallSubjectList&count=${count}&page=${page}`) // 选题
export const getCluesTogether = (plateForm = 'website', count = 6, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=ZWY2NzkyMT&a=getCluesTogether&plateForm=${plateForm}&count=${count}&page=${page}`) // 线索汇聚
export const getHotTopicList = (count = 4, page = 1) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=ZWY2NzkyMT&a=getHotsTopicList&count=${count}&page=${page}`) // 热点新闻-列表
export const getHotsTopicTrend = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=ZWY2NzkyMT&a=getHotsTopicTrend&id=${id}`) // 热点新闻-热度走势
export const getHotsTopicEmotion = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=ZWY2NzkyMT&a=getHotsTopicEmotion&id=${id}`) // 热点新闻-情感分析
export const getHotsTopicPubArea = (id) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=ZWY2NzkyMT&a=getHotsTopicPubArea&id=${id}`) // 热点新闻-地域分布
