<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import service from './api/request.js';

export default {
  name: 'App',
  mounted() {
    setTimeout(() => {
      service({
        url: '/goods/list',
        method: 'post',
      }).then((res) => {
        console.log(res);
      });
    }, 1000);
  },
};
</script>

<style>
</style>