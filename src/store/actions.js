export default {
	initVuex(context, payload){
		context.commit("setGroups", '')
		context.commit("setFriends", '')
		context.commit("set_active_group", '')
		context.commit("set_active_friend", '')
		context.commit("set_bag_status", false)
		context.commit("setCurrChatType", '')
		context.commit("set_msg_friends", [])
		context.commit("set_msg_group", [])
		context.commit("setBagStatusView", '')
		context.commit("setEmojiView", false)
		context.commit("setGroupsLoading", false)
	},
	updateGroupTips(context, payload){
		context.commit("setGroups",payload)
	},
	updateFriendTips(context, payload){
		context.commit("setFriends", payload)
	}
}