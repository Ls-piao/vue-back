<template>
<div class='warpper'>
     <h1>Welcome!</h1>
</div>
</template>
<script>
export default {
data(){
return{}
},
methods:{},
watch:{},
computed:{},
components: {},
mounted(){
},
}
</script>
<style  lang='less' rel='stylesheet/less' scoped>
@import '../less/index.less';
.warpper{
    height: 100%;
    h1{
        text-align:center;
        line-height: 10;
        color: @bg2
    }
}
</style>