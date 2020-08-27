<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="false"  :background="background" height="176" >
			<view class="slot-wrap">
				<image class="fanhui" src="../../static/images/icon-fanhui-white.svg" @click="back" />
				<image class="fhsy" src="../../static/images/icon-fhsy-white.svg" @click="home" />
			</view>
			<view class="content">
				<image src="../../static/images/leftleaves.svg" mode=""></image>
				<text>贵州热门景点</text>
				<image src="../../static/images/rightleaves.svg" mode=""></image>
			</view>
			<view class="rankTime">
				领途羊景点榜单 · 8月27日更新
			</view>
			<view class="boxshow">
				
			</view>
		</u-navbar>
		<!-- 排行 -->
		<view class="rankContent">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					// backgroundColor: '#001f3f',
					background:'url(https://lingtuyang-dev.oss-cn-hangzhou.aliyuncs.com/site_images/40/74ee9d6e0880a56d076bcf94bf2bc07b.png?x-oss-process=image/watermark,image_d2F0ZXJtYXJrLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxQXzg=,g_sw,x_30,y_10) no-repeat rgba(0,0,0,0.35)'
				}
			}
		},
		
		methods: {
			ck() {
				uni.navigateBack({
					delta: 1
				})
			},
			home(){
				uni.switchTab({
					url:"/pages/index/index"
				})
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
	}
	
	.navBar{
		display: flex;
	}
	.slotleft{
		display: flex;
		align-items: center;
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
	}
	.button-v-line{
		width: 1px;
		height: 18px;
		background-color: #2f2f2f;
		margin: 0 8px;
	}
	.content{
		position: absolute;
		top: 82rpx;
		left: 82rpx;
		width: 582rpx;
		height: 140rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:64rpx;
		font-family:AlibabaPuHuiTiM;
		color:rgba(255,255,255,1);
		line-height:64rpx;
		letter-spacing:2rpx;
		background: url(../../static/images/TRAVEL.svg) no-repeat 4rpx 4rpx ;
		text{
			margin: 0 6rpx;
		}
		image{
			width: 40rpx;
			height: 70rpx;
		}
	}
	.rankTime{
		font-size:20rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,0.45);
		line-height:28rpx;
		position: absolute;
		top: 210rpx;
		left: 234rpx;
	}
	.boxshow{
		width:750rpx;
		height:100rpx;
		background:rgba(0,0,0,0.35);
		// background: linear-gradient(rgba(126, 126, 126, 0.0) 100%,rgba(10, 42, 50, 0.0) 100%,rgba(4, 17, 20, 1.0) 100%);
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.rankContent{
		width:730rpx;
		height:1604rpx;
		margin-left: 10rpx;
		background:rgba(255,255,255,1);
		border-radius:8px 8px 0px 0px;
		z-index: 1111;
		position: absolute;
		top: 420rpx;
	}
</style>
