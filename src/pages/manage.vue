<template>
  <div class="warpper">
    <!-- 新建按钮 -->
    <el-button type="success" class="new" @click="toCreate">新建+</el-button>
    <!-- list列表页 -->
    <el-table :data="list" max-height="460" border style="width: 100%" class="newcon">
      <el-table-column type="index" fixed prop="date" label="序号" width="120"></el-table-column>
      <el-table-column prop="name" label="姓名" width="250"></el-table-column>
      <el-table-column prop="des" label="属性" width="250"></el-table-column>
      <el-table-column prop="time" label="时间" width="280">
        <template slot-scope="scope">
          <span>{{scope.row.time|timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="update(scope.row.id)" type="primary" size="small">查看</el-button>
          <el-button type="danger" @click="open3(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新建弹窗 -->
    <el-dialog
      title="新建\修改管理员"
      @click.self="cancel"
      :visible.sync="dialogFormVisible"
      class="newcon"
    >
      <el-form :model="user">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input
            v-model="user.name"
            autocomplete="off"
            placeholder="请输入账号"
            @input="testname(user.name)"
            :disabled="!isCreate"
          >
            <i slot="suffix" class="el-input__icon el-icon-success" v-if="isRight"></i>
            <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
          </el-input>
          <p v-if="!user.name">请输入字母开头的5-9位字符</p>
          <p v-else>&nbsp;</p>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="user.pass"
            autocomplete="off"
            placeholder="请输入密码"
            @input="testpass(user.pass)"
            show-password
            :disabled="!isCreate"
          >
            <i slot="suffix" class="el-input__icon el-icon-success" v-if="isPass"></i>
            <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
          </el-input>
          <p v-if="!user.pass">请输入6-15位字符密码</p>
          <p v-else>&nbsp;</p>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" v-if="isCreate">
          <el-input
            v-model="comfirm"
            autocomplete="off"
            placeholder="请确认密码"
            show-password
            @input="testcomfirm(comfirm)"
          >
            <i slot="suffix" class="el-input__icon el-icon-success" v-if="isComfirm"></i>
            <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
          </el-input>
          <p v-if="!comfirm">请输入6-15位字符密码</p>
          <p v-else>&nbsp;</p>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="user.des" autocomplete="off" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker v-model="user.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Create" v-if="isCreate">确 定</el-button>
        <el-button type="primary" @click="updateComfirm(user.id)" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "../util/API";
import reg from "../util/reg";
export default {
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      user: {
        name: "",
        pass: "",
        time: "",
        des: ""
      },
      userInit: {
        name: "",
        pass: "",
        time: "",
        des: ""
      },
      formLabelWidth: "120px",
      comfirm: "",
      isRight: false,
      isPass: false,
      isComfirm: false,
      isCreate: true
    };
  },
  methods: {
    updateComfirm(id) {
      this.dialogFormVisible = false;
      this.axios({
        url: api.updateManage,
        method: "post",
        data: {
          id: id
        }
      }).then(res => {
        if (res.data.isok) {
          this.$message.success(res.data.info);
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
    update(id) {
      this.isCreate = false;
      this.dialogFormVisible = true;
      this.axios({
        url: api.findManage,
        method: "post",
        data: {
          id: id
        }
      }).then(res => {
        if (res.data.isok) {
          this.user = res.data.data[0];
          console.log(this.user);
        }
      });
    },
    open3(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: api.delManage,
          method: "post",
          data: {
            id: id
          }
        }).then(res => {
          if (res.data.isok) {
            this.open(res.data.info);
            this.init();
          } else {
            this.open2(res.data.info);
          }
        });
      });
    },
    toCreate() {
      this.dialogFormVisible = true;
      this.isCreate = true;
      this.isRight = false;
      this.isPass = false;
      this.isComfirm = false;
      this.user = this.$store.state.manageUser
    },
    cancel() {
      if (isCreate) {
        this.$store.dispatch("setManage", this.user);
        this.dialogFormVisible = false;
      } else {
        this.$store.dispatch("setManage", this.userInit);
        this.dialogFormVisible = false;
      }
    },
    testname(msg) {
      if (reg.usernameReg.test(msg)) {
        this.isRight = true;
      } else {
        this.isRight = false;
      }
    },
    testpass(msg) {
      if (reg.passwordReg.test(msg)) {
        this.isPass = true;
      } else {
        this.isPass = false;
      }
    },
    testcomfirm(msg) {
      if (msg == this.user.pass) {
        this.isComfirm = true;
      } else {
        this.isComfirm = false;
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
    init() {
      this.axios({
        url: api.findManage,
        method: "post"
      }).then(res => {
        if (res.data.isok) {
          this.list = res.data.data;
        } else {
          open2(res.data.info);
        }
      });
    },
    Create() {
      this.dialogFormVisible = false;
      if (this.isComfirm && this.isPass && this.isRight) {
        this.axios({
          url: api.addManage,
          method: "post",
          data: this.user
        }).then(res => {
          if (res.data.isok) {
            this.open(res.data.info);
            this.init();
            this.$store.dispatch("setManage", this.userInit);
          } else {
            this.open2(res.data.info);
          }
        });
      } else {
        this.open2("创建失败，请输入正确格式");
      }
    }
  },
  watch: {},
  computed: {},
  components: {},
  mounted() {
    this.init();
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("usertype") != "0") {
      next("/index/welcome");
      return;
    }
    next();
  }
};
</script>
<style  lang='less' rel='stylesheet/less' scoped>
@import "../less/index.less";
.warpper {
  margin-top: 100px;
  position: relative;
  .new {
    position: absolute;
    left: 220px;
    top: -70px;
  }
}
.newcon {
  p {
    color: @fontcolor3;
    font-size: 12px;
    height: 12px;
  }
}
.el-icon-success {
  color: #67c23a;
}
</style>