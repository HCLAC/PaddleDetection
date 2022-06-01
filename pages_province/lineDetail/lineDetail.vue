<template>
	<view>
		<view class="nav-bar" >
			<uni-nav-bar :fixed="true" title="领途羊旅游管家" :status-bar="true" style="z-index: 99999 !important;">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 骨架屏 -->
		<view v-if="loading" class="loadBox">
			<view class="content u-skeleton">
				<view class="loadBlock">
					<view class="banner u-skeleton-rect"></view>
					<view class="kong u-skeleton-circle"></view>
					<view class="box-btm">
						<view class="kong-big u-skeleton-rect"></view>
						<view class="title u-skeleton-rect"></view>
						<view class="title u-skeleton-rect"></view>
						<view class="title u-skeleton-rect"></view>
						<view class="title-min u-skeleton-rect"></view>
						<view class="xxk-box">
							<view class="xxk u-skeleton-rect"></view>
							<view class="xxk u-skeleton-rect"></view>
						</view>
						<view class="day-box">
							<view class="day-min u-skeleton-circle"></view>
							<view class="day u-skeleton-rect"></view>
						</view>
						<view class="title u-skeleton-rect"></view>
						<view class="title-min u-skeleton-rect"></view>
						<view class="lx-box" v-for="(item, index) in loadEmpty">
							<view class="lx-top">
								<view class="lx-min u-skeleton-circle"></view>
								<view class="lx u-skeleton-rect"></view>
							</view>
							<view class="lx-center">
								<view class="lx-min u-skeleton-rect"></view>
								<view class="lx u-skeleton-rect"></view>
								<view class="lx u-skeleton-rect"></view>
								<view class="lx-min u-skeleton-rect"></view>
							</view>
							<view class="lx-btm u-skeleton-rect"></view>
						</view>
					</view>
				</view>
			</view>
			<!--引用组件-->
			<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		</view>
		<view>
			<view class="lineHeader">
				<view class="lineImageWrap" v-if="lineContent" v-show="lineContent">
					<!-- 内容详情轮播图 -->
					<view class="uni-padding-wrap">
						<view class="page-section" >
							<view class="page-section-spacing" >
								<swiper @change="change" class="swiper" :autoplay="true" :indicator-dots="false" circular='true'>
									<swiper-item v-for="(item, index) in lineContent.images" :key="index">
										<u-image width="100%" height="440rpx" mode="scaleToFill" :src="item"></u-image>
									</swiper-item>
								</swiper>
								<view class="imageCount">{{ current + 1 }}/{{ lineContent.images.length }}</view>
								<view class="dots">
									<block v-for="(item, index) in lineContent.images" :key="index"><view :class="[index == current ? 'activieDot' : 'dot']"></view></block>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="container">
					<view class="linePrice">
						<view class="linePrice-number">
							<view class="price-img">
								<image src="../../static/images/money.svg"></image>
							</view>
							<text class="price">{{lineContent.min_money}} ~ {{lineContent.max_money}}</text>
							<text>起</text>
						</view>
						<view class="linePrice-text">
							参考价格
						</view>
					</view>
					<view class="lineTitle">{{ lineContent?lineContent.title:'' }}</view>
				</view>
				<view class="lineDriver"></view>
			</view>
			<view class="lineTabs">
				<meTabs class="lineDetailTabs" v-model="tabIndex" :tabs="tabList" @change="tabChange" :fixed="isFixed" :top="navbarHeight"  :line-width="130" :tab-width="105"></meTabs>
			</view>
			<view class="linePlan">
				<view class="planContent" v-if='lineContent'>
					<u-time-line >
						<view v-for="(item, index) in lineContent.content" :key="index">
							<u-time-line-item nodeTop="2">
								<!-- 此处自定义了左边内容，用一个图标替代 -->
								<template v-slot:node>
									<view class="u-node" style="background: #BFC2CC ; border-radius: 50%;">
										<!-- 此处为uView的icon组件 -->
										<view style="width: 10rpx; height: 10rpx;"></view>
									</view>
								</template>
								<template v-slot:content>
									<view>
										<view class="u-order-title">
											<text class="tui-chat-right">
												<text class="tui-chatbox tui-chatbox-right">第{{ item.day }}天</text>
											</text>
											<text class="planTitle">{{ item.title }}</text>
										</view>
										<view class="u-order-desc1">{{ item.description }}</view>
										<!-- <view class="u-order-time"></view> -->
									</view>
								</template>
							</u-time-line-item>
							<view v-for="(eve, eveIndex) in item.event" :key="eveIndex">
								<u-time-line-item>
									<template v-slot:node>
										<view class="uTime">
											<image class="timeIcon" src="/static/images/timeClock.svg"></image>
											<text>{{ eve.time == '上午' ? '上午' : '下午' }}</text>
										</view>
									</template>
									<template v-slot:content>
										<view style="height: 40rpx;"></view>
									</template>
								</u-time-line-item>
								<u-time-line-item nodeTop="2">
									<!-- 此处自定义了左边内容，用一个图标替代 -->
									<template v-slot:node>
										<view class="u-node" style="background: #B7EB8F; border-radius: 50%;">
											<!-- 此处为uView的icon组件 -->
											<view style="width: 10rpx; height: 10rpx;"></view>
										</view>
									</template>
									<template v-slot:content>
										<view>
											<view class="u-order-title">
												<text class="stitle">{{ eve.title }}</text>
											</view>
											<view class="u-order-desc">{{ eve.description }}</view>
											<view class="position" v-for="(pos, posIndex) in eve.position" :key="posIndex" @click="toPosition(pos)">
												<view class="left">
													<u-image width="216rpx" height="164rpx" border-radius="12rpx" :src="pos.cover_url" :iconSize="66"></u-image>
													<view class="imgTag">景点</view>
												</view>
												<view class="right">
													<view class="title">{{ pos.name }}</view>
													<view class="rateBox">
														<uni-rate :readonly="true" :value="pos.rate" :size='14' margin="4" :allowHalf="true"/>
														<view class="rate" >{{ pos.rate }} 星</view>
													</view>
													<text class="content">{{ pos.description }}</text>
												</view>
											</view>
										</view>
									</template>
								</u-time-line-item>
							</view>
						</view>
					</u-time-line>
					<view class="serverInfo" v-if="lineContent.content">
						<view class="title">服务说明</view>
						<view class="content">{{ lineContent.description }}</view>
					</view>
					
				</view>
				<view class="bottom">
					<view class="bottom-text">
						
					</view>
					<view class="like"  @click="clickLike">
						<view v-if="isAnimate" class="icon-animate"></view>
						<view v-else :class="lineContent.liked?'has-like':'icon-like'"></view>
					</view>
					<view class="likeNum">{{ lineContent.like_count }}</view>
					
					<view class="fav" @click="clickFav">
						<image class="favBtn" :src="lineContent.fav == 1?'/static/images/attFavA.svg':'/static/images/attFav.svg'"></image>
					</view>
					<view class="favNum">{{ lineContent.fav_count }}</view>
					
					<view class="share" v-if="serviceProvider =='baidu'"  @click="share">
						<image src="/static/images/shareIcon.svg"></image>
					</view>
				</view>
			</view>
			<!-- <view class="phone" @click="tell" >
				<image src="/static/images/serverCall.svg"></image>
			</view> -->
			<button type="default" class="phone" @click="toChatroom(item)" v-if="auth != ''">
				<image src="/static/images/serverCall.svg"></image>
			</button>
			<button v-else type="default" class="phone" open-type="getPhoneNumber" @getphonenumber="getPhone">
				<image src="/static/images/serverCall.svg"></image>
			</button>
			
		</view>
		
	</view>
</template>

<script>
import meTabs from '@/common/me-tabs/me-tabs.vue';
export default {
	components: {
		meTabs
	},
	data() {
		return {
			auth:'',
			id: 0,
			lineContent:null,
			lineContent: null,
			current: 0,
			hasLogin: false,
			isFixed: false,
			serviceProvider: '',
			headerHeight:200,
			navbarHeight: 64,
			planHeight: 2000,
			serverInfoHeight: 2000,
			tabList: ['参考行程', '服务说明'],
			tabIndex: 0 ,// 当前tab下标,必须与mescroll-more.js对应,所以tabIndex是固定变量,不可以改为其他的名字
			Show:false,
			hasLikeClick:false,
			// 骨架屏
			loadEmpty:[1,2],
			loading: true,
			// 动效
			isAnimate: false,
			inTabChange:false,
			serviceSource: 2,
		};
	},
	mounted(){
		this.navbarHeight = getApp().globalData.navbarHeight
	},
	// #ifdef MP-BAIDU
	onInit(query) {
	// #endif
	// #ifndef MP-BAIDU
	onLoad(query) {
	// #endif
		this.id = query.id
		this.serviceProvider = getApp().globalData.serviceProvider
		this.loadData();
	},
	onShow() {
		this.hasLogin = getApp().globalData.Authorization ? true : false;
		this.auth = getApp().globalData.Authorization
		
	},
	onPageScroll(e) {
		if (e.scrollTop > this.headerHeight) {
			if (e.scrollTop > this.headerHeight+20 && this.isFixed){
			} else {
				this.isFixed = true;
			}
		} else {
			this.isFixed = false;
		}
		if(this.inTabChange){
			return
		}
		if(e.scrollTop >= this.planHeight+20){
			this.tabIndex = 1
		} else {
			this.tabIndex = 0
			this.Show = false
		}
	},
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
			console.log(obj,'obj')
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
		loadData(){
			uni.showLoading({
				title: '加载中',
				mask: true,
				success: () => {
				},
				complete: () => {
					this.loading = true
					this.getDetail();
				}
			});
		},
		hideLoad(){
			setTimeout(() => {
				this.loading = false
				uni.hideLoading();
			}, 300);
		},
		//获取行程信息
		getDetail() {
			var that = this
			this.HTTP.request({
				url: '/route',
				method: 'GET',
				data: {
					uuid: this.id
				},
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					var lineContent = res.data.data
					lineContent.content = lineContent.content && lineContent.content.length ? JSON.parse(lineContent.content) : [];
					lineContent.content && lineContent.content.forEach((itemDay, index1) => {
						itemDay.event && itemDay.event.forEach((itemEvent, index2) => {
							itemEvent.position && itemEvent.position.forEach((itempPosition, index3) => {
								itempPosition.cover_url = that.Utils.addImageProcess(itempPosition.cover_url, false, 40)
							})
						})
					})
					
					that.butler_mobile = lineContent.butler_mobile;
					
					lineContent.images.forEach((item1, index1) => {
						lineContent.images[index1] = that.Utils.addImageProcess(item1, true, 70)
					})
					that.lineContent = lineContent;
					
					that.hideLoad()
					setTimeout(() => {
						this.calcHeight()
					}, 300);
					//#ifdef MP-BAIDU
					swan.setPageInfo({
						title: that.lineContent.title+"-领途羊",
						keywords: that.lineContent.title+",行程路线,领途羊",
						description: that.lineContent.description,
						image: that.lineContent.images.length <=3 ? that.lineContent.images : that.lineContent.images.slice(0,3),
					})
					//#endif
				}
			});
		},
		// 点赞
		clickLike() {
			var that = this;
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '/pages_mine/login/login'
				});
				return
			}
			if (this.hasLikeClick) {
				return;
			}
			if (this.lineContent.liked == 0){
				this.isAnimate = true
				setTimeout(() => {
				    this.isAnimate = false;
				}, 800);
			}
			this.hasLikeClick = true;
			this.HTTP.request({
				url: '/user/liked',
				data: {
					article_id: that.lineContent.uuid,
					liked: that.lineContent.liked == 0 ? 1 : 0,
					type: that.lineContent.type
				},
				method: 'POST',
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					that.lineContent.liked = res.data.data.liked
					that.lineContent.like_count = res.data.data.like_count
					
					// if (that.trace_info && that.rn) {
					// 	that.Opensearch.uploadData({
					// 		trace_info: that.trace_info,
					// 		rn: that.rn,
					// 		item_id: that.article_id,
					// 		bhv_type: 'like'
					// 	})
					// }
				},
				complete: () => {
					that.hasLikeClick = false;
				}
			});
		},
		// 收藏
		clickFav() {
			var that = this;
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '/pages_mine/login/login'
				});
				return
			}
			
			if (this.hasFavClick) {
				return;
			}
			this.hasFavClick = true;
			this.HTTP.request({
				url: '/user/favorite',
				data: {
					article_id: that.lineContent.uuid,
					favorite: that.lineContent.fav == 0 ? 1 : 0,
					type: that.lineContent.type
				},
				method: 'POST',
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					that.lineContent.fav = res.data.data.fav
					that.lineContent.fav_count = res.data.data.fav_count
					// if (that.trace_info && that.rn) {
					// 	that.Opensearch.uploadData({
					// 		trace_info: that.trace_info,
					// 		rn: that.rn,
					// 		item_id: that.article_id,
					// 		bhv_type: 'collect'
					// 	})
					// }
				},
				complete: () => {
					that.hasFavClick = false;
				}
			});
		},
		calcHeight(){
			if (this.isFixed || this.loading){
				return
			}
			const query = uni.createSelectorQuery().in(this);
			setTimeout(() => {
				query.select('.lineHeader').boundingClientRect(data => {
					console.log('lineHeader', data)
					this.headerHeight = data.height
				})
				query.select('.linePlan').boundingClientRect(data => {
					console.log('linePlan', data)
					this.planHeight = data.height-data.top
				}).exec();
			}, 500);
		},
		// 切换
		tabChange(index){
			
			this.tabIndex = index
			let scrollTop = this.planHeight * 2
			// console.log(scrollTop,'scrollTop')
			if (index == 0){
				scrollTop = this.headerHeight + 3
			}else{
				this.inTabChange = true
			}
			uni.pageScrollTo({
				scrollTop: scrollTop,
				duration: 50,
			})
			setTimeout(() => {
				this.inTabChange = false
			}, 300);
		},
		change(e) {
			this.current = e.detail.current;
		},
		lineFav(id) {
			if (!this.hasLogin) {
				this.login()
				return
			}
			this.HTTP.request({
				url: '/user/favorite',
				method: 'POST',
				header: {},
				data: {
					uuid: id
				},
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
				}
			});
		},
		toPosition(pos) {
			if (pos.id) {
				uni.navigateTo({
					url: '/pages_province/positionContent/positionContent?id=' + pos.id
				});
			}
		},
		// login() {
		// 	uni.navigateTo({
		// 		url: '/pages_mine/login/login'
		// 	});
		// },
		tell(){
			uni.makePhoneCall({
				phoneNumber:this.butler_mobile
			})
		},
		share() {
			uni.showShareMenu({
			});
		}
	}
};
</script>

<style lang="scss">
// 骨架屏样式
.loadBox{
	width: 100%;
	height: auto;
	.loadBlock{
		.banner{
			width: 100%;
			height: 440rpx;
		}
		.kong{
			width: 104rpx;
			height: 20rpx;
			margin: 20rpx auto;
		}
		.box-btm{
			padding: 0 28rpx;
			margin-top: 20rpx;
			.kong-big{
				width: 204rpx;
				height: 40rpx;
				margin-bottom:20rpx;
			}
			.title{
				width: 694rpx;
				height: 20rpx;
				margin-bottom: 20rpx;
			}
			.title-min{
				width: 348rpx;
				height: 20rpx;
			}
		}
		.xxk-box{
			display: flex;
			margin-top: 80rpx;
			.xxk{
				width: 120rpx;
				height: 40rpx;
				margin-right: 40rpx;
			}
		}
		.day-box{
			display: flex;
			align-items: center;
			margin-top: 40rpx;
			margin-bottom: 20rpx;
			.day-min{
				width: 120rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
			.day{
				width: 554rpx;
				height: 20rpx;
			}
		}
		.lx-box{
			.lx-top{
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				.lx-min{
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
				.lx{
					width: 40rpx;
					height: 20rpx;
				}
			}
			.lx-center{
				.lx-min{
					width: 348rpx;
					height: 20rpx;
					margin-top: 20rpx;
				}
				.lx{
					width: 694rpx;
					height: 20rpx;
					margin-top: 20rpx;
				}
			}
			.lx-btm{
				width: 694rpx;
				height: 200rpx;
				margin-top: 20rpx;
			}
		}
	}
}
.u-node{
	border: 8rpx solid #FFFFFF;
}
.active{
	font-size: 32rpx !important;
}
.tabs-line{
	border-radius: 12px !important;
	height: 12rpx !important;
	margin-bottom: 2rpx !important;
}
.page-section-spacing {
	position: relative;
	width: 100%;
	height: 440rpx;
}
.swiper {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}


.imageCount {
	height: 40rpx;
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 20rpx;
	text-align: center;
	line-height: 40rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
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
// swipper样式 end
.container {
	padding: 40rpx 30rpx 20rpx;

	.linePrice {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		display: flex;
		align-items: flex-end;
		.linePrice-number{
			display: flex;
			align-items: flex-end;
			.price-img{
				width: 14rpx;
				height: 18rpx;
				margin-bottom: 10rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.price {
				font-size: 64rpx;
				font-family: STSongti-SC-Black, STSongti-SC;
				font-weight: 900;
				color: #FA541C;
				line-height: 50rpx;
			}
			text{
				margin-left: 8rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				color: #FA541C;
			}
		}
		.linePrice-text{
			width: 112rpx;
			height: 36rpx;
			background: rgba(0, 145, 255, 0.1);
			border-radius: 18rpx;
			color: #0091FF;
			display: flex;
			font-size: 22rpx;
			justify-content: center;
			align-items: center;
			margin-left: 16rpx;
		}
	}
	.lineTitle {
		padding-top: 20rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 48rpx;
	}
}
.lineDriver {
	height: 20rpx;
	width: 100%;
	background: #f8f8f8;
}

.lineTabs{
	height: 128rpx;
}

.linePlan {
	margin-top: 20rpx;
	margin-left: 20rpx;
	position: absolute; 
	padding: 10rpx 10rpx;
	padding-bottom: 175rpx;
	.planContent {
		padding-right: 10rpx;
		padding-left: 5rpx;
	}
}
.tui-chatbox::before {
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	top: 20rpx;
	border: 16rpx solid;
}
.tui-chatbox {
	width: 64rpx;
	padding: 0 10rpx;
	height: 40rpx;
	background: #ffe512;
	position: relative;
	border-radius: 6rpx;
	font-size: 24rpx;
	font-weight: bold;
	color: #000;
	word-break: break-all;
	word-wrap: break-word;
}
.tui-chatbox-right {
	background: #ffe512;
	border: 1rpx solid #ffe512;
}

.tui-chatbox-right::before {
	top: 3%;
	right: 88%;
	border-color: transparent #ffe512 transparent transparent;
}
.planContent {
	font-family: PingFangSC-Medium, PingFang SC;
	.position {
		position: relative;
		left: -14rpx;
		width: 642rpx;
		margin: 32rpx 0;
		height: 204rpx;
		background: #FFFFFF;
		box-shadow: 0 0 36rpx 0 rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20rpx;
		.right {
			margin-left: 20rpx;
			height: 164rpx;
			.title {
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
			}
			.content {
				margin-top: 6rpx;
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #909399;
				line-height: 36rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.rateBox {
				display: flex;
				align-items: center;
				margin-top: 6rpx;
				.rate {
					margin-left: 2rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #606266;
				}
				.rateStart {
					image {
						width: 22.4rpx;
						height: 22.4rpx;
						margin-right: 6rpx;
					}
				}
			}
		}
		.left {
			position: relative;

			.imgTag {
				width: 88rpx;
				height: 44rpx;
				background: #9fd873;
				border-radius: 12rpx 0px 12rpx 0px;
				position: absolute;
				left: 0;
				top: 0rpx;
				color: #ffffff;
				font-size: 24rpx;
				text-align: center;
				line-height: 44rpx;
			}
		}
	}

	.u-order-title {
		position: relative;
		top: -20rpx;
		left: -18rpx;
		display: flex;
		align-items: center;
	}
	
	.planTitle {
		font-size: 30rpx;
		font-weight: 500;
		color: #303133;
		margin-left: 20rpx;
		font-family: PingFangSC-Medium, PingFang SC;
	}
	.stitle{
		margin-left: 4rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-size: 30rpx;
		font-weight: 500;
		color: #303133;
	}
	.u-order-desc {
		font-size: 30rpx;
		text-align: justify;
		color: #606266;
		font-family: PingFangSC-Light, PingFang SC;
		font-weight: 300;
		position: relative;
		left: -14rpx;
		line-height: 42rpx;
		text-align: justify;
	}
	.u-order-desc1 {
		font-size: 30rpx;
		text-align: justify;
		color: #303133;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 300;
		position: relative;
		left: -14rpx;
		line-height: 42rpx;
	}

	.uTime {
		display: flex;
		align-items: center;
		margin-left: 60rpx;
		.timeIcon {
			width: 34rpx;
			height: 34rpx;
			margin-left: 14rpx;
		}
		text {
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			line-height: 42rpx;
			color: #606266;
			margin-left: 10rpx;
		}
	}
}
.u-time-axis-node {
	top: -1.5vw !important;
}
.bottom {
	width: 100%;
	height: 98rpx;
	position: fixed;
	left: 0;
	bottom: var( --window-bottom);
	z-index: 111;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: content-box;
	display: flex;
	align-items: center;
	border-top: 2rpx solid #EDEFF2;
	background-color: hsla(0,0%,89.8%,.8);
	background: hsla(0,0%,100%,.9);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}
.bottom-text{
	width: 372rpx;
	height: 68rpx;
	padding-left: 28rpx;
	margin-left: 28rpx;
	margin-right: 32rpx;
}
.share{
	margin-left: 32rpx;
	width: 52rpx;
	height: 52rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.like {
	display: flex;
	align-items: center;
	width: 52rpx;
	height: 52rpx;
	margin-right: 4rpx;
	.has-like {
		width: 100%;
		height: 100%;
		display: inline-block;
		background-size: 100%;
		background-origin: center center;
		background-image: url(../../static/images/attHeartActive.svg);
	}
	.icon-like {
		width: 100%;
		height: 100%;
		display: inline-block;
		background-image: url(../../static/images/attheart.svg);
		background-size: 100%;
		background-origin: center center;
	}
	
	.icon-animate {
		width: 100%;
		height: 100%;
		display: block;
		background-image: url(../../static/icon-heart.gif);
		background-size: 100%;
		background-origin: center center;
	}
}
.likeNum {
	width: 30rpx;
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 24rpx;
	margin-right: 32rpx;
}
.fav {
	display: flex;
	align-items: center;
	margin-right: 4rpx;
	position: relative;
	width: 52rpx;
	height: 52rpx;
	.favBtn {
		width: 100%;
		height: 100%;
	}
}
.favNum {
	width: 30rpx;
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 24rpx;
}
.serverInfo {
	width: 694rpx;
	min-height: 416rpx;
	background: #f8f8f8;
	border-radius: 8rpx;
	position: relative;
	padding: 28rpx;
	margin: 0 auto;
	margin-left: -4rpx;
	text-align: justify;
	.title {
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 50rpx;
		text-align: center;
	}
	.content {
		margin-top: 20rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Light, PingFang SC;
		font-weight: 400;
		color: #606266;
		line-height: 36rpx;
	}
}
.phone {
	width: 92rpx;
	height: 92rpx;
	background: #ffe512;
	border-radius: 50%;
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 246rpx;
	right: 34rpx;
	justify-content: center;
	box-shadow: 0px 0px 12rpx 4rpx rgba(255, 229, 18, 0.35);
	image {
		width: 46rpx;
		height: 46rpx;
	}
}
.phone::after{
	border: none;
}
</style>
