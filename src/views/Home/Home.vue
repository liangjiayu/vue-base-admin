<template>
  <div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
    <div style="font-size:100px;">home</div>
  </div>
</template>


<script>
export default {
  name: 'Home',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
    this.axios.post('/table/list', {}, { hideError: true }).then((res) => {
      console.log(res);
    });
  },
  methods: {},
};
</script>


<style lang="scss" scoped>
</style>