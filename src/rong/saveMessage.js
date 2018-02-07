import store from '../store/index'
/*
*
*保存消息
*
*/
export default {
	save(message){
		console.log(message)
		/*
		*判断有无消息
		*/
		let updateMessage = [];
		if(store.state.messages.length == 0){
			updateMessage.push(create(message))
			
		}else{
			let storeStatus = false;
			let MessageStore = store.state.messages;
			for(let i =0, len =MessageStore.length; i <len; i++){
				console.log(MessageStore[i].type)
				console.log(MessageStore[i].targetId)
				if(message.conversationType == MessageStore[i].type && message.targetId == MessageStore[i].targetId){
					MessageStore[i].data.push(sortMessage(message));
					storeStatus = true;
				}
			}
			if(!storeStatus){
				MessageStore.push(create(message))
			}
			updateMessage = MessageStore;

		}
		store.commit("saveChatMessage", updateMessage);
	}
}

function create(message){
	let messages = {};
	messages.type   = message.conversationType
	messages.targetId = message.targetId
	messages.data   = [];
	messages.data.push(sortMessage(message))
	console.log(messages);
	return messages;
}

function sortMessage(message){
	let content = {}
	switch(message.messageType){
		case RongIMClient.MessageType.TextMessage:
			content.type = 'text'
			content.data = {
					id:           message.content.user.id,
					portrait:     message.content.user.portrait,
					username:     message.content.user.name,
					time:         message.sentTime.toString().substring(0,10),
					content:      RongIMLib.RongIMEmoji.emojiToHTML(message.content.content)
			}
			break;
		case RongIMClient.MessageType.VoiceMessage:
			content.type = 'voice'
			console.log('VoiceMessage')
			return false;
			break;
		case RongIMClient.MessageType.ImageMessage:
			content.type = 'image'
			content.data = {
					id:           message.content.user.id,
					portrait:     message.content.user.portrait,
					username:     message.content.user.name,
					time:         message.sentTime.toString().substring(0,10),
					content:      message.content.imageUri
			}
			console.log("ImageMessage")
			break;
		//红包消息  
		case RongIMClient.MessageType.RedBagMessage:
			content.type = 'redbag'
			content.data = {
					id:           message.senderUserId,
					portrait:     message.content.portrait,
					username:     message.content.username,
					time:         message.sentTime.toString().substring(0,10),
					content:      message.content
			}
			console.log('RedBagMessage')
			break;
		//GIF图片消息
		case RongIMClient.MessageType.GifMessage:
			content.type = 'image'
			content.data = {
					id:           message.content.id,
					portrait:     message.content.message.portraitUri,
					username:     message.content.message.name,
					time:         message.sentTime.toString().substring(0,10),
					content:      message.content.message.url
			}
			console.log('GifMessage')
			break;
		//红包提示消息RedTips
		case RongIMClient.MessageType.RedTips:
			content.type = 'redtips'
			content.data = {
					content:          redTips(message.content)
			}
			console.log(content);
			console.log('RedTips')
			break;
		//好友申请提示消息ContactNtf
		case RongIMClient.MessageType.ContactNtf:
			console.log("ContactNtf")
			break;
		//群组通知消息
		case RongIMClient.MessageType.GroupNotificationMessage:
			content.type = 'groupnotice'
			content.data = {
					content:           message.content.data.operatorNickname + message.content.message + message.content.data.targetUserDisplayNames[0]
			}
			console.log("GroupNotificationMessage")
			break;
		/*提示条通知消息*/
		case RongIMClient.MessageType.InformationNotificationMessage:
			content.type = 'information'
			console.log(message);
			console.log("提示条消息")
			break;
		/**公众服务命令消息*/
		case RongIMClient.MessageType.PublicServiceCommandMessage:
			content.type = 'public'
			console.log(message);
			console.log("公众服务命令消息")
			break;
		default:
			// do something...
			console.log("其它消息")
			break;
	}
	return content;
}

function redTips(params){
	let result = '';
	let loginId = store.state.login_user.id

	if(params.senduid == params.getuid && loginId == params.senduid){
		result = `${params.getname}领取了你的红包`

	}else if(params.senduid == loginId && params.getuid == loginId){
		result = `你领取了自己的红包`

	}else if(params.getuid == loginId && loginId != params.senduid){
		result = `你领取了${params.sendname}的红包`

	}else if(params.getuid != params.senduid && params.getuid !=loginId){
		result = `${params.getname}领取了${params.sendname}的红包`

	}else{
		result = `${params.getname}领取了自己的红包`

	}
	if(params.over){
		result += `，<b>红包已被领完</b>`
	}
	return result;
}