<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wraper">
      <el-menu
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :unique-opened="false"
        :collapse-transition="false"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>

          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>

      </el-menu>
    </el-scrollbar>
  </div>
</template>


<script>
export default {
  name: "Sidebar",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>


<style lang="scss">
</style>