<template>
  <div class="warpper">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-form label-position="left" label-width="120px">
          <el-form-item label="账号">
            <el-input v-model="manage.name" disabled>
              <i slot="suffix" class="el-input__icon el-icon-success" v-if="manage.name"></i>
              <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
            </el-input>
          </el-form-item>
          <el-form-item label="旧密码">
            <el-input v-model="manage.oldpass" show-password placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="manage.newpass" show-password @input="newpass(manage.newpass)" placeholder="请输入6-15位新密码">
              <i slot="suffix" class="el-input__icon el-icon-success" v-if="isRight"></i>
              <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
            </el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="comfirm" show-password @input="comfirmpass(comfirm)" placeholder="请确认新密码">
              <i slot="suffix" class="el-input__icon el-icon-success" v-if="isComfirm"></i>
              <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
            </el-input>
          </el-form-item>
          <div class="text-center">
            <el-button type="primary" @click="submit">修 改</el-button>
            <el-button type="info" @click="reset">重 置</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from "../util/API";
import reg from "../util/reg";
export default {
  data() {
    return {
      manage: {
        name: "",
        oldpass: "",
        newpass: ""
      },
      comfirm: "",
      isRight: false,
      isComfirm: false
    };
  },
  methods: {
    comfirmpass(pass) {
      if (this.manage.newpass == pass) {
        this.isComfirm = true;
      } else {
        this.isComfirm = false;
      }
    },
    newpass(pass) {
      console.log(pass)

     if (reg.passwordReg.test(pass)) {
        this.isRight = true;
      } else {
        this.isRight = false;
      }
    },
    open(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },
    open2(msg) {
      this.$message.error(msg);
    },
    submit() {
      if (this.manage.oldpass == localStorage.getItem("userpass")) {
        if (this.manage.oldpass != this.manage.newpass) {
          if (this.comfirm == this.manage.newpass) {
            this.axios({
              url: api.changePassManage,
              method: "post",
              data: this.manage
            }).then(res => {
              if (res.data.isok) {
                this.open(res.data.info + "请重新登录");
                localStorage.removeItem("username");
                localStorage.removeItem("usertype");
                localStorage.removeItem("userpass");
                this.$router.replace("/login");
              } else {
                this.open2(res.data.info);
              }
            });
          } else {
            this.open2("两次密码不一样");
          }
        } else {
          this.open2("新密码不能跟原密码一样");
        }
      } else {
        this.open2("原始密码错误！");
      }
    },
    reset() {
      this.manage.oldpass = "";
      this.manage.newpass = "";
      this.comfirm = "";
    }
  },
  watch: {},
  computed: {},
  components: {},
  mounted() {
    this.manage.name = localStorage.getItem("username");
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("usertype") != 1) {
      next("/index/welcome");
      return;
    }
    next();
  }
};
</script>
<style  lang='less' rel='stylesheet/less' scoped>
@import "../less/index.less";
.el-form {
  position: relative;
  top: 100px;
}
.el-icon-success {
  color: @success;
}
</style>