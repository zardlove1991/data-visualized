<template>
  <div class="main-wrap">
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
      indexpic: ''
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
.main-wrap {
  .character-information {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .character-title {
      width: 100%;
      height: 1.13rem;
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
      margin-bottom: 0.25rem;
    }
    .character-body {
      .no_data {
        width: 100%;
        height: 8.62rem;
        div {
          width: 7.58rem;
          height: 5.76rem;
          background: url("./assets/no_data.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .head-photo {
        width: 6.35rem;
        height: 8.62rem;
        img{
          width: 100%;
          height: 100%;
          border-radius: 0.1rem;
        }
      }
      .name-position {
        span {
          font-size: 0.3rem;
          margin-left: 0.08rem;
        }
        .name {
          width: 11.36rem;
          height: 1.83rem;
          background: url("./assets/name02_bg.png") no-repeat center;
          background-size: 100%;
          margin-bottom: 0.42rem;
          padding: 0 0.72rem;
          div:first-of-type {
            font-size: 0.48rem;
            font-weight: 500;
            color: rgba(0, 255, 246, 1);
            line-height: 0.46rem;
          }
          div:last-of-type {
            font-size: 0.32rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 0.46rem;
            margin-left: 0.6rem;
          }
        }
        .position {
          width: 11.36rem;
          height: 6.34rem;
          background: url("./assets/renwu_zhiwu_bg.png") no-repeat center;
          background-size: 100%;
          padding: 0.47rem 0.72rem;
          div:first-of-type {
            width: 100%;
            height: 100%;
            font-size: 0.34rem;
            font-weight: 400;
            line-height: 0.6rem;
            color: rgba(255, 255, 255, 1);
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
