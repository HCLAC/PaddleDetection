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
			<view class="city" @click="show = true">
				<text>贵州</text>
				<image src="../../static/images/more-down.svg" mode=""></image>
			</view>
			<view class="cardList">
				<view class="cards">
					<view class="cardsleft">
						<image src="../../static/images/16460799831121.5efb7ae58999c.jpg" mode=""></image>
						<view class="rankNum">
							TOP1
						</view>
					</view>
					<view class="cardsright">
						<view class="title">
							爽爽贵阳
						</view>
						<view class="contentText">
							最好的领导是做心灵的导航仪而 不是做赶车人都懂得
						</view>
						<view class="rateBox" >
							<!-- <uni-rate  :readonly="true" allow-half :value="rate" /> -->
							<!-- 评分图标 -->
							<view class="rateStart" v-if="rate == 5">
								<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 4">
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 3">
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 2">
								<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 1">
								<image src="../../static/images/star_svg/star-1.svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 4.5">
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1备份(3).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 3.5">
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1备份(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 2.5">
								<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1备份(1).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 1.5">
								<image src="../../static/images/star_svg/star-1.svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1备份.svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 0.5">
								<image src="../../static/images/star_svg/star-1备份.svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<!-- <u-rate :disabled="true" current="4"></u-rate> -->
							<view class="rate">{{rate}} 星</view>
						</view>
					</view>
				</view>
				<view class="cards">
					<view class="cardsleft">
						<image src="../../static/images/16460799831121.5efb7ae58999c.jpg" mode=""></image>
						<view class="rankNum">
							TOP2
						</view>
					</view>
					<view class="cardsright">
						<view class="title">
							爽爽贵阳
						</view>
						<view class="contentText">
							最好的领导是做心灵的导航仪而 不是做赶车人都懂得
						</view>
						<view class="rateBox" >
							<!-- <uni-rate  :readonly="true" allow-half :value="rate" /> -->
							<!-- 评分图标 -->
							<view class="rateStart" v-if="rate == 5">
								<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 4">
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 3">
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 2">
								<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 1">
								<image src="../../static/images/star_svg/star-1.svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 4.5">
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1备份(3).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 3.5">
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1备份(2).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 2.5">
								<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1备份(1).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 1.5">
								<image src="../../static/images/star_svg/star-1.svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1备份.svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="rate == 0.5">
								<image src="../../static/images/star_svg/star-1备份.svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
								<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							</view>
							<!-- <u-rate :disabled="true" current="4"></u-rate> -->
							<view class="rate">{{rate}} 星</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="shareBox">
			<image src="../../static/images/shareImg.svg" mode="" @click="share"></image>
		</view>
		<!-- 城市选择弹窗 -->
		<u-popup v-model="show" mode="top" height="383px">
			<u-navbar :is-back="false"   >
				<view class="slot-wrap" >
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="navtitle">
					领途羊
				</view>
			</u-navbar>
			<!-- 城市 -->
			<view class="nowcity">
				<text>浙江</text>
				<image src="../../static/images/more-down.svg" mode=""></image>
			</view>
			<!-- 城市选择列表 -->
			<view class="u-menu-wrap">
				<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
					<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
					 :data-current="index" @tap.stop="swichMenu(index)">
						<text class="u-line-1">{{item.name}}</text>
					</view>
				</scroll-view>
				<block v-for="(item,index) in tabbar" :key="index">
					<scroll-view scroll-y class="right-box" v-if="current==index">
						<view class="page-view">
							<view class="class-item">
								<view class="item-title">
									<text>{{item.name}}</text>
								</view>
								<view class="item-container">
									<view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
										<image class="item-menu-image" :src="item1.icon" mode=""></image>
										<view class="item-menu-name">{{item1.name}}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</block>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import classifyData from '@/components/common/classify.data.js';
	export default {
		data() {
			return {
				background: {
					// backgroundColor: '#001f3f',
					background:'url(https://lingtuyang-dev.oss-cn-hangzhou.aliyuncs.com/site_images/40/74ee9d6e0880a56d076bcf94bf2bc07b.png?x-oss-process=image/watermark,image_d2F0ZXJtYXJrLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxQXzg=,g_sw,x_30,y_10) no-repeat rgba(0,0,0,0.35)'
				},
				rate:3.5,
				show:false,
				tabbar: classifyData,
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		onLoad() {
			
		},
		
		methods: {
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if(index == this.current) return ;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if(this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			
			
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
			// 分享
			share(){
				uni.showShareMenu({
					
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
	.city{
		width: 124rpx;
		height: 60rpx;
		background: #FFE512;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 28rpx;
		text{
			height: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 32rpx;
			margin-right: 8rpx;
		}
		image{
			width: 16rpx;
			height: 18rpx;
		}
	}
	.cardList{
		width: 702rpx;
		margin-left: 28rpx;
	}
	.cards{
		display: flex;
		align-items: center;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #EDEFF2;
		margin-bottom: 20rpx;
	}
	.cardsleft{
		width: 262rpx;
		height: 198rpx;
		border-radius: 16rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
			border-radius: 16rpx;
			
		}
		.rankNum{
			width: 88rpx;
			height: 44rpx;
			background: linear-gradient(90deg, #FF5A79 0%, #FF74B4 100%);
			border-radius: 16rpx 0px 16rpx 0px;
			font-size: 24rpx;
			font-family: HelveticaNeue-Bold, HelveticaNeue;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 44rpx;
			text-align: center;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
	.cardsright{
		margin-left: 20rpx;
		margin-right: 28rpx;
	}
	.title{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 32rpx;
		margin-bottom: 20rpx;
	}
	.contentText{
		height: 70rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 36rpx;
		margin-bottom: 20rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.rateBox{
		display: flex;
		align-items: center;
	}
	.rateStart{
		display: flex;
		align-items: center;
		margin-right: 8rpx;
		image{
			width: 28rpx;
			height: 28rpx;
			margin-right: 8rpx;
		}
	}
	.rate{
		font-size: 24rpx;
		font-family: HelveticaNeue;
		color: #606266;
		line-height: 24rpx;
	}
	.shareBox{
		position: fixed;
		right: 18rpx;
		bottom: 232rpx;
		z-index: 1112;
		width:124rpx;
		height:124rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	// 弹窗
	.navtitle{
		font-size: 38rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 38rpx;
		margin-left: 180rpx;
	}
	.nowcity{
		margin: 40rpx;
		display: flex;
		align-items: center;
		margin-left: 40rpx;
		text{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 28rpx;
			margin-right: 8rpx;
		}
		image{
			width: 11.4rpx;
			height: 11.4rpx;
		}
	}
	// 列表
	.u-menu-wrap {
		height: 574rpx;
		flex: 1;
		display: flex;
		overflow: hidden;
	}
	
	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}
	
	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}
	
	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}
	
	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}
	
	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
