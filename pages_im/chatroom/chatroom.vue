<template>
	<view class="box">
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" :title="title">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
			<!-- <view class="listbox">
				<view class="left" v-for="(item,index) in leftList" :key="index">
					{{item.data}}
				</view>
				<view class="right" v-for="(item,index) in rightList" :key="index">
					{{item.value}}
				</view>
			</view> -->
			<view class="chatbox">
				<!-- 历史记录 -->
				<view class="boxMax" v-for="(item,index) in history" :key="index">
					<view :class="item.from === 1?'ls-box':'ls-box1'">
						<image v-if="item.from === 1" class="avatar" src="@/static/images/logo.png" mode="aspectFill"></image>
						<view class="chatmsg">
							{{item.msg}}
						</view>
						<image v-if="item.from === 0" class="avatar" src="@/static/images/logo.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="" v-for="(item,index) in arr" :key="index">
					<view :class="item.from === '1'?'ls-box':'ls-box1'">
						<image v-if="item.from == '1'" class="avatar" src="@/static/images/logo.png" mode="aspectFill"></image>
						<view class="chatmsg">
							{{item.data ? item.data : item.msg}}
						</view>
						<image v-if="item.from == ''" class="avatar" src="@/static/images/logo.png" mode="aspectFill"></image>
					</view>
				</view>
				<!-- <view class="content">
					<view class="item" v-for="(item, index) in arr" :key="item.id" :class="{me: item.from != '1'}">
						<view class="box">
							<image v-if="item.from === 1" class="avatar" src="@/static/images/logo.png" mode="aspectFill"></image>
							<view class="chatmsg">
								<view class="chat">
									{{item.data ? item.data : item.msg}}
								</view>
							</view>
							<image v-if="item.from === 0" class="avatar" src="@/static/images/logo.png" mode="aspectFill"></image>
						</view>
					</view>
				</view> -->
			</view>
			<view class="btm">
				<!-- <button @tap="startRecord">开始录音</button>
				<button @tap="endRecord">停止录音</button>
				<button @tap="playVoice">播放录音</button> -->
				<u-input class="text" v-model="text" type="text" border="true" />
				<button type="default" @click="sendPrivateText">111</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	
	innerAudioContext.autoplay = true;
	
	
	let WebIM = require("../../imSDK/utils/WebIM")["default"];
	let msgType = require("../../imSDK/utils/msgtype");
	export default {
		data() {
			return {
				history:[],
				arr:[],
				text:'',
				userInfo: {},
				leftList:[],
				rightList:[],
				title:'',
				consulting:{},
				
				voicePath: '',
				sound:'',
			}
		},
		onLoad() {
			this.postconsulting()
			getApp().globalData.conn.onSingleChat = this.onmsg;
			setTimeout(() => {
				this.sendPrivateText()
			}, 800);
			
			let self = this;
			recorderManager.onStop( (res)=> {
				console.log('recorder stop' + JSON.stringify(res));
				self.voicePath = res.tempFilePath;
				this.uploadRecord(self.voicePath)
				
			});
		},
		onShow(){
			this.postconsulting()
		},
		methods: {
			startRecord() {
				console.log('开始录音');
	
				recorderManager.start();
			},
			endRecord() {
				console.log('录音结束');
				recorderManager.stop();
			},
			playVoice() {
				console.log('播放录音');
	
				if (this.sound) {
					innerAudioContext.src = this.sound;
					innerAudioContext.play();
				}
			},
			uploadRecord(tempFilePath) {
				// tempFilePath为RecorderManager对象返回的录音文件临时地址
				console.log(tempFilePath,'11')
				const uploadTask = uni.uploadFile({
				url: 'http://10.0.2.51.:8199/v2/im/send_msg',
				filePath: tempFilePath, //录音结束后返回的临时路径
				name: 'send_file', // 文件对应的 key值对象名称
				header: {
					'Authorization': getApp().globalData.Authorization,
					'content-type': 'multipart/form-data',
					// 'token': uni.getStorageSync('token')
				},
				success: (res) => {
				console.log('-----上传成功-----'+JSON.stringify(res.data))
				this.sound = JSON.stringify(res.data.data.msg)
				console.log(this.sound,'this.sound')
				// json字符串转对象，JSON.parse( res.data )
				console.log('文件ID:'+ JSON.parse(res.data).data.id)
				// 添加、更新字词录音文件方法
				this.updateWordVoice(JSON.parse(res.data).data.id)
				},
				fail: (res) => {
				console.log('-----上传失败-----'+JSON.stringify(res))
				}
				})
			},
			postconsulting(){
				this.HTTP.request({
					url: '/bulter/consulting',
					method:'POST',
					data: {
					},
					success: res => {
						this.consulting = res.data.data
						// this.contentList = res.data.data.list
						console.log(this.consulting,'管家详情')
						this.history = res.data.data.history
						this.title = '管家' + res.data.data.name + '在线中'
						console.log(this.title,'title')
						getApp().globalData.conn.open({
						  apiUrl: WebIM.config.apiURL,
						  user: this.consulting.account_username,
						  pwd: '123456',
						  grant_type: 'password',
						  appKey: WebIM.config.appkey
						});
					}
				});
			},
			onmsg(message){
				// this.leftList = message
				this.arr.push(message)
				console.log(this.arr,'数据')
				// console.log(this.$refs.info,'ref')
				this.$forceUpdate()
			},
			
			//发送文本信息
			sendPrivateText() {
			    let id = WebIM.conn.getUniqueId();                 // 生成本地消息id
			    let msg = new WebIM.message('txt', id);      // 创建文本消息
			    msg.set({
			        msg: this.text,                  // 消息内容
			        to: this.consulting.username,                          // 接收消息对象（用户id）
			        chatType: 'singleChat',                  // 设置为单聊
			        success:  (id, serverMsgId)=> {
			            console.log('send private text Success');  
						console.log(msg,'msg')
						this.arr.push(msg.body)
						console.log(this.arr,'233333')
						this.HTTP.request({
							url: '/im/save_msg',
							method:'POST',
							data: {
								type:msg.type,
								msg:msg.value,
								bulter_id:this.consulting.bulter_id
							},
							success: res => {
								console.log('成功')
							}
						});
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

<style lang="scss">
.box{
	position: relative;
	.chatbox {
		// display: flex;
		// min-height: 800rpx;
		background: #F1F2F3;
		.ls-box1{
			display: flex;
			align-items: center;
			justify-content:flex-end;
			padding: 15rpx 0;
			.avatar{
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				margin: 0 28rpx;
			}
			.chatmsg{
				background: #0091FF;
				border-radius: 24rpx 0rpx 24rpx 24rpx;
				padding: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.ls-box{
			display: flex;
			align-items: center;
			margin: 30rpx 0;
			.avatar{
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				margin: 0 28rpx;
			}
			.chatmsg{
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 0rpx 24rpx 24rpx 24rpx;
				padding: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		// .content {
		// 	width: 100%;
		// 	height: 100%;
		// 	background: #F1F2F3;
		// 	display: flex;
		// 	flex-direction: column;
		// 	.item{
		// 		.box {
		// 			display: flex;
		// 			align-items: center;
		// 			margin: 10rpx 0;
		// 			.avatar{
		// 				width: 100rpx;
		// 				height: 100rpx;
		// 				border-radius: 50%;
		// 				margin: 0 20rpx;
		// 			}
		// 			.chatmsg {
		// 				// max-width: 50%;
		// 				.chat {
		// 					padding: 10rpx;
		// 					background: #fff;
		// 					white-space: pre-wrap;
		// 					word-wrap: break-word;
		// 					word-break: break-all;
		// 				}
		// 			}
		// 		}
		// 	} 
		// 	.me {
		// 		margin-left: auto;
		// 		flex: 1;
		// 	}
		// }
	}
	.btm{
		width: 100%;
		height: 98rpx;
		position: fixed;
		bottom: 0;
		display: flex;
		button{
			width: 200rpx;
			height: 100rpx;
		}
		.text{
			width: 474rpx;
			height: 72rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
		}
	}
}

</style>
