<template>
	<view class="content">
		<image src="../../static/images/mineBack.png" class="backImg"></image>
		<!-- 用户信息 -->
		<view class="usermes">
			<image class="userAva" src="../../static/images/userImg.png"></image>
			<view class="userR">
				<view class="userName">用户昵称</view>
				<view class="logout">退出登录</view>
			</view>
		</view>
		<!-- 我的收藏 -->
		<view class="myCollection">
			<view>我的收藏</view>
			<view class="contentItem" v-for="(index,item) in tipList" :key="index">
				<view class="left">
					<image src="../../static/images/content.png" mode=""></image>
				</view>
				<view class="right">
					<view class="title">
						攻略 | 愿你踏遍山海觉得人间…
					</view>
					<view class="content">
						语雀是一款优雅高效的在线文档编辑 与协同工具， 让每用户体会到
					</view>
					<view class="position">
						<image src="../../static/images/positionIcon.png" mode=""></image>
						<view>毛里求斯</view>
					</view>
				</view>
			</view>
			<view class="noContent"> 
				~我也是有底线~
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	data() {
		return {
			tipList: [
				{
					key: '1',
					tipTitle: '内容主标题（展示20个字符）',
					tipBody:
						'这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文',
					tipAdress: '洱海·云南省大理市'
				},
				{
					key: '2',
					tipTitle: '内容主标题（展示20个字符）',
					tipBody:
						'这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文',
					tipAdress: '云南'
				},
				{
					key: '3',
					tipTitle: '内容主标题（展示20个字符）',
					tipBody:
						'这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文',
					tipAdress: '大理'
				},
				{
					key: '4',
					tipTitle: '内容主标题（展示20个字符）',
					tipBody:
						'这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文',
					tipAdress: '泸沽湖'
				},
				{
					key: '6',
					tipTitle: '内容主标题（展示20个字符）',
					tipBody:
						'这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文',
					tipAdress: '洱海·云南省大理市'
				},
				{
					key: '7',
					tipTitle: '内容主标题（展示20个字符）',
					tipBody:
						'这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文',
					tipAdress: '洱海·云南省大理市'
				}
			]
		};
	},
	computed: mapState(['forcedLogin', 'hasLogin', 'phone']),
	// onLoad() {

	// 	let uniIdToken = uni.getStorageSync('uniIdToken')
	// 	this.login(uni.getStorageSync('phone'))
	// 	if (uniIdToken) {
	// 		uniCloud.callFunction({
	// 			name: 'user-center',
	// 			data: {
	// 				action: 'checkToken',
	// 			},
	// 			success: (e) => {

	// 				console.log('checkToken success', e);

	// 				if (e.result.code > 0) {
	// 					//token过期或token不合法，重新登录
	// 					if (this.forcedLogin) {
	// 						uni.reLaunch({
	// 							url: '../login/login'
	// 						});
	// 					} else {
	// 						uni.navigateTo({
	// 							url: '../login/login'
	// 						});
	// 					}
	// 				}
	// 			},
	// 			fail(e) {
	// 				uni.showModal({
	// 					content: JSON.stringify(e)
	// 				})
	// 			}
	// 		})
	// 	} else {
	// 		this.guideToLogin()
	// 	}
	// },
	methods: {
		...mapMutations(['login']),
		guideToLogin() {
			if (this.forcedLogin) {
				uni.navigateTo({
					url: '../login/login'
				});
			}
			// uni.showModal({
			// 	title: '未登录',
			// 	content: '您未登录，需要登录后才能继续',
			// 	/**
			// 	 * 如果需要强制登录，不显示取消按钮
			// 	 */
			// 	showCancel: this.forcedLogin,
			// 	success: (res) => {
			// 		if (res.confirm) {
			// 			/**
			// 			 * 如果需要强制登录，使用reLaunch方式
			// 			 */
			// 			if (this.forcedLogin) {
			// 				uni.reLaunch({
			// 					url: '../login/login'
			// 				});
			// 			} else {
			// 				uni.navigateTo({
			// 					url: '../login/login'
			// 				});
			// 			}
			// 		}
			// 	}
			// });
		}
	}
};
</script>

<style lang="scss">
.backImg {
	position: absolute;
	height: 440rpx;
	width: 100%;
	z-index: -21;
}
.hello {
	display: flex;
	flex: 1;
	flex-direction: column;
}

.title {
	color: #8f8f94;
	margin-top: 25px;
}

.ul {
	font-size: 15px;
	color: #8f8f94;
	margin-top: 25px;
}

.ul > view {
	line-height: 25px;
}
/* 用户信息 */
.usermes {
	height: 130px;
	display: flex;
	align-items: center;
}
.userAva {
	margin-left: 15px;
	width: 130rpx;
	height: 130rpx;
	border: 1px #333333 solid;
	border-radius: 50%;
}
.userR {
	margin-left: 25px;
}
.userName {
	font-size: 18px;
	font-weight: 900;
	color: #000000;
	margin-bottom: 8px;
}
.logout {
	margin-top: 4px;
	width: 80px;
	height: 20px;
	font-size: 12px;
	background-color: #f7f7f7;
	border: 1px #b9b9bf solid;
	border-radius: 30px;
	line-height: 20px;
	text-align: center;
}
/* 我的收藏卡片 */

.myCollection {
	border-radius:40rpx 40rpx 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	height: 180rpx;
	font-size: 40rpx;
	font-weight: 500;
	padding-left: 32rpx;
	padding-top: 52rpx;
}
.noContent{
	font-size: 22rpx;
	color: rgba(201,202,209,1);
	text-align: center;
}
	
.contentItem{
	margin: 28rpx;
	margin-left: 0;
	border-radius: 8px;
	box-shadow:4rpx 4rpx 20rpx 0rpx rgba(0,0,0,0.08);
	display: flex;
	.left image{
		margin: 8rpx;
		width:192rpx;
		height:230rpx;
		margin-right:20rpx;
	}
	.right .title{
		font-size: 32rpx;
		font-weight: 500;
		color: #303133;
		line-height: 64rpx;
	}
	.right .content{
		font-size: 28rpx;
		font-weight: 400;
		color: #606266;
		line-height: 40rpx;
	}
	.right .position{
		display: flex;
		line-height: 40rpx;
		align-items: center;
		image{
			height: 20rpx;
			width: 20rpx;
			margin-right: 10rpx;
		}
		view{
			font-size: 22rpx;
			color: #0091FF;
			font-weight: 400;
		}
	}
}
</style>
