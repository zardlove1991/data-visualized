<template>
  <div class="xy-task" id="xy-task" :style="defineBg()">
    <!--  :class="[{'warp-bg' : showDefault}]" -->
    <div class="task-wrap sys-flex sys-vertical" >
      <div class="task-title sys-flex sys-flex-center">{{taskTitle}}</div>
      <div class="task-content sys-flex">
        <div class="task-list-box sys-flex sys-vertical flex-justify-between">
          <div
            class="task-list animated sys-flex sys-flex-center overhidden"
            :class="{'flipInX' : v, 'bgurl0': k%4 === 0, 'bgurl1': k%4 === 1, 'bgurl2': k%4 === 2, 'bgurl3': k%4 === 3}"
            :style="{'animation-delay' : k/2 + 's'}"
            v-for="(v,k) in dataList"
            :key="k"
          >
            <div class="list-title overhidden">{{v.title}}</div>
          </div>
        </div>
        <div class="task-chart-box">
          <chart :options="pieOpt" :autoResize="true"></chart>
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
      list: [],
      dataList: [],
      count: 0,
      proportion: 1,
      legendData: [],
      seriesData: []
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
      getTaskList().then(res => {
        if (res && res.data && res.data.data && res.data.data[0]) {
          this.list = res.data.data.slice(0, 8)
          this.initList()
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
          })
        }
      })
    },

    initList () {
      this.dataList = this.list.slice(this.count, this.count + 8)
      this.count += 8
      this.listInterval = setInterval(() => {
        if (this.count < this.list.length) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = this.list.slice(this.count, this.count + 8)
            this.count += 8
          }, 100)
        } else {
          this.dataList = []
          clearInterval(this.listInterval)
          this.count = 0
          this.getDataList()
        }
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
    text-align: left;
    height: 15%;
    font-size: px1em(22px);
    color: #d6e6ff;
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
      height: 100%;
      flex-basis: 50%;
      .echarts {
        width: 100%;
        height: 100%;
      }
    }
  }
  .task-list {
    height: 11%;
    color: #d6e6ff;
    .list-title {
      font-size: px1em(15px);
      text-align: left;
    }
  }
}
</style>
