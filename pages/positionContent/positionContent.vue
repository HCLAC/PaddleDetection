<template>
	<view> 
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<!-- 用户信息 -->

		<!-- 内容详情轮播图 -->
		<view class="" >
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper @change="change" :autoplay="true" class="swiper" :indicator-dots="false">
							<swiper-item v-for="item in attDetail.data.images" class="swiper-item">
								<image :src="item" mode="aspectFit" ></image>
							</swiper-item>
						</swiper>
						<view class="imageCount">{{ current + 1 }}/{{ attDetail.data.images.length }}</view>
						<view class="dots">
							<block v-for="(item, index) in attDetail.data.images">
								<view :class="[index == current ? 'activieDot' : 'dot']"></view>
							</block>
						</view>
					</view>
				</view>
			</view>
			<view class="content" >
				<view class="contentHeader">
					<view class="title">{{attDetail.data.name}}</view>
					<image src="../../static/images/fenxiang.svg" mode="" @click="share"></image>
				</view>
				<view class="tips">
					<view class="tipHot">{{attDetail.data.tags[0]}}</view>
					<view class="tip">{{attDetail.data.city}}</view>
				</view>
				<view class="rateBox" >
					<uni-rate  :readonly="true" allow-half :value="attDetail.data.rate" />
					<!-- <u-rate :disabled="true" current="4"></u-rate> -->
					<view class="rate">{{attDetail.data.rate}} 星</view>
					<view class="goTo">{{attDetail.data.visited}}人去过</view>
				</view>
				<view class="contentText">
					<text :class="[isShow ? 'loseText' : 'moreText']">
						简介：{{attDetail.data.description}}
					
						<view class="btnBox" @click="showMore" v-if="!isShow">
							<text>收起</text>
							<image class="iconImg" src="../../static/images/zhankaiIcon.png" mode=""></image>
						</view>
						<view class="btnBox" @click="showMore" v-else>
							<view class="mask"></view>
							<text>展开</text>
							<image class="iconImg" src="../../static/images/shouqiIcon.png" mode=""></image>
						</view>
					</text>
				</view>
			</view>
			<view class="magrinBck"></view>
			<view class="adressBox">
				<view class="title">景点位置</view>
				<view class="adress">
					<view class="left">
						<view class="adreessIcon">
							<image class="" src="../../static/images/attmap.svg" mode=""></image>
						</view>
						
						<text class="adressText">{{attDetail.data.pos}}</text>
					</view>
					<view class="right">
						<image src="../../static/images/mapBack.png" mode=""></image>
						<view class="insideBox" @click="map">
							<image src="../../static/images/dingwei.svg" mode=""></image>
							<text>导航</text>
						</view>
					</view>
				</view>
				<view class="phone" v-show="attDetail.data.butler_mobile != null">
					<image src="../../static/images/dianhua.png"></image>
					<text>旅行管家：{{attDetail.data.butler_mobile}}</text>
				</view>
			</view>
			<view class="magrinBck"></view>
			<view class="gonglueBox">
				<view class="title">热门攻略</view>
				<view class="contentBox">
					<view class="contentItem">
						<image class="topHot" src="../../static/images/top.svg" mode=""></image>
						<view class="top">{{attDetail.data.articles[0].title}}</view>
						<view class="bottom">
							<image src="../../static/images/liulan.svg" mode=""></image>
							<text>{{attDetail.data.articles[0].visit_count}}</text>
						</view>
					</view>
					<view class="contentItem">
						<view class="top">{{attDetail.data.articles[1].title}}</view>
						<view class="bottom">
							<image src="../../static/images/liulan.svg" mode=""></image>
							<text>{{attDetail.data.articles[1].visit_count}}</text>
						</view>
					</view>
					<view class="contentItem">
						<view class="top">{{attDetail.data.articles[2].title}}</view>
						<view class="bottom">
							<image src="../../static/images/liulan.svg" mode=""></image>
							<text>{{attDetail.data.articles[2].visit_count}}</text>
						</view>
					</view>
					<view class="contentItem">
						<view class="top">{{attDetail.data.articles[3].title}}</view>
						<view class="bottom">
							<image src="../../static/images/liulan.svg" mode=""></image>
							<text>{{attDetail.data.articles[3].visit_count}}</text>
						</view>
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
			list: [],
			isShow: true,
			attDetail:''
		};
	},
	created() {
		(_this = this), _this.getOrder();
	},
	onLoad:function(e) {
		console.log('详情id====',e)
		this.getAttDetail(e)
	},
	methods: {
		getAttDetail(e){
			var that = this
			uni.request({
				url:'http://121.40.30.19/site',
				data:{
					id:e.id
				},
				success:function(res){
					console.log('eeeeeeeeeeeeeeee',e)
					console.log('景点详情====',res.data)
					uni.setStorageSync('id',res.data)
					that.attDetail = res.data
					console.log('attDetail--',that.attDetail)
				}
			})
		},
		
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
	width: 100%;
}

.swiper-item {
	width: 100%;
	
	image {
		height: 100%;
		width: 100%;
	}
}
.swiper{
	// min-height: 580rpx;
	width: 100%;
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
		margin-top: 32rpx;
		display: flex;
		align-items: center;
		.rateStart{
			width: 300rpx;
			height: 40rpx;
			// background-color: #007AFF;
		}
		.rate {
			margin-left: 20rpx;
			font-size: 28rpx;
			font-family: HelveticaNeue;
			color: rgba(96, 98, 102, 1);
		}

		.goTo {
			margin-left: 46rpx;
			font-size:24rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(144,147,153,1);
			line-height:44rpx;
		}
	}

	.contentText {
		margin-top: 30rpx;
		padding-bottom: 40rpx;
		position: relative;
		.moreText {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(144, 147, 153, 1);
			line-height: 56rpx;
			// position: relative;
		}
		.loseText {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(144, 147, 153, 1);
			line-height: 56rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			// text-overflow: ellipsis;
			overflow: hidden;
			-webkit-line-clamp: 2;
			
		}
		.btnBox {
			// margin-right: 10rpx;
			position: absolute;
			right: 0;
			bottom: 40rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			z-index: 111;
			// background:linear-gradient(90deg,rgba(255,255,255,0) 50%,rgba(255,255,255,1) 100%);
			.mask{
				width: 50rpx;
				height: 56rpx;
				background: linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
			}
			text {
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(48, 49, 51, 1);
				background-color: #FFFFFF;
			}
			.iconImg {
				height: 24rpx;
				width: 24rpx;
				background-color: #FFFFFF;
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
			// align-items: center;
			width: 50%;
			.adreessIcon {
				height: 34rpx;
				width: 34rpx;
				margin-right: 16rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.adressText {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(96, 98, 102, 1);
				line-height: 36rpx;
				width:308rpx;
				height:70rpx;
			}
		}
		.right {
			// margin-top: 20rpx;
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
	padding-bottom: 0;  
	padding-bottom: constant(safe-area-inset-bottom);  
	padding-bottom: env(safe-area-inset-bottom);  
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
				position: absolute;
				right: 24rpx;
				bottom: 12rpx;
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
