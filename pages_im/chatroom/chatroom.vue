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
					<view :class="item.from != consulting.account_username ?'ls-box':'ls-box1'">
						<image v-if="item.from != consulting.account_username" class="avatar" src="@/static/images/logo.png" mode="aspectFill"></image>
						<view class="chatmsg">
							{{item.msg}}
						</view>
						<image v-if="item.from == consulting.account_username" class="avatar" src="@/static/images/logo.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="" v-for="(item,index) in arr" :key="index">
					<view :class="item.from != consulting.account_username?'ls-box':'ls-box1'">
						<image v-if="item.from != consulting.account_username" class="avatar" src="@/static/images/logo.png" mode="aspectFill"></image>
						<view class="chatmsg">
							{{item.data ? item.data : item.msg}}
						</view>
						<image v-if="item.from == consulting.account_username" class="avatar" src="@/static/images/logo.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="tc">
				<chatSuitAudio
				  ref="chatSuitAudio"
				  :username="username"
				  chatType="singleChat"
				  @newAudioMsg="saveSendMsg"
				></chatSuitAudio>
			</view>
			<view :class="showCamera == false ? 'btm' : 'btm1' ">
				<view class="voice" v-if="showText" @click="onSwitch">
					<image  src="@/static/images/voice.png" mode=""></image>
				</view>
				<view class="voice" v-else @click="onSwitch1">
					<image  src="@/static/images/text.png" mode=""></image>
				</view>
				<u-input v-if="showText" confirm-type="send" class="text" @confirm="sendPrivateText" v-model="text" type="text" :border="true" />
				<view 
				v-else
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
			<view  class="imgBox"  v-if="showCamera">
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
	import globalUrl from '@/global.js';
	let WebIM = require("../../imSDK/utils/WebIM")["default"];
	let msgType = require("../../imSDK/utils/msgtype");
	export default {
		data() {
			return {
				consulting:{},
				fromUser: '',
				toUser: '',
				showText:true,
				showCamera:false,
				history:[],
				arr:[],
				text:'',
				title:'',
				username:{},
				recorderManager: uni.getRecorderManager(),
			}
		},
		components:{
			chatSuitAudio
		},
		onLoad() {
			this.postconsulting()
		},
		onShow(){
			getApp().globalData.conn.onMessage = this.onMessage;
		},
		onUnload() {
			getApp().globalData.conn.onMessage = null;
		},
		methods: {
			onPhoto(){
				var me = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album"],
				
					success(res) {
						me.upLoadImage(res);
					}
				});
				
			},
			onCamera(){
				var me = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["camera"],
				
					success(res) {
						me.upLoadImage(res);
					}
				});
			},
			onEmo(){
				console.log('点击表情')
				this.showCamera = false
			},
			onImg(){
				this.showCamera = true
			},
			startRecord(){
				console.log('开始录音')
				this.$refs.chatSuitAudio.toggleRecordModal();
			},
			endRecord(){
				console.log('录音结束')
			},
			onSwitch(){
				this.showText = false
				this.showCamera = false
			},
			onSwitch1(){
				this.showText = true
				this.showCamera = false
				
			},
			postconsulting(){
				this.HTTP.request({
					url: '/bulter/consulting',
					method:'POST',
					data: {
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.consulting = res.data.data
						this.fromUser = 'test3'//this.consulting.account_username
						this.toUser = 'wuwuwuuw'//this.consulting.username
						this.history = this.consulting.history
						this.title = '管家' + this.consulting.name + '在线中'
						this.username = {
							your: this.consulting.username,
							myName: this.consulting.account_username
						}
						getApp().globalData.conn.open({
						  apiUrl: WebIM.config.apiURL,
						  user: this.fromUser,
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
				switch(type){
					case 'text':
					this.arr.push(message)
					break
				}
				
				// this.$forceUpdate()
			},
			
			//发送文本信息
			sendPrivateText() {
			    let id = WebIM.conn.getUniqueId();                 // 生成本地消息id
			    let msg = new WebIM.message('txt', id);      // 创建文本消息
			    msg.set({
			        msg: this.text,                  // 消息内容
			        to:  this.consulting.username,                          // 接收消息对象（用户id）
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
			},
			upLoadImage(res) {
				var me = this;
				var tempFilePaths = res.tempFilePaths;
				var token = WebIM.conn.context.accessToken;
				uni.getImageInfo({
					src: res.tempFilePaths[0],
					success(res) {
						var allowType = {
							jpg: true,
							jpeg: true,
							gif: true,
							png: true,
							bmp: true
						};
						var str = WebIM.config.appkey.split("#");
						var width = res.width;
						var height = res.height;
						var index = res.path.lastIndexOf(".");
						var filetype = ~index && res.path.slice(index + 1) || "";
						if (!res.type) {
							uni.showToast({
								title: "H5端，uni-app暂未支持",
			          			icon: "none"
							})
						}
						if (filetype.toLowerCase() in allowType || res.type in allowType) {
							uni.uploadFile({
								url: globalUrl+'/im/upload_file',
								filePath: tempFilePaths[0],
								name: "send_file",
								header: {
									'Authorization': getApp().globalData.Authorization,
									'content-type': 'multipart/form-data'
								},
								success: (res)=>{
									if (res.statusCode != 200 || res.data.code != 0){
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										});
										return
									}
									var dataObj = res.data.data;
									var id = WebIM.conn.getUniqueId(); // 生成本地消息 id
									var msg = new WebIM.message(msgType.IMAGE, id);
									var file = {
										url: dataObj.msg
									};
									msg.set({
										apiUrl: WebIM.config.apiURL,
										body: file,
										from: me.fromUser,
										to: me.toUser,
										roomType: false,
										chatType: 'singleChat',
										success: function(argument) {
											disp.fire('em.chat.sendSuccess', id);
										}
									});
			
									WebIM.conn.send(msg.body);
								},
								fail: (err) => {
									console.log('上传失败', err)
								},
								complete: (err) => {
									console.log('上传完成', err)
								}
							});
						}
					}
				});
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
