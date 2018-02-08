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
				autoBottom.autoBottom(document.querySelector(".message-content"))
			}
		});
	}
}