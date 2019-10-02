<template>
  <div class="navbar-wrap-con">
    <el-breadcrumb separator="/" class="navbar-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">活动管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown trigger="click" class="user-panel-box">
      <div class="user-panel-btn">
        <img src="https://liangjiayu.github.io/uploads/avatar.png" alt />
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>


<script>
export default {
  name: "Navbar",
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


<style lang="scss" scoped>
.navbar-wrap-con {
  position: relative;
  display: flex;
  height: 100%;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.navbar-breadcrumb {
  display: block;
  margin-left: 10px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}

.user-panel-box {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 40px;
  .user-panel-btn {
    position: relative;
    display: block;
    padding: 5px;
    .el-icon-caret-bottom {
      position: absolute;
      right: -10px;
      bottom: 5px;
      font-size: 12px;
    }
    img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
  }
}
</style>