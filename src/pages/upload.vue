<template>
<div class='warpper'>
    <div class="outer">
        <h3>+</h3>
         <img :src="img" alt="">
        <input type="file"  @change="upload($event)">
    </div>
</div>
</template>
<script>
import * as qiniu from 'qiniu-js'
export default {
data(){
return{
    img:""
}
},
methods:{
    upload(e){
        console.log(e.target.files);
        var file=e.target.files[0];
        if(file.size>2*1024*1024){
            alert("taida")
            return ;
        }
        //取后缀名
        var extname=file.name.slice(file.name.lastIndexOf("."));
        if(extname!='.jpg'&&extname!=".png"){
            alert("geshicuowu")
            return;
        }
        //七牛云上面的文件名 12325343.jpg
        var name=new Date().getTime()+extname;
        //获取token
        this.axios({
            url:"/api/getToken",
        }).then(res=>{
            var token=res.data.token;
            var url=res.data.url+"/"
            //上传
            qiniu.upload(file,name,token).subscribe(d=>{
                console.log("===========upload qiniuyun===============");
                console.log(d);
                if(d.total.percent==100){
                    this.img=url+name;
                    ajax({

                    })
                }
                
            })
        })
    }
},
watch:{},
computed:{},
components: {},
mounted(){
},
}
</script>
<style  lang='less' rel='stylesheet/less' scoped>
@import '../less/index.less';
.outer{
    width: 150px;
    height: 150px;
    border: 1px solid #cccccc;
    position: relative;
    h3,img{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        text-align: center;
        line-height: 150px;
    }
    input{
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        left: 0px;
        top: 0px;
    }
}
</style>