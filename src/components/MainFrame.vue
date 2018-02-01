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
						>
						<template>
						<div style="padding:10px">
						<p class="content_img"><img src="http://or0r5rpd3.bkt.clouddn.com/group/4dae89f9852c9b3d99603cd5374ca4514569d62d507069c046247addb69a9507.jpg"></p>
						<p><strong>姓名：</strong>godlike</p>
						<p><strong>ID：</strong>132</p>
						<p><strong>会员类型：</strong><span>非会员</span></p>
						<p><strong>性别：</strong><span>男</span></p>
						<p><strong>红包余额：</strong>12 ¥</p>
						</div>
						</template>
						<img slot="reference" src="http://or0r5rpd3.bkt.clouddn.com/group/4dae89f9852c9b3d99603cd5374ca4514569d62d507069c046247addb69a9507.jpg" alt="" class="curr_user_img"></el-button>
					</el-popover>
				</div>
				<p class="person-username">名字名字名字名字名字名字名字</p>
				<span class="level">会员等级：黄金VIP</span>
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
				<div class="tab-bottom">
					<span>消息</span>
					<span>联系人</span>
				</div>
			</div>
		</div>
		<div class="panel">
			<router-view />
		</div>
	</div>
</template>
<script>
	export default {
		name: "MainFrame",
		data() {
			return {
				nums:0,
				openApplyMsg:false,
				openlists:false
			}
		},
		methods:{
			searchFriend(){

			}
		}
	}
</script>
<style scoped>
	.main-frame{
		margin: 20px 0 0 20px;
		position: relative;
	}
	.menu-list{
		float: left;
		height: 850px;
		width: 220px;
		box-sizing: border-box;
		border: 1px solid #dcdfe6
	}
	.person{
		height: 100px;
		border-bottom: 1px solid #ccc;
		position: relative;
		background: url(http://or0r5rpd3.bkt.clouddn.com/group/210bb4c0ee9379af82f304bba2722a40acac4e01a47f55838a9d68b12eb88110.jpg) no-repeat left top;
		background-size: 100% 100%;
		color: #fff;
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
		height: 800px;
		border-bottom: 1px solid #dcdfe6
	}
	.tab-bottom{
		border-top: 1px solid #dcdfe6;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.tab-bottom span{
		float: left;
		width: 50%;
		text-align: center;
		line-height: 32px;
		font-size: 16px;
	}
	.panel{
		position: absolute;
		left: 225px;
		top: 0;
		width: 1100px;
	}
</style>