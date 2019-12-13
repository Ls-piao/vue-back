<template>
<div class='right'>
    <h1>{{$route.name}}</h1>
    <router-view></router-view>
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
.right{
    flex: 1;
        position: relative;

    h1{
        position: absolute;
        left: 20px;
        top :20px;
        color: @bg2
}
}
</style>