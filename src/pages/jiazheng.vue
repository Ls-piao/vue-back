<template>
  <div class="warpper">
    <el-row class="tabs">
      <el-col :span="18" :offset="3">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="家政banner" name="first">
            <el-button type="warning" class="create" @click="toCreateBanner">新建+</el-button>
            <el-table :data="bannerList" max-height="320" border style="width: 90%" class="newcon">
              <el-table-column type="index" fixed prop="date" label="序号" width="120"></el-table-column>
              <el-table-column prop="img" label="图片" width="480">
                <template slot-scope="scope">
                  <img :src="scope.row.img" width="60%" class="head_pic" />
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click="bannerDel(scope.row.id)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="人员管理" name="second">
            <el-button type="warning" class="create" @click="toCreateWorker">新建+</el-button>
            <el-select v-model="value" placeholder="请选择" @change="chooseType(value)">
              <el-option label="全部" value="0" selected></el-option>
              <el-option v-for="item in typelist" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-badge class="mark" :value="workerList.length" />
            <el-table :data="workerList" max-height="300" border style="width: 90%" class="newcon">
              <el-table-column type="index" fixed prop="date" label="序号" width="100"></el-table-column>
              <el-table-column prop="name" label="名称" width="120"></el-table-column>
              <el-table-column prop="tel" label="电话" width="120"></el-table-column>
              <el-table-column prop="price" label="价格" width="120"></el-table-column>
              <el-table-column prop="age" label="年龄" width="120"></el-table-column>
              <el-table-column prop="edu" label="学历" width="120"></el-table-column>
              <el-table-column prop="type" label="服务类型" width="120"></el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button @click="toupdate(scope.row.id)" type="primary" size="small">查看</el-button>
                  <el-button type="danger" @click="workerDel(scope.row.id)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog
      title="添加banner"
      :visible.sync="BannerVisible"
      style="margin-top:15vh"
      class="newcon"
    >
      <div class="outer">
        <h3>+</h3>
        <img :src="bannerImage.img" alt />
        <input type="file" @input="upload($event,'1')" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="BannerVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBanner">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加/修改worker" @click="cancel" :visible.sync="workerVisible" class="newcon">
      <div>姓名:</div>
      <el-input placeholder="姓名" v-model="workInfo.name" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="workInfo.name"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>年龄:</div>
      <el-input
        placeholder="请输入年龄"
        v-model="workInfo.age"
        clearable
        maxlength="2"
        show-word-limit
        @input="age(workInfo.age)"
      >
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="reg.age"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>电话:</div>
      <el-input
        placeholder="请输入11位电话号码"
        v-model="workInfo.tel"
        clearable
        maxlength="11"
        show-word-limit
        @input="tel(workInfo.tel)"
      >
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="reg.tel"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>资格认证</div>
      <el-checkbox-group v-model="workInfo.qualification">
        <el-checkbox :label="item" v-for="item in qualificationlist" :key="item"></el-checkbox>
      </el-checkbox-group>
      <div>服务项目:</div>
      <el-checkbox-group v-model="workInfo.type">
        <el-checkbox :label="item" v-for="item in typelist" :key="item"></el-checkbox>
      </el-checkbox-group>
      <div>学历:</div>
      <el-select v-model="workInfo.edu" placeholder="请选择学历" style="width:100%">
        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <div>工作年限:</div>
      <el-input
        placeholder="工作年限"
        v-model="workInfo.year"
        @input="year(workInfo.year)"
        min="0"
        clearable
      >
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="reg.year"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>级别:</div>
      <el-input placeholder="eg:v3" v-model="workInfo.vNum" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="workInfo.vNum"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>价格:</div>
      <el-input placeholder="300元/小时" v-model="workInfo.price" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="workInfo.price"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>城市:</div>
      <el-input placeholder="eg:武汉" v-model="workInfo.city" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="workInfo.city"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>经验:</div>
      <el-input placeholder="eg:拉满" v-model="workInfo.experience" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="workInfo.experience"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>点赞数量:</div>
      <el-input
        placeholder="点赞数量"
        v-model="workInfo.likeNum"
        clearable
        @input="like(workInfo.likeNum)"
        min="0"
      >
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="reg.likeNum"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>关注人数:</div>
      <el-input
        placeholder="关注人数"
        v-model="workInfo.readNum"
        clearable
        @input="read(workInfo.readNum)"
        min="0"
      >
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="reg.readNum"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>距离:</div>
      <el-input placeholder="eg:4.2KM" v-model="workInfo.len" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="workInfo.len"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div>自我评价:</div>
      <el-input placeholder="自我评价" v-model="workInfo.info" clearable>
        <i slot="suffix" class="el-input__icon el-icon-success" v-if="workInfo.info"></i>
        <i slot="suffix" class="el-input__icon el-icon-error" v-else></i>
      </el-input>
      <div class="outer">
        <h3>+</h3>
        <img :src="workInfo.img" alt />
        <input type="file" @input="upload($event,'2')" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="workerVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWorker" v-if="isCreate">确 定</el-button>
        <el-button type="primary" @click="updateWorker" v-else>修改</el-button>
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
      isCreate: true,
      options: [
        {
          id: "0",
          label: "小学",
          value: "小学"
        },
        {
          id: "1",
          label: "初中",
          value: "初中"
        },
        {
          id: "2",
          label: "高中",
          value: "高中"
        },
        {
          id: "3",
          label: "本科",
          value: "本科"
        },
        {
          id: "4",
          label: "研究生",
          value: "研究生"
        },
        {
          id: "5",
          label: "博士",
          value: "博士"
        }
      ],
      activeName: "first",
      BannerVisible: false,
      workerVisible: false,
      bannerList: [],
      workerList: [],
      bannerImage: {
        img: ""
      },
      value: "0",
      typelist: [],
      qualificationlist: [],
      workInfoInit: {
        name: "",
        age: "",
        tel: "",
        qualification: [],
        type: [],
        edu: "",
        year: "",
        vNum: "",
        price: "",
        city: "",
        experience: "",
        likeNum: "",
        readNum: "",
        len: "",
        info: "",
        img: ""
      },
      workInfo: {
        name: "",
        age: "",
        tel: "",
        qualification: [],
        type: [],
        edu: "",
        year: "",
        vNum: "",
        price: "",
        city: "",
        experience: "",
        likeNum: "",
        readNum: "",
        len: "",
        info: "",
        img: ""
      },
      reg: {
        age: false,
        tel: false,
        likeNum: false,
        readNum: false,
        year: false
      }
    };
  },
  methods: {
    chooseType(val) {
      if (val == "0") {
        this.axios({
          url: api.findHomeWorker
        }).then(res => {
          this.workerList = res.data.data;
        });
      } else {
        this.axios({
          url: api.findHomeWorker,
          params: {
            type: val
          }
        }).then(res => {
          this.workerList = res.data.data;
        });
      }
    },
    tel(msg) {
      if (reg.telReg.test(msg)) {
        this.reg.tel = true;
      } else {
        this.reg.tel = false;
      }
    },
    age(msg) {
      if (reg.numReg.test(msg)) {
        this.reg.age = true;
      } else {
        this.reg.age = false;
      }
    },
    year(msg) {
      if (reg.numReg.test(msg)) {
        this.reg.year = true;
      } else {
        this.reg.year = false;
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

    updateWorker(id) {
      this.axios({
        url: api.updateHomeWorker,
        params: this.workInfo
      }).then(res => {
        if (res.data.isok) {
          this.open(res.data.info);
          this.workerVisible = false;
          this.workerInit();
        } else {
          this.open2(res.data.info);
        }
      });
    },
    toupdate(id) {
      this.isCreate = false;
      this.workerVisible = true;
      // this.reg.age = true;
      // this.reg.tel = true;
      // this.reg.likeNum = true;
      // this.reg.readNum = true;
      // this.reg.year = true;
      this.axios({
        url: api.findHomeWorker,
        params: {
          id: id
        }
      }).then(res => {
        if (res.data.isok) {
          var data = res.data.data[0];
          if (data.qualification.includes("[")) {
            data.qualification = JSON.parse(data.qualification);
          } else {
            data.qualification = data.qualification.split(",");
          }
          if (data.type.includes("[")) {
            data.type = JSON.parse(data.type);
          } else {
            data.type = data.type.split(",");
          }

          this.workInfo = data;
          this.year(this.workInfo.year);
          this.tel(this.workInfo.tel);
          this.age(this.workInfo.age);
          this.like(this.workInfo.likeNum);
          this.read(this.workInfo.readNum);
        } else {
          this.open2(res.data.info);
        }
      });
    },
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
              this.bannerImage.img = url + name;
            }
            if (num == "2") {
              this.workInfo.img = url + name;
            }
          }
        });
      });
    },
    addWorker() {
      this.axios({
        url: api.addHomeWorker,
        params: this.workInfo
      }).then(res => {
        if (res.data.isok) {
          this.workerVisible = false;
          this.open(res.data.info);
          this.workerInit();
          this.$store.dispatch('setCreate',this.workInfoInit)
        } else {
          this.open2(res.data.info);
        }
      });
    },
    addBanner() {
      this.axios({
        url: api.addHomeBanner,
        params: this.bannerImage
      }).then(res => {
        if (res.data.isok) {
          this.BannerVisible = false;
          this.open(res.data.info);
          this.bannerInit();
        } else {
          this.open2(res.data.info);
        }
      });
    },
    toCreateBanner() {
      this.BannerVisible = true;
      this.bannerImage = {
        img: ""
      };
    },
    toCreateWorker() {
      this.reg.age = false;
      this.reg.tel = false;
      this.reg.likeNum = false;
      this.reg.readNum = false;
      this.reg.year = false;
      this.isCreate = true;
      this.workerVisible = true;
      this.workInfo = this.$store.state.homeWork;
      this.year(this.workInfo.year);
      this.tel(this.workInfo.tel);
      this.age(this.workInfo.age);
      this.like(this.workInfo.likeNum);
      this.read(this.workInfo.readNum);
    },
    cancel() {
      if (this.isCreate) {
        this.$store.dispatch("setCreate", this.workInfo);
        this.workerVisible = false;
      } else {
        this.$store.dispatch("setCreate", this.workInfoInit);
        this.workerVisible = false;
      }
    },
    getarr() {
      this.axios({
        url: api.getHomeType
      }).then(res => {
        if (res.data.isok) {
          this.typelist = res.data.type;
          console.log(this.typelist);
        }
      });
      this.axios({
        url: api.getQualification
      }).then(res => {
        if (res.data.isok) {
          this.qualificationlist = res.data.qualification;
        }
      });
    },
    handleClick(tab, event) {
      if (tab.index == "1") {
        this.workerInit();
      }
      if (tab.index == "0") {
        this.bannerInit();
      }
    },
    bannerInit() {
      this.axios({
        url: api.homeBanner
      }).then(res => {
        if (res.data.isok) {
          this.bannerList = res.data.data;
        } else {
        }
      });
    },
    workerInit() {
      this.isCreate = true;
      this.axios({
        url: api.findHomeWorker
      }).then(res => {
        if (res.data.isok) {
          this.workerList = res.data.data;
        }
      });
    },

    bannerDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: api.delHomeBanner,
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
    workerDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: api.delHomeWorker,
          params: {
            id: id
          }
        }).then(res => {
          if (res.data.isok) {
            this.open(res.data.info);
            this.chooseType(this.value);
          } else {
            this.open2(res.data.info);
          }
        });
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
    this.bannerInit();
    this.getarr();
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
.warpper {
  .tabs {
    margin-top: 100px;
  }
  .el-table--border {
    border: 1px solid @bg2;
    box-shadow: 5px 5px 5px #00000088;
  }
}
.create {
  margin: 10px 0;
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
.el-icon-success {
  color: @success;
}
</style>