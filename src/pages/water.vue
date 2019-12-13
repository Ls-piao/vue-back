<template>
  <div class="warpper">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-tabs
          tab-position="top"
          @tab-click="handleClick"
          style="height: 200px;margin:15vh auto 0;position:relative"
        >
          <el-tab-pane label="水站">
            <el-button type="warning" class="create" @click="toCreate">新建+</el-button>
            <el-table :data="list" max-height="300" border style="width: 90%" class="newcon">
              <el-table-column type="index" fixed prop="date" label="序号" width="80"></el-table-column>
              <el-table-column prop="name" label="水站名字" width="280"></el-table-column>
              <el-table-column prop="tel" label="电话" width="150"></el-table-column>
              <el-table-column prop="price" label="价格" width="150"></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click="delwater(scope.row.id)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="水站评论" class="discuss">
            <el-select v-model="value" placeholder="请选择水站" @change="chooseWater(value)">
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
                  <el-button type="danger" @click="delWaterComment(scope.row.id)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog title="添加水站" @click.self="cancel" :visible.sync="dialogFormVisible" class="newcon">
      <div>名称:</div>
      <el-input placeholder="名称" v-model="newWater.name" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newWater.name"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>评分:</div>
      <el-select v-model="newWater.score" style="width:100%">
        <el-option value="0">0</el-option>
        <el-option value="1">1</el-option>
        <el-option value="2">2</el-option>
        <el-option value="3">3</el-option>
        <el-option value="4">4</el-option>
        <el-option value="4">4</el-option>
        <el-option value="5">5</el-option>
      </el-select>
      <div>月销售量:</div>
      <el-input placeholder="月销售量" v-model="newWater.count"  clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newWater.count"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>点赞数量:</div>
      <el-input placeholder="点赞数量" v-model="newWater.likeNum"  clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newWater.likeNum"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>浏览量:</div>
      <el-input placeholder="浏览量" v-model="newWater.readNum"  clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newWater.readNum"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>商家地址:</div>
      <el-input placeholder="商家地址" v-model="newWater.address" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newWater.address"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>距离:</div>
      <el-input placeholder="距离" v-model="newWater.len" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newWater.len"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>商家信息:</div>
      <el-input placeholder="商家信息" v-model="newWater.des" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newWater.des"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>电话:</div>
      <el-input placeholder="eg:400-100-1000" v-model="newWater.tel" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newWater.des"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>价格:</div>
      <el-input placeholder="eg:58元/桶" v-model="newWater.price" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="newWater.des"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div class="outer">
        <h3>+</h3>
        <img :src="newWater.img" alt />
        <input type="file" @change="upload($event)" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "../util/API";
import * as qiniu from "qiniu-js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      arr: [],
      activeName: "first",
      list: [],
      value: "0",
      isCreate: true,
      newWater: {
        img: "",
        name: "",
        score: "",
        count: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        des: "",
        tel: "",
        price: ""
      },
      waterInit: {
        img: "",
        name: "",
        score: "",
        count: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        des: "",
        tel: "",
        price: ""
      },
      commentlist: []
    };
  },
  methods: {
    delWaterComment(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: api.delComment,
          params: {
            id: id
          }
        }).then(res => {
          if (res.data.isok) {
            this.open(res.data.info);
            this.init3(this.value);
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

    delwater(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: api.delWater,
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
    //切换内置tab
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
        url: api.addWater,
        params: this.newWater
      }).then(res => {
        if (res.data.isok) {
          console.log(this.newWater);
          this.dialogFormVisible = false;
          this.open(res.data.info);
          this.init1();
          this.$store.dispatch("setWater", this.waterInit);
        } else {
          this.open2(res.data.info);
        }
      });
    },
    upload(e) {
      console.log(e.target.files);
      var file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("taida");
        return;
      }
      //取后缀名
      var extname = file.name.slice(file.name.lastIndexOf("."));
      if (extname != ".jpg" && extname != ".png") {
        alert("geshicuowu");
        return;
      }
      //七牛云上面的文件名 12325343.jpg
      var name = new Date().getTime() + extname;
      //获取token
      this.axios({
        url: "/api/getToken"
      }).then(res => {
        var token = res.data.token;
        var url = res.data.url + "/";
        //上传
        qiniu.upload(file, name, token).subscribe(d => {
          console.log("===========upload qiniuyun===============");
          console.log(d);
          if (d.total.percent == 100) {
            this.newWater.img = url + name;
          }
        });
      });
    },
    toCreate() {
      this.dialogFormVisible = true;
      this.newWater = this.$store.state.waterUser;
    },
    cancel() {
      this.$store.dispatch("setWater", this.newWater);
    },
    init3(id) {
      if (id) {
        this.axios({
          url: api.findComment,
          params: {
            waterId: id
          }
        }).then(res => {
          if (!res.data.isok) {
            return this.open2("请求数据失败");
          }
          this.commentlist = res.data.data;
        });
      } else {
        this.axios({
          url: api.findComment
        }).then(res => {
          if (!res.data.isok) {
            return this.open2("请求数据失败");
          }
          this.commentlist = res.data.data;
        });
      }
    },

    init1() {
      this.axios({
        url: api.findWater
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
.el-icon-success {
  color: @success;
}
</style>