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
			<view class="audio-box" v-if="showAudioWave">
				<view class="sound-waves">
				  <view
				    v-for="(item, index) in radomheight"
				    :key="index"
				    :style="'height:' + item + 'rpx;margin-top:-' + item / 2 + 'rpx'"
				  ></view>
				  <view style="clear: both; width: 0; height: 0"></view>
				</view>
			</view>
			<!-- :class="showCamera == false ? 'btm' : 'btm1' " -->
			<view class="btm" :style="{bottom:btm + 'rpx'}">
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
				@tap.stop="toggleWithoutAction"
				@touchstart="startRecord"
				@touchmove="moveRecord"
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
			<view class="btmImg" v-if="showEmo">
				<swiper class="emoji_list" id="btmImg" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<block>
						<swiper-item>
							<view class="emoji_item">
								<image v-for="(item, index) in emojiObj.map1" :key="index" :src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
							<view class="emoji_item">
								<image v-for="(item, index) in emojiObj.map2" :key="index" :src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
							<view class="emoji_item">
								<image v-for="(item, index) in emojiObj.map3" :key="index" :src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
						</swiper-item>
					</block>
					<block class="second">
						<swiper-item>
							<view class="emoji_item">
								<image v-for="(item, index) in emojiObj.map4" :key="index" :src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
							<view class="emoji_item">
								<image v-for="(item, index) in emojiObj.map5" :key="index" :src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
							<view class="emoji_item last_item">
								<image v-for="(item, index) in emojiObj.map6" :key="index" :src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
	</view>
</template>
.
<script>
	import globalUrl from '@/global.js';
	let WebIM = require("../../imSDK/utils/WebIM")["default"];
	let msgType = require("../../imSDK/utils/msgtype");
	let recordTimeInterval = null;
	export default {
		data() {
			return {
				consulting:{},
				fromUser: '',
				toUser: '',
				showText:true,
				showCamera:false,
				showEmo:false,
				showAudioWave: false,
				history:[],
				arr:[],
				text:'',
				title:'',
				username:{},
				btm:0,
				
				emoji: WebIM.Emoji,
				emojiObj: WebIM.EmojiObj,
				interval: 5000,
				duration: 1000,
				autoplay: false,
				indicatorDots: true, // 显示面板指示点
				// 音频
				radomheight: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
				recorderManager: uni.getRecorderManager(),
				recordTime: 0,
			}
		},
		components:{
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
		destroyed() {
			clearInterval(recordTimeInterval)
			this.recordTime = 0
	    },
		methods: {
			toggleWithoutAction(e) {// 阻止 tap 冒泡
			},
			// 获取聊天室消息
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
			// 消息回调
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
			onEmo(){
				this.btm = 300
				console.log('点击表情')
				this.showCamera = false
				this.showEmo = true
			},
			onImg(){
				this.btm = 496
				this.showCamera = true
				this.showEmo = false
			},
			onSwitch(){
				this.btm = 0
				this.showText = false
				this.executeRecord()
				this.showCamera = false
				this.showEmo = false
				
			},
			onSwitch1(){
				this.btm = 0
				this.showText = true
				this.showCamera = false
				this.showEmo = false
				
			},
			// 发送文本信息
			sendPrivateText() {
			    let id = WebIM.conn.getUniqueId();                 // 生成本地消息id
			    let msg = new WebIM.message('txt', id);      // 创建文本消息
			    msg.set({
			        msg: this.text,                  // 消息内容
			        to:  this.toUser,                          // 接收消息对象（用户id）
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
			// 输出 emoji
			sendEmoji(event) {
			  var emoji = event.target.dataset.emoji;
			  
			  var str;
			  var msglen = this.text.length - 1;
			  
			  if (emoji && emoji != "[del]") {
			    str = this.text + emoji;
			  } else if (emoji == "[del]") {
			    let start = this.text.lastIndexOf("[");
			    let end = this.text.lastIndexOf("]");
			    let len = end - start;
			  
			    if (end != -1 && end == msglen && len >= 3 && len <= 4) {
			      str = this.text.slice(0, start);
			    } else {
			      str = this.text.slice(0, msglen);
			    }
			  }
			  this.text = str;
			  this.inputMessage = str;
			},
			// 发送图片
			onPhoto(){
				var me = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album"],
				
					success(res) {
						me.sendImage(res);
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
						me.sendImage(res);
					}
				});
			},
			sendImage(res) {
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
										url: dataObj.msg,
										size: {
											width: width,
											height: height
										},
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
			},
			// 发送音频
			startRecord(){
				var me = this;
				console.log('开始录音')
				clearInterval(recordTimeInterval);
				
				me.recordTime = 0
				me.showAudioWave = true
				me.myradom();
				let recorderManager = me.recorderManager || uni.getRecorderManager();
				recorderManager.onStart(() => {
				  recordTimeInterval = setInterval(()=>{
					// console.log("开始录音...");
				    me.recordTime++
				  },1000)
				  
				});
				recorderManager.start({
				  format: "mp3"
				}); // 超时
				
				setTimeout(function () {
				  me.endRecord();
				}, 100000);
			},
			moveRecord(){
			},
			endRecord(){
				console.log('录音结束')      
				let recorderManager = this.recorderManager; // 向上滑动状态停止：取消录音发放
				this.showAudioWave = false
				recorderManager.onStop(res => {
				// console.log("结束录音...", res, this.recordTime);
				clearInterval(recordTimeInterval);
				let duration = this.recordTime * 1000;
				if (duration <= 1000) {
					uni.showToast({
					  title: "录音时间太短",
					  icon: "none"
					});
				} else {
					// 上传
					this.sendAudio(res.tempFilePath, duration);
				}
				this.recordTime = 0;
				}); // 停止录音
				
				recorderManager.stop();
			},
			sendAudio(tempFilePath, dur) {
				var me = this;
				var token = WebIM.conn.context.accessToken;
				uni.uploadFile({
					url: globalUrl+'/im/upload_file',
					filePath: tempFilePath,
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
						var id = WebIM.conn.getUniqueId();
						var msg = new WebIM.message(msgType.AUDIO, id);
						var dataObj = res.data.data; // 接收消息对象

						msg.set({
							apiUrl: WebIM.config.apiURL,
							accessToken: token,
							body: {
							  type: msgType.AUDIO,
							  url: dataObj.msg,
							  filetype: "",
							  filename: tempFilePath,
							  accessToken: token,
							  length: Math.ceil(dur / 1000)
							},
							from: this.fromUser,
							to: this.toUser,
							roomType: false,
							chatType: 'singleChat',
							success: function (argument) {
							  disp.fire('em.chat.sendSuccess', id);
							}
						});

						msg.body.length = Math.ceil(dur / 1000); //console.log('发送的语音消息', msg.body)
						WebIM.conn.send(msg.body);
						
					},
					fail: (err) => {
						console.log('上传失败', err)
					},
					complete: (err) => {
						console.log('上传完成', err)
					}
				});
			},
			// 授权录音
			executeRecord() {
			  if (uni.getSetting) {
				  return 
			  }
			  var me = this;
			  uni.getSetting({
			    success: res => {
					let recordAuth = res.authSetting['scope.record'];
					if (recordAuth == true) {
						return
					} else if (recordAuth == false){
						//已申请过授权，但是用户拒绝
						uni.openSetting({
						  success: function (res) {
							let recordAuth = res.authSetting['scope.record'];
						
							if (recordAuth == true) {
							  uni.showToast({
								title: "授权成功",
								icon: "success"
							  });
							} else {
							  uni.showToast({
								title: "请授权录音",
								icon: "none"
							  });
							}
						
							me.isLongPress = false
						  }
						});
					} else {
						// 第一次进来，未发起授权
						uni.authorize({
						  scope: 'scope.record',
						  success: () => {
							//授权成功
							uni.showToast({
							  title: "授权成功",
							  icon: "success"
							});
						  }
						});
					}
			    },
			    fail: function () {
			      uni.showToast({
			        title: "鉴权失败，请重试",
			        icon: "none"
			      });
			    }
			  })
			},
			myradom() {
				const that = this;
				var _radomheight = that.radomheight;
				for (var i = 0; i < that.radomheight.length; i++) {
					//+1是为了避免为0
					_radomheight[i] = 100 * Math.random().toFixed(2) + 10;
				}
				this.radomheight = _radomheight
				this.$forceUpdate()
				
				if (that.showAudioWave) {
					setTimeout(function () {
						that.myradom();
					}, 500);
				}
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
	.audio-box{
		width: 480rpx;
		height: 440rpx;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 3px;
		box-shadow: 0 0 32rpx rgba(0, 0, 0, 0.15);
		position: fixed;
		bottom: 480rpx;
		left: 50%;
		margin-left: -240rpx;
		
		.sound-waves {
		  width: 100%;
		  box-sizing: border-box;
		  padding-left:10%;
		  margin-top: 80rpx;
		  height: 80rpx;
		  text-align: center;
		}
		 
		.sound-waves view {
		  transition: all 0.5s;
		  width: 1%;
		  margin-left: 1.5%;
		  margin-right: 1.5%;
		  height: 160rpx;
		  background-color: #aaa;
		  float: left;
		}

	}
	.btm{
		width: 100%;
		height: 98rpx;
		position: fixed;
		// bottom: 0;
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
	.btmImg{
		width: 100%;
		height: 300rpx;
		position: fixed;
		bottom: 0;
		.emoji_list image,
		.showEmoji image {
			width: 26px;
			height: 26px;
			margin: 5px 2%;
		}
		
		.emoji {
			width: 26px;
			height: 26px;
			margin: 0 0;
		}
		
		.emoji_item {
			display: flex;
			justify-content: space-around;
			margin-right: 20px;
		}
		.last_item{
			justify-content:flex-end !important
		}
		
	}
	
}

</style>
