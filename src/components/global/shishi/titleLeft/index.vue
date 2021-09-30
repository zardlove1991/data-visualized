<template>
<div class="title-bar sys-flex">
  <div class="common01-title">
    <div class="title-title">石狮市融媒体指挥调度中心</div>
  </div>
  <div class="weather-box">
      <div class="today-weather sys-flex">
        <div class="day">{{day}}</div>
        <div class="weekday">{{weekday}}</div>
      </div>
      <div class="today-weather sys-flex mt-42">
        <div class="icon">
          <img :src="icon" />
        </div>
        <div class="cond">{{status}}</div>
        <div class="temp">{{mintemp}} ~ {{maxtemp}}</div>
      </div>
  </div>
</div>
</template>

<script>
import { getJiangningWeather } from '@/servers/interface'
export default {
  name: 'title',
  data () {
    return {
      titleTitle: '',
      mintemp: '',
      maxtemp: '',
      icon: '',
      wstr: '',
      day: '',
      weekday: '',
      status: ''
    }
  },
  mounted () {
    this.setFontsize('common01-title')
    this.getWeather()
    this.getToday('')
  },
  methods: {
    getWeather () {
      let city = '石狮'
      getJiangningWeather(city).then(res => {
        if (res && res.data && res.data.result && res.data.result.basic) {
          let data = res.data.result.basic
          this.mintemp = `${data.daily_forecast[0].tmp.min}℃`
          this.maxtemp = `${data.daily_forecast[0].tmp.max}℃`
          this.icon = `${data.now.cond.icon.host}${data.now.cond.icon.dir}${data.now.cond.icon.filepath}${data.now.cond.icon.filename}`
          this.status = `${data.now.cond.txt}`
        }
      })
    },
    getToday () {
      let date = new Date()
      let week = date.getDay()
      let weeklist = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
      let year = date.getFullYear()
      let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      this.time = `${hour}:${minute}`
      this.weekday = weeklist[week - 1]
      this.day = `${year}年${month}月${day}日 `
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.mt-42 {
  margin-top: pxrem(42px);
}
.title-bar {
  .common01-title {
    // width: 100%;
    display: flex;
    flex: 1;
    height: 100%;
    background: url('./assets/titlebg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    align-items: center;
    position: unset;
    .title-title {
      transform: scaleY(12);
      width: 100%;
      // height: 100%;
      font-size: pxrem(250px);
      letter-spacing: pxrem(293px);
      font-weight: bold;
      color: #ffffff;
      // line-height: pxrem(54px);
      font-family: Source Han Sans CN Heavy, Source Han Sans CN Heavy-Heavy;
      font-weight: 800;
    }
  }
  .weather-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    // position: relative;
    // top: pxrem(-42px);
    transform: scaleY(12);
    .today-weather {
        font-size: pxrem(60px);
        line-height: pxrem(54px);
        align-items: center;
        color: #fff;
        .icon {
          width: pxrem(64px);
          margin: 0 pxrem(19px) 0 pxrem(10px);
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .temp {
          font-size: pxrem(48px);
        }
        .cond {
          font-size: pxrem(48px);
          margin-right: pxrem(35px);
        }
        .weekday {
          margin-left: 0.15rem;
          margin-right: 0.2rem;
        }
    }
  }
  
}

</style>

