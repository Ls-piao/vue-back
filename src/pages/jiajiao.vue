<template>
  <div class="warpper">
    <el-row class="tabs">
      <el-col :span="18" :offset="3">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="家教banner" name="first">
            <el-button type="warning" class="create" @click="toCreateTeacherBanner">新建+</el-button>
            <el-table :data="bannerList" max-height="300" border style="width: 90%" class="newcon">
              <el-table-column type="index" fixed prop="date" label="序号" width="120"></el-table-column>
              <el-table-column prop="img" label="图片" width="280">
                <template slot-scope="scope">
                  <img :src="scope.row.img" width="60%" class="head_pic" />
                </template>
              </el-table-column>
              <el-table-column prop="des" label="属性" width="250"></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click="bannerDel(scope.row.id)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="家教类型" name="second">
            <el-button type="warning" class="create" @click="toCreateTeacherType">新建+</el-button>
            <el-table
              :data="teacherTypeList"
              max-height="300"
              border
              style="width: 90%"
              class="newcon"
            >
              <el-table-column type="index" fixed prop="date" label="序号" width="120"></el-table-column>
              <el-table-column prop="img" label="图片" width="280">
                <template slot-scope="scope">
                  <img :src="scope.row.img" width="60%" class="head_pic" />
                </template>
              </el-table-column>
              <el-table-column prop="type" label="类型" width="250"></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click="typeDel(scope.row.id)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="家教排行" name="third">
            <el-button type="warning" class="create" @click="toCreateTeacherPaihang">新建+</el-button>
            <el-table
              :data="teacherPaihangList"
              max-height="300"
              border
              style="width: 90%"
              class="newcon"
            >
              <el-table-column type="index" fixed prop="date" label="序号" width="120"></el-table-column>
              <el-table-column prop="img" label="图片" width="280">
                <template slot-scope="scope">
                  <img :src="scope.row.img" width="60%" class="head_pic" />
                </template>
              </el-table-column>
              <el-table-column prop="num" label="报名人数" width="250"></el-table-column>
              <el-table-column prop="teacherImg" label="授课机构" width="250">
                <template slot-scope="scope">
                  <img :src="scope.row.img" width="60%" class="head_pic" />
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click="topDel(scope.row.id)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog
      title="添加教师banner"
      :visible.sync="teacherBannerVisible"
      style="margin-top:15vh"
      class="newcon"
    >
      <div class="outer">
        <h3>+</h3>
        <img :src="teacherbannerImage.img" alt />
        <input type="file" @change="upload($event,'1')" />
      </div>
      <el-input placeholder="描述" v-model="teacherbannerImage.des" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="teacherbannerImage.des"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="teacherBannerVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeacherBanner">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加教师type"
      :visible.sync="teacherTypeVisible"
      style="margin-top:15vh"
      class="newcon"
    >
      <div class="outer">
        <h3>+</h3>
        <img :src="teacherTypeImage.img" alt />
        <input type="file" @change="upload($event,'2')" />
      </div>
      <el-input placeholder="类型" v-model="teacherTypeImage.type" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="teacherTypeImage.type"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="teacherTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeacherType">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加教师排行" :visible.sync="teacherPaihangVisible" class="newcon">
      <div>教师图片</div>
      <div class="outer">
        <h3>+</h3>
        <img :src="teacherPaihangImage.img" alt />
        <input type="file" @change="upload($event,'3')" />
      </div>
      <div>描述</div>
      <el-input placeholder="描述" v-model="teacherPaihangImage.num" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="teacherPaihangImage.num"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>教育机构图片</div>
      <div class="outer">
        <h3>+</h3>
        <img :src="teacherPaihangImage.teacherImg" alt />
        <input type="file" @change="upload($event,'4')" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="teacherPaihangVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeacherPaihang">确 定</el-button>
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
      activeName: "first",
      teacherBannerVisible: false,
      teacherTypeVisible: false,
      teacherPaihangVisible: false,
      bannerList: [],
      teacherTypeList: [],
      teacherPaihangList: [],
      teacherbannerImage: {
        img: "",
        des: ""
      },
      teacherTypeImage: {
        img: "",
        type: ""
      },
      teacherPaihangImage: {
        img: "",
        num: "",
        teacherImg: ""
      }
    };
  },
  methods: {
    upload(e, num) {
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
            if (num == "1") {
              this.teacherbannerImage.img = url + name;
            }
            if (num == "2") {
              this.teacherTypeImage.img = url + name;
            }
            if (num == "3") {
              this.teacherPaihangImage.img = url + name;
            }
            if (num == "4") {
              this.teacherPaihangImage.teacherImg = url + name;
            }
          }
        });
      });
    },
    addTeacherType() {
      if (this.teacherTypeImage.img && this.teacherTypeImage.type) {
        this.axios({
          url: api.addteacherType,
          params: this.teacherTypeImage
        }).then(res => {
          if (res.data.isok) {
            this.teacherTypeVisible = false;
            this.open(res.data.info);
            this.typeInit();
          } else {
            this.open2(res.data.info);
          }
        });
      } else {
        this.open2("输入不完整，请输入完整");
      }
    },
    addTeacherBanner() {
      if (this.teacherbannerImage.img && this.teacherbannerImage.des) {
        this.axios({
          url: api.addTeacherBanner,
          params: this.teacherbannerImage
        }).then(res => {
          if (res.data.isok) {
            this.teacherBannerVisible = false;
            this.open(res.data.info);
            this.bannerInit();
          } else {
            this.open2(res.data.info);
          }
        });
      } else {
        this.open2("输入不完整，请输入完整");
      }
    },
    addTeacherPaihang() {
      if (
        this.teacherPaihangImage.img &&
        this.teacherPaihangImage.num &&
        this.teacherPaihangImage.teacherImg
      ) {
        this.axios({
          url: api.addteacherTop,
          params: this.teacherPaihangImage
        }).then(res => {
          if (res.data.isok) {
            this.teacherPaihangVisible = false;
            this.open(res.data.info);
            this.paihangInit();
          } else {
            this.open2(res.data.info);
          }
        });
      } else {
        this.open2("输入不完整，请输入完整");
      }
    },
    toCreateTeacherBanner() {
      this.teacherBannerVisible = true;
      this.teacherbannerImage = {
        img: "",
        des: ""
      };
    },
    toCreateTeacherType() {
      this.teacherTypeVisible = true;
      this.teacherTypeImage = {
        img: "",
        type: ""
      };
    },
    toCreateTeacherPaihang() {
      this.teacherPaihangVisible = true;
      this.teacherPaihangImage = {
        img: "",
        num: "",
        teacherImg: ""
      };
    },
    handleClick(tab, event) {
      if (tab.index == "1") {
        this.typeInit();
      }
      if (tab.index == "0") {
        this.bannerInit();
      }
      if (tab.index == "2") {
        this.paihangInit();
      }
    },
    bannerInit() {
      this.axios({
        url: api.teacherBanner
      }).then(res => {
        if (res.data.isok) {
          this.bannerList = res.data.data;
        } else {
        }
      });
    },
    typeInit() {
      this.axios({
        url: api.teacherType
      }).then(res => {
        if (res.data.isok) {
          this.teacherTypeList = res.data.data;
        }
      });
    },
    paihangInit() {
      this.axios({
        url: api.teacherTop
      }).then(res => {
        this.teacherPaihangList = res.data.data;
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
    },
    bannerDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: api.delTeacherBanner,
          params: {
            id: id
          }
        }).then(res => {
          if (res.data.isok) {
            this.open(res.data.info);
            this.bannerInit();
          } else {
            this.open2(res.data.info);
          }
        });
      });
    },
    typeDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: api.delTeacherType,
          params: {
            id: id
          }
        }).then(res => {
          if (res.data.isok) {
            this.open(res.data.info);
            this.typeInit();
          } else {
            this.open2(res.data.info);
          }
        });
      });
    },
    topDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: api.delTeacherTop,
          params: {
            id: id
          }
        }).then(res => {
          if (res.data.isok) {
            this.open(res.data.info);
            this.paihangInit();
          } else {
            this.open2(res.data.info);
          }
        });
      });
    }
  },
  watch: {},
  computed: {},
  components: {},
  mounted() {
    this.bannerInit();
  }
};
</script>
<style  lang='less' rel='stylesheet/less' scoped>
@import "../less/index.less";
.warpper {
  .tabs {
    margin-top: 100px;
  }
 .el-icon-success{
  color: @success
}
}
.create {
  margin: 10px 0;
}
.el-icon-success{
  color: @success
}
.outer {
  width: 150px;
  height: 150px;
  border: 1px dotted #cccccc;
  border-radius: 15px;
  position: relative;
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
.el-table--border {
  border: 1px solid @bg2;
  box-shadow: 5px 5px 5px #00000088;
}
</style>