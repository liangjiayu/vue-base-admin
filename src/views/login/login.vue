<template>
  <div class="login-root-box">
    <div class="login-main-box">
      <div class="title-line">系统登录</div>
      <div class="tabs-box">
        <div class="tabs-item" :class="{'on':type==='name'}" @click="type='name'">账户密码登录</div>
        <div class="tabs-item" :class="{'on':type==='phone'}" @click="type='phone'">手机号登录</div>
      </div>
      <el-form v-if="type==='name'">
        <el-form-item>
          <el-input placeholder="用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-if="type==='phone'">
        <el-form-item>
          <el-input placeholder="手机" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="width:100%;">登录</el-button>
    </div>
  </div>
</template>

·
<script>
export default {
  name: 'login',
  components: {},
  data() {
    return {
      type: 'name', //name phone
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>


<style lang="scss" scoped>
.login-root-box {
  display: block;
  min-height: 100vh;
  background-color: #eee;
  padding: 140px 0;
}

.login-main-box {
  display: block;
  width: 380px;
  margin: 0 auto;
  .title-line {
    display: block;
    margin-bottom: 30px;
    text-align: center;
    color: #000;
    font-size: 30px;
  }
  .tabs-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }
  .tabs-item {
    display: block;
    padding: 10px 20px;
    margin: 0 10px;
    border-bottom: 2px solid transparent;
    font-size: 14px;
    &.on {
      border-color: #409eff;
      color: #409eff;
    }
  }
}
</style>