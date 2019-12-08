<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import request from './utils/request.js';

export default {
  name: 'App',
  mounted() {
    request({
      url: '/goods/list',
    }).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style>
</style>