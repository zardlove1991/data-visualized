import { createAPI } from './api'
const baseUrl = 'http://monitor-screen.cloud.hoge.cn'

export const getReportData = () => createAPI(`${baseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallReportList&custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d`)
