<template>
	<view> 
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" :title="siteInfo.name">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 内容详情轮播图 -->
		<view class="" v-show="siteInfo != null">
			<view class="uni-padding-wrap">
				<view class="page-section" >
					<view class="page-section-spacing" >
						<swiper @change="change" :autoplay="true" class="swiper" :indicator-dots="false" circular='true'>
							<swiper-item v-for="item in siteInfo.images" :key="item.id" class="swiper-item" > 
								<image :src="item" class="itemImg" :lazy-load="true" mode="aspectFill" ></image>
							</swiper-item>
						</swiper>
						<view class="imageCount">{{ current + 1 }}/{{ siteInfo.images.length }}</view>
						<view class="dots">
							<block v-for="(item, index) in siteInfo.images" :key="index">
								<view :class="[index == current ? 'activieDot' : 'dot']"></view>
							</block>
						</view>
					</view>
				</view>
			</view>
			<view class="content" >
				<view class="contentTop">
					<view class="">
						<view class="contentTitle">
							<view class="contentHeader">
								<view class="title">{{siteInfo.name}}</view>
							</view>
						</view>
						<view class="tips">
							<view class="tipHot" v-for="(item,index) in siteInfo.tags" :key="index" >{{item}}</view>
							<view class="tip">{{siteInfo.city}}</view>
						</view>
					</view>
					<view class="shareBox" @click="share" v-if="serviceProvider =='baidu' ">
						<image src="/static/images/iconShare.svg" mode="" ></image>
					</view>
				</view>
				<view class="contentRank" @click="toRank()">
					<view class="rankText">
						{{siteInfo.city}}市景点榜单·第{{siteInfo.rank}}名
					</view>
					<view class="rankimgbox">
						<image class="rankImg" src="/static/images/icon-next.svg" mode="aspectFit"></image>
					</view>
				</view>
				<view class="rateBox" >
					<!-- 评分图标 -->
					<uni-rate :readonly="true" :value="siteInfo.rate" :size='20' margin="8" :allowHalf="true"/>
					<view class="rate">
						<view class="rate-number">
							{{siteInfo.rate}}
						</view>
						<text>星</text>
					</view>
					<view class="goTo">
						<view class="goTo-number">
							{{siteInfo.visited}}
						</view>
						<text>人去过</text>
					</view>
				</view>
				<view class="contentText">
					<view :class="isShow ? 'loseText' : 'moreText'" id="moreText">
						简介：{{siteInfo.description}}
					</view>
					<view class="btnBox" @click="showMore" v-if="!isShow && more">
						<text>收起</text>
						<image class="iconImg" src="/static/images/zhankaiIcon.png" mode=""></image>
					</view>
					<view class="btnBox" @click="showMore" v-else-if="isShow && more">
						<view class="mask"></view>
						<text>展开</text>
						<image class="iconImg" src="/static/images/shouqiIcon.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="magrinBck"></view>
			<view class="adressBox">
				<view class="title">景点位置</view>
				<view class="adress">
					<view class="left">
						<view class="adreessIcon">
							<image class="" src="/static/images/attmap.svg" mode=""></image>
						</view>
						<view class="adressText">{{siteInfo.pos}}</view>
					</view>
					<view class="right" @click="map()">
						<image src="/static/images/mapBack.png" mode=""></image>
						<view class="insideBox" >
							<image src="/static/images/dingwei.svg" mode=""></image>
							<text>导航</text>
						</view>
					</view>
				</view>
				<view class="phone" v-if="siteInfo.butler_mobile" @click="phoneCall">
					<image src="/static/images/dianhua.png"></image>
					<text>旅行管家：{{siteInfo.butler_mobile}}</text>
				</view>
			</view>
			<view class="magrinBck" v-show="siteInfo.articles"></view>
			<view class="gonglueBox" v-if="siteInfo.articles && siteInfo.articles.length != 0">
				<view class="title">热门攻略</view>
				<view class="contentBox">
					<view class="contentItem" @click="toArticle(item.article_id)" v-for="(item, index) in siteInfo.articles" :key="index">
						<image class="topHot" v-if="index==0" src="/static/images/top.svg" mode=""></image>
						<view class="top">{{item.title}}</view>
						<view class="bottom">
							<image src="/static/images/liulan.svg" mode=""></image>
							<text>{{item.visit_count}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
// import uniFav from '@/components/uni-fav/uni-fav.vue';
export default {
	comments: {
		uniNavBar,
		uniIcons
	},
	data() {
		return {
			id: 0,
			indicatorDots: true,
			current: 0,
			isShow: true,
			siteInfo:null,
			serviceProvider: '',
			more:true,
			rate:0
		};
	},
	onLoad:function(e) {
		this.id = e.id
		this.serviceProvider = getApp().globalData.serviceProvider
		this.getSiteDetail()
	},
	methods: {
		getSiteDetail(){
			var that = this
			this.HTTP.request({
				url:'/site',
				data:{
					id: this.id
				},
				success:function(res){
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					var siteInfo = res.data.data
					siteInfo.images.forEach((item, index) => {
						siteInfo.images[index] = that.Utils.addImageProcess(item, true, 70)
					})
					that.siteInfo = res.data.data
					if(that.siteInfo.description.length < 50){
						that.more = false
					}
					
					swan.setPageInfo({
						title: that.siteInfo.name+"景点介绍-领途羊",
						keywords: that.siteInfo.name+","+that.siteInfo.city+"旅游攻略,"+that.siteInfo.pos+",领途羊",
						description: that.siteInfo.description,
					})
				}
			})
			
		},
		// 跳转文章详情
		toArticle(article_id) {
			uni.navigateTo({
				url: "/pages_content/article/article?article_id="+article_id
			})
		},
		// 调用拨打手机
		phoneCall(){
			uni.makePhoneCall({
				phoneNumber:this.siteInfo.butler_mobile
			})
		},
		// 分享
		share(){
			uni.showShareMenu({
				success: (res) => {
					
				},
				fail: (res) => {
					console.log('分享报错',res)
				}
			})
		},
		change(e) {
			this.current = e.detail.current;
		},
		toRank(){
			var state_id = this.siteInfo.state_id;
			var city_id = this.siteInfo.city_id;
			this.HTTP.request({ 
				url: '/area', 
				data: { 
					state_id: state_id, 
					city_id: city_id 
				}, 
				success: res => { 
					if (res.statusCode != 200 || res.data.code != 0){ 
						uni.showToast({ 
							title: res.data.msg, 
							icon: 'none' 
						}); 
						return 
					}
					uni.redirectTo({ 
						url: '/pages_province/attractionsRank/attractionsRank?state_id=' +  
										res.data.data.state_id+"&city_id="+res.data.data.city_id+ 
										"&name="+res.data.data.name+"&image="+res.data.data.image 
					}); 
				} 
			});
		},
		showMore() {
			this.isShow = !this.isShow;
		},
		map(){
			var that = this
			const latitude = that.siteInfo.latitude;
			const longitude = that.siteInfo.longitude;
			uni.openLocation({
				latitude: latitude,
				longitude: longitude,
				success: function () {
					console.log('success');
				},
				fail() {
					uni.showToast({
						title: "打开地图失败",
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
/* 轮播图 */
.page-section-spacing {
	position: relative;
	height: 440rpx;
	width: 100%;
}

.swiper-item {
	width: 100%;
	height: 100%;
	image {
		height: 100%;
		width: 100%;
	}
}
.swiper{
	height: 100%;
	width: 100%;
}

.imageCount {
	height: 40rpx;
	background:rgba(0,0,0,0.6);
	border-radius: 20rpx;
	line-height: 40rpx;
	color: #fff;
	text-align: center;
	font-size: 22rpx;
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
// 内容区
.content {
	padding: 70rpx 28rpx 0;
	.contentTop{
		display: flex;
		justify-content: space-between;
	}
	.contentTitle{
		display: flex;
	}
	.contentHeader {
		
		display: flex;
		justify-content: space-between;
		.title {
			height: 100%;
			font-size: 48rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(48, 49, 51, 1);
			// line-height: 48rpx;
		}
	}
	.contentRank{
		height:36rpx;
		background: linear-gradient(180deg, #E4CBA2 0%, #FCEFE1 0%, #E1C090 100%);
		border-radius:4rpx;
		margin-top: 16rpx;
		display: inline-block;
		vertical-align: middle;
		padding: 0 8rpx 0 12rpx;
		.rankimgbox{
			// margin-top: 12rpx;
			margin-left: 4rpx;
			height: 100%;
			float: right;
			display: flex;
			align-items: center;
			.rankImg{
				width: 16rpx;
				height: 16rpx;
			}
		}
		
		
	}
	.rankText{
		font-size:20rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(116,68,13,1);
		line-height:20rpx;
		float: left;
		margin-top: 8rpx;
	}
	.shareBox{
		width:78rpx;
		height:78rpx;
		background:rgba(255,229,18,1);
		box-shadow:0px 4px 8px 0px rgba(255,229,18,0.5);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 685rpx;
		right: 40rpx;
		z-index: 11111;
	}
	.shareBox image {
		height: 34rpx;
		width: 34rpx;
	}
	.tips {
		margin-top: 16rpx;
		display: flex;
		flex-wrap: wrap;
		.tip {
			margin-right: 8rpx;
			margin-top: 4rpx;
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
			margin-top: 4rpx;
			padding: 2rpx 8rpx;
			border-radius: 4rpx;
			background: rgba(113, 200, 23, 1);
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #fff;
			// height: 36rpx;
			display: flex;
			align-items: center;
		}
	}
	.rateBox {
		margin-top: 24rpx;
		display: flex;
		.rateStart{
			display: flex;
		}
		.rateStart image{
			width: 36rpx;
			height: 36rpx;
			margin-right: 16rpx;
		}
		.rate {
			margin-left: 16rpx;
			display: flex;
			align-items: center;
			.rate-number{
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #606266;
				margin-right: 4rpx;
			}
			text{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
			}
		}

		.goTo {
			margin-left: 46rpx;
			display: flex;
			align-items: center;
			.goTo-number{
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #909399;
			}
			text{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #909399;
			}
		}
	}

	.contentText {
		margin-top: 10rpx;
		margin-bottom: 40rpx;
		position: relative;
		.moreText {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(144, 147, 153, 1);
			line-height: 42rpx;
			text-align:justify;
			text-justify:inter-ideograph;
			// position: relative;
		}
		.loseText {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(144, 147, 153, 1);
			line-height: 42rpx;
			
			display: -webkit-box;
			-webkit-box-orient: vertical;
			// text-overflow: ellipsis;
			overflow: hidden;
			-webkit-line-clamp: 2;
			text-align:justify;
			text-justify:inter-ideograph;
			
		}
		.btnBox {
			// margin-right: 10rpx;
			height: 42rpx;
			position: absolute;
			right: 6rpx;
			background-color: #FFFFFF;
			bottom: -2rpx;
			display: flex;
			justify-content: flex-end;
			z-index: 111;
			.mask{
				width: 36rpx;
				// background: linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
				
				background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
			}
			text {
				margin-top: 10rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				line-height: 24rpx;
				color: rgba(48, 49, 51, 1);
				background-color: #FFFFFF;
			}
			.iconImg {
				margin-top: 10rpx;
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
		padding: 40rpx 0 40rpx 0;
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
			width: 60%;
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
				line-height: 40rpx;
				width:320rpx;
				max-height:70rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				// overflow: hidden;
				-webkit-line-clamp: 2;
			}
		}
		.right {
			// margin-top: 20rpx;
			height: 96rpx;
			width: 196rpx;
			position: relative;
			 image {
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
				align-items: center;
				justify-content: center;
				image {
					width: 40rpx;
					height: 40rpx;
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
		// margin-top: 10rpx;
		height: 36rpx;
		display: flex;
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
