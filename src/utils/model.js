import { storage } from '@/utils/storage'
// import {getConfigData} from '@/servers/api'

export const asyncConfig = () => {
  return new Promise(function (resolve, reject) {
    /*
    模拟数据，暂时注释
    */
    // getConfigData().then((res) => {
    //   let config = res.data.result
    //   storage.set('saas_config', config)
    //   resolve(config)
    // }).catch(rej => {
    //   reject(rej)
    // })

    let config = {
      create_time: '1556006750',
      describe: '测试',
      disable: '0',
      extend: {style: 'xinyi'},
      guid: 'OThjNDhlYj',
      id: '16',
      mark: '测试',
      title: 'cyn',
      update_time: '0',
      view: {
        600: {
          gravity: '',
          router: 'test01',
          subviews: ['600'],
          title: '测试',
          view: 'screen'
        },
        601: {
          component: 'report',
          view: 'component'
        }
      }
    }
    resolve(config)
  })
}

export const getRouterConfig = () => {
  let config = storage.get('saas_config')
  return new Promise(function (resolve, reject) {
    if (config && config.view) {
      resolve(config.view)
    } else {
      asyncConfig().then(data => {
        resolve(data.view)
      }).catch(rej => {
        reject(rej)
      })
    }
  })
}

export const getDataConfig = () => {
  let config = storage.get('saas_config')
  return new Promise(function (resolve, reject) {
    if (config && config.extend) {
      resolve(config.extend)
    } else {
      asyncConfig().then(data => {
        resolve(data.extend)
      }).catch(rej => {
        reject(rej)
      })
    }
  })
}

/*
  subviews:[]
  gravity: 'horizontal'|'vertical'
  weight: 1
  router:''
  view: 'layout'|'screen'|'component'
  // 组件才有的
  component: ''
    viewAttr: title bg fontSize
*/
export const initRouter = (router) => {
  var defineRouters = []
  asyncConfig().then(res => {
    let data = res.view
    for (let key in data) {
      var item = data[key]
      if (item.view === 'screen') {
        defineRouters.push({
          path: `/${item.router}`,
          name: item.router,
          component: {
            template: `<layout-view viewId='${key}'></layout-view>`
          }
        })
      }
    }
    router.options.routes.unshift(...defineRouters)
    router.addRoutes(router.options.routes)
  })
}

export const getStyle = () => {
  let config = storage.get('saas_config')
  return config.extend.style || 'liuhe'
}
