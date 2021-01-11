<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<!-- 问题详情卡片 -->
		<view class="detailCard" v-if="detail">
			<view class="cardTopBox">
				<view class="cardTop">
					<view class="cardTopText">
						领途羊·旅行问答
					</view>
					<view class="cardFollow" v-if="!detail.is_follow" @click="Fllow()">
						关注
					</view>
					<view class="cardIsFollow" v-if="detail.is_follow" @click="Fllow()">
						已关注
					</view>
				</view>
				<view class="cradTitle">
					{{detail.title}}
				</view>
				<view class="cardTipsBox">
					<view class="cardTips" v-for="(item,index ) in detail.labels" :key="index" >
						#{{item}}
					</view>
				</view>
				<image class="answersIcon" src="../../static/images/answersIcon.png" mode=""></image>
			</view>
			<view class="cardBottomBox">
				<view class="cardContent">
					<rich-text :nodes="detail.content"></rich-text>
				</view>
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
			</view>
		</view>
		<!-- 问题回答 -->
		<view class="answersTip" v-if="answersNum != 0">
			<text>全部回答·{{answersNum || 0}}</text>
			<view class="answersLine"></view>
		</view>
		<view class="answersList" v-if="answersNum != 0">
			<view class="answersCardBox" v-for=" (item,index) in answersList" :key="index" >
				<view class="answersCardTop">
					<view class="answersAuthor">
						<image :src="item.avatar" mode="" v-if="item.avatar"></image>
						<image src="../../static/images/userImg.svg" v-if="!item.avatar" mode=""></image>
						<view class="userName">
							{{item.account_id}}
						</view>
					</view>
					<view class="answersDate">
						{{item.create_at.slice(0,10)}}
					</view>
				</view>
				<view class="answersCardContent">
					{{item.content}}
				</view>
				<view class="answersCardBottom">
					<view class="acbr">
						<view class="answersLike" @click="like(item,index) in answersList">
							<image src="../../static/images/aLike.svg" v-if="item.option == 0 || item.option == 2" mode=""></image>
							<image src="../../static/images/aLikeActive.svg" v-if="item.option == 1" mode=""></image>
							<text>{{item.like}}</text> 
						</view>
						
						<view class="answersDisLike" @click="disLike(item,index) in answersList">
							<image src="../../static/images/aDisLike.svg" v-if="item.option == 0 || item.option == 1" mode=""></image>
							<image src="../../static/images/aDisLikeActive.svg" v-if="item.option == 2" mode=""></image>
							<text>{{item.dislike}}</text>
						</view>
					</view>
				</view>
				<view class="answersLine">
				</view>
			</view>
			<view class="moreAnswers" @click="moreAnswers()" v-if="answersNum > 3">
				查看全部{{answersNum}}条回答
			</view>
		</view>
		<view class="answersNull" v-if="answersNum == 0">
			还没有收到回答
		</view>
		<!-- 我要提问按钮 -->
		<view class="myAnswersBtn" @click="commentInput" v-if="!textareafocus">
			<image src="../../static/images/followIcon.svg" mode=""></image>
			<view class="mabt">
				我来回答
			</view>
		</view>
		<!-- 输入框 -->
		<view class="commentInput" v-if="textareafocus" :style="{bottom : inputbottom.bottom}">
			<textarea class="inputK" v-model="content" placeholder="快来写下你的回答吧" :show-confirm-bar="false" :focus="textareafocus"
			 @blur="inputBlur" @focus="inputFocus" :auto-height="autoHeight" @input="inputValue" maxlength="140" cursor-spacing="20"
			 :adjust-position="false"></textarea>
			<view class="send" @click="pubComment">发送</view>
		</view>
		<!-- 相关问题 -->
		<view class="line">	</view>
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
						<view class="tQCParse">
							{{item.content}}
							<!-- <u-parse ref="parse"  style="overflow: hidden;" lazy-load
							 :html="item.content"></u-parse> -->
						</view>
					</view>
				</view>
			</view>
			<view class="tQNull" v-if="questions.length == 0">
				暂无相关问题
			</view>
		</view>
		<!-- 弹窗 -->
		<u-modal v-model="show" :content="content" :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
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
				content: '',
			};
		},
		onLoad(question_id) {
			console.log(question_id)
			this.question_id = question_id.question_id
			console.log(this.question_id)
			this.getQuestionsDetail()
			this.getanswersList()
			this.getQuestionsRelated()
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
					}
				});
			},
			// 获取相关问题
			getQuestionsRelated(){
				uni.request({
					url: this.globalUrl + '/questions/related',
					data: {
						question_id: this.question_id,
						count:2
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
			getanswersList(){
				uni.request({
					url: this.globalUrl + '/answers/list',
					data: {
						question_id: this.question_id,
						page:1,
						count:3
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('回复列表',res)
						this.answersNum = res.data.data.total
						this.answersList = res.data.data.list
					}
				});
			},
			// 查看全部回答
			moreAnswers(){
				
				uni.navigateTo({
					url: '/pages/answersList/answersList?question_id=' + this.question_id
				});
			},
			// 跳转问题详情
			toQuestionsDetail(item){
				console.log(item)
				var question_id = item.question_id
				uni.navigateTo({
					url: '/pages/questionsDetail/questionsDetail?question_id=' + question_id
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
						this.content = ''
						uni.hideKeyboard()
						// this.$refs.comment.toggleMask('none');
						this.getanswersList()
						console.log('pinglun', res.data)
						if (res.data.code == 10501) {
							uni.navigateTo({
								url: '../login/login'
							});
						} else {
			
							if (res.data.code == 15001) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 2000
								})
							} else {
								if (res.data.code != 0) {
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
					that.content = '确认取消关注?'
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
									url: '../login/login'
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
								url: '../login/login'
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
				var answer_id = e.$orig.answer_id
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
								url: '../login/login'
							});
						} else {
							console.log(res)
							this.getanswersList()
							// this.answersList[index].option = e.$orig.option == 1 ? 0 : 1
						}
					}
				});
			},
			// 点踩
			disLike(e,index){
				console.log(e)
				var answer_id = e.$orig.answer_id
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
								url: '../login/login'
							});
						} else {
							console.log(res)
							this.getanswersList()
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
					url: '/pages/index/index'
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
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
		margin-left: 40rpx;
		margin-right: 20rpx;
	}
	.fhsy{
		width: 40rpx;
		height: 40rpx;
	}
	.slottitle{
		margin-left: 162rpx;
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
			border-radius: 16rpx 16rpx 0rpx 0rpx;
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
				margin-left: 28rpx;
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
		margin: 0px 32rpx;
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
					image{
						width: 68rpx;
						height: 68rpx;
						border-radius: 50%;
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
							margin-right: 28rpx;
							display: flex;
							align-items: center;
							image{
								width: 44rpx;
								height: 44rpx;
							}
							text{
								height: 28rpx;
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #606266;
								line-height: 28rpx;

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
								height: 28rpx;
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #606266;
								line-height: 28rpx;
							
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
			margin-bottom: 80rpx;
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
	// 旅途问答
	.travelQuestionsBox{
		margin: 28rpx;
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
						font-size: 40rpx;
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
					.tQCParse{
						font-size: 30rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #606266;
						line-height: 42rpx;
						overflow:hidden; 
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;

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
	// 评论框
	.commentInput {
		width: 100%;
		position: fixed;
		background: #ffffff;
		display: flex;
		align-items: center;
	
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
</style>
