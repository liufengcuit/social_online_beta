<template>
	<div class="other-message-type">
		<!-- 头像 -->
		<div class="head-img">
			
			<el-popover
				placement="right"
				width="200"
				trigger="hover"
				@show="getUserInfos(messages.id)"
				>
				<template>
				<div style="padding:10px">
				<p class="content_img"><img :src="messages.head_img"></p>
				<p><strong>姓名：</strong>{{ messages.username }}</p>
				<p><strong>ID：</strong>{{ messages.id }}</p>
				<p><strong>红包余额：</strong><i v-if="withdraw < 0" class="el-icon-loading"></i><span v-else v-text="withdraw"></span> ¥</p>
				</div>
				</template>
				<span class="img" slot="reference">
					<img :src="messages.head_img" alt="">
				</span>
			</el-popover>
			<span class="username">{{ messages.username }}</span>
			<span class="time">{{ messages.post_time | formatDate(messages.post_time) }}</span>
		</div>
		<!-- 普通文字显示方式 -->
		<div class="message-content" v-if="messages.msg_type == 'text'" v-html="messages.content"></div>
		<!-- 图片消息显示方式 -->
		<div class="message-image" v-else-if="messages.msg_type == 'image'">
			<img @click="previewImage()" :src="messages.content" alt="">
		</div>
		<!-- 红包消息显示方式 -->
		<div class="message-bag" v-else-if="messages.msg_type == 'redbag'">
			<bag-style :bags="messages"></bag-style>
		</div>
	</div>
</template>
<script>
	import bagStyle from './BagStyle.vue'
	import { formatDate } from '../utils/formatDate'
	export default {
		name: "OtherMessageType",
		data() {
			return {
				withdraw:0,
				result:{}
			}
		},
		methods:{
			previewImage(url){

			},
			getUserInfos(uid){
				/*获取红包余额*/
				this.$api.getUserWithdraw({
					uid:uid
				}).then(result => {
					this.withdraw = result.data;
				})
			}
		},
		props:['messages'],
		components:{
			bagStyle
		},
		filters:{
			formatDate(times){
				return formatDate(new Date(times * 1000), 'yyyy-MM-dd hh:mm')
			}
		}
	}
</script>
<style scoped>
	.other-message-type{
		padding-right: 50px;
		margin-top: 20px;
	}
	.img{
		display: inline-block;
		font-size: 0;
		width: 32px;
		height: 32px;
		overflow: hidden;
		border-radius: 50%;
		margin-left: 20px;
		vertical-align: middle;
	}
	.head-img img{
		width: 100%;
	}
	.username{
		margin: 0 10px;
		color: #17d3d5;
		font-size: 16px;
	}
	.message-content{
		display: inline-block;
		max-width: 100%;
		position: relative;
		margin-top: 10px;
		background: #3bb64d;
		margin-left: 30px;
		border-radius: 5px;
		padding: 10px;
		color: #fff;
		box-sizing: border-box;
		font-size: 14px;
	}
	.message-content:after{
		position: absolute;
		width: 0;
		height: 0;
		top: -10px;
		left: 15px;
		content: "";
		border-left: 5px solid transparent;
		border-right: 12px solid transparent;
		border-bottom: 12px solid #3bb64d;
	}
	.time{
		color: #fff;
	}
	.message-image{
		margin-top: 10px;
		margin-left: 30px;
		max-width: 300px;
		font-size: 0;
		display: inline-block;
		border-radius: 10px;
		overflow: hidden;
	}
	.message-image img{
		width: 100%;
	}
	.message-bag{
		margin-top: 10px;
		margin-left: 30px;
	}
	.content_img img{
		max-width: 160px;
		max-height: 160px;
	}
	
</style>