<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="领途羊旅游管家">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 问题详情卡片 -->
		<view class="detailCard" v-if="detail">
			<view class="cardTopBox" :style="{background:backgroundColor}">
				<view class="cardTop">
					<view class="cardTopText">
						领途羊·旅行问答
					</view>
				</view>
				<view class="cradTitle">
					{{detail.title}}
				</view>
				<view class="cardTipsBox">
					<view class="cTL">
						<view class="cardTips" v-if="index <= 1" v-for="(item,index) in detail.labels" :key="index" >
							#{{item}}
						</view>
					</view>
					
					<view class="questionsDate">
						{{detail.account_name}}问于{{detail.create_at.slice(0,10)}}
					</view>
				</view>
				<image class="answersIcon" src="/static/images/answersIcon.png"></image>
			</view>
		</view>
		<!-- 问题回答 -->
		<view class="answersTip">
			<text>全部回答·{{detail?detail.reply_count:0}}</text>
			<view class="answersLine"></view>
		</view>
		<view class="answersOfficial" v-if="answersOfficial">
			<view class="answersCardBox" >
				<view class="answersCardTop">
					<view class="answersAuthor">
						<!-- <view class="avatar ldx infinite ldx-zoom-in" ></view> -->
						<view class="avatarImg-box">
							<image class="avatarImg" lazy-load :src="answersOfficial.avatar?answersOfficial.avatar:'/static/images/userImg.svg'"></image>
						</view>
						<view class="userName">
							{{answersOfficial.account_id}}
						</view>
						<image class="gficon" src="/static/images/gficon.png" v-if="answersOfficial.account_type == 1"></image>
					</view>
					<view class="answersDate">
						{{answersOfficial.create_at }}
					</view>
				</view>
				<view class="answersCardContent">
					<mp-html ref="parse" style="overflow: hidden;text-align: justify;" lazy-load :tag-style="style" :content="answersOfficial.content"></mp-html>
				</view>
				<view class="answersCardBottom">
					<view class="acbr">
						<view class="answersLike" @click="like(answersOfficial)">
							<image :src="answersOfficial.option == 1?'/static/images/aLikeActive.svg':'/static/images/aLike.svg'"></image>
							<text>{{answersOfficial.like == 0 ? '赞同' : answersOfficial.like}}</text> 
						</view>
						
						<view class="answersDisLike" @click="disLike(answersOfficial)">
							<image :src="answersOfficial.option == 2?'/static/images/aDisLikeActive.svg':'/static/images/aDisLike.svg'"></image>
							<text>{{answersOfficial.dislike == 0 ? '踩' : answersOfficial.dislike}}</text>
						</view>
					</view>
				</view>
				<!-- <view class="answersLine" v-if="answersOfficial">
				</view> -->
			</view>
			<view class="moreAnswers" @click="moreAnswers()" v-if="detail&&detail.reply_count > 1">
				查看全部{{detail.reply_count}}条回答
			</view>
		</view>
		<view class="answersNull" v-else>
			<view class="answersNull-img">
				<image src="/static/images/wd-kong.png" mode=""></image>
			</view>
			<text>还没有收到回答</text>
		</view>
		<!-- <view class="myAnswersBtn" @click="commentInput" v-if="!textareafocus">
			<image src="/static/images/followIcon.svg"></image>
			<view class="mabt">
				我来回答
			</view>
		</view> -->
		<view class="line"></view>
		<!-- 营销组件 -->
		<!-- <view class="componment" v-if="marketingData">
			<view class="wechat">
				<image lazy-load :src="answersOfficial.avatar"></image>
				<view class="wechatText">{{marketingData.template}}</view>
			</view>
			<view class="wechatBtn ldx infinite ldx-blur-in" @click="templateAdd">复制导游微信</view>
		</view> -->
		<view class="btn">
			<view class="left">
				<view class="left-img">
					<image src="/static/images/tx.png" mode=""></image>
				</view>
				<text>领途羊旅游管家</text>
			</view>
			<view class="right"  @click="toChatroom">
				<view class="right-btn">
					立即咨询
				</view>
				<!-- <button class="right-btn" type="primary" open-type="contact" bindcontact="contactCB">立即咨询</button> -->
			</view>
		</view>
		<!-- 相关问题 -->
		<view class="travelQuestionsBox">
			<view class="tQTop">
				<view class="tQTBox">
					<text class="tQText">相关问题</text>
					<view class="tQLine"></view>
				</view>
			</view>
			<view class="tQContent" v-if="questionsRelated">
				<view class="tQCard" v-for="(item,index) in questionsRelated " :key="index" @click="toQuestionsDetail(item)">
					<view class="tQCRight">
						<view class="tQCTitle">
							{{item.title}}
						</view>
						<view class="authorBox">
							<view class="author">
								<view class="authorImg">
									<image :src="item.avatar?item.avatar:'/static/images/userImg.svg'"></image>
								</view>
								<text>{{item.account_name}}</text>
							</view>
							<view class="lookAnswers">
								<view class="look">
									<text>{{item.read}}</text>人看过
								</view>
								<view class="answers">
									<text>{{item.reply_count}}</text>回答
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tQNull" v-else>
				暂无相关问题
			</view>
		</view>
		<!-- 我要提问按钮 -->
		<view class="answersFollow" >
			<view class="addBox" @click="sendAsk">
				<view class="midBox">
					<view class="img">
						<image src="/static/images/wdadd.svg"></image>
					</view>
					<text>添加回答</text>
				</view>
			</view>
			<!-- <view class="aFLine"></view> -->
			<view class="followBox"  @click="Fllow()">
				<view class="midBox">
					<view class="img">
						<image src="/static/images/wdtj.svg"></image>
					</view>
					<text >{{detail&&detail.is_follow == 0?'关注问题':'已关注'}}</text>
				</view>
			</view>
			<view class="shareBox"  @click="share">
				<view class="midBox">
					<view class="img">
						<image src="/static/images/wdfx.svg"></image>
					</view>
					<text>分享问答</text>
				</view>
			</view>
		</view>
		<!-- 输入框 -->
		<u-popup v-model="textareafocus" mode="bottom" :mask-custom-style="{background: 'rgba(0, 0, 0, 0)'}">
			<view :style="{'padding-bottom': keywordHeight}" class="commentInput" v-if="textareafocus">
				<textarea class="inputK" v-model="contentText" placeholder="快来写下你的回答吧" :show-confirm-bar="false" :focus="textareafocus"
				 @blur="inputBlur" auto-height maxlength="140" cursor-spacing="20"
				 :adjust-position="false"></textarea>
				<view class="send" @click="pubComment">发送</view>
			</view>
		</u-popup>
		<!-- 弹窗 -->
		<u-modal v-model="show" :border-radius="40" :content="contentp" :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
		<u-modal v-model="weshow" width="670rpx" :show-title="false"  :mask-close-able="true" :show-confirm-button="false" :show-cancel-button="false" >
			<view class="slot-content">
				<image class="sucIcon" src="/static/images/sucIcon.svg"></image>
				<view class="text">微信已复制</view>
				<rich-text :nodes="wecontent"></rich-text>
				<image class="wechatImg" src="/static/images/wechatimg.png"></image>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywordHeight: '0px',
				backgroundColor: 'linear-gradient(270deg, #6BBEFF 0%, #0091FF 100%);',
				question_id:'',
				detail: null,
				answersOfficial:null,
				questionsRelated:null,
				contentText: '',
				autoHeight: false,
				inputbottom: {
					bottom: ''
				},
				textareafocus: false,
				show: false,
				weshow:false,
				contentp: '',
				wecontent:`
					微信号复制成功<br>
					快去添加微信免费咨询吧`,
				style: {
					img: 'border-radius: 16rpx',
					height: '20px'
				},
				marketingData: null,
			};
		},
		// #ifdef MP-BAIDU
		onInit(query) {
		// #endif
		// #ifndef MP-BAIDU
		onLoad(query) {
		// #endif
			this.backgroundColor = query.background
			this.question_id = query.question_id
			this.getQuestionsDetail()
			this.getAnswersOfficial()
			this.getQuestionsRelated()
		},
		onReady() {
			
		 	//#ifdef MP-BAIDU
			swan.onKeyboardHeightChange(res => {
				this.keywordHeight = (res.height + 60)+'px'
			});
		 	//#endif
		},
		methods:{
			toChatroom(){
				uni.navigateTo({
					url:'/pages_im/chatroom/chatroom',
				})
			},
			share() {
				uni.showShareMenu({
					title: this.detail.title,
					path:'pages_questions/questionsDetail/questionsDetail?question_id=' + this.question_id,
					// content: this.articleInfo.description,
					success() {
					},
					complete() {
					}
				});
			},
			//客服
			contactCB(e) {
				// 输出：{errMsg: 'enterContact:ok'}
				console.log(e.detail); 
				// 进入客服会话页面成功，可进行自己的业务逻辑
				// if (e.detail.errMsg === 'enterContact:ok') {
				// 	swan.reportAnalytics('userMessage', {
				// 		visit: 1,
				// 		message: '进入客服页面PV'
				// 	});
				// }
				// // 可进行一些进入失败的业务逻辑
				// else {
				// 	swan.reportAnalytics('userMessage', {
				// 		visit: 0,
				// 		message: '进入客服页面失败损失PV'
				// 	});
				// }
			},
			// 获取问题详情
			getQuestionsDetail(){
				this.HTTP.request({
					url: '/questions/info',
					data: {
						question_id: this.question_id
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.detail = res.data.data
						//#ifdef MP-BAIDU
						swan.setPageInfo({
							title: this.detail.title,
							keywords: this.detail.keywords,
							description: this.detail.description,
						})
						// #endif
					}
				});
			},
			// 获取相关问题
			getQuestionsRelated(){
				this.HTTP.request({
					url: '/questions/related',
					data: {
						question_id: this.question_id,
						count:3
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						if (!res.data.data || res.data.data.length == 0){
							this.questionsRelated = null
							return 
						}
						var questions = res.data.data
						questions.forEach((item1, index1) => {
							item1.avatar = this.Utils.addImageProcess(item1.avatar, false, 60)
						})
						this.questionsRelated = res.data.data
					}
				});
			},
			// 获取回复列表
			getAnswersOfficial(){
				var that = this
				this.HTTP.request({
					url: '/answers/official',
					data: {
						question_id: this.question_id
					},
					success: async function(res) {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						if (!res.data.data || res.data.data.length == 0){
							that.answersOfficial = null
							return
						}
						var answersOfficial = res.data.data
						answersOfficial.avatar = that.Utils.addImageProcess(answersOfficial.avatar, false, 60)
						
						let inputComponets = answersOfficial.content.match(/<input[^>]*\/>/gi);
						if (inputComponets != null && inputComponets.length > 0){
							var item = inputComponets[0]
							let strValue = item.match(/name="(\S*)"/);
							if (strValue != null && strValue.length == 2){
								var id = strValue[1]
								if (item.indexOf("营销组件")!=-1){
									let component = await that.asyncGetComponentInfo('/marketing/unit', {
																			group_id: id,
																			article_id: that.question_id
																		});
									if (component.data.code != 0) {
										console.error('获取营销组件信息失败', component)
										replaceStr = ""
									} else {
										that.marketingData = component.data.data
										answersOfficial.content = answersOfficial.content.replace(item, '');
									}
								}
							}
						}
						// answersOfficial.content = '<div>'+answersOfficial.content+'</div>'
						that.answersOfficial = answersOfficial
					}
				})
			},
			async asyncGetComponentInfo(url, data){
				return new Promise((resolve, reject) => {
					this.HTTP.request({
						url: url,
						method: 'get',
						data: data,
						success: res => {
							resolve(res,'组件信息');
						},
						fail: error => {
							reject(error);
						}
					});
				});
			},
			// 点击复制
			templateAdd() {
				uni.setClipboardData({
					data: this.marketingData.wechat_id,
					success: () => {
						this.weshow = true
					}
				});
			},
			// 查看全部回答
			moreAnswers(){
				uni.navigateTo({
					url: '/pages_questions/answersList/answersList?question_id=' + this.question_id
				});
			},
			// 跳转问题详情
			toQuestionsDetail(item){
				var question_id = item.question_id
				uni.navigateTo({
					url: '/pages_questions/questionsDetail/questionsDetail?question_id=' + question_id
				});
			},
			// 提问按钮
			sendAsk() {
				if (!this.Utils.isLogin()){
					return
				}
				
				// #ifdef MP-BAIDU
				swan.openReplyEditor({
					sendText: '发送',
					contentPlaceholder: '快来写下你的回答吧',
				    success: res => {
                        if (res.status === 'reply' || res.status === 'replay') {
							this.contentText = res.content
							this.pubComment()
						}
						// 主动关闭评论发布器
						swan.closeReplyEditor();
				    },
				    fail: err => {
				        console.log('fail', err)
				    }
				});
				return
				// #endif
				this.textareafocus = true
			},
			inputBlur() {
				// #ifdef MP-BAIDU
				return
				// #endif
				this.textareafocus = false
			},
			pubComment() {
				if (!this.Utils.isLogin()){
					return
				}
				if (this.contentText.replace(/\s+/g, '').length === 0){
					uni.showToast({
						title: '请输入回答内容',
						icon: 'none'
					});
					return
				}
				this.HTTP.request({
					url: '/answers',
					data: {
						question_id: this.question_id,
						content: this.contentText
					},
					method: 'POST',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						uni.showToast({
							title: '回答成功',
							icon: 'none',
							duration: 2000
						})
						this.contentText = ''
						
						//#ifndef MP-BAIDU
						uni.hideKeyboard();
						//#endif
						this.getQuestionsDetail()
						// this.getAnswersOfficial()
					}
				})
			},
			// 关注
			Fllow() {
				if (!this.Utils.isLogin()){
					return
				}
				var that = this;
				let msg = this.detail.is_follow ? '确认取消关注?' : '确认关注?'
				let status = this.detail.is_follow ? 0 : 1
			
				if (status == 0) {
					that.show = true
					that.contentp = '确认取消关注?'
				} else {
					this.HTTP.request({
						url: '/questions/follow',
						data: {
							question_id: that.question_id,
							status: status,
						},
						method: 'POST',
						success: (res) => {
							if (res.statusCode != 200 || res.data.code != 0){
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
								return
							}
							that.detail.is_follow = res.data.data
						}
					})
				}
			},
			// 点击确认
			confirm() {
				if (!this.Utils.isLogin()){
					return
				}
				var that = this;
				let status = this.detail.is_follow ? 0 : 1
				this.HTTP.request({
					url: '/questions/follow',
					data: {
						question_id: that.question_id,
						status: status,
					},
					method: 'POST',
					success: (res) => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						that.detail.is_follow = res.data.data
					}
				})
			},
			// 点赞
			like(e){
				var that = this
				if (!this.Utils.isLogin()){
					return
				}
				var answer_id = e.answer_id
				this.HTTP.request({
					url: '/answers/like',
					data: {
						answer_id: answer_id,
						status: e.option==1?0:1,
					},
					method: 'POST',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						that.answersOfficial.option = res.data.data.option
						that.answersOfficial.like = res.data.data.like
						that.answersOfficial.dislike = res.data.data.dislike
					}
				});
			},
			// 点踩
			disLike(e){
				var that = this
				if (!this.Utils.isLogin()){
					return
				}
				var answer_id = e.answer_id
				this.HTTP.request({
					url: '/answers/dislike',
					data: {
						answer_id: answer_id,
						status: e.option==2?0:1,
					},
					method: 'POST',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						that.answersOfficial.option = res.data.data.option
						that.answersOfficial.like = res.data.data.like
						that.answersOfficial.dislike = res.data.data.dislike
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url('../../components/transition-min/transition.min.css');
	page {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.detailCard{
		margin-top: 20rpx;
		margin-left: 32rpx;
		margin-right: 32rpx;
		.cardTopBox{
			position: relative;
			width: 686rpx;
			height: 296rpx;
			box-shadow: 0rpx 8rpx 28rpx 0rpx #EDEFF2;
			border-radius: 16rpx;
			overflow: hidden;
			.cardTop{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 28rpx 20rpx;
				.cardTopText{
					width: 220rpx;
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 40rpx;
				}
			}
			.cradTitle{
				width: 638rpx;
				height: 120rpx;
				font-size: 40rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				text-align: justify;
				line-height: 60rpx;
				margin-left: 28rpx;
				margin-right: 20rpx;
				margin-bottom: 16rpx;
			}
			.cardTipsBox{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin:0rpx 28rpx;
				.cTL{
					display: flex;
					align-items: center;
					.cardTips{
						width: 98rpx;
						height: 36rpx;
						background: rgba(255, 255, 255, 0.3);
						border-radius: 0rpx 18rpx 18rpx 18rpx;
						font-size: 22rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
						line-height: 36rpx;
						margin-right: 16rpx;
						text-align: center;
					}
				}
				
				.questionsDate{
					height: 32rpx;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 32rpx;

				}
			}
			.answersIcon{
				width: 176rpx;
				height: 206rpx;
				position: absolute;
				bottom: 16rpx;
				right: 4rpx;
			}
		}
	}
	// 回复列表
	.answersTip{
		margin: 40rpx 32rpx;
		margin-bottom: 0rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		.answersLine{
			width: 100%;
			height: 2rpx;
			background: #EDEFF2;
			margin-top: 20rpx;
		}
	}
	.answersOfficial{
		margin: 0px 28rpx;
		.answersCardBox{
			margin-top: 20rpx;
			.answersCardTop{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;
				.answersAuthor{
					height: 100%;
					display: flex;
					align-items: center;
					position: relative;
					.avatarImg-box{
						width: 68rpx;
						height: 68rpx;
						border-radius: 50%;
						background-image: url('/static/images/userImg.svg');
						background-repeat: no-repeat;
						background-position: 50%;
						border-radius: 50%;
						background-size:68rpx 68rpx;
						overflow: hidden;
						image{
							border-radius: 50%;
							width: 100%;
							height: 100%;
						}
					}
					@keyframes clippath {
					    0%  {
					        clip-path: inset(0 0 95% 0);
					    }
					    25% {
					        clip-path: inset(0 95% 0 0);
					    }
					    50% {
					        clip-path: inset(95% 0 0 0);
					    }
					    75% {
					        clip-path: inset(0 0 0 95%);
					    }
						100% {
						    clip-path: inset(0 0 95% 0);
						}
					}
					
					.userName{
						height: 28rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #303133;
						line-height: 28rpx;
						margin-left: 16rpx;
					}
					.gficon{
						width: 122rpx;
						height: 40rpx;
						margin-left: 8rpx;
					}
				}
				.answersDate{
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #C9CAD1;
					line-height: 24rpx;

				}
			}
			.answersCardContent{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
				line-height: 42rpx;
				margin-bottom: 20rpx;
			}
			.answersCardBottom{
					display:flex;
					justify-content: flex-end;
					margin-bottom: 20rpx;
					.acbr{
						display: flex;
						align-items: center;
						.answersLike{
							margin-right: 40rpx;
							display: flex;
							align-items: center;
							image{
								width: 44rpx;
								height: 44rpx;
							}
							text{
								width: 48rpx;
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #606266;
							}
						}
						.answersDisLike{
							display: flex;
							align-items: center;
							image{
								width: 44rpx;
								height: 44rpx;
							}
							text{
								width: 20rpx;
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #606266;
							}
						}
					}
				
			}
			.answersLine{
				width: 100%;
				height: 2rpx;
				background: #EDEFF2;

			}
		}
		.moreAnswers{
			text-align: center;
			height: 92rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #0091FF;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 2rpx solid #EDEFF2;
		}
	}
	.answersNull{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		margin-bottom: 80rpx;
		.answersNull-img{
			width: 306rpx;
			height: 246rpx;
			margin-top: 40rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		text{
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #909399;
			margin-top: 24rpx;
		}
	}
	.line{
		width: 100%;
		height: 20rpx;
		background: #F8F8F8;
	}
	.componment{
		width: 694rpx;
		height: 108rpx;
		background: #FFE512;
		border-radius: 8rpx;
		margin: 20rpx 28rpx 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		.wechat{
			display: flex;
			align-items: center;
			image{
				width: 68rpx;
				height: 68rpx;
				margin-right: 16rpx;
				border-radius: 50%;
			}
			.wechatText{
				width: 350rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
				line-height: 40rpx;
			}
		}
		.wechatBtn{
			background: #FFFFFF;
			box-shadow: 0px 16rpx 56rpx 0px rgba(0, 0, 0, 0.05);
			border-radius: 40rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #303133;
			padding: 12rpx 32rpx;
		}

	}
	// 旅途问答
	.travelQuestionsBox{
		margin: 28rpx;
		padding-bottom: 186rpx;
		.tQTop{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.tQTBox{
				.tQText{
					height: 36rpx;
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					line-height: 36rpx;
	
				}
				.tQLine{
					margin-top: -12rpx;
					width: 144rpx;
					height: 12rpx;
					background: #FFE512;
					border-radius: 12rpx;
				}
			}
			.tQBtn{
				width: 180rpx;
				height: 52rpx;
				background: #EDEFF2;
				border-radius: 26rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 20rpx;
					height: 20rpx;
					margin-right: 8rpx;
				}
				.tQBT{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
					line-height: 28rpx;
				}
			}
		}
		.tQContent{
			margin: 44rpx 0rpx 20rpx;
			.tQCard{
				background: #FFFFFF;
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #EDEFF2;
				margin-bottom: 20rpx;
				.tQCRight{
					width: 694rpx;
					.tQCTitle{
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #303133;
						line-height: 56rpx;
						margin-bottom: 20rpx;
						text-align: justify;
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						word-wrap: break-word;
						white-space: normal !important;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.authorBox{
						margin-top: 20rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.author{
							display: flex;
							align-items: center;
							.authorImg{
								width: 48rpx;
								height: 48rpx;
								border-radius: 50%;
								margin-right: 16rpx;
								background-image: url('/static/images/userImg.svg');
								background-repeat: no-repeat;
								background-position: 50%;
								border-radius: 50%;
								background-size:48rpx 48rpx;
								overflow: hidden;
								image{
									width: 100%;
									height: 100%;
								}
							}
							
							text{
								font-size: 24rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #303133;
								line-height: 34rpx;
						
							}
						}
						.lookAnswers{
							display: flex;
							align-items: center;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #606266;
							line-height: 34rpx;
							.look{
								margin-right: 16rpx;
								text{
									font-size: 24rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #606266;
									line-height: 34rpx;

								}
							}
							.answers{
								text{
									font-size: 24rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #606266;
									line-height: 34rpx;
								
								}
							}
						}
					}
				}
			}
			.tQToMore{
				text-align: center;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
				line-height: 28rpx;
				margin-top: 40rpx;
			}
		}
		.tQNull{
			margin-top: 80rpx;
			margin-bottom: 190rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #909399;
			line-height: 28rpx;
			text-align: center;
		}
	}
	// 我来回答
	.myAnswersBtn{
		position:fixed; 
		margin:auto;
		left:0;
		right:0;
		bottom:80rpx;
		text-align:center;
		width: 236rpx;
		height: 88rpx;
		background: #FFE512;
		box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.1), 0rpx 16rpx 56rpx 0rpx rgba(255, 229, 18, 0.4);
		border-radius: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 20rpx;
			height: 20rpx;
		}
		.mabt{
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 40rpx;
			margin-left: 10rpx;
		}
	}
	.btn{
		width: 100%;
		height: 260rpx;
		background-image: url(/static/images/bg.png);
		background-repeat:no-repeat;
		background-size:100% 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 52rpx;
		.left{
			display: flex;
			align-items: center;
			.left-img{
				width: 126rpx;
				height: 126rpx;
				overflow: hidden;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
				}
			}
			text{
				font-size: 32rpx;
				font-family: AlibabaPuHuiTiM;
				color: #303133;
				margin-left: 24rpx;
			}
		}
		.right{
			.right-btn{
				width: 176rpx;
				height: 60rpx;
				background: linear-gradient(90deg, #FF5A79 0%, #FF74B4 100%);
				box-shadow: 0rpx 6rpx 30rpx 0rpx rgba(255, 115, 178, 0.35);
				border-radius: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.answersFollow{
		position:fixed;
		margin:auto;
		left:0;
		right:0;
		bottom:0;
		width: 100%;
		height: 98rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
		background: #FFFFFF;
		box-shadow: 0px -16rpx 56rpx 0px rgba(0, 0, 0, 0.05);
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
		.addBox{
			padding: 0 40rpx;
			height: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-right: 2rpx solid #EDEFF2;
			.midBox{
				display: flex;
				align-items: center;
				.img{
					width: 48rpx;
					height: 48rpx;
					background: #FFE512;
					box-shadow: 0px 0px 26rpx 0px rgba(255, 229, 0, 0.3);
					border-radius: 50%;
					overflow: hidden;
					margin-right: 8rpx;
					image{
						width: 48rpx;
						height: 48rpx;
					}
				}
				text{
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
					line-height: 40rpx;
				
				}
			}
			
		}
		.followBox{
			height: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.midBox{
				display: flex;
				align-items: center;
				.img{
					width: 48rpx;
					height: 48rpx;
					background: #FFE512;
					box-shadow: 0px 0px 26rpx 0px rgba(255, 229, 0, 0.3);
					border-radius: 50%;
					overflow: hidden;
					margin-right: 8rpx;
					image{
						width: 48rpx;
						height: 48rpx;
					}
				}
				text{
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
					line-height: 40rpx;
				
				}
			}
			
		}
		.shareBox{
			border-left: 2rpx solid #EDEFF2;
			padding: 0 40rpx;
			height: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.midBox{
				display: flex;
				align-items: center;
				.img{
					width: 48rpx;
					height: 48rpx;
					background: #9F95FF;
					box-shadow: 0px 0px 26rpx 0px rgba(159, 149, 255, 0.25);
					border-radius: 50%;
					overflow: hidden;
					margin-right: 8rpx;
					image{
						width: 48rpx;
						height: 48rpx;
					}
				}
				text{
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
					line-height: 40rpx;
				
				}
			}
		}
	}
	// 评论框
	.commentInput {
		width: 100%;
		height: 200rpx;
		position: fixed;
		background: #ffffff;
		bottom: 0;
		display: flex;
		z-index: 110;
		.inputK {
			height: 28rpx;
			width: 558rpx;
			background: #F8F8F8;
			border-radius: 4px;
			margin: 16rpx 32rpx;
			padding: 20rpx 16rpx;
		}
	
		.send {
			height: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #0091FF;
			line-height: 32rpx;
			margin-top: 36rpx;
			z-index: 200;
		}
	}
	// 提示框
	.slot-content{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
		line-height: 36rpx;
		text-align: center;
		padding: 60rpx 24rpx 0 ;
		.sucIcon{
			width: 68rpx;
			height: 68rpx;
		}
		.text{
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #303133;
			margin-top: 32rpx;
			margin-bottom: 20rpx;
		}
		.wechatImg{
			margin: 40rpx 0rpx 26rpx;
			width: 620rpx;
			height: 452rpx;
		}
	}
</style>
