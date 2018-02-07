export default {
	/*设置登录用户*/
	setLoginUser(state, payload){
		state.login_user = payload;
	},
	/*设置聊天类型*/
	setCurrChatType(state, payload){
		state.curr_chat_type = payload;
	},
	/*保存当前生态下所有机器人*/
	setRobots(state, payload){
		state.robots = payload;
	},
	setGroups(state, payload){
		state.groups = payload;
	},
	setFriends(state, payload){
		state.friends = payload;
	},
	/*设置当前被点击的群*/
	set_active_group(state, payload){
		state.active_group = payload;
	},
	/*设置当前被点击的好友*/
	set_active_friend(state, payload){
		state.active_friend = payload;
	},
	/*设置红包状态*/
	set_bag_status(state, payload){
		state.bagStatus = payload;
	},
	/*设置好友消息存贮*/
	set_msg_friends(state, payload){
		state.msg_friends = payload;
	},
	/*设置群组消息存储*/
	set_msg_group(state, payload){
		state.set_msg_group = payload;
	},
	/*设置红包拆红包界面状态*/
	setBagStatusView(state, payload){
		state.bagStatusView = payload;
	},
	/*设置表情界面状态*/
	setEmojiView(state, payload){
		state.emojiView = payload;
	},
	/*保存聊天消息*/
	saveChatMessage(state, payload){
		state.messages = payload;
	}
}