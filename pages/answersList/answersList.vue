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
		<!-- 回答列表 -->
		<view class="answersList">
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
					<u-parse ref="parse" v-if="answersList" style="overflow: hidden;" lazy-load :tag-style="style"
					 :html="item.content "></u-parse>
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				question_id:'',
				answersList:{},
				style: {
					img: 'border-radius: 16rpx'
				}
			};
		},
		onLoad(question_id) {
			console.log(question_id)
			this.question_id = question_id.question_id
			this.getanswersList()
		},
		methods:{
			getanswersList(){
				uni.request({
					url: this.globalUrl + '/answers/list',
					data: {
						question_id: this.question_id,
						page:1,
						count:10
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('回复列表',res)
						this.answersList = res.data.data.list
					}
				});
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
	// 回复列表
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
