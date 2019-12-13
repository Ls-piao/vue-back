<template>
  <div class="warpper">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-button @click="toCreate" class="new" type="warning">新建+</el-button>
        <el-table :data="list" max-height="450" border style="width: 100%" class="newcon">
          <el-table-column type="index" fixed prop="date" label="序号" width="120"></el-table-column>
          <el-table-column prop="img" label="图片" width="280">
            <template slot-scope="scope">
              <img :src="scope.row.img" width="60%" class="head_pic" />
            </template>
          </el-table-column>
          <el-table-column prop="des" label="属性" width="250"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click="open3(scope.row.id)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog
      title="添加banner"
      :visible.sync="dialogFormVisible"
      style="margin-top:15vh"
      class="newcon"
    >
      <div class="outer">
        <h3>+</h3>
        <img :src="image.img" alt />
        <input type="file" @change="upload($event)" />
      </div>
      <el-input placeholder="描述" v-model="image.des" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="image.des"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
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
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("usertype") != 1) {
      next("/index/welcome");
      return;
    }
    next();
  },
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      image: {
        img: "",
        des: ""
      }
    };
  },
  methods: {
    upload(e) {
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
          if (d.total.percent == 100) {
            this.image.img = url + name;
          }
        });
      });
    },
    add() {
      if (this.image.des && this.image.img) {
        this.axios({
          url: api.addBanner,
          params: this.image
        }).then(res => {
          if (res.data.isok) {
            this.dialogFormVisible = false;
            this.open(res.data.info);
            this.init();
          } else {
            this.open2(res.data.info);
          }
        });
      } else {
        this.open2("描述或者图片不能为空");
      }
    },
    toCreate() {
      this.dialogFormVisible = true;
      this.image.img=''
      this.image.des=''
    },
    open3(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: api.delBanner,
          params: {
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
    init() {
      this.axios({
        url: api.banner
      }).then(res => {
        if (res.data.isok) {
          this.list = res.data.data;
        } else {
          this.open2(res.data.info);
        }
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
    this.init();
  }
};
</script>
<style  lang='less' rel='stylesheet/less' scoped>
@import "../less/index.less";
.warpper {
  position: relative;

  .newcon {
    margin-top: 100px;
  }
}
.new {
  position: absolute;
  left: 220px;
  top: 30px;
}
.el-table--border {
  border: 1px solid @bg2;
  box-shadow: 5px 5px 5px #00000088;
}
.outer {
  width: 150px;
  height: 150px;
  border: 1px solid #cccccc;
  position: relative;
  border-radius: 5px;
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
.el-icon-success{
  color: @success
}
</style>