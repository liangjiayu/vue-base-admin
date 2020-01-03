<template>
  <div>
    <div>{{userInfo.name}}</div>

    <div style="line-height:40px" @click="changeUserInfo()">1111</div>
  </div>
</template>


<script>
export default {
  name: 'list',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    changeUserInfo() {},
  },
};
</script>


<style lang="scss" scoped>
</style>