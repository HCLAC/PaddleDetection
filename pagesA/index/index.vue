<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true" color="#333333" :backgroundColor="backgroundColor" title="''">
				<view class="headerL" slot="left">
					<view class="world" >
						<view class="worldText">全世界</view>
						<view class="worldLine"></view>
					</view>
					<view class="nowCityName" @click="toProvincesNC()">
						<view class="nowCityNameText">{{ cityName }} </view>
						<view class="downIcon">
							<image class="downIconImg" src="../../static/images/downIcon.svg" mode=""></image>
						</view>
					</view>
				</view>
				<view class="input-view" @click="confirm" slot="center">
					<view class="input-uni-icon-Box">
						<image class="input-uni-icon" src="../../static/images/icon-search.svg" />
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
						<image class="waveImg" src="../../static/images/wave.png" mode=""></image>
					</view>
					<!-- <u-swiper :list="uswiperlist" mode="none" :autoplay="false" ></u-swiper> -->
					<view class="citysBox">
						<scroll-view scroll-x="true" class="kite-classify-scroll" v-if="areaList.length != 0">
							<view class="citysBoxLeft">
								<view class="cblt">
									<view class="cbltcBig" @click="toProvinces(areaList[0])" :style="{backgroundImage: 'url('+areaList[0].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[0].image" mode="scaleToFill"></image> -->
										<view class="cbltcBigTextBox">
											<view class="cbltcBigText">
												{{areaList[0].name}}
											</view>
										</view>
									</view>
									<view class="cbltcSmall" @click="toProvinces(areaList[1])" :style="{backgroundImage: 'url('+areaList[1].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[1].image" mode="scaleToFill"></image> -->
										<view class="cbltcBigTextBox">
											<view class="cbltcSmallText">
												{{areaList[1].name}}
											</view>
										</view>
									</view>
									<view class="cbltcSmall" @click="toProvinces(areaList[2])" :style="{backgroundImage: 'url('+areaList[2].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[2].image" mode="scaleToFill"></image> -->
										<view class="cbltcBigTextBox">
											<view class="cbltcSmallText">
												{{areaList[2].name}}
											</view>
										</view>
									</view>
								</view>
								<view class="cblb">
									<view class="cblbcSmall" @click="toProvinces(areaList[3])" :style="{backgroundImage: 'url('+areaList[3].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[3].image" mode="scaleToFill"></image> -->
										<view class="cbltcBigTextBox">
											<view class="cblbcSmallText">
												{{areaList[3].name}}
											</view>
										</view>
									</view>
									<view class="cblbcSmall" @click="toProvinces(areaList[4])" :style="{backgroundImage: 'url('+areaList[4].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[4].image" mode="scaleToFill"></image> -->
										<view class="cbltcBigTextBox">
											<view class="cblbcSmallText">
												{{areaList[4].name}}
											</view>
										</view>
									</view>
									<view class="cblbcBig" @click="toProvinces(areaList[5])" :style="{backgroundImage: 'url('+areaList[5].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[5].image" mode="scaleToFill"></image> -->
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
									<view class="cbltcBig" @click="toProvinces(areaList[6])" :style="{backgroundImage: 'url('+areaList[6].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[6].image" mode="scaleToFill"></image> -->
										<view class="cbltcBigTextBox">
											<view class="cbltcBigText">
												{{areaList[6].name}}
											</view>
										</view>
									</view>
									<view class="cbltcSmall" @click="toProvinces(areaList[7])" :style="{backgroundImage: 'url('+areaList[7].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[7].image" mode="scaleToFill"></image> -->
										<view class="cbltcBigTextBox">
											<view class="cbltcSmallText">
												{{areaList[7].name}}
											</view>
										</view>
									</view>
									<view class="cbltcSmall" @click="toProvinces(areaList[8])" :style="{backgroundImage: 'url('+areaList[8].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[8].image" mode="scaleToFill"></image> -->
										<view class="cbltcBigTextBox">
											<view class="cbltcSmallText">
												{{areaList[8].name}}
											</view>
										</view>
									</view>
								</view>
								<view class="cblb">
									<view class="cblbcSmall" @click="toProvinces(areaList[9])" :style="{backgroundImage: 'url('+areaList[9].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[9].image" mode="scaleToFill"></image> -->
										<view class="cbltcBigTextBox">
											<view class="cblbcSmallText">
												{{areaList[9].name}}
											</view>
										</view>
									</view>
									<view class="cblbcSmall" @click="toProvinces(areaList[10])" :style="{backgroundImage: 'url('+areaList[10].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[10].image" mode="scaleToFill"></image> -->
										<view class="cbltcBigTextBox">
											<view class="cblbcSmallText">
												{{areaList[10].name}}
											</view>
										</view>
									</view>
									<view class="cblbcBig" @click="toProvinces(areaList[11])" :style="{backgroundImage: 'url('+areaList[11].image+')'}">
										<!-- <image class="hotCityImg" :src="areaList[11].image" mode="scaleToFill"></image> -->
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
				<view class="touring" id="touring">
					<text class="tourtext">正在旅行</text>
					<view class="wrap" >
						<u-waterfall v-model="list" ref="uWaterfall"> 
							<template v-slot:left="{ leftList }"> 
								<view class="demo-warter" v-for="(item, index) in leftList" :key="index"> 
									<view class="" @click="toArticleDetail" :id="item.article_id"> 
										<view class="demo-top"> 
											<view class="imgBox"> 
												<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" lazy-load="true" :src="item.image" :index="index" 
												 mode="widthFix"> 
													<view class="videoIcon" v-if="item.type == 4"> 
														<image class="playIcon" src="../../static/images/playIcon.svg" mode=""></image> 
													</view> 
												</image>
												<view class="adress"> 
													<view class="adreessIcon"> 
														<image class="" src="../../static/images/iconMap3.svg" mode=""></image> 
													</view> 
													<view class="adressText">{{ item.location  }}</view> 
												</view> 
											</view> 
										</view> 
										<view class="titleTip"> 
											<view class="demo-tag"> 
												<view class="demo-tag-owner" v-if="item.type == 1">游记</view> 
												<view class="demo-tag-owner" v-else-if="item.type == 2">攻略</view> 
												<view class="demo-tag-owner" v-else-if="item.type == 4">视频</view> 
												<view class="demo-tag-owner" v-else>旅游</view> 
											</view> 
											<view class="demo-title">{{ item.title }}</view> 
										</view> 
									</view> 
									<view class="demo-user"> 
										<view class="userMessage"> 
											<image class="userHeard" :src="item.avatar"></image> 
											<view class="userNikename">{{ item.author_name }}</view> 
										</view> 
										<view class="count" @click="clickLeftLike(item,index) in leftList "> 
											<view class="countImg"> 
												<image class="likeImg" mode="aspectFit" :src="item.liked == 0?'../../static/images/heart.svg':'../../static/images/heart_actived.svg'"></image> 
											</view> 
											<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view> 
										</view> 
									</view> 
								</view> 
							</template> 
							<template v-slot:right="{ rightList }"> 
								<view class="demo-warter" v-for="(item, index) in rightList" :key="index"> 
									<view class="" @click="toArticleDetail" :id="item.article_id"> 
										<view class="demo-top"> 
											<view class="imgBox"> 
												<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" lazy-load="true" :src="item.image" :index="index" 
												 mode="widthFix"> 
													<view class="videoIcon" v-if="item.type == 4"> 
														<image class="playIcon" src="../../static/images/playIcon.svg" mode=""></image> 
													</view> 
												</image> 
												<view class="adress"> 
													<view class="adreessIcon"> 
														<image class="" src="../../static/images/iconMap3.svg" mode=""></image> 
													</view> 
													<view class="adressText">{{ item.location }}</view> 
												</view> 
											</view> 
										</view> 
										<view class="titleTip"> 
											<view class="demo-tag"> 
												<view class="demo-tag-owner" v-if="item.type == 1">游记</view> 
												<view class="demo-tag-owner" v-else-if="item.type == 2">攻略</view> 
												<view class="demo-tag-owner" v-else-if="item.type == 4">视频</view> 
												<view class="demo-tag-owner" v-else>旅游</view> 
											</view> 
											<view class="demo-title">{{ item.title }}</view> 
										</view> 
									</view> 
									<view class="demo-user"> 
										<view class="userMessage"> 
											<image class="userHeard" :src="item.avatar"></image> 
											<view class="userNikename">{{ item.author_name }}</view> 
										</view> 
										<view class="count" @click="clickRightLike(item,index) in rightList"> 
											<view class="countImg"> 
												<image class="likeImg" mode="aspectFit" :src="item.liked == 0?'../../static/images/heart.svg':'../../static/images/heart_actived.svg'"}}></image> 
											</view> 
											<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view> 
										</view> 
									</view> 
								</view> 
							</template> 
						</u-waterfall> 
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
	export default {
		components: {
			uniNavBar,
		},
		mixins: [MescrollMixin],
		data() {
			return {
				downOption: {
					auto:false
				},
				upOption: {
					auto:false
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
				upOption: {
					bgColor: '#F8F8F8'
				},
				cus_sty_top: '156rpx'
			};
		},
		onShow() {
		},
		onLoad() {
			this.serviceProvider = getApp().globalData.serviceProvider
			this.loadData()
			this.mescroll.resetUpScroll();
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
					}
				});
			},
			hideLoad(){
				uni.hideLoading();
			},
			// 获取热门目的地
			getAreaHot(){
				var that = this
				uni.request({
					url: this.globalUrl + '/area/hot',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.areaList = res.data.data;
					},
					fail: error => {
						console.error(error);
					},
					complete: () => {
						that.hideLoad()
					}
				});
			},
			// 获取banner
			getBanner() {
				uni.request({
					url: this.globalUrl + '/banner',
					data: {
						// #ifdef MP-WEIXIN
						source: 3,
						// #endif
						// #ifdef MP-BAIDU
						source: 1,
						// #endif
						// #ifdef MP-TOUTIAO
						source: 2
						// #endif
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
					},
					fail: error => {
						uni.showToast({
							title: error,
							icon: 'none'
						});
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
								},
								fail: () => {
									un.uni.showToast({
										title: '网络不给力~,请稍后再试',
										icon: 'none'
									});
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
					url: '/pages/contentdetail/contentdetail?article_id=' + id
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
						url: '/pagesA/login/login'
					});
					return
				}
				
				let article = e.article_id;
				let liked = e.liked;
				var that = this;
				uni.request({
					url: this.globalUrl + '/user/liked',
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
						url: '/pages/provinces/provinces?state_id=' + 
						obj.state_id+"&city_id="+obj.city_id+"&name="+obj.name+"&image="+obj.image
					});
				}
			},
			toProvinces(e) {
				uni.navigateTo({
					url: '/pages/provinces/provinces?state_id=' + 
					e.state_id+"&city_id="+e.city_id+"&name="+e.name+"&image="+e.image
				});
			},
			confirm() {
				uni.navigateTo({
					url: '../../pages/search/search'
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
				uni.request({
					url: this.globalUrl + '/article/list?page=' + pageNum + '&count=' + pageSize,
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

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		/* background-color: #efeff4; */
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	/* 自定义导航栏 */
	#navbarbox {
		background-color: #007aff !important;
	}

	.search-box {
		width: 486rpx;
		height: 64rpx;
		padding-left: 28rpx;
		z-index: 111;
	}

	.search-wrap {
		width: 486rpx;
		height: 64rpx;
	}

	/* 导航栏轮播图 */
	.page-section {
		/* position: relative;
	top: -184rpx;
	left: 0; */
		width: 100%;
		height: 440rpx;
	}

	.page-section-spacing {
		width: 100%;
		height: 440rpx;
		.bannerImg{
			width: 100%;
			height: 100%;
		}
	}

	.swiper {
		width: 100%;
		height: 100%;
	}

	.itemUrl {
		width: 100%;
		height: 100%;
	}

	.swiperImg {
		width: 100%;
		height: 100%;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		/* align-items: center; */
		/* padding-top: 12rpx; */
		font-size: 14px;
	}
	.mediaRight{
		display: flex;
		align-items: center;
	}
	.headerL{
		display: flex;
		align-items: center;
		margin-left: 20px;
		height: 76rpx;
		// width: 260rpx;
		.world{
			
			.worldText{
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

	.mescroll1 {
		position: relative;
		top: 0;
		left: 0;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}

	.example-body {
		display: flex;
		flex-direction: column;
		// background-color: #ffffff;
		background: rgba(58, 61, 70, 0.25);
	}

	.word-btn-white {
		font-size: 18px;
		color: #ffffff;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		/* page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	} */

		/* view {
		font-size: 14px;
		line-height: inherit;
	} */

		/* #endif */
		/* flex-direction: row;
	align-items: center;
	justify-content: flex-start; */
		/* width: 160rpx;
 */
		/* 	margin-left: 28rpx;
 */
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

	.cus-sty1 {
		background-color: #f8f8f8;
		margin-top: 156rpx;
	}

	/* 热门景点 */
	.hot {
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
	}
	.wave{
		margin-top: -50rpx;
		width: 100%;
		height: 90rpx;
		.waveImg{
			width: 100%;
			height: 100%;
		}
	}
	.waveNoB{
		margin-top:20rpx
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
	.u-swiper-text{
		color: #007AFF;
	}
	.hot .hot-top {
		display: flex;
		justify-content: space-between;
	}

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

	.hot-top .ht-r {
		width: 94rpx;
		height: 42rpx;
		background: #edeff2;
		border-radius: 24rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #606266;
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

	/* 热门景点图 */
	.hot .hot-bot {
		/* display: flex; */
		margin-top: 32rpx;
	}

	.hotAdress {
		display: flex;
		/* align-items: center; */
		margin-left: 32rpx;
	}

	.dqwz {
		width: 216rpx;
		height: 180rpx;
		border-radius: 16rpx;
		// border: 4rpx solid #ffe512;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		// overflow: hidden;
	}

	.dqwzBg {
		width: 216rpx;
		height: 174rpx;
		border-radius: 16rpx;
		border: 4rpx solid #ffe512;
	}

	.dqwzImg {
		width: 216rpx;
		height: 174rpx;
		border-radius: 16rpx;
		border: 4rpx solid #ffe512;
	}

	.dqwzBox {
		position: absolute;
		text-align: center;
	}

	.dqwzText {
		position: absolute;
		top: 50rpx;
		left: 78rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #ffffff;
		line-height: 32rpx;
	}

	.adressBox {
		position: absolute;
		top: 90rpx;
		left: 38rpx;
		display: flex;
		align-items: center;
		padding: 8rpx 16rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 16rpx;
		width: 140rpx;
		height: 40rpx;
		background: #ffe512;
		border-radius: 11px;
	}

	/* 无banner时 */
	.dqwznoba {
		width: 216rpx;
		height: 180rpx;
		border-radius: 16rpx;
		// border: 4rpx solid #ffe512;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mask {
		width: 216rpx;
		height: 180rpx;
		background: rgba(0, 0, 0, 0.25);
		border-radius: 16rpx;
		position: absolute;
	}

	.mask1 {
		width: 208rpx;
		height: 172rpx;
		background: rgba(0, 0, 0, 0.25);
		border-radius: 16rpx;
		position: absolute;
	}

	.dqwzImgnoba {
		width: 100%;
		height: 100%;
		border: 4rpx solid #ffe512;
		border-radius: 16rpx;
	}

	.dqwzBoxnoba {
		position: absolute;
		text-align: center;
	}

	.dqwzTextnoba {
		position: absolute;
		top: 50rpx;
		left: 78rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #ffffff;
		line-height: 32rpx;
	}

	.adressBoxnoba {
		display: flex;
		align-items: center;
		position: absolute;
		top: 90rpx;
		left: 38rpx;
		color: #ffffff;
		padding: 8rpx 16rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 16rpx;
		width: 140rpx;
		height: 40rpx;
		background: #ffe512;
		border-radius: 22rpx;
	}

	.zhishi {
		width: 24rpx;
		height: 24rpx;
		margin-right: 4rpx;
	}

	.dqwzText1 {
		height: 20rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 20rpx;

	}
	.dqwzText2{
		height: 20rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 20rpx;
	}

	.hot {
		/* margin-top: 176rpx; */
	}

	.hotCity {
		width: 216rpx;
		height: 180rpx;
		border-radius: 16rpx;
		margin-left: 24rpx;
		position: relative;
	}

	.hotCityImg {
		width: 100%;
		height: 100%;
		border-radius: 48rpx;
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

	.cityRank {
		margin-top: 28rpx;
		margin-left: 32rpx;
		margin-bottom: 28rpx;
		display: flex;
		align-items: center;
	}

	.rankText {
		width: 212rpx;
		font-size: 28rpx;
		text-align: center;
	}

	/* 正在旅行 */
	.touring {
		// margin-top: 24rpx;
		background: #FFFFFF;
	}

	.touring .tourtext {
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
		padding: 0 14rpx 0 28rpx;
	}


	.demo-warter {
		width: 340rpx;
		margin-top: 0;
		margin-right: 14rpx;
		margin-bottom: 16rpx;
		padding-bottom: 16rpx;
		/* position: relative; */
		background-color: #ffffff;
		border-radius: 16rpx 16rpx;
		box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
		// display: inline-block;
		// break-inside: avoid;
		// box-sizing: border-box;
	}

	.imgBox {
		position: relative;
		display: flex;
		align-items: flex-end;

	}

	// .imgBox4{
	// 	position: relative;
	// 	display: flex;
	// 	align-items: flex-end;

	// }
	/* .demo-top {
	position: relative;
}
 */
	image {
		will-change: transform
	}

	.demoImage {
		width: 100%;
		// min-height: 300rpx;
		max-height: 800rpx;
		// box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
		border-radius: 16rpx 16rpx 0px 0px;

	}

	.demoImage4 {
		width: 100%;
		// min-height: 272rpx;
		max-height: 800rpx;
		// box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
		border-radius: 16rpx 16rpx 0px 0px;
		
	}

	.videoIcon {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -30rpx;
		margin-left: -30rpx;
		width: 60rpx;
		height: 60rpx;
	}

	.playIcon {
		width: 100%;
		height: 100%;
	}

	.adress {
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		max-width: 240rpx;
		height: 40rpx;
		padding-right: 16rpx;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 0px 14rpx 0px 0px;
	}

	.adreessIcon {
		width: 24rpx;
		height: 24rpx;
		margin: 0 4rpx;
		display: flex;
	}

	.adreessIcon image {
		width: 100%;
		height: 100%;
	}

	.adressText {
		max-width: 192rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		/* line-height:24px; */
		/* margin-right: 16rpx; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.titleTip {
		display: flex;
		margin-top: 10rpx;
		margin-left: 8rpx;
	}

	.demo-title {
		width: 278rpx;
		/* max-height: 70rpx; */
		padding-right: 20rpx;
		font-size: 28rpx;
		// font-family: PingFangSC-Medium, PingFang SC;
		// font-weight: 500;
		color: rgba(48, 49, 51, 1);
		margin-left: 8rpx;
		line-height: 46rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.demo-tag {
		margin-top: 9rpx;
	}

	.demo-tag-owner {
		width: 52rpx;
		height: 28rpx;
		text-align: center;
		align-items: center;
		color: #0091ff;
		border: 2rpx solid rgba(0, 145, 255, 1);
		border-radius: 14rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 145, 255, 1);
		/* margin-top: 6rpx; */
	}

	.demo-user {
		width: 100%;
		font-size: 10rpx;
		margin-top: 24rpx;
		/* margin-bottom: 16rpx; */
		display: flex;
		align-items: center;
		justify-content: space-between;
		// box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
		// border-radius: 0px 0px 16rpx 16rpx;
	}

	.userMessage {
		font-size: 10px;
		font-weight: 900;
		color: #464646;
		display: flex;
		align-items: center;
	}

	.userHeard {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-left: 14rpx;
	}

	.userNikename {
		font-size: 24rpx;
		margin-left: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(96, 98, 102, 1);
	}

	.count {
		display: flex;
		align-items: center;
		margin-right: 20rpx;
	}
	/* #ifdef MP-TOUTIAO || MP-WEIXIN */
	.count image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 8rpx;
		display: flex;
		align-items: center;
	}
	/* #endif */
	.countImg {
		width: 28rpx;
		height: 28rpx;
		// margin-right: 8rpx;

	}

	.likeImg {
		width: 100%;
		height: 100%;
	}

	.likeCount {
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		margin-left: 8rpx;
		color: rgba(96, 98, 102, 1);
		/* line-height:20rpx; */
	}
</style>
