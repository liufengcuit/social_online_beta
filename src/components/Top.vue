<template>
  <div class="top">
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
    <input type="file" @change="sendImageMsg">
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      tabPosition:"top"
    }
  },
  created(){
    this.$api.getEcology().then(res => {
      console.log(res)
    });
  },
  methods:{
    sendImageMsg(){
    //获取图片
    var files = document.querySelector('input[type=file]').files[0];
      if(document.querySelector('input[type=file]').value == ""){
      alert("请上传图片");
      return false;
    }else{
      if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(document.querySelector('input[type=file]').value)){
        alert("图片类型必须是.gif,jpeg,jpg,png中的一种")
        return false;
      }
    }
    var base_img = new FileReader();
    base_img.readAsDataURL(files);
    base_img.onload=function(e){
      var fl = new FormData();
      // if(files.size>1024*100){
      //   alert('图片大小超过100KB');
      //   return false;
      // }
      fl.append('file',files);
      fl.append('module','group');
      this.$api.upload(fl).then(res => {
        console.log(res)
      })
    }.bind(this)
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>