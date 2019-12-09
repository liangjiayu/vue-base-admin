<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.JY.request({
      url: '/goods/list',
      data: {},
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
</style>