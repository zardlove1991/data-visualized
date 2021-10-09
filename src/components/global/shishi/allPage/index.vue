<template>
  <div class="shishi-allpage">
    <div class="column-flex">
      <div class="base2 sys-flex">
        <div class="base1 column-flex">
          <div class="base1">
            <clue-gather></clue-gather>
          </div>
          <div class="base1">
            <project></project>
          </div>
        </div>
        <div class="base4 column-flex">
          <div class="base1">
            <title-left></title-left>
          </div>
          <div class="base5 sys-flex">
            <div class="base1 column-flex">
              <div class="base2">
                <non-edited-article></non-edited-article>
              </div>
              <div class="base3">
                <release-statistics></release-statistics>
              </div>
            </div>
            <div class="base1 column-flex">
              <div class="base2">
                <non-edited-signal></non-edited-signal>
              </div>
              <div class="base3">
                <tv-signal></tv-signal>
              </div>
            </div>
            <div class="base2">
              <reporter-connection></reporter-connection>
            </div>
          </div>
        </div>
      </div>
      <div class="base1 sys-flex">
        <div class="base2">
          <operate-data></operate-data>
        </div>
        <div class="base1">
          <live-signal></live-signal>
        </div>
        <div class="base1">
          <index></index>          
        </div>
        <div class="base1">
          <igital-newspaper></igital-newspaper>
        </div>  
      </div>
    </div>

  </div>
</template>
<script>
import clueGather from '../clueGather/index.vue'
import igitalNewspaper from '../igitalNewspaper/index.vue'
import index from '../index/index.vue'
import titleLeft from '../titleLeft/index.vue'
import tvSignal from '../tvSignal/index.vue'
import liveSignal from '../liveSignal/index.vue'
import nonEditedSignal from '../nonEditedSignal/index.vue'
import nonEditedArticle from '../nonEditedArticle/index.vue'
import reporterConnection from '../reporterConnection/index.vue'
import releaseStatistics from '../releaseStatistics/index.vue'
import operateData from '../operateData/index.vue'
import project from '../project/index.vue'
export default {
  name: 'allPage',
  data () {},
  components: {
    clueGather,
    project,
    operateData,
    releaseStatistics,
    reporterConnection,
    nonEditedArticle,
    nonEditedSignal,
    liveSignal,
    tvSignal,
    titleLeft,
    index,
    igitalNewspaper
  }
}
</script>
<style lang="scss">
.shishi-allpage {
  width: 100%;
  height: 100%;
  // padding: pxrem(40px);
  display: flex;
}
.base1 {
  flex: 1;
}
.base2 {
  flex: 2;
}
.base3 {
  flex: 3;
}
.base4 {
  flex: 4;
}
</style>
