<template>
	<view >
		<view class="example-body" >
			<uni-nav-bar :fixed="true" :status-bar="true" style="z-index: 99999 !important;">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<view class="" v-show="lineContent">
			<!-- 内容详情轮播图 -->
			<view class="uni-padding-wrap">
				<view class="page-section" >
					<view class="page-section-spacing" >
						<swiper @change="change" class="swiper" :autoplay="true" :indicator-dots="false" circular='true'>
							<swiper-item v-for="(item, index) in lineContent.images" :key="index">
								<image class="itemImg" mode="scaleToFill" :src="item"></image>
							</swiper-item>
						</swiper>
						<view class="imageCount">{{ current + 1 }}/{{ lineContent.images.length }}</view>
						<view class="dots">
							<block v-for="(item, index) in lineContent.images" :key="index"><view :class="[index == current ? 'activieDot' : 'dot']"></view></block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="linePrice">
				<text>参考价格</text>
				<text class="price" style="font-size:28rpx; ">￥</text>
				<text class="price">{{ lineContent.money }}</text>
				<text>起</text>
			</view>
			<view class="lineTitle">{{ lineContent.title }}</view>
		</view>
		<view class="lineDriver"></view>
		<view  :class="isFixed ? 'fixTabs' : 'noFix'">
			<view style="width: 60%;display: flex;">
				<view class="tripBox" @click="tripChange">
					<view :class="tabCurrent == 0 ? 'tripText' : 'tripText1'">
						参考行程
					</view>
					<view class="tripLine" v-if="tabCurrent == 0">
					</view>
				</view>
				<view class="serviceBox" @click="serviceChange">
					<view :class="tabCurrent == 1 ? 'tripText' : 'tripText1'">
						服务说明
					</view>
					<view class="serviceLine" v-if="tabCurrent == 1">
					</view>
				</view>
			</view>
		</view>
		<view class="linePlan">
			<view class="planContent" id="planContent">
				<u-time-line >
					<view v-for="(item, index) in lineContent.content" :key="index">
						<u-time-line-item nodeTop="2">
							<!-- 此处自定义了左边内容，用一个图标替代 -->
							<template v-slot:node>
								<view class="u-node" style="background: #BFC2CC ; border-radius: 50%;">
									<!-- 此处为uView的icon组件 -->
									<view style="width: 10rpx; height: 10rpx;"></view>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-title">
										<text class="tui-chat-right">
											<text class="tui-chatbox tui-chatbox-right">D{{ item.day }}</text>
										</text>
										<text class="planTitle">{{ item.title }}</text>
									</view>
									<view class="u-order-desc1">{{ item.description }}</view>
									<view class="u-order-time"></view>
								</view>
							</template>
						</u-time-line-item>
						<view v-for="(eve, eveIndex) in item.event" :key="eveIndex">
							<u-time-line-item>
								<template v-slot:node>
									<view class="uTime">
										<image class="timeIcon" src="/static/images/timeClock.svg"></image>
										<text>{{ eve.time == '上午' ? 'AM' : 'PM' }}</text>
									</view>
								</template>
								<template v-slot:content>
									<view style="height: 40rpx;"></view>
								</template>
							</u-time-line-item>
							<u-time-line-item nodeTop="2">
								<!-- 此处自定义了左边内容，用一个图标替代 -->
								<template v-slot:node>
									<view class="u-node" style="background: #B7EB8F; border-radius: 50%;">
										<!-- 此处为uView的icon组件 -->
										<view style="width: 10rpx; height: 10rpx;"></view>
									</view>
								</template>
								<template v-slot:content>
									<view>
										<view class="u-order-title">
											<text class="stitle">{{ eve.title }}</text>
										</view>
										<view class="u-order-desc">{{ eve.description }}</view>
										<view class="position" v-for="(pos, posIndex) in eve.position" :key="posIndex" @click="toPosition(pos)">
											<view class="left">
												<image :src="pos.cover_url" class="positionImg" mode=""></image>
												<view class="imgTag">景点</view>
											</view>
											<view class="right">
												<view class="title">{{ pos.name }}</view>
												<view class="rateBox">
													<uni-rate :readonly="true" :value="pos.rate" :size='12' margin="1" :allowHalf="true"/>
													<view class="rate" >{{ pos.rate }} 星</view>
												</view>
												<text class="content">{{ pos.description }}</text>
											</view>
										</view>
									</view>
								</template>
							</u-time-line-item>
						</view>
					</view>
				</u-time-line>
				<view class="serverInfo" v-if="lineContent.content">
					<view class="title">服务说明</view>
					<view class="content">{{ lineContent.description }}</view>
					<view class="phone" @click="tell" ><image src="/static/images/serverCall.svg"></image></view>
				</view>
			</view>
			<view class="bottom">
				<!-- 分割线 -->
				<view class="line"></view>
				<!-- 登录 -->
				<view class="contentBottom savepadding">
					<!-- <view class="like">
						<image v-show="!lineContent.fav" class="likeBtn" src="/static/images/attheart.svg"></image>
						<image v-show="lineContent.fav" class="likeBtn" src="/static/images/heart-actived.svg"></image>
						<view class="likeNum">{{ lineContent.like_count }}</view>
					</view>
					<view class="fav" @click="lineFav(lineContent.uuid)">
						<image v-show="!lineContent.fav" class="favBtn" src="/static/images/shouchang.svg"></image>
						<image v-show="lineContent.fav" class="favBtn" src="/static/images/fav-actived.svg"></image>
						<view class="favNum">{{ lineContent.fav_count }}</view>
					</view> -->
					<view><view class="share" v-if="serviceProvider =='baidu'"  @click="share"><image src="/static/images/shareIcon.svg"></image></view></view>
					<view class=""><view class="loginButton" v-if="!hasLogin" @click="login">登录</view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			lineContent: null,
			current: 0,
			tablist: ['参考行程', '服务说明'],
			tabCurrent: 0,
			hasLogin: false,
			isFixed: false,
			serviceProvider: '',
			cardheight:200,
			boxHeight: 2000
		};
	},
	onLoad(options) {
		let id = options.id
		this.hasLogin = uni.getStorageSync('Authorization') ? true : false;
		this.serviceProvider = getApp().globalData.serviceProvider
		this.getDetail(id);
	},
	onPageScroll(e) {
		if (e.scrollTop >=  this.cardheight) {
			this.isFixed = true;
			if(e.scrollTop > (this.boxHeight - 432)){
				this.tabCurrent = 1
			}
		} else {
			this.isFixed = false;
			this.tabCurrent = 0
		}
	},
	methods: {
		getDetail(id) {
			var that = this
			this.HTTP.request({
				url: '/route',
				method: 'GET',
				data: {
					uuid: id
				},
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					res.data.data.content = res.data.data.content && res.data.data.content.length ? JSON.parse(res.data.data.content) : [];
					this.butler_mobile = res.data.data.butler_mobile;
					this.lineContent = res.data.data;
					this.calcHeight()
				}
			});
		},
		calcHeight(){
			setTimeout(() => {
				let view = uni.createSelectorQuery().select("#planContent");
				view.fields({
					rect: true,
					size: true,
				}, data => {
					console.log("得到节点信息" + JSON.stringify(data));
					console.log("节点的高为" + data.height);
					this.boxHeight = data.height
					this.cardheight = data.top
				}).exec();
			}, 500);
		},
		// 切换
		tripChange(){
			this.tabCurrent = 0
			uni.pageScrollTo({
				scrollTop: 0,
			})
		},
		serviceChange(){
			this.tabCurrent = 1
			uni.pageScrollTo({
				scrollTop: this.boxHeight,
				// selector:"serverInfo"
			})
		},
		change(e) {
			this.current = e.detail.current;
		},
		lineFav(id) {
			if (!this.hasLogin) {
				this.login()
				return
			}
			this.HTTP.request({
				url: '/user/favorite',
				method: 'POST',
				header: {},
				data: {
					uuid: id
				},
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
				}
			});
		},
		toPosition(pos) {
			if (pos.id) {
				uni.navigateTo({
					url: '/pages_province/positionContent/positionContent?id=' + pos.id
				});
			}
		},
		login() {
			uni.navigateTo({
				url: '/pages_mine/login/login'
			});
		},
		tell(){
			uni.makePhoneCall({
				phoneNumber:this.butler_mobile
			})
		},
		share() {
			uni.showShareMenu({
			});
		}
	}
};
</script>

<style lang="scss">
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
	margin-left: 42rpx;
	margin-right: 20rpx;
}
.fhsy {
	width: 40rpx;
	height: 40rpx;
}
/* #ifdef  MP-BAIDU*/
.fhsy {
	margin-left: 100rpx;
}
/*  #endif  */
.slottitle {
	margin-left: 182rpx;
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
//导航栏样式end
.page-section-spacing {
	position: relative;
	width: 100%;
	height: 400rpx;
	
}
.swiper {
	width: 100%;
	height: 100%;
}

.itemImg {
	width: 100%;
	height: 100%;
}

.imageCount {
	// width: 90rpx;
	height: 40rpx;
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 20rpx;
	text-align: center;
	line-height: 40rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	position: absolute;
	right: 28rpx;
	bottom: 28rpx;
	padding: 0 12rpx;
}

//标记点样式
.dots {
	width: 100%;
	height: 10rpx;
	display: flex;
	justify-content: center;
	position: absolute;
	/* left: 320rpx; */
	background: #ffff;
	bottom: -30rpx;
	.dot {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background: rgba(221, 221, 221, 1);
		margin-right: 8rpx;
	}

	.activieDot {
		width: 20rpx;
		height: 10rpx;
		background: rgba(48, 49, 51, 1);
		border-radius: 3px;
		margin-right: 8rpx;
	}
}
// swipper样式 end
.container {
	padding: 40rpx 30rpx 32rpx;

	.linePrice {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		.price {
			font-size: 40rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #faad14;
		}
	}
	.lineTitle {
		padding-top: 14rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 48rpx;
	}
}
.lineDriver {
	height: 20rpx;
	width: 100%;
	background: #f8f8f8;
}
.linePlan {
	padding: 10rpx 30rpx;
	padding-bottom: 105rpx;
	.planContent {
		padding: 20rpx 30rpx 30rpx 20rpx;
	}
}
.tui-chatbox::before {
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	top: 20rpx;
	border: 16rpx solid;
}
.tui-chatbox {
	width: 64rpx;
	padding: 0 10rpx;
	height: 40rpx;
	background: #ffe512;
	text-align: center;
	position: relative;
	border-radius: 6rpx;
	font-size: 24rpx;
	font-weight: bold;
	color: #000;
	word-break: break-all;
	word-wrap: break-word;
}
.tui-chatbox-right {
	background: #ffe512;
	border: 1rpx solid #ffe512;
}

.tui-chatbox-right::before {
	top: 3%;
	right: 88%;
	border-color: transparent #ffe512 transparent transparent;
}
.planContent {
	font-family: PingFangSC-Medium, PingFang SC;
	.position {
		position: relative;
		left: -14rpx;
		width: 556rpx;
		height: 172rpx;
		background: #f8f8f8;
		border-radius: 16rpx;
		border: 2rpx solid #edeff2;
		padding: 14rpx 16rpx;
		margin-top: 14rpx;
		margin-bottom: 20rpx;
		display: flex;
		.right {
			margin-left: 10rpx;
			.title {
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
			}
			.content {
				width: 90%;
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #909399;
				line-height: 32rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.rateBox {
				display: flex;
				align-items: center;

				.rate {
					margin-left: 2rpx;
					font-size: 20rpx;
					font-family: HelveticaNeue;
					color: #606266;
				}
				.rateStart {
					image {
						width: 22.4rpx;
						height: 22.4rpx;
						margin-right: 6rpx;
					}
				}
			}
		}
		.left {
			position: relative;

			.positionImg {
				width: 184rpx;
				height: 140rpx;
				border-radius: 12rpx;
			}
			.imgTag {
				width: 60rpx;
				height: 30rpx;
				background: #9fd873;
				border-radius: 12rpx 0px 12rpx 0px;
				position: absolute;
				left: 0;
				top: 0;
				color: #ffffff;
				font-size: 16rpx;
				text-align: center;
				line-height: 30rpx;
			}
		}
	}

	.u-order-title {
		position: relative;
		top: -18rpx;
		left: -18rpx;
	}
	
	.planTitle {
		font-size: 28rpx;
		font-weight: 500;
		color: #303133;
		margin-left: 20rpx;
		font-family: PingFangSC-Medium, PingFang SC;
	}
	.stitle{
		
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 28rpx;
		font-weight: 400;
		color: #303133;
	}
	.u-order-desc {
		font-size: 24rpx;
		color: #606266;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		position: relative;
		left: -14rpx;
		line-height: 36rpx;
	}
	.u-order-desc1 {
		font-size: 24rpx;
		color: #303133;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		position: relative;
		left: -14rpx;
		line-height: 36rpx;
	}
	.u-order-time {
		margin-top: 14rpx;
		position: relative;
		left: -14rpx;
		border-bottom: 0.5px solid #dddddd;
	}

	.uTime {
		display: flex;
		align-items: center;
		margin-left: 45rpx;
		.timeIcon {
			width: 34rpx;
			height: 34rpx;
		}
		text {
			color: #606266;
			font-size: 24rpx;
			margin-left: 10rpx;
		}
	}
}
.u-time-axis-node {
	top: -0.5vw !important;
}
.bottom {
	width: 100%;
	height: 98rpx;
	position: fixed;
	left: 0;
	bottom: var(--window-bottom);
	z-index: 111;
	background-color: #ffffff;
	padding-bottom: 68rpx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: content-box;
}
.line {
	height: 0.5rpx;
	background: rgba(221, 221, 221, 1);
	// margin-top: 84rpx;
}

.contentBottom {
	display: flex;
	align-items: center;
	margin-top: 16rpx;
	padding:0 56rpx;
	justify-content: space-between;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(48, 49, 51, 1);
	line-height: 24rpx;
}

.loginButton {
	width: 156rpx;
	height: 68rpx;
	background: rgba(255, 229, 18, 1);
	border-radius: 20px;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 600;
	color: rgba(48, 49, 51, 1);
	line-height: 68rpx;
	border: none;
	text-align: center;
	
}

.like {
	display: flex;
	margin-left: 28rpx;
	align-items: center;
}

.likeBtn {
	width: 52rpx;
	height: 52rpx;
	margin-right: 10rpx;
}

.fav {
	display: flex;
	margin-left: 56rpx;
	align-items: center;
}

.favBtn {
	width: 52rpx;
	height: 52rpx;
	margin-right: 10rpx;
}

.share {
	display: flex;
	
	align-items: center;
}

.share image {
	width: 52rpx;
	height: 52rpx;
}
.savepadding {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: content-box;
}
.serverInfo {
	width: 654rpx;
	min-height: 416rpx;
	background: #f8f8f8;
	border-radius: 8rpx;
	position: relative;
	padding: 30rpx;
	.title {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 50rpx;
		text-align: center;
	}
	.content {
		margin-top: 10rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
		line-height: 36rpx;
	}
	.phone {
		width: 92rpx;
		height: 92rpx;
		background: #ffe512;
		border-radius: 50%;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 246rpx;
		right: 34rpx;
		justify-content: center;
		box-shadow: 0px 0px 12rpx 4rpx rgba(255, 229, 18, 0.35);
		image {
			width: 46rpx;
			height: 46rpx;
		}
	}
}
.fixTabs {
	position: fixed;
	top: 110rpx;
	padding-left: 10rpx;
	padding-top: 20rpx;
	left: 0;
	z-index: 2;
	width: 100%;
	height:110rpx;
	background: #ffffff;
	// border-bottom: 2rpx solid #eeeeee;
	// box-shadow: 0px 0px 12rpx 0rpx #eeeeee;
}
.noFix {
	padding-left: 10rpx;
	left: 0;
	z-index: 1000;
	width: 100%;
	height: 110rpx;
	padding-top: 15rpx;
	background: #ffffff;
}
.tripBox{
	margin-top: 28rpx;
	margin-left: 38rpx;
}
.tripText{
	// width: 128rpx;
	height: 32rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 32rpx;

}
.tripText1{
	// width: 104rpx;
	height: 26rpx;
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 26rpx;

}
.tripLine{
	width: 128rpx;
	height: 12rpx;
	background: #FFE512;
	border-radius: 6px;
	margin-top: -6rpx;
}
.serviceBox{
	margin-top: 28rpx;
	margin-left: 64rpx;
}
.serviceLine{
	width: 128rpx;
	height: 12rpx;
	background: #FFE512;
	border-radius: 6px;
	margin-top: -6rpx;
}
</style>
