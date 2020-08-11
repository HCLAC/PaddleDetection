<template>
	<view class="content">
		<image src="../../static/images/mineBack.png" class="backImg"></image>
		<!-- 用户信息 -->
		<view class="usermes">
			<image class="userAva" :src="avatarUrl"></image>
			<view class="userR">
				<view class="userName">{{ nickName }}</view>
<!-- 				<view class="logout">退出登录</view>
 -->			</view>
		</view>
		<!-- 我的收藏 -->
		<view class="myCollection">
			<view class="phone"><image class="phoneImg" src="../../static/images/phone.png" mode=""></image></view>
			
			<view>我的收藏</view>
			
			<view class="contentItem" v-for="(item, index) in tipList" :key="index">
				<view class="left">
					<image :src="item.main_image" mode="">
						<view class="imgTip">
							<view  v-if="item.type==0">
								游记
							</view>
							<view  v-if="item.type==1">
								攻略
							</view>
						</view>
					</image>
				</view>
				<view class="right" @click="onPageJump" :id= "item.article_id">
					<view class="title">
						<view  v-if="item.type==0">
							游记
						</view>
						<view  v-if="item.type==1">
							攻略
						</view>
						| {{item.title}}</view>
						<view class="content">
							<rich-text class="" :nodes="item.content"></rich-text> 
						</view>
					<view class="position">
						<image src="../../static/images/Icon／Map.svg" mode=""></image>
						<view>{{item.location}}</view>
					</view>
				</view>
			</view>
			<view class="noContent" v-show="tipList != null">~我也是有底线的~</view>
		
			<view class="noContentItem" v-show="tipList == null">
				<image src="../../static/images/wenjianjia.png" mode=""></image>
				<view class="tipText">您的收藏夹空空如也~</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import httpType from '../../httpType.js';

export default {
	data() {
		return {
			nickName:"",
			avatarUrl:"",
			tipList:[]
		};
	},
	computed: mapState(['forcedLogin', 'hasLogin', 'phone']),
	
	
	onShow() {
		this.getUserMsg()
		
	},
	methods: {
		getUserMsg(){
			var that = this
			uni.getProvider({
			    service: 'oauth',
			    success: function (res) {
			        console.log(res.provider)
			        if (~res.provider.indexOf('baidu')) {
			            uni.login({
			                provider: 'baidu',
			                success: function (loginRes) {
			                    // console.log(JSON.stringify(loginRes));
			                }
			            });
			        }
			    }
			});
			uni.login({
			  provider: 'baidu',
			  success: (loginRes) => {
			    // console.log(loginRes.authResult);
			  }
			});
			uni.login({
			  provider: 'baidu',
			  success: (loginRes) => {
			    // console.log(loginRes.authResult);
			    // 获取用户信息
			    uni.getUserInfo({
			      provider: 'baidu',
			      success:  (infoRes) => {
			        console.log('用户昵称为：' + infoRes.userInfo.nickName);
					var infoRes = infoRes.userInfo
					console.log(infoRes.nickName)
					this.nickName = infoRes.nickName
					this.avatarUrl = infoRes.avatarUrl
					uni.setStorageSync('nickName',infoRes.nickName)
			      }
			    })
				
			  }
			});
			
			uni.getStorage({
				key:'Authorization',
				success:function(res){
					console.log("token===>",res.data)
					// uni.request({
					// 	url:'http://121.40.30.19/user/info',
					// 	header:{
					// 		'Authorization':res.data
					// 	},
					// 	success:function(res){
					// 			console.log('个人信息',res)
					// 	}
					// })
				}
			}),
			
			uni.request({
				url:"http://121.40.30.19/user/info",
				header:{
					'Authorization':uni.getStorageSync('Authorization')
				},
				method:'get',
				success:function(res){
					console.log('个人信息=',res.data)
					if (res.data.code != 0) {
						// debugger
						uni.showModal({
							title: '提示',
							content: '您好，请先登录',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.redirectTo({
										url: '../login/login'
									})
								}
							}
						})
						return
					}
					uni.setStorageSync('mobile',res.data)
					console.log('存储信息',res.data)
					that.tipList = res.data.data.favorites.list
					console.log('1111111',that.tipList)
					
				}
			})
			
		},
		// 跳转文章详情
		onPageJump(e) {
			console.log(e)
			let id = e.currentTarget.id
			// debugger
			// return
			uni.navigateTo({
				url: "/pages/contentdetail/contentdetail?article_id="+id
			})
		},
		
		...mapMutations(['login']),
		
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
// .hello {
// 	display: flex;
// 	flex: 1;
// 	flex-direction: column;
// }

// .title {
// 	color: #8f8f94;
// 	margin-top: 25px;
// }

// .ul {
// 	font-size: 15px;
// 	color: #8f8f94;
// 	margin-top: 25px;
// }

// .ul > view {
// 	line-height: 25px;
// }
// /* 用户信息 */
.usermes {
	padding-top: 174rpx;
	height: 130rpx;
	display: flex;
	align-items: center;
}
.userAva {
	margin-left: 15px;
	width: 130rpx;
	height: 130rpx;
	// border: 1px #333333 solid;
	border-radius: 50%;
	margin-top: 86rpx;
}
.userR {
	margin-left: 32rpx;
	margin-top: 104rpx;
}
.userName {
	font-size: 36rpx;
	font-weight: 500;
	color: #303133;
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
	border-radius: 40rpx 40rpx 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	height: 180rpx;
	font-size: 40rpx;
	font-weight: 500;
	padding-left: 32rpx;
	padding-top: 52rpx;
	position: relative;
	top: 190rpx;
	position: relative;
	.phone {
		height: 120rpx;
		width: 120rpx;
		border-radius: 50%;
		position: absolute;
		top: -60rpx;
		right:32rpx;
	}
	.phone .phoneImg {
		width: 120rpx;
		height: 120rpx;
	}
}
.noContentItem{
	height: 600rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	image{
		width: 154rpx;
		height: 122rpx;
		position: fi;
	}
	.tipText{
		font-size:28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(144,147,153,1);
		line-height:30rpx;
		margin-top: 40rpx;
	}
}
.noContent {
	font-size: 22rpx;
	color: rgba(201, 202, 209, 1);
	// color: red;
	text-align: center;
	margin-top: 80rpx;
}

.contentItem {
	width:694rpx;
	height:230rpx;
	margin: 28rpx;
	margin-left: 0;
	border-radius: 8px;
	box-shadow: 4rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.08);
	display: flex;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	.left {
		position: relative;
		.imgTip {
			position: absolute;
			left: 0rpx;
			top: 0rpx;
			font-size: 24rpx;
			line-height: 44rpx;
			font-weight: 500;
			color: #ffffff;
			width: 96rpx;
			height: 44rpx;
			text-align: center;
			background-color: rgba(0,0,0,0.6);
			border-radius: 16rpx 0 16rpx 0;
		}
		image {
			// margin: 8rpx;
			width: 192rpx;
			height: 230rpx;
			margin-right: 20rpx;
			box-shadow:2px 2px 10px 0px rgba(0,0,0,0.08);
			border-radius:16rpx 0 0 16rpx;
		}
	}

	.right {
		margin-top: 40rpx;
		height: 230rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		// white-space: nowrap;
	}
	.right .title {
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(48,49,51,1);
		line-height: 64rpx;
		display: flex;
	}
	.right .content {
		width:448rpx;
		height:70rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #606266;
		line-height: 40rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		// white-space: nowrap;
	}
	.right .position {
		display: flex;
		line-height: 40rpx;
		align-items: center;
		image {
			height: 20rpx;
			width: 20rpx;
			margin-right: 4rpx;
		}
		view {
			font-size: 22rpx;
			color: #0091ff;
			font-weight: 400;
		}
	}
}
</style>
