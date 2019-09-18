import { httpsbaseUrl, createAPI } from './api'

export const getReportData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallReportList&custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d`)
export const getProjectData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d`)
export const getWebsitList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d`)
export const getWechatList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d`)
export const getWeiboList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d`)
export const getTaskList = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallTaskList&custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d`)
export const getTaskAccess = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallTaskAccess&custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d
`)
