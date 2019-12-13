<template>
  <div class="left">
    <div>
      <router-link to="/index/manage" active-class="select" v-if="isAdmin==0">管理员管理</router-link>
    </div>
    <div>
      <router-link to="/index/banner" active-class="select" v-if="isAdmin==1">banner管理</router-link>
    </div>
    <div>
      <router-link to="/index/jiajiao" active-class="select" v-if="isAdmin==1">家教管理</router-link>
    </div>
    <div>
      <router-link to="/index/water" active-class="select" v-if="isAdmin==1">水站管理</router-link>
    </div>
    <div>
      <router-link to="/index/weixiu" active-class="select" v-if="isAdmin==1">维修管理</router-link>
    </div>
    <div>
      <router-link to="/index/jiazheng" active-class="select" v-if="isAdmin==1">家政管理</router-link>
    </div>
    <div>
      <router-link to="/index/updatePass" active-class="select" v-if="isAdmin==1">修改密码</router-link>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAdmin: localStorage.getItem("usertype")
    };
  },
  methods: {},
  watch: {},
  computed: {},
  components: {},
  mounted() {}
};
</script>
<style  lang='less' rel='stylesheet/less' scoped>
@import "../less/index.less";
.left {
  width: 15%;
  background: @primary;
  div {
      margin: 5px 0;
    a {
      display: block;
      width: 80%;
      text-align: center;
      margin: 0 auto;
      border-radius: 5px;
      padding: 10px 0;
      
      &.select {
        background: @light;
        color: #fff;
      }
      &:hover {
        transition: all 0.6s;
        background: @light;
        color: #fff;
      }
    }
  }
}
</style>