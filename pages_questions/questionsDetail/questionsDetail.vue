<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 问题详情卡片 -->
		<view class="detailCard" v-if="detail">
			<view class="cardTopBox">
				<view class="cardTop">
					<view class="cardTopText">
						领途羊·旅行问答
					</view>
					<!-- <view class="cardFollow" v-if="!detail.is_follow" @click="Fllow()">
						关注
					</view>
					<view class="cardIsFollow" v-if="detail.is_follow" @click="Fllow()">
						已关注
					</view> -->
				</view>
				<view class="cradTitle">
					{{detail.title}}
				</view>
				<view class="cardTipsBox">
					<view class="cTL">
						<view class="cardTips" v-for="(item,index ) in detail.labels" :key="index" >
							#{{item}}
						</view>
					</view>
					
					<view class="questionsDate">
						{{detail.account_name}}问于{{create_at}}
					</view>
				</view>
				<image class="answersIcon" src="../../static/images/answersIcon.png" mode=""></image>
			</view>
			<!-- <view class="cardBottomBox">
				
				<view class="cardAuthorBox">
					<view class="author">
						<image class="userImg" src="../../static/images/userImg.svg" v-if="!detail.avatar" mode="" ></image>
						<image class="userImg" :src="detail.avatar" v-if="detail.avatar" mode="" ></image>
						<view class="authorName">
							{{detail.account_name}}
						</view>
					</view>
					<view class="questionsDate">
						问于{{create_at}}
					</view>
				</view>
			</view> -->
		</view>
		<!-- 问题回答 -->
		<view class="answersTip" v-if="answersNum != 0">
			<text>全部回答·{{answersNum || 0}}</text>
			<view class="answersLine"></view>
		</view>
		<view class="answersList" v-if="answersNum != 0">
			<view class="answersCardBox" >
				<view class="answersCardTop">
					<view class="answersAuthor" onclick="popup('zoom-in')">
						<view class="avatar ldx infinite ldx-zoom-in" >
							
						</view>
						<image class="avatarImg" :src="answersList.avatar" mode="" v-if="answersList.avatar"></image>
						<image class="avatarImg" src="../../static/images/userImg.svg" v-if="!answersList.avatar" mode=""></image>
						
						<view class="userName">
							{{answersList.account_id}}
						</view>
						<image class="gficon" src="../../static/images/gficon.svg" mode="" v-if="answersList.account_type == 1"></image>
					</view>
					<view class="answersDate">
						{{answersDate.slice(0,10) }}
					</view>
				</view>
				<view class="answersCardContent">
					<u-parse ref="parse" v-if="answersList" style="overflow: hidden;" lazy-load :tag-style="style" 
					 :html="answersList.content "></u-parse>
				</view>
				
				<view class="answersCardBottom">
					<view class="acbr">
						<view class="answersLike" @click="like(answersList)">
							<image src="../../static/images/aLike.svg" v-if="answersList.option == 0 || answersList.option == 2" mode=""></image>
							<image src="../../static/images/aLikeActive.svg" v-if="answersList.option == 1" mode=""></image>
							<text>{{answersList.like == 0 ? '赞同' : answersList.like}}</text> 
						</view>
						
						<view class="answersDisLike" @click="disLike(answersList)">
							<image src="../../static/images/aDisLike.svg" v-if="answersList.option == 0 || answersList.option == 1" mode=""></image>
							<image src="../../static/images/aDisLikeActive.svg" v-if="answersList.option == 2" mode=""></image>
							<text>{{answersList.dislike == 0 ? '踩' : answersList.dislike}}</text>
						</view>
					</view>
				</view>
				<view class="answersLine">
				</view>
			</view>
			<view class="moreAnswers" @click="moreAnswers()" v-if="answersNum > 1">
				查看全部{{answersNum}}条回答
			</view>
		</view>
		<view class="answersNull" v-if="answersNum == 0">
			还没有收到回答
		</view>
		
		<!-- <view class="myAnswersBtn" @click="commentInput" v-if="!textareafocus">
			<image src="../../static/images/followIcon.svg" mode=""></image>
			<view class="mabt">
				我来回答
			</view>
		</view> -->
		
		<!-- 输入框 -->
		<view class="commentInput" v-if="textareafocus" :style="{bottom : inputbottom.bottom}">
			<textarea class="inputK" v-model="content" placeholder="快来写下你的回答吧" :show-confirm-bar="false" :focus="textareafocus"
			 @blur="inputBlur" @focus="inputFocus" :auto-height="autoHeight" @input="inputValue" maxlength="140" cursor-spacing="20"
			 :adjust-position="false"></textarea>
			<view class="send" @click="pubComment">发送</view>
		</view>
		<!-- 相关问题 -->
		<view class="line">	</view>
		<!-- 营销组件 -->
		<view class="componment" v-if="groupId" onclick="popup('blur-in')">
			<view class="wechat">
				<image :src="answersList.avatar" mode=""></image>
				<view class="wechatText">{{wechat_name}}:{{wechat}}</view>
			</view>
			<view class="wechatBtn ldx infinite ldx-blur-in" @click="templateAdd">复制导游微信</view>
			
		</view>
		<view class="travelQuestionsBox">
			<view class="tQTop">
				<view class="tQTBox">
					<text class="tQText">相关问题</text>
					<view class="tQLine"></view>
				</view>
				
			</view>
			<view class="tQContent" v-if="questions.length != 0">
				<view class="tQCard" v-for="(item,index) in questions " :key="index" @click="toQuestionsDetail(item)">
					<view class="tQCRight">
						<view class="tQCTitle">
							{{item.title}}
						</view>
						<view class="authorBox">
							<view class="author">
								<image :src="item.avatar" mode="" v-if="item.avatar"></image>
								<image src="../../static/images/userImg.svg" mode="" v-if="!item.avatar"></image>
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
			<view class="tQNull" v-if="questions.length == 0">
				暂无相关问题
			</view>
		</view>
		<!-- 我要提问按钮 -->
		<view class="answersFollow" >
			<view class="addBox" @click="commentInput" v-if="!textareafocus">
				<view class="midBox">
					<image src="../../static/images/addQ.svg" mode=""></image>
					<text>添加问答</text>
				</view>
			</view>
			<view class="aFLine"></view>
			<view class="followBox"  @click="Fllow()">
				<view class="midBox">
					<image src="../../static/images/followQ.svg" mode=""></image>
					<text v-if="detail.is_follow == 0">关注问题</text>
					<text v-if="detail.is_follow == 1">已关注</text>
				</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<u-modal v-model="show" :content="contentp" :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
		<u-modal v-model="weshow" width="670rpx" :show-title="false"  :mask-close-able="true" :show-confirm-button="false" :show-cancel-button="false" >
			<view class="slot-content">
				<image class="sucIcon" src="../../static/images/sucIcon.svg" mode=""></image>
				<view class="text">微信已复制</view>
				<rich-text :nodes="wecontent"></rich-text>
				<image class="wechatImg" src="../../static/images/wechatimg.png" mode=""></image>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				question_id:'',
				detail:{},
				create_at:'',
				answersNum:'',
				answersList:{},
				questions:{},
				content: '',
				value: '',
				autoHeight: false,
				inputbottom: {
					bottom: ''
				},
				textareafocus: false,
				show: false,
				weshow:false,
				contentp: '',
				wetitle:'微信已复制',
				wecontent:`
					微信号复制成功<br>
					快去添加微信免费咨询吧`,
				style: {
					img: 'border-radius: 16rpx'
				},
				answersDate:'',
				wechat:'',
				wechat_name:'',
				groupId:''
			};
		},
		onLoad(question_id) {
			console.log(question_id)
			this.question_id = question_id.question_id
			console.log(this.question_id)
			this.getQuestionsDetail()
			// this.getanswersList()
			this.getQuestionsRelated()
			this.getanswersOfficial()
		},
		methods:{
			// 获取问题详情
			getQuestionsDetail(){
				uni.request({
					url: this.globalUrl + '/questions/info',
					data: {
						question_id: this.question_id
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('问题详情',res)
						this.detail = res.data.data
						this.create_at = res.data.data.create_at.slice(0,10)
						this.answersNum = res.data.data.reply_count
					}
				});
			},
			// 获取相关问题
			getQuestionsRelated(){
				uni.request({
					url: this.globalUrl + '/questions/related',
					data: {
						question_id: this.question_id,
						count:6
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('相关问题',res)
						this.questions = res.data.data
					}
				});
			},
			// 获取回复列表
			getanswersOfficial(){
				var that = this
				uni.request({
					url: this.globalUrl + '/answers/official',
					data: {
						question_id: this.question_id
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: async function(res) {
						
						// that.answersNum = res.data.data.total
						
						let strIndex = res.data.data.content.match(/<input[^>]*\/>/gi);
						console.log(strIndex,'strIndex')
						if(strIndex != null){
							let strIdarr = strIndex[0].match(/\d+/g);
							let strId = strIdarr.join('')
							console.log(strId,'strId')
							let resCode =  await that.getTemplate(strId);
							console.log(resCode,'resCode')
							let wechat_id = resCode.data.data.wechat_id.replace(/\s*/g, '');
							let wechat_name = resCode.data.data.wechat_name.replace(/\s*/g, '');
							that.wechat = wechat_id
							that.wechat_name = wechat_name
							that.groupId = strId
							// let str =
							// 	`<div>
							// 		<image src="../../static/images/userImg.svg" style="width:68rpx;height:68rpx;" mode=""></image>
							// 		<span style=" font-size: 28rpx; font-family: 'PingFang SC'; font-weight: 500;">
							// 			详情请加VX：${wechat_id}
							// 		</span><a groupId="${strId}"   group="${wechat_id}" style="color: #0091FF; font-size: 28rpx;margin-left: 36rpx; font-weight: 400;">点击复制</a>
							// 	</div>`;
							
							// res.data.data.content = res.data.data.content.replace(/<input[^>]*\/>/gi, str);
							that.answersList = res.data.data
							that.answersDate = res.data.data.create_at.slice(0.10)
							console.log('官方回复',that.answersList)
						}else{
							uni.request({
								url: that.globalUrl + '/answers/list',
								data: {
									question_id: that.question_id,
									count:10,
									page:1
								},
								header: {
									Authorization: uni.getStorageSync('Authorization')
								},
								success: async function(res) {
									console.log('无官方回答时',res)
									that.answersList = res.data.data.list[0]
									that.answersDate = res.data.data.list[0].create_at.slice(0.10)
								}
							})
						}
						
					}
				})
			},
			// getanswersList(){
			// 	var that = this
			// 	uni.request({
			// 		url: this.globalUrl + '/answers/list',
			// 		data: {
			// 			question_id: this.question_id,
			// 			count:10,
			// 			page:1
			// 		},
			// 		header: {
			// 			Authorization: uni.getStorageSync('Authorization')
			// 		},
			// 		success: async function(res) {
			// 			console.log('回复列表',res)
			// 			if(res.data.data.list != 0){
			// 				 = res.data.data.total
			// 			}else{
			// 				that.answersNum = 1
			// 			}
			// 		}
			// 	})
			// },
			getTemplate(id) {
				if (id) {
					return new Promise((resolve, reject) => {
						uni.request({
							// url:'article',
							url: this.globalUrl + '/marketing/unit',
							method: 'get',
							data: {
								group_id: id,
								article_id: this.article_num
							},
							header: {
								Authorization: uni.getStorageSync('Authorization')
							},
			
							success: res => {
								resolve(res);
							},
							fail: error => {
								reject(error);
							}
						});
					});
				}
			},
			// 点击复制
			templateAdd() {
				// console.log('e', e);
				var that = this
				// if (e.group && e.groupid) {
					uni.request({
						url: this.globalUrl + '/marketing/copy',
						data: {
							id: this.groupId
						},
						method: 'PUT',
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
						success: res => {
							console.log(res,'复制微信')
							uni.hideToast()
							if (res.data.code == 0) {
								uni.setClipboardData({
									data: this.wechat,
									success: () => {
										uni.hideToast()
										this.weshow = true
										setTimeout(function(){
											that.weshow = false
										},3000)
									}
								});
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
							}
						}
					});
				// } else {
				// 	console.log(e);
				// 	e.ignore();
				// 	return false;
				// }
			},
			// 查看全部回答
			moreAnswers(){
				
				uni.navigateTo({
					url: '/pages_questions/answersList/answersList?question_id=' + this.question_id
				});
			},
			// 跳转问题详情
			toQuestionsDetail(item){
				console.log(item)
				var question_id = item.question_id
				uni.navigateTo({
					url: '/pages_questions/questionsDetail/questionsDetail?question_id=' + question_id
				});
			},
			// 提问按钮
			commentInput() {
				this.textareafocus = true
			},
			inputBlur() {
				this.textareafocus = false
				this.inputbottom.bottom = 0 + 'px'
			},
			inputFocus(e) {
				console.log(e.detail,'eeee')
				this.textareafocus = true
				this.inputbottom.bottom = e.detail.height + 'px'
			
			},
			inputValue(e) {
				console.log('eeeee', e.detail.value.length)
				if (e.detail.value.length > 18) {
					this.autoHeight = true
				} else {
					this.autoHeight = false
				}
			},
			pubComment() {
				console.log('发送',this.content)
				uni.request({
					url: this.globalUrl + '/answers',
					data: {
						question_id: this.question_id,
						content: this.content
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						// this.commentsList = res.data.data.list
						console.log('pinglun', res.data)
						if (res.data.code == 10502) {
							uni.navigateTo({
								url: '/pages_mine/login/login'
							});
						} else {
			
							if (res.data.code == 16002) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 2000
								})
							} else {
								if (res.data.code == 500) {
									uni.showToast({
										title: '回答不能为空',
										icon: 'none',
										duration: 2000
									})
								} else {
									uni.showToast({
										title: '回答成功',
										icon: 'none',
										duration: 2000
									})
								}
							}
						}
						this.content = ''
						uni.hideKeyboard()
						// this.$refs.comment.toggleMask('none');
						// this.getanswersList()
						this.getQuestionsDetail()
						this.getanswersOfficial()
			
			
					}
				})
			},
			// 关注
			Fllow() {
				// console.log(item, index)
				var that = this;
				let msg = this.detail.is_follow ? '确认取消关注?' : '确认关注?'
				let status = this.detail.is_follow ? 0 : 1
			
				if (status == 0) {
			
					that.show = true
					that.contentp = '确认取消关注?'
				} else {
					uni.request({
						url: that.globalUrl + '/questions/follow',
						data: {
							question_id: that.question_id
						},
						method: 'POST',
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
						success: (res) => {
							if (res.data.code != 0) {
								// debugger
								uni.navigateTo({
									url: '/pages_mine/login/login'
								});
							} else {
								console.log(res)
								that.detail.is_follow = status == 1 ? true : false
							}
						}
					})
				}
			},
			// 点击确认
			confirm() {
				var that = this;
				let msg = this.detail.is_follow ? '确认取消关注?' : '确认关注?'
				let status = this.detail.is_follow ? 0 : 1
				uni.request({
					url: that.globalUrl + '/questions/follow',
					data: {
						question_id: that.question_id
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: (res) => {
						if (res.data.code != 0) {
							// debugger
							uni.navigateTo({
								url: '/pages_mine/login/login'
							});
						} else {
							console.log(res)
							that.detail.is_follow = status == 1 ? true : false
						}
					}
				})
			},
			// 点赞
			like(e,index){
				console.log(e)
				var answer_id = e.answer_id
				console.log(answer_id)
				uni.request({
					url: this.globalUrl + '/answers/like',
					data: {
						answer_id: answer_id,
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						if (res.data.code != 0) {
				
							uni.navigateTo({
								url: '/pages_mine/login/login'
							});
						} else {
							console.log(res)
							this.getanswersOfficial()
							// this.answersList[index].option = e.$orig.option == 1 ? 0 : 1
						}
					}
				});
			},
			// 点踩
			disLike(e,index){
				console.log(e)
				var answer_id = e.answer_id
				console.log(answer_id)
				uni.request({
					url: this.globalUrl + '/answers/dislike',
					data: {
						answer_id: answer_id,
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						if (res.data.code != 0) {
				
							uni.navigateTo({
								url: '/pages_mine/login/login'
							});
						} else {
							console.log(res)
							this.getanswersOfficial()
							// this.answersList[index].option = e.$orig.option == 1 ? 0 : 1
						}
					}
				});
			},
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 返回首页
			home() {
				uni.switchTab({
					url: '/pagesA/index/index'
				});
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	@import url('../../components/transition-min/transition.min.css');
// 自定义导航栏样式
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #aa557f;
	}
	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}
	.example-body {
		padding: 0;
	}
	.navBar{
		display: flex;
	}
	.slotleft{
		display: flex;
	}
	.fanhui{
		width: 40rpx;
		height: 40rpx;
		margin-left: 42rpx;
		margin-right: 20rpx;
	}
	.fhsy{
		width: 40rpx;
		height: 40rpx;
	}
	/* #ifdef  MP-BAIDU*/
	.fhsy {
		margin-left: 100rpx;
	}
	/*  #endif  */
	.slottitle{
		margin-left: 182rpx;
		font-size: 38rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		color:rgba(0,0,0,1);
	}
	.button-v-line{
		width: 1px;
		height: 18px;
		background-color: #2f2f2f;
		margin: 0 8px;
	}
	// 问题卡片
	.detailCard{
		margin-top: 20rpx;
		margin-left: 32rpx;
		margin-right: 32rpx;
		.cardTopBox{
			position: relative;
			width: 686rpx;
			height: 296rpx;
			background: linear-gradient(270deg, #6BBEFF 0%, #0091FF 100%);
			box-shadow: 0rpx 8rpx 28rpx 0rpx #EDEFF2;
			border-radius: 16rpx;
			.cardTop{
				display: flex;
				
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 28rpx 20rpx;
				.cardTopText{
					width: 210rpx;
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 40rpx;

				}
				.cardFollow{
					width: 100rpx;
					height: 44rpx;
					background: #FFFFFF;
					border-radius: 22rpx;
					text-align: center;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #0091FF;
					line-height: 44rpx;
				}
				.cardIsFollow{
					width: 100rpx;
					height: 44rpx;
					background: rgba(255, 255, 255, 0.35);
					border-radius: 22rpx;
					text-align: center;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #0091FF;
					line-height: 44rpx;

				}
			}
			.cradTitle{
				width: 638rpx;
				height: 120rpx;
				font-size: 44rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
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
		.cardBottomBox{
			width: 686rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 28rpx 0rpx #EDEFF2;
			border-radius: 0rpx 0rpx 16rpx 16rpx;
			.cardContent{
				padding: 20rpx 28rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Light, PingFang SC;
				font-weight: 300;
				color: #606266;
				line-height: 40rpx;
				text-shadow: 0rpx 8rpx 28rpx #EDEFF2;

			}
			.cardAuthorBox{
				padding: 28rpx;
				padding-top: 0rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.author{
					display: flex;
					align-items: center;
					.userImg{
						width: 48rpx;
						height: 48rpx;
						box-shadow: 0rpx 8rpx 28rpx 0rpx #EDEFF2;
						border-radius: 50%;

					}
					.authorName{
						height: 34rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #303133;
						line-height: 34rpx;
						text-shadow: 0rpx 8rpx 28rpx #EDEFF2;
						margin-left: 16rpx;
					}
				}
				.questionsDate{
					width: 188rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
					line-height: 24rpx;
					text-shadow: 0rpx 8rpx 28rpx #EDEFF2;

				}
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
	.answersList{
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
					display: flex;
					align-items: center;
					position: relative;
					.avatar{
						position: relative;
						width: 80rpx;
						height: 80rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 50%;
						&::before {
							content: "";
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							border-radius: 50%;
							border: 2rpx solid gold;
							// transition: all .5s;
							// animation: clippath 3s infinite linear;
						}
					}
					.avatarImg{
						width: 68rpx;
						height: 68rpx;
						border-radius: 50%;
						position: absolute;
						top: 6rpx;
						left: 6rpx;
						
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
						width: 56rpx;
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
								// width: 48rpx;
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
			height: 28rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #0091FF;
			line-height: 28rpx;
			margin-top: 32rpx;
			margin-bottom: 32rpx;
		}
	}
	.answersNull{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 28rpx;
		text-align: center;
		margin: 80rpx 0rpx;

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
					margin-top: -8rpx;
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
							image{
								width: 48rpx;
								height: 48rpx;
								border-radius: 50%;
								margin-right: 16rpx;
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
	.answersFollow{
		position:fixed;
		margin:auto;
		left:0;
		right:0;
		bottom:0;
		width: 100%;
		height: 166rpx;
		background: #FFFFFF;
		box-shadow: 0px -16rpx 56rpx 0px rgba(0, 0, 0, 0.05);
		display: flex;
		// justify-content: space-around;
		z-index: 9999;
		.addBox{
			// margin-top: 24rpx;
			margin-left: 108rpx;
			margin-right: 106rpx;
			height: 98rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.midBox{
				display: flex;
				align-items: center;
				image{
					width: 48rpx;
					height: 48rpx;
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
		.aFLine{
			margin-top: 30rpx;
			width: 1rpx;
			height: 40rpx;
			background: #EDEFF2;

		}
		.followBox{
			// margin-top: 24rpx;
			margin-left: 106rpx;
			margin-right: 108rpx;
			height: 98rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.midBox{
				display: flex;
				align-items: center;
				image{
					width: 48rpx;
					height: 48rpx;
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
		position: fixed;
		background: #ffffff;
		display: flex;
		align-items: center;
		z-index: 99999;
		.inputK {
			height: 28rpx;
			width: 558rpx;
			background: #F8F8F8;
			border-radius: 4px;
			margin: 16rpx 32rpx;
			padding: 20rpx 16rpx;
		}
	
		.send {
			// width: 64rpx;
			height: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #0091FF;
			line-height: 32rpx;
	
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
