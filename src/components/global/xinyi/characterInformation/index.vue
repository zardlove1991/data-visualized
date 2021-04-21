<template>
  <div class="main-wrap xy-characterInformation" id="xy-characterInformation">
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
    this.setFontsize('xy-characterInformation')
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
.xy-characterInformation {
  .character-information {
    width: 100%;
    height: 100%;
    // padding: pxrem(50px) pxrem(35px) pxrem(30px);
    padding: 0 pxrem(35px) pxrem(30px);
    color: #fff;
    font-size: pxrem(48px);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .character-title {
      width: 100%;
      height:  pxrem(113px);
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
      margin-bottom: pxrem(25px);
      padding-top: pxrem(20px);
    }
    .character-body {
      .no_data {
        width: 100%;
        height: pxrem(862px);
        div {
          width: pxrem(758px);
          height: pxrem(576px);
          background: url("./assets/no_data.png") no-repeat;
          background-size: 100% 100%;
          margin-bottom: pxrem(300px);
        }
      }
      .head-photo {
        width:  pxrem(635px);
        height:  pxrem(862px)
        img{
          width: 100%;
          height: 100%;
          border-radius: pxrem(5px);
          border:1px solid red;
        }
      }
      .name-position {
        span {
          font-size:  pxrem(30px);
          margin-left:  pxrem(8px);
        }
        .name {
          width:  pxrem(1136px);
          height:  pxrem(183px);
          background: url("./assets/name02_bg.png") no-repeat center;
          background-size: 100%;
          margin-bottom:  pxrem(42px);
          padding: 0  pxrem(72px);
          div:first-of-type {
            font-size:  pxrem(48px);
            font-weight: 500;
            color: rgba(0, 255, 246, 1);
            line-height:  pxrem(46px);
          }
          div:last-of-type {
            font-size:  pxrem(32px);
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height:  pxrem(46px);
            margin-left: 0.6rem;
          }
        }
        .position {
          width:  pxrem(1136px);
          height:  pxrem(634px);
          background: url("./assets/renwu_zhiwu_bg.png") no-repeat center;
          background-size: 100%;
          padding:  pxrem(47px)  pxrem(72px);
          div:first-of-type {
            width: 100%;
            height: 100%;
            font-size:  pxrem(34px);
            font-weight: 400;
            line-height:  pxrem(60px);
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
