<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
								<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
							<!-- #endif -->
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<view class="search-box" @click="back">
			<mSearch class="mSearch-input-box" :mode="2" button="inside" :placeholder="defaultKeyword" v-model="keyword" :focus="isFocus"></mSearch>
		</view>
		
		<view class="container">
			<!-- 省市主题 -->
			<block v-if="area">
				<view class="siteView" @click="getCity(area)">
					<image class="siteViewImg" :src="area.image" mode=""></image>
					<view class="siteViewText">
						<view class="title">{{ area.name }}</view>
						<view class="content">
							查看省市主题页
						</view>
					</view>
					<image class="iconRight" src="../../static/images/more-right.svg" mode=""></image>
				</view>
				<view class="line">
					
				</view>
			</block>
			<!-- 景点 -->
			<block v-if="site">
				<view class="areaView" @click.stop="getSite(site.id)">
					<image class="areaImg" :src="site.image[0]" mode=""></image>
					<view class="top">
						<view class="title">{{ site.name }}</view>
						<view class="areacontent">{{ site.description }}</view>
						<view class="rateBox">
							<!-- <uni-rate  :readonly="true" allow-half :value="rate" /> -->
							<!-- 评分图标 -->
							<view class="rateStart" v-if="site.rate == 5">
								<image src="../../static/images/star_svg/star4.svg" mode=""></image>
								<image src="../../static/images/star_svg/star4.svg" mode=""></image>
								<image src="../../static/images/star_svg/star4.svg" mode=""></image>
								<image src="../../static/images/star_svg/star4.svg" mode=""></image>
								<image src="../../static/images/star_svg/star4.svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="site.rate == 4">
								<image src="../../static/images/star_svg/star3.svg" mode=""></image>
								<image src="../../static/images/star_svg/star3.svg" mode=""></image>
								<image src="../../static/images/star_svg/star3.svg" mode=""></image>
								<image src="../../static/images/star_svg/star3.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="site.rate == 3">
								<image src="../../static/images/star_svg/star2.svg" mode=""></image>
								<image src="../../static/images/star_svg/star2.svg" mode=""></image>
								<image src="../../static/images/star_svg/star2.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="site.rate == 2">
								<image src="../../static/images/star_svg/star1.svg" mode=""></image>
								<image src="../../static/images/star_svg/star1.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="site.rate == 1">
								<image src="../../static/images/star_svg/star11.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="site.rate == 4.5">
								<image src="../../static/images/star_svg/star3.svg" mode=""></image>
								<image src="../../static/images/star_svg/star3.svg" mode=""></image>
								<image src="../../static/images/star_svg/star3.svg" mode=""></image>
								<image src="../../static/images/star_svg/star3.svg" mode=""></image>
								<image src="../../static/images/star_svg/starCopy13.svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="site.rate == 3.5">
								<image src="../../static/images/star_svg/star2.svg" mode=""></image>
								<image src="../../static/images/star_svg/star2.svg" mode=""></image>
								<image src="../../static/images/star_svg/star2.svg" mode=""></image>
								<image src="../../static/images/star_svg/starCopy12.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="site.rate == 2.5">
								<image src="../../static/images/star_svg/star1.svg" mode=""></image>
								<image src="../../static/images/star_svg/star1.svg" mode=""></image>
								<image src="../../static/images/star_svg/starCopy1.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="site.rate == 1.5">
								<image src="../../static/images/star_svg/star11.svg" mode=""></image>
								<image src="../../static/images/star_svg/starCopy1.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
							</view>
							<view class="rateStart" v-if="site.rate == 0.5">
								<image src="../../static/images/star_svg/starCopy1.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
								<image src="../../static/images/star_svg/star5.svg" mode=""></image>
							</view>
							<view class="rate">{{ site.rate }} 星</view>
						</view>
					</view>
				</view>
				<view class="line">
					
				</view>
			</block>
			<!-- 行程路线 -->
			<block v-if="route_list && route_list.length">
				<view class="titleBox">
					<veiw class="contentTitle">行程线路</veiw>
					<view class="moreBox" @click="toLineMore()">
						更多
						<image src="../../static/images/more-right.svg" mode=""></image>
					</view>
				</view>
				<view style="padding-left: 4%; padding-top: 30rpx;">
					<view class="swiper">
						<view class="swiperItem" v-for="(item, index) in route_list" @click="getRoute(item.uuid)" :key="index">
							<image :src="item.image"></image>
							<view class="title"><rich-text :nodes="item.htmlStr"></rich-text></view>
						</view>
					</view>
				</view>
				<view class="line">
					
				</view>
			</block>
			<!-- 内容精选 -->
			<veiw class="contentTitle">内容精选</veiw>
			<view class="touring">
				<view class="wrap">
					<!-- #ifndef MP-TOUTIAO -->
						<u-waterfall v-model="list" ref="uWaterfall">
							<template v-slot:left="{ leftList }">
								<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
									<view class="" @click="onPageJump" :id="item.article_id">
										<view class="demo-top">
											<view class="imgBox">
												<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :lazy-load="true" :src="item.image" :index="index"
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
										<view class="count" @click="clickLeftLike(item,index) in leftList ">
											<view class="countImg">
												<image class="likeImg" mode="aspectFit" src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
												<image class="likeImg" mode="aspectFit" src="../../static/images/heart_actived.svg" v-if="item.liked == 1"></image>
											</view>
											<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
										</view>
									</view>
								</view>
							</template>
							<template v-slot:right="{ rightList }">
								<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
									<view class="" @click="onPageJump" :id="item.article_id">
										<view class="demo-top">
											<view class="imgBox">
												<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :lazy-load="true" :src="item.image" :index="index"
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
										<view class="count" @click="clickRightLike(item,index) in rightList">
											<view class="countImg">
												<image class="likeImg" mode="aspectFit" src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
												<image class="likeImg" mode="aspectFit" src="../../static/images/heart_actived.svg" v-if="item.liked == 1"></image>
											</view>
											<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
										</view>
									</view>
								</view>
							</template>
						</u-waterfall>
					<!-- #endif -->
					<!-- #ifdef MP-TOUTIAO -->
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
												<image class="likeImg" mode="aspectFit" src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
												<image class="likeImg" mode="aspectFit" src="../../static/images/heart_actived.svg" v-if="item.liked == 1"></image>
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
												<image class="likeImg" mode="aspectFit" src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
												<image class="likeImg" mode="aspectFit" src="../../static/images/heart_actived.svg" v-if="item.liked == 1"></image>
											</view>
											<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	export default {
		data() {
			return {
				defaultKeyword: '',
				keyword: '',
				list: [],
				site: null,
				area: null,
				route_list: null,
				isFocus: false
			};
		},

		components: {
			mSearch,
			uniNavBar
		},
		onLoad() {
			this.getResults();
			this.init();
		},
		// 方法
		methods: {
			getResults() {
				let keyList  = uni.getStorageSync('searchHistory')
				var keyword
				if(keyList&&keyList.length){
					keyList = JSON.parse(keyList)
					keyword = keyList[0]
				}
				 
				let res = uni.getStorageSync('article_id');
				if (res) {
					console.log('resres',res)
					let arr = res.data.article_list;
					let arr1 = res.data.route_list;
					let list1 = this.drawCorrelativeKeyword(arr, keyword);
					// #ifndef MP-TOUTIAO
					this.$refs.uWaterfall._props.value = list1
					// #endif
					// #ifdef MP-TOUTIAO
					this.list = res.data.article_list;
					// #endif
					this.area = res.data.area;
					this.site = res.data.site;
					let route_list1 = this.drawCorrelativeKeyword(arr1, keyword);
					this.route_list = route_list1;
				}
				// var that = this
				// uni.getStorage({
				// 	key:'article_id',
				// 	success:function(res){
				// 		console.log('取数据',res.data.data)
				// 		that.list = res.data.data
				// 	}
				// })
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length;
				var keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i].title;
					console.log(row, 1);
					//定义高亮#9f9f9f
					var html = row.replace(keyword, "<span style='color: #A86B13;font-weight:bold'>" + keyword + '</span>');
					html = '<div>' + html + '</div>';
					var tmpObj = {
						...keywords[i],
						htmlStr: html
					};
					keywordArr.push(tmpObj);
				}
			
				return keywordArr;
				
			},
			// 线路列表
			toLineMore() {
				var state_id = this.area.state_id;
				var city_id = this.area.city_id;
				uni.navigateTo({
					url: '/pages/lineList/lineList?state_id=' + state_id + '&city_id=' + city_id
				});
			},
			getSite(id) {
				if (id) {
					uni.navigateTo({
						url: '/pages/positionContent/positionContent?id=' + id
					});
				}
			},
			getRoute(id) {
				if (id) {
					uni.navigateTo({
						url: '/pages/lineDetail/lineDetail?id=' + id
					});
				}
			},
			getCity(area) {
				if (area) {
					let obj = {
						state_id: area.state_id,
						name: area.name,
						image: area.image,
						city_id: area.city_id
					};
					uni.navigateTo({
						url: '/pages/provinces/provinces?state_id=' + 
						obj.state_id+"&city_id="+obj.city_id+"&name="+obj.name+"&image="+obj.image
					});
				}
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
			clickRightLike(e, index) {
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
					success: res=> {
						console.log('点赞', res);
						if (res.data.code != 0) {
							// debugger
							uni.navigateTo({
								url: '/pages_mine/login/login'
							});
						}
			
						this.$refs.uWaterfall.rightList[index].liked = e.liked == 1 ? 0 : 1
						this.$refs.uWaterfall.rightList[index].like_count = (e.liked == 1 ? e.like_count - 1 : e.like_count  + 1)
					}
				});
			},
			clickLeftLike(e, index) {
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
					success: res=> {
						console.log('点赞', res);
						if (res.data.code != 0) {
							// debugger
							uni.navigateTo({
								url: '/pages_mine/login/login'
							});
						}
			
						this.$refs.uWaterfall.leftList[index].liked = e.liked == 1 ? 0 : 1
						this.$refs.uWaterfall.leftList[index].like_count = (e.liked == 1 ? e.like_count - 1 : e.like_count  + 1)
					}
				});
			},
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
					success: res=> {
						console.log('点赞', res);
						if (res.data.code != 0) {
							// debugger
							uni.navigateTo({
								url: '/pages_mine/login/login'
							});
						}
			
						this.list[index].liked = e.liked == 1 ? 0 : 1
						this.list[index].like_count = (e.liked == 1 ? e.like_count + 1 : e.like_count  - 1)
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
					url: '/pagesA/index/index'
				});
			},

			init() {
				this.loadDefaultKeyword();
				this.focus();
				// this.loadOldKeyword();
				// this.loadHotKeyword();
			},
			focus() {
				//#ifndef MP-BAIDU
				uni.hideKeyboard();
				//#endif
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				// this.defaultKeyword = "云南旅游";
				uni.getStorage({
					key: 'searchHistory',
					success: res => {
						var searchHistory = JSON.parse(res.data);
						console.log('关键字', searchHistory);
						var searchHistory = searchHistory[0];
						this.defaultKeyword = searchHistory;
					}
				});
			}

			// getLoadNum(num){
			//     console.log('共加载了:'+num);
			//     !this.isNewRenderDone&&uni.hideLoading()
			//     this.isNewRenderDone = true
			// }
		}
	};
</script>

<style lang="scss">
	.container {
		padding-top: 28rpx;

		.siteView {
			padding: 0 28rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 16rpx;
			margin-bottom: 28rpx;
			.siteViewImg {
				width: 220rpx;
				height: 148rpx;
				border-radius: 8px;
				margin-right: 20rpx;
			}
			.siteViewText{
				flex: 1;
			}
			.title {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #A86B13;
			}

			.content {
				width: 168rpx;
				height: 24rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #909399;
				line-height: 24rpx;
				margin-top: 10rpx;

			}
			.iconRight{
				width: 18rpx;
				height: 20rpx;
			}
		}
		.line{
			width: 100%;
			height: 20rpx;
			margin-bottom: 44rpx;
			background: #F8F8F8;
		}

		.areaView {
			margin: 0 28rpx 28rpx;
			display: flex;
			align-items: center;
			position: relative;
			.areaImg{
				width: 262rpx;
				height: 198rpx;
				border-radius: 8px;
				margin-right: 20rpx;
			}
			.top {
				.title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #A86B13;
				}

				.rateBox {
					display: flex;
					align-items: center;

					.rateStart {
						display: flex;
					}

					.rateStart image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 6rpx;
					}

					.rate {
						margin-left: 16rpx;
						font-size: 28rpx;
						font-family: HelveticaNeue;
						color: #606266;
						line-height: 20rpx;
					}
				}

				
			}

			.areacontent {
				width: 412rpx;
				height: 84rpx;
				margin-top: 12rpx;
				margin-bottom: 14rpx;
				font-size: 28rpx;
				line-height: 42rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #909399;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				// text-overflow: ellipsis;
				overflow: hidden;
				-webkit-line-clamp: 2;
			}


			
		}

		.swiper {
			width: 100%;
			height: 240rpx;
			overflow-x: auto;
			display: flex;
			justify-content: space-between;

			.swiperItem {
				flex: none;
				width: 46%;
				margin-right: calc( 8% / 2);
				// margin-right: 18rpx;
				image {
					width: 98%;
					// width: 338rpx;
					border-radius: 16rpx;
					height: 180rpx;
				}

				.title {
					// width: 338rpx;
					width: 96%;
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: flex;
					justify-content: left;
				}
			}
		}

		.contentTitle {
			flex: 1;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			margin-left: 28rpx;
			line-height: 36rpx;
		}
		.titleBox{
			display: flex;
			align-items: center;
		}
		.moreBox{
			width: 94rpx;
			height: 42rpx;
			background: #EDEFF2;
			border-radius: 11px;
			font-size: 22rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #606266;
			margin-right: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 14rpx;
				height: 14rpx;
				margin-left: 4rpx;
			}
		}
	}

	.search-box {
		width: 100%;
		padding: 8rpx 28rpx 0;
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
	}

	.search-box .mSearch-input-box {
		width: 100%;
	}

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
		margin-left: 42rpx;
		margin-right: 20rpx;
	}

	.fhsy {
		width: 40rpx;
		height: 40rpx;
	}
	/* #ifdef  MP-BAIDU*/
	.fhsy {
		margin-left: 100rpx;
	}
	/*  #endif  */
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

	// 瀑布流
	/* 正在旅行 */
	.left,
	.right {
		display: inline-block;
		margin-left: 20rpx;
		vertical-align: top;
		width: 46%;
	}

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
		padding: 0 14rpx 0 28rpx;
	}


	.demo-warter {
		width: 340rpx;
		margin-top: 0;
		margin-right: 14rpx;
		margin-bottom: 20rpx;
		padding-bottom: 16rpx;
		/* position: relative; */
		background-color: #ffffff;
		border-radius: 16rpx 16rpx;
		box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
	}

	.imgBox {
		position: relative;
		display: flex;
		align-items: flex-end;
	}

	.demo-top {
		position: relative;
	}

	.demoImage {
		min-height: 300rpx !important;
		max-height: 460rpx;
		width: 100%;
		box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
		border-radius: 16rpx 16rpx 0px 0px;
		position: relative;
	}
	.demoImage4 {
		width: 100%;
		min-height: 272rpx;
		max-height: 480rpx;
		box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
		border-radius: 16rpx 16rpx 0px 0px;
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
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
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
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(96, 98, 102, 1);
		margin-right: 20rpx;
	}

	.count image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 8rpx;
		display: flex;
		align-items: center;
	}
</style>
