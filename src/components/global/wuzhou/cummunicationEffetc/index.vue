<template>
    <div class="wz-wrap" id="cummunicationEffetc">
      <div class="content">
        <div class="main-title">传播效果</div>
        <div class="main-wrap">
          <div class="main-num flex flex-justify-between sys-flex-center">
            <div class="num-item hg-flex">阅读总量：<span class="num">{{readNum}}</span></div>
            <div class="line"></div>
            <div class="num-item hg-flex">收获评论：<span class="num">{{commentNum}}</span></div>
          </div>
          <div id="commuEchart">
              <chart :options="barOptions" :autoResize="true"></chart>
          </div>
        </div>
      </div> 
        
    </div>
</template>
<script>
import { getM2OPlusChart } from '@/servers/interface'
import echarts from 'vue-echarts'
export default {
  name: 'cummunicationEffetc',
  data () {
    return {
      readNum: 0,
      commentNum: 0,
      barOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#fff'
            }
          }
        },
        color: ['#013CF9', '#14F7C0'],
        textStyle: {
          fontSize: 32,
          fontFamily: 'sans-serif',
          color: '#ffffff'
        },
        legend: {
          data: ['阅读量', '评论量'],
          textStyle: {
            color: 'rgb(255,255,255)',
            fontSize: 32
          }
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            },
            nameTextStyle: {
              fontSize: 32
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            // min: 0,
            // max: 600,
            interval: 200,
            axisLabel: {
              formatter: '{value}'
            },
            nameTextStyle: {
              fontSize: 32
            }
          }
        ],
        series: [
          {
            name: '阅读量',
            type: 'bar',
            barWidth: 60,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#41B0FB' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#013CF9' // 100% 处的颜色
                }], false)
              }
            },
            data: []
          },
          {
            name: '评论量',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#14F7C0'
              }
            },
            data: []
          }
        ]
      }
    }
  },
  components: {
    chart: echarts
  },
  created () {
  },
  mounted () {
    this.setFontsize('cummunicationEffetc')
    this.getDataList()
  },
  methods: {
    getDataList () {
      getM2OPlusChart(this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.list) {
            let data = res.data.result
            this.readNum = data.total_click_num
            this.commentNum = data.total_comment_num
            let dateArr = data.list.map(v => v.time)
            // let arr = this.map(data.list)
            this.barOptions.xAxis.data = dateArr
            this.barOptions.series[1].data = data.list.map(v => v.click_num)
            this.barOptions.series[0].data = data.list.map(v => v.comment_num)
          }
        }
      })
    },
    map (arr, callback) {
      if (!Array.isArray(arr) || typeof callback !== 'function' || !arr.length) {
        return []
      } else {
        let result = []
        for (let i = 0; i < arr.length; i++) {
          result.push(callback(arr[i], i, arr))
        }
        return result
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.wz-wrap{
    // width: pxrem(1920px);
    // height: pxrem(1080px);
    // padding: pxrem(33px);
    width: 100%;
    height:100%;
    padding: 1.5vh 1.5vw;
    .content{
      // width: pxrem(1840px);
      // height: pxrem(1000px);
      // padding: pxrem(54px) pxrem(110px) pxrem(56px) pxrem(71px);
      width: 100%;
      height: 100%;
      padding: 5vh 4vw;
      background: url("./assets/main-bg.png") no-repeat;
      background-size: 100% 100%;
      .main-title{
          font-size: pxrem(58px);
          font-weight: 500;
          color: #ffffff;
          text-align: left;
      }
      .main-wrap{
          width: 100%;
          height:90%; 
          margin-top: pxrem(90px);
          .main-num{
            .num-item{
                // width: pxrem(740px);
                width: 45%;
                height: pxrem(130px);
                color: #ffffff;
                font-size: pxrem(36px);
                background: url('./assets/top-bg.png') no-repeat;
                background-size: 100% 100%;
                .num{
                  font-size: pxrem(60px);
                  font-weight: 700;
                  color: #15FEF5;
                  margin-left: pxrem(55px);
                }
              }
            .line{
                // width: pxrem(92px);
                width: 5%;
                height: pxrem(80px);
                background: url('./assets/line.png') no-repeat;
                background-size: 100% 100%;
            } 
          }
          #commuEchart{
            width: 100%;
            height: 70%;
            font-size: pxrem(36px);
            color:#ffffff;
            margin-top: pxrem(60px);

          }
      }
    }

}

</style>
