<template>
  <div class="app-layout-con">
    <Sidebar class="app-sidebar-con"></Sidebar>

    <div class="app-main-con">
      <div class="app-navbar-box sticky">
        <Navbar></Navbar>
      </div>
      <div class="app-main-box">
        <AppMain></AppMain>
      </div>
    </div>
  </div>
</template>


<script>
import AppMain from './components/AppMain';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default {
  name: 'PanelLayout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
  },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>


<style lang="scss">
</style>