import http from './http.js'

export default {
	/*
	* @author: LiuFeng
	* 后台客服聊天系统
	*/
	/*获取生态信息*/
	async getEcology(){
		return http.getQuick("/marsmob.php?r=rong/get-ecology")
	},
	/*获取当前生态下的机器人*/
	async getRobots(params){
		return http.get("/marsmob.php?r=rong/get-robots", params);
	},
	/*获取当前机器人加入的圈子*/
	async getGroups(params){
		return http.get("/marsmob.php?r=rong/get-groups", params);
	},
	/*获取当前圈子下的好友*/
	async getGroupList(params){
		return http.get("/marsmob.php?r=rong/group-list", params);
	},
	/*获取当前生态下的直属圈子*/
	async getDirectGroup(params){
		return http.get("/marsmob.php?r=rong/direct-group", params);
	},
	/*加入直属聊吧*/
	async joinGroup(params){
		return http.get("/marsmob.php?r=rong/join-group", params);
	},
	/*踢出聊吧*/
	async kickUser(params){
		return http.get("/marsmob.php?r=rong/kick-user", params);
	},
	/*获取某个人的可提现金额*/
	async getUserWithdraw(params){
		return http.get("/marsmob.php?r=rong/get-user-withdraw", params)
	},


	/*
	*
	* @author: LiuFeng
	* 用户圈子
	*
	*/
	/*获取圈子成员列表*/
	async groupUserList(params){
		return http.post("/v1/group/group-user-list", params)
	},



	/*
	*
	* @author: LiuFeng
	* 我的
	*/
	/*获取个人资料*/
	async selfInfo(params){
		return http.post("/v1/user/self-info", params)
	},
	/*我的好友*/
	async myFriends(params){
		return http.post("/v1/user/my-friends", params)
	},

	/*
	*
	* @author: LiuFeng
	* 红包接口
	*/

	/*发红包接口*/
	async create(params){
		return http.post("/v1/packet/create", params)
	},
	/*红包支付*/
	async payfor(params){
		return http.post("/v1/pay/index", params)
	},
	/*抢红包*/
	async snatch(params){
		return http.post("/v1/packet/snatch", params)
	},
	/*红包详情记录*/
	async bagLog(params){
		return http.post("/v1/packet/log", params)
	},
	/*开红包*/
	async bagOpen(params){
		return http.post("/v1/packet/open", params)
	},


	/*
	*
	* @author LiuFeng
	* 小喇叭
	*
	*/

	/*获取小喇叭列表*/
	async trumpet(params){
		return http.post("/v1/trumpet/", params)
	},
	/*同意加群*/
	async passGroup(params){
		return http.post("/v1/trumpet/pass-group", params)
	},
	/*拒绝加群*/
	async rejectGroup(params){
		return http.get("/v1/trumpet/reject-group", params)
	},
	/*同意好友申请*/
	async passFriend(params){
		return http.post("/v1/trumpet/pass-friend", params)
	},
	/*拒绝好友申请*/
	async rejectFriend(params){
		return http.post("/v1/trumpet/reject-friend", params)
	},
	/*批量同意好友请求*/
	async batchPass(params){
		return http.get("/v1/trumpet/batch-pass", params)
	},
	/*批量拒绝好友请求*/
	async batchReject(params){
		return http.get("/v1/trumpet/batch-reject", params)
	},


	/*
	*
	* @author: LiuFeng
	* 图片上传
	*/
	async upload(params){
		return http.postBody("/v1/upload/image", params)
	}
}