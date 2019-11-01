<template>
  <div class="lishui-daytask" id="lishui-daytask">
    <div class="daytask-wrap sys-flex sys-flex-center">
      <div class="wrap-left">
        <div class="left-list" v-for="(v, k) in numList" :key="k">
          <div class="sys-flex sys-flex-center"><span>{{v.title}}：</span><span>{{v.num}}</span></div>
          <div class="progress-total">
            <span class="progress" :style="{'width' : getPersent(v.num, total)}"></span>
          </div>
        </div>
      </div>
      <div class="wrap-right">
        <div class="right-list sys-flex sys-flex-center animated" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2 + 's'}" v-for="(v, k) in listData" :key="k">
          <div class="list-status">
            <img v-if="v.status === '1'" src="./assets/start.png" />
            <img v-if="v.status === '2'" src="./assets/ing.png" />
            <img v-if="v.status === '4'" src="./assets/finish.png" />
          </div>
          <div class="list-text overhidden">{{v.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDaytaskNum, getTaskList } from '@/servers/lishui'
export default {
  name: 'dayTask',
  data () {
    return {
      listData: [],
      total: 0,
      page: 1,
      numList: []
    }
  },
  created () {
    // 接口获取任务数目
    this.getTaskNum()
    // 接口获取任务列表
    this.getTaskList()
    setInterval(() => {
      this.getTaskList()
    }, 25000)
  },
  mounted () {
    this.setFontsize('lishui-daytask')
  },
  methods: {
    getTaskNum () {
      getDaytaskNum().then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          let list = res.data.result
          list.forEach(list => {
            if (list.status === 1 || list.status === 2 || list.status === 4) {
              this.numList.push({
                title: list.title,
                num: list.total
              })
              this.total += list.total
            }
          })
          this.numList.unshift({
            title: '总任务',
            num: this.total
          })
        }
      })
    },
    getTaskList () {
      getTaskList(5, this.page).then(res => {
        if (res && res.data && res.data.result && res.data.result.task_arr && res.data.result.task_arr[0]) {
          this.listData = res.data.result.task_arr
          if (res.data.result.task_arr.length < 5) {
            this.page = 1
          } else {
            this.page += 1
          }
        }
      })
    },
    getPersent (num, total) {
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-daytask {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .daytask-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    padding: px2em(198px) px2em(103px) px2em(106px) px2em(108px);
    color: #fff;
    .wrap-left {
      width: px2em(420px);
      height: px2em(680px);
      background: url('./assets/miniBorder.png') no-repeat center;
      background-size: 100% 100%;
      padding: px2em(52px) px2em(60px);
      margin-right: px2em(88px);
      .left-list {
        margin-bottom: px2em(73px);
        &:last-of-type {
          margin-bottom: 0;
        }
        span:first-of-type {
          font-size: px2em(32px);
        }
        span:last-of-type {
          font-size: px2em(54px);
          color: #00FFF6;
        }
        .progress-total {
          width: px2em(300px);
          height: px2em(10px);
          border-radius: px2em(5px);
          background-color: #0F385A;
          overflow: hidden;
          margin-top: px2em(15px);
          .progress {
            height: 100%;
            display: block;
            background-color: #247BF1;
            border-radius: px2em(5px);
          }
        }
      }
    }
    .wrap-right {
      .right-list {
        margin-bottom: px2em(92px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .list-status {
          width: px2em(130px);
          height: px2em(54px);
          margin-right: px2em(30px);
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .list-text {
          font-size: px2em(38px)
        }
      }
    }
  }
}
</style>
