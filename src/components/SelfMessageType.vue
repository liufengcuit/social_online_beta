<template>
	<div class="self-message-type">
		<div class="head-img">
			<p>
				<span class="username">自己</span>
				<span class="time">2018.02.02</span>
				<span class="img">
					<img src="http://or0r5rpd3.bkt.clouddn.com/group/4dae89f9852c9b3d99603cd5374ca4514569d62d507069c046247addb69a9507.jpg" alt="">
				</span>
			</p>
		</div>
		<!-- 普通文字消息 -->
		<div class="message-content" v-if="messages.type == 'text'">
			这里是自己发送的消息这里是自己发送的消息这里是自己发送的消息
		</div>
		<!-- 图片消息显示方式 -->
		<div class="message-image" v-else-if="messages.type == 'image'">
			<img @click="previewImage()" src="http://or0r5rpd3.bkt.clouddn.com/group/4dae89f9852c9b3d99603cd5374ca4514569d62d507069c046247addb69a9507.jpg" alt="">
		</div>
		<!-- 红包消息显示方式 -->
		<div class="message-bag" v-else-if="messages.type == 'redbag'">
			<bag-style :bags="messages"></bag-style>
		</div>
	</div>
</template>
<script>
	import bagStyle from './BagStyle.vue'
	export default {
		name: "SelfMessageType",
		data() {
			return {}
		},
		methods:{
			previewImage(url){

			}
		},
		props:['messages'],
		components:{
			bagStyle
		}
	}
</script>
<style scoped>
	.self-message-type{
		margin-top: 20px;
		padding-left: 50px;
	}
	.self-message-type:after{
		content: "";
		display: block;
		clear: both;
		width: 0;
		height: 0;
	}
	.head-img{
		margin-right: 20px;
		overflow: hidden;
	}
	.head-img p{
		float: right;
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
		float: right;
		display: inline-block;
		margin-right: 30px;
		margin-top: 10px;
		position: relative;
		padding: 10px;
		background: #55bcff;
		color: #fff;
		font-size: 14px;
		border-radius: 5px;
	}
	.message-content:after{
		position: absolute;
		width: 0;
		height: 0;
		top: -10px;
		right: 15px;
		content: "";
		border-left: 12px solid transparent;
		border-right: 5px solid transparent;
		border-bottom: 12px solid #55bcff;
	}
	.time{
		color: #fff;
	}
	.message-image{
		margin-top: 10px;
		margin-right: 30px;
		float: right;
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
		margin-right: 30px;
		float: right;
	}
</style>