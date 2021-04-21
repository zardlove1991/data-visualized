<template>
  <div class="main-wrap" id="character-information">
    <div class="character-information">
      <div class="character-title">人物介绍</div>
      <div class="character-body sys-flex flex-justify-between" v-if="detail&&detail.name">
        <div class="head-photo">
          <img :src="facePath" v-if="facePath" />
        </div>
        <div class="name-position">
          <div class="name sys-flex sys-flex-center">
            <div>{{detail ? detail.name : ''}}</div>
            <div class="overhidden">{{detail ? detail.position : ''}}</div>
          </div>
          <div class="position">
            <div v-html="detail ? detail.profile : ''">
            </div>
          </div>
        </div>
      </div>
      <div class="character-body" v-else>
        <div class="no_data flex-justify-center sys-flex-center sys-flex">
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCharacterDetail } from '@/servers/api'
export default {
  name: 'characterInformation',
  data () {
    return {
      detail: {},
      faceImg: '',
      indexpic: '',
      id: 313
    }
  },
  props: {
    id: Number,
    facePath: String
  },
  watch: {
    id (val) {
      if (val) {
        this.id = val
        console.log('id', this.id)
        this.getDetail()
      }
    },
    facePath (path) {
      if (path) {
        this.faceImg = path
      }
    }
  },
  created () {
    this.faceImg = this.facePath
    if (this.id) {
      this.getDetail()
    }
  },
  mounted () {
    this.setFontsize('character-information')
  },
  methods: {
    getDetail () {
      if (this.id) {
        getCharacterDetail(this.id).then(res => {
          console.log('人物介绍', res)
          if (res && res.data && res.data.result) {
            this.detail = res.data.result
            this.indexpic = res.data.result.indexpic.host + res.data.result.indexpic.filename
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/index.scss';
.main-wrap {
  .character-information {
    width: 100%;
    height: 100%;
    padding: px1em(5px) px1em(15px);
    color: #fff;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .character-title {
      width: 100%;
      height: 15%;
      background: url("./assets/title_bg2.png") no-repeat center top;
      background-size: 100% 100%;
      text-align: center;
      font-weight: 600;
      padding-top:px1em(7px);
      margin-bottom: px1em(10px);
      font-size: px1em(14px);
    }
    .character-body {
      .no_data {
        width: 100%;
        height: px1em(862px);
        div {
          width: px1em(758px);
          height: px1em(592px);
          background: url("./assets/no_data.png") no-repeat center top;
          background-size: 100% 100%;
          margin-bottom: px1em(300px);
        }
      }
      .head-photo {
        width: 33%;
        height: 70%;
        img{
          width: 100%;
          height: 100%;
          border-radius: px1em(5px);
          border:1px solid red;
        }
      }
      .name-position {
        flex-basis: 60%;
        .name {
          width: 100%;
          height: px1em(45px);
          line-height: px1em(45px);
          background: url("./assets/name02_bg.png") no-repeat center;
          background-size: 100% 100%;
          margin-bottom: px1em(11px);
          padding: 0 px1em(14px);
          div:first-of-type {
            font-size: px1em(18px);
            font-weight: 500;
            color: rgba(0, 255, 246, 1);
          }
          div:last-of-type {
            font-size: px1em(14px);
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            margin-left: px1em(30px);
          }
        }
        .position {
          width: 100%;
          height: px1em(170px);
          background: url("./assets/renwu_zhiwu_bg.png") no-repeat center;
          background-size: 100% 100%;
          padding: px1em(15px) px1em(12.5px);
          div:first-of-type {
            width: 100%;
            height: 100%;
            font-size: px1em(14px);
            font-weight: 400;
            line-height: 1.5em;
            color: rgba(255, 255, 255, 1);
            overflow: hidden;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
