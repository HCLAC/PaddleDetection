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
		<view class="" v-show="attDetail != null">
			<view class="uni-padding-wrap">
				<view class="page-section" >
					<view class="page-section-spacing" >
						<swiper @change="change" :autoplay="true" class="swiper"  :indicator-dots="false">
							<swiper-item v-for="item in attDetail.data.images" :key="item.id" class="swiper-item" > 
								<image :src="item" id="itemImg" class="itemImg" mode="aspectFit" ></image>
							</swiper-item>
						</swiper>
						<view class="imageCount">{{ current + 1 }}/{{ attDetail.data.images.length }}</view>
						<view class="dots">
							<block v-for="(item, index) in attDetail.data.images" :key="index">
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
								<view class="title">{{attDetail.data.name}}</view>
							</view>
						</view>
						<view class="tips">
							<view class="tipHot" v-for="(item,index) in attDetail.data.tags" :key="index" >{{item}}</view>
							<view class="tip">{{attDetail.data.city}}</view>
						</view>
					</view>
					<view class="shareBox" @click="share" v-if="serviceProvider =='baidu' ">
						<image src="../../static/images/iconShare.svg" mode="" ></image>
					</view>
				</view>
				<view class="contentRank" @click="toRank()">
					<view class="rankText">
						{{attDetail.data.city}}市景点榜单·第{{attDetail.data.rank}}名
					</view>
					<view class="rankimgbox">
						<image class="rankImg" src="../../static/images/icon-next.svg" mode="aspectFit"></image>
					</view>
					
				</view>
				<view class="rateBox" >
					<!-- <uni-rate  :readonly="true" allow-half :value="attDetail.data.rate" /> -->
					<!-- 评分图标 -->
					<view class="rateStart" v-if="attDetail.data.rate == 5">
						<image src="../../static/images/star_svg/star4.svg" mode=""></image>
						<image src="../../static/images/star_svg/star4.svg" mode=""></image>
						<image src="../../static/images/star_svg/star4.svg" mode=""></image>
						<image src="../../static/images/star_svg/star4.svg" mode=""></image>
						<image src="../../static/images/star_svg/star4.svg" mode=""></image>
					</view>
					<view class="rateStart" v-if="attDetail.data.rate == 4">
						<image src="../../static/images/star_svg/star3.svg" mode=""></image>
						<image src="../../static/images/star_svg/star3.svg" mode=""></image>
						<image src="../../static/images/star_svg/star3.svg" mode=""></image>
						<image src="../../static/images/star_svg/star3.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
					</view>
					<view class="rateStart" v-if="attDetail.data.rate == 3">
						<image src="../../static/images/star_svg/star2.svg" mode=""></image>
						<image src="../../static/images/star_svg/star2.svg" mode=""></image>
						<image src="../../static/images/star_svg/star2.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
					</view>
					<view class="rateStart" v-if="attDetail.data.rate == 2">
						<image src="../../static/images/star_svg/star1.svg" mode=""></image>
						<image src="../../static/images/star_svg/star1.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
					</view>
					<view class="rateStart" v-if="attDetail.data.rate == 1">
						<image src="../../static/images/star_svg/star11.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
					</view>
					<view class="rateStart" v-if="attDetail.data.rate == 4.5">
						<image src="../../static/images/star_svg/star3.svg" mode=""></image>
						<image src="../../static/images/star_svg/star3.svg" mode=""></image>
						<image src="../../static/images/star_svg/star3.svg" mode=""></image>
						<image src="../../static/images/star_svg/star3.svg" mode=""></image>
						<image src="../../static/images/star_svg/starCopy13.svg" mode=""></image>
					</view>
					<view class="rateStart" v-if="attDetail.data.rate == 3.5">
						<image src="../../static/images/star_svg/star2.svg" mode=""></image>
						<image src="../../static/images/star_svg/star2.svg" mode=""></image>
						<image src="../../static/images/star_svg/star2.svg" mode=""></image>
						<image src="../../static/images/star_svg/starCopy12.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
					</view>
					<view class="rateStart" v-if="attDetail.data.rate == 2.5">
						<image src="../../static/images/star_svg/star1.svg" mode=""></image>
						<image src="../../static/images/star_svg/star1.svg" mode=""></image>
						<image src="../../static/images/star_svg/starCopy1.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
					</view>
					<view class="rateStart" v-if="attDetail.data.rate == 1.5">
						<image src="../../static/images/star_svg/star11.svg" mode=""></image>
						<image src="../../static/images/star_svg/starCopy1.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
					</view>
					<view class="rateStart" v-if="attDetail.data.rate == 0.5">
						<image src="../../static/images/star_svg/starCopy1.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
						<image src="../../static/images/star_svg/star5.svg" mode=""></image>
					</view>
					<!-- <u-rate :disabled="true" current="4"></u-rate> -->
					<view class="rate">{{attDetail.data.rate}} 星</view>
					<view class="goTo">{{attDetail.data.visited}}人去过</view>
				</view>
				<view class="contentText">
					<text :class="isShow ? 'loseText' : 'moreText'" id="moreText">
						简介：{{attDetail.data.description}}
					</text>
					<view class="btnBox" @click="showMore" v-if="!isShow && more">
						<text>收起</text>
						<image class="iconImg" src="../../static/images/zhankaiIcon.png" mode=""></image>
					</view>
					<view class="btnBox" @click="showMore" v-if="isShow && more">
						<view class="mask"></view>
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
						<view class="adreessIcon">
							<image class="" src="../../static/images/attmap.svg" mode=""></image>
						</view>
						
						<view class="adressText">{{attDetail.data.pos}}</view>
					</view>
					<view class="right" @click="map()">
						<image src="../../static/images/mapBack.png" mode=""></image>
						<view class="insideBox" >
							<image src="../../static/images/dingwei.svg" mode=""></image>
							<text>导航</text>
						</view>
					</view>
				</view>
				<view class="phone" v-if="attDetail.data.butler_mobile" @click="phoneCall">
					<image src="../../static/images/dianhua.png"></image>
					<text>旅行管家：{{attDetail.data.butler_mobile}}</text>
				</view>
			</view>
			<view class="magrinBck" v-show="attDetail.data.articles"></view>
			<view class="gonglueBox" v-show="attDetail.data.articles">
				<view class="title">热门攻略</view>
				<view class="contentBox">
					<view class="contentItem" @click="onPageJump" :id= "attDetail.data.articles[0].article_id" v-show="attDetail.data.articles[0]">
						<image class="topHot" src="../../static/images/top.svg" mode=""></image>
						<view class="top">{{attDetail.data.articles[0].title}}</view>
						<view class="bottom">
							<image src="../../static/images/liulan.svg" mode=""></image>
							<text>{{attDetail.data.articles[0].visit_count}}</text>
						</view>
					</view>
					<view class="contentItem" @click="onPageJump" :id= "attDetail.data.articles[1].article_id" v-show="attDetail.data.articles[1]">
						<view class="top">{{attDetail.data.articles[1].title}}</view>
						<view class="bottom">
							<image src="../../static/images/liulan.svg" mode=""></image>
							<text>{{attDetail.data.articles[1].visit_count}}</text>
						</view>
					</view>
					<view class="contentItem" @click="onPageJump" :id= "attDetail.data.articles[2].article_id" v-show="attDetail.data.articles[2]">
						<view class="top">{{attDetail.data.articles[2].title}}</view>
						<view class="bottom">
							<image src="../../static/images/liulan.svg" mode=""></image>
							<text>{{attDetail.data.articles[2].visit_count}}</text>
						</view>
					</view>
					<view class="contentItem" @click="onPageJump" :id= "attDetail.data.articles[3].article_id" v-show="attDetail.data.articles[3]">
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
// import uniFav from '@/components/uni-fav/uni-fav.vue';
export default {
	comments: {
		uniNavBar,
		uniIcons
	},
	data() {
		return {
			indicatorDots: true,
			current: 0,
			list: [],
			isShow: true,
			attDetail:null,
			serviceProvider: '',
			more:true,
			rate:0
		};
	},
	created() {
		(_this = this), _this.getOrder();
	},
	onLoad:function(e) {
		console.log('详情id====',e)
		uni.showLoading({
			title:'加载中'
		})
		this.getAttDetail(e)
		uni.hideLoading();
	},
	mounted() {
		uni.getProvider({
			service: 'oauth',
			success: res => {
				console.log(res,123)
				if(res.errMsg == 'getProvider:ok'){
					this.serviceProvider = res.provider[0]
					if(this.serviceProvider != 'baidu' ){
						uni.showShareMenu({
							
						})
					}
				}else{
					uni.showToast({
						title: '获取提供商失败',
						icon: 'none'
					})
				}
			}
		});
		// let info = uni.createSelectorQuery().select(".loseText");
		// 	info.boundingClientRect(function(data) {
		// 	console.log('节点信息',data);  // 获取元素信息
		// }).exec()
	},
	methods: {
		getAttDetail(e){
			
			var that = this
			uni.request({
				url:this.globalUrl+ '/site',
				data:{
					id:e.id
				},
				success:function(res){
					console.log('eeeeeeeeeeeeeeee',e)
					console.log('景点详情====',res.data)
					uni.setStorageSync('id',res.data)
					that.attDetail = res.data
					// that.rate =  (res.data.data.rate ).toFixed(1);
					// console.log('评分',that.rate)
					var length = that.attDetail.data.description.length
					console.log('attDetail--',length)
					if(length < 50){
						that.more = false
					}
				}
			})
			
		},
		// 跳转文章详情
		onPageJump(e) {
			console.log(e)
			let id = e.currentTarget.id
			// debugger
			// return
			uni.navigateTo({
				url: "/pages/contentdetail/contentdetail?article_id="+id
			})
		},
		// 调用拨打手机
		phoneCall(){
			uni.makePhoneCall({
				phoneNumber:this.attDetail.data.butler_mobile
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
		toRank(){
			var state_id = this.attDetail.data.state_id;
			var city_id = this.attDetail.data.city_id;
			// console.log('----',city_id)
			uni.navigateTo({
				url: '/pages/attractionsRank/attractionsRank?state_id=' + state_id + '&city_id=' + city_id
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
			var that = this
			
			const latitude = that.attDetail.data.latitude;
			const longitude = that.attDetail.data.longitude;
			uni.openLocation({
				latitude: latitude,
				longitude: longitude,
				success: function () {
					console.log('success');
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
	padding: 70rpx 40rpx 0;
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
			height: 48rpx;
			font-size: 48rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(48, 49, 51, 1);
			line-height: 48rpx;
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
		box-shadow:0px 2px 4px 0px rgba(255,229,18,0.5);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.shareBox image {
		height: 34rpx;
		width: 34rpx;
	}
	.tips {
		margin-top: 16rpx;
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
			height: 36rpx;
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
		margin-top: 10rpx;
		margin-bottom: 40rpx;
		position: relative;
		.moreText {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(144, 147, 153, 1);
			line-height: 42rpx;
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
				max-height:70rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-line-clamp: 2;
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
