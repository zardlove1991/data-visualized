<template>
  <div class="xy_characterAll" id="xy_characterAll">
    <span class="off" v-if="!isConnection">websocket断连，页面已刷新5次</span>
    <div class="wrap" v-show="type == 'm2o-plus'">
    <!-- <div class="wrap"> -->
        <intelligence-briefing @handleData="handleData"></intelligence-briefing>
        <character-information :id="id" :facePath="facePath"></character-information>
        <click-list :id="id"></click-list>
        <related-reports :id="id"></related-reports>
    </div>
    <workcall-infoMap v-show="type == 'old'"></workcall-infoMap>
  </div>
</template>
<script>
import characterInformation from '../characterInformation/index'
import clickList from '../clickList/index'
import relatedReports from '../relatedReports/index'
import intelligenceBriefing from '../intelligenceBriefing/index'
import workcallInfoMap from '../workcallInfoMap/index'
// import { getNowTime } from '@/utils/utils'
// import { storage } from '@/utils/storage'
// import { isWebsocket } from '@/servers/api'
export default {
  name: 'characterAll',
  data () {
    return {
      id: 0,
      token: '',
      type: 'old',
      startTime: '',
      endTime: '',
      times: '',
      isConnection: true,
      facePath: '',
      from: ''
    }
  },
  components: {
    characterInformation,
    relatedReports,
    intelligenceBriefing,
    workcallInfoMap,
    clickList
  },
  created () {},
  mounted () {
    this._setFontsize('xy_characterAll')
    document.querySelector('html').style.fontSize = document.getElementById('xy_characterAll').style.fontSize
  },
  methods: {
    _setFontsize (id) {
      let dom = document.getElementById(id)
      if (dom) {
        let width = dom.clientWidth / 2
        let height = dom.clientHeight / 2
        let multiple = 1
        let a = width / height
        if (a > (1920 / 1080)) {
          multiple = (1920 / 1080) / a
        }
        if (a > 1.78) {
          dom.style.fontSize = width / 1920 * 100 * multiple + 'px'
        } else {
          dom.style.fontSize = height / 1080 * 100 + 'px'
        }
      }
    },
    handleData (event) {
      // console.log(event)
      this.facePath = event['face_path']
      this.type = event.type
      this.id = event['figure_id']
      console.log(this.id, 'ssssssssssssss')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/index.scss';
  .xy_characterAll {
     .wrap {
        display: flex;
        flex-wrap: wrap;
        div {
            width: 50%;
            height: 50vh;
        }
    }
  }
</style>
