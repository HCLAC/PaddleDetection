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
		<!-- 用户信息 -->

		<!-- 内容详情轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper @change="change" :autoplay="true" class="swiper" :indicator-dots="false">
						<swiper-item v-for="item in list" class="swiper-item"><image src="../../static/images/photos/sda.jpeg" mode=""></image></swiper-item>
					</swiper>
					<view class="imageCount">{{ current + 1 }}/{{ list.length }}</view>
					<view class="dots">
						<block v-for="(item, index) in list"><view :class="[index == current ? 'activieDot' : 'dot']"></view></block>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="contentHeader">
				<view class="title">纳米比亚</view>
				<image src="../../static/images/shareHere.png" mode="" @click="share"></image>
			</view>
			<view class="tips">
				<view class="tipHot">5A景区</view>
				<view class="tip">直布罗陀</view>
			</view>
			<view class="rateBox">
				<view class="iconBox">
					<image src="../../static/images/rateOver.png"></image>
					<image src="../../static/images/rateOver.png"></image>
					<image src="../../static/images/rateOver.png"></image>
					<image src="../../static/images/rateHalf.png"></image>
					<image src="../../static/images/rateNo.png"></image>
				</view>
				<view class="rate">3.5 星</view>
				<view class="goTo">2688人去过</view>
			</view>
			<view class="contentText">
				<text :class="[isShow ? 'loseText' : 'moreText']">
					简介：语雀是一款优雅高效的在线文档编辑与协同工让 个企业轻松拥有文档中心阿里巴巴集团内部使语雀是一 款优雅高效的在线文档编辑与协同工让个企业轻松拥有
					文档中心阿里巴巴集团内部使语雀是一款优雅高效的在 线文档编辑与协同工让个企业轻松拥有文档中心阿里巴 巴集团内部使。
				</text>
				<view class="btnBox" @click="showMore" v-if="!isShow">
					<text>收起</text>
					<image class="iconImg" src="../../static/images/zhankaiIcon.png" mode=""></image>
				</view>
				<view class="btnBox" @click="showMore" v-else>
					<text>展开</text>
					<image class="iconImg" src="../../static/images/shouqiIcon.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="magrinBck"></view>
		<view class="adressBox">
			<view class="title">景点位置</view>
			<view class="adress">
				<view class="left">
					<image src="../../static/images/mapIcon.png" mode=""></image>
					<text>中国浙江省杭州市西湖区弯糖路118号</text>
				</view>
				<view class="right">
					<image src="../../static/images/mapBack.png" mode=""></image>
					<view class="insideBox" @click="map">
						<image src="../../static/images/dingwei.png" mode=""></image>
						<text>导航</text>
					</view>
				</view>
			</view>
			<view class="phone">
				<image src="../../static/images/dianhua.png"></image>
				<text>旅行管家：15846985068</text>
			</view>
		</view>
		<view class="magrinBck"></view>
		<view class="gonglueBox">
			<view class="title">热门攻略</view>
			<view class="contentBox">
				<view class="contentItem">
					<image class="topHot" src="../../static/images/topHot.png" mode=""></image>
					<view class="top">故宫 | 故宫游玩新姿势 红墙黄瓦欣赏get技…</view>
					<view class="bottom">
						<image src="../../static/images/liulan.png" mode=""></image>
						<text>2389</text>
					</view>
				</view>
				<view class="contentItem">
					<view class="top">故宫 | 故宫游玩新姿势 红墙黄瓦欣赏get技…</view>
					<view class="bottom">
						<image src="../../static/images/liulan.png" mode=""></image>
						<text>2389</text>
					</view>
				</view>
				<view class="contentItem">
					<view class="top">故宫 | 故宫游玩新姿势 红墙黄瓦欣赏get技…</view>
					<view class="bottom">
						<image src="../../static/images/liulan.png" mode=""></image>
						<text>2389</text>
					</view>
				</view>
				<view class="contentItem">
					<view class="top">故宫 | 故宫游玩新姿势 红墙黄瓦欣赏get技…</view>
					<view class="bottom">
						<image src="../../static/images/liulan.png" mode=""></image>
						<text>2389</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var _this;
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniFav from '@/components/uni-fav/uni-fav.vue';
export default {
	comments: {
		uniNavBar,
		uniIcons,
		uniFav
	},
	data() {
		return {
			indicatorDots: true,
			current: 0,
			list: [{ key: '1', title: 'A' }, { key: '2', title: 'B' }, { key: '3', title: 'C' }, { key: '4', title: 'D' }, { key: '6', title: 'E' }, { key: '7', title: 'F' }],
			likemessage: 144,
			favmessage: 219,
			isShow: true
		};
	},
	created() {
		(_this = this), _this.getOrder();
	},

	methods: {
		share(){
			uni.showShareMenu({
				
			})
		},
		change(e) {
			_this.current = e.detail.current;
		},
		getOrder() {
			_this.swiperlength,
				(_this.list = [
					{ key: '1', title: 'A' },
					{ key: '2', title: 'B' },
					{ key: '3', title: 'C' },
					{ key: '4', title: 'D' },
					{ key: '6', title: 'E' },
					{ key: '7', title: 'F' }
				]);
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
		likeclick() {
			// console.log("cccccccccccc")
			this.likemessage++;
		},
		favclick() {
			// console.log("cccccccccccc")
			this.favmessage++;
		},
		showMore() {
			this.isShow = !this.isShow;
		},
		// favClick() {
		// 	this.checked = !this.checked
		//  this.$forceUpdate()
		// }
		map(){
			uni.getLocation({
			    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			    success: function (res) {
			        const latitude = res.latitude;
			        const longitude = res.longitude;
			        uni.openLocation({
			            latitude: latitude,
			            longitude: longitude,
			            success: function () {
			                console.log('success');
			            }
			        });
			    }
			});
		}
	}
};
</script>

<style lang="scss">
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

/* 用户信息 */

/* 轮播图 */
.page-section-spacing {
	position: relative;
}

.swiper-item {
	width: 100%;
	image {
		height: 100%;
		width: 100%;
	}
}
.uni-bg-red {
	background-color: #ea552d;
}
.uni-bg-green {
	background-color: #4cd964;
}
.uni-bg-blue {
	background-color: #007aff;
}
.imageCount {
	height: 40rpx;
	background-color: #000000;
	border-radius: 20rpx;
	line-height: 40rpx;
	color: #fff;
	text-align: center;
	font-size: 22rpx;
	position: absolute;
	right: 22rpx;
	padding: 0 12rpx;
	bottom: 36rpx;
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
	bottom: -40rpx;
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
// 内容区
.content {
	padding: 60rpx 30rpx 0;
	.contentHeader {
		height: 52rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title {
			font-size: 48rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(48, 49, 51, 1);
		}
		image {
			height: 52rpx;
			width: 52rpx;
		}
	}
	.tips {
		margin-top: 10rpx;
		display: flex;
		.tip {
			margin-right: 8rpx;
			padding: 2rpx 8rpx;
			border-radius: 4rpx;
			border: 2rpx solid rgba(144, 147, 153, 1);
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(144, 147, 153, 1);
		}
		.tipHot {
			margin-right: 8rpx;
			padding: 2rpx 8rpx;
			border-radius: 4rpx;
			background: rgba(113, 200, 23, 1);
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #fff;
		}
	}
	.rateBox {
		margin-top: 60rpx;
		display: flex;
		align-items: center;
		.iconBox {
			display: flex;
			image {
				height: 36rpx;
				width: 36rpx;
				margin-right: 16rpx;
			}
		}
		.rate {
			margin-left: 20rpx;
			font-size: 28rpx;
			font-family: HelveticaNeue;
			color: rgba(96, 98, 102, 1);
		}

		.goTo {
			margin-left: 46rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(96, 98, 102, 1);
		}
	}

	.contentText {
		margin-top: 30rpx;
		.moreText {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(144, 147, 153, 1);
			line-height: 56rpx;
		}
		.loseText {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(144, 147, 153, 1);
			line-height: 56rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			text-overflow: ellipsis;
			overflow: hidden;
			-webkit-line-clamp: 2;
		}
		.btnBox {
			margin-right: 10rpx;

			display: flex;
			justify-content: flex-end;
			align-items: center;
			text {
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(48, 49, 51, 1);
			}
			.iconImg {
				height: 24rpx;
				width: 24rpx;
			}
		}
	}
}
.magrinBck {
	height: 20rpx;
	background-color: rgba(248, 248, 248, 1);
	padding: 0;
}
.adressBox {
	padding: 0 30rpx 40rpx 30rpx;
	.title {
		padding: 40rpx 0 60rpx 0;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(48, 49, 51, 1);
	}
	.adress {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			width: 50%;
			image {
				height: 34rpx;
				width: 34rpx;
				margin-right: 16rpx;
			}
			text {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(96, 98, 102, 1);
				line-height: 36rpx;
			}
		}
		.right {
			margin-top: 20rpx;
			height: 96rpx;
			width: 196rpx;
			position: relative;
			> image {
				width: 100%;
				height: 100%;
			}
			.insideBox {
				width: 140rpx;
				height: 60rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 30rpx;
				border: 2rpx solid rgba(201, 202, 209, 1);
				margin: auto;
				position: absolute;
				top: 15rpx;
				left: 26rpx;
				z-index: 99;
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 46rpx;
					height: 46rpx;
				}
				text {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(48, 49, 51, 1);
				}
			}
		}
	}
	.phone {
		margin-top: 10rpx;
		height: 36rpx;
		display: flex;
		align-items: center;
		image {
			width: 34rpx;
			height: 34rpx;
			margin-right: 12rpx;
		}
		text {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(96, 98, 102, 1);
		}
	}
}
.gonglueBox {
	padding: 40rpx 30rpx;
	.title{
		font-size:36rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(48,49,51,1);
		margin-bottom: 40rpx;
	}
	.contentBox {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.contentItem {
			width: 49%;
			height: 156rpx;
			background: rgba(248, 248, 248, 1);
			border-radius: 8rpx;
			margin-bottom: 20rpx;
			padding: 28rpx 20rpx 0 20rpx;
			position: relative;
			.topHot{
				width: 96rpx;
				height: 40rpx;
				position: absolute;
				top: -25rpx;
				left: 20rpx;
			}
			.top{
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(96,98,102,1);
				line-height: 38rpx;
			}
			.bottom{
				margin-top: 6rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				image{
					height: 32rpx;
					width: 32rpx;
				}
				text{
					font-size:22rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(144,147,153,1);
				}
			}
		}
	}
}
</style>
