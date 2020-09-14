<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">我的关注</view>
			</uni-nav-bar>
		</view>
		<!-- 关注列表 -->
		<view class="concernBox">
			<view class="card">
				<!-- 头像 -->
				<view class="avatar">
					<image src="../../static/images/logo.png" mode=""></image>
				</view>
				<!-- 信息 -->
				<view class="info">
					<view class="nickname">
						迟妍毅
					</view>
					<view class="fansArt">
						<view class="fans">
							粉丝<view class="fansNum">{{fansNum>10000?((fansNum-fansNum%1000)/10000+'w'):fansNum}}</view>
						</view>
						<view class="art">
							文章<view class="artNum">{{artNum}}</view>
						</view>
					</view>
				</view>
				<!-- 关注 -->
				<view class="fllowBox" :style="fllowstyle" @click="Fllow()">
					<text>{{fllowText}}</text>
				</view>
			</view>
		</view>
		<!-- 关注列表为空时 -->
		<view class="empty" v-if="fllowList == null">
			<view class="emptyImg">
				<image src="../../static/images/empty.svg" mode=""></image>
			</view>
			<view class="emptyText">
				您还没有关注任何人，去首页看看吧～
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fansNum:36300,
				artNum:230,
				fllowText:'关注',
				fllowList:1,
				isfllow:0,
				fllowstyle:{
					background:'rgba(255, 229, 18, 1)',
					border:'none',
					color:'rgba(48, 49, 51, 1)'
				}
			};
		},
		methods:{
			// 关注
			Fllow(){
				var that = this;
				if(this.isfllow == 0){
					uni.showModal({
					    title: '确认关注？',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								that.isfllow = 1
								that.fllowstyle.background = '#fff'
								that.fllowstyle.border = '1px solid #DDDDDD '
								that.fllowstyle.color = 'rgba(201, 202, 209, 1)'
								that.fllowText = '已关注'
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					
				}else{
					uni.showModal({
						title:'确认取消关注？',
						success: function (res) {
						    if (res.confirm) {
						        console.log('用户点击确定');
								that.isfllow = 0
								that.fllowstyle.background = 'rgba(255, 229, 18, 1)'
								that.fllowstyle.border = 'none '
								that.fllowstyle.color = 'rgba(48, 49, 51, 1)'
								that.fllowText = '关注'
						    } else if (res.cancel) {
						        console.log('用户点击取消');
						    }
						}
					})
					
				}
				
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			home() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
/* 自定义导航栏样式 */
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
	border-bottom: 1rpx solid rgba(237, 239, 242, 1);
}

.example-body {
	padding: 0;
}

.navBar {
	display: flex;
}

.slotleft {
	display: flex;
	align-items: center;
}

.fanhui {
	width: 40rpx;
	height: 40rpx;
	margin-left: 40rpx;
	margin-right: 20rpx;
}

.fhsy {
	width: 40rpx;
	height: 40rpx;
}

.slottitle {
	margin-left: 162rpx;
	font-size: 38rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 600;
	color: rgba(0, 0, 0, 1);
}

.button-v-line {
	width: 1px;
	height: 18px;
	background-color: #2f2f2f;
	margin: 0 8px;
}
//关注列表
.card{
	margin: 28rpx 0 0 28rpx;
	padding-bottom: 30rpx;
	border-bottom: 1rpx solid rgba(237, 239, 242, 1);
	display: flex;
	align-items: center;
}
.avatar{
	width: 104rpx;
	height: 104rpx;
	border-radius: 50%;
	image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
}
.info{
	margin-left: 20rpx;
	flex: 1;
}
.nickname{
	
	height: 28rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 28rpx;
}
.fansArt{
	margin-top: 16rpx;
	display: flex;
	align-items: center;
}
.fans{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #606266;
	line-height: 24rpx;
	display: flex;
	align-items: center;
}
.fansNum{
	
	height: 24rpx;
	font-size: 24rpx;
	font-family: Roboto-Regular, Roboto;
	font-weight: 400;
	color: #606266;
	line-height: 24rpx;
	margin-left: 8rpx;
}
.art{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #606266;
	line-height: 24rpx;
	display: flex;
	align-items: center;
	margin-left: 20rpx;
}
.artNum{
	height: 24rpx;
	font-size: 24rpx;
	font-family: Roboto-Regular, Roboto;
	font-weight: 400;
	color: #606266;
	line-height: 24rpx;
	margin-left: 8rpx;
}
.fllowBox{
	width: 136rpx;
	height: 52rpx;
	background: #FFE512;
	border-radius: 26rpx;
	text-align: center;
	line-height: 52rpx;
	margin-right: 28rpx;
	color: #303133;
	text{
		height: 14px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		
		line-height: 14px;
	}
	
}
// 列表为空时
.empty{
	margin-top: 350rpx;
	margin-left: 138rpx;
}
.emptyImg{
	width: 148rpx;
	height: 148rpx;
	margin-left: 164rpx;
	margin-bottom: 40rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.emptyText{
	width: 476rpx;
	height: 30rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 30rpx;
}
</style>
