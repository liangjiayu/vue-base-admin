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
      url: '/goods/detail',
      data: {
        id: '',
        name: '4646',
      },
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