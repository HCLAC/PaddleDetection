<template>
	<view>
		<mescroll-uni class="mescroll" ref="mescrollRef" style="margin-bottom: 300rpx;" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view >
				<!-- 自定义导航栏 -->
				<view class="example-body">
					<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
						<view slot="left" class="slotleft">
							<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
							<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
						</view>
						<view class="slottitle">领途羊</view>
					</uni-nav-bar>
				</view>
				<!-- 头图 -->
					<view class="headImgBox">
						<image class="headImg" :src="item.image" mode="scaleToFill"></image>
						<view class="mask"></view>
						<view class="cityBox">
							<view class="city">{{ item.name || '全国' }}</view>
							<view class="change" @click="getCity">
								<view class="changeText" @click="show = true">切换</view>
								<image class="changeIcon" src="../../static/images/more-down.svg" mode=""></image>
							</view>
						</view>
						<!-- 天气 -->
						<view class="weather" v-if="weather != null">
							<image class="weatherImg" src="../../static/images/weather/xiaoyu.svg" mode="" v-if="weather.weather == '小雨'"></image>
							<image class="weatherImg" src="../../static/images/weather/baoyu.svg" mode="" v-if="weather.weather == '暴雨'"></image>
							<image class="weatherImg" src="../../static/images/weather/dabaoyu.svg" mode="" v-if="weather.weather == '大暴雨'"></image>
							<image class="weatherImg" src="../../static/images/weather/daxue.svg" mode="" v-if="weather.weather == '大雪'"></image>
							<image class="weatherImg" src="../../static/images/weather/dayu.svg" mode="" v-if="weather.weather == '大雨'"></image>
							<image class="weatherImg" src="../../static/images/weather/dongyu.svg" mode="" v-if="weather.weather == '冻雨'"></image>
							<image class="weatherImg" src="../../static/images/weather/duoyun.svg" mode="" v-if="weather.weather == '多云'"></image>
							<image class="weatherImg" src="../../static/images/weather/fuchen.svg" mode="" v-if="weather.weather == '拂尘'"></image>
							<image class="weatherImg" src="../../static/images/weather/leizhenyu.svg" mode="" v-if="weather.weather == '雷阵雨'"></image>
							<image class="weatherImg" src="../../static/images/weather/leizhenyubanyoubingbao.svg" mode="" v-if="weather.weather == '雷阵雨伴有冰雹'"></image>
							<image class="weatherImg" src="../../static/images/weather/mai.svg" mode="" v-if="weather.weather == '霾'"></image>
							<image class="weatherImg" src="../../static/images/weather/qiangshachenbao.svg" mode="" v-if="weather.weather == '强沙尘暴'"></image>
							<image class="weatherImg" src="../../static/images/weather/qing.svg" mode="" v-if="weather.weather == '晴'"></image>
							<image class="weatherImg" src="../../static/images/weather/shachenbao.svg" mode="" v-if="weather.weather == '沙尘暴'"></image>
							<image class="weatherImg" src="../../static/images/weather/tedabaoyu.svg" mode="" v-if="weather.weather == '特大暴雨'"></image>
							<image class="weatherImg" src="../../static/images/weather/wu.svg" mode="" v-if="weather.weather == '雾'"></image>
							<image class="weatherImg" src="../../static/images/weather/xiaoxue.svg" mode="" v-if="weather.weather == '小雪'"></image>
							<image class="weatherImg" src="../../static/images/weather/yangsha.svg" mode="" v-if="weather.weather == '扬沙'"></image>
							<image class="weatherImg" src="../../static/images/weather/yin.svg" mode="" v-if="weather.weather == '阴'"></image>
							<image class="weatherImg" src="../../static/images/weather/yujiaxue.svg" mode="" v-if="weather.weather == '雨夹雪'"></image>
							<image class="weatherImg" src="../../static/images/weather/zhenxue.svg" mode="" v-if="weather.weather == '阵雪'"></image>
							<image class="weatherImg" src="../../static/images/weather/zhenyu.svg" mode="" v-if="weather.weather == '阵雨'"></image>
							<image class="weatherImg" src="../../static/images/weather/zhongxue.svg" mode="" v-if="weather.weather == '中雪'"></image>
							<image class="weatherImg" src="../../static/images/weather/zhongyu.svg" mode="" v-if="weather.weather == '中雨'"></image>
							<view class="temp">{{ weather.temp }}</view>
						</view>
					</view>
					<view class="contentBox" >
						<!-- 景点推荐 -->
						<view class="content">
							<view class="contentHeader">
								<view class="contentTitle">景点推荐</view>
								<view class="contentMore" @click="toMore()">
									更多
									<image class="moreIcon" src="../../static/images/more-right.svg" mode="widthFix"></image>
								</view>
							</view>
							<view class="contentImgBox">
								<view class="contentImg" v-for="(item, index) in siteHot" :key="index" @click="toAtt(item.id)">
									<image class="attImg" :src="item.image" mode=""></image>
									<view class="attText">{{ item.name }}</view>
									<view class="rateBox">
										<!-- <uni-rate  :readonly="true" allow-half :value="rate" /> -->
										<!-- 评分图标 -->
										<view class="rateStart" v-if="item.rate == 5">
											<image src="../../static/images/star_svg/star4.svg" mode=""></image>
											<image src="../../static/images/star_svg/star4.svg" mode=""></image>
											<image src="../../static/images/star_svg/star4.svg" mode=""></image>
											<image src="../../static/images/star_svg/star4.svg" mode=""></image>
											<image src="../../static/images/star_svg/star4.svg" mode=""></image>
										</view>
										<view class="rateStart" v-if="item.rate == 4">
											<image src="../../static/images/star_svg/star3.svg" mode=""></image>
											<image src="../../static/images/star_svg/star3.svg" mode=""></image>
											<image src="../../static/images/star_svg/star3.svg" mode=""></image>
											<image src="../../static/images/star_svg/star3.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
										</view>
										<view class="rateStart" v-if="item.rate == 3">
											<image src="../../static/images/star_svg/star2.svg" mode=""></image>
											<image src="../../static/images/star_svg/star2.svg" mode=""></image>
											<image src="../../static/images/star_svg/star2.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
										</view>
										<view class="rateStart" v-if="item.rate == 2">
											<image src="../../static/images/star_svg/star1.svg" mode=""></image>
											<image src="../../static/images/star_svg/star1.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
										</view>
										<view class="rateStart" v-if="item.rate == 1">
											<image src="../../static/images/star_svg/star11.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
										</view>
										<view class="rateStart" v-if="item.rate == 4.5">
											<image src="../../static/images/star_svg/star3.svg" mode=""></image>
											<image src="../../static/images/star_svg/star3.svg" mode=""></image>
											<image src="../../static/images/star_svg/star3.svg" mode=""></image>
											<image src="../../static/images/star_svg/star3.svg" mode=""></image>
											<image src="../../static/images/star_svg/starCopy13.svg" mode=""></image>
										</view>
										<view class="rateStart" v-if="item.rate == 3.5">
											<image src="../../static/images/star_svg/star2.svg" mode=""></image>
											<image src="../../static/images/star_svg/star2.svg" mode=""></image>
											<image src="../../static/images/star_svg/star2.svg" mode=""></image>
											<image src="../../static/images/star_svg/starCopy12.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
										</view>
										<view class="rateStart" v-if="item.rate == 2.5">
											<image src="../../static/images/star_svg/star1.svg" mode=""></image>
											<image src="../../static/images/star_svg/star1.svg" mode=""></image>
											<image src="../../static/images/star_svg/starCopy1.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
										</view>
										<view class="rateStart" v-if="item.rate == 1.5">
											<image src="../../static/images/star_svg/star11.svg" mode=""></image>
											<image src="../../static/images/star_svg/starCopy1.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
										</view>
										<view class="rateStart" v-if="item.rate == 0.5">
											<image src="../../static/images/star_svg/starCopy1.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
											<image src="../../static/images/star_svg/star5.svg" mode=""></image>
										</view>
										<!-- <u-rate :disabled="true" current="4"></u-rate> -->
										<view class="rate">{{ item.rate }} 星</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 行程推荐 -->
						<view class="trip" v-if="routeHot.length">
							<view class="tripHeader">
								<view class="tripTitle">行程路线</view>
								<view class="tripMore" @click="toLineMore()">
									更多
									<image class="moreIcon" src="../../static/images/more-right.svg" mode="widthFix"></image>
								</view>
							</view>
							<view class="tripBox">
								<view class="tripContent" v-for="(item, index) in routeHot" :key="index" @click="getLineDetail(item)">
									<image class="tripImg" :src="item.image" mode=""></image>
									<view class="tripText">{{ item.title }}</view>
								</view>
							</view>
						</view>
						<!-- 旅途问答 -->
						<view class="travelQuestionsBox">
							<view class="tQTop">
								<text class="tQText">旅途问答</text>
								<view class="tQBtn" @click="toQuestions">
									我要提问
								</view>
							</view>
							<view class="tQContent">
								<view class="tQCard" v-for="(item,index) in questions " :key="index" >
									<view class="tQCLeft">
										问
									</view>
									<view class="tQCRight">
										<view class="tQCTitle">
											{{item.title}}
										</view>
										<u-parse ref="parse"  style="overflow: hidden;" lazy-load 
										 :html="item.content"></u-parse>
									</view>
								</view>
								<view class="tQToMore">
									查看更多 >
								</view>
							</view>
						</view>
						<!-- 正在旅行 -->
						<view class="touring" id="touring">
							<text class="tourtext">正在旅行</text>
							
							<view class="wrap">
								<view class="left">
									<view class="demo-warter" v-for="(item, index) in list" :key="index" v-if="index % 2 == 0">
										<view class="" >
											<view class="demo-top" @click="onPageJump" :id="item.article_id">
												<view class="imgBox" >
													<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :src="item.image" :index="index" lazy-load="true" mode="widthFix">
														<view class="videoIcon" v-if="item.type == 4">
															<image class="playIcon"  src="../../static/images/playIcon.svg" mode=""></image>
														</view>
													</image>
													<view class="adress">
														<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>
														<view class="adressText">{{ item.location }}</view>
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
														<image mode="aspectFit" src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
														<image mode="aspectFit" src="../../static/images/heart_actived.svg" v-if="item.liked == 1"></image>
													</view>
													<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="right">
									<view class="demo-warter" v-for="(item, index) in list" :key="index" v-if="index % 2 == 1">
										<view class="">
											<view class="demo-top"  @click="onPageJump" :id="item.article_id">
												<view class="imgBox">
													<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :src="item.image" :index="index" lazy-load="true" mode="widthFix">
														<view class="videoIcon" v-if="item.type == 4">
															<image class="playIcon"  src="../../static/images/playIcon.svg" mode=""></image>
														</view>
													</image>
													<view class="adress">
														<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>
														<view class="adressText">{{ item.location }}</view>
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
														<image mode="aspectFit" src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
														<image mode="aspectFit" src="../../static/images/heart_actived.svg" v-if="item.liked == 1"></image>
													</view>
													<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							
						</view>
				
					</view>
				
				<!-- 城市选择弹窗 -->
				<u-popup v-model="show" mode="top" height="383px">
					<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
						<view slot="left" class="slotleft">
							<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
							<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
						</view>
						<view class="slottitle">领途羊</view>
					</uni-nav-bar>
					<!-- 城市 -->
					<view class="nowcity">
						<text>{{ name }}</text>
						<image class="nowcityImg" src="../../static/images/moreDown.svg" mode=""></image>
					</view>
					<!-- 城市选择列表 -->
					<view class="u-menu-wrap">
						<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
							<view
								v-for="(item, index) in cityList"
								:key="index"
								class="u-tab-item"
								:class="[current == index ? 'u-tab-item-active' : '']"
								:data-current="index"
								@tap.stop="swichMenu(index)"
							>
								<text class="u-line-1">{{ item.name }}</text>
							</view>
						</scroll-view>
						<block v-for="(item, index) in cityList" :key="index">
							<scroll-view scroll-y class="right-box" v-if="current == index">
								<view class="page-view">
									<view class="class-item">
										<!-- <view class="item-title" @click="gethotsiteslist2(item)"> -->
										<!-- <text>全省</text> -->
										<!-- </view> -->
										<view class="item-container">
											<view class="thumb-box" v-for="(item1, index1) in item.city_list" :key="index1">
												<!-- <image class="item-menu-image" :src="item1.icon" mode=""></image> -->
												<view class="item-menu-name" @click="gethotsiteslist1(item1)">{{ item1.name }}</view>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</block>
					</view>
				</u-popup>
			</view>
		</mescroll-uni>	
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin],
	data() {
		return {
			scrollTop: 0, //tab标题的滚动条位置
			current: 0, // 预设当前项的值
			menuHeight: 0, // 左边菜单的高度
			menuItemHeight: 0, // 左边菜单item的高度
			list: [],
			weather: null,
			item: null,
			siteHot: null,
			routeHot: null,
			show: false,
			cityList: null,
			name: null,
			firstTime: new Date().getTime(),
			downOption:{
				use:false,
				bgColor:'#F8F8F8'
			},
			questions:{}
		};
	},
	comments: {
		uniNavBar
	},
	onLoad(options) {
		let item = JSON.parse(options.id);
		console.log('参数', item);
		(this.item = item), (this.name = item.name);
		this.getTour(), this.getWeather(), this.getSiteHot(), this.getRouteHot(), this.getCity(),this.getQuestions();
	},
	methods: {
		
		// 文章瀑布流接口
		getTour() {
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
					console.log('文章列表',res)
					if(res.data.data == null){
						uni.request({
							url: this.globalUrl + '/article/list',
							data: {
								state_id: this.item.state_id,
								city_id: this.item.city_id,
								count: 6,
								page: 1,
								first_time: new Date().getTime()
							},
							success: (res) => {
								uni.setStorageSync('article_id', res.data);
								this.list = res.data.data.list;
								console.log('token失效list=====', this.list);
							}
						})
					}else{
						uni.setStorageSync('article_id', res.data);
						this.list = res.data.data.list;
						console.log('list=====', this.list);
					}
					
				}
			});
		},
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
		getLineDetail(item) {
			if (item.uuid) {
				uni.navigateTo({
					url: '/pages/lineDetail/lineDetail?id=' + item.uuid
				});
			}
		},
		// 天气接口
		getWeather() {
			
			uni.request({
				url: 'https://api.asilu.com/weather/',
				data: {
					city: this.item.name
				},
				success: (res) => {
					console.log('天气--', res);
					if (res.data.date == null) {
						uni.request({
							url: 'https://api.asilu.com/weather/',
							data: {
								city: res.data.id.city
							},
							success: res => {
								this.weather = res.data.weather[0];
								console.log('当地天气', this.weather);
							}
						});
					} else {
						this.weather = res.data.weather[0];
						console.log('当地天气', this.weather);
					}
				}
			});
		},
		// 推荐景点接口
		getSiteHot() {
			uni.request({
				url: this.globalUrl + '/site/hot',
				data: {
					state_id: this.item.state_id,
					city_id: this.item.city_id,
					count: 3,
					sort_by: 3
				},
				success: res => {
					console.log('景点推荐', res);
					this.siteHot = res.data.data;
				}
			});
		},
		// 热门线路接口
		getRouteHot() {
			uni.request({
				url: this.globalUrl + '/route/hot',
				data: {
					state_id: this.item.state_id,
					city_id: this.item.city_id,
					count: 2
				},
				success: res => {
					console.log('热门线路', res);
					this.routeHot = res.data.data;
				}
			});
		},
		// 跳转景点详情页
		toAtt(e) {
			console.log('----------------', e);
			uni.navigateTo({
				url: '/pages/positionContent/positionContent?id=' + e
			});
		},
		// 跳转景点榜单页
		toMore() {
			if (this.item == null) {
				uni.navigateTo({
					url: '/pages/attractionsRank/attractionsRank'
				});
			} else {
				var state_id = this.item.state_id;
				var city_id = this.item.city_id;
				uni.navigateTo({
					url: '/pages/attractionsRank/attractionsRank?state_id=' + state_id + '&city_id=' + city_id
				});
			}
		},
		// 线路列表
		toLineMore() {
			console.log(this.item,'item--')
			if (this.item == null) {
				uni.navigateTo({
					url: '/pages/lineList/lineList'
				});
			} else {
				var state_id = this.item.state_id;
				var city_id = this.item.city_id;
				uni.navigateTo({
					url: '/pages/lineList/lineList?state_id=' + state_id + '&city_id=' + city_id
				});
			}
		},
		// 获取精选问题
		getQuestions(){
			uni.request({
				url: this.globalUrl + '/questions/selected',
				data: {
					state_id: this.item.state_id,
					city_id: this.item.city_id,
					count: 2
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: res => {
					console.log('获取精选问题', res.data.data);
					this.questions = res.data.data
				}
			});
		},
		// 获取全国城市
		getCity() {
			uni.request({
				url: this.globalUrl + '/area/guide',
				success: res => {
					console.log('获取全国城市', res);
					var cityList = res.data.data.areas;
					this.cityList = cityList.slice(1);
					console.log('shift--', this.cityList);
				}
			});
		},
		// 获取

		gethotsiteslist1(item1) {
			if (item1.city_id == 0) {
				uni.request({
					url: this.globalUrl + '/area',
					data: {
						state_id: item1.state_id
					},
					success: res => {
						console.log('城市信息==', res);
						(this.item = res.data.data),
							(this.name = this.name = res.data.data.name),
							// 正在旅行
							uni.request({
								url: this.globalUrl + '/article/list',
								data: {
									state_id: item1.state_id,
									count: 6,
									page: 1,
									first_time: new Date().getTime()
								},
								header: {
									Authorization: uni.getStorageSync('Authorization')
								},
								success: res => {
									uni.setStorageSync('article_id', res.data);
									this.list = res.data.data.list;
									this.mescroll.resetUpScroll()
									console.log('list=====', this.list);
								}
							}),
							this.getWeather(),
							// 景点
							uni.request({
								url: this.globalUrl + '/site/hot',
								data: {
									state_id: item1.state_id,
									count: 3,
									sort_by: 3
								},
								success: res => {
									console.log('景点推荐', res);
									this.siteHot = res.data.data;
								}
							});
						// 线路
						uni.request({
							url: this.globalUrl + '/route/hot',
							data: {
								state_id: item1.state_id,
								count: 2
							},
							success: res => {
								console.log('热门线路', res);
								this.routeHot = res.data.data;
							}
						}),
							(this.show = false);
					}
				});
			} else {
				uni.request({
					url: this.globalUrl + '/area',
					data: {
						state_id: item1.state_id,
						city_id: item1.city_id
					},
					success: res => {
						console.log('城市信息==', res);
						(this.item = res.data.data), (this.name = this.name = res.data.data.name), this.getTour(), this.getWeather(), this.getSiteHot(), this.getRouteHot(), (this.show = false);
						this.mescroll.resetUpScroll()
					}
				});
			}
		},
		gethotsiteslist2(item) {
			if (item.state_id == 0) {
				uni.request({
					url: this.globalUrl + '/area',
					success: res => {
						console.log('省份信息==', res);
						if (res.data == null) {
							this.name = '全国';
							this.item.name = '全国';
						}
						this.item = res.data.data;
						if (item.name == null) {
							this.name = '全国';
							this.item.name = '全国';
						} else {
							this.name = item.name;
						}

						// 正在旅行
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
								uni.setStorageSync('article_id', res.data);
								this.list = res.data.data.list;
								this.mescroll.resetUpScroll()
								console.log('list=====', this.list);
							}
						}),
							uni.request({
								url: 'https://api.asilu.com/weather/',
								data: {
									city: '全国'
								},
								success: res => {
									console.log('天气--', res);
									this.weather = res.data.weather[0];
								}
							}),
							// 景点
							uni.request({
								url: this.globalUrl + '/site/hot',
								data: {
									count: 3,
									sort_by: 3
								},
								success: res => {
									console.log('景点推荐', res);
									this.siteHot = res.data.data;
								}
							});
						// 线路
						uni.request({
							url: this.globalUrl + '/route/hot',
							data: {
								count: 2
							},
							success: res => {
								console.log('热门线路', res);
								this.routeHot = res.data.data;
							}
						}),
							(this.show = false);
					}
				});
			} else {
				uni.request({
					url: this.globalUrl + '/area',
					data: {
						state_id: item.state_id,
						city_id: item.city_id
					},
					success: res => {
						console.log('省份信息==', res);
						(this.item = res.data.data), (this.name = item.name), this.getTour(), this.getWeather(), this.getSiteHot(), this.getRouteHot(), (this.show = false);
						this.mescroll.resetUpScroll()
					}
				});
			}
		},
		// 点击左边的栏目切换
		async swichMenu(index) {
			if (index == this.current) return;
			this.current = index;
			// 如果为0，意味着尚未初始化
			if (this.menuHeight == 0 || this.menuItemHeight == 0) {
				await this.getElRect('menu-scroll-view', 'menuHeight');
				await this.getElRect('u-tab-item', 'menuItemHeight');
			}
			// 将菜单菜单活动item垂直居中
			this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
		},
		// 获取一个目标元素的高度
		getElRect(elClass, dataVal) {
			new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(this);
				query
					.select('.' + elClass)
					.fields(
						{
							size: true
						},
						res => {
							// 如果节点尚未生成，res值为null，循环调用执行
							if (!res) {
								setTimeout(() => {
									this.getElRect(elClass);
								}, 10);
								return;
							}
							this[dataVal] = res.height;
						}
					)
					.exec();
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
					}

					that.list[index].liked = e.liked == 1 ? 0 : 1;
					that.list[index].like_count = e.liked == 1 ? e.like_count + 1 : e.like_count - 1;
				}
			});
		},
		// 提问按钮
		toQuestions(){
			uni.navigateTo({
				url:'/pages/questions/questions'
			})
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
		/*下拉刷新的回调, 有三种处理方式:*/
		downCallback() {
			// 第1种: 请求具体接口
			// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
			this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
			// this.mescroll.endSuccess()
			// 此处仍可以继续写其他接口请求...
			// 调用其他方法...
		},
		/*上拉加载的回调*/
		upCallback(page) {
			let pageNum = page.num
			let pageSize = page.size; // 页长, 默认每页10条
			if(pageNum == 1){
				this.firstTime = new Date().getTime()
			}
			var that = this;
			if (that.item == null) {
				uni.request({
					url: this.globalUrl + '/article/list?page=' + pageNum + '&count=' + pageSize,
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					data: {
						first_time: this.firstTime
					},
					success: data => {
						console.log('data', data);
						// 接口返回的当前页数据列表 (数组)
						let curPageData = data.data.data.list;

						console.log('curPageData', curPageData);
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						console.log('curPageLen', curPageLen);
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						// let totalPage = data.data.data.total / pageSize;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = data.data.data.total;
						console.log('totalSize', totalSize);
						// 接口返回的是否有下一页 (true/false)
						// let hasNext = data.data.data.list;

						//设置列表数据
						if (page.num == 1) this.list = []; //如果是第一页需手动置空列表
						this.list = this.list.concat(curPageData); //追加新数据
						console.log('list-', this.list);
						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						// this.mescroll.endByPage(curPageLen, totalPage);

						//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
						this.mescroll.endBySize(curPageLen, totalSize);

						//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
						//this.mescroll.endSuccess(curPageLen, hasNext);

						//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
						//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
						//如果传了hasNext,则翻到第二页即可显示无更多数据.
						//this.mescroll.endSuccess(curPageLen);

						// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
						// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
						// setTimeout(() => {
						// 	this.mescroll.endSuccess(curPageLen)
						// }, 20)
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr();
					}
				});
			} else {
				uni.request({
					url: this.globalUrl + '/article/list?page=' + pageNum + '&count=' + pageSize,
					data: {
						state_id: that.item.state_id,
						city_id: that.item.city_id,
						first_time: that.firstTime
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: data => {
						console.log('data', data);
						// 接口返回的当前页数据列表 (数组)
						let curPageData = data.data.data.list;

						console.log('curPageData', curPageData);
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						console.log('curPageLen', curPageLen);
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = data.data.data.total / pageSize;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = data.data.data.total;
						console.log('totalSize', totalSize);
						// 接口返回的是否有下一页 (true/false)
						// let hasNext = data.data.data.list;

						//设置列表数据
						if (page.num == 1) that.list = []; //如果是第一页需手动置空列表
						that.list = that.list.concat(curPageData); //追加新数据
						console.log('that-list-', that.list);
						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						this.mescroll.endByPage(curPageLen, totalPage);

						//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
						// this.mescroll.endBySize(curPageLen, totalSize);

						//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
						//this.mescroll.endSuccess(curPageLen, hasNext);

						//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
						//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
						//如果传了hasNext,则翻到第二页即可显示无更多数据.
						//this.mescroll.endSuccess(curPageLen);

						// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
						// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
						// setTimeout(() => {
						// 	this.mescroll.endSuccess(curPageLen)
						// }, 20)
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr();
					}
				});
			}

			// 此处仍可以继续写其他接口请求...
			// 调用其他方法...
		}
	}
};
</script>

<style lang="scss" scoped>
	
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
.headImgBox {
	width: 100%;
	height: 440rpx;
	position: relative;
	border: none;
}
.headImg {
	width: 100%;
	height: 100%;
}
.mask {
	width: 100%;
	height: 244rpx;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #13c2c2 100%);
	opacity: 0.4;
	position: absolute;
	bottom: 0;
	left: 0;
}
.cityBox {
	display: flex;
	align-items: center;
	position: absolute;
	bottom: 144rpx;
	left: 40rpx;
}
.city {
	font-size: 48rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #ffffff;
	line-height: 48rpx;
	margin-right: 20rpx;
}
.change {
	width: 88rpx;
	height: 40rpx;
	background: #ffffff;
	border-radius: 28rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.changeText {
	font-size: 20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #606266;
}
.changeIcon {
	width: 14rpx;
	height: 14rpx;
	margin-left: 6rpx;
}
.weather {
	display: flex;
	align-items: center;
	width: 200rpx;
	height: 80rpx;
	position: absolute;
	bottom: 56rpx;
	left: 40rpx;
}
.weatherImg {
	width: 44rpx;
	height: 44rpx;
}
.temp {
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #ffffff;
	line-height: 40rpx;
	margin-left: 14rpx;
}
.contentBox {
	width: 100%;
	background: #f8f8f8;
	border: 1px solid #FFFFFF;
	border-radius: 16rpx 16rpx 0px 0px;
	border-bottom: none;
	position: relative;
	top: -30rpx;
	left: 0;
}
// 景点推荐
.content {
	width: 100%;
}
.contentHeader {
	display: flex;
	align-items: center;
	border: none;
	padding-top: 32rpx;
	padding-left: 28rpx;
}
.contentTitle {
	height: 36rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 36rpx;
	margin-right: 456rpx;
}
.contentMore {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 94rpx;
	height: 42rpx;
	background: #edeff2;
	border-radius: 24rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #606266;
}
.moreIcon {
	width: 14rpx;
	height: 14rpx;
	margin-left: 4rpx;
}
.contentImgBox {
	margin-top: 30rpx;
	display: flex;
	margin-left: 28rpx;
}
.contentImg {
	width: 218rpx;
	margin-right: 20rpx;
	background-color: #ffffff;
	padding-bottom: 24rpx;
	border-radius: 8px 8px 0px 0px;
}
.attImg {
	width: 100%;
	height: 166rpx;
	border-radius: 8px 8px 0px 0px;
}
.attText {
	// height: 28rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	// line-height: 28rpx;
	margin: 4rpx 0 2rpx 6rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow:ellipsis;
}
.rateBox {
	display: flex;
	align-items: center;
	margin-left: 6rpx;
	.rateStart {
		display: flex;
	}
	.rateStart image {
		width: 22.4rpx;
		height: 22.4rpx;
		margin-right: 6rpx;
	}
	.rate {
		margin-left: 12rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
	}
	
}
// 行程推荐
.trip {
	margin-top: 44rpx;
	margin-left: 28rpx;
}
.tripHeader {
	display: flex;
	align-items: center;
	margin-top: 32rpx;
	background: #f8f8f8;
}
.tripTitle {
	// width: 144rpx;
	height: 36rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 36rpx;
	margin-right: 456rpx;
}
.tripMore {
	width: 94rpx;
	height: 42rpx;
	background: #edeff2;
	border-radius: 24rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #606266;
	display: flex;
	align-items: center;
	justify-content: center;
}
.moreIcon {
	width: 14rpx;
	height: 14rpx;
	margin-left: 4rpx;
}
.tripBox {
	margin-top: 30rpx;
	display: flex;
}
.tripContent {
	width: 338rpx;
	margin-right: 18rpx;
}
.tripImg {
	width: 100%;
	height: 180rpx;
	border-radius: 8px;
}
.tripText {
	// height: 28rpx;
	margin-top: 8rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	// line-height: 28rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 正在旅行 */
.touring{
	margin-top: 36rpx;
}
.touring .tourtext {
	width: 160rpx;
	height: 104rpx;
	// line-height: 104rpx;
	font-size: 40rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	margin-left: 32rpx;
	
}

.wrap {
	width: 100%;
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
	margin-top: 24rpx;
}
.left {
	// margin-left: 10rpx;
}
.demo-warter {
	width: 360rpx;
	margin-top: 0;
	margin-left: 10rpx;
	margin-bottom: 16rpx;
	padding-bottom: 16rpx;
	/* position: relative; */
	background-color: #ffffff;
	border-radius: 8rpx 8rpx 0 0;
}

.demo-top {
	position: relative;
}
.imgBox{
	position: relative;
	display: flex;
	align-items: flex-end;
}
.demoImage {
	min-height: 300rpx !important;
	max-height: 460rpx;
	width: 100%;
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
.playIcon{
	width: 100%;
	height: 100%;
}
.adress {
	position: absolute;
	left: 0;
	bottom:0;
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
// 弹窗
.navtitle {
	font-size: 38rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #000000;
	line-height: 38rpx;
	margin-left: 180rpx;
}

.nowcity {
	margin: 40rpx 40rpx 32rpx 40rpx;
	display: flex;
	align-items: center;
	// height: 28rpx;
	text {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 28rpx;
		margin: 16rpx 12rpx 8rpx 6rpx;
	}
	.nowcityImg {
		width: 16rpx;
		height: 16rpx;
		margin-top: 6rpx;
	}

	.rateBox {
		display: flex;
		align-items: center;
		margin-left: 6rpx;
		.rateStart{
			display: flex;
		}
		.rateStart image{
			width: 22.4rpx;
			height: 22.4rpx;
			margin-right: 6rpx;
		}
		.rate {
			margin-left: 12rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #606266;
			line-height: 20rpx;
		}
	
	}
	// 行程推荐
	.trip{
		margin-top: 44rpx;
		margin-left: 28rpx;
	}
	.tripHeader{
		display: flex;
		align-items: center;
		margin-top: 32rpx;
		background: #F8F8F8;
	}
	.tripTitle{
		// width: 144rpx;
		height: 36rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 36rpx;
		margin-right: 456rpx;
	}
	.tripMore{
		width: 94rpx;
		height: 42rpx;
		background: #EDEFF2;
		border-radius: 24rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #606266;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.moreIcon{
		width: 14rpx;
		height: 14rpx;
		margin-left: 4rpx;
	}
	.tripBox{
		margin-top: 30rpx;
		display: flex;
	}
	.tripContent{
		width: 338rpx;
		margin-right: 18rpx;
	}
	.tripImg{
		width: 100%;
		height: 180rpx;
		border-radius: 8px;
	}
	.tripText{
		// height: 28rpx;
		margin-top: 4rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		// line-height: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	/* 正在旅行 */
	.touring {
		// margin-top: 24rpx;
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
	.left{
		// margin-left: 10rpx;
	}
	.demo-warter {
		width: 360rpx;
		margin-top: 0;
		margin-left: 10rpx;
		margin-bottom: 16rpx;
		padding-bottom: 16rpx;
		/* position: relative; */
		background-color: #ffffff;
		border-radius: 8rpx 8rpx 0 0;
	}
	
	.demo-top {
		position: relative;
	}
	.imgBox{
		position: relative;
	}
	.demo-image {
		min-height: 300rpx !important;
		max-height: 460rpx;
		width: 100%;
		border-radius: 8rpx 8rpx 0 0;
		position: relative;
	}
	
	.adress {
		position: absolute;
		left: 0;
		bottom: 8rpx;
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
	}

	image {
		width: 11.4rpx;
		height: 11.4rpx;
	}
}

// 列表
.u-menu-wrap {
	height: 574rpx;
	flex: 1;
	display: flex;
	overflow: hidden;
	border-top: 1rpx solid #EDEFF2;
}

.u-search-inner {
	background-color: rgb(234, 234, 234);
	border-radius: 100rpx;
	display: flex;
	align-items: center;
	padding: 10rpx 16rpx;
}

.u-search-text {
	font-size: 26rpx;
	color: $u-tips-color;
	margin-left: 10rpx;
}

.u-tab-view {
	width: 200rpx;
	height: 100%;
}

.u-tab-item {
	height: 80rpx;
	background: #ffffff;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	color: #303133;
	font-weight: 400;
	line-height: 1;
}

.u-tab-item-active {
	position: relative;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #fa8c16;
	font-size: 28rpx;
	background: #f8f8f8;
}

.u-tab-item-active::before {
	content: '';
	position: absolute;
	border-left: 4rpx solid #fa8c16;
	height: 80rpx;
	left: 0;
	top: 0;
}

.u-tab-view {
	height: 100%;
}

.right-box {
	background-color:#f8f8f8;
}

.page-view {
	// padding: 16rpx;
}

.class-item {
	margin-bottom: 30rpx;
	background-color: #f8f8f8;
	// padding: 16rpx;
	border-radius: 8rpx;
}

.item-title {
	font-size: 26rpx;
	color: $u-main-color;
	font-weight: bold;
}

.item-menu-name {
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	margin-bottom: 40rpx;
	margin-left: 28rpx;
}

.item-container {
	// display: flex;
	// flex-wrap: wrap;
}

.thumb-box {
	width: 33.333333%;
	// display: flex;
	// align-items: center;
	// justify-content: center;
	// flex-direction: column;
	margin-top: 20rpx;
}

.item-menu-image {
	width: 120rpx;
	height: 120rpx;
}
// 旅途问答
.travelQuestionsBox{
	margin: 28rpx;
	.tQTop{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tQContent{
		margin: 20rpx;
		.tQCard{
			display: flex;
			background: #FFFFFF;
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			.tQCLeft{
				font-size: 32rpx;
			}
			.tQCRight{
				margin-left: 16rpx;
				.tQCTitle{
					font-weight: 600;
				}
			}
		}
		.tQToMore{
			text-align: center;
		}
	}
}
</style>
