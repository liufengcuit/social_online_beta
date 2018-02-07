import hande_state from './handle-state.js'
import hand_new_msg from './new-message.js'
import autoBottom from '../utils/autoBottom.js'
import save from './saveMessage.js'
export default {
	receiveMessages(){
		RongIMClient.setOnReceiveMessageListener({
		      // 接收到的消息
			onReceived: function (message) {
				save.save(message);
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
				autoBottom.autoBottom(document.querySelector(".message-content"))
			}
		});
	}
}