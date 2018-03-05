<template>
	<div class="private">
		<div class="top-bar">
			<h2>{{ activeFriend.username }}</h2>
			<p>个人签名：{{ activeFriend.motto }}</p>
			<i class="close el-icon-close" title="关闭"></i>
		</div>
		<div class="group-content">
			<div class="message">
				<!-- 消息展示区 -->
				<div class="message-content">
					<div v-for="(msg,$index) in friendMessage" :key="$index">
						<other-message-type :messages="msg" v-if="msg.data.id != undefined && msg.data.id != loginUser.id "></other-message-type>
						<self-message-type :messages="msg" v-else></self-message-type>
					</div>
				</div>
				<!-- 消息发送 -->
				<div class="message-send">
					<div class="message-type">
						<span>
							<emoji v-on:show="emojiMsg"></emoji>
							<i class="iconfont" @click="emoji()">&#xe621;</i>
						</span>
						<span class="img_upload">
							<i class="iconfont" @click="upload()">&#xe610;</i>
							<input type="file" @change="sendImageMsg()" id="input">
						</span>
					</div>
					<textarea id="textarea" v-model="textMessage" @keyup.13="sendTextMessage()"></textarea>
					<span @click="sendTextMessage()" class="send-message">发送</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import OtherMessageType from '../components/OtherMessageType.vue'
	import SelfMessageType from '../components/SelfMessageType.vue'
	import sendMessage from '../rong/sendMessage.js'
	import Emoji from '../components/Emoji.vue'
	import { mapState } from 'vuex'
	import autoBottom from '../utils/autoBottom.js'
	export default {
		name: "Private",
		data() {
			return {
				textMessage:''
			}
		},
		created(){
			if(this.$store.state.login_user == ''){
				this.$router.push("/");
			}
		},
		computed:{
			...mapState({
				activeFriend: state => state.active_friend,
				loginUser: state => state.login_user
			}),
			friendMessage(){
				let result = this.$store.state.messages;
				for(let i=0,len=result.length; i<len; i++){
					if(result[i].targetId == this.activeFriend.id){
						return result[i].data;
					}
				}
				return {};
			}
		},
		methods:{
			upload(){
				document.querySelector("#input").click();
			},
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
		  	Emoji
		},
		mounted(){
			autoBottom.autoBottom(document.querySelector(".message-content"))
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