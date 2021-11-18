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
			<view class="tc">
				<chatSuitAudio
				  ref="chatSuitAudio"
				  :username="username"
				  chatType="singleChat"
				  @newAudioMsg="saveSendMsg"
				></chatSuitAudio>
			</view>
			<view :class="boxShow == false ? 'btm' : 'btm1' ">
				<!-- <button @tap="startRecord">开始录音</button>
				<button @tap="endRecord">停止录音</button>
				<button @tap="playVoice">播放录音</button> -->
				<view class="voice" v-if="show" @click="onSwitch">
					<image  src="@/static/images/voice.png" mode=""></image>
				</view>
				<view class="voice" v-if="!show" @click="onSwitch1">
					<image  src="@/static/images/text.png" mode=""></image>
				</view>
				<u-input v-if="show" class="text" @confirm="sendPrivateText" v-model="text" type="text" :border="true" />
				<view 
				v-if="!show"
				class="btn"  
				@touchstart="startRecord"
				@touchend="endRecord">
					按住说话
				</view>
				<view class="voice1" @click.stop="onEmo">
					<image src="@/static/images/Emoji.png" mode=""></image>
				</view>
				<view class="voice" @click.stop="onImg">
					<image src="@/static/images/ad.png" mode=""></image>
				</view>
			</view>
			<view  class="imgBox"  v-if="boxShow">
				<view class="minBox" @click="onPhoto">
					<image src="@/static/images/im_tp.png" mode=""></image>
				</view>
				<view class="minBox" @click="onCamera">
					<image src="@/static/images/im_zp.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>
.
<script>
	import chatSuitAudio from './audio/audio.vue';
	let WebIM = require("../../imSDK/utils/WebIM")["default"];
	let msgType = require("../../imSDK/utils/msgtype");
	export default {
		data() {
			return {
				show:true,
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
				// radomheight: InitHeight,
				username:{},
				boxShow:false,
			}
		},
		components:{
			chatSuitAudio
		},
		onLoad() {
			this.postconsulting()
			let self = this;
			recorderManager.onStop( (res)=> {
				console.log('recorder stop' + JSON.stringify(res));
				self.voicePath = res.tempFilePath;
				// this.uploadRecord(self.voicePath)
				this.audio(self.voicePath)
				
			});
		},
		onShow(){
			getApp().globalData.conn.onMessage = this.onMessage;
		},
		onUnload() {
			getApp().globalData.conn.onMessage = null;
		},
		methods: {
			// qqq(){
			// 	boxShow = true
			// },
			onPhoto(){
				console.log('点击照片')
			},
			onCamera(){
				console.log('点击相机')
			},
			onEmo(){
				console.log('点击表情')
				this.boxShow = false
			},
			onImg(){
				this.boxShow = true
			},
			startRecord(){
				console.log('开始录音')
				this.$refs.chatSuitAudio.toggleRecordModal();
			},
			endRecord(){
				console.log('录音结束')
			},
			onSwitch(){
				this.show = false
				this.boxShow = false
			},
			onSwitch1(){
				this.show = true
				this.boxShow = false
				
			},
			// uploadRecord(tempFilePath) {
			// 	// tempFilePath为RecorderManager对象返回的录音文件临时地址
			// 	console.log(tempFilePath,'11')
			// 	const uploadTask = uni.uploadFile({
			// 	url: 'http://10.0.2.51.:8199/v2/im/send_msg',
			// 	filePath: tempFilePath, //录音结束后返回的临时路径
			// 	name: 'send_file', // 文件对应的 key值对象名称
			// 	header: {
			// 		'Authorization': getApp().globalData.Authorization,
			// 		'content-type': 'multipart/form-data',
			// 		// 'token': uni.getStorageSync('token')
			// 	},
			// 	success: (res) => {
			// 	console.log('-----上传成功-----'+JSON.stringify(res.data))
			// 	this.sound = JSON.stringify(res.data.data.msg)
			// 	console.log(this.sound,'this.sound')
			// 	// json字符串转对象，JSON.parse( res.data )
			// 	console.log('文件ID:'+ JSON.parse(res.data).data.id)
			// 	// 添加、更新字词录音文件方法
			// 	this.updateWordVoice(JSON.parse(res.data).data.id)
			// 	},
			// 	fail: (res) => {
			// 	console.log('-----上传失败-----'+JSON.stringify(res))
			// 	}
			// 	})
			// },
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
						this.username = {
							your:res.data.data.name,
							myName:'test1'
						}
						console.log(this.title,'title')
						getApp().globalData.conn.open({
						  apiUrl: WebIM.config.apiURL,
						  user: 'test1',//this.consulting.account_username,
						  pwd: '123456',
						  grant_type: 'password',
						  appKey: WebIM.config.appkey
						});
					}
				});
			},
			onMessage(type, message){
				console.log(type, 'type')
				console.log(message, 'message')
				// this.arr.push(message)
				// this.$forceUpdate()
			},
			
			//发送文本信息
			sendPrivateText() {
			    let id = WebIM.conn.getUniqueId();                 // 生成本地消息id
			    let msg = new WebIM.message('txt', id);      // 创建文本消息
			    msg.set({
			        msg: this.text,                  // 消息内容
			        to:  'test2',                          // 接收消息对象（用户id）
			        chatType: 'singleChat',                  // 设置为单聊
			        success:  (id, serverMsgId)=> {
			            console.log('send private text Success', msg);  
						this.arr.push(msg.body)
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
			            console.log("Send private text error", e);  
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
	}
	.btm{
		width: 100%;
		height: 98rpx;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		background: #F1F2F3;
		.voice{
			width: 48rpx;
			height: 48rpx;
			margin-left: 28rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.voice1{
			width: 48rpx;
			height: 48rpx;
			margin-left: 24rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.text{
			width: 474rpx;
			height: 72rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			// margin: 0 24rpx;
			margin-left: 24rpx;
		}
		.btn{
			margin-left: 24rpx;
			
			width: 474rpx;
			height: 72rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.btm1{
		width: 100%;
		height: 98rpx;
		position: fixed;
		bottom: 496rpx;
		display: flex;
		align-items: center;
		background: #F1F2F3;
		.voice{
			width: 48rpx;
			height: 48rpx;
			margin-left: 28rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.voice1{
			width: 48rpx;
			height: 48rpx;
			margin-left: 24rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.text{
			width: 474rpx;
			height: 72rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			// margin: 0 24rpx;
			margin-left: 24rpx;
		}
		.btn{
			margin-left: 24rpx;
			
			width: 474rpx;
			height: 72rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.imgBox{
		width: 750rpx;
		height: 496rpx;
		background: #F6F6F6;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 160rpx;
		position: fixed;
		bottom: 0;
		.minBox{
			width: 116rpx;
			height: 116rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
}

</style>
