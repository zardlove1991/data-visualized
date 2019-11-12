<template>
  <div class="layout-item">
    <div :class="layoutClass()" v-if="view">
      <div :class="subItemClass(id, viewId)" class="overflow" v-for="id in view.subviews" :key="id" >
        <layout-view v-if="config[id].view === 'layout'" :viewId="id"></layout-view>
        <components-view :style="defineBg(config[id])" class="bg" v-else :config="config[id]"></components-view>
      </div>
    </div>
  </div>
</template>

<script>
import {getRouterConfig} from '@/utils/model'
import componentsView from '../componentsView'
export default {
  name: 'layoutView',
  props: {
    viewId: String
  },
  data () {
    return {
      view: '',
      config: ''
    }
  },
  methods: {
    reload () {
      getRouterConfig().then(data => {
        this.view = data[this.viewId]
        if (this.view.view === 'screen') {
          let multiple = 1
          let a = document.documentElement.clientWidth / document.documentElement.clientHeight
          if (a > (1920 / 1080)) {
            multiple = (1920 / 1080) / a
          }
          document.documentElement.style.fontSize = (document.documentElement.clientWidth / 1920) * 100 * multiple * (this.view.multiple || 1) + 'px'
        }
        this.config = data
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
    },
    defineBg (config) {
      if (config.viewAttr && config.viewAttr.bg) {
        return `
          background: url(${config.viewAttr.bg}) no-repeat center center;
          background-size: 100% 100%
        `
      }
    }
  },
  components: { componentsView }
}
</script>
<style lang="scss">
  @import '~@/styles/global/index.scss';
  .layout-item{
    height: 100%;
    .overflow{
      overflow: hidden;
    }
  }
  .bg{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    text-align: center;
    color: #2c3e50;
    overflow-x: auto;
    background: url('./assets/bg.jpg') no-repeat center; // 暂时兼容
    background-size:100% 100%;
    position: relative;
    overflow-y: hidden;
  }
</style>
