import store from "../store/index"
export default {
	hand(data){

		/*获取群成员及好友*/
		let group = store.state.curr_robot_groups;
		let friend = store.state.curr_robot_friends;

		/*获取已经打开的群或者已经打开的好友对话框*/
		let groups = store.state.curr_chat_group?store.state.curr_chat_group:{};
		let friends = store.state.curr_chat_friends?store.state.curr_chat_friends:{};

		let arr = [];
		switch(data.type){
			case 1:
				for(var i =0,len=friend.length;i<len;i++){
					if(data.targetId != friends.id && data.targetId == friend[i].id){
						friend[i].msg = false;
					}else{
						friend[i].msg = true;
					}
					arr.push(friend[i]);
				}
				store.commit("set_curr_robot_friends",arr);
			break;
			case 3:
				for(var i =0,len=group.length;i<len;i++){
					if(data.targetId != groups.id && data.targetId == group[i].group_id){
						group[i].msg = false;
					}else{
						group[i].msg = true;
					}
					arr.push(group[i]);
				}
				store.commit("set_curr_robot_groups",arr);
			break;
			default:
			break;
		}
	}
}