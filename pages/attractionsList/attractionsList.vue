<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.png" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.png" @click="home" />
				</view>
				<view class="slottitle">热门景点</view>
			</uni-nav-bar>
		</view>
		<!-- 卡片列表 -->
		<view class="content">
			<view class="card" v-for="item in cardList" @click="toAttractionsDetails">
				<text class="title">{{item.title}}</text>
				<view class="cardContent">{{item.content}}</view>
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" display-multiple-items="3" >
								<swiper-item>
									<view class="swiper-item uni-bg-red">A</view>
								</swiper-item>
								<swiper-item>
									<view class="swiper-item uni-bg-green">B</view>
								</swiper-item>
								<swiper-item>
									<view class="swiper-item uni-bg-blue">C</view>
								</swiper-item>
								<swiper-item>
									<view class="swiper-item uni-bg-red">D</view>
								</swiper-item>
								<swiper-item>
									<view class="swiper-item uni-bg-green">E</view>
								</swiper-item>
								<swiper-item>
									<view class="swiper-item uni-bg-blue">F</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				cardList:[
					{key:"1",title:"玉龙雪山",content:"玉龙雪山在纳西语中被称为“欧鲁”，意为“天山”。其十三座雪峰连绵不绝，宛若一条“巨龙”腾越飞舞，故称为“玉龙”。又因其岩性主要为石灰岩与玄武岩，黑白分明，所以又称为“黑白雪山”。是纳西人的神山，传说纳西族保护神“三多”的化身。"},
					{key:"2",title:"玉龙雪山",content:"玉龙雪山在纳西语中被称为“欧鲁”，意为“天山”。其十三座雪峰连绵不绝，宛若一条“巨龙”腾越飞舞，故称为“玉龙”。又因其岩性主要为石灰岩与玄武岩，黑白分明，所以又称为“黑白雪山”。是纳西人的神山，传说纳西族保护神“三多”的化身。"},
					{key:"3",title:"玉龙雪山",content:"玉龙雪山在纳西语中被称为“欧鲁”，意为“天山”。其十三座雪峰连绵不绝，宛若一条“巨龙”腾越飞舞，故称为“玉龙”。又因其岩性主要为石灰岩与玄武岩，黑白分明，所以又称为“黑白雪山”。是纳西人的神山，传说纳西族保护神“三多”的化身。"},
					{key:"4",title:"玉龙雪山",content:"玉龙雪山在纳西语中被称为“欧鲁”，意为“天山”。其十三座雪峰连绵不绝，宛若一条“巨龙”腾越飞舞，故称为“玉龙”。又因其岩性主要为石灰岩与玄武岩，黑白分明，所以又称为“黑白雪山”。是纳西人的神山，传说纳西族保护神“三多”的化身。"},
				]
			}
		},
		components:{
			uniNavBar
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			home(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			toAttractionsDetails(){
				uni.navigateTo({
					url:"/pages/attractionsDetails/attractionsDetails"
				})
			}
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
		color:rgba(0,0,0,1);
	}
	.button-v-line{
		width: 1px;
		height: 18px;
		background-color: #2f2f2f;
		margin: 0 8px;
	}
	// 卡片样式
	.content{
		background-color: #F8F8F8;
	}
	.card{
		width: 694rpx;
		height: 316rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 8rpx 16rpx 0px rgba(237,237,237,1);
		border-radius:16rpx;
		margin: 20rpx 28rpx;
		display: flex;
		flex-direction: column;
	}
	.title{
		font-size: 32rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		color:rgba(48,49,51,1);
		margin-top: 40rpx;
		margin-left: 28rpx;
		margin-bottom: 20rpx;
	}
	.cardContent{
		width:642rpx;
		height:28rpx;
		font-size:14px;
		line-height: 28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(144,147,153,1);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space:nowrap;
		margin-left: 28rpx;
		margin-right: 24rpx;
		margin-bottom: 20rpx;
	}
	.uni-padding-wrap{
		// width: 280px;
		overflow: hidden;
		margin-left: 28rpx;
	}
	.page-section{
		// width: 280px;
	}
	.swiper{
		height: 136rpx;
	}
	.swiper-item{
		width: 194rpx;
		height: 136rpx;
		border-radius: 8rpx;
		margin-right: 28rpx;
	}
	.uni-padding-wrap{
		// padding: 10px;
	}
	.uni-bg-red{
		background-repeat:no-repeat;
		background-size:100% 100%;
		// background-color: #EA552D;
		background-image: url(../../static/images/photos/15a4e698667005.5ee13e809affe.jpg);
	}
	.uni-bg-green{
		background-repeat:no-repeat;
		background-size:100% 100%;
		// background-color: #4CD964;
		background-image: url(../../static/images/photos/23b32199831121.5efb7ae58b7bc.jpg);
	}
	.uni-bg-blue{
		background-repeat:no-repeat;
		background-size:100% 100%;
		// background-color: #007AFF;
		background-image: url(../../static/images/photos/48d2d599831121.5efb7ae587e4e.jpg);
	}
</style>
