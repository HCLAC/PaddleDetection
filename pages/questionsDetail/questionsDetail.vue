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
		<view class="detailCard">
			<view class="cardTopBox">
				<view class="cardTop">
					<view class="cardTopText">
						领途羊·旅行问答
					</view>
					<view class="cardFollow">
						关注
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
			</view>
			<view class="cardBottomBox">
				<view class="cardContent">
					<rich-text :nodes="detail.content"></rich-text>
				</view>
				<view class="cardAuthorBox">
					<view class="author">
						<image class="userImg" src="../../static/images/userImg.svg" v-if="detail.avatar == null" mode="" ></image>
						<image class="userImg" :src="detail.avatar" v-if="detail.avatar != null" mode="" ></image>
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
		<view class="answersTip">
			<text>全部回答·{{answersNum}}</text>
			<view class="answersLine"></view>
		</view>
		<view class="answersList">
			<view class="answersCardBox" v-for=" (item,index) in answersList" :key="index" >
				<view class="answersCardTop">
					<view class="answersAuthor">
						<image :src="item.avatar" mode=""></image>
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
						<view class="answersLike">
							<image src="../../static/images/aLike.svg" v-if="item.option == 0" mode=""></image>
							<image src="../../static/images/aLikeActive.svg" v-if="item.option == 1" mode=""></image>
							<text>{{item.like}}</text> 
						</view>
						
						<view class="answersDisLike">
							<image src="../../static/images/aDisLike.svg" v-if="item.option == 0" mode=""></image>
							<image src="../../static/images/aDisLikeActive.svg" v-if="item.option == 2" mode=""></image>
							<text>{{item.dislike}}</text>
						</view>
					</view>
				</view>
				<view class="answersLine">
				</view>
			</view>
			<view class="moreAnswers">
				查看全部{{answersNum}}条回答
			</view>
		</view>
		<!-- <view class="line">
			
		</view>
		<view class="travelQuestionsBox">
			<view class="tQTop">
				<view class="tQTBox">
					<text class="tQText">旅途问答</text>
					<view class="tQLine"></view>
				</view>
				
			</view>
			<view class="tQContent">
				<view class="tQCard" v-for="(item,index) in questions " :key="index" @click="toQuestionsDetail(item)">
					<view class="tQCRight">
						<view class="tQCTitle">
							{{item.title}}
						</view>
						<view class="tQCParse">
							<u-parse ref="parse"  style="overflow: hidden;" lazy-load
							 :html="item.content"></u-parse>
						</view>
					</view>
				</view>
			</view>
		</view> -->
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
				answersList:{}
			};
		},
		onLoad(question_id) {
			console.log(question_id)
			this.question_id = question_id.question_id
			console.log(this.question_id)
			this.getQuestionsDetail()
			this.getanswersList()
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
</style>
