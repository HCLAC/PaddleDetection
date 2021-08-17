<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :title="false" :fixed="true" :status-bar="true" color="#333333" :backgroundColor="backgroundColor">
				<view class="headerL" slot="left">
					<view class="world" >
						<view class="worldText">全世界</view>
						<view class="worldLine"></view>
					</view>
					<view class="nowCityName" @click="toProvincesNC()">
						<view class="nowCityNameText">{{ cityName }} </view>
						<view class="downIcon">
							<image class="downIconImg" src="/static/images/downIcon.svg" mode=""></image>
						</view>
					</view>
				</view>
				<view slot="center" class="input-view" @click="toSearch">
					<view class="input-uni-icon-Box">
						<image class="input-uni-icon" src="/static/images/icon-search.svg" />
					</view>
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="搜索" disabled="true" />
				</view>
			</uni-nav-bar>
		</view>

		<!-- 内容 -->
		<mescroll-body @scroll="uniScroll" class="mescroll" ref="mescrollRef" @init="mescrollInit"
		 @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- 头部轮播图 -->
			<view class="page-section " v-if="bannerList.length != 0">
				<view class="page-section-spacing">
					<!-- 新版 -->
					<image class="bannerImg" :src="bannerList[0].image" mode=""></image>
					<!-- 旧版轮播 -->
					<!-- <swiper :autoplay="true" class="swiper" indicator-dots="true" indicator-active-color="#FAAD14">
						<swiper-item v-for="(item, index) in bannerList" :key="index" class="swiper-item">
							<image :src="item.image" mode="scaleToFill" class="swiperImg" @click="towebview(item)">
							</image>
							</navigator>
						</swiper-item>
					</swiper> -->
				</view>
			</view>
			<view class="cus-sty " :style="{'margin-top': cus_sty_top}">
				<!-- 热门目的地 -->
				<view class="hot">
					<view class="wave">
						<image class="waveImg" src="/static/images/wave.png" mode=""></image>
					</view>
					<!-- <u-swiper :list="uswiperlist" mode="none" :autoplay="false" ></u-swiper> -->
					<view class="citysBox">
						<scroll-view scroll-x="true" class="kite-classify-scroll" v-if="areaList.length != 0">
							<view class="citysBoxLeft">
								<view class="cblt">
									<view class="cbltcBig" @click="toProvinces(areaList[0])" >
										<image class="hotCityImg" :src="areaList[0].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cbltcBigText">
												{{areaList[0].name}}
											</view>
										</view>
									</view>
									<view class="cbltcSmall" @click="toProvinces(areaList[1])">
										<image class="hotCityImg" :src="areaList[1].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cbltcSmallText">
												{{areaList[1].name}}
											</view>
										</view>
									</view>
									<view class="cbltcSmall" @click="toProvinces(areaList[2])" >
										<image class="hotCityImg" :src="areaList[2].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cbltcSmallText">
												{{areaList[2].name}}
											</view>
										</view>
									</view>
								</view>
								<view class="cblb">
									<view class="cblbcSmall" @click="toProvinces(areaList[3])" >
										<image class="hotCityImg" :src="areaList[3].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cblbcSmallText">
												{{areaList[3].name}}
											</view>
										</view>
									</view>
									<view class="cblbcSmall" @click="toProvinces(areaList[4])">
										<image class="hotCityImg" :src="areaList[4].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cblbcSmallText">
												{{areaList[4].name}}
											</view>
										</view>
									</view>
									<view class="cblbcBig" @click="toProvinces(areaList[5])" >
										<image class="hotCityImg" :src="areaList[5].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cblbcBigText">
												{{areaList[5].name}}
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="citysBoxRight">
								<view class="cblt">
									<view class="cbltcBig" @click="toProvinces(areaList[6])" >
										<image class="hotCityImg" :src="areaList[6].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cbltcBigText">
												{{areaList[6].name}}
											</view>
										</view>
									</view>
									<view class="cbltcSmall" @click="toProvinces(areaList[7])" >
										<image class="hotCityImg" :src="areaList[7].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cbltcSmallText">
												{{areaList[7].name}}
											</view>
										</view>
									</view>
									<view class="cbltcSmall" @click="toProvinces(areaList[8])" >
										<image class="hotCityImg" :src="areaList[8].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cbltcSmallText">
												{{areaList[8].name}}
											</view>
										</view>
									</view>
								</view>
								<view class="cblb">
									<view class="cblbcSmall" @click="toProvinces(areaList[9])" >
										<image class="hotCityImg" :src="areaList[9].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cblbcSmallText">
												{{areaList[9].name}}
											</view>
										</view>
									</view>
									<view class="cblbcSmall" @click="toProvinces(areaList[10])" >
										<image class="hotCityImg" :src="areaList[10].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cblbcSmallText">
												{{areaList[10].name}}
											</view>
										</view>
									</view>
									<view class="cblbcBig" @click="toProvinces(areaList[11])" >
										<image class="hotCityImg" :src="areaList[11].image" mode="scaleToFill" :lazy-load="true"></image>
										<view class="cbltcBigTextBox">
											<view class="cblbcBigText">
												{{areaList[11].name}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>	
				</view>
				<!-- 正在旅行 -->
				<view class="touring">
					<text class="tourtext">正在旅行</text>
					<view class="wrap" >
						<articleWaterfall :list="list"></articleWaterfall>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	// 引入mescroll-mixins.js
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import articleWaterfall from '@/common/article-waterfall/article-waterfall.vue';
	export default {
		components: {
			uniNavBar,
			articleWaterfall
		},
		mixins: [MescrollMixin],
		data() {
			return {
				downOption: {
					auto:false
				},
				upOption: {
					auto:false,
					bgColor: '#F8F8F8'
				},
				backgroundColor: 'transparent',
				firstTime: new Date().getTime(),
				cityName: '',
				province: '',
				state_id: '',
				city_id: '',
				hotAtt: [],
				list: [],
				uswiperlist:[
					{
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						title: '身无彩凤双飞翼，心有灵犀一点通'
					}
				],
				token: '',
				liked: '',
				page: 1,
				pagesize: 6,
				loadStatus: 'loading',
				isLoadMore: false,
				item: null,
				topHotCity: [],
				isLike: false,
				likeNum: 0,
				bannerList: null,
				indicatorDots: true,
				areaList: [],
				url: '',
				serviceProvider: '',
				cus_sty_top: '156rpx'
			};
		},
		onShow() {
		},
		onLoad() {
			this.serviceProvider = getApp().globalData.serviceProvider
			this.loadData()
		},
		// 滚动
		onPageScroll(e) {
			if (e.scrollTop >= 100){
				if (e.scrollTop >= 150 && this.backgroundColor == 'rgba(58, 61, 70, 0.25)'){
					return
				}
				this.backgroundColor = 'rgba(58, 61, 70, 0.25)';
			} else {
				this.backgroundColor = 'transparent';
			}
		},

		methods: {
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			loadData(){
				uni.showLoading({
					title: '加载中',
					mask: true,
					success: () => {
						this.getBanner();
						this.getAdress();
						this.getAreaHot();
						
						setTimeout(() => {
							this.mescroll.resetUpScroll();
							this.hideLoad()
						}, 500);
					}
				});
				
			},
			hideLoad(){
				setTimeout(() => {
					uni.hideLoading();
				}, 500);
			},
			// 获取热门目的地
			getAreaHot(){
				var that = this
				this.HTTP.request({
					url: '/area/hot',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.areaList = res.data.data;
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
						this.bannerList = res.data.data;
						if (this.bannerList.length == 0) {
							this.cus_sty_top = '156rpx'
						} else {
							this.cus_sty_top = '0rpx'
						}
					}
				});
			},
			// 获取当前地理位置
			getAdress() {
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						if (res.city && res.province) {
							this.cityName = res.city.substr(0, res.city.length - 1);
							this.city = res.city;
							this.province = res.province;
						} else {
							let arr = [];
							arr.push(res.latitude);
							arr.push(res.longitude);
							arr = arr.join(',');
							uni.request({
								url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=NKyWaSnsW6FFEseeCEX18Fpvgzs3jcmd&output=json&coordtype=wgs84ll',
								data: {
									location: arr
								},
								success: result => {
									if (result.data.status == 0) {
										this.cityName = result.data.result.addressComponent.city.substr(0, result.data.result.addressComponent.city
											.length - 1);
										this.city = result.data.result.addressComponent.city;
										this.province = result.data.result.addressComponent.province;
									} else {
										uni.showToast({
											title: result.errMsg
										});
									}
								}
							});
						}
					},
					// 未开启定位
					fail: error => {
						this.cityName = '未定位'
					}
				});
				
			},
			
			// 点击banner
			towebview(item) {
				uni.navigateTo({
					url: `/pages/webview/webview?url=${item.url}`
				});
			},
			// 跳转文章详情
			toArticleDetail(e) {
				let id = e.currentTarget.id;
				uni.navigateTo({
					url: '/pages_content/article/article?article_id=' + id
				});
			},
			// 点赞 
			clickLeftLike(e, index) {
				this.updateLike(e,index,true) 
			}, 
			clickRightLike(e, index) {
				this.updateLike(e,index,false) 
			},
			updateLike(e, index, left){
				let Authorization = uni.getStorageSync('Authorization')
				if (!Authorization){
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				
				let article = e.article_id;
				let liked = e.liked;
				var that = this;
				this.HTTP.request({
					url: '/user/liked',
					data: {
						article_id: article,
						liked: liked == 0 ? 1 : 0
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						
						if (left){
							this.$refs.uWaterfall.leftList[index].liked = res.data.data.liked
							this.$refs.uWaterfall.leftList[index].like_count = res.data.data.like_count
						}else{
							this.$refs.uWaterfall.rightList[index].liked = res.data.data.liked
							this.$refs.uWaterfall.rightList[index].like_count = res.data.data.like_count
						}
					}
				});
			},
			// 跳转省市主题页
			toProvincesNC(){
				var name = this.cityName
				var obj = this.areaList.find(function(value, index, arr){
					if (value.name === name){
						return true
					}
				})
				if (!obj){
					uni.showToast({
						title: '抱歉，当前定位城市暂未开放，推荐您选择/搜索其他热门城市',
						icon: 'none',
						duration: 3000
					});
				} else {
					uni.navigateTo({
						url: '/pages_content/provinces/provinces?state_id=' + 
						obj.state_id+"&city_id="+obj.city_id+"&name="+obj.name+"&image="+obj.image
					});
				}
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
					this.firstTime = new Date().getTime();
				}
				
				let that = this
				this.HTTP.request({
					url: '/article/list?page=' + pageNum + '&count=' + pageSize,
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
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
	

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */
	/* 导航栏轮播图 */
	.page-section {
		width: 100%;
		height: 440rpx;
		.page-section-spacing {
			width: 100%;
			height: 440rpx;
			.bannerImg{
				width: 100%;
				height: 100%;
			}
		}
	}
	.swiper {
		width: 100%;
		height: 100%;
		.swiperImg {
			width: 100%;
			height: 100%;
		}
	}

	.nav-bar {
		flex-wrap: wrap;
		justify-content: center;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		background: rgba(58, 61, 70, 0.25);
	}
	
	.headerL{
		display: flex;
		align-items: center;
		margin-left: 20px;
		height: 76rpx;
		// width: 260rpx;
		.world{
			.worldText{
				width: 110rpx;
				height: 48rpx;
				font-size: 34rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 48rpx;
			}
			.worldLine{
				width: 102rpx;
				height: 4rpx;
				background: #FFFFFF;
				border-radius: 2rpx;
			}
		}
		.nowCityName{
			z-index: 100;
			margin-left: 20rpx;
			display: flex;
			align-items: center;
			height: 64rpx;
			.nowCityNameText{
				width: 65rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 40rpx;
			}
			.downIcon{
				width: 48rpx;
				height: 48rpx;
				line-height: 48rpx;
				.downIconImg{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.mescroll {
		position: relative;
		top: -184rpx;
		left: 0;
	}


	.input-view {
		display: flex;
		flex-direction: row;
		width: 212rpx;
		height: 64rpx;
		align-items: center;
		background: rgba(248, 248, 248, 1);
		border-radius: 36rpx;
		flex-wrap: nowrap;
		margin: 0 auto;
		padding-left: 32rpx;
		.input-uni-icon-Box{
			width: 28rpx;
			height: 28rpx;
			line-height: 28rpx;
			.input-uni-icon {
				width: 28rpx;
				height: 28rpx;
			}
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

	.cus-sty {
		background-color: #f8f8f8;
	}

	/* 热门景点 */
	.hot {
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		.wave{
			margin-top: -50rpx;
			width: 100%;
			height: 90rpx;
			.waveImg{
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.citysBox{
		// display: flex;
		// align-items: center;
		.kite-classify-scroll{
		    width: 100%;
			overflow: hidden;
		 	white-space: nowrap;
			display: flex;
			align-items: center;
			.citysBoxLeft{
				display: inline-block;
				.cblt{
					display: flex;
					.cbltcBig{
						width: 226rpx;
						height: 226rpx;
						border-radius: 48rpx;
						margin-left: 28rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						position: relative;
						image{
							position: absolute;
						}
						.cbltcBigText{
							padding: 2rpx 14.6rpx 4rpx 16rpx;
							background: #FFFFFF;
							border-radius: 8rpx;
							opacity: 0.7;
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #303133;
							line-height: 48rpx;
							text-align: center;
							
						}
					}
					.cbltcSmall{
						width: 178rpx;
						height: 178rpx;
						border-radius: 48rpx;
						margin-left: 12rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						display: flex;
						justify-content: center;
						align-items: center;
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						position: relative;
						image{
							position: absolute;
						}
						.cbltcSmallText{
							padding: 2rpx 14.6rpx 4rpx 16rpx;
							background: #FFFFFF;
							border-radius: 8rpx;
							opacity: 0.7;
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #303133;
							line-height: 48rpx;
							text-align: center;
						}
					}
				}
				.cblb{
					display: flex;
					align-items: center;
					margin-left: 28rpx;
					.cblbcBig{
						width: 226rpx;
						height: 226rpx;
						border-radius: 48rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						position: relative;
						image{
							position: absolute;
						}
						.cblbcBigText{
							padding: 2rpx 14.6rpx 4rpx 16rpx;
							background: #FFFFFF;
							border-radius: 8rpx;
							opacity: 0.7;
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #303133;
							line-height: 48rpx;
							text-align: center;
						}
					}
					.cblbcSmall{
						width: 178rpx;
						height: 178rpx;
						border-radius: 48rpx;
						margin-right: 12rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						position: relative;
						image{
							position: absolute;
						}
						.cblbcSmallText{
							padding: 2rpx 14.6rpx 4rpx 16rpx;
							background: #FFFFFF;
							border-radius: 8rpx;
							opacity: 0.7;
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #303133;
							line-height: 48rpx;
							text-align: center;
						}
					}
				}
			}
			.citysBoxRight{
				display: inline-block;
				margin-right: 28rpx;
				.cblt{
					display: flex;
					.cbltcBig{
						width: 226rpx;
						height: 226rpx;
						border-radius: 48rpx;
						margin-left: 12rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						position: relative;
						image{
							position: absolute;
						}
						.cbltcBigTextBox{
							padding: 2rpx 14.6rpx 4rpx 16rpx;
							background: #FFFFFF;
							border-radius: 8rpx;
							opacity: 0.7;
							.cbltcBigText{
								font-size: 32rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #303133;
								line-height: 48rpx;
								text-align: center;
							}
						}
					}
					.cbltcSmall{
						width: 178rpx;
						height: 178rpx;
						border-radius: 48rpx;
						margin-left: 12rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						position: relative;
						image{
							position: absolute;
						}
						.cbltcBigTextBox{
							padding: 2rpx 14.6rpx 4rpx 16rpx;
							background: #FFFFFF;
							border-radius: 8rpx;
							opacity: 0.7;
							.cbltcSmallText{
								font-size: 32rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #303133;
								line-height: 48rpx;
								text-align: center;
								z-index: 1;
							}
						}
						
					}
				}
				.cblb{
					display: flex;
					align-items: center;
					margin-left: 12rpx;
					.cblbcBig{
						width: 226rpx;
						height: 226rpx;
						border-radius: 48rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						position: relative;
						image{
							position: absolute;
						}
						.cbltcBigTextBox{
							padding: 2rpx 14.6rpx 4rpx 16rpx;
							background: #FFFFFF;
							border-radius: 8rpx;
							opacity: 0.7;
							.cblbcBigText{
								font-size: 32rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #303133;
								line-height: 48rpx;
								text-align: center;
							}
						}
						
					}
					.cblbcSmall{
						width: 178rpx;
						height: 178rpx;
						border-radius: 48rpx;
						margin-right: 12rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						position: relative;
						image{
							position: absolute;
						}
						.cbltcBigTextBox{
							padding: 2rpx 14.6rpx 4rpx 16rpx;
							background: #FFFFFF;
							border-radius: 8rpx;
							opacity: 0.7;
							.cblbcSmallText{
								font-size: 32rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #303133;
								line-height: 48rpx;
								text-align: center;
							}
						}
						
					}
				}
			}
		}
		
	}
	.hotCityImg {
		width: 100%;
		height: 100%;
		border-radius: 48rpx;
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
			margin-left: 32rpx;
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
