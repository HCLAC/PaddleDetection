<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :title="false" :fixed="true" :status-bar="true" color="#333333" :backgroundColor="backgroundColor">
				<view slot="center" class="input-view" @click="toSearch">
					<view class="input-uni-icon-Box">
						<image class="input-uni-icon" src="/static/images/icon-search.png" />
					</view>
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="搜索" disabled="true" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 内容 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- 头部轮播图 -->
			<view class="banner-box">
				<u-image :src="bannerList[0].image" width="750rpx" height="440rpx"></u-image>
			</view>
			<!-- 热门目的地 -->
			<view class="hot">
				<view class="hot-top">
					<text class="ht-l">热门目的地</text>
					<view class="ht-r" @click="showCity">
						更多
						<image src="../../static/images/more-right.svg" class="moreIcon" mode=""></image>
					</view>
				</view>
				<view class="hot-bot">
					<view class="hotAdress">
						<!-- 当前位置 -->
						<view :class="index == 0 && popularCities ? 'dqwz' : 'hotCity'" v-for="(item,index) in areaList" v-if="index<3" :key="index" @click="toProvinces(item)">
							<view class="mask"></view>
							<image class="hotCityImg" :src="item.image" mode="scaleToFill"></image>
							<text class="hotCityText1">{{ item.name }}</text>
							<view class="adressBox" v-if="index == 0 && popularCities" @tap.stop="notLocation">
								<image class="zhishi" src="../../static/images/iconMapt.svg" mode=""></image>
								<text class="dqwzText1">{{ dqdwText }}</text>
							</view>
						</view>
					</view>
					<view class="cityRank">
						<view class="rankText" @click="toProvinces(areaList[3])">{{ areaList[3].name }}</view>
						<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx" margin=" 0 16rpx"></u-line>
						<view class="rankText" @click="toProvinces(areaList[4])">{{ areaList[4].name }}</view>
						<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx" margin=" 0 16rpx"></u-line>
						<view class="rankText" @click="toProvinces(areaList[5])">{{ areaList[5].name }}</view>
					</view>
					<view class="cityRank">
						<view class="rankText" @click="toProvinces(areaList[6])">{{ areaList[6].name }}</view>
						<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx" margin=" 0 16rpx"></u-line>
						<view class="rankText" @click="toProvinces(areaList[7])">{{ areaList[7].name }}</view>
						<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx" margin=" 0 16rpx"></u-line>
						<view class="rankText" @click="toProvinces(areaList[8])" >{{ areaList[8].name }}</view>
					</view>
				</view>
			</view>
			<!-- 正在旅行 -->
			<view class="touring">
				<text class="tourtext">正在旅行</text>
				<view class="wrap" >
					<articleWaterfall :clearList="!list || list.length==0" :list="list"></articleWaterfall>
				</view>
			</view>
		</mescroll-body>
		<u-no-network @retry="downCallback()"></u-no-network>
		<!-- <view class="bottom">
			<view class="bottom-left">
				<view class="left-img">
					<image src="@/static/images/sy.png" mode=""></image>
				</view>
				<view class="left-text">
					首页
				</view>
			</view>
			<view class="bottom-right" @click="topersonal">
				<view class="right-img">
					<image src="@/static/images/wd-none.png" mode=""></image>
				</view>
				<view class="right-text">
					我的
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	import articleWaterfall from '@/common/article-waterfall/article-waterfall.vue';
	import UTILS from '@/common/utils/utils.js';
	export default {
		components: {
			articleWaterfall,
		},
		mixins: [MescrollMixin],
		data() {
			return {
				cityName: '全国',
				dqdwText: '当前位置',
				downOption: {
					auto:false
				},
				upOption: {
					auto:true,
				},
				backgroundColor: 'transparent',
				firstTime: new Date().getTime(),
				firstLoad: false,
				list: [],
				bannerList: [
					{image: ''}
				],
				bannerPostion: 220,
				areaList: [
					{name:'',image:''},{name:'',image:''},{name:'',image:''},
					{name:'',image:''},{name:'',image:''},{name:'',image:''},
					{name:'',image:''},{name:'',image:''},{name:'',image:''}
				],
				serviceProvider: '',
				popularCities:false,
			};
		},
		created() {
			// 监听从登录页面发来的信息
			uni.$once('onLoginSuccess', first_login => {
				if (!first_login){
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 10,
					})
					this.mescroll.resetUpScroll()
				}
			})
		},
		mounted() {
			this.calcCardHeight()
		},
		// #ifdef MP-BAIDU
		onInit(query) {
		// #endif
		// #ifndef MP-BAIDU
		onLoad(query) {
		// #endif
			this.firstLoad = true
			this.serviceProvider = getApp().globalData.serviceProvider
			this.loadData()
		},
		onReady() {
			// #ifdef MP-BAIDU
			swan.showFavoriteGuide({
			    type: 'tip'
			})
			// #endif
		},
		onShow() {
			var cur = Number((new Date().getTime())/1000).toFixed(0)
			var firstT = Number((this.firstTime)/1000).toFixed(0)
			if (cur-firstT > 300 && !this.firstLoad){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 10,
				})
				this.loadData()
			}
			this.firstTime = new Date().getTime()
			this.firstLoad = false
		},
		// 滚动
		onPageScroll: UTILS.throttle( function(res){
			var scrollTop = res[0].scrollTop
			if (scrollTop >= this.bannerPostion){
				if (this.backgroundColor != '#FFFFFF'){
					this.backgroundColor = '#FFFFFF';
					uni.setNavigationBarColor({
					    frontColor: '#000000',
						backgroundColor: '#FFFFFF',
						fail: err => {
							console.log('setNavigationBarColor fail', err);
						}
					})
				}
			} else {
				this.backgroundColor = 'transparent';
				uni.setNavigationBarColor({
				    frontColor: '#ffffff',
					backgroundColor: '#000000',
					fail: err => {
						console.log('setNavigationBarColor fail', err);
					}
				})
			}
		}, 100),
		methods: {
			//跳转个人资料
			topersonal(){
				uni.navigateTo({
				    url: '/pages/mine/mine'
				});
			},
			notLocation(){
				if(this.dqdwText == '未定位'){
					uni.getSetting({
					   success: res =>{
						  if(res.authSetting['scope.userLocation'] == false){
							  uni.openSetting({
							    success(res) {
							      console.log(res.authSetting)
							    }
							  });
						  }else{
							  this.getAdress()
						  }
					   }
					})
				}
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
				this.mescroll.setPageSize(8)
			},
			loadData(){
				uni.showLoading({
					title: '加载中',
					mask: true,
					success: () => {
						this.hideLoad();
					},
					complete: () => {
						this.getBanner();
						this.getAdress();
						this.getAreaHot();
					}
				});
				
			},
			hideLoad(){
				setTimeout(() => {
					uni.hideLoading();
				}, 300);
			},
			// 获取热门目的地
			getAreaHot(){
				var that = this
				this.HTTP.request({
					url: '/area/hot',
					retry: 3,
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						
						var areaList = res.data.data
						areaList.forEach((item1, index1) => {
							item1.image = this.Utils.addImageProcess(item1.image, false, 30)
						})
						this.areaList = areaList;
					}
				});
			},
			// 获取banner
			getBanner() {
				this.HTTP.request({
					url: '/banner',
					data: {
						source: this.serviceProvider == 'baidu' ? 1 : this.serviceProvider == 'toutiao' ? 2 : this.serviceProvider ==
							'微信' ? 3 : ''
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var bannerList = res.data.data
						bannerList.forEach((item1, index1) => {
							item1.image = this.Utils.addImageProcess(item1.image, false, 40)
						})
						this.bannerList = bannerList;
					}
				});
			},
			// 获取当前地理位置
			getAdress() {
				var that = this;
				// #ifdef H5
				this.$jsonp('https://apis.map.qq.com/ws/location/v1/ip?output=jsonp',{
					key: '3L3BZ-V5OCV-GXHPP-ULIVW-DYQRT-HRFBL',
				},5000)
				.then(res => {
				})
				.catch(error => {
					console.error('get address failed, ',error);
				})
				return
				// #endif
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						this.cityName = res.city
						this.HTTP.request({
							url: '/area/judge',
							data: {
								state: res.province,
								city: res.city
							},
							method: 'GET',
							success: res => {
								if (res.statusCode != 200 || res.data.code != 0){
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									});
									return
								}
								var result = res.data.data
								result.image = this.Utils.addImageProcess(result.image, false, 40)
								let cityId = res.data.data.city_id
								if(!result.name || !result.name.length){
									this.popularCities = false;
								} else {
									this.dqdwText = '当前位置';
									this.popularCities = true
									this.areaList.unshift(result)
								}
							},
						})
					},
					// 未开启定位
					fail: error => {
						console.log(error)
						if (error.errCode === 10005 || error.errCode === 10003) {
							uni.showToast({
								title: "请检查定位功能是否开启",
								icon: 'none'
							});
						}
						this.dqdwText = '未定位';
						this.popularCities = true
					}
				});
			},
			// notLocation(){
			// 	if(this.dqdwText == '未定位'){
			// 		this.getAdress()
			// 	}
			// },
			// 点击更多
			showCity() {
				uni.navigateTo({
					url: '/pages_content/city-hot/city-hot?name='+this.cityName
				});
			},
			toProvinces(e) {
				uni.navigateTo({
					url: '/pages_content/provinces/provinces?state_id=' + 
					e.state_id+"&city_id="+e.city_id+"&name="+e.name+"&image="+e.image
				});
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages_search/search/search'
				});
			},
			calcCardHeight(){
				const query = uni.createSelectorQuery().in(this); 
				query.select('.banner-box').boundingClientRect(data => {
					if (!data){
						this.calcCardHeight()
						return
					}
					this.bannerPostion = data.height
				}).exec(); 
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				this.loadData()
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			upCallback(page) {
				let pageNum = page.num;
				let pageSize = page.size;
				if (pageNum == 1) {
					this.list = [];
				}
				
				let that = this
				this.HTTP.request({
					url: '/article/list?page=' + pageNum + '&count=' + pageSize,
					retry: 3,
					data: {
						first_time: this.firstTime,
						source: this.serviceProvider == 'baidu' ? 1 : this.serviceProvider == 'toutiao' ? 2 : this.serviceProvider ==
							'微信' ? 3 : '',
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						if (!res.data.data.list || res.data.data.list.length == 0){
							return
						}
						
						let curPageData = res.data.data.list;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length ? curPageData.length : 0;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = res.data.data.total / pageSize;
						let totalSize = res.data.data.total;
						
						curPageData.forEach((item1, index1) => {
							if (item1.cover_height > 0){
								item1.height = 340*item1.cover_height/item1.cover_width+'rpx'
							} else {
								item1.height = null
							}
							item1.avatar = this.Utils.addImageProcess(item1.avatar, false, 60)
							item1.image = this.Utils.addImageProcess(item1.image, false, 40)
						})
						this.list = this.list.concat(curPageData); //追加新数据
						this.mescroll.endByPage(curPageLen, totalPage);
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr();
					},
					complete() {
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.bottom{
		width: 100%;
		height: 98rpx;
		// background: pink;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
		background-color: hsla(0,0%,89.8%,.8);
		background: hsla(0,0%,100%,.9);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		.bottom-left{
			width: 98rpx;
			height: 98rpx;
			margin-left: 180rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.left-img{
				width: 56rpx;
				height: 56rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.left-text{
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
			}
		}
		.bottom-right{
			width: 98rpx;
			height: 98rpx;
			display: flex;
			margin-right: 180rpx;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			
			.right-img{
				width: 56rpx;
				height: 56rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.right-text{
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
			}
		}
	}
	.nav-bar {
		z-index: 999;
		position: fixed;
		top:0px;
		flex-wrap: wrap;
		justify-content: center;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		background: rgba(255, 255, 255, 0);
	}
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */
	.banner-box {
		width: 750rpx;
		height: 440rpx;
	}
	.input-view {
		display: flex;
		width: 486rpx;
		height: 64rpx;
		align-items: center;
		background: rgba(248, 248, 248, 1);
		border-radius: 36rpx;
		margin-left: -120rpx;
		padding-left: 32rpx;
		.input-uni-icon-Box{
			line-height: 28rpx;
			.input-uni-icon {
				width: 28rpx;
				height: 28rpx;
			}
		}
		.nav-bar-input {
			height: 64rpx;
			line-height: 64rpx;
			font-size: 28rpx;
			color: #c9cad1;
			padding-left: 16rpx;
			font-size: 28rpx;
		}
	}
	
	/* 热门景点 */
	.hot {
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		.hot-top {
			display: flex;
			justify-content: space-between;
			.ht-l {
				/* width: 160rpx; */
				height: 40rpx;
				font-size: 40rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(48, 49, 51, 1);
				/* line-height: 40rpx; */
				margin-top: 48rpx;
				margin-left: 32rpx;
			}
			.ht-r {
				width: 94rpx;
				height: 42rpx;
				background: #edeff2;
				border-radius: 24rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #606266;
				// line-height: 42rpx;
				margin: 54rpx 32rpx 0 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.moreIcon {
				width: 14rpx;
				height: 14rpx;
				margin-left: 4rpx;
			}
		}
		// .wave{
		// 	margin-top: -50rpx;
		// 	width: 100%;
		// 	height: 90rpx;
		// 	z-index: 10;
		// 	.waveImg{
		// 		width: 100%;
		// 		height: 100%;
		// 	}
		// }
		.hot-bot {
			/* display: flex; */
			margin-top: 32rpx;
			.hotAdress {
				display: flex;
				justify-content: space-between;
				padding: 0 28rpx;
				/* align-items: center; */
				// margin-left: 32rpx;
				.dqwz {
					width: 216rpx;
					height: 180rpx;
					border-radius: 8px;
					border: 4rpx solid #ffe512;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					overflow: hidden;
					.mask {
						width: 216rpx;
						height: 180rpx;
						background: rgba(0, 0, 0, 0.25);
						border-radius: 8px;
						position: absolute;
					}
					.hotCityImg {
						width: 100%;
						height: 100%;
						border-radius: 16rpx;
					}
					.hotCityText {
						width: 140rpx;
						height: 32rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #ffffff;
						line-height: 32rpx;
						text-align: center;
						position: absolute;
						top: 50%;
						left: 50%;
						margin-left: -70rpx;
						margin-top: -16rpx;
					}
					.hotCityText1 {
						width: 140rpx;
						height: 32rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #ffffff;
						line-height: 32rpx;
						text-align: center;
						position: absolute;
						top: 30%;
						left: 50%;
						margin-left: -70rpx;
						margin-top: -16rpx;
					}
					.adressBox {
						display: flex;
						align-items: center;
						position: absolute;
						top: 90rpx;
						z-index: 100;
						left: 40rpx;
						// left: 50%;
						// transform: translate(-50%);
						color: #ffffff;
						padding: 8rpx 16rpx;
						font-size: 16rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #303133;
						// line-height: 16rpx;
						/* width: 140rpx; */
						height: 40rpx;
						background: #ffe512;
						border-radius: 11px;
						.zhishi {
							width: 24rpx;
							height: 24rpx;
							margin-right: 4rpx;
						}
						.dqwzText1{
							// width: 60rpx;
							font-size: 20rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #303133;
						}
					}
				}
				.hotCity {
					width: 216rpx;
					height: 180rpx;
					border-radius: 16rpx;
					// margin-left: 24rpx;
					position: relative;
					.mask {
						width: 216rpx;
						height: 180rpx;
						background: rgba(0, 0, 0, 0.25);
						border-radius: 8px;
						position: absolute;
					}
					.hotCityImg {
						width: 100%;
						height: 100%;
						border-radius: 16rpx;
					}
					.hotCityText {
						width: 140rpx;
						height: 32rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #ffffff;
						line-height: 32rpx;
						text-align: center;
						position: absolute;
						top: 50%;
						left: 50%;
						margin-left: -70rpx;
						margin-top: -16rpx;
					}
					.hotCityText1 {
						width: 140rpx;
						height: 32rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #ffffff;
						line-height: 32rpx;
						text-align: center;
						position: absolute;
						top: 50%;
						left: 50%;
						margin-left: -70rpx;
						margin-top: -16rpx;
					}
					.adressBox {
						display: flex;
						align-items: center;
						position: absolute;
						top: 90rpx;
						left: 40rpx;
						color: #ffffff;
						padding: 8rpx 16rpx;
						font-size: 16rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #303133;
						// line-height: 16rpx;
						/* width: 140rpx; */
						height: 40rpx;
						background: #ffe512;
						border-radius: 11px;
						z-index: 100;
						.zhishi {
							width: 24rpx;
							height: 24rpx;
							margin-right: 4rpx;
						}
						.dqwzText1{
							font-size: 20rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #303133;
						}
					}
				}

			}
			.cityRank {
				margin-top: 28rpx;
				margin-left: 32rpx;
				margin-bottom: 28rpx;
				display: flex;
				align-items: center;
				.rankText {
					width: 212rpx;
					font-size: 28rpx;
					text-align: center;
				}
			}
		}
	}
	
	/* 正在旅行 */
	.touring {
		// margin-top: 24rpx;
		background: #FFFFFF;
		.tourtext {
			width: 160rpx;
			height: 104rpx;
			line-height: 104rpx;
			font-size: 40rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			margin-left: 28rpx;
			margin-top: 10rpx;
		}
		
		.wrap {
			width: 750rpx;
			display: flex;
			flex-flow: row;
			flex-wrap: wrap;
			padding: 0 21rpx 0 21rpx;
		}
	}
</style>
