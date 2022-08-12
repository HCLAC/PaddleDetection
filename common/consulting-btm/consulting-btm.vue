<template>
	<view class="answersFollow" >
		<view class="answersLeft">
			<view class="border-img">
				<image src="@/static/images/border-jian.png" mode=""></image>
			</view>
			<view class="left_img">
				<image :src="consulting.avatar ? consulting.avatar : '/static/images/logo.png'" mode=""></image>
			</view>
			<view class="left_txt">
				在线中
			</view>
		</view>
		<view class="answersCenter">
			<view class="center-top">
				<view class="top-left">
					{{consulting.name}}
				</view>
				<view class="top-right">
					{{professionObj1[consulting.profession]}}
				</view>
			</view>
			<view class="center-btm">
				{{consulting.company}}
			</view>
		</view>
		<view class="answersRight" @click="toChatroom">
			<view class="right-img">
				<image src="@/static/images/wz.png" mode=""></image>
			</view>
			<text>咨询Ta</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"consulting-btm",
		props:{
			consulting:{
				type: Object,
				default(){
					return {}
				}
			},
			type: {
				type: Number,
				default: 0
			},
			article_id: {
				type: String,
				default: '0'
			},
			question_id: {
				type: String,
				default: '0'
			},
			uuid: {
				type: String,
				default: '0'
			},
		},
		data() {
			return {
				professionObj1: {
					'0': '导游',
					'1': '旅游达人',
					'2': '旅游定制师'
				},
			};
		},
		methods:{
			toChatroom(){
				this.HTTP.request({
					url: '/bulter/consulting',
					method: 'POST',
					data:{
						bulter_id: this.consulting.bulter_id
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var info = res.data.data
						console.log(info, '管家列表')
						this.toTransform()
						if(info.history.length > 0){
							uni.navigateTo({
								url:'/pages_im/chatroom/chatroom?search_id=' + info.search_id,
							})
						}else{
							uni.navigateTo({
								url:'/pages_im/problem/problem?bulter_id=' + info.bulter_id,
							})
						}
					}
				});
			},
			toTransform(){
				console.log(this.article_id,'+++')
				this.HTTP.request({
					url: '/bulter/transform',
					method: 'POST',
					data:{
						type: this.type,
						article_id:this.article_id,
						question_id:this.question_id,
						uuid:this.uuid,
						bulter_id:this.consulting.bulter_id,
					},
					success: res => {
						console.log(res,'res')
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.answersFollow{
	position:fixed;
	margin:auto;
	left:0;
	right:0;
	bottom:0;
	width: 100%;
	height: 150rpx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: content-box;
	background: #FFFFFF;
	box-shadow: 0px -16rpx 56rpx 0px rgba(0, 0, 0, 0.05);
	display: flex;
	// align-items: center;
	// justify-content: space-between;
	z-index: 10;
	.answersLeft{
		position: relative;
		// margin-left: 26rpx;
		left: 26rpx;
		margin-top: 18rpx;
		.border-img{
			width: 108rpx;
			height: 108rpx;
			position: absolute;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.left_img{
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
			overflow: hidden;
			position: absolute;
			left: 10rpx;
			top: 10rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.left_txt{
			width: 70rpx;
			height: 34rpx;
			background: #FFE512;
			border-radius: 8rpx;
			font-size: 18rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #303133;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 88rpx;
			left: 20rpx;
		}
	}
	.answersCenter{
		margin-left: 152rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.center-top{
			display: flex;
			align-items: center;
			.top-left{
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #303133;
			}
			.top-right{
				margin-left: 20rpx;
				padding: 4rpx 8rpx;
				height: 34rpx;
				background: #EDEFF2;
				border-radius: 8rpx;
				font-size: 18rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.answersRight{
		position: absolute;
		right: 28rpx;
		top: 34rpx;
		width: 196rpx;
		height: 76rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		border: 2rpx solid #303133;
		display: flex;
		align-items: center;
		.right-img{
			width: 56rpx;
			height: 56rpx;
			margin-left: 20rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		text{
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #303133;
		}
	}
}
</style>
