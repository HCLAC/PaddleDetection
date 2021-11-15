<template>
	<view>
		
	</view>
</template>

<script>
	let WebIM = require("../../imSDK/utils/WebIM")["default"];
	let msgType = require("../../imSDK/utils/msgtype");
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onLoad() {
			getApp().globalData.conn.open({
			  apiUrl: WebIM.config.apiURL,
			  user: '111',
			  pwd: '11111',
			  grant_type: 'password',
			  appKey: WebIM.config.appkey
			});
			setTimeout(() => {
				this.sendPrivateText()
			}, 800);
		},
		methods: {
			sendPrivateText() {
				console.log(WebIM.conn)
				return 
			    let id = WebIM.conn.getUniqueId();                 // 生成本地消息id
			    let msg = new WebIM.message('txt', id);      // 创建文本消息
			    msg.set({
			        msg: 'message content',                  // 消息内容
			        to: 'hclac',                          // 接收消息对象（用户id）
			        chatType: 'singleChat',                  // 设置为单聊
			        success: function (id, serverMsgId) {
			            console.log('send private text Success');  
			        }, 
			        fail: function(e){
			            // 失败原因:
			            // e.type === '603' 被禁言
			            // e.type === '605' 群组不存在
			            // e.type === '602' 不在群组或聊天室中
			            // e.type === '504' 撤回消息时超出撤回时间
			            // e.type === '505' 未开通消息撤回
			            // e.type === '506' 没有在群组或聊天室白名单
			            // e.type === '501' 消息包含敏感词
			            // e.type === '502' 被设置的自定义拦截捕获
			            // e.type === '503' 未知错误
			            console.log("Send private text error");  
			        }
			    });
			    WebIM.conn.send(msg.body);
			}
		}
	}
</script>

<style>

</style>
