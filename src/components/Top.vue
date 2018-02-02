<template>
  <div class="top">
    生态选择：
    <el-select v-model="value" filterable placeholder="请选择要进入的生态" @change="changeEcology">
        <el-option
          v-for="item in ecologys"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        >
        </el-option>
    </el-select>
    用户选择：
    <el-select v-model="loginUser" filterable placeholder="请选择登录用户" @change="changeUser">
        <el-option
          v-for="item in ecologyRobot"
          :key="item.id"
          :value="item.id"
          :label="item.username"
          >
          <div class="user_list">
            <p><img :src="item.avatar" alt=""></p>
            <span>{{ item.username }}</span>
          </div>
        </el-option>
      </el-select>
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      tabPosition:"top",
      value:'',
      ecologys:'',
      ecologyRobot:{},
      loginUser:''
    }
  },
  created(){
    this.$api.getEcology().then(res => {
      this.ecologys = res.data
    });
  },
  methods:{
    changeEcology(){
      /*获取机器人*/
      this.$api.getRobots({
        ecology_id:this.value
      }).then(res => {
        this.ecologyRobot = res.data;
        console.log(res.data)
      })
    },
    /*使用当前用户登录聊天室*/
    changeUser(value){
      this.$api.getGroups({
        uid:value
      }).then( res => {
        this.$store.commit('setGroups',res.data)
        console.log(res);
      })
      console.log(value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
  margin: 20px 0 0 20px;
}
.user_list{
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .user_list p{
    display: inline-block;
    font-size: 0;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
    margin-right: 10px;
  }
  .user_list img{
    width: 100%;
  }
  .user_list span{
    display: inline-block;
    vertical-align: middle;
  }
</style>