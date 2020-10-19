<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" color="#333333" :backgroundColor="backgroundColor">
				<match-media :max-width="360"  >
					<view class="input-view" @click="confirm" style="position:relative; top: -6rpx ; ">
						<image class="input-uni-icon" src="../../static/images/icon-search.svg" />
						<input confirm-type="search" class="nav-bar-input" type="text" placeholder="搜索热门目的地" disabled="true" />
					</view>
				</match-media>
				<match-media :max-width="375" :min-width="361">
					<view class="input-view" @click="confirm">
						<image class="input-uni-icon" src="../../static/images/icon-search.svg" />
						<input confirm-type="search" class="nav-bar-input" type="text" placeholder="搜索热门目的地" disabled="true" />
					</view>
				</match-media>
				
				<match-media :min-width="376" :max-width="414" >
					<view class="input-view" @click="confirm" style="position:relative; top: -6rpx ; ">
						<image class="input-uni-icon" src="../../static/images/icon-search.svg" />
						<input confirm-type="search" class="nav-bar-input" type="text" placeholder="搜索热门目的地" disabled="true" />
					</view>
				</match-media>
				<match-media :min-width="415">
					<view class="input-view" @click="confirm" >
						<image class="input-uni-icon" src="../../static/images/icon-search.svg" />
						<input confirm-type="search" class="nav-bar-input" type="text" placeholder="搜索热门目的地" disabled="true" />
					</view>
				</match-media>
			</uni-nav-bar>
		</view>

		<!-- 内容 -->
		<mescroll-uni
			v-if="bannerList.length != 0"
			@scroll="uniScroll"
			class="mescroll"
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
			:down="downOption"
			:up="upOption"
		>
			<!-- 头部轮播图 -->
			<view class="page-section " v-if="bannerList.length != 0">
				
				<view class="page-section-spacing">
					<swiper :autoplay="true" class="swiper" indicator-dots="true" indicator-active-color="#FAAD14">
						<swiper-item v-for="(item, index) in bannerList" :key="index" class="swiper-item">
							<!-- <navigator :url="'/components/web-view/web-view?website=' + item.url" class="itemUrl"> -->
							<image :src="item.image" mode="scaleToFill" class="swiperImg" @click="towebview(item)"><!-- <web-view :src="item.url"></web-view> --></image>
							<!-- </navigator> -->
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="cus-sty ">
				<!-- 热门目的地 -->
				<view class="hot">
					<view class="hot-top">
						<text class="ht-l">热门目的地</text>
						<view class="ht-r" @click="showCity">
							更多
							<image src="../../static/images/more-right.svg" class="moreIcon" mode=""></image>
						</view>
					</view>

					<view class="hot-bot" v-if="areaList && areaList.length">
						<view class="hotAdress">
							<!-- 当前位置 -->
							<view class="dqwz" @click="toProvinces(areaList[0])">
								<image class="dqwzBg" src="../../static/images/bg.png" mode="scaleToFill" v-if="!areaList[0].image"></image>
								<view class="mask1" v-if="areaList[0].image"></view>
								<image class="dqwzImg" :src="areaList[0].image" mode="scaleToFill" v-if="areaList[0].image"></image>
								<text class="dqwzText">{{ cityName }}</text>
								<view class="adressBox">
									<image class="zhishi" src="../../static/images/iconMapt.svg" mode=""></image>
									<text class="dqwzText1">{{ dqdwText }}</text>
								</view>
							</view>
							<view class="hotCity" @click="toProvinces(areaList[1])">
								<view class="mask"></view>
								<image class="hotCityImg" :src="areaList[1].image" mode="scaleToFill"></image>
								<text class="hotCityText">{{ areaList[1].name }}</text>
							</view>
							<view class="hotCity" @click="toProvinces(areaList[2])">
								<view class="mask"></view>
								<image class="hotCityImg" :src="areaList[2].image" mode="scaleToFill"></image>
								<text class="hotCityText1">{{ areaList[2].name }}</text>
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
							<view class="rankText" @click="toProvinces(areaList[8])">{{ areaList[8].name }}</view>
						</view>
					</view>
				</view>

				<!-- 正在旅行 -->
				<view class="touring" id="touring">
					<text class="tourtext">正在旅行</text>
					<view class="wrap">
						<view class="left">
							<view class="demo-warter" v-for="(item, index) in list" :key="index" v-if="index % 2 == 0">
								<view class="" @click="onPageJump" :id="item.article_id">
									<view class="demo-top">
										<view class="imgBox">
											<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :src="item.image" :index="index"  mode="widthFix">
												<view class="videoIcon" v-if="item.type == 4">
													<image class="playIcon"  src="../../static/images/playIcon.svg" mode=""></image>
												</view>
											</image>
											<view class="adress">
												<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>
												<view class="adressText">{{ item.location }}</view>
											</view>
										</view>
									</view>
									<view class="titleTip">
										<view class="demo-tag">
											<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
											<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
											<view class="demo-tag-owner" v-if="item.type == 4">视频</view>
										</view>
										<view class="demo-title">{{ item.title }}</view>
									</view>
								</view>
								<view class="demo-user">
									<view class="userMessage">
										<image class="userHeard" :src="item.avatar"></image>
										<view class="userNikename">{{ item.author_name }}</view>
									</view>
									<view class="count" @click="clickLike(item, index)">
										<view class="countImg">
											<image src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
											<image src="../../static/images/heart-actived.svg" v-if="item.liked == 1"></image>
										</view>
										<view class="likeCount">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="right">
							<view class="demo-warter" v-for="(item, index) in list" :key="index" v-if="index % 2 == 1">
								<view class="" @click="onPageJump" :id="item.article_id">
									<view class="demo-top">
										<view class="imgBox">
											<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :src="item.image" :index="index"  mode="widthFix">
												<view class="videoIcon" v-if="item.type == 4">
													<image class="playIcon"  src="../../static/images/playIcon.svg" mode=""></image>
												</view>
											</image>
											<view class="adress">
												<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>
												<view class="adressText">{{ item.location }}</view>
											</view>
										</view>
									</view>
									<view class="titleTip">
										<view class="demo-tag">
											<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
											<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
											<view class="demo-tag-owner" v-if="item.type == 4">视频</view>
										</view>
										<view class="demo-title">{{ item.title }}</view>
									</view>
								</view>
								<view class="demo-user">
									<view class="userMessage">
										<image class="userHeard" :src="item.avatar"></image>
										<view class="userNikename">{{ item.author_name }}</view>
									</view>
									<view class="count" @click="clickLike(item, index)">
										<view class="countImg">
											<image src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
											<image src="../../static/images/heart-actived.svg" v-if="item.liked == 1"></image>
										</view>
										<view class="likeCount">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
		<!-- 无banner时 -->
		<mescroll-uni
			v-if="bannerList.length == 0"
			@scroll="uniScroll"
			class="mescroll1"
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
			:down="downOption"
			:up="upOption"
		>
			
			<view class="cus-sty ">
				<!-- 热门目的地 -->
				<view class="hot">
					<view class="hot-top">
						<text class="ht-l">热门目的地</text>
						<view class="ht-r" @click="showCity">
							更多
							<image src="../../static/images/more-right.svg" class="moreIcon" mode=""></image>
						</view>
					</view>
					<view class="hot-bot" v-if="areaList != null">
						<view class="hotAdress">
							<!-- 当前位置 -->
							<view class="dqwznoba" @click="toProvinces(areaList[0])">
								<image class="dqwzImgnoba" src="../../static/images/bg.png" mode="scaleToFill" v-if="!areaList[0].image"></image>
								<view class="mask1" v-if="areaList[0].image"></view>
								<image class="dqwzImgnoba" :src="areaList[0].image" mode="scaleToFill" v-if="areaList[0].image"></image>
								<view class="dqwzBoxnoba">
									<text class="dqwzTextnoba">{{ cityName }}</text>
									<view class="adressBoxnoba">
										<image class="zhishi" src="../../static/images/iconMapt.svg" mode=""></image>
										<text class="dqwzText1">{{ dqdwText }}</text>
									</view>
								</view>
							</view>
							<view class="hotCity" @click="toProvinces(areaList[1])">
								<view class="mask"></view>
								<image class="hotCityImg" :src="areaList[1].image" mode="scaleToFill"></image>
								<text class="hotCityText">{{ areaList[1].name }}</text>
							</view>
							<view class="hotCity" @click="toProvinces(areaList[2])">
								<view class="mask"></view>
								<image class="hotCityImg" :src="areaList[2].image" mode="scaleToFill"></image>
								<text class="hotCityText1">{{ areaList[2].name }}</text>
							</view>
						</view>
						<view class="cityRank">
							<view class="rankText" @click="toProvinces(areaList[3])">{{ areaList[3].name }}</view>
							<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx"></u-line>
							<view class="rankText" @click="toProvinces(areaList[4])">{{ areaList[4].name }}</view>
							<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx"></u-line>
							<view class="rankText" @click="toProvinces(areaList[5])">{{ areaList[5].name }}</view>
						</view>
						<view class="cityRank">
							<view class="rankText" @click="toProvinces(areaList[6])">{{ areaList[6].name }}</view>
							<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx"></u-line>
							<view class="rankText" @click="toProvinces(areaList[7])">{{ areaList[7].name }}</view>
							<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx"></u-line>
							<view class="rankText" @click="toProvinces(areaList[8])">{{ areaList[8].name }}</view>
						</view>
					</view>
				</view>

				<!-- 正在旅行 -->
				<view class="touring" id="touring">
					<text class="tourtext">正在旅行</text>
					<view class="wrap">
						<view class="left">
							<view class="demo-warter" v-for="(item, index) in list" :key="index" v-if="index % 2 == 0">
								<view class="" @click="onPageJump" :id="item.article_id">
									<view class="demo-top">
										<view class="imgBox">
											<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'"  :src="item.image" :index="index"  mode="widthFix">
												<view class="videoIcon" v-if="item.type == 4">
													<image class="playIcon"  src="../../static/images/playIcon.svg" mode=""></image>
												</view>
											</image>
											<view class="adress">
												<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>
												<view class="adressText">{{ item.location }}</view>
											</view>
										</view>
									</view>
									<view class="titleTip">
										<view class="demo-tag">
											<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
											<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
											<view class="demo-tag-owner" v-if="item.type == 4">视频</view>
										</view>
										<view class="demo-title">{{ item.title }}</view>
									</view>
								</view>
								<view class="demo-user">
									<view class="userMessage">
										<image class="userHeard" :src="item.avatar"></image>
										<view class="userNikename">{{ item.author_name }}</view>
									</view>
									<view class="count" @click="clickLike(item, index)">
										<view class="countImg">
											<image src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
											<image src="../../static/images/heart-actived.svg" v-if="item.liked == 1"></image>
										</view>
										<view class="likeCount">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count}}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="right">
							<view class="demo-warter" v-for="(item, index) in list" :key="index" v-if="index % 2 == 1">
								<view class="" @click="onPageJump" :id="item.article_id">
									<view class="demo-top">
										<view class="imgBox">
											<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :src="item.image" :index="index" mode="widthFix">
												<view class="videoIcon" v-if="item.type == 4">
													<image class="playIcon"  src="../../static/images/playIcon.svg" mode=""></image>
												</view>
											</image>
											<view class="adress">
												<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>

												<view class="adressText">{{ item.location }}</view>
											</view>
										</view>
									</view>
									<view class="titleTip">
										<view class="demo-tag">
											<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
											<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
											<view class="demo-tag-owner" v-if="item.type == 4">视频</view>
										</view>
										<view class="demo-title">{{ item.title }}</view>
									</view>
								</view>
								<view class="demo-user">
									<view class="userMessage">
										<image class="userHeard" :src="item.avatar"></image>
										<view class="userNikename">{{ item.author_name }}</view>
									</view>
									<view class="count" @click="clickLike(item, index)">
										<view class="countImg">
											<image src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
											<image src="../../static/images/heart-actived.svg" v-if="item.liked == 1"></image>
										</view>
										<view class="likeCount">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniSection from '@/components/uni-section/uni-section.vue';
// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	components: {
		uniIcons,
		uniNavBar,
		uniSection
	},
	mixins: [MescrollMixin],
	data() {
		return {
			backgroundColor: 'transparent',
			firstTime: new Date().getTime(),
			cityName: '',
			dqdwText: '当前位置',
			province: '',
			state_id: '',
			city_id: '',
			hotAtt: [],
			list: [],
			token: '',
			liked: '',
			page: 1,
			pagesize: 6,
			loadStatus: 'loading',
			isLoadMore: false,
			item: null,
			topHotCity: [],
			errCode: 0,
			isLike: false,
			likeNum: 0,
			bannerList: null,
			indicatorDots: true,
			areaList: [],
			url: '',
			e: null
		};
	},

	onShow() {
		// this.getItem();
	},

	onLoad() {
		uni.showLoading({
			title: '加载中',

			success: () => {
				if (this.item == undefined || null) {
					this.getBanner();
					this.getAdress();
				}
			}
		});

		setTimeout(function() {
			uni.hideLoading();
		}, 1000);
	},

	methods: {
		// 接收切换城市信息，请求数据
		getItem() {
			var that = this;
			this.errCode = 0;
			if (this.item != getApp().globalData.item) {
				(this.item = getApp().globalData.item), console.log('item-------', this.item);
				this.cityName = this.item.name;
				uni.request({
					url: this.globalUrl + '/site/hot',
					data: {
						state_id: this.item.state_id,
						city_id: this.item.city_id,
						count: 3
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('跳转热门景点=========', res);
						// uni.setStorageSync('description',res.data)
						this.hotAtt = res.data.data;
					}
				}),
					// 清除旧数据
					// this.$refs.uWaterfall.clear()
					uni.request({
						url: this.globalUrl + '/article/list',
						data: {
							state_id: this.item.state_id,
							city_id: this.item.city_id,
							count: 6,
							page: 1,
							first_time: new Date().getTime()
						},
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
						success: res => {
							console.log('切换文章列表', res);
							uni.setStorageSync('article_id', res.data);
							that.list = [];
							this.mescroll.scrollTo(0, this.mescroll.optUp.toTop.duration);
							that.list = res.data.data.list;
							this.downCallback();
							console.log(that.list, 88888);
						}
					});
			}
		},

		// 获取当前地理位置
		getAdress() {
			var that = this;
			uni.getLocation({
				type: 'wgs84',
				success: res => {
					console.log(111, res);
					if (res.city && res.province) {
						this.cityName = res.city.substr(0, res.city.length - 1);
						this.city = res.city;
						this.province = res.province;
						// console.log('哈哈哈哈哈哈哈哈哈');

						console.log(this.city, this.province);
						uni.request({
							url: this.globalUrl + '/area/hot',
							data: {
								state: this.province ? this.province : null,
								city: this.city ? this.city : null
							},
							success: res => {
								// console.log(this.areaList);
								this.areaList = res.data.data;

								console.log('areaList--', this.areaList);
							}
						});
					} else {
						let arr = [];
						arr.push(res.latitude);
						arr.push(res.longitude);
						console.log(arr);
						arr = arr.join(',');
						uni.request({
							url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=NKyWaSnsW6FFEseeCEX18Fpvgzs3jcmd&output=json&coordtype=wgs84ll',
							data: {
								location: arr
							},
							success: result => {
								if (result.data.status == 0) {
									this.cityName = result.data.result.addressComponent.city.substr(0, result.data.result.addressComponent.city.length - 1);
									this.city = result.data.result.addressComponent.city;
									this.province = result.data.result.addressComponent.province;
									// console.log('哈哈哈哈哈哈哈哈哈');

									console.log('当前定位', this.city, this.province);
									uni.request({
										url: this.globalUrl + '/area/hot',
										data: {
											state: this.province ? this.province : null,
											city: this.city ? this.city : null
										},
										success: res => {
											this.areaList = res.data.data;

											console.log('areaList--', this.areaList);
										}
									});
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
					console.log(111);
					console.log('未开启定位', error);
					// uni.setStorageSync('errCode',res.errCode)
					this.errCode = 1;
					this.dqdwText = '正在定位...';
					setTimeout(() => {
						this.dqdwText = '未获取到定位';
					}, 3000);

					uni.request({
						url: this.globalUrl + '/area/hot',
						data: {
							state: this.province ? this.province : null,
							city: this.city ? this.city : null
						},
						success: res => {
							console.log(this.areaList);
							this.areaList = res.data.data;

							console.log('areaList--', this.areaList);
						},
						fail: error => {
							console.log(error);
						}
					});

					// console.log('哈哈哈哈哈哈哈哈哈');
					// 获取热门目的地
				}
			});
			// 获取文章列表
			console.log('token', uni.getStorageSync('Authorization'));
			uni.request({
				url: this.globalUrl + '/article/list',
				data: {
					count: 6,
					page: 1,
					first_time: new Date().getTime()
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: res => {
					console.log('文章列表', res);
					if (res.data.data == null) {
						uni.request({
							url: this.globalUrl + '/article/list',
							data: {
								count: 6,
								page: 1,
								first_time: new Date().getTime()
							},
							success: res => {
								uni.setStorageSync('article_id', res.data);
								// console.log('存储文章列表==',res.data)
								this.list = res.data.data.list;
								// console.log('list=====',this.list)
							}
						});
					} else {
						uni.setStorageSync('article_id', res.data);
						// console.log('存储文章列表==',res.data)
						this.list = res.data.data.list;
						// console.log('list=====',this.list)
					}
				}
			});
		},
		uniScroll(e) {
			if (this.bannerList.length == 0) {
				this.backgroundColor = '#ffffff';
			} else {
				// console.log(e.scrollTop)
				if (e.scrollTop >= 100) {
					this.backgroundColor = '#ffffff';
				} else {
					this.backgroundColor = 'transparent';
				}
			}
		},
		// 获取banner
		getBanner() {
			uni.request({
				url: this.globalUrl + '/banner',
				success: res => {
					console.log('banner--', res);
					this.bannerList = res.data.data;
					console.log('------------', this.bannerList.length);
					if (this.bannerList.length == 0) {
						this.backgroundColor = '#ffffff';
					} else {
						this.backgroundColor = 'transparent';
					}
				}
			});
		},
		// 点击banner
		towebview(item) {
			uni.navigateTo({
				url: `/pages/webview/webview?url=${item.url}`
			});
		},
		// toUrl(item) {
		// 	console.log(111111);
		// 	var url = item.url;
		// },
		// 跳转文章详情
		onPageJump(e) {
			console.log(e);
			let id = e.currentTarget.id;
			// debugger
			// return
			uni.navigateTo({
				url: '/pages/contentdetail/contentdetail?article_id=' + id
			});
		},
		// 点赞
		clickLike(e, index) {
			console.log('qaz', e, index);
			// debugger
			let article = e.article_id;
			var that = this;
			uni.request({
				url: this.globalUrl + '/user/liked',
				data: {
					article_id: article,
					liked: e.liked == 0 ? 1 : 0
				},
				method: 'POST',
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: res => {
					if (res.data.code != 0) {
						// debugger

						uni.navigateTo({
							url: '../login/login'
						});
					} else {
						that.list[index].liked = e.liked == 1 ? 0 : 1;
						that.list[index].like_count = e.liked == 1 ? e.like_count + 1 : e.like_count - 1;
					}
				}
			});
		},

		lookAll() {
			if (this.item == undefined || null) {
				var city = uni.getStorageSync('city_id');
				console.log('city----', city);
				if (city.data == null) {
					uni.navigateTo({
						url: '/pages/attractionsList/attractionsList'
					});
				} else {
					var state_id = city.data.state_id;
					var city_id = city.data.city_id;
					uni.navigateTo({
						url: '/pages/attractionsList/attractionsList?state_id=' + state_id + '&city_id=' + city_id
					});
				}
			} else {
				var state_id = this.item.state_id;
				var city_id = this.item.city_id;
				uni.navigateTo({
					url: '/pages/attractionsList/attractionsList?state_id=' + state_id + '&city_id=' + city_id
				});
			}
		},
		toAtt(e) {
			console.log('----------------', e);
			uni.navigateTo({
				url: '/pages/positionContent/positionContent?id=' + e
			});
		},
		clickLeft() {
			uni.showToast({
				title: '左侧按钮'
			});
		},
		search() {
			uni.showToast({
				title: '搜索'
			});
		},

		showCity() {
			// uni.showToast({
			// 	title: '选择城市'
			// })
			uni.navigateTo({
				url: '../city/city'
			});
		},
		toProvinces(e) {
			var that = this;
			this.e = e;
			console.log('--', e);
			uni.getSetting({
				success(res) {
					console.log(res.authSetting);
					console.log(res.authSetting['scope.userLocation']);
					if (res.authSetting['scope.userLocation'] == false) {
						uni.showModal({
							// title: '提示',
							content: '是否前往开启定位服务',
							success: res => {
								if (res.confirm) {
									console.log('用户点击确定');

									uni.openSetting({
										success: res => {
											console.log(res.authSetting);
											that.getAdress();
											that.dqdwText = '当前位置';
										}
									});
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					} else {
						if (that.e.state_id == 0) {
							uni.showToast({
								title: '抱歉，当前定位城市暂未开放，推荐您选择/搜索其他热门城市',
								icon: 'none',
								duration: 3000
							});
						} else {
							var e = JSON.stringify(that.e);
							uni.navigateTo({
								url: '/pages/provinces/provinces?id=' + e
							});
						}
					}
				}
			});
		},
		confirm() {
			// uni.showToast({
			// 	title: '搜索'
			// })
			uni.navigateTo({
				url: '../search/search'
			});
		},
		/*下拉刷新的回调, 有三种处理方式:*/
		downCallback() {
			this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
		},
		upCallback(page) {
			console.log(122132131213);
			let pageNum = page.num;

			let pageSize = page.size;
			if (pageNum == 1) {
				this.firstTime = new Date().getTime();
			}
			uni.request({
				url: this.globalUrl + '/article/list?page=' + pageNum + '&count=' + pageSize,
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				data: {
					first_time: this.firstTime
				},
				success: data => {
					if (data.data.code == 0) {
						let curPageData = data.data.data.list;

						console.log('curPageData', curPageData);
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length ? curPageData.length : 0;
						console.log('curPageLen', curPageLen);
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = data.data.data.total / pageSize;

						let totalSize = data.data.data.total;
						console.log('totalSize', totalSize);

						if (page.num == 1) this.list = []; //如果是第一页需手动置空列表
						this.list = this.list.concat(curPageData); //追加新数据

						this.mescroll.endByPage(curPageLen, totalPage);
					} else {
						this.mescroll.endErr();
					}
				},
				fail: () => {
					//  请求失败,隐藏加载状态
					this.mescroll.endErr();
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.left,
.right {
	margin-left: 10rpx;
	width: 48%;
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
	flex-direction: column;
	background-color: #ffffff;
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
	/* #ifndef APP-PLUS-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	/* min-width: 350rpx; */
	width: 486rpx;
	height: 64rpx;
	align-items: center;
	flex: 1;
	background: rgba(248, 248, 248, 1);
	border-radius: 36rpx;
	flex-wrap: nowrap;
	margin-left: 24rpx;
}

.input-uni-icon {
	width: 28rpx;
	height: 28rpx;
	margin-left: 32rpx;
}

.nav-bar-input {
	height: 64rpx;
	/* min-width: 350rpx; */
	width: 410rpx;
	line-height: 64rpx;
	/* #ifdef APP-PLUS-NVUE */
	/* #endif */
	font-size: 28rpx;
	color: #c9cad1;
	margin-left: 16rpx;
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
	line-height: 42rpx;
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
	border-radius: 8px;
	border: 4rpx solid #ffe512;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}
.dqwzBg {
	width: 216rpx;
	height: 180rpx;
}
.dqwzImg {
	width: 216rpx;
	height: 180rpx;
	border-radius: 8px;
}
.dqwzBox {
	position: absolute;
	text-align: center;
}
.dqwzText {
	position: absolute;
	top: 50rpx;
	/* left: 78rpx; */
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #ffffff;
	line-height: 32rpx;
}
.adressBox {
	display: flex;
	align-items: center;
	position: absolute;
	top: 90rpx;
	/* left: 40rpx; */
	color: #ffffff;
	padding: 8rpx 16rpx;
	font-size: 16rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 16rpx;
	/* width: 140rpx; */
	height: 40rpx;
	background: #ffe512;
	border-radius: 11px;
}
/* 无banner时 */
.dqwznoba {
	width: 216rpx;
	height: 180rpx;
	border-radius: 8px;
	border: 2px solid #ffe512;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}
.mask {
	width: 216rpx;
	height: 180rpx;
	background: rgba(0, 0, 0, 0.25);
	border-radius: 8px;
	position: absolute;
}
.mask1 {
	width: 208rpx;
	height: 172rpx;
	background: rgba(0, 0, 0, 0.25);
	border-radius: 8px;
	position: absolute;
}
.dqwzImgnoba {
	width: 100%;
	height: 100%;
	border-radius: 16rpx;
}
.dqwzBoxnoba {
	position: absolute;
	text-align: center;
}
.dqwzTextnoba {
	/* position: absolute; */
	/* margin-top: 50rpx; */
	/* left: 78rpx; */
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #ffffff;
	line-height: 32rpx;
}
.adressBoxnoba {
	display: flex;
	align-items: center;
	/* position: absolute; */
	/* margin-top: 90rpx; */
	/* left: 40rpx; */
	color: #ffffff;
	padding: 8rpx 16rpx;
	font-size: 16rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 16rpx;
	/* width: 140rpx; */
	height: 40rpx;
	background: #ffe512;
	border-radius: 11px;
}

.zhishi {
	width: 24rpx;
	height: 24rpx;
	margin-right: 4rpx;
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
	margin-top: 24rpx;
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
}

.wrap {
	width: 750rpx;
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
}
.demo-warter-l {
	margin-left: 10rpx;
}

.demo-warter {
	width: 100%;
	margin-top: 0;
	margin-right: 10rpx;
	margin-bottom: 16rpx;
	padding-bottom: 16rpx;
	/* position: relative; */
	background-color: #ffffff;
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

.demoImage {
	width: 100%;
	min-height: 300rpx;
	max-height: 460rpx;
	border-radius: 8rpx 8rpx 0 0;
}
.demoImage4 {
	width: 100%;
	min-height: 272rpx;
	max-height: 480rpx;
	border-radius: 8rpx 8rpx 0 0;
}
.videoIcon{
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
	/* padding: 0 4rpx; */
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
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(48, 49, 51, 1);
	margin-left: 8rpx;
	line-height: 46rpx;
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
	font-size: 10rpx;
	margin-top: 24rpx;
	/* margin-bottom: 16rpx; */
	display: flex;
	align-items: center;
	justify-content: space-between;
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

.countImg {
	width: 26rpx;
	height: 26rpx;
	margin-right: 8rpx;
	display: flex;
	align-items: center;
}
.countImg image {
	width: 100%;
	height: 100%;
}
.likeCount {
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(96, 98, 102, 1);
	/* line-height:20rpx; */
}
</style>
