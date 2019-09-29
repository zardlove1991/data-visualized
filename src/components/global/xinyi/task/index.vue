<template>
  <div class="xy-task" id="xy-task" :style="defineBg()">
    <!--  :class="[{'warp-bg' : showDefault}]" -->
    <div class="task-wrap sys-flex sys-vertical" >
      <div class="task-title sys-flex sys-flex-center">
        <span class="title-box">{{taskTitle}}</span>
      </div>
      <div class="task-content sys-flex">
        <div class="task-list-box sys-flex sys-vertical flex-justify-around">
          <div
            class="task-list animated sys-flex sys-flex-center overhidden"
            :class="{'fadeInLeft' : v, 'bgurl0': k%4 === 0, 'bgurl1': k%4 === 1, 'bgurl2': k%4 === 2, 'bgurl3': k%4 === 3}"
            :style="{'animation-delay' : k/2 + 's'}"
            v-for="(v,k) in dataList"
            :key="k"
          >
            <div class="list-title overhidden">{{v.title}}</div>
          </div>
        </div>
        <div class="task-chart-box">
          <chart :options="pieOpt" :autoResize="true"></chart>
          <div class="task-total sys-flex sys-vertical flex-justify-center">
            <span class="total-text">任务总数</span>
            <span class="total-number">{{taskTotal}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTaskList, getTaskAccess } from '@/servers/xinyi'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
export default {
  name: 'task',
  components: {
    chart: echarts
  },
  data () {
    return {
      taskTitle: '任务统计',
      dataList: [],
      dataInterval: null,
      count: 8,
      page: 1,
      proportion: 1,
      legendData: [],
      seriesData: [],
      taskTotal: 0
    }
  },
  computed: {
    pieOpt () {
      return {
        color: ['#ce4272', '#0554f5', '#f3972e', '#008aed', '#14da7d'],
        textStyle: {
          color: '#fff'
        },
        grid: {

        },
        legend: {
          show: 'true',
          orient: 'vertical',
          align: 'left',
          itemHeight: this.proportion * 15,
          x: 'right',
          y: 'center',
          // top: 'top',
          // left: 'center',
          textStyle: {
            color: 'rgba(214, 230, 255, 0.5)',
            fontSize: this.proportion * 16
          },
          data: this.legendData
        },
        series: [
          {
            name: '任务统计',
            type: 'pie',
            center: ['45%', '50%'],
            radius: ['45%', '65%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                formatter: '{d}%',
                textStyle: {
                  color: 'rgba(214, 230, 255, 0.5)',
                  fontSize: this.proportion * 14,
                  fontWeight: 'bold'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: this.proportion * 18,
                  fontWeight: 'bold',
                  color: 'rgba(214, 230, 255, 0.5)'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.seriesData
          }
        ]
      }
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.proportion = this.getProportion('xy-task') * 1.5
    this.setFontsize('xy-task')
  },
  methods: {
    getDataList () {
      getTaskList(this.count, this.page).then(res => {
        if (res && res.data && res.data.data && res.data.data[0]) {
          this.dataList = []
          this.dataList = res.data.data
          this.intervalData()
        }
      })
      getTaskAccess().then(res => {
        if (res && res.data && res.data.data && res.data.data[0]) {
          this.legendData = []
          this.seriesData = []
          res.data.data.forEach(v => {
            this.legendData.push(v.title)
            this.seriesData.push({
              value: v.total,
              name: v.title
            })
            this.taskTotal = res.data.data.reduce((past, cur) => past + cur.total, 0)
          })
        }
      })
    },

    intervalData () {
      this.dataInterval = setInterval(() => {
        getTaskList(this.count, this.page).then(res => {
          if (res && res.data && res.data.data && res.data.data[0]) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.data
              if (res.data.data.length < this.count) {
                this.page = 1
              } else {
                this.page++
              }
            }, 100)
          } else {
            this.page = 1
            clearInterval(this.dataInterval)
            this.getDataList()
          }
        })
      }, 10000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.xy-task {
  width: 100%;
  padding: 0.25vh 0.1vw;
  .task-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/bg.png") no-repeat center;
    background-size: 100% 100%;
    padding: 0 px1em(17px);
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .task-title {
    height: 15%;
    .title-box {
      text-align: left;
      font-size: px1em(22px);
      font-weight: bold;
      color: #d6e6ff;
      // transform: scaleY(1.5);
    }
  }
  .task-content {
    flex: 1;
    .task-list-box {
      height: 100%;
      flex-basis: 50%;
      .bgurl0 {
        background: url("./assets/task-list-other.png") no-repeat center;
        background-size: 100%;
      }
      .bgurl1 {
        background: url("./assets/task-list-1.png") no-repeat center;
        background-size: 100%;
      }
      .bgurl2 {
        background: url("./assets/task-list-2.png") no-repeat center;
        background-size: 100%;
      }
      .bgurl3 {
        background: url("./assets/task-list-3.png") no-repeat center;
        background-size: 100%;
      }
    }
    .task-chart-box {
      position: relative;
      height: 100%;
      flex-basis: 50%;
      .echarts {
        width: 100%;
        height: 100%;
      }
      .task-total {
        position: absolute;
        top: 30%;
        left: 25%;
        width: 40%;
        height: 40%;
        z-index: 100;
        color: #D6E6FF;
        font-weight: bold;
        .total-text {
          font-size: 0.3em;
        }
        .total-number {
          font-size: 0.5em;
        }
      }
    }
  }
  .task-list {
    height: 11%;
    color: #d6e6ff;
    .list-title {
      // transform: scaleY(1.5);
      // font-size: px1em(8px);
      // 原样式
      font-size: px1em(15px);
      // letter-spacing: 0.05em;
      text-align: left;
    }
  }
}
</style>
