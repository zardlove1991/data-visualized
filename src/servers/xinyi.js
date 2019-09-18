import { httpsbaseUrl, createAPI } from './api'

export const getReportData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallReportList&custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d`)
export const getProjectData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=330&custom_appkey=SYBOmr9PQ18DgblypgGa6nKLfMmbvr7d`)
