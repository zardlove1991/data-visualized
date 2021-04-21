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
      id: 0
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
@import "~@/styles/index.scss";
.main-wrap {
  .character-information {
    width: 100%;
    height: 100%;
    // padding: px1em(50px) px1em(35px) px1em(30px);
    padding: 0 px1em(35px) px1em(30px);
    color: #fff;
    font-size: px1em(24px);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .character-title {
      width: 100%;
      height:  px1em(113px);
      background: linear-gradient(
        0deg,
        rgba(38, 182, 241, 0.46) 0%,
        rgba(38, 182, 241, 0.01) 99%
      );
      background-size: 100%;
      background-image: url("./assets/title_bg2.png");
      background-repeat: no-repeat;
      background-position: center 30%;
      text-align: center;
      font-weight: 600;
      margin-bottom: px1em(25px);
      padding-top: px1em(20px);
    }
    .character-body {
      .no_data {
        width: 100%;
        height: px1em(862px);
        div {
          width: px1em(758px);
          height: px1em(576px);
          background: url("./assets/no_data.png") no-repeat;
          background-size: 100% 100%;
          margin-bottom: px1em(300px);
        }
      }
      .head-photo {
        width:  px1em(635px);
        height:  px1em(862px)
        img{
          width: 100%;
          height: 100%;
          border-radius: px1em(5px);
          border:1px solid red;
        }
      }
      .name-position {
        span {
          font-size:  px1em(30px);
          margin-left:  px1em(8px);
        }
        .name {
          width:  px1em(1136px);
          height:  px1em(183px);
          background: url("./assets/name02_bg.png") no-repeat center;
          background-size: 100%;
          margin-bottom:  px1em(42px);
          padding: 0  px1em(72px);
          div:first-of-type {
            font-size:  px1em(48px);
            font-weight: 500;
            color: rgba(0, 255, 246, 1);
            line-height:  px1em(46px);
          }
          div:last-of-type {
            font-size:  px1em(32px);
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height:  px1em(46px);
            margin-left: 0.6rem;
          }
        }
        .position {
          width:  px1em(1136px);
          height:  px1em(634px);
          background: url("./assets/renwu_zhiwu_bg.png") no-repeat center;
          background-size: 100%;
          padding:  px1em(47px)  px1em(72px);
          div:first-of-type {
            width: 100%;
            height: 100%;
            font-size:  px1em(34px);
            font-weight: 400;
            line-height:  px1em(60px);
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
