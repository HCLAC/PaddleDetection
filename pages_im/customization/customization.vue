<template>
	<view class="box">
		<!-- 顶部banner图 -->
		<view class="banner-box">
			<image src="https://cache.lingtuyang.cn/web_static/dz-banner.png" mode=""></image>
		</view>
		<!-- 内容框 -->
		<view class="content">
			<!-- 标题 -->
			<view class="title">
				<view class="title-txt">
					选择你的旅行方式
				</view>
				<view class="title-img">
					<image src="https://cache.lingtuyang.cn/web_static/xc-border.png" mode=""></image>
				</view>
			</view>
			<view class="title-time">
				计划出行时间
			</view>
			<!-- 步数器 -->
			<view class="time">
				<view class="time-txt">
					游玩天数
				</view>
				<u-number-box :disabledInput='true' :size="28" :input-width="76" :input-height="60" v-model="value" @change="valChange"></u-number-box>
			</view>
			<view class="title-mode">
				推荐方式
			</view>
			<!-- 省份城市选择 -->
			<view class="mode">
				<view :class="mode ? 'mode-state' : 'mode-city'" @click="stateChange">
					按省份
				</view>
				<view :class="mode ? 'mode-city' : 'mode-state'" style="margin-left: 20rpx;" @click="cityChange">
					按城市
				</view>
			</view>
			<!-- 省份图片选择 -->
			<view class="title-want">
				我想去的省份
			</view>
			<view class="want-province" @click="provinceImg">
				<u-icon color="#909399" size="44" name="plus"></u-icon>
			</view>
			<!-- 城市图片选择 -->
			<view class="title-want" v-if="!mode">
				我想去的城市
			</view>
			<view class="want-province" @click="provinceImg" v-if="!mode">
				<u-icon color="#909399" size="44" name="plus"></u-icon>
			</view>
			<!-- button -->
			<view class="btn" @click="submit">
				开始制定行程
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:0,//步进器
				mode:true,
			};
		},
		onLoad(e){
			console.log(e,'eee')
		},
		methods:{
			//步进器函数
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			//选择省份
			stateChange(){
				this.mode = true
			},
			//选择城市
			cityChange(){
				this.mode = false
			},
			//选择省份的图片
			provinceImg(){
				uni.navigateTo({
					url:'/pages_im/provinceImg/provinceImg'
				})
			},
			//提交按钮
			submit(){
				uni.navigateTo({
					url:'/pages_im/tripForm/tripForm'
				})
			},
		}
	}
</script>

<style lang="scss">
.box{
	position: relative;
	.banner-box{
		width: 100%;
		height: 524rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.content{
		width: 694rpx;
		// height: 1016rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 56rpx 0px rgba(178, 178, 178, 0.5);
		border-radius: 40rpx;
		position: absolute;
		top: 348rpx;
		left: 28rpx;
		padding: 0 40rpx;
		.title{
			width: 100%;
			height: 138rpx;
			position: relative;
			padding-top: 50rpx;
			.title-txt{
				position: relative;
				font-size: 36rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #303133;
				z-index: 10;
			}
			.title-img{
				position: absolute;
				top: 72rpx;
				width: 288rpx;
				height: 20rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.title-time{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
		}
		.time{
			width: 100%;
			height: 100rpx;
			border: 2rpx solid #EDEFF2;
			border-left:none;
			border-right:none;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.time-txt{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #909399;
			}
		}
		.title-mode{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			margin-top: 36rpx;
		}
		.mode{
			display: flex;
			padding-top: 30rpx;
			.mode-state{
				width: 144rpx;
				height: 60rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 2rpx solid #E41D54;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #E21B5D;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.mode-city{
				width: 144rpx;
				height: 60rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 2rpx solid #606266;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
				display: flex;
				justify-content: center;
				align-items: center;
				
			}
		}
		.title-want{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			border-top: 2rpx solid #EDEFF2;
			margin-top: 40rpx;
			padding-top: 40rpx;
		}
		.want-province{
			width: 176rpx;
			height: 176rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 30rpx;
			background-image: url(https://cache.lingtuyang.cn/web_static/dz-border.png);
			background-size: 100%;
			background-origin: center center;
		}
		.btn {
			width: 100%;
			height: 96rpx;
			background: #FFE512;
			border-radius: 16rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			margin-top: 60rpx;
			margin-bottom: 100rpx;
		}
	}
}
</style>
