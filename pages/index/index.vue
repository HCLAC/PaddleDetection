<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :title="false" :fixed="true" :status-bar="true" color="#333333" :backgroundColor="backgroundColor" :shadow='Shadow'>
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
			<!-- 功能区 -->
			<view class="function-box">
				<button class="f-box" @click="toChatroom" v-if="auth != ''">
					<image class="f-img" src="/static/images/zxzx.png" />
					<view class="f-text">在线咨询</view>
					 <!-- @click="toChatroom" -->
				</button>
				<button v-else type="default" class="btn f-box" style="border: none;" open-type="getPhoneNumber" @getphonenumber="getPhone">
					<image class="f-img" src="/static/images/zxzx.png" />
					<view class="f-text">在线咨询</view>
				</button>
				<button class="f-box" @click="toquestion">
					<image class="f-img" src="/static/images/jxwd.png" />
					<view class="f-text">精选问答</view>
				</button>
				<button class="f-box" @click="Housekeeper">
					<image class="f-img" src="/static/images/lygj.png" />
					<view class="f-text">旅游管家</view>
				</button>
				<button class="f-box" @click="heat">
					<image class="f-img" src="/static/images/rsbd.png" />
					<view class="f-text">热度榜单</view>
				</button>
				<button class="f-box" @click="stroke">
					<image class="f-img" src="https://cache.lingtuyang.cn/web_static/index-xcdz.png" />
					<view class="f-text">行程定制</view>
				</button>
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
							<view class="pinyinBox">
								<text class="pinyinText">{{ item.pinyin }}</text>
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
				<view class="wrap">
					<articleWaterfall :list="list"></articleWaterfall>
				</view>
			</view>
		</mescroll-body>
		<u-no-network @retry="downCallback()"></u-no-network>
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
				locationCity: {},
				dqdwText: '当前位置',
				downOption: {
					auto:false
				},
				upOption: {
					auto:true,
				},
				backgroundColor: 'transparent',
				firstTime: new Date().getTime(),
				// leaveTime: new Date().getTime(),
				firstLogin: true,
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
				Shadow:false,
				serviceSource: 2,
				auth:'',
				// 首页显示问答
				answersList:[],
				randomPage: 0,
				randomNum: 0,
				genObj:{},
				backgroundQuestion: [
					{background: 'linear-gradient(270deg, #6BBEFF 0%, #0091FF 100%);'},
					{background: 'linear-gradient(270deg, #FFE512 0%, #FFB64D 100%);'},
					{background: 'linear-gradient(270deg, #FFD5A2 0%, #F98480 100%);'}
				]
			};
		},
		created() {
			// 监听从登录页面发来的信息
			uni.$once('onLoginSuccess', first_login => {
				this.firstLogin = first_login
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
			this.auth = getApp().globalData.Authorization
			// 间隔300s，重新加载首页
			// var cur = Number((new Date().getTime())/1000).toFixed(0)
			// var firstT = Number((this.leaveTime)/1000).toFixed(0)
			// if (cur-firstT > 500){
			// 	this.downCallback()
			// 	this.mescroll.scrollTo(0,0)
			// 	this.leaveTime = new Date().getTime()
			// }
			
			// 不是首次登录，刷新瀑布流文章
			if (!this.firstLogin){
				this.mescroll.resetUpScroll()
				this.mescroll.scrollTo(0,0)
				this.firstLogin = true
			}
		},
		// 滚动
		onPageScroll: UTILS.throttle( function(res){
			var scrollTop = res[0].scrollTop
			if (scrollTop >= this.bannerPostion){
				if (this.backgroundColor != '#FFFFFF'){
					this.backgroundColor = '#FFFFFF';
					this.Shadow = true
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
				this.Shadow = false
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

			//一键登录
			getPhone(res) {
				if (res.detail.errMsg != 'getPhoneNumber:ok') {
					uni.showToast({
						title: '用户拒绝授权',
						icon: 'none'
					});
					return;
				}
				swan.getLoginCode({
					success: result => {
						if (!result || !result.code || result.code.length == 0) {
							uni.showToast({
								title: '一键登录失败',
								icon: 'none'
							});
							return
						}
						this.baiduLogin({
							code: result.code,
							source: this.serviceSource,
							data: res.detail.encryptedData,
							iv: res.detail.iv
						});
					},
					fail: err => {
						console.error('getLoginCode', err)
					}
				});
				// 百度小程序直接调用swan.getLoginCode，其他平台调用uni.login
				// if (this.serviceProvider == 'baidu'){
				// 	//#ifdef MP-BAIDU
				// 	swan.getLoginCode({
				// 		success: result => {
				// 			if (!result || !result.code || result.code.length == 0) {
				// 				uni.showToast({
				// 					title: '一键登录失败',
				// 					icon: 'none'
				// 				});
				// 				return
				// 			}
				// 			this.baiduLogin({
				// 				code: result.code,
				// 				source: this.serviceSource,
				// 				data: res.detail.encryptedData,
				// 				iv: res.detail.iv
				// 			});
				// 		},
				// 		fail: err => {
				// 			console.error('getLoginCode', err)
				// 		}
				// 	});
				// 	//#endif
				// 	return 
				// }
				// uni.login({
				// 	provider: this.serviceProvider,
				// 	success: result => {
				// 		if (!result || !result.code || result.code.length == 0) {
				// 			uni.showToast({
				// 				title: '一键登录失败',
				// 				icon: 'none'
				// 			});
				// 			return;
				// 		}
				// 		this.baiduLogin({
				// 			code: result.code,
				// 			source: this.serviceSource,
				// 			data: res.detail.encryptedData,
				// 			iv: res.detail.iv
				// 		});
				// 	},
				// 	fail: err => {
				// 		console.error('login', err)
				// 	}
				// });
			},
			baiduLogin(obj) {
				this.HTTP.request({
					url: '/user/oauth/code2session',
					data: {
						code: obj.code,
						source: 2
					},
					method: 'POST',
					success: res => {
						if (res.data.code == 0) {
							this.getSessionKey({
								uuid: res.data.data,
								data: obj.data,
								iv: obj.iv
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			getSessionKey(obj) {
				this.HTTP.request({
					url: '/user/oauth/login',
					data: {
						data: obj.data,
						iv: obj.iv,
						uuid: obj.uuid,
						source: this.serviceSource
					},
					method: 'POST',
					success: res => {
						if (res.data.code == 0) {
							var auth = res.header.authorization ? res.header.authorization : res.header.Authorization
							this.loginSuccess(res.data.data, auth) 
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			loginSuccess(userinfo, auth){
				
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				}),
				getApp().globalData.Authorization = auth
				
				uni.setStorage({
					key: 'userinfo',
					data: userinfo,
					success: function () {
					}
				});
				uni.setStorage({
					key: 'Authorization',
					data: auth,
					success: function () {
					}
				});
				uni.$emit('onLoginSuccess', userinfo.first_login);
				// this.Utils.back()
				this.toChatroom()
				
			},
			toChatroom(){
				this.HTTP.request({
					url: '/bulter/consulting',
					method: 'POST',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var info = res.data.data
						console.log(info, '管家列表')
						if(info.history.length > 0){
							uni.navigateTo({
								url:'/pages_im/chatroom/chatroom?search_id=' + info.search_id,
							})
						}else{
							uni.navigateTo({
								url:'/pages_im/problem/problem?bulter_id=' + info.bulter_id,
							})
						}
					}
				});
			},
			Housekeeper(){
				uni.navigateTo({
					url:'/pages_im/housekeeperList/housekeeperList',
				})
			},
			//跳转精选问答
			toquestion(){
				uni.navigateTo({
					url:'/pages_questions/moreQuestions/moreQuestions'
				})
				//支付
				// uni.requestPayment({
				//     provider: 'baidu',
				// 	orderInfo: {
				// 		dealId:this.genObj.dealId,
				// 		appKey:this.genObj.appKey,
				// 		totalAmount:this.genObj.totalAmount,
				// 		tpOrderId:this.genObj.tpOrderId,
				// 		dealTitle:this.genObj.dealTitle,
				// 		signFieldsRange:this.genObj.signFieldsRange,
				// 		rsaSign:this.genObj.rsaSign,
				// 	},
				//      //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
				//     success: function (res) {
				//         console.log('success:' + JSON.stringify(res));
				//     },
				//     fail: function (err) {
				//         console.log('fail:' + JSON.stringify(err));
				//     }
				// });
			},
			//跳转热搜榜单
			heat(){
				uni.navigateTo({
					url:'/pages_search/hotSearchRank/hotSearchRank'
				})
			},
			//跳转行程定制
			stroke(){
				if (!this.Utils.isLogin()) {
					return
				}
				uni.removeStorageSync('stateS');
				uni.removeStorageSync('citys');
				uni.removeStorageSync('value');
				uni.setStorage({
					key: 'mode',
					data: 1,
					success:  (e)=> {
						console.log(e,'success');
					}
				});
				uni.navigateTo({
					url:'/pages_im/customization/customization'
				})
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
							  this.getLocation()
						  }
					   }
					})
				}
			},
			loadData(){
				uni.showLoading({
					title: '加载中',
					mask: true,
					success: () => {
						this.hideLoad();
					},
					complete: () => {
						this.getQuestionList();
						this.getBanner();
						this.getAdress();
					}
				});
				
			},
			hideLoad(){
				setTimeout(() => {
					uni.hideLoading();
				}, 300);
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
			// 获取问答列表
			getQuestionList() {
				this.randomPage += 1 
				this.randomNum = 0
				this.HTTP.request({
					url: '/questions/random',
					retry: 3,
					data: {
						page: this.randomPage,
						count: 6
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						
						if (res.data.data.total <= this.randomPage*6){
							this.randomPage = 0
						}
						var answersList = res.data.data.list
						for (let i = 1; i < answersList.length; i++) {
						    const random = Math.floor(Math.random() * (i + 1));
						    [answersList[i], answersList[random]] = [answersList[random], answersList[i]];
						}
						
						this.answersList = answersList
					}
				});
			},
			getAdress(){
				uni.getSetting({
				   success: res =>{
					  if(res.authSetting['scope.userLocation'] == false){
						  this.getAreaHot()
						  this.dqdwText = '未定位';
						  this.popularCities = true
						  this.locationCity.city_id = '0'
						  this.locationCity.name = '暂无定位'
					  }else{
						  this.getLocation()
					  }
				   }
				})
			},
			// 获取当前地理位置
			getLocation() {
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
						this.HTTP.request({
							url: '/area/hot',
							retry: 3,
							data: {
								state: res.province,
								city: res.city
							},
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
								if(areaList[0].is_location == 1){
									this.popularCities = true
									this.locationCity = areaList[0]
								}else{
									this.popularCities = false
									this.locationCity.name = '暂无定位'
									this.locationCity.city_id = '0'
								}
								this.dqdwText = '当前定位'
								this.areaList = areaList;
							}
						});
					},
					// 未开启定位
					fail: error => {
						this.getAreaHot()
						console.log('定位', error)
						if (error.errCode === 10005 || error.errCode === 10003) {
							uni.showToast({
								title: "请检查定位功能是否开启",
								icon: 'none'
							});
						}
						this.dqdwText = '未定位';
						this.popularCities = true
						this.locationCity.city_id = '0'
						this.locationCity.name = '暂无定位'
					}
				});
			},
			getAreaHot(){
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
			// 点击更多
			showCity() {
				uni.navigateTo({
					url: '/pages_content/city-hot/city-hot?state_id=' + 
					this.locationCity.state_id+"&city_id="+this.locationCity.city_id+"&name="+this.locationCity.name+"&image="+this.locationCity.image
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
				
				if (page.num == 1) {
					this.list = []; //如果是第一页需手动置空列表
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
								item1.height = (340*item1.cover_height/item1.cover_width).toFixed(2)+'rpx'
							} else {
								item1.height = null
							}
							item1.isAnimate = false
							item1.avatar = this.Utils.addImageProcess(item1.avatar, false, 60)
							item1.image = this.Utils.addImageProcess(item1.image, false, 40)
						})
						
						if(this.answersList.length > 0 && curPageLen == pageSize){
							let qobj = this.answersList[this.randomNum]
							qobj.style = this.backgroundQuestion[this.randomNum%3]
							curPageData.splice(2, 0, qobj)
							this.randomNum++
							if (this.randomNum == this.answersList.length){
								this.getQuestionList()
							}
						} else {
							console.log('no answer')
							this.getQuestionList()
						}
						
						that.list = that.list.concat(curPageData); //追加新数据
						that.mescroll.endByPage(curPageLen, totalPage);
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						that.mescroll.endErr();
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
	// 功能区
	.function-box{
		width: 100%;
		height: 168rpx;
		background: #F9FAFA;
		display: flex;
		.f-box{
			width: 20%;
			height: 100%;
			display: flex;
			background: rgba(0,0,0,0);
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.f-img{
				width: 68rpx;
				height: 68rpx;
			}
			.f-text{
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
				// margin-top: 8rpx;
			}
			
		}
		.btn{
			background: rgba(0,0,0,0);
			border: none;
		}
		.btn::after{
			border: none;
		}
		.f-box::after{
			border: none;
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
				margin-top: 30rpx;
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
				margin: 28rpx 32rpx 0 0;
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

		.hot-bot {
			margin-top: 32rpx;
			.hotAdress {
				display: flex;
				justify-content: space-between;
				padding: 0 28rpx;
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
						line-height: 62rpx;
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
						// left: 40rpx;
						left: 50%;
						transform: translate(-50%);
						color: #ffffff;
						padding: 8rpx 16rpx;
						font-size: 16rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #303133;
						height: 40rpx;
						background: #ffe512;
						border-radius: 11px;
						.zhishi {
							width: 24rpx;
							height: 24rpx;
							margin-right: 4rpx;
						}
						.dqwzText1{
							width: 80rpx;
							font-size: 20rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #303133;
							display: flex;
							justify-content: center;
						}
					}
				}
				.pinyinBox{
					display: flex;
					align-items: center;
					position: absolute;
					top: 102rpx;
					z-index: 10;
					left: 50%;
					transform: translate(-50%);
					.pinyinText{
						font-size: 20rpx;
						font-family: STSongti-SC-Light, STSongti-SC;
						font-weight: 300;
						color: #FFFFFF;
					}
				}
				.hotCity {
					width: 216rpx;
					height: 180rpx;
					border-radius: 16rpx;
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
						line-height: 20rpx;
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
					width: 208rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					text-align: center;
				}
			}
		}
	}
	
	/* 正在旅行 */
	.touring {
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
