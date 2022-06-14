<template>
	<view class="box">
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" :title="title">
				<view slot="left" class="slotleft">
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
			<view class="top">
				<text>说明问题</text>
				<view class="con">
					<image src="@/static/images/smwt.png" mode=""></image>
				</view>
				<text >接入管家</text>
				<view  class="con">
					<image src="@/static/images/smwt.png" mode=""></image>
				</view>
				<text style="color:#A86B13;">获取解答</text>
			</view>
			<!-- <view class="title">
				<view class="left">
					咨询中…
				</view>
				<view class="right">
					详细描述问题，方便管家更好答复
				</view>
			</view> -->
			
			<view @click="onDow" class="chatbox">
				<!-- <view class="boxTop">
					欢迎使用领途羊旅游管家，继续咨询即表示您已同意
					<text @click="agreement">《用户协议及隐私政策》</text>
				</view> -->
				<view class="c_card">
					<view class="c_card_top">
						<view class="c_card_top_text">
							{{professionObj[consulting.level]}}
						</view>
					</view>
					<view class="c_card_center">
						<view class="c_card_center_left">
							<view class="left_img">
								<image :src="consulting.bulter_avatar  ? consulting.bulter_avatar : '/static/images/logo.png'" mode=""></image>
							</view>
							<view class="left_btm">
								<view class="btm_dian"></view>
								<view class="btm_text">咨询中</view>
							</view>
						</view>
						<view class="c_card_center_right">
							<view class="right_one">
								<view class="one_1">
									{{consulting.name}}
								</view>
								<view class="one_2">
									{{professionObj1[consulting.profession]}}
								</view>
							</view>
							<view class="right_two">
								{{consulting.company}}
							</view>
							<view class="right_three">
								<view class="three_1">
									<text>已服务：</text>
									<text style="color: #A86B13;font-weight: 500;">{{consulting.number_of_people}}</text>
								</view>
								<view class="three_2">
									<text>评分：</text>
									<text style="color: #A86B13;font-weight: 500;">5分</text>
								</view>
							</view>
						</view>
					</view>
					<view class="c_card_btm">
						<view class="btm_left">
							<view class="left_img">
								<image src="@/static/images/yx.png" mode=""></image>
							</view>
							<view class="left_txt">
								严选保障 · 隐私保护 · 专业旅游管家
							</view>
						</view>
						<view class="btm_right" @click="details">
							<view class="right_txt">
								查看更多
							</view>
							<view class="con">
								<image src="@/static/images/smwt.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="time">
					{{history[0].create_at}}
				</view>
				<!-- 历史记录 -->
				<scroll-view :scroll-top="commentScrollTop" :scroll-y="true" id="commentContainer" class="scroll-Y" @scrolltoupper="upper"
				@scrolltolower="lower" @scroll="scroll">
					<view class="" id="commentContent">
						<view class="boxMax" v-for="(item,index) in history" :key="index">
							<view :class="item.from != consulting.account_username ?'ls-box':'ls-box1'">
								<image v-if="item.from != consulting.account_username" class="avatar"
									:src="item.avatar?item.avatar: '/static/images/logo.png'" mode="aspectFill"></image>
								<view class="chatmsg" v-if="item.type == 'txt'">
									{{item.msg}}
								</view>
								<view class="chatImg" v-if="item.type == 'img'" @click="previewImg(item)">
									<image :src="item.msg" mode="aspectFill"></image>
								</view>
								<view class="chatAudio" v-if="item.type == 'audio'">
									<audio-msg :msg="item"></audio-msg>
								</view>
								<image v-if="item.from == consulting.account_username" class="avatar"
									:src="item.avatar?item.avatar: '/static/images/logo.png'" mode="aspectFill"></image>
							</view>
						</view>
						<!-- 信息记录 -->
						<view class="" v-for="(item,index) in arr" :key="index">

							<!-- item.from != '' -->
							<view
								:class="item.from == '' || item.from == consulting.account_username || item.type == 'audio'?'ls-box1':'ls-box'">
								<image
									v-if="item.contentsType == 'TEXT' || item.contentsType == 'IMAGE'|| item.contentsType == 'VOICE' || item.contentsType == 'CUSTOM'"
									class="avatar" :src="ext.bulter_avatar ? ext.bulter_avatar : '/static/images/logo.png'"
									mode="aspectFill"></image>
								<view class="chatmsg" v-if="item.contentsType == 'TEXT' || item.type == 'txt'"
									@longtap="longtap">
									{{item.data ? item.data : item.msg}}
								</view>
								<!-- <view class="card" v-if="item.contentsType == 'CUSTOM'" @click="details">
									<view class="left">
										<image :src="card.avatar" mode=""></image>
									</view>
									<view class="right">
										<view class="r-top">
											{{card.name}}
										</view>
										<view class="r-center">
											执业{{card.working_years}}年/{{card.company}}
										</view>
										<view class="r-btm">
											{{ professionObj[card.profession] }}
										</view>
									</view>
								</view> -->
								<view class="chatImg" v-if="item.contentsType == 'IMAGE' || item.type == 'img'">
									<image :src="item.body.url? item.body.url : item.url" mode="aspectFill"
										@click="previewImg1(item)"></image>
								</view>
								<view class="chatAudio" v-if="item.contentsType == 'VOICE' || item.type == 'audio'">
									<audio-msg :msg="item"></audio-msg>
								</view>
								<image v-if="item.type == 'txt' || item.type == 'img'|| item.type == 'audio'" class="avatar"
									:src="ext.account_avatar ? ext.account_avatar : '/static/images/logo.png'"
									mode="aspectFill"></image>
							</view>
						</view>
						<view class="end" v-if="showEnd">
							咨询已结束！
						</view>
					</view>
				</scroll-view>
			</view>
			
			
			
			<view class="audio-box" v-if="showAudioWave">
				<view class="sound-waves">
					<view v-for="(item, index) in radomheight" :key="index"
						:style="'height:' + item + 'rpx;margin-top:-' + item / 2 + 'rpx'"></view>
					<view style="clear: both; width: 0; height: 0"></view>
				</view>
			</view>
			<!-- v-if="consulting.status != 2" -->
			<view class="btm" :style="{bottom:btm + 'rpx','padding-bottom': keywordHeight}">
				<!-- <view class="voice" v-if="showText" @click="onSwitch">
					<image src="@/static/images/voice.png" mode=""></image>
				</view>
				<view class="voice" v-else @click="onSwitch1">
					<image src="@/static/images/text.png" mode=""></image>
				</view> -->
				<!-- <u-input v-if="showText" confirm-type="send" class="text" @confirm="sendPrivateText" v-model="text"
					type="text" :border="true" /> -->
				<input :focus="inputFocus" :adjust-position="false"  :disabled="show_input"  v-model="text" class="btm_input" placeholder-style='color:#C9CAD1;' type="text" placeholder='请输入......' />
				<view class="btm_btn" @click="sendPrivateText" :style="{'color':color,'background':bgcolor}">
					发送
				</view>
				<!-- <u-button style="width: 200rpx;" class="btm_btn" :plain="true" @click="sendPrivateText" >发送</u-button> -->
				<!-- <u-input v-if="showText" confirm-type="send" class="text" @confirm="sendPrivateText" v-model="text" height="50" auto-height="true" type="textarea" :border="true" /> -->

				<!-- <view v-else class="btn" @tap.stop="toggleWithoutAction" @touchstart.stop="startRecord"
					@touchmove.stop="moveRecord" @touchend.stop="endRecord">
					按住说话
				</view> -->
				<!-- <view class="voice1" @click.stop="onEmo">
					<image src="@/static/images/Emoji.png" mode=""></image>
				</view> -->
				<!-- <view class="voice" @click.stop="onImg">
					<image src="@/static/images/ad.png" mode=""></image>
				</view> -->
			</view>
			<view class="imgBox" v-if="showCamera">
				<view class="minBox" @click="onPhoto">
					<image src="@/static/images/im_tp.png" mode=""></image>
				</view>
				<view class="minBox" @click="onCamera">
					<image src="@/static/images/im_zp.png" mode=""></image>
				</view>
			</view>
			<view class="btmImg" v-if="showEmo">
				<swiper class="emoji_list" id="btmImg" :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<block>
						<swiper-item>
							<view class="emoji_item">
								<image v-for="(item, index) in emojiObj.map1" :key="index"
									:src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
							<view class="emoji_item">
								<image v-for="(item, index) in emojiObj.map2" :key="index"
									:src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
							<view class="emoji_item">
								<image v-for="(item, index) in emojiObj.map3" :key="index"
									:src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
						</swiper-item>
					</block>
					<block class="second">
						<swiper-item>
							<view class="emoji_item">
								<image v-for="(item, index) in emojiObj.map4" :key="index"
									:src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
							<view class="emoji_item">
								<image v-for="(item, index) in emojiObj.map5" :key="index"
									:src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
							<view class="emoji_item last_item">
								<image v-for="(item, index) in emojiObj.map6" :key="index"
									:src="'../../' +emojiObj.path + item" @tap="sendEmoji" :data-emoji="index"></image>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import audioMsg from './audio/audio'
	import globalUrl from '@/global.js';
	let WebIM = require("../../imSDK/utils/WebIM")["default"];
	let msgType = require("../../imSDK/utils/msgtype");
	let recordTimeInterval = null;
	export default {
		data() {
			return {
				keywordHeight: '0px',
				color:'',
				bgcolor:'',
				showEnd:false,
				show_input:false,
				professionObj: {
					'0': '金牌管家',
					'1': '银牌管家',
					'2': '铜牌管家'
				},
				professionObj1: {
					'0': '导游',
					'1': '旅游达人',
					'2': '旅游定制师'
				},
				inputMessage: '',
				consulting: {},
				fromUser: '',
				toUser: '',
				showText: true,
				showCamera: false,
				showEmo: false,
				showAudioWave: false,
				history: [],
				arr: [],
				text: '',
				title: '',
				username: {},
				btm: 0,

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
				card: {},
				search_id: '',
				bulter_id: '',
				customEvent: '',
				ext: {
					account_avatar: ''
				},
				commentScrollTop: 0,
				old: {
					scrollTop: 0
				},
				page:0,
			}
		},
		components: {
			audioMsg
		},
		onLoad(query) {
			// var num = EMClient.getInstance().chatManager().getUnreadMessageCount();
			// console.log(num,'++++')
			this.bulter_id = query.bulter_id
			this.search_id = query.search_id
			if (this.search_id) {
				this.getconsulting()
			} else {
				this.postconsulting()
			}
			// this.postconsulting()
			
		},
		onShow() {
			getApp().globalData.conn.onMessage = this.onMessage;
			// uni.pageScrollTo({
			//     scrollTop: 5000,
			//     duration: 300
			// });
			this.scrollToBottom()
		},
		onUnload() {
			getApp().globalData.conn.onMessage = null;
		},
		destroyed() {
			clearInterval(recordTimeInterval)
			this.recordTime = 0
		},
		onReady() {
			//#ifdef MP-BAIDU
			swan.showFavoriteGuide({
			    type: 'tip'
			})
			swan.onKeyboardHeightChange(res => {
				if (res.height === 0){
					this.showText = false 
				}
				this.keywordHeight = (res.height+60)+'px'
			});
			//#endif
		},
		methods: {
			//滚动到底部
			scrollToBottom() {
			    let query = uni.createSelectorQuery().in(this)
			    query.select('#commentContainer').boundingClientRect()
			    query.select('#commentContent').boundingClientRect()
			    query.exec((res) => {
					console.log(res,'++++')
			    //如果子元素高度大于父元素高度(显示高度)
			    if (res[1].height > res[0].height) {
			      //计算出二者差值就是需要滚动的距离
			       this.commentScrollTop = res[1].height - res[0].height
			    }
			  })
			},
			upper: function(e) {
				this.HTTP.request({
					url: '/user/search_record/info',
					// method:'POST',
					data: {
						search_id: this.search_id,
						page: this.page == 0 ? 0 : this.page - 1,
					},
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
							return
					}
					console.log(res,'res')

					let data = res.data.data
					let arr = data.history.concat(this.history)
					this.history = arr
					this.page = data.history_page
					}
				});
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			inputFocus(){
				this.keywordHeight = '0px'
			},
			home(){
				// this.recordStayAndRead()
				this.Utils.home()
			},
			onDow() {
				this.btm = 0
				// this.showText = false
				// this.executeRecord()
				this.showCamera = false
				// this.showEmo = false
			},
			previewImg(item) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = item.msg
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			previewImg1(item) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = item.body.url ? item.body.url : item.url
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			details() {
				// console.log(item,'e')
				uni.navigateTo({
					url: '/pages_im/housekeeperDetails/housekeeperDetails?bulter_id=' + this.card.bulter_id
				})
			},
			getCard() {
				this.HTTP.request({
					url: '/bulter/info',
					data: {
						bulter_id: this.consulting.bulter_id
					},
					success: res => {
						this.card = res.data.data
					},
				})
			},
			agreement() {
				uni.navigateTo({
					url: '/pages_im/agreement/agreement'
				})
			},
			toggleWithoutAction(e) { // 阻止 tap 冒泡
			},
			getconsulting() {
				this.HTTP.request({
					url: '/user/search_record/info',
					// method:'POST',
					data: {
						search_id: this.search_id
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.consulting = res.data.data
						this.ext.account_avatar = res.data.data.user_avatar
						console.log(this.consulting, '管家列表')
						this.getCard()
						this.fromUser = this.consulting.account_username //'test2'
						this.toUser = this.consulting.username //'wuwuwuuw'
						this.history = this.consulting.history
						this.title = this.consulting.name
						this.page = this.consulting.history_page
						if(this.consulting.status == 2){
							this.show_input = true
							this.color = '#FFFFFF'
							this.bgcolor = '#C9CAD1'
							this.showEnd = true
						}
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
			// 获取聊天室消息
			postconsulting() {
				this.HTTP.request({
					url: '/bulter/consulting',
					method: 'POST',
					data: {
						bulter_id: this.bulter_id
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.consulting = res.data.data
						this.ext.account_avatar = res.data.data.user_avatar
						console.log(this.consulting, '管家列表')
						this.getCard()
						this.fromUser = this.consulting.account_username //'test2'
						this.toUser = this.consulting.username //'wuwuwuuw'
						this.history = this.consulting.history
						this.title = this.consulting.name 
						if(this.consulting.status == 2){
							this.show_input = true
							this.color = '#FFFFFF'
							this.bgcolor = '#C9CAD1'
							this.showEnd = true
						}
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
			onMessage(type, message) {
				console.log(type, 'type')
				console.log(message, 'message')
				this.ext = message.ext
				if (message.from != this.consulting.username) {
					return
				}
				switch (type) {
					case 'text':
						this.arr.push(message)
						break
					case 'picture':
						this.arr.push(message)

						break
					case 'audio':
						this.arr.push(message)
						break
					case 'custom':
						this.arr.push(message)
						if (message.customEvent == 'send_card') {
							this.customEvent = message.customEvent
						}
						break
				}

				// this.$forceUpdate()
			},
			onEmo() {
				this.btm = 300
				console.log('点击表情')
				this.showCamera = false
				this.showEmo = true
			},
			onImg() {
				this.btm = 496
				this.showCamera = true
				this.showEmo = false
			},
			onSwitch() {
				this.btm = 0
				this.showText = false
				this.executeRecord()
				this.showCamera = false
				this.showEmo = false

			},
			onSwitch1() {
				this.btm = 0
				this.showText = true
				this.showCamera = false
				this.showEmo = false

			},
			// 发送文本信息
			sendPrivateText() {
				//校验时间
				let timestamp = parseInt(new Date().getTime()/1000);
				if(timestamp > this.consulting.end_time){
					this.showEnd = true
					this.show_input = true
					this.color = '#FFFFFF'
					this.bgcolor = '#C9CAD1'
					return
				}
				// if(this.text == ''){
				// 	return
				// }
				var input  = /^[\s]*$/;
				 if (input.test(this.text)){
				   return false;
				}
				// timestamp(new Date() / 1000)
				console.log(timestamp,'timestamp')
				let id = WebIM.conn.getUniqueId(); // 生成本地消息id
				let msg = new WebIM.message('txt', id); // 创建文本消息
				msg.set({
					msg: this.text, // 消息内容
					to: this.toUser, // 接收消息对象（用户id）
					chatType: 'singleChat', // 设置为单聊
					ext: {
						bulter_avatar: this.consulting.bulter_avatar,
						bulter_name: this.consulting.name,
						account_avatar: this.consulting.user_avatar,
						account_name: this.consulting.account_name
					},
					success: (id, serverMsgId) => {
						this.text = '',

							console.log('send private text Success', msg);
						this.arr.push(msg.body)
						this.HTTP.request({
							url: '/im/save_msg',
							method: 'POST',
							data: {
								bulter_id: this.consulting.bulter_id,
								msg: msg.body.msg,
								type: msg.body.type,
								id: msg.body.id,
								search_id:this.consulting.search_id,
							},
							success: res => {
								console.log(res, '历史记录')
								uni.pageScrollTo({
								    scrollTop: 5000,
								    duration: 300
								});
							},
						})
					},
					fail: function(e) {
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
				console.log(event, 'str')
				this.text = str;
				this.inputMessage = str;
			},
			// 发送图片
			onPhoto() {
				var me = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album"],

					success(res) {
						console.log(res, 'res')
						me.sendImage(res);
					}
				});

			},
			onCamera() {
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
								url: globalUrl + '/im/upload_file',
								filePath: tempFilePaths[0],
								name: "send_file",
								header: {
									'Authorization': getApp().globalData.Authorization,
									'content-type': 'multipart/form-data'
								},
								success: (res) => {
									if (res.statusCode != 200 || res.data.code != 0) {
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
										ext: {
											bulter_avatar: me.consulting.bulter_avatar,
											bulter_name: me.consulting.name,
											account_avatar: me.consulting.user_avatar,
											account_name: me.consulting.account_name
										},
										success: function(argument) {
											disp.fire('em.chat.sendSuccess', id);
										}
									});
									console.log(msg.body, 'msg.body')
									me.arr.push(msg.body)
									WebIM.conn.send(msg.body);
	
									me.HTTP.request({
										url: '/im/save_msg',
										method: 'POST',
										data: {
											bulter_id: me.consulting.bulter_id,
											msg: msg.body.body.url,
											type: msg.body.type,
											id: msg.body.id,
										},
										success: res => {
											console.log(res, '历史记录')
											me.showCamera = false
											me.btm = 0
											uni.pageScrollTo({
											    scrollTop: 5000,
											    duration: 300
											});
										},
									})
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
			startRecord() {
				var me = this;
				console.log('开始录音')
				clearInterval(recordTimeInterval);
				me.recordTime = 0
				me.showAudioWave = true
				me.myradom();
				let recorderManager = me.recorderManager || uni.getRecorderManager();
				recorderManager.onStart(() => {
					recordTimeInterval = setInterval(() => {
						// console.log("开始录音...");
						me.recordTime++
					}, 1000)

				});
				recorderManager.start({
					format: "mp3"
				}); // 超时

				setTimeout(function() {
					me.endRecord();
				}, 100000);
			},
			moveRecord() {},
			endRecord() {
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
					url: globalUrl + '/im/upload_file',
					filePath: tempFilePath,
					name: "send_file",
					formData: {
						length: Math.ceil(dur / 1000)
					},
					header: {
						'Authorization': getApp().globalData.Authorization,
						'content-type': 'multipart/form-data'
					},
					success: (res) => {
						if (res.statusCode != 200 || res.data.code != 0) {
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
							ext: {
								bulter_avatar: me.consulting.bulter_avatar,
								bulter_name: me.consulting.name,
								account_avatar: me.consulting.user_avatar,
								account_name: me.consulting.account_name
							},
							success: function(argument) {
								disp.fire('em.chat.sendSuccess', id);
							}
						});

						msg.body.length = Math.ceil(dur / 1000); //console.log('发送的语音消息', msg.body)
						WebIM.conn.send(msg.body);
						this.arr.push(msg.body.body)
						console.log('发送的语音消息', msg.body)
						console.log(msg.body.body, '+++')
						me.HTTP.request({
							url: '/im/save_msg',
							method: 'POST',
							data: {
								bulter_id: me.consulting.bulter_id,
								msg: msg.body.body.url,
								type: msg.body.type,
								id: msg.body.id,
							},
							success: res => {
								console.log(res, '历史记录')
							},
						})

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
						} else if (recordAuth == false) {
							//已申请过授权，但是用户拒绝
							uni.openSetting({
								success: function(res) {
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
					fail: function() {
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
					setTimeout(function() {
						that.myradom();
					}, 500);
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F8F8F8;
	}
	.box {
		position: relative;
		// background: #F1F2F3;
		
		// background: red;
		// height: 1282rpx;
		// padding-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
		// padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
		.scroll-Y{
			height: 600rpx;
		}
		.nav-bar{
			background: #F8F8F8;
		}
		.end{
			width: 192rpx;
			height: 44rpx;
			background: #EDEFF2;
			border-radius: 22rpx;
			margin: 40rpx auto;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #606266;
		}
		.top{
			background: #FFFFFF;
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 1rpx solid #E5E5E5;
			text{
				font-size: 28rpx;
				// font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
			}
			.con{
				width: 16rpx;
				height: 28rpx;
				margin: 0 12rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.title {
			width: 750rpx;
			height: 72rpx;
			// background: rgba(183, 235, 143, 0.3);
			background: #DFEFD4;;
			display: flex;
			justify-content: space-between;
			padding: 0 28rpx;
			align-items: center;
			position: fixed;

			.left {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #7CB305;
			}

			.right {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
			}
		}

		.chatbox {
			// display: flex;
			// min-height: 1400rpx;
			background: #F8F8F8;
			padding-top: 30rpx;
			padding-bottom: 150rpx;
			.time{
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #909399;
				margin: 20rpx 0;
				display: flex;
				justify-content: center;
			}
			.c_card{
				width: 694rpx;
				height: 342rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
				border-radius: 12rpx;
				margin-top: 30rpx;
				margin: 0 auto;
				.c_card_top{
					display: flex;
					justify-content: flex-end;
					.c_card_top_text{
						width: 128rpx;
						height: 40rpx;
						background: #FFE512;
						border-radius: 0rpx 12rpx 0rpx 12rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #303133;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
				.c_card_center{
					width: 100%;
					height: 196rpx;
					display: flex;
					.c_card_center_left{
						.left_img{
							width: 112rpx;
							height: 112rpx;
							border-radius: 50%;
							overflow: hidden;
							margin-left: 28rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
						.left_btm{
							margin-top: 18rpx;
							margin-left: 43rpx;
							display: flex;
							align-content: center;
							.btm_dian{
								width: 6rpx;
								height: 6rpx;
								background: #A86B13;
								margin: auto 0;
								border-radius: 50%;
								overflow: hidden;
							}
							.btm_text{
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #A86B13;
								margin-left: 6rpx;
							}
						}
					}
					.c_card_center_right{
						margin-left: 30rpx;
						.right_one{
							display: flex;
							margin-top: 14rpx;
							align-items: center;
							.one_1{
								font-size: 36rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #303133;
							}
							.one_2{
								margin-left: 12rpx;
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #606266;
							}
						}
						.right_two{
							margin-top: 14rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #606266;
						}
						.right_three{
							display: flex;
							margin-top: 12rpx;
							.three_1{
								display: flex;
								align-items: center;
								width: 170rpx;
								height: 26rpx;
								border-right: 1rpx solid #E5E5E5;
								text{
									font-size: 26rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #909399;
								}
							}
							.three_2{
								height: 26rpx;
								display: flex;
								align-items: center;
								font-size: 26rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #909399;
								margin-left: 16rpx;
							}
						}
					}
				}
				.c_card_btm{
					width: 630rpx;
					height: 104rpx;
					margin: 0 auto;
					border-top: 1rpx solid #E5E5E5;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 ;
					.btm_left{
						display: flex;
						align-items: center;
						width: 462rpx;
						height: 64rpx;
						background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 0%, #FFF8BB 100%);
						border-radius: 20rpx;
						padding-left: 16rpx;
						.left_img{
							width: 30rpx;
							height: 30rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
						.left_txt{
							font-size: 24rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #A86B13;
							margin-left: 8rpx;
						}
					}
					.btm_right{
						display: flex;
						align-items: center;
						.right_txt{
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #303133;
						}
						.con{
							width: 16rpx;
							height: 28rpx;
							margin-left: 4rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
			.boxTop {
				width: 568rpx;
				height: 100rpx;
				background: rgba(0, 0, 0, 0.04);
				border-radius: 12rpx;
				margin: 0 auto;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
				padding: 16rpx 20rpx;

				text {
					color: #0091FF;
				}

				// padding: 16rpx 20rpx;
				// display: flex;
				// justify-content: center;
				// align-items: center;
				// margin-top: 108rpx;
			}

			.card {
				width: 598rpx;
				height: 214rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				// margin: 0 auto;
				display: flex;

				.left {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-top: 30rpx;
					margin-left: 30rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					margin-left: 20rpx;

					.r-top {
						font-size: 34rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #303133;
						margin-top: 30rpx;
					}

					.r-center {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #606266;
						margin-top: 8rpx;
					}

					.r-btm {
						height: 38rpx;
						background: #FFF1B8;
						border-radius: 21rpx;
						opacity: 0.7;
						border: 2rpx solid #FFE512;
						margin-top: 16rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}

			.ls-box1 {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding: 15rpx 0;

				.avatar {
					width: 72rpx;
					height: 72rpx;
					border-radius: 50%;
					margin: 0 28rpx;
				}

				.chatmsg {
					max-width: 400rpx;
					
					background: #D1E2FF;
					border-radius: 24rpx 0rpx 24rpx 24rpx;
					padding: 20rpx;
					display: flex;
					color: #303133;
					justify-content: center;
					align-items: center;
				}

				.chatImg {
					width: 460rpx;
					height: 280rpx;
					border-radius: 24rpx;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.ls-box {
				display: flex;
				align-items: center;

				margin: 30rpx 0;

				.avatar {
					width: 72rpx;
					height: 72rpx;
					border-radius: 50%;
					margin: 0 28rpx;
				}

				.chatmsg {
					max-width: 400rpx;
					// height: 72rpx;
					background: #FFFFFF;
					border-radius: 0rpx 24rpx 24rpx 24rpx;
					padding: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.chatImg {
					width: 460rpx;
					height: 280rpx;
					border-radius: 24rpx;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.audio-box {
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
				padding-left: 10%;
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

		.btm {
			position: fixed;
			bottom: 0;
			display: flex;
			// align-items: center;
			width: 750rpx;
			height: 132rpx;
			background: #FFFFFF;
			padding: 30rpx 28rpx 0;
			// margin-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
			// margin-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
			.btm_input{
				width: 522rpx;
				height: 72rpx;
				background: #F8F8F8;
				border-radius: 36rpx;
				padding-left: 32rpx;
				color: #303133;
			}
			.btm_btn{
				width: 144rpx;
				height: 72rpx;
				background: #FFE512;
				border-radius: 36rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
				margin-left: 28rpx;
			}
			.voice {
				width: 48rpx;
				height: 48rpx;
				margin-left: 28rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.voice1 {
				width: 48rpx;
				height: 48rpx;
				margin-left: 24rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				width: 620rpx;
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				// margin: 0 24rpx;
				margin-left: 24rpx;
			}

			.btn {
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

		.imgBox {
			width: 750rpx;
			height: 496rpx;
			background: #F6F6F6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 160rpx;
			position: fixed;
			bottom: 0;

			.minBox {
				width: 116rpx;
				height: 116rpx;
				background: #FFFFFF;
				border-radius: 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}

		.btmImg {
			width: 100%;
			height: 300rpx;
			position: fixed;
			bottom: 0;
			background: #FFFFFF;

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

			.last_item {
				justify-content: flex-end !important
			}

		}

	}
</style>
