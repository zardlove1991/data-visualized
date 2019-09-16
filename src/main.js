// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App.vue'
import BaiduMap from 'vue-baidu-map'
import { createRouter } from './router'
import 'animate.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {createStore} from './store'
import {initRouter} from '@/utils/model'
import * as api from './servers/api' // 接口
import mixins from '@/mixins'

Vue.use(ElementUI)
Vue.use(BaiduMap, {
  ak: 'MdXesfCPYcPLZ5FnH5k1RhdQ'
})

Vue.mixin(mixins)
const store = createStore(Vue)
const router = createRouter(Vue)

// 异步加载配置
initRouter(router)

/* eslint-disable no-new */
window.ddVue = new Vue({
  el: '#app',
  router,
  store,
  api,
  components: { App },
  template: '<App/>'
})
