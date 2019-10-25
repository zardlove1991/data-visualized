<template>
  <div class="main-wrap" id="ls-operateData" :style="defineBg()">
    <div class="operate-data-wrap sys-flex flex-justify-between">
      <div class="micro-box">
        <div v-for="(v, i) in microList" :key="i">
          <span>{{v.lable}}</span>
          <span>{{v.value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { } from '@/servers/lishui'
export default {
  name: 'operateData',
  data () {
    return {
      microList: [
        {
          
        }
      ]    
    }
  },

  created () {
  },

  mounted () {
    this.setFontsize('ls-operateData')
  }
}
</script>

<style lang='scss' scoped>
.main-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 11px;
  .operate-data-wrap{
    width: 100%;
    height: 100%;
    padding: 1.2em 0.45em 0.5em 0.45em;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
