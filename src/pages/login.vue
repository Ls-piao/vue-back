<template>
  <div class="warpper">
      <h1>社区APP后台管理系统</h1>
    <div class="con">
      <span>身份选择:</span>
      <el-select v-model="user.type" placeholder="请选择" class="text-right">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="msg">
        <span>账号：</span>
        <el-input placeholder="请输入账号" v-model.trim="user.name" clearable></el-input>
      </div>
      <div>
        <span>密码：</span>
        <el-input placeholder="请输入密码" v-model="user.pass" show-password clearable></el-input>
      </div>
      <div class="btns">
          <el-button class="comfirm" type="warning"
          @click='login'>登录</el-button>
      </div>
     
    </div>
  </div>
</template>
<script>
 import api from '../util/API'
export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "超管"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ],
      user: {
        name: "",
        pass: "",
        type:''
      }
    };
  },
  methods: {
      login(){
          if(this.user.name&&this.user.pass&&this.user.type){
              this.axios({
                  url:api.login,
                  method:'post',
                  data:this.user
              }).then(res=>{
                  if(res.data.isok){
                      this.open(res.data.info)
                     localStorage.setItem('username',this.user.name)
                     localStorage.setItem('usertype',this.user.type)
                     localStorage.setItem('userpass',this.user.pass)
                      this.$router.replace('/index')
                  }else{
                      this.open2(res.data.info)
                  }
              })
          }else{
              this.open2('请输入完整')
          }
      },
      open(msg) {
        this.$message({
          message: '欢迎你'+msg,
          showClose: true,
          type: 'success'
        });
      },
      open2(msg) {
        showClose: true,
        this.$message.error(msg);
      },
  },
  watch: {},
  computed: {},
  components: {},
  mounted() {}
};
</script>
<style  lang='less' rel='stylesheet/less' scoped>
@import "../less/index.less";
.warpper .el-button--info {
  text-align: center;
  line-height: 80px;
  ;
}
.warpper {
  color: #fff;
  width: 100vw;
  height: 100vh;
  background: @bg1;
  position: relative;
  h1{
    text-align:center;
    padding-top: 30px;
  }
  .con {
     background: rgba(0, 0, 0, 0.7);
    width: 340px;
    height: 270px;
    border: 2px solid @info;
    border-radius: 5px;
    // border-bottom-right-radius: 10px;
    // border-bottom-left-radius: 10px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 20px;
    .msg{
        margin:10px 0;
    }

  }
  .comfirm{
      width: 100%;
      height: 40px;
      margin-top: 30px;
      background: @bg2;
      border:1px solid transparent;
      outline: none;
  }
}
</style>