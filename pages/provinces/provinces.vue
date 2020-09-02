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
		<!-- 头图 -->
		<view class="headImgBox">
			<image class="headImg" :src="item.image" mode="scaleToFill"></image>
			<view class="mask">
			</view>
			<view class="cityBox" v-if="item != null">
				<view class="city">
					{{item.name}}
				</view>
				<view class="change" @click="getCity">
					<view class="changeText" @click="show = true">
						切换
					</view>
					<image class="changeIcon" src="../../static/images/more-down.svg" mode=""></image>
				</view>
			</view>
			<view class="weather" v-if="weather != null">
				<image class="weatherImg" src="../../static/images/weather/xiaoyu.svg" mode="" v-if="weather.icon1 == 'day/xiaoyu' "></image>
				<image class="weatherImg" src="../../static/images/weather/baoyu.svg" mode="" v-if="weather.icon1 == 'day/baoyu' "></image>
				<image class="weatherImg" src="../../static/images/weather/dabaoyu.svg" mode="" v-if="weather.icon1 == 'day/dabaoyu' "></image>
				<image class="weatherImg" src="../../static/images/weather/daxue.svg" mode="" v-if="weather.icon1 == 'day/daxue' "></image>
				<image class="weatherImg" src="../../static/images/weather/dayu.svg" mode="" v-if="weather.icon1 == 'day/dayu' "></image>
				<image class="weatherImg" src="../../static/images/weather/dongyu.svg" mode="" v-if="weather.icon1 == 'day/dongyu' "></image>
				<image class="weatherImg" src="../../static/images/weather/duoyun.svg" mode="" v-if="weather.icon1 == 'day/duoyun' "></image>
				<image class="weatherImg" src="../../static/images/weather/fuchen.svg" mode="" v-if="weather.icon1 == 'day/fuchen' "></image>
				<image class="weatherImg" src="../../static/images/weather/leizhenyu.svg" mode="" v-if="weather.icon1 == 'day/leizhenyu' "></image>
				<image class="weatherImg" src="../../static/images/weather/leizhenyubanyoubingbao.svg" mode="" v-if="weather.icon1 == 'day/leizhenyubanyoubingbao' "></image>
				<image class="weatherImg" src="../../static/images/weather/mai.svg" mode="" v-if="weather.icon1 == 'day/mai' "></image>
				<image class="weatherImg" src="../../static/images/weather/qiangshachenbao.svg" mode="" v-if="weather.icon1 == 'day/qiangshachenbao' "></image>
				<image class="weatherImg" src="../../static/images/weather/qing.svg" mode="" v-if="weather.icon1 == 'day/qing' "></image>
				<image class="weatherImg" src="../../static/images/weather/shachenbao.svg" mode="" v-if="weather.icon1 == 'day/shachengbao' "></image>
				<image class="weatherImg" src="../../static/images/weather/tedabaoyu.svg" mode="" v-if="weather.icon1 == 'day/tedabaoyu' "></image>
				<image class="weatherImg" src="../../static/images/weather/wu.svg" mode="" v-if="weather.icon1 == 'day/wu' "></image>
				<image class="weatherImg" src="../../static/images/weather/xiaoxue.svg" mode="" v-if="weather.icon1 == 'day/xiaoxue' "></image>
				<image class="weatherImg" src="../../static/images/weather/xiaoyu.svg" mode="" v-if="weather.icon1 == 'day/xiaoyu' "></image>
				<image class="weatherImg" src="../../static/images/weather/yangsha.svg" mode="" v-if="weather.icon1 == 'day/yangsha' "></image>
				<image class="weatherImg" src="../../static/images/weather/yin.svg" mode="" v-if="weather.icon1 == 'day/yin' "></image>
				<image class="weatherImg" src="../../static/images/weather/yujiaxue.svg" mode="" v-if="weather.icon1 == 'day/yujiaxue' "></image>
				<image class="weatherImg" src="../../static/images/weather/zhenxue.svg" mode="" v-if="weather.icon1 == 'day/zhenxue' "></image>
				<image class="weatherImg" src="../../static/images/weather/zhenyu.svg" mode="" v-if="weather.icon1 == 'day/zhenyu' "></image>
				<image class="weatherImg" src="../../static/images/weather/zhongxue.svg" mode="" v-if="weather.icon1 == 'day/zhongxue' "></image>
				<image class="weatherImg" src="../../static/images/weather/zhongyu.svg" mode="" v-if="weather.icon1 == 'day/zhongyu' "></image>
				<view class="temp">
					{{weather.temp}}
				</view>
			</view>
		</view>
		<!-- 景点推荐 -->
		<view class="content">
			<view class="contentHeader">
				<view class="contentTitle">
					景点推荐
				</view>
				<view class="contentMore" @click="toMore()">
					<view class="moreText">
						更多
					</view>
					<image class="moreIcon" src="../../static/images/more-right.svg" mode=""></image>
				</view>
			</view>
			<view class="contentImgBox" >
				<view class="contentImg" v-for="(item,index) in siteHot " :key="index" @click="toAtt(item.id)">
					<image  class="attImg" :src="item.image" mode=""></image>
					<view class="attText">
						{{item.name}}
					</view>
					<view class="rateBox" >
						<!-- <uni-rate  :readonly="true" allow-half :value="rate" /> -->
						<!-- 评分图标 -->
						<view class="rateStart" v-if="item.rate == 5">
							<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(4).svg" mode=""></image>
						</view>
						<view class="rateStart" v-if="item.rate == 4">
							<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
						</view>
						<view class="rateStart" v-if="item.rate == 3">
							<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
						</view>
						<view class="rateStart" v-if="item.rate == 2">
							<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
						</view>
						<view class="rateStart" v-if="item.rate == 1">
							<image src="../../static/images/star_svg/star-1.svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
						</view>
						<view class="rateStart" v-if="item.rate == 4.5">
							<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(3).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1备份(3).svg" mode=""></image>
						</view>
						<view class="rateStart" v-if="item.rate == 3.5">
							<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(2).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1备份(2).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
						</view>
						<view class="rateStart" v-if="item.rate == 2.5">
							<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(1).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1备份(1).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
						</view>
						<view class="rateStart" v-if="item.rate == 1.5">
							<image src="../../static/images/star_svg/star-1.svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1备份.svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
						</view>
						<view class="rateStart" v-if="item.rate == 0.5">
							<image src="../../static/images/star_svg/star-1备份.svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
							<image src="../../static/images/star_svg/star-1(5).svg" mode=""></image>
						</view>
						<!-- <u-rate :disabled="true" current="4"></u-rate> -->
						<view class="rate">{{item.rate}} 星</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 行程推荐 -->
		<view class="trip">
			<view class="tripHeader">
				<view class="tripTitle">
					行程路线
				</view>
				<view class="tripMore">
					<view class="moreText">
						更多
					</view>
					<image class="moreIcon" src="../../static/images/more-right.svg" mode=""></image>
				</view>
			</view>
			<view class="tripBox">
				<view class="tripContent" v-for="(item,index) in routeHot" :key="index" >
					<image class="tripImg" :src="item.image" mode=""></image>
					<view class="tripText">
						{{item.title}}
					</view>
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
								<image class="demo-image" :src="item.image" :index="index" lazy-load="true" mode="widthFix"></image>
								<view class="adress">
									<view class="adreessIcon"><image class="" src="../../static/images/Icon／Map3.svg" mode=""></image></view>
		
									<view class="adressText">{{ item.location }}</view>
								</view>
							</view>
							<view class="titleTip">
								<view class="demo-tag">
									<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
									<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
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
								<view class="likeCount">{{ item.like_count || 0 }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="right">
					<view class="demo-warter" v-for="(item, index) in list" :key="index" v-if="index % 2 == 1">
						<view class="" @click="onPageJump" :id="item.article_id">
							<view class="demo-top">
								<image class="demo-image" :src="item.image" :index="index" lazy-load="true" mode="widthFix"></image>
								<view class="adress">
									<view class="adreessIcon"><image class="" src="../../static/images/Icon／Map3.svg" mode=""></image></view>
		
									<view class="adressText">{{ item.location }}</view>
								</view>
							</view>
							<view class="titleTip">
								<view class="demo-tag">
									<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
									<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
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
								<view class="likeCount">{{ item.like_count || 0 }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 城市选择弹窗 -->
		<u-popup v-model="show" mode="top" height="383px">
			<u-navbar :is-back="false">
				<view class="slot-wrap">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="navtitle">
					领途羊
				</view>
			</u-navbar>
			<!-- 城市 -->
			<view class="nowcity">
				<text>{{name}}</text>
				<image src="../../static/images/more-down.svg" mode=""></image>
			</view>
			<!-- 城市选择列表 -->
			<view class="u-menu-wrap">
				<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
					<view v-for="(item,index) in cityList" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
					 :data-current="index" @tap.stop="swichMenu(index)">
						<text class="u-line-1">{{item.name}}</text>
					</view>
				</scroll-view>
				<block v-for="(item,index) in cityList" :key="index">
					<scroll-view scroll-y class="right-box" v-if="current==index">
						<view class="page-view">
							<view class="class-item">
								<view class="item-title" @click="gethotsiteslist2(item)">
									<text>{{item.name}}</text>
								</view>
								<view class="item-container">
									<view class="thumb-box" v-for="(item1, index1) in item.city_list" :key="index1">
										<image class="item-menu-image" :src="item1.icon" mode=""></image>
										<view class="item-menu-name" @click="gethotsiteslist1(item1)">{{item1.name}}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</block>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	export default {
		data() {
			return {
				rate:3.5,
				list: [],
				weather:null,
				item:null,
				siteHot:null,
				routeHot:null,
				show: false,
				cityList:null
				
			};
		},
		comments:{
			uniNavBar
		},
		onLoad(options) {
			let item = JSON.parse(options.id)
			console.log("参数",item)
			this.item = item
			this.getTour(),
			this.getWeather(),
			this.getSiteHot(),
			this.getRouteHot()
		},
		methods:{
			// 文章瀑布流接口
			getTour(){
				uni.request({
					url: this.globalUrl + '/city/hot',
					method: 'GET',
					success: res => {
						uni.request({
							url: this.globalUrl + '/article/list',
							data: {
								state_id: this.item.state_id,
								city_id: this.item.city_id,
								count: 6,
								page: 1
							},
							header: {
								'Authorization': uni.getStorageSync('Authorization')
							},
							success: res => {
								// console.log('未定位时获取的文章列表', res);
								uni.setStorageSync('article_id', res.data);
								// console.log('存储文章列表==',res.data)
								this.list = res.data.data.list;
								console.log('list=====',this.list)
							}
						});
					}
				});
			},
			// 天气接口
			getWeather(){
				uni.request({
					url:'https://api.asilu.com/weather/',
					data:{
						city:this.item.name
					},
					success: (res) => {
						console.log('天气--',res)
						this.weather = res.data.weather[0]
					}
				})
			},
			// 推荐景点接口
			getSiteHot(){
				uni.request({
					url:this.globalUrl + '/site/hot',
					data:{
						state_id:this.item.state_id,
						city_id:this.item.city_id,
						count:3,
						sort_by:3
					},
					success: (res) => {
						console.log("景点推荐",res)
						this.siteHot = res.data.data
					}
				})
			},
			// 热门线路接口
			getRouteHot(){
				uni.request({
					url: this.globalUrl + '/route/hot',
					data:{
						state_id:this.item.state_id,
						city_id:this.item.city_id,
						count:2,
					},
					success: (res) => {
						console.log('热门线路',res)
						this.routeHot = res.data.data
					}
				})
			},
			// 跳转景点详情页
			toAtt(e) {
				console.log('----------------', e);
				uni.navigateTo({
					url: '/pages/positionContent/positionContent?id=' + e
				});
			},
			// 跳转景点榜单页
			toMore(){
				var state_id = this.item.state_id;
				var city_id = this.item.city_id;
				uni.navigateTo({
					url: '/pages/attractionsRank/attractionsRank?state_id=' + state_id + '&city_id=' + city_id
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
			// 获取全国城市
			getCity(){
				uni.request({
					url:this.globalUrl + '/area/guide',
					success: (res) => {
						console.log('获取全国城市',res)
						this.cityList = res.data.data.areas
					}
				})
			},
			// 获取热门景点
			gethotsiteslist(){
				uni.request({
					url:this.globalUrl + '/site/hotsiteslist',
					data:{
						state_id: this.item.state_id,
						city_id: this.item.city_id,
						page:1
					},
					success: (res) => {
						console.log('热门景点==',res)
						this.hotsiteslist = res.data.data.list
					}
				})
			},
			gethotsiteslist1(item1){
				uni.request({
					url:this.globalUrl + '/site/hotsiteslist',
					data:{
						state_id: item1.state_id,
						city_id: item1.city_id,
						page:1
					},
					success: (res) => {
						console.log('切换热门景点==',res)
						this.hotsiteslist = null
						this.hotsiteslist = res.data.data.list
						this.name = item1.name
					}
				})
			},
			gethotsiteslist2(item){
				uni.request({
					url:this.globalUrl + '/site/hotsiteslist',
					data:{
						state_id: item.state_id,
						city_id: item.city_id,
						page:1
					},
					success: (res) => {
						console.log('切换热门景点==',res)
						this.hotsiteslist = null
						this.hotsiteslist = res.data.data.list
						this.name = item.name
					}
				})
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
							'Authorization': uni.getStorageSync('Authorization')
						},
						success: (res)=> {
								
								if (res.data.code != 0) {
										// debugger
										uni.showModal({
											title: '提示',
											content: '您好，请先登录',
											showCancel: false,
											success: (res)=> {
												if (res.confirm) {
													uni.redirectTo({
														url: '../login/login'
													})
												}
											}
									});
									return;
								}
										
								that.list[index].liked = e.liked == 1 ? 0 : 1;
								that.list[index].like_count = e.liked == 1 ? e.like_count + 1 : e.like_count - 1;
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
	}
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
	.headImgBox{
		width: 750rpx;
		height: 440rpx;
		position: relative;
	}
	.headImg{
		width: 100%;
		height: 100%;
	}
	.mask{
		width: 750rpx;
		height: 244rpx;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #13C2C2 100%);
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.cityBox{
		display: flex;
		align-items: center;
		position: absolute;
		bottom: 144rpx;
		left: 40rpx;
	}
	.city{
		font-size: 48rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 48rpx;
		margin-right: 20rpx;
	}
	.change{
		width: 88rpx;
		height: 40rpx;
		background: #FFFFFF;
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.changeText{
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
		line-height: 20rpx;
	}
	.changeIcon{
		width: 8rpx;
		height: 8rpx;
		margin-left: 8rpx;
	}
	.weather{
		display: flex;
		align-items: center;
		width: 200rpx;
		height: 80rpx;
		position: absolute;
		bottom: 56rpx;
		left: 40rpx;
	}
	.weatherImg{
		width: 44rpx;
		height: 44rpx;
	}
	.temp{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 40rpx;
		margin-left: 14rpx;
	}
	// 景点推荐
	.content{
		width: 750rpx;
		background: #F8F8F8;
		border-radius: 8px 8px 0px 0px;
	}
	.contentHeader{
		display: flex;
		align-items: center;
		padding-top: 32rpx;
		padding-left: 28rpx;
	}
	.contentTitle{
		width: 144rpx;
		height: 36rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 36rpx;
		margin-right: 456rpx;
	}
	.contentMore{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 94rpx;
		height: 42rpx;
		background: #EDEFF2;
		border-radius: 24rpx;
	}
	.moreText{
		width: 44rpx;
		height: 42rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #606266;
		line-height: 42rpx;
	}
	.moreIcon{
		width: 14rpx;
		height: 14rpx;
		margin-left: 4rpx;
	}
	.contentImgBox{
		margin-top: 30rpx;
		display: flex;
		margin-left: 28rpx;
	}
	.contentImg{
		width: 218rpx;
		margin-right: 20rpx;
	}
	.attImg{
		width: 100%;
		height: 166rpx;
		border-radius: 8px 8px 0px 0px;
	}
	.attText{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 28rpx;
		margin: 16rpx 0 8rpx 6rpx;
	}
	.rateBox {
		display: flex;
		align-items: center;
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
			font-family: HelveticaNeue;
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
		background: #ffffff;
	}
	.tripTitle{
		width: 144rpx;
		height: 36rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 36rpx;
		margin-right: 456rpx;
	}
	.tripMore{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 94rpx;
		height: 42rpx;
		background: #EDEFF2;
		border-radius: 24rpx;
	}
	.moreText{
		width: 44rpx;
		height: 42rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #606266;
		line-height: 42rpx;
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
		margin-top: 16rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 28rpx;
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
	.left{
		margin-left: 10rpx;
	}
	.demo-warter {
		width: 360rpx;
		margin-top: 0;
		margin-right: 10rpx;
		margin-bottom: 16rpx;
		padding-bottom: 16rpx;
		/* position: relative; */
		background-color: #ffffff;
		
	}
	
	.demo-top {
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
		margin: 40rpx;
		display: flex;
		align-items: center;
		margin-left: 40rpx;
	
		text {
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 28rpx;
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
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}
	
	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
