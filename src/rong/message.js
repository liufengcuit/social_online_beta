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
					console.log('textMessage')
				}else{
					console.log("其它消息")
					hande_state.checkGroupMsg(message);
				}
				console.log('不进if条件')
				let obj = {}
				obj.targetId = message.targetId;
				obj.type = message.conversationType;
				// hand_new_msg.hand(obj);
			}
		});
	}
}

//格式化消息样式
// formatMessage(message){
// 	let obj = {};
// 	let Msg;
//     obj.post_time = message.sentTime.toString().substring(0,10);
//     obj.id = message.senderUserId;
// 	switch(message.messageType){
// 		case RongIMClient.MessageType.TextMessage:
// 			// message.content.content => 消息内容
// 			obj.head_img = message.content.user.portrait;
// 			obj.username = message.content.user.name;
// 			obj.content = message.content.content;
// 			obj.msg_type=RongIMClient.MessageType.TextMessage;
// 			if(message.conversationType == 1){
// 			Msg = store.state.msg_friends;
// 			}else{
// 			Msg = store.state.msg_group;
// 			}
// 			for(var i=0,len=Msg.length;i<len;i++){
// 			if(message.targetId==Msg[i].targetId){
// 			Msg[i].result.push(obj);
// 			}
// 			}
// 			if(message.conversationType == 1){
// 			store.commit("set_msg_friends",Msg);
// 			}else{
// 			store.commit("set_msg_group",Msg);
// 			}
// 		break;
// 		case RongIMClient.MessageType.VoiceMessage:
// 		return false;
// 		break;
// 		case RongIMClient.MessageType.ImageMessage:
// 		obj.head_img = message.content.user.portrait;
// 		obj.username = message.content.user.name;
// 		obj.content = message.content.imageUri;
// 		obj.msg_type=RongIMClient.MessageType.ImageMessage;

// 		if(message.conversationType == 1){
// 		Msg = store.state.msg_friends;
// 		}else{
// 		Msg = store.state.msg_group;
// 		}
// 		for(var i=0,len=Msg.length;i<len;i++){
// 		if(message.targetId==Msg[i].targetId){
// 		Msg[i].result.push(obj);
// 		}
// 		}
// 		if(message.conversationType == 1){
// 		store.commit("set_msg_friends",Msg);
// 		}else{
// 		store.commit("set_msg_group",Msg);
// 		}
// 		break;
// 		//红包消息  
// 		case RongIMClient.MessageType.RedBagMessage:
// 		obj.head_img = message.content.portrait;
// 		obj.username = message.content.username;
// 		obj.content = message.content;
// 		obj.msg_type=RongIMClient.MessageType.RedBagMessage;
// 		obj.uid = message.senderUserId;
// 		if(message.conversationType == 1){
// 		Msg = store.state.msg_friends;
// 		}else{
// 		Msg = store.state.msg_group;
// 		}
// 		for(var i=0,len=Msg.length;i<len;i++){
// 		if(message.targetId==Msg[i].targetId){
// 		Msg[i].result.push(obj);
// 		}
// 		}
// 		if(message.conversationType == 1){
// 		store.commit("set_msg_friends",Msg);
// 		}else{
// 		store.commit("set_msg_group",Msg);
// 		}
// 		break;
// 		//GIF图片消息
// 		case RongIMClient.MessageType.GifMessage:
// 		obj.head_img = message.content.portraitUri;
// 		obj.username = message.content.name;
// 		obj.content = message.content.url;

// 		obj.msg_type=RongIMClient.MessageType.GifMessage;
// 		if(message.conversationType == 1){
// 		Msg = store.state.msg_friends;
// 		}else{
// 		Msg = store.state.msg_group;
// 		}
// 		for(var i=0,len=Msg.length;i<len;i++){
// 		if(message.targetId==Msg[i].targetId){
// 		Msg[i].result.push(obj);
// 		}
// 		}
// 		if(message.conversationType == 1){
// 		store.commit("set_msg_friends",Msg);
// 		}else{
// 		store.commit("set_msg_group",Msg);
// 		}

// 		break;
// 		//红包提示消息ContactNtf
// 		case RongIMClient.MessageType.RedTips:
// 		obj.content = message.content;
// 		obj.msg_type=RongIMClient.MessageType.RedTips;
// 		if(message.conversationType == 1){
// 		Msg = store.state.msg_friends;
// 		}else{
// 		Msg = store.state.msg_group;
// 		}
// 		for(var i=0,len=Msg.length;i<len;i++){
// 		if(message.targetId==Msg[i].targetId){
// 		Msg[i].result.push(obj);
// 		}
// 		}
// 		if(message.conversationType == 1){
// 		store.commit("set_msg_friends",Msg);
// 		}else{
// 		store.commit("set_msg_group",Msg);
// 		}
// 		break;
// 		//好友申请提示消息ContactNtf
// 		case RongIMClient.MessageType.ContactNtf:
// 		//判断本地是否已经存了新消息条数
// 		var value = window.localStorage.getItem("newmsg");
// 		if(value=='' || value==undefined || value == null){
// 		value = 1;
// 		}else{
// 		value = JSON.parse(value) + 1
// 		}
// 		window.localStorage.setItem("newmsg",value);
// 		store.commit("set_apply_msg",value);
// 		break;
// 		default:
// 		// do something...
// 		console.log("其它消息")
// 		break;
// 		}
// }