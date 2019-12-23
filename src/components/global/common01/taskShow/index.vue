<template>
  <div class="common01-taskshow">
    <div class="taskshow-wrap common01-border">
      <div class="common01-title">任务展示</div>
      <div class="wrap-content">
        <div class="item-list animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="status-title sys-flex sys-flex-center common01-ft40">
            <div class="status" :class="{'one': v.status === '0', 'two': v.status === '1'}">【{{v.status === '0' ? '普通' : '紧急'}}】</div>
            <div class="title overhidden">{{v.title}}</div>
          </div>
          <div class="project-name sys-flex sys-flex-center common01-ft32">
            <div class="project overhidden">所属选题：{{v.project}}</div>
            <div class="name">负责人：{{v.name}}</div>
            <div class="time">{{v.time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'taskShow',
  data () {
    return {
      dataList: [{
        status: '0',
        title: '太可爱！全民男神第一次上综艺就火了！喂饱十几亿人的他，原来最爱吃鱼香肉丝',
        project: '武汉揭晓必吃名菜小吃 花样楚菜迎接中外来宾',
        name: '周卉',
        time: '10-22 14:26'
      }, {
        status: '1',
        title: '太可爱！全民男神第一次上综艺就火了！喂饱十几亿人的他，原来最爱吃鱼香肉丝',
        project: '武汉揭晓必吃名菜小吃 花样楚菜迎接中外来宾',
        name: '周卉',
        time: '10-22 14:26'
      }, {
        status: '0',
        title: '太可爱！全民男神第一次上综艺就火了！喂饱十几亿人的他，原来最爱吃鱼香肉丝',
        project: '武汉揭晓必吃名菜小吃 花样楚菜迎接中外来宾',
        name: '周卉',
        time: '10-22 14:26'
      }, {
        status: '1',
        title: '太可爱！全民男神第一次上综艺就火了！喂饱十几亿人的他，原来最爱吃鱼香肉丝',
        project: '武汉揭晓必吃名菜小吃 花样楚菜迎接中外来宾',
        name: '周卉',
        time: '10-22 14:26'
      }]
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
.common01-taskshow {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .taskshow-wrap {
    padding: pxrem(250px) pxrem(96px) pxrem(80px) pxrem(78px);
    color: #fff;
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(72px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .status-title {
          .status {
            &.one {
              color: #05D9FF;
            }
            &.two {
              color: #FEA32C;
            }
          }
        }
        .project-name {
          color: #05D9FF;
          padding: pxrem(10px) 0 0 pxrem(130px);
          .project {
            width: 55%;
            text-align: left;
          }
          .name {
            margin: 0 pxrem(72px) 0 auto;
          }
        }
      }
    }
  }
}
.common01-border {
  width: 100%;
  height: 100%;
  background: url("../../../../assets/common/common01Border.png") no-repeat center;
  background-size: 100% 100%;
  position: relative;
}
.common01-title {
  font-size: pxrem(58px);
  font-weight: 500;
  text-shadow: 0 pxrem(16px) pxrem(16px) rgba(0, 222, 255, 0.2);
  position: absolute;
  top: pxrem(54px);
  left: pxrem(72px);
}
.common01-ft40 {
  font-size: pxrem(40px);
}
.common01-ft32 {
  font-size: pxrem(32px);
}
.common01-ft30 {
  font-size: pxrem(30px);
}
</style>
