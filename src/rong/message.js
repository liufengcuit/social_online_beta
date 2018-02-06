import hande_state from './handle-state.js'
import hand_new_msg from './new-message.js'
export default {
	receiveMessages(){
		RongIMClient.setOnReceiveMessageListener({
		      // 接收到的消息
			onReceived: function (message) {
				console.log(message);
				if(message.messageType=="TextMessage"){
					message.content.content = RongIMLib.RongIMEmoji.emojiToHTML(message.content.content)
					hande_state.checkGroupMsg(message);
				}else{
					hande_state.checkGroupMsg(message);
				}
				let obj = {}
				obj.targetId = message.targetId;
				obj.type = message.conversationType;
				// hand_new_msg.hand(obj);
			}
		});
	}
}