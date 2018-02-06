<template>
	<div class="private">
		<div class="top-bar">
			<h2>好友昵称</h2>
			<p>个人签名：当流星划过天空</p>
			<i class="close el-icon-close" title="关闭"></i>
		</div>
		<div class="group-content">
			<div class="message">
				<!-- 消息展示区 -->
				<div class="message-content">
					<other-message-type :messages="{'type':'redbag'}"></other-message-type>
					<self-message-type :messages="{'type':'text'}"></self-message-type>
					<other-message-type :messages="{'type':'text'}"></other-message-type>
					<self-message-type :messages="{'type':'text'}"></self-message-type>
					<other-message-type :messages="{'type':'image'}"></other-message-type>
					<self-message-type :messages="{'type':'redbag'}"></self-message-type>
					<other-message-type :messages="{'type':'text'}"></other-message-type>
					<self-message-type :messages="{'type':'image'}"></self-message-type>
					<other-message-type :messages="{'type':'text'}"></other-message-type>
					<other-message-type :messages="{'type':'text'}"></other-message-type>
				</div>
				<!-- 消息发送 -->
				<div class="message-send">
					<div class="message-type">
						<span><i class="iconfont">&#xe621;</i></span>
						<span><i class="iconfont">&#xe7d5;</i></span>
						<span class="img_upload">
							<i class="iconfont">&#xe610;</i>
							<input type="file" class="file" @change="sendImageMsg()">
						</span>
					</div>
					<textarea id="textarea"></textarea>
					<span @click="sendMessage()" class="send-message">发送</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import OtherMessageType from '../components/OtherMessageType.vue'
	import SelfMessageType from '../components/SelfMessageType.vue'
	export default {
		name: "Private",
		data() {
			return {}
		},
		components:{
		  	OtherMessageType,
		  	SelfMessageType
		}
	}
</script>
<style scoped>
	.private{
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
</style>