<template>
  <div id='app'>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
  },
  watch: {
    $route: function (v) {
      // 盐湖大屏更换标题
      if (/ZTk3ZjE1Ym/.test(location.href)) {
        document.title = '盐湖区新时代文明实践中心'
      }
      if (/NWQ2NzNmNz/.test(location.href)) {
        document.title = '金山区新时代文明实践中心'
      }
    }
  }
}
</script>

<style>
</style>
