<template>
  <div class="warpper">
    <v-head></v-head>
    <div class="main">
      <v-left></v-left>
      <v-right></v-right>
    </div>
  </div>
</template>
<script>
import vHead from "../views/head";
import vLeft from "../views/left";
import vRight from "../views/right";

export default {
 
  data() {
    return {};
  },
  methods: {
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
  components: {
    vHead,
    vLeft,
    vRight
  },
  mounted() {}
};
</script>
<style  lang='less' rel='stylesheet/less' scoped>
@import "../less/index.less";
.warpper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    display: flex;
  }
}
</style>