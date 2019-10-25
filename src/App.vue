<template>
  <div id='app'>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    document.documentElement.style.fontSize = (document.documentElement.clientWidth / 1920) * 100 + 'px'
  }
}
</script>

<style>
</style>
