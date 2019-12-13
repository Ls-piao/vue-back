<template>
  <div class="warpper">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-tabs
          tab-position="top"
          @tab-click="handleClick"
          style="height: 200px;margin:15vh auto 0;position:relative"
        >
          <el-tab-pane label="维修">
            <el-button type="warning" class="create" @click="toCreate">新建+</el-button>
            <el-table :data="list" max-height="300" border style="width: 90%" class="newcon">
              <el-table-column type="index" fixed prop="date" label="序号" width="80"></el-table-column>
              <el-table-column prop="name" label="维修名字" width="200"></el-table-column>
              <el-table-column prop="tel" label="电话" width="150"></el-table-column>
              <el-table-column prop="type" label="类型" width="150"></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button @click="toupdate(scope.row.id)" type="primary" size="small">查看</el-button>
                  <el-button type="danger" @click="delRepair(scope.row.id)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="维修评论" class="discuss">
            <el-select v-model="value" placeholder="请选择维修" @change="chooseWater(value)">
              <el-option label="全部" value="0" selected></el-option>
              <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-badge class="mark" :value="commentlist.length" />
            <el-table :data="commentlist" max-height="300" border style="width: 90%" class="newcon">
              <el-table-column type="index" fixed prop="date" label="序号" width="80"></el-table-column>
              <el-table-column prop="name" label="用户名称" width="280"></el-table-column>
              <el-table-column prop="content" label="内容" width="150"></el-table-column>
              <el-table-column prop="time" label="时间" width="150">
                <template slot-scope="scope">
                  <span>{{scope.row.time|timeFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click="delRepairComment(scope.row.id)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog title="添加维修" @click="cancel" :visible.sync="dialogFormVisible" class="newcon">
      <div>名称:</div>
      <el-input placeholder="名称" v-model="newRepair.name" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newRepair.name"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>评分:</div>
      <el-select v-model="newRepair.score" style="width:100%">
        <el-option value="0">0</el-option>
        <el-option value="1">1</el-option>
        <el-option value="2">2</el-option>
        <el-option value="3">3</el-option>
        <el-option value="4">4</el-option>
        <el-option value="4">4</el-option>
        <el-option value="5">5</el-option>
      </el-select>

      <div>类型:</div>
      <el-input placeholder="类型" v-model="newRepair.type" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newRepair.type"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>点赞数量:</div>
      <el-input
        placeholder="点赞数量"
        v-model="newRepair.likeNum"
        clearable
        @input="like(newRepair.likeNum)"
      >
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="reg.likeNum"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>关注人数:</div>
      <el-input
        placeholder="浏览量"
        v-model="newRepair.readNum"
        clearable
        @input="read(newRepair.readNum)"
      >
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="reg.readNum"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>商家地址:</div>
      <el-input placeholder="商家地址" v-model="newRepair.address" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newRepair.address"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>距离:</div>
      <el-input placeholder="距离" v-model="newRepair.len" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newRepair.len"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>商家信息:</div>
      <el-input placeholder="商家信息" v-model="newRepair.info" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newRepair.info"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>电话:</div>
      <el-input
        placeholder="eg:400-100-1000"
        v-model="newRepair.tel"
        clearable
        @input="tel(newRepair.tel)"
        maxlength="11"
        show-word-limit
      >
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="reg.tel"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="!newRepair.id">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "../util/API";
import * as qiniu from "qiniu-js";
import reg from "../util/reg";
export default {
  data() {
    return {
      dialogFormVisible: false,
      arr: [],
      activeName: "first",
      list: [],
      value: "0",

      newRepair: {
        name: "",
        score: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        tel: "",
        info: "",
        type: ""
      },
      repireInit: {
        name: "",
        score: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        tel: "",
        info: "",
        type: ""
      },
      isCreate: true,
      commentlist: [],
      reg: {
        tel: false,
        likeNum: false,
        readNum: false
      }
    };
  },
  methods: {
    tel(msg) {
      if (reg.telReg.test(msg)) {
        this.reg.tel = true;
      } else {
        this.reg.tel = false;
      }
    },
    like(msg) {
      if (reg.numReg.test(msg)) {
        this.reg.likeNum = true;
      } else {
        this.reg.likeNum = false;
      }
    },
    read(msg) {
      if (reg.numReg.test(msg)) {
        this.reg.readNum = true;
      } else {
        this.reg.readNum = false;
      }
    },

    update() {
      this.axios({
        url: api.updateRepair,
        params: this.newRepair
      }).then(res => {
        if (res.data.isok) {
          this.open(res.data.info);
          this.dialogFormVisible = false;
          this.init1();
        } else {
          this.open2(res.data.info);
        }
      });
    },
    toupdate(id) {
      this.dialogFormVisible = true;
      this.axios({
        url: api.findRepair,
        params: {
          id: id
        }
      }).then(res => {
        if (res.data.isok) {
          this.newRepair = res.data.data[0];
          this.read(this.newRepair.readNum);
          this.like(this.newRepair.likeNum);
          this.tel(this.newRepair.tel);
        } else {
          this.open2("请求数据失败");
        }
      });
    },
    delRepairComment(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: api.delRepairComment,
          params: {
            id: id
          }
        }).then(res => {
          if (res.data.isok) {
            this.open(res.data.info);
            this.chooseWater(this.value);
          } else {
            this.open2(res.data.info);
          }
        });
      });
    },
    chooseWater(id) {
      if (id != "0") {
        this.init3(id);
      } else {
        this.init3();
      }
    },

    delRepair(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: api.delRepair,
          params: {
            id: id
          }
        }).then(res => {
          console.log(res);
          if (res.data.isok) {
            this.open(res.data.info);
            this.init1();
          } else {
            this.open2(res.data.info);
          }
        });
      });
    },
    handleClick(tab, event) {
      if (tab.index == "1") {
        this.init1();
        this.init3();
      }
      if (tab.index == "0") {
        this.init1();
      }
    },
    add() {
      this.axios({
        url: api.addRepair,
        params: this.newRepair
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible = false;
          this.open(res.data.info);
          this.init1();
          this.$store.dispatch("setRepire", this.repireInit);
        } else {
          this.open2(res.data.info);
        }
      });
    },
    toCreate() {
      this.dialogFormVisible = true;
      this.newRepair = this.$store.state.repireUser;
      this.read(this.newRepair.readNum);
      this.like(this.newRepair.likeNum);
      this.tel(this.newRepair.tel);
    },
    cancel() {
      if (this.isCreate) {
        this.$store.dispatch("setRepire", this.newRepair);
      } else {
        this.$store.dispatch("setrepire", this.repireInit);
      }
    },
    init3(id) {
      if (id) {
        this.axios({
          url: api.findRepairComment,
          params: {
            repairId: id
          }
        }).then(res => {
          if (!res.data.isok) {
            return this.open2("请求数据失败");
          }
          this.commentlist = res.data.data;
        });
      } else {
        this.axios({
          url: api.findRepairComment
        }).then(res => {
          if (!res.data.isok) {
            return this.open2("请求数据失败");
          }
          this.commentlist = res.data.data;
          console.log(this.commentlist);
        });
      }
    },

    init1() {
      this.axios({
        url: api.findRepair
      }).then(res => {
        if (!res.data.isok) {
          this.open2("数据请求失败");
        }
        this.list = res.data.data;
      });
    },
    open(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },
    open2(msg) {
      this.$message.error(msg);
    }
  },
  watch: {},
  computed: {},
  components: {},
  mounted() {
    this.init1();
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
.el-table--border {
  border: 1px solid @bg2;
  box-shadow: 5px 5px 5px #00000088;
  margin-top: 20px;
}
.el-icon-success {
  color: @success;
}
.chose {
  width: 40vw;
}
.outer {
  width: 150px;
  height: 150px;
  border: 2px dotted #cccccc;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  h3,
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    text-align: center;
    line-height: 150px;
  }
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0px;
    top: 0px;
  }
}
.newcon div {
  margin: 10px 0;
}
</style>