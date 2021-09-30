import Vue from 'vue'
import axios from 'axios'
import { getPlatId } from '@/utils/appinfo'
import { storage } from '@/utils/storage'

const instance = axios.create({
  timeout: 36000,
  credentials: false
})
/* 接口配置 guid: 项目标识默认 */
export const httpsbaseUrl = 'https://monitor-screen.cloud.hoge.cn'
// export const baseUrl = 'http://monitor-screen.cloud.hoge.cn'
export const workcallUrl = 'https://sys-team.cloud.hoge.cn'
export const huaianUrl = 'http://mapi.qpnews.com.cn/'
// export const thirdUrl = 'http://bigdata.hbzyai.com'
export const thirdUrl = 'https://monitor-screen.cloud.hoge.cn/hbzyai'
// export const thirdUrl = 'http://localhost:8086'
export const GUID = getPlatId()

// workcallInfoList 记者列表
export const getReporter = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=screen&a=reporterLine`)
export const getMemberInfo = (memberId) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=user&a=memberInfo&member_id=${memberId}&access_token={access_token}`)

/* 通用 */
// 大屏登录
export const doLogin = (data) => axios.post(`${workcallUrl}/sys/login/dologin?password=${data.password}&user_name=${data.user_name}`)
// 大屏用户详情
export const getUserDetail = () => createXietongAPI(`${workcallUrl}/Apisys/members/detail`, 'post')
// 查询其他用户详情
export const getOtherUserDetail = (userId) => createXietongAPI(`${workcallUrl}/Apisys/members/other_user_detail?user_id=${userId}`, 'post')
// 指挥连线用户详情
export const getUserInfo = (memberId) => createXietongAPI(`${workcallUrl}/Apisys/organization/memberDetail?member_id=${memberId}`)
/* 通用 end */
// ------------------------ 新沂大屏 ---------------------------//

export const customAppId = '401'
export const customAppKey = 'bOvXb4GgRsHhgNh4OvdFGZmlHnqOIpPJ'
// 获取宣传片的视频地址
export const getVideoUrl = () => axios.get(`${httpsbaseUrl}/Apidaping/NTk0YjQ2NW/propVideoUrl`)
// export const getUserId = () => axios.get(`${httpsbaseUrl}/index.php?m=Apidaping&c=user&a=login&user_name=17610861680&password=61680Abc&custom_appid=${customAppId}&custom_appkey=${customAppKey}`)
/* 稿件排行 点击数 */
// export const getRankList = () => createAPI(`${httpsbaseUrl}/Apidaping/NTk0YjQ2NW/getM2OPlusRankList?jnType=click`)
export const getRankList = () => createAPI(`http://mapi.xysrmt.cn/api/open/xyrm/get_wmxy?appid=m2oxufj7e8hv0kzvjk&appkey=ace3d0b5f325a6daab9aa141d470d968`)

// 相关报道数据
export const getContentDetail = (figureId) => createAPI(`${httpsbaseUrl}/?m=Apidaping&c=M2OPLUS_topic&a=columnContent&figure_id=${figureId}&custom_appid=${customAppId}`)
export const getCharacterDetail = (figureId) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=M2OPLUS_topic&a=detail&figure_id=${figureId}&custom_appid=${customAppId}`)

/* 发送websocket断连通知 */
export const isWebsocket = (link, name) => axios.get(`${httpsbaseUrl}/index.php?m=Apidaping&c=CLOUD_websocket&a=long_links_send&type=2&link=${link}&name=${name}`)
// 开启ai检测的数据接口
// export const startScan = (callback_url) => axios.post(`http://10.0.1.111:8011/face/recognize/live/start`, {url : `rtmp://10.0.1.111:1935/live/aitest`, callback_url: `http://10.0.1.111:8011/websocket/callback/${callback_url}`, quality_threshold: 0.01, min_face_size: 100, buffer_ms: 60000, timeout: 10, create_thumbnail : true, timeout: 50});
export const startScan = (callbackUrl) => axios.post(`http://aiearch.xysrmt.cn/face/recognize/live/start`, {url: `rtmp://192.168.13.200/live/av0`, callback_url: `http://aiearch.xysrmt.cn/websocket/callback/${callbackUrl}`, quality_threshold: 0.01, min_face_size: 100, buffer_ms: 60000, create_thumbnail: true, timeout: 50})

// ------------------------ end 新沂大屏 ---------------------//
// 获取配置数据
export const getConfigData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=CP_project&a=new_detail&guid=${GUID}`)

export const getUrl = (action) => {
  if (!action) {
    console.warn('接口地址不能为空')
    return false
  }
  return action
}

export const createAPI = (action, method = 'get', config = {}) => {
  if (action.indexOf('{access_token}') > -1) {
    let config = storage.get('saas_config')
    action = action.replace('{access_token}', config && config.extend ? config.extend.access_token : '')
  }
  return instance({
    url: getUrl(action),
    withCredentials: false,
    method,
    ...config
  })
}

export const createXietongAPI = (action, method = 'get', config = {}) => {
  let accesstoken = storage.get('access_token')
  if (!accesstoken) {
    window.ddVue.$router.push({
      path: '/login'
    })
    return
  }
  action = action + `&access_token=${accesstoken}`
  return instance({
    url: action,
    withCredentials: false,
    method,
    ...config
  })
}

Vue.mixin({
  beforeCreate () {
    const options = this.$options
    if (options.api) {
      this.$api = options.api
    } else if (options.parent && options.parent.$api) {
      this.$api = options.parent.$api
    }
  }
})

instance.interceptors.response.use((res, xhr) => {
  return res
}, (error) => {
  if (error && error.response) {
    switch (error.response.status) {
      case 403:
        window.ddVue.$router.push({
          path: '/error'
        })
        break
      default:
    }
  }
  return Promise.reject(error)
})
