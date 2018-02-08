<template>
	<div class="main-frame">
		<!-- 左侧导航栏 -->
		<div class="menu-list">
			<div class="person">
				<div class="person-head-image">
					<el-popover
						placement="right"
						width="200"
						trigger="hover"
						@show="getUserInfo(loginUser.id)"
						>
						<template>
						<div style="padding:10px">
						<p class="content_img"><img :src="loginUser.avatar"></p>
						<p><strong>姓名：</strong>{{ loginUser.username }}</p>
						<p><strong>ID：</strong>{{ loginUser.id }}</p>
						<p><strong>会员类型：</strong><span>{{ loginUser.vip_level | vipName(loginUser.vip_level) }}</span></p>
						<p><strong>性别：</strong><span v-if="loginUser.gender==0">女</span><span v-else>男</span></p>
						<p><strong>红包余额：</strong><i v-if="withdraw < 0" class="el-icon-loading"></i><span v-else v-text="withdraw"></span> ¥</p>
						</div>
						</template>
						<img slot="reference" :src="loginUser.avatar" alt="" class="curr_user_img">
					</el-popover>
				</div>
				<p class="person-username">{{ loginUser.username }}</p>
				<span class="level">会员等级：{{ loginUser.vip_level | vipName(loginUser.vip_level) }}</span>
				<p class="tools flex">
					<span class="flex-1">
						新消息：
						<el-badge :value="nums" class="items" >
							<i class="el-icon-bell" @click="openApplyMsg=true"></i>
						</el-badge>
					</span>
					<span class="flex-1">
						查找：
						<el-badge class="items" >
							<i class="el-icon-search" @click="searchFriend(); openlists=true"></i>
						</el-badge>
					</span>
				</p>
			</div>
			<div class="tabs">
				<!-- 底部菜单选择 -->
				<div class="tab-bottom flex">
					<span class="flex-1" @click="changeTab('1')" :class="{'select-tab': tabIndex==1}">群</span>
					<span class="flex-1" @click="changeTab('2')" :class="{'select-tab': tabIndex==2}">好友</span>
				</div>
			</div>
			<!-- 列表 -->
			<div class="tab-lists">
				<div class="tab-list tab-2" v-show="tabIndex ==1">
					<contacts-lists></contacts-lists>
				</div>
				<div class="tab-list tab-3" v-show="tabIndex ==2">
					<friends-list :contacts="friends"></friends-list>
				</div>
			</div>
		</div>
		<div class="panel">
			<router-view />
		</div>
	</div>
</template>
<script>
	import sessionLists from "./SessionLists.vue"
	import ContactsLists from "./ContactsLists.vue"
	import FriendsList from "./FriendsList.vue"

	let vip_level = [
		{ key:0, value:'非会员' },
		{ key:1, value:'黄金VIP' },
		{ key:2, value:'铂金VIP' }
	]

	export default {
		name: "MainFrame",
		data() {
			return {
				nums:0,
				openApplyMsg:false,
				openlists:false,
				tabIndex:1,
				withdraw:''
			}
		},
		computed:{
			friends(){
				let result = this.$store.state.friends;
				if(result != ''){
					return result;
				}
			},
			loginUser(){
				return this.$store.state.login_user;
			}
		},
		methods:{
			searchFriend(){

			},
			changeTab(index){
				this.tabIndex = index;
			},
			getUserInfo(uid){
				this.withdraw = '';
				this.$api.getUserWithdraw({
					uid:uid
				}).then(result => {
					this.withdraw = result.data;
				})
			}
		},
		components:{
			sessionLists,
			ContactsLists,
			FriendsList
		},
		filters:{
			vipName(vipLevel){
				for(var i in vip_level){
					if(vip_level[i].key == vipLevel){
						return vip_level[i].value
					}
				};
				return vipLevel;
			}
		}
	}
</script>
<style scoped>
	.main-frame{
		margin: 20px 0 0 20px;
		position: relative;
		overflow: hidden;
	}
	.menu-list{
		float: left;
		height: 900px;
		width: 220px;
		box-sizing: border-box;
		border: 1px solid #dcdfe6;
		overflow: hidden;
	}
	.person{
		height: 100px;
		border-bottom: 1px solid #ccc;
		position: relative;
		background: url(/static/images/74858PICWsx.JPG) no-repeat left top;
		background-size: 100% 100%;
		color: #fff;
		box-sizing: border-box;
	}
	.person-head-image{
		position: absolute;
		left: 5px;
		top: 5px;
		width: 60px;
		height: 60px;
		overflow: hidden;
		border-radius: 50%;
	}
	.person-head-image img{
		width: 100%;
	}
	.content_img img{
		max-width: 150px;
	}
	.person-username{
		padding-left: 70px;
		position: absolute;
		width: 100%;
		box-sizing: border-box;
		top: 15px;
		font-size: 16px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.level{
		position: absolute;
		left: 70px;
		top: 40px;
	}
	.tools{
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 5px;
		color: #000;
	}
	.tools span{
		padding-left: 10px;
	}
	.el-icon-bell,.el-icon-search{
		font-size: 16px;
	}
	.tabs{
		position: relative;
		border-bottom: 1px solid #dcdfe6;
		height: 42px;
		line-height: 42px;
		text-align: center;
		font-size: 14px;
		box-sizing: border-box;
	}
	.tab-bottom{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	.tab-bottom span:hover{
		cursor: default;
	}
	.select-tab{
		color: #409EFF;
	}
	.tab-lists{
		height: 758px;
		/*background: orange;*/
		overflow: auto;
	}
	::-webkit-scrollbar{width:0px}


	.panel{
		position: absolute;
		left: 225px;
		top: 0;
		width: 1100px;
	}
</style>