<template>
	<view>
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<view class="" v-show="lineContent">
			<!-- 内容详情轮播图 -->
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper @change="change" class="swiper" :autoplay="true" :indicator-dots="false">
							<swiper-item v-for="(item, index) in lineContent.images" :key="index"><image class="itemImg" mode="aspectFit" :src="item"></image></swiper-item>
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
			<view class="lineTitle">青岛散步记/网红市南大学路citywalk，打卡青岛 超文艺：大学路转角/中国十大绝美校园/荒岛书 店绝版旧书，走街串巷遇见生活.</view>
		</view>
		<view class="lineDriver"></view>
		<view class="linePlan">
			<view style="width: 60%;">
				<v-tabs
					inactive-color="#909399"
					padding="0"
					lineHeight="8rpx"
					lineColor="#FFE512"
					activeFontSize="32rpx"
					activeColor="#303133"
					fontSize="28rpx"
					v-model="tabCurrent"
					bold
					:tabs="tablist"
					:is-scroll="false"
					:current="tabCurrent"
					@change="tabChange"
				></v-tabs>
			</view>
			<view class="planContent">
				<u-time-line>
					<u-time-line-item nodeTop="2">
						<!-- 此处自定义了左边内容，用一个图标替代 -->
						<template v-slot:node>
							<view class="u-node" style="background: #19be6b; border-radius: 50%;">
								<!-- 此处为uView的icon组件 -->
								<view style="width: 10rpx; height: 10rpx;"></view>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-title">
									<view class="tui-chat-right"><view class="tui-chatbox tui-chatbox-right">D1</view></view>
								</view>
								<view class="u-order-desc">[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。</view>
								<view class="u-order-time">2019-05-08 12:12</view>
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item>
						<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
						<template v-slot:content>
							<view>
								<view class="u-order-desc">【深圳市】日照香炉生紫烟，遥看瀑布挂前川，飞流直下三千尺，疑是银河落九天。</view>
								<view class="u-order-time">2019-12-06 22:30</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
			</view>
		</view>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import vTabs from '@/components/v-tabs/v-tabs';
export default {
	comments: {
		uniNavBar,
		vTabs
	},

	data() {
		return {
			lineContent: null,
			current: 0,
			tablist: ['参考行程', '服务说明'],
			tabCurrent: 0,
			barStyle: {}
		};
	},
	onLoad(option) {
		if (option.id) {
			this.getDetail(option.id);
		}
	},
	methods: {
		tabChange(index) {
			this.tabCurrent = index;
		},
		change(e) {
			this.current = e.detail.current;
		},
		getDetail(id) {
			uni.request({
				url: this.globalUrl + '/route',
				method: 'GET',
				data: {
					uuid: id
				},

				success: res => {
					if (res.data.code == 0) {
						this.lineContent = res.data.data;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				},
				fail: error => {
					uni.showToast({
						title: '网络不给力，请稍后再试...',
						icon: 'none'
					});
				}
			});
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
//导航栏样式end
.page-section-spacing {
	position: relative;
	min-height: 500rpx;
	max-height: 850rpx;
	width: 100%;
}
.swiper {
	min-height: 500rpx;
	max-height: 850rpx;
}

.itemImg {
	min-height: 500rpx;
	max-height: 850rpx;
	width: 100%;
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
	padding: 40rpx 30rpx;
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
		padding: 20rpx 0 0rpx 0;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
	}
}
.lineDriver {
	height: 20rpx;
	width: 100%;
	background: #f8f8f8;
}
.linePlan {
	padding: 10rpx 30rpx;
	.planContent {
		padding: 100rpx 30rpx 30rpx;
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
	height: 40rpx;
	background: #FFE512;
text-align: center;
	position: relative;

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
</style>
