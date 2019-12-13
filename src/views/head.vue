<template>
  <div class="head">
    欢迎进入后台管理系统：{{type}}:{{name}}
    <el-button type="info" class="exits"  @click="exits">退出登录</el-button>
  </div>
</template>
<script>
import api from "../util/API";
export default {
  data() {
    return {
      type: localStorage.getItem("usertype") == "0" ? "超级管理员" : "管理员",
      name: localStorage.getItem("username")
    };
  },
  methods: {
    exits() {
      this.axios({
        url: api.exit
      }).then(res => {
        if (res.data.isok) {
          this.open(res.data.info);
          localStorage.removeItem("username");
          localStorage.removeItem("usertype");
          localStorage.removeItem("userpass");
          this.$router.replace("/login");
        } else {
          this.open2(res.data.info);
        }
      });
    },
    open(msg) {
      this.$message({
        message: msg,
        showClose: true,
        type: "success"
      });
    },
    open2(msg) {
      showClose: true,
      this.$message.error(msg);
    }
  },
  watch: {},
  computed: {},
  components: {},
  mounted() {}
};
</script>
<style  lang='less' rel='stylesheet/less' scoped>
@import "../less/index.less";

.head {
  height: 60px;
  width: 100vw;
  color: #ccc;
  background: black;
  font-size: 20px;
}
.exits {
  margin-left: 50px;
  margin-top: 20px;
  width: 100px;
  height: 20px;
  line-height: 5px;
}
</style>