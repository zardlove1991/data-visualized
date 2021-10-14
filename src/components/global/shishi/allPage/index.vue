<template>
  <div class="shishi-allpage">
    <div class="layout-item">
      <div :class="layoutClass()" v-if="view">
        <div :class="subItemClass(id, viewId)" class="overflow" v-for="id in view.subviews" :key="id" >
          <layout-view v-if="config[id].view === 'layout'" :viewId="id"></layout-view>
          <components-view v-else :config="config[id]" :screenConfig="screenConfig" :viewId="viewId"></components-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {getRouterConfig, getDataConfig} from '@/utils/model'
import componentsView from '@/components/_modules/componentsView'

export default {
  name: 'allPage',
  data () {
    return {
      view: '',
      extend: '',
      config: '', // 当前组件信息
      screenConfig: '' // 当前页面信息：缩放倍数
      // viewId: ''
    }
  },
  props: {
    viewId: String
  },
  created () {
  },
  mounted () {
    this.loadComponent()
  },
  methods: {
    loadComponent () {
      getDataConfig().then(res => {
        this.extend = res
        console.log(this.extend)
      })
      getRouterConfig().then(data => {
        console.log(data)
        console.log(this.viewId)
        if (this.extend.style === 'shishi' && this.viewId === '3743') {
          this.newViewId = '3569'
        }
        this.view = data[this.newViewId || this.viewId]
        if (this.view.view === 'screen') {
          let multiple = 1
          let a = document.documentElement.clientWidth / document.documentElement.clientHeight
          if (a > (1920 / 1080)) {
            multiple = (1920 / 1080) / a
          }
          document.documentElement.style.fontSize = (document.documentElement.clientWidth / 1920) * 100 * multiple * (this.view.multiple || 1) + 'px'
          console.log('比例', a, multiple)
          // 初始化浏览器title
          if (this.view.docTitle) {
            document.title = this.view.docTitle || ''
          }
        }
        this.config = data
        if (this.$route.meta && this.$route.meta.viewId) {
          this.screenConfig = data[this.newViewId || this.viewId]
        }
      })
    },
    layoutClass () {
      if (!this.view) return ''
      let layoutClass = this.view.gravity ? `layout-${this.view.gravity}` : 'layout-horizontal'
      return layoutClass
    },
    subItemClass (id, parentId) {
      // 水平 按权重 垂直 flex1
      let subItemClass = ''
      if (this.config[id] && this.view) {
        if (this.view.gravity === 'horizontal') {
          subItemClass = `flex${this.config[id].weight || 1}`
        } else {
          subItemClass = `flex${this.config[id].weight || 1}`
        }
      } else {
        subItemClass = 'flex1'
      }
      return subItemClass
    }
  },
  components: {
    componentsView
  }
}
</script>
<style lang="scss">
  @import '~@/styles/global/index.scss';
.shishi-allpage {
  :root {
  --shishiratio: 1.67;
  }
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  display: flex;
  flex-direction: column;
  .layout-item{
    height: 100%;
    .overflow{
      overflow: hidden;
    }
  }
  .common01-title {
    transform: scaleY(var(--shishiratio));
  }
  // 线索汇聚
  .shishi-cluegather {
  }
  // 记者连线
  .shishi-workmap {
    .reporter-map-wrap {
      height: 100% !important;
    }
    .call-wrap {
      height: 100% !important;
    }
  }
}

</style>

