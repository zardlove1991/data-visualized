import { getStyle } from '@/utils/model'
const curPath = getStyle()

const getComponent = modules => () => {
  // 不加载不属于套系内的组件
  if (modules.indexOf(curPath) > -1) {
    console.log(modules, 'modules')
    return import(`./${modules}`)
  }
  return false
}

/* 新沂套系 */
// 因为该套系在圆形高出来前就做了，所以样式并非按照原型图做的，存在字体边距等较大差距
export const xinyicomponentReport = getComponent('xinyi/report')
export const xinyicomponentProject = getComponent('xinyi/project')
export const xinyicomponentClueGather = getComponent('xinyi/clueGather')
export const xinyicomponentTask = getComponent('xinyi/task')
export const xinyicomponentNews = getComponent('xinyi/news')
export const xinyicomponentOperateData = getComponent('xinyi/operateData')
export const xinyicomponentHotStats = getComponent('xinyi/hotStats')
export const xinyicomponentTitle = getComponent('xinyi/title')
export const xinyicomponentWorkcallInfoMap = getComponent('xinyi/workcallInfoMap')
export const xinyicomponentNewspaper = getComponent('xinyi/newspaper')
export const xinyicomponentTv = getComponent('xinyi/tv')
export const xinyicomponentIntelligenceBriefing = getComponent('xinyi/intelligenceBriefing')
export const xinyicomponentCharacterInformation = getComponent('xinyi/characterInformation')
export const xinyicomponentRelatedReports = getComponent('xinyi/relatedReports')
export const xinyicomponentCharacterOne = getComponent('xinyi/characterOne')
export const xinyicomponentClickList = getComponent('xinyi/clickList')
export const xinyicomponentCharacterSeven = getComponent('xinyi/characterSeven')
export const xinyicomponentCharacterAll = getComponent('xinyi/characterAll')

/* 梧州套系 */
export const wuzhoucomponentContentPlot = getComponent('wuzhou/contentPlot')
export const wuzhoucomponentNewsGather = getComponent('wuzhou/newsGather')
export const wuzhoucomponentTitleWz = getComponent('wuzhou/titleWz')
export const wuzhoucomponentHotWords = getComponent('wuzhou/hotWords')
export const wuzhoucomponentCummunicationEffetc = getComponent('wuzhou/cummunicationEffetc')
export const wuzhoucomponentOnlineReporter = getComponent('wuzhou/onlineReporter')
export const wuzhoucomponentAuditRelease = getComponent('wuzhou/auditRelease')
export const wuzhoucomponentContentDistribute = getComponent('wuzhou/contentDistribute')
export const wuzhoucomponentPerformanceRank = getComponent('wuzhou/performanceRank')
export const wuzhoucomponentOperationData = getComponent('wuzhou/operationData')

/* 马鞍山套系 */
export const maanshancomponentReport = getComponent('maanshan/report') // 报题展示
export const maanshancomponentProject = getComponent('maanshan/project') // 选题展示
export const maanshancomponentClueGather = getComponent('maanshan/clueGather') // 线索汇聚
export const maanshancomponentOpinionAnalysis = getComponent('maanshan/opinionAnalysis') // 舆情分析
export const maanshancomponentCommunicationEffect = getComponent('maanshan/communicationEffect')
export const maanshancomponentWorkcallInfoMap = getComponent('maanshan/workcallInfoMap') // 记者联线
export const maanshancomponentNews = getComponent('maanshan/news') // 稿件排行
export const maanshancomponentTask = getComponent('maanshan/task') // 选题展示
export const maanshancomponentOperateData = getComponent('maanshan/operateData') // 运营数据
export const maanshancomponentContentProduction = getComponent('maanshan/contentProduction') // 内容生产
export const maanshancomponentHotTopic = getComponent('maanshan/hotTopic') // 全网热点
export const maanshancomponentDataAnalysis = getComponent('maanshan/dataAnalysis') // 数据分析
export const maanshancomponentNewsProduction = getComponent('maanshan/newsProduction') // 稿件生产

/* 溧水套系 */
// 主屏部分
export const lishuicomponentWorkcallInfoMap = getComponent('lishui/workcallInfoMap')
export const lishuicomponentWorkcallInfoMap1 = getComponent('lishui/workcallInfoMap1')
export const lishuicomponentDayTask = getComponent('lishui/dayTask')
export const lishuicomponentDataAnalysis = getComponent('lishui/dataAnalysis')
export const lishuicomponentOperateData = getComponent('lishui/operateData')
export const lishuicomponentProject = getComponent('lishui/project')
export const lishuicomponentReport = getComponent('lishui/report')
export const lishuicomponentTask = getComponent('lishui/task')
export const lishuicomponentContentProduction = getComponent('lishui/contentProduction')
export const lishuicomponentManuscriptOutput = getComponent('lishui/manuscriptOutput')
export const lishuicomponentCommunicationEffect = getComponent('lishui/communicationEffect')
export const lishuicomponentWebsiteContent = getComponent('lishui/websiteContent')
export const lishuicomponentPersonalRanking = getComponent('lishui/personalRanking')
export const lishuicomponentHotword = getComponent('lishui/hotword')
export const lishuicomponentOpinion = getComponent('lishui/opinion')

/* 清徐县套系 */
export const qingxucomponentReport = getComponent('qingxu/report')
export const qingxucomponentProject = getComponent('qingxu/project')
export const qingxucomponentHotTopic = getComponent('qingxu/hotTopic')
export const qingxucomponentWorkcallInfoMap = getComponent('qingxu/workcallInfoMap')
export const qingxucomponentOpinionAnalysis = getComponent('qingxu/opinionAnalysis')
export const qingxucomponentNews = getComponent('qingxu/news')
export const qingxucomponentPersonalRanking = getComponent('qingxu/personalRanking')
export const qingxucomponentDepartmentRanking = getComponent('qingxu/departmentRanking')
export const qingxucomponentReportDemo = getComponent('qingxu/reportDemo')
export const qingxucomponentProjectDemo = getComponent('qingxu/projectDemo')
export const qingxucomponentHotTopicDemo = getComponent('qingxu/hotTopicDemo')
export const qingxucomponentTaskDemo = getComponent('qingxu/taskDemo')
export const qingxucomponentLeftDemo = getComponent('qingxu/leftDemo')

/* 江宁套系 */
export const jiangningcomponentIdeologicalPractice = getComponent('jiangning/ideologicalPractice')
export const jiangningcomponentLzCloud = getComponent('jiangning/lzCloud')
export const jiangningcomponentNewsAgency = getComponent('jiangning/newsAgency')
export const jiangningcomponentCivilizationJn = getComponent('jiangning/civilizationJn')
export const jiangningcomponentCueNavigation = getComponent('jiangning/cueNavigation')
export const jiangningcomponentDataStatistics = getComponent('jiangning/dataStatistics')
export const jiangningcomponentReport = getComponent('jiangning/report')
export const jiangningcomponentProject = getComponent('jiangning/project')
export const jiangningcomponentPublish = getComponent('jiangning/publish')
export const jiangningcomponentNews = getComponent('jiangning/news')

/* 柳河套系 */
export const liuhecomponentActivityInfo = getComponent('liuhe/activityInfo') // 活动资讯
export const liuhecomponentOrderSheet = getComponent('liuhe/orderSheet') // 点单中心
export const liuhecomponentOrgStructure = getComponent('liuhe/orgStructure') // 组织架构
export const liuhecomponentCivilizationRank = getComponent('liuhe/civilizationRank') // 盐湖大屏 文明管理
export const liuhecomponentJSactivityinfo = getComponent('liuhe/JSactivityinfo') //  金山大屏 活动资讯
export const liuhecomponentJSordersheet = getComponent('liuhe/JSordersheet') // 金山大屏 点单中心
export const liuhecomponentJSorgstructure = getComponent('liuhe/JSorgstructure') // 金山大屏 组织架构
export const liuhecomponentJScivilizationrank = getComponent('liuhe/JScivilizationrank') // 金山大屏 文明管理
export const liuhecomponentJScivilizationmap = getComponent('liuhe/JScivilizationmap') // 金山大屏 文明地图
export const liuhecomponentMASorgStructure = getComponent('liuhe/MASorgStructure') // 马鞍山组织架构

/* 标准套系01 */
export const common01componentTitle = getComponent('common01/title') // 标题
export const common01componentClueGather = getComponent('common01/clueGather')
export const common01componentManuscript = getComponent('common01/manuscript')
export const common01componentManuscript02 = getComponent('common01/manuscript02')
export const common01componentMessage = getComponent('common01/message') // 消息汇总businessDate
export const common01componentReport = getComponent('common01/report')
export const common01componentProject = getComponent('common01/project')
export const common01componentProject02 = getComponent('common01/project02')
export const common01componentTaskShow = getComponent('common01/taskShow')
export const common01componentNewArticle = getComponent('common01/newArticle')
export const common01componentClickRank = getComponent('common01/clickRank')
export const common01componentDispatchRank = getComponent('common01/dispatchRank')
export const common01componentOperateData = getComponent('common01/operateData')
export const common01componentWorkcallInfoMap = getComponent('common01/workcallInfoMap')
export const common01componentWorkcallInfoMap02 = getComponent('common01/workcallInfoMap02') // 在线记者，带大标题
export const common01componentWorkcallInfoMap03 = getComponent('common01/workcallInfoMap03') // 盐城城南大屏
export const common01componentEffect = getComponent('common01/effect') // 传播效果
export const common01componentProduction = getComponent('common01/production') // 内容生产
export const common01componentOperateData02 = getComponent('common01/operateData02') // 运营数据
export const common01componentPersonRank = getComponent('common01/personRank') // 个人排行
export const common01componentHotSpots = getComponent('common01/hotSpots') // 市县热点
export const common01componentAdvertisingAlliance = getComponent('common01/advertisingAlliance') // 客户分布
export const common01componentMengDian = getComponent('common01/mengDian') // 蒙点号
export const common01componentTv = getComponent('common01/tv') // tv
export const common01componentTv02 = getComponent('common01/tv02') // tv2
export const common01componentApprank = getComponent('common01/apprank') // app排行
export const common01componentLiveRank = getComponent('common01/liveRank') // 直播排行
export const common01componentContentEffect = getComponent('common01/contentEffect') // 作品影响力
export const common01componentUserHeatmap = getComponent('common01/userHeatmap') // 用户热力图
export const common01componentWeiboHotpoint = getComponent('common01/weiboHotpoint') // 微博热点
export const common01componentWorkDepartRank = getComponent('common01/workDepartRank') // 部门排行
export const common01componentWebHotpoint = getComponent('common01/webHotpoint') // 网站热点
export const common01componentWechatHotPoint = getComponent('common01/wechatHotpoint') // 微信热点
export const common01componentDataSystem = getComponent('common01/dataSystem') // 数据系统
export const common01componentNewProject = getComponent('common01/newProject') // 杭州选题上大屏
export const common01componentWebToutiao = getComponent('common01/webToutiao') // 盐城全网头条
export const common01componentChengnan = getComponent('common01/chengnan') // 盐城城南聚焦
export const common01componentWordcloud = getComponent('common01/wordcloud') // 热点词云
export const common01componentLearingPower = getComponent('common01/learningPower') // 学习强国
export const common01componentWechatRank = getComponent('common01/wechatRank') // 盐城微信排行榜
export const common01componentWechatMatrix = getComponent('common01/wechatMatrix') // 盐城微信矩阵
export const common01componentDataAnalysis = getComponent('common01/dataAnalysis') // 盐城舆情分析
export const common01componentMyYancheng = getComponent('common01/myYancheng') // 盐城舆情分析
export const common01componentLiveCamera = getComponent('common01/liveCamera') // 盐城直播摄像头
export const common01componentYanchengGather = getComponent('common01/yanchengGather') // 盐城聚合信息
export const common01componentYanchengScreen = getComponent('common01/yanchengScreen') // 盐城聚合信息
export const common01componentTitle02 = getComponent('common01/title02') // 标题2

export const common01componentIframe = getComponent('common01/iframe') // 芜湖 外链展示
export const common01componentWuhuTitle = getComponent('common01/wuhuTitle') // 芜湖 标题
export const common01componentOperateData03 = getComponent('common01/operateData03') //  运营数据03
export const common01componentTaskShow03 = getComponent('common01/taskShow03') //  运营数据03

export const common01componentYuqing = getComponent('common01/yuqing') // 雨花台区 舆情分析
export const common01componentClueGather2 = getComponent('common01/clueGather2') // 雨花台区 线索汇聚
export const common01componentBusinessDate = getComponent('common01/businessDate') // 雨花台区 运营数据
export const common01componentTaskShow02 = getComponent('common01/taskShow02') // 雨花台区 任务展示
export const common01componentVideoList = getComponent('common01/videoList') // 雨花台区 视频列表
export const common01componentYuhuaTitle = getComponent('common01/yuhuaTitle') // 雨花台区 标题
export const common01componentReport2 = getComponent('common01/report2') // 雨花台区 报题
export const common01componentTaskShow04 = getComponent('common01/taskShow04') // 雨花台区 任务

export const common01componentContentPlan = getComponent('common01/contentPlan') // 山西 内容策划
export const common01componentNewsGatherEdit = getComponent('common01/newsGatherEdit') // 山西 新闻采编
export const common01componentPerformanceAppraisal = getComponent('common01/performanceAppraisal') // 山西 绩效考核
export const common01componentSxTitle = getComponent('common01/sxTitle') // 山西 标题
export const common01componentReporterConnection = getComponent('common01/reporterConnection') // 山西 记者连线
export const common01componentReviewRelease = getComponent('common01/reviewRelease') // 山西 审核发布
export const common01componentContentSpread = getComponent('common01/contentSpread') // 山西 内容传播
export const common01componentOperationData = getComponent('common01/operationData') // 山西 运营数据
export const common01componentSxMiddle = getComponent('common01/sxMiddle') // 山西 中间
// 淮安套系
export const common01componentHuaianReport = getComponent('common01/huaianReport') // 淮安清江浦 报题展示
export const common01componentHuaianReport2 = getComponent('common01/huaianReport2') // 淮安清江浦 报题展示2
export const common01componentHuaianProject = getComponent('common01/huaianProject') // 淮安清江浦 选题展示
export const common01componentHuaianProject2 = getComponent('common01/huaianProject2') // 淮安清江浦 选题展示2
export const common01componentHuaianTaskShow = getComponent('common01/huaianTaskShow') // 淮安清江浦 任务展示
export const common01componentHuaianClueGather = getComponent('common01/huaianClueGather') // 淮安清江浦 线索汇聚
export const common01componentHuaianClueGather01 = getComponent('common01/huaianClueGather01') // 淮安清江浦 线索汇聚
export const common01componentHuaianClueGather02 = getComponent('common01/huaianClueGather02') // 淮安清江浦 线索汇聚
export const common01componentHuaianClueGather03 = getComponent('common01/huaianClueGather03') // 淮安清江浦 线索汇聚
export const common01componentHuaianTitle = getComponent('common01/huaianTitle') // 淮安清江浦 标题
export const common01componentHuaianReporterConnection = getComponent('common01/huaianReporterConnection') // 淮安清江浦 记者连线
export const common01componentHuaianLeaderNews = getComponent('common01/huaianLeaderNews') // 淮安清江浦 领导动态
export const common01componentHuaianLeaderNews01 = getComponent('common01/huaianLeaderNews01') // 淮安清江浦 领导动态1
export const common01componentHuaianDataShow = getComponent('common01/huaianDataShow') // 淮安清江浦 数据展示
export const common01componentHuaianReporterConnection2 = getComponent('common01/huaianReporterConnection2') // 淮安清江浦 记者连线2
export const common01componentHuaianHotnews = getComponent('common01/huaianHotnews') // 淮安清江浦 全网热点
export const common01componentHuaianWmkqjp = getComponent('common01/huaianWmkqjp') // 淮安清江浦 外媒看德清
export const common01componentHuaianMedia = getComponent('common01/huaianMedia') // 淮安清江浦 媒体矩阵

// 石狮套系
export const shishicomponentProject = getComponent('shishi/project') // 选题展示
export const shishicomponentClueGather = getComponent('shishi/clueGather') // 线索汇聚
export const shishicomponentOperateData = getComponent('shishi/operateData') // 运营数据
export const shishicomponentReleaseStatistics = getComponent('shishi/releaseStatistics') // 发稿统计
export const shishicomponentReporterConnection = getComponent('shishi/reporterConnection') // 记者连线
export const shishicomponentNonEditedArticle = getComponent('shishi/nonEditedArticle') // 非编文稿 空屏
export const shishicomponentNonEditedSignal = getComponent('shishi/nonEditedSignal') // 非编状态信号 空屏
export const shishicomponentLiveSignal = getComponent('shishi/liveSignal') // 直播信号 空屏
export const shishicomponentTvSignal = getComponent('shishi/tvSignal') // 电视信号 空屏
export const shishicomponentTitleLeft = getComponent('shishi/titleLeft') // 标题左8
export const shishicomponentIndex = getComponent('shishi/index') // 石狮网首页
export const shishicomponentIgitalNewspaper = getComponent('shishi/igitalNewspaper') // 数字报/APP
