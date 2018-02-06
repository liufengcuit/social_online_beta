import store from '../store/index';
export default {
	//接收消息时，查看vuex是否已经存在了message_id
	checkGroupMsg(message){
		let obj = {};
		obj.msg_type = message.conversationType;
		obj.targetId = message.targetId;
		if(message.conversationType!='ContactNtf'){
			this.isExist(obj);
		}
		this.packageMessage(message);
	},
	/*判断当前要存入的targetId是否存在*/
	isExist(_obj){
		let obj = {};
		let Msg,data;
		let tmp = [];
		switch(_obj.msg_type){
			case 1:
				Msg = store.state.msg_friends;
				if(Msg.length==0){
					obj.targetId = _obj.targetId;
					obj.result = [];
					Msg.push(obj);
					store.commit("set_msg_friends",Msg);
				}else{
					for(var i=0,len=Msg.length;i<len;i++){
						tmp.push(Msg[i].targetId);
					}
					if(tmp.indexOf(_obj.targetId) == -1){
						obj.targetId = _obj.targetId;
						obj.result = [];
						Msg.push(obj);
						store.commit("set_msg_friends",Msg);
					}
				}
			break;
			case 3:
				Msg = store.state.msg_group;
				if(Msg.length==0){
					obj.targetId = _obj.targetId;
					obj.result = [];
					Msg.push(obj);
					store.commit("set_msg_group",Msg);
				}else{
					for(var i=0,len=Msg.length;i<len;i++){
						tmp.push(Msg[i].targetId);
					}
					if(tmp.indexOf(_obj.targetId) == -1){
						obj.targetId = _obj.targetId;
						obj.result = [];
						Msg.push(obj);
						store.commit("set_msg_group",Msg);
					}
				}
			break;
			default:
				console.log("其它");
			break;
		}
	},
	//组装消息
	packageMessage(message){
		let obj = {};
		let Msg;
        obj.post_time = message.sentTime.toString().substring(0,10);
        obj.id = message.senderUserId;
		switch(message.messageType){
			case RongIMClient.MessageType.TextMessage:
			  // message.content.content => 消息内容
			  obj.head_img = message.content.user.portrait;
	    	  obj.username = message.content.user.name;
			  obj.content = message.content.content;
			  obj.msg_type= 'text';
			  if(message.conversationType == 1){
			  	Msg = store.state.msg_friends;
			  }else{
			  	Msg = store.state.msg_group;
			  }
			  for(var i=0,len=Msg.length;i<len;i++){
			  	if(message.targetId==Msg[i].targetId){
			  		Msg[i].result.push(obj);
			  	}
			  }
			  if(message.conversationType == 1){
			  	store.commit("set_msg_friends",Msg);
			  }else{
			  	store.commit("set_msg_group",Msg);
			  }
			  break;
			case RongIMClient.MessageType.VoiceMessage:
				return false;
			  break;
			case RongIMClient.MessageType.ImageMessage:
			  obj.head_img = message.content.user.portrait;
	    	  obj.username = message.content.user.name;
			  obj.content = message.content.imageUri;
			  obj.msg_type= 'image';

			  if(message.conversationType == 1){
			  	Msg = store.state.msg_friends;
			  }else{
			  	Msg = store.state.msg_group;
			  }
			  for(var i=0,len=Msg.length;i<len;i++){
			  	if(message.targetId==Msg[i].targetId){
			  		Msg[i].result.push(obj);
			  	}
			  }
			  if(message.conversationType == 1){
			  	store.commit("set_msg_friends",Msg);
			  }else{
			  	store.commit("set_msg_group",Msg);
			  }
			 break;
			 //红包消息  
			case RongIMClient.MessageType.RedBagMessage:
				obj.head_img = message.content.portrait;
	    		obj.username = message.content.username;
	    		obj.content = message.content;
	    		obj.msg_type= 'redbag';
	    		obj.uid = message.senderUserId;
			  if(message.conversationType == 1){
			  	Msg = store.state.msg_friends;
			  }else{
			  	Msg = store.state.msg_group;
			  }
			  for(var i=0,len=Msg.length;i<len;i++){
			  	if(message.targetId==Msg[i].targetId){
			  		Msg[i].result.push(obj);
			  	}
			  }
			  if(message.conversationType == 1){
			  	store.commit("set_msg_friends",Msg);
			  }else{
			  	store.commit("set_msg_group",Msg);
			  }
				break;
			//GIF图片消息
			case RongIMClient.MessageType.GifMessage:
				obj.head_img = message.content.portraitUri;
	    		obj.username = message.content.name;
				obj.content = message.content.url;

				obj.msg_type='image';
				if(message.conversationType == 1){
					Msg = store.state.msg_friends;
				}else{
				  	Msg = store.state.msg_group;
				}
				for(var i=0,len=Msg.length;i<len;i++){
				  	if(message.targetId==Msg[i].targetId){
				  		Msg[i].result.push(obj);
				  	}
				}
				if(message.conversationType == 1){
				  	store.commit("set_msg_friends",Msg);
				}else{
					store.commit("set_msg_group",Msg);
				}

				break;
			//红包提示消息RedTips
			case RongIMClient.MessageType.RedTips:
				obj.content = message.content;
				obj.type= {
					special: 'redtips'
				};
				if(message.conversationType == 1){
					Msg = store.state.msg_friends;
				}else{
				  	Msg = store.state.msg_group;
				}
				for(var i=0,len=Msg.length;i<len;i++){
				  	if(message.targetId==Msg[i].targetId){
				  		Msg[i].result.push(obj);
				  	}
				}
				if(message.conversationType == 1){
				  	store.commit("set_msg_friends",Msg);
				}else{
					store.commit("set_msg_group",Msg);
				}
				break;
			//好友申请提示消息ContactNtf
			case RongIMClient.MessageType.ContactNtf:
				//判断本地是否已经存了新消息条数
				var value = window.localStorage.getItem("newmsg");
				if(value=='' || value==undefined || value == null){
					value = 1;
				}else{
					value = JSON.parse(value) + 1
				}
				window.localStorage.setItem("newmsg",value);
				store.commit("set_apply_msg",value);
				break;
			//退群消息
			case RongIMClient.MessageType.GrpNtf:
				console.log(message);
				obj.content = message.content.data.operatorNickname + message.content.data.message + message.content.data.targetUserDisplayNames[0];
				obj.type= {
					special: 'out'
				};
				if(message.conversationType == 1){
					Msg = store.state.msg_friends;
				}else{
				  	Msg = store.state.msg_group;
				}
				for(var i=0,len=Msg.length;i<len;i++){
				  	if(message.targetId==Msg[i].targetId){
				  		Msg[i].result.push(obj);
				  	}
				}
				if(message.conversationType == 1){
				  	store.commit("set_msg_friends",Msg);
				}else{
					store.commit("set_msg_group",Msg);
				}
				break;
			/*提示条通知消息*/
			case RongIMClient.MessageType.InfoNtf:
				console.log(message);
			break;
			default:
			  // do something...
			  console.log("其它消息")
			  break;
			}
	}
}