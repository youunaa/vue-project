<template>
  <div id="app">
    <router-view name="left"></router-view>
    <router-view name="header"></router-view>
    <router-view />
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "../src/assets/css/black-dashboard.css";
@import "../src/assets/css/black-dashboard.min.css";
@import "../src/assets/css/nucleo-icons.css";
@import "../src/assets/demo/demo.css";
</style>
