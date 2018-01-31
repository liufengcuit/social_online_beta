export default {
	/*测试服：x18ywvqfxnioc           正式服：x4vkb1qpx25yk */ 
	login(token){
		RongIMLib.RongIMClient.init("x18ywvqfxnioc");
		// 设置连接监听状态 （ status 标识当前连接状态 ）
		// 连接状态监听器
		RongIMClient.setConnectionStatusListener({
			onChanged: function (status) {
				switch (status) {
					case RongIMLib.ConnectionStatus.CONNECTED:
						console.log('链接成功');
					break;
					case RongIMLib.ConnectionStatus.CONNECTING:
						console.log('正在链接');
					break;
					case RongIMLib.ConnectionStatus.DISCONNECTED:
						console.log('断开连接');
					break;
					case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
						console.log('其他设备登录');
					break;
					case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
						console.log('域名不正确');
					break;
					case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
						//自动重新连接服务器
						var callback = {
							onSuccess: function(userId) {
								console.log("Reconnect successfully." + userId);
							},
							onTokenIncorrect: function() {
								console.log('token无效');
							},
							onError:function(errorCode){
								console.log(errorcode);
							}
						};
						var config = {
							// 默认 false, true 启用自动重连，启用则为必选参数
							auto: true,
							// 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
							url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
							// 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
							rate: [100, 1000, 3000, 6000, 10000]
						};
						RongIMClient.reconnect(callback, config);
						console.log('网络不可用');
					break;
				}
			}
		});

		//连接服务器
		/*获取token，登录当前用户*/
		RongIMClient.connect(token, {
			onSuccess: function(userId) {
				console.log("Connect successfully." + userId);
			},
			onTokenIncorrect: function() {
				console.log('token无效');
			},
			onError:function(errorCode){
				var info = '';
				switch (errorCode) {
					case RongIMLib.ErrorCode.TIMEOUT:
						info = '超时';
					break;
					case RongIMLib.ErrorCode.UNKNOWN_ERROR:
						info = '未知错误';
					break;
					case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
						info = '不可接受的协议版本';
					break;
					case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
						info = 'appkey不正确';
					break;
					case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
						info = '服务器不可用';
					break;
				}
				console.log(errorCode);
			}
		});

		//注册红包消息，并定义消息类型和名称
		var messageName = "RedBagMessage"; // 消息名称。
		var objectName = "RCD:RedMsg"; // 消息内置名称，请按照此格式命名。
		var mesasgeTag = new RongIMLib.MessageTag(true,true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
		var propertys = ["rid","price","title","des","redLock","redType","uid","username","portrait"]; // 消息类中的属性名。
		RongIMClient.registerMessageType(messageName,objectName,mesasgeTag,propertys);

		//注册GIF消息，并定义消息类型和名称
		var messageNameGif = "GifMessage"; // 消息名称。
		var objectNameGif = "RCD:GifMsg"; // 消息内置名称，请按照此格式命名。
		var mesasgeTagGif = new RongIMLib.MessageTag(true,true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
		var propertysGif = ["message","content","id","name","portraitUri","url"]; // 消息类中的属性名。
		RongIMClient.registerMessageType(messageNameGif,objectNameGif,mesasgeTagGif,propertysGif);

		//注册红包提示消息
		var messageNameRedTips = "RedTips";
		var objectNameRedTips = "RCD:RedTips";
		var messageTagRedTips = new RongIMLib.MessageTag(true,true);
		var propertysRedTips = ["sendname","getname","type","rid","over","senduid","getuid"];
		RongIMClient.registerMessageType(messageNameRedTips,objectNameRedTips,messageTagRedTips,propertysRedTips);

		//注册好友申请提示消息"RCD:ContactNtf"
		var messageNameContactNtf = "ContactNtf";
		var objectNameContactNtf = "RCD:ContactNtf";
		var messageTagContactNtf = new RongIMLib.MessageTag(true,true);
		var propertysContactNtf = ["extra","message","operation","sourceUserId","targetUserId","user"];
		RongIMClient.registerMessageType(messageNameContactNtf,objectNameContactNtf,messageTagContactNtf,propertysContactNtf);
	}
}