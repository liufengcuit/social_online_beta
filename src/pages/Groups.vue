<template>
	<div 
		class="groups"
		v-loading="groupsLoading"
	    element-loading-text="列表缓冲中"
	    element-loading-spinner="el-icon-loading"
	    element-loading-background="rgba(255, 255, 255, 0.8)"
	    style="width: 100%"
	>
		<div class="top-bar">
			<h2>{{ group.name }}<small>&lt;{{ group.group_id }}&gt;</small></h2>
			<p>群简介：{{ group.brief }}</p>
			<i class="close el-icon-close" title="关闭"></i>
			<span class="memberTotal">群人数：{{ memberTotal }}人</span>
		</div>
		<div class="group-content flex">
			<div class="message flex-1">
				<!-- 消息展示区 -->
				<div class="message-content">
					<div v-for="(msg,$index) in groupMessages" :key="$index">
						<other-message-type :messages="msg" v-if="msg.data.id != undefined && msg.data.id != loginId "></other-message-type>
						<self-message-type :messages="msg" v-else-if="msg.data.id != undefined && msg.data.id == loginId"></self-message-type>
						<special-message :chatlist="msg" v-else></special-message>
					</div>
				</div>
				<!-- 消息发送 -->
				<div class="message-send">
					<div class="message-type">
						<span>
							<emoji v-on:show="emojiMsg"></emoji>
							<i class="iconfont" @click="emoji()">&#xe621;</i>
						</span>
						<span><i class="iconfont" @click="bagShow()">&#xe7d5;</i></span>
						<span class="img_upload">
							<i class="iconfont">&#xe610;</i>
							<input type="file" class="file" @change="sendImageMsg()">
						</span>
					</div>
					<textarea id="textarea" v-model="textMessage" @keyup.13="sendTextMessage()"></textarea>
					<span @click="sendTextMessage()" class="send-message">发送</span>
				</div>
			</div>
			<!-- 群成员列表 -->
			<div class="group-member">
				<div class="group-member-title">
					<input type="text" placeholder="群成员列表" @keyup="fastSearch()" v-model="searchValue">
					<i class="el-icon-search"></i>
				</div>
				<div class="group-member-container">
					<div class="group-member-list" v-for="(list,$index) in fastLists" :key="list.id">
					<el-popover
							placement="right"
							width="400"
							@show="getUserInfo(list.id)"
							trigger="hover">
							<template>
								<div>
								  	<!-- 头像 -->
								  	<p class="_popover"><img :src="list.avatar" alt=""></p>
								  	<!-- 性别 -->
								  	<p>性别：<span v-if="list.gender == 0">女</span><span v-else-if="list.gender == 1">男</span></p>
								  	<p>姓名：{{ list.username }}</p>
								  	<p>年龄：{{ list.age }}</p>
								  	<p>ID：{{ list.id }}</p>
								  	<p>活跃时间： {{ list.last_active }}</p>
								  	<p>可提现金额：<i v-if="withdraw < 0" class="el-icon-loading"></i><span v-else>{{ withdraw }} </span>¥</p><br>
								  	<p><span class="getout" style="font-weight:bolder;color: blue" @click="deleteMember(list.id, list.username)">把TA踢出去</span></p>
								</div>
							</template>
							<div slot="reference">
								<div class="member-head-image"><img :src="list.avatar" alt=""></div>
								<p :class="{ master: list.id== master }">{{ list.username }}&lt;{{ list.id }}&gt;</p>
							</div>
						</el-popover>
					</div>
				</div>
			</div>
		</div>
		<!-- 红包组件 -->
		<red-bag v-if="bagStatus"></red-bag>
	</div>
</template>
<script>
	import OtherMessageType from '../components/OtherMessageType.vue'
	import SelfMessageType from '../components/SelfMessageType.vue'
	import redBag from '../components/Bag.vue'
	import sendMessage from '../rong/sendMessage.js'
	import Emoji from '../components/Emoji.vue'
	import SpecialMessage from '../components/SpecialMessage.vue'
	import autoBottom from '../utils/autoBottom.js'
	export default {
		name: "Groups",
		data() {
			return {
				groupLists:'',
				fastLists:'',
				withdraw:'',
				searchValue:'',
				master:'',
				textMessage:'',
				loginId:'',
				memberTotal:0
			}
		},
		created(){
			this.getMembers(this.$store.state.active_group.group_id);
			if(this.$store.state.login_user == ''){
				this.$router.push("/");
			}else{
				this.loginId = this.$store.state.login_user.id;
			}
		},
		computed:{
			group(){
				return this.$store.state.active_group;
			},
			bagStatus(){
				return this.$store.state.bagStatus;
			},
			groupMessages(){
				let result = this.$store.state.messages;
				for(let i=0,len=result.length; i<len; i++){
					if(result[i].targetId == this.$store.state.active_group.group_id){
						return result[i].data;
					}
				}
				return {};
			},
			groupsLoading(){
				return this.$store.state.groupsLoading
			}
		},
		methods:{
			sendImageMsg(){
				sendMessage.sendImageMsg();
			},
			sendTextMessage(){
				if(this.textMessage.trim() == ''){
					this.$message({
						message: '消息不能为空',
						type: 'warning'
					});
					this.textMessage = '';
					return false;
				}
				sendMessage.sendTextMsg(this.textMessage);
				this.textMessage = '';
			},
			/*获取用户信息*/
			getUserInfo(uid){
				this.withdraw = '';
				this.$api.getUserWithdraw({
					uid:uid
				}).then(result => {
					this.withdraw = result.data;
				})
			},
			/*踢出用户*/
			deleteMember(uid, username){
				this.$confirm('确定将  '+username+'  踢出聊吧？, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$api.kickUser({
						group_id:this.$store.state.active_group.group_id,
						uid:uid
					}).then(result => {
						/*更新列表*/
						this.getMembers(this.$store.state.active_group.group_id);
						this.$message({
							type: 'success',
							message: '踢出成功!'
						});
					})
				})
			},
			/*快速查询*/
			fastSearch(){
				let fastListsArr = []
				for(var i=0,len=this.groupLists.length; i<len; i++){
					if(this.groupLists[i].id.toString().indexOf(this.searchValue) != -1 || this.groupLists[i].username.indexOf(this.searchValue) != -1){
						fastListsArr.push(this.groupLists[i]);
					}
				}
				this.fastLists = fastListsArr;
			},
			/*获取群组列表成员*/
			getMembers(group_id){
				this.$store.commit("setGroupsLoading", true);
				this.$api.getGroupList({
					group_id:group_id
				}).then(result => {
					this.groupLists = result.data;
					this.fastLists = this.groupLists;
					//设置群主ID
					this.master = result.data[0].id;
					this.memberTotal = result.data.length;

					this.$store.commit("setGroupsLoading", false);
				}).catch(error => {
					console.log(error)
					this.$notify.error({
						title: '拉取成员失败',
						message: error.msg
					});
					this.$store.commit("setGroupsLoading", false);
				})
			},
			/*显示红包组件*/
			bagShow(){
				let status = this.$store.state.bagStatus;
				this.$store.commit("set_bag_status",!status);
			},
			/*表情发送*/
			emojiMsg:function(emojiVal){
				this.textMessage += emojiVal;
				this.$store.commit("setEmojiView",!this.$store.state.emojiView);
			},
			/*显示表情面板*/
			emoji:function(){
				this.$store.commit("setEmojiView",!this.$store.state.emojiView);
			}
		},
		components:{
		  	OtherMessageType,
		  	SelfMessageType,
		  	redBag,
		  	Emoji,
		  	SpecialMessage
		},
		watch:{
			group(newVal, oldVal){
				this.getMembers(newVal.group_id);
			}
		},
		mounted(){
			autoBottom.autoBottom(document.querySelector(".message-content"))
		}
	}
</script>
<style scoped type="text/css">
	.groups{
		border: 1px solid #34a1f0;
		box-sizing: border-box;
	}
	.top-bar{
		background: url(/static/images/74858PICWsx.JPG) no-repeat left -135px;
		background-size: cover;
		height: 49px;
		padding-top: 15px;
		padding-left: 20px;
		color: #fff;
		position: relative;
		border-bottom: 1px solid #f5f5f5;
	}
	.close{
		position: absolute;
		right: 10px;
		top: 15px;
		font-size: 20px;
	}
	.close:hover{
		cursor: pointer;
	}
	.message{
		height: 835px;
	}
	.message-content{
		height: 685px;
		padding-bottom: 20px;
		overflow: auto;
		background: -webkit-linear-gradient(#23abe2,#607d6e);
        background: -o-linear-gradient(#23abe2,#607d6e);
        background: -moz-linear-gradient(#23abe2,#607d6e);
        background: -mos-linear-gradient(#23abe2,#607d6e);
        background: linear-gradient(#23abe2,#607d6e);
	}

	.group-member{
		width: 200px;
		border-left: 1px solid #34a1f0
	}
	.group-member-title{
		padding: 10px;
		border-bottom: 1px solid #1593b3;
		overflow: hidden;
		box-sizing: border-box;
	}
	.group-member-title i{
		float: right;
		margin-top: -13px;
	}
	.group-member-container{
		height: 800px;
		overflow: auto;
		padding-bottom: 10px;
		box-sizing: border-box;
	}
	.group-member-list{
		position: relative;
		padding: 5px;
		box-sizing: border-box;
	}
	/*隐藏滚动条*/
	/*.group-member ::-webkit-scrollbar{width:0px}*/
	
		/*滚动条整体部分,必须要设置*/
    .group-meber ::-webkit-scrollbar{
        width: 10px;
        height: 10px;
        background-color: #333;
    }
    /*滚动条的轨道*/
    .group-meber ::-webkit-scrollbar-track{
        box-shadow: inset 0 0 5px rgba(0,0,0,.3);
        background-color: #f5f5f5;
    }
    /*滚动条的滑块按钮*/
    .group-meber ::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: #29a9de;
        box-shadow: inset 0 0 5px #17d3d5;
    }
    /*滚动条的上下两端的按钮*/
    .group-meber ::-webkit-scrollbar-button{
        height: 5px;
        background-color: #B0AEDA;
    }
	
	.member-head-image{
		position: absolute;
		left: 5px;
		top: 5px;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		overflow: hidden;
		display: inline-block;
		font-size: 0;
		vertical-align: middle;
	}
	.member-head-image img{
		width: 100%;
	}
	.group-member-list p{
		font-size: 14px;
		padding-left: 43px;
		vertical-align: middle;
		white-space: nowrap;
		overflow: hidden;
		padding-top: 10px;
	}

	.master{
		color: #ff0000;
	}
	.getout{
		cursor: pointer;
	}
	._popover img{
		max-width: 200px;
	}
	.message-type i{
		cursor: pointer;
	}
	.memberTotal{
		position: absolute;
		left: 900px;
		bottom: 10px;
		font-size: 14px;
	}
	/*滚动条整体部分,必须要设置*/
    ::-webkit-scrollbar{
        width: 10px;
        height: 10px;
        background-color: #333;
    }
    /*滚动条的轨道*/
    ::-webkit-scrollbar-track{
        box-shadow: inset 0 0 5px rgba(0,0,0,.3);
        background-color: #f5f5f5;
    }
    /*滚动条的滑块按钮*/
    ::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: #2db7f5;
        box-shadow: inset 0 0 5px #17d3d5;
    }
    /*滚动条的上下两端的按钮*/
    ::-webkit-scrollbar-button{
        height: 5px;
        background-color: #B0AEDA;
    }
</style>