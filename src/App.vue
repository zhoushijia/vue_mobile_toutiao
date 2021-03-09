<template>
  <div id="app">
    <keep-alive :include="['LayoutIndex']">
      <!-- 路由出口 -->
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less"></style>
