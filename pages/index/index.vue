<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="false" class="navbar"  >
			<view class="search-box" @click="confirm">
				<view class="search-wrap" >
					<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
					<u-search
						v-model="keyword"
						placeholderColor="#C9CAD1"
						search-icon-color="#C9CAD1"
						placeholder="搜索热门目的地"
						:show-action="false"
						height="72"
						bg-color="#F8F8F8"
					></u-search>
				</view>
			</view>
		</u-navbar>
		<!-- 头部轮播图 -->
		<view class="page-section ">
			<view class="page-section-spacing">
				<swiper :autoplay="true" class="swiper" indicator-dots="true" indicator-active-color="#FAAD14" >
					<swiper-item v-for="(item, index) in bannerList" :key="index" class="swiper-item">
						<image :src="bannerList[index].image" mode="scaleToFill" class="swiperImg"></image>
					</swiper-item>
				</swiper>
				<text class="bannerText">T r a v e l</text>
				<view class="diaryBox">
					<text class="texth">旅</text>
					<u-line direction="col" color="#ffffff" length="16rpx" margin=" 0 8rpx"></u-line>
					<text class="textb">游</text>
					<u-line direction="col" color="#ffffff" length="16rpx" margin=" 0 8rpx"></u-line>
					<text class="texth">日</text>
					<u-line direction="col" color="#ffffff" length="16rpx" margin=" 0 8rpx"></u-line>
					<text class="textb">记</text>
				</view>
				<!-- <view class="dots">
					<block v-for="(item, index) in bannerList." :key="index">
						<view :class="[index == current ? 'activieDot' : 'dot']"></view>
					</block>
				</view> -->
			</view>
		</view>

		<!-- 内容 -->
		<mescroll-body class="mescroll" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="cus-sty ">
				<!-- 热门目的地 -->
				<view class="hot">
					<view class="hot-top">
						<text class="ht-l">热门目的地</text>
						<view class="ht-r" @click="lookAll">
							更多
							<image src="../../static/images/more-right.svg" class="moreIcon" mode=""></image>
						</view>
					</view>
					<view class="hot-bot" v-if="areaList != null">
						<view class="hotAdress" >
							<!-- 当前位置 -->
							<view class="dqwz" @click="toProvinces(areaList[0])">
								<image class="dqwzImg" :src="areaList[0].image" mode="scaleToFill" v-if="areaList[0].image"></image>
								<image class="dqwzImg" src="../../static/images/bg.png" mode="scaleToFill" v-if="!areaList[0].image"></image>
								<text class="dqwzText">{{cityName}}</text>
								<view class="adressBox">
									<image class="zhishi" src="../../static/images/Icon／Mapt.svg" mode=""></image>
									<text class="dqwzText1">当前位置</text>
								</view>
								
							</view>
							<view class="hotCity" @click="toProvinces(areaList[1])" >
								<image class="hotCityImg" :src="areaList[1].image" mode="scaleToFill"></image>
								<text class="hotCityText">{{areaList[1].name}}</text>
							</view>
							<view class="hotCity" @click="toProvinces(areaList[2])">
								<image class="hotCityImg" :src="areaList[2].image" mode="scaleToFill"></image>
								<text class="hotCityText1">{{areaList[2].name}}</text>
							</view>
						</view>
						<view class="cityRank">
							<view class="rankText" @click="toProvinces(areaList[3])">
								{{areaList[3].name}}
							</view>
							<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx" margin=" 0 16rpx"></u-line>
							<view class="rankText" @click="toProvinces(areaList[4])">
								{{areaList[4].name}}
							</view>
							<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx" margin=" 0 16rpx"></u-line>
							<view class="rankText" @click="toProvinces(areaList[5])">
								{{areaList[5].name}}
							</view>
						</view>
						<view class="cityRank">
							<view class="rankText" @click="toProvinces(areaList[6])">
								{{areaList[6].name}}
							</view>
							<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx" margin=" 0 16rpx"></u-line>
							<view class="rankText" @click="toProvinces(areaList[7])">
								{{areaList[7].name}}
							</view>
							<u-line direction="col" color="#EDEFF2" :hair-line="false" length="28rpx" margin=" 0 16rpx"></u-line>
							<view class="rankText" @click="toProvinces(areaList[8])">
								{{areaList[8].name}}
							</view>
						</view>
						<!-- <view class="hb-l" @click="toAtt(hotAtt[0].id)">
							<image mode="aspectFill" :src="hotAtt[0].image"></image>
							<view class="imgMask"></view>
							<text>{{ hotAtt[0].name }}</text>
						</view>
						<view class="hb-r">
							<view class="hb-r1" @click="toAtt(hotAtt[1].id)">
								<image mode="aspectFill" :src="hotAtt[1].image"></image>
								<view class="imgMask"></view>
								<text>{{ hotAtt[1].name }}</text>
							</view>
							<view class="hb-r2" @click="toAtt(hotAtt[2].id)">
								<image mode="aspectFill" :src="hotAtt[2].image"></image>
								<view class="imgMask"></view>
								<text>{{ hotAtt[2].name }}</text>
							</view>
						</view> -->
					</view>
				</view>

				<!-- 正在旅行 -->
				<view class="touring" id="touring">
					<text class="tourtext">正在旅行</text>
					<!-- <touring class="touringList" ></touring> -->
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
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniSection from '@/components/uni-section/uni-section.vue';
// import tcontent from '@/components/content/tcontent.vue'
// import touring from '@/components/content/touring.vue'
// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
// import httpType from '../../httpType.js';
export default {
	components: {
		uniIcons,
		uniNavBar,
		uniSection
		// tcontent,
		// touring
	},
	mixins: [MescrollMixin],
	data() {
		return {
			cityName: '正在定位',
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
			bannerList: [],
			navbg: {
				background: ''
			},
			indicatorDots:true,
			areaList: null
		};
	},

	onShow() {
		this.getItem();
	},

	onLoad() {
		uni.showLoading({
			title: '加载中',
			mask: true,
			success: () => {
				if (this.item == undefined || null) {
					this.getAdress();
				}
			}
		});
		this.getBanner(),
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
						// url:'http://192.168.43.60:8299/article/list',
						data: {
							state_id: this.item.state_id,
							city_id: this.item.city_id,
							count: 6,
							page: 1
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
		scrollTop(e) {
			// console.log(e)
			if (e.detail.scrollTop != 0) {
				// console.log(e.detail.scrollTop,1111111111)
			}
		},
		// 获取当前地理位置
		getAdress() {
			uni.getLocation({
				type: 'wgs84',
				success: res => {
					console.log('地址---', res);
					// if(this.item == undefined){
					this.cityName = res.city.substr(0, res.city.length - 1);
					this.city = res.city;
					this.province = res.province;
					console.log(this.city, this.province);
					uni.request({
						// url:'http://192.168.43.156:8199/user/location',
						// url:'user/location',
						url:this.globalUrl + '/user/location',
						data: {
							state: this.province,
							city: this.city
						},
						method: 'POST',
						// header: {
						// 	'content-type': 'application/x-www-form-urlencoded',
						// },
						success: res => {
							console.log('获取地址id', res);
							// 地址未定义
							if (res.data.code != 0) {
								// 获取热门景点第一位
								uni.request({
									url: this.globalUrl +'/city/hot',
									method: 'GET',
									success: res => {
										console.log('热门城市===>', res.data.data);
										this.cityName = res.data.data[0].name;
										this.topHotCity = res.data.data[0];
										console.log(this.topHotCity);
										uni.request({
											url: this.globalUrl+'/site/hot',
											data: {
												state_id: this.topHotCity.state_id,
												city_id: this.topHotCity.city_id,
												count: 3,
												sort_by: 3
											},
											success: res => {
												console.log('未定位时获取的热门景点=========', res);
												// uni.setStorageSync('description',res.data)
												this.hotAtt = res.data.data;
											}
										}),
											uni.request({
												url: this.globalUrl + '/article/list',
												data: {
													state_id: res.data.data[0].state_id,
													city_id: res.data.data[0].city_id,
													count: 6,
													page: 1
												},
												// header: {
												// 	'Authorization': uni.getStorageSync('Authorization')
												// },
												success: res => {
													console.log('未定位时获取的文章列表', res);
													uni.setStorageSync('article_id', res.data);
													// console.log('存储文章列表==',res.data)
													this.list = res.data.data.list;
													// console.log('list=====',this.list)
												}
											});
									}
								});
							} else {
								uni.setStorageSync('city_id', res.data);
								console.log('存储本地', res.data);
								var city = uni.getStorageSync('city_id');
								console.log('取数据', city);
								uni.request({
									// url:'http://192.168.43.156:8199/site/hot',
									// url:'site/hot',
									url: this.globalUrl + '/site/hot',
									data: {
										state_id: city.data.state_id,
										city_id: city.data.city_id,
										count: 3,
										sort_by: 3
									},
									success: res => {
										console.log('热门景点', res);
										this.hotAtt = res.data.data;
									}
								}),
									uni.request({
										url: this.globalUrl + '/article/list',
										data: {
											state_id: city.data.state_id,
											city_id: city.data.city_id,
											count: 6,
											page: 1
										},
										header: {
											Authorization: uni.getStorageSync('Authorization')
										},
										success: res => {
											console.log('文章列表', res);
											uni.setStorageSync('article_id', res.data);
											this.list = res.data.data.list;
										}
									});
							}
						}
					});
					// 获取热门目的地
					uni.request({
						url:this.globalUrl + '/area/hot',
						data:{
							state: this.province,
							city: this.city
						},
						success: (res) => {
							console.log('热门目的地==',res)
							this.areaList = res.data.data
							console.log('areaList--',this.areaList)
						}
					})
				},
				// 未开启定位
				fail: res => {
					console.log('未开启定位', res);
					// uni.setStorageSync('errCode',res.errCode)
					this.errCode = 1;
					uni.showToast({
						title: '未获取定位权限，将为您展示最热门城市信息',
						icon: 'none',
						duration: 2000
					});
					// 获取热门景点第一位
					uni.request({
						url: this.globalUrl + '/city/hot',
						method: 'GET',
						success: res => {
							console.log('热门城市===>', res.data.data);
							this.cityName = res.data.data[0].name;
							this.topHotCity = res.data.data[0];
							console.log(this.topHotCity);
							uni.request({
								url: this.globalUrl + '/site/hot',
								data: {
									state_id: this.topHotCity.state_id,
									city_id: this.topHotCity.city_id,
									count: 3,
									sort_by: 3
								},
								success: res => {
									console.log('未定位时获取的热门景点=========', res);
									// uni.setStorageSync('description',res.data)
									this.hotAtt = res.data.data;
								}
							}),
								uni.request({
									url: this.globalUrl + '/article/list',
									data: {
										state_id: res.data.data[0].state_id,
										city_id: res.data.data[0].city_id,
										count: 6,
										page: 1
									},
									// header: {
									// 	'Authorization': uni.getStorageSync('Authorization')
									// },
									success: res => {
										console.log('未定位时获取的文章列表', res);
										uni.setStorageSync('article_id', res.data);
										// console.log('存储文章列表==',res.data)
										this.list = res.data.data.list;
										// console.log('list=====',this.list)
									}
								});
						}
					});
				}
			});
			
		},

		// 获取banner
		getBanner() {
			uni.request({
				url: this.globalUrl + '/banner',
				success: res => {
					console.log('banner--', res);
					this.bannerList = res.data.data;
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
		// 设备信息
		// getSystem(){
		// 	uni.getSystemInfo({
		// 		success:function(res){
		// 			console.log('设备信息',res)
		// 		}
		// 	})
		// },
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
		toProvinces(e){
			var e = JSON.stringify(e)
			console.log('--',e)
			uni.navigateTo({
				url:'/pages/provinces/provinces?id=' + e
			})
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
			// mescroll.setPageSize(6)
			var city = uni.getStorageSync('city_id');
			// console.log('上拉刷新数据', city)
			let pageNum = page.num; // 页码, 默认从1开始
			console.log('pagem=num----', pageNum);
			let pageSize = page.size; // 页长, 默认每页10条
			var that = this;
			if (this.errCode == 1) {
				// 获取热门景点第一位
				uni.request({
					url: this.globalUrl + '/city/hot',
					method: 'GET',
					success: res => {
						console.log('热门城市===>', res.data.data);
						this.cityName = res.data.data[0].name;
						this.topHotCity = res.data.data[0];
						console.log(this.topHotCity);

						uni.request({
							url: this.globalUrl + '/article/list?page=' + pageNum + '&count=' + pageSize,
							data: {
								state_id: res.data.data[0].state_id,
								city_id: res.data.data[0].city_id
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
								if (page.num == 1) this.list = []; //如果是第一页需手动置空列表
								this.list = this.list.concat(curPageData); //追加新数据
								console.log('list-', this.list);
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
				});
			} else {
				// 地址未定义
				if (city.code != 0) {
					uni.request({
						url: this.globalUrl + '/article/list?page=' + pageNum + '&count=' + pageSize,

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
							if (page.num == 1) this.list = []; //如果是第一页需手动置空列表
							this.list = this.list.concat(curPageData); //追加新数据
							console.log('list-', this.list);
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
				} else {
					if (that.item == undefined || null) {
						uni.request({
							url: this.globalUrl + '/article/list?page=' + pageNum + '&count=' + pageSize,
							data: {
								state_id: city.data.state_id,
								city_id: city.data.city_id
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
								if (page.num == 1) this.list = []; //如果是第一页需手动置空列表
								this.list = this.list.concat(curPageData); //追加新数据
								console.log('list-', this.list);
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
					} else {
						uni.request({
							url: this.globalUrl + '/article/list?page=' + pageNum + '&count=' + pageSize,
							data: {
								state_id: that.item.state_id,
								city_id: that.item.city_id
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
								if (page.num == 1) this.list = []; //如果是第一页需手动置空列表
								this.list = this.list.concat(curPageData); //追加新数据
								console.log('list-', this.list);
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
				}
			}
			// 此处仍可以继续写其他接口请求...
			// 调用其他方法...
		}
	}
	//事件监听滚动条
};
</script>

<style scoped>
.left,
.right {
	display: inline-block;
	margin-left: 10rpx;
	vertical-align: top;
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
	background-color: #efeff4;
	min-height: 100%;
	height: auto;
}

view {
	font-size: 14px;
	line-height: inherit;
}

/* 自定义导航栏 */
.search-box {
	width: 486rpx;
	height: 72rpx;
	padding-left: 28rpx;
	z-index: 111;
}
.search-wrap {
	width: 486rpx;
	height: 72rpx;
}
/* 导航栏轮播图 */
.page-section{
	position: relative;
	top: -184rpx;
	left: 0;
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
.swiper-item {
	width: 100%;
	height: 100%;
}
.swiperImg {
	width: 100%;
	height: 100%;
}
.bannerText{
	position: absolute;
	top: 222rpx;
	left: 240rpx;
	width: 306rpx;
	height: 64rpx;
	font-size: 64rpx;
	font-family: Roboto-Black, Roboto;
	font-weight: 900;
	color: #FFFFFF;
	line-height: 64rpx;
}
.diaryBox{
	display: flex;
	align-items: center;
	position: absolute;
	top: 300rpx;
	left: 280rpx;
}
.texth{
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 0.65);
	line-height: 28rpx;
}
.textb{
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
	line-height: 28rpx;
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
	padding: 0;
	font-size: 14px;
	background-color: #aa557f;
}
.mescroll{
	position: relative;
	top: -184rpx;
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
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	

	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	/* width: 160rpx;
 */
	margin-left: 28rpx;
}

.input-view {
	/* #ifndef APP-PLUS-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	/* min-width: 350rpx; */
	/* width: 396rpx; */
	height: 72rpx;
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
	height: 72rpx;
	/* min-width: 350rpx; */
	width: 300rpx;
	line-height: 72rpx;
	/* #ifdef APP-PLUS-NVUE */
	/* #endif */
	font-size: 28rpx;
	color: #c9cad1;
	margin-left: 16rpx;
	font-size: 28rpx;
}

.example-body {
	padding: 0;
}

.cus-sty {
	background-color: #f8f8f8;
}

/* 热门景点 */
.hot {
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	
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
	line-height: 40rpx;
	margin-top: 48rpx;
	margin-left: 32rpx;
}

.hot-top .ht-r {
	width: 94rpx;
	height: 42rpx;
	background: #EDEFF2;
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
.hotAdress{
	display: flex;
	/* align-items: center; */
	margin-left: 32rpx;
}
.dqwz{
	width: 216rpx;
	height: 180rpx;
	border-radius: 16rpx;
	border: 1px solid #FAAD14;
	position: relative;
}
.dqwzImg{
	width: 100%;
	height: 100%;
	border-radius: 16rpx;
	
}
.dqwzText{
	position: absolute;
	top: 50rpx;
	left: 78rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 32rpx;
}
.adressBox{
	display: flex;
	align-items: center;
	position: absolute;
	top: 100rpx;
	left: 40rpx;
	color: #FFFFFF;
	padding: 8rpx 16rpx;
	font-size: 20rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 20rpx;
	width: 140rpx;
	height: 40rpx;
	background: #FFE512;
	border-radius: 11px;
}
.zhishi{
	width: 24rpx;
	height: 24rpx;
	margin-right: 4rpx;
}


.hotCity{
	width: 216rpx;
	height: 180rpx;
	border-radius: 16rpx;
	margin-left: 24rpx;
	position: relative;
	
}
.hotCityImg{
	width: 100%;
	height: 100%;
	border-radius: 16rpx;
}
.hotCityText{
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 32rpx;
	position: absolute;
	left: 50%; 
	top: 50%;
	margin-top: -16rpx;
	margin-left: -32rpx;
}
.hotCityText1{
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 32rpx;
	position: absolute;
	left: 50%; 
	top: 50%;
	margin-top: -16rpx;
	margin-left: -32rpx;
}
.cityRank{
	margin-top: 28rpx;
	margin-left: 32rpx;
	margin-bottom: 28rpx;
	display: flex;
	align-items: center;
}
.rankText{
	width: 200rpx;
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
</style>
