<script>
////////////////////////////////////////////////////////////////////
// IM SDK
let WebIM = (wx.WebIM = require("./imSDK/utils/WebIM")["default"]);
let msgType = require("./imSDK/utils/msgtype");
let disp = require("./imSDK/utils/broadcast");

function ack(receiveMsg) {
  // 处理未读消息回执
  var bodyId = receiveMsg.id; // 需要发送已读回执的消息id

  var ackMsg = new WebIM.message("read", WebIM.conn.getUniqueId());
  ackMsg.set({
    id: bodyId,
    to: receiveMsg.from,
  });
  WebIM.conn.send(ackMsg.body);
}
function onMessageError(err) {
  if (err.type === "error") {
    uni.showToast({
      title: err.errorText,
    });
    return false;
  }

  return true;
}
function getCurrentRoute() {
  let pages = getCurrentPages();
  if (pages.length > 0) {
    let currentPage = pages[pages.length - 1];
    return currentPage.route;
  }
  return "/";
}
////////////////////////////////////////////////////////////////////

export default {
	globalData: {
		username: '领途羊',
		serviceProvider: 'baidu',
		Authorization: '',
		networkType: '4g',
		navbarHeight: 64, // px
		navigationBarHeight: 44,
		// IM
		conn: {
		  login: false,
		  closed: false,
		  curOpenOpt: {},
		
		  open(opt) {
		    this.curOpenOpt = opt;
		    WebIM.conn.open(opt);
		    this.closed = false;
		  },
		
		  reopen() {
		    if (this.closed) {
		      //this.open(this.curOpenOpt);
		      WebIM.conn.open(this.curOpenOpt);
		      this.closed = false;
		    }
		  },
		},
	},
	onLaunch: function(res) {
		console.log('App Launch',res);
		
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function (res) {
		  // 请求完新版本信息的回调
		  console.log('是否更新', res.hasUpdate);
		});
		
		updateManager.onUpdateReady(function (res) {
		  uni.showModal({
		    title: '更新提示',
		    content: '新版本已经准备好，是否重启应用？',
			confirmText: '重启',
		    success(res) {
		      if (res.confirm) {
		        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		        updateManager.applyUpdate();
		      }
		    }
		  });
		});
		
		updateManager.onUpdateFailed(function (res) {
			// 新的版本下载失败
			console.log('版本下载失败原因', res);
			uni.showToast({
				title: '新版本下载失败，请稍后再试',
				icon: 'none'
			});
		});
		
		// 获取小程序平台名称
		uni.getProvider({
			service: 'oauth',
			success: res => {
				if (res.errMsg == 'getProvider:ok') {
					this.globalData.serviceProvider = res.provider.length>0?res.provider[0]:'h5'
				} else {
					uni.showToast({
						title: '获取提供商失败',
						icon: 'none'
					})
				}
			}
		});
		// 获取token
		uni.getStorage({
		    key: 'Authorization',
		    success: res => {
				this.globalData.Authorization = res.data
		    }
		});		
		// 获取网络情况
		uni.getNetworkType({
			success: res => {
				if (res.networkType == "unknown"){
					return
				}
				this.globalData.networkType = res.networkType
			}
		})
		// 获取系统信息
		uni.getSystemInfo({
			success: res => {
				var height = 44
				if (res.navigationBarHeight && res.statusBarHeight){
					this.globalData.navigationBarHeight = res.navigationBarHeight
					height = res.navigationBarHeight+res.statusBarHeight
				}
				this.globalData.navbarHeight = height
			}
		});
		
		var that = this
		// IM初始化
		WebIM.conn.listen({
			onOpened: function () {
				that.globalData.conn.login = true
			},                  //连接成功回调 
			onClosed: function () {
				that.globalData.conn.closed = true;
				WebIM.conn.close();
			},                  //连接关闭回调
			onTextMessage: function ( message ) {},    //收到文本消息
			onEmojiMessage: function ( message ) {},   //收到表情消息
			onPictureMessage: function ( message ) {}, //收到图片消息
			onCmdMessage: function ( message ) {},     //收到命令消息
			onAudioMessage: function ( message ) {},   //收到音频消息
			onLocationMessage: function ( message ) {},//收到位置消息
			onFileMessage: function ( message ) {},    //收到文件消息
			onVideoMessage: function (message) {
			},   //收到视频消息
			onPresence: function ( message ) {},       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
			onRoster: function ( message ) {},         //处理好友申请
			onInviteMessage: function ( message ) {},  //处理群组邀请
			onOnline: function () {},                  //本机网络连接成功
			onOffline: function () {},                 //本机网络掉线
			onError: function ( error ) {
				console.log(error)
				if (error.type == WebIM.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
				  uni.hideLoading();
				  disp.fire("em.error.passwordErr"); 
				  // uni.showModal({
				  // 	title: "用户名或密码错误",
				  // 	confirmText: "OK",
				  // 	showCancel: false
				  // });
				}
				
				if (error.type == WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
				  uni.hideLoading();
				  disp.fire("em.error.tokenErr");
				}
				
				if (error.type == "socket_error") {
				  ///sendMsgError
				  console.log("socket_errorsocket_error", error);
				  uni.showToast({
				    title: "网络已断开",
				    icon: "none",
				    duration: 2000,
				  });
				  disp.fire("em.error.sendMsgErr", error);
				}
			},          //失败回调
			onBlacklistUpdate: function (list) {       //黑名单变动
				// 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
				console.log(list);
			},
			onRecallMessage: function(message){},      //收到撤回消息回调
			onReceivedMessage: function(message){},    //收到消息送达服务器回执
			onDeliveredMessage: function(message){},   //收到消息送达客户端回执
			onReadMessage: function(message){},        //收到消息已读回执
			onCreateGroup: function(message){},        //创建群组成功回执（需调用createGroupNew）
			onMutedMessage: function(message){},       //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
			onChannelMessage: function(message){}      //收到整个会话已读的回执，在对方发送channel ack时会在这个回调里收到消息
		});
	},
	onShow: function(data) {
		console.log('App Show',data);
	},
	onHide: function() {
		console.log('App Hide');
	},
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
uni-rich-text img{ max-width: 100% !important;}

// /deep/.rich-text-selectable{text-align: justify !important;}
.nav-bar {
	z-index: 9999;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 28rpx;
	flex-direction: column;
	background-color: #ffffff;
	// transition: background-color 2s;
}
.slotleft {
	display: flex;
	align-items: center;
}
.fanhui {
	width: 44rpx;
	height: 44rpx;
	margin-left: 36rpx;
}
.fhsy {
	width: 22px;
	height: 22px;
	/* #ifdef MP-BAIDU */
	margin-left: 94rpx;
	/* #endif */
	/* #ifdef H5 */
	margin-left: 20rpx;
	/* #endif */
}
</style>
