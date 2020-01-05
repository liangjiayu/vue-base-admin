<template>
  <div class="login-root-box">
    <div class="login-main-box">
      <div class="title-line">系统登录</div>
      <div class="tabs-box">
        <div class="tabs-item" :class="{'on':type==='name'}" @click="type='name'">账户密码登录</div>
        <div class="tabs-item" :class="{'on':type==='phone'}" @click="type='phone'">手机号登录</div>
      </div>

      <el-form
        v-if="type==='name'"
        :model="nameForm"
        :rules="nameRules"
        ref="nameForm"
        key="nameForm"
      >
        <el-form-item prop="username">
          <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="nameForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="nameForm.password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>

      <el-form
        v-if="type==='phone'"
        :model="phoneForm"
        :rules="phoneRules"
        ref="phoneForm"
        key="phoneForm"
      >
        <el-form-item prop="phone">
          <el-input placeholder="手机" prefix-icon="el-icon-user" v-model="phoneForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="vcode">
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input placeholder="验证码" prefix-icon="el-icon-message" v-model="phoneForm.vcode"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button style="width:100%;" @click="sendPhoneVcode">
                <span v-if="phoneVcode.timer">{{phoneVcode.time}}s</span>
                <span v-else>获取验证码</span>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <el-button type="primary" style="width:100%;margin-top:10px;" @click="onLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'login',
  components: {},
  data() {
    return {
      type: 'name', //name phone
      nameForm: {
        username: '',
        password: '',
      },
      nameRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      phoneForm: {
        phone: '',
        vcode: '',
      },
      phoneRules: {
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        vcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      phoneVcode: {
        timer: null,
        time: 60,
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('user', ['setUserInfo']),

    onLogin() {
      let formName = `${this.type}Form`;
      let formData = {};
      switch (this.type) {
        case 'name':
          formData = this.nameForm;
          break;
        case 'phone':
          formData = this.phoneForm;
          break;
        default:
          formData = {};
          break;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.JY.request({
            url: '/user/login',
            data: formData,
          }).then(
            (res) => {
              this.setUserInfo(res.data);
              this.$router.replace('/');
            },
            (error) => {}
          );
        }
      });
    },

    sendPhoneVcode() {
      if (this.phoneVcode.timer) {
        return;
      }

      this.phoneVcode.timer = setInterval(() => {
        if (this.phoneVcode.time <= 0) {
          clearInterval(this.phoneVcode.timer);
          this.phoneVcode.time = 60;
          this.phoneVcode.timer = null;
          return;
        }
        this.phoneVcode.time -= 1;
      }, 1000);
    },
  },
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
  width: 370px;
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
    cursor: pointer;
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