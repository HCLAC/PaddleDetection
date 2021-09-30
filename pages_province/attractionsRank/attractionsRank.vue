<template>
	<view>
		<!-- 自定义导航栏 白色-->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" :title="false" :backgroundColor="backgroundColor">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" :src="isFixed?'/static/images/icon-fanhui.svg':'/static/images/icon-fanhui-white.svg'" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" :src="isFixed?'/static/images/icon-fhsy.svg':'/static/images/icon-fhsy-white.svg'" @click="Utils.home"></image>
				</view>
			</uni-nav-bar>
		</view>
		<mescroll-body class="mescroll" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- 骨架屏 -->
			<view v-if="loading" class="loadBox">
				<view class="container u-skeleton">
					<view class="loadBlock">
						<view class="banner u-skeleton-rect"></view>
						<view class="city u-skeleton-circle"></view>
					</view>
					<view class="box-btm" v-for="(item, index) in loadEmpty">
						<view class="left-img u-skeleton-rect"></view>
						<view class="right">
							<view class="text u-skeleton-rect"></view>
							<view class="text u-skeleton-rect"></view>
							<view class="text u-skeleton-rect"></view>
							<view class="right-btm">
								<view class="btm-left">
									<view class="yuan u-skeleton-circle"></view>
									<view class="yuan u-skeleton-circle"></view>
									<view class="yuan u-skeleton-circle"></view>
									<view class="yuan u-skeleton-circle"></view>
									<view class="yuan u-skeleton-circle"></view>
								</view>
								<view class="btm-right u-skeleton-circle"></view>
							</view>
						</view>
					</view>
				</view>
				<!--引用组件-->
				<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
			</view>
			 
			<view v-else>
				 <view class="bgBox">
					<image lazy-load :src="querys.imageProcess" class="bannerImg"></image>
					<view class="mask">
						<view class="content">
							<image class="travel" src="/static/images/TRAVEL.png"></image>
							<view class="atthotbox">
								<image src="/static/images/leftleaves.svg"></image>
								<text class="atthottext">{{querys.name}}热门景点</text>
								<image src="/static/images/rightleaves.svg"></image>
							</view>
						</view>
						<view class="rankTime">
							领途羊景点榜单 · {{month}}月{{day}}日更新
						</view>
						<view class="boxshow">
						</view>
					</view>
				</view>
				<!-- 排行 -->
				<view class="rankContent" v-if='hotsiteslist' :style="{'height': (hotsiteslist.length < 6 ? '1604rpx' : '')}">
					<view class="cityBox">
						<view class="city" @click="showCityPicker = true">
							<view class="">
								<text class="cityname">{{querys.name}}</text>
								<image src="/static/images/more-down.svg"></image>
							</view>
						</view>
					</view>
					<view class="cardList">
						<view class="cards" v-for="(item,index) in hotsiteslist" :key="index" @click="toSiteDetail(item.id)">
							<view class="cardsleft">
								<u-image  width="262rpx" height="198rpx" border-radius="16rpx" :src="item.images[0]" mode="aspectFill" :iconSize="66"></u-image>
								<image class="rankImg " :src="`/static/images/rank/top-${index+1}.svg`" v-if="index < 6"></image>
							</view>
							<view class="cardsright">
								<view class="title">
									{{item.name}}
								</view>
								<view class="contentText">
									{{item.description}}
								</view>
								<view class="rateBox">
									<!-- 评分图标 -->
									<uni-rate :readonly="true" :value="item.rate" :size='14' margin="4" :allowHalf="true"/>
									<view class="rate">{{item.rate}} 星</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="shareBox" v-if="serviceProvider =='baidu' " @click="share">
					<image src="/static/images/icon-share.svg"></image>
				</view>
			</view>
		</mescroll-body>
		
		<!-- 城市选择弹窗 -->
		<cityPicker :show="showCityPicker" :name="querys.name" :cityList="cityList" @onclose="cityPickerClose" @switchToOther="switchToOther"></cityPicker>
	</view>

</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	import cityPicker from '@/common/city-picker/city-picker.vue';
	export default {
		components: {
			cityPicker
		},
		mixins: [MescrollMixin],
		data() {
			return {
				backgroundColor: 'transparent',
				showCityPicker: false,
				month: new Date().getMonth() + 1,
				day: new Date().getDate(),
				querys: null,
				hotsiteslist: null,
				cityList: null,
				serviceProvider: '',
				downOption: {
					use: false,
					auto: false
				},
				upOption:{
					bgColor:'#ffffff',
					noMoreSize: 10, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				},
				isFixed: false,
				cardheight: 200,
				// 骨架屏
				loadEmpty:[1,2,3,4,5],
				loading: true,
			}
		},
		// #ifdef MP-BAIDU
		onInit(query) {
		// #endif
		// #ifndef MP-BAIDU
		onLoad(query) {
		// #endif
			if (!query.name){
				this.querys = {
					imageProcess: this.Utils.addImageProcess('https://cache.lingtuyang.cn/areas/8bca332388ab1dca8c905d65f35ede84.png', false, 60),
					name: '全国',
					state_id: 0,
					city_id: 0,
				}
			} else {
				query.imageProcess = this.Utils.addImageProcess(query.image, false, 60)
				this.querys = query;
			}
			
			this.serviceProvider = getApp().globalData.serviceProvider
			this.getCity()
		}, 
		mounted() {
			this.calcCardHeight()
		},
		onPageScroll(e) {
			if (e.scrollTop >  this.cardheight) {
				if (e.scrollTop > this.cardheight+20 && this.isFixed){
					return
				}
				this.isFixed = true;
				this.backgroundColor = '#ffffff';
				uni.setNavigationBarColor({
				    frontColor: '#000000',
					backgroundColor: '#FFFFFF',
					fail: err => {
						console.log('setNavigationBarColor fail', err);
					}
				})
			} else {
				this.isFixed = false;
				this.backgroundColor = 'transparent';
				uni.setNavigationBarColor({
				    frontColor: '#ffffff',
					backgroundColor: '#000000',
					fail: err => {
						console.log('setNavigationBarColor fail', err);
					}
				})
			}
		},
		methods: {
			calcCardHeight(){
				if (this.isFixed || this.loading){
					return
				}
				const query = uni.createSelectorQuery().in(this);
				setTimeout(() => {
					query.select('.cityBox').boundingClientRect(data => {
						this.cardheight = data.top-data.height
					}).exec();
				}, 500);
			},
			cityPickerClose(){
				this.showCityPicker = false
			},
			// 获取全国城市
			getCity() {
				this.HTTP.request({
					url: '/area/guide',
					success: (res) => {				
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var cityList = res.data.data.areas;
						this.cityList = cityList.slice(1);
					}
				})
			},
			
			// 跳转景点详情页
			toSiteDetail(id) {
				uni.navigateTo({
					url: '/pages_province/positionContent/positionContent?id=' + id
				});
			},
			switchToOther(item1, name) {
				if (item1.name != '全省'){
					name = item1.name
				}
				uni.redirectTo({
					url: '/pages_province/attractionsRank/attractionsRank?state_id=' +
									item1.state_id+"&city_id="+item1.city_id+
									"&name="+name+"&image="+item1.image
				});
			},
			
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				// 第1种: 请求具体接口
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				// this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				this.mescroll.endSuccess()
				// this.mescroll.endDownScroll()
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let state_id = 0
				if (this.querys.state_id){
					state_id = this.querys.state_id
				}
				let city_id = 0
				if (this.querys.city_id){
					city_id = this.querys.city_id
				}
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页6条
				var that = this;
				this.HTTP.request({
					url: '/site/hotsiteslist?page=' + pageNum + '&count=' + pageSize,
					data: {
						state_id: state_id,
						city_id: city_id,
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						// 接口返回的当前页数据列表 (数组)
						if (!res.data.data || !res.data.data.list || res.data.data.list.length == 0){
							that.list = [];
							that.mescroll.endBySize(0, 0);
							return
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.data.list;
						curPageData.forEach((item1, index1) => {
							item1.images[0] = this.Utils.addImageProcess(item1.images[0], false, 40)
						})
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = res.data.data.total / pageSize;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total;
						// 接口返回的是否有下一页 (true/false)
						// let hasNext = res.data.data.list;
				
						//设置列表数据
						if (page.num == 1){
							this.hotsiteslist = []; //如果是第一页需手动置空列表
							setTimeout(() => {
								this.loading = false
							}, 300);
						} 
						this.hotsiteslist = this.hotsiteslist.concat(curPageData); //追加新数据
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

				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			// 分享
			share() {
				uni.showShareMenu({

				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	page {
		background-color: #000000 !important;
	}
	.nav-bar {
		background-color: transparent;
		z-index: 999;
		position: fixed;
		top:0px;
	}
	// 骨架屏样式
	.loadBox{
		width: 100%;
		height: auto;
		.loadBlock{
			.banner{
				width: 100%;
				height: 420rpx;
			}
			.city{
				width: 160rpx;
				height: 60rpx;
			}
		}
		.box-btm{
			padding: 0 28rpx;
			display: flex;
			margin-bottom: 40rpx;
			.left-img{
				width: 262rpx;
				height: 198rpx;
			}
			.right{
				margin-left: 20rpx;
				padding-top: 20rpx;
				.text{
					width: 412rpx;
					height: 20rpx;
					margin-bottom: 20rpx;
				}
				.right-btm{
					display: flex;
					align-items: center;
					.btm-left{
						display: flex;
						.yuan{
							width: 36rpx;
							height: 36rpx;
							margin-right: 12rpx;
						}
					}
					.btm-right{
						width: 80rpx;
						height: 28rpx;
					}
				}
			}
		}
	}
	.bgBox {
		width: 750rpx;
		height: 440rpx;
		// background: red;
		background-color: #000000;
	}

	.mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 440rpx;
		background: rgba(0, 0, 0, 0.35);
	}

	.bannerImg {
		width: 100%;
		height: 100%;
	}

	.content {
		position: absolute;
		top: 60%;
		left: 50%;
		transform: translate(-50%, -50%);
		min-width: 564rpx;
		max-width: 620rpx;
		height: 140rpx;
		display: flex;
		align-items: center;

		font-size: 56rpx;
		font-family: AlibabaPuHuiTiM;
		color: rgba(255, 255, 255, 1);
		line-height: 56rpx;
		letter-spacing: 2rpx;

		// background: url(./static/images/TRAVEL.png) no-repeat center 4rpx;
		.travel {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.atthotbox {
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 640rpx;

			.atthottext {
				// min-width: 402rpx;
				max-width: 600rpx;
				height: 64rpx;
				font-size: 64rpx;
				font-family: AlibabaPuHuiTiM;
				color: #FFFFFF;
				line-height: 64rpx;
				letter-spacing: 2rpx;
				font-weight: 600;
				margin: 0 6rpx;
			}

			image {
				width: 37.34rpx;
				height: 68.22rpx;
			}
		}

	}

	.rankTime {
		font-size: 20rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.45);
		line-height: 28rpx;
		position: absolute;
		top: 296rpx;
		left: 234rpx;
	}

	.boxshow {
		width: 750rpx;
		height: 92rpx;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
		opacity: 0.8;
		position: absolute;
		bottom: 0;
		left: 0;

	}

	.mescroll {
		position: relative;
		top: 0rpx;
		left: 0;
	}

	.rankContent {
		width: 100%;
		// height: 1604rpx;
		// margin-left: 10rpx;
		// padding-top: 480rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 8px 8px 0px 0px;
		border: 1px solid #FFFFFF;
		// z-index: 999999;
		position: relative;
		top: -20rpx;
		// left: 0;
		background: white;
	}

	.cityBox {
		// width: 730rpx;
		// height: 104rpx;
		// position: fixed;
		// top: 420rpx;
		// z-index: 111;
		padding-top: 10rpx;
		border-radius: 16rpx 16rpx 0 0;
		border: 1px solid #FFFFFF;
		overflow: hidden;
	}

	.city {
		display: inline-block;
		min-width: 124rpx;
		max-width: 324rpx;
		height: 60rpx;
		background: #FFE512;
		border-radius: 30rpx;

		// align-items: center;
		// justify-content: center;
		margin: 28rpx;
		padding: 14rpx 16rpx 14rpx 20rpx;

		// position: fixed;
		// top: 480rpx;
		.cityname {
			height: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 32rpx;
			margin-right: 8rpx;
		}

		image {
			width: 16rpx;
			height: 18rpx;
		}
	}

	.cardList {
		width: 700rpx;
		height: 100%;
		margin-left: 22rpx;
		margin-top: 10rpx;
		// margin-top: 90rpx;
	}

	.cards {
		display: flex;
		align-items: center;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #EDEFF2;
		margin-bottom: 20rpx;
	}

	.cardsleft {
		width: 262rpx;
		height: 198rpx;
		border-radius: 16rpx;
		position: relative;
		.rankImg {
			width: 88rpx;
			height: 44rpx;
			position: absolute;
			top: 0;
			left: -1rpx;
		}
	}

	.cardsright {
		width: 100%;
		margin-left: 20rpx;
		// margin-right: 28rpx;
	}

	.title {
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 42rpx;
		margin-bottom: 6rpx;
		display: -webkit-box; 
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1; 
		overflow: hidden; 
	}

	.contentText {
		// width: 392rpx;
		font-size: 28rpx;
		line-height: 42rpx;
		// text-align: justify;
		// width: 196px;
		// height: 70rpx;
		// font-size: 14px;
		// line-height: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		margin-bottom: 14rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.rateBox {
		display: flex;
		align-items: center;
	}
	.rate {
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #606266;
		line-height: 24rpx;
		font-weight: 500;
	}

	.shareBox {
		position: fixed;
		right: 24rpx;
		bottom: 204rpx;
		z-index: 1112;
		width: 92rpx;
		height: 92rpx;
		background: #FFE512;
		box-shadow: 0px 0px 12rpx 4rpx rgba(255, 229, 18, 0.35);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		image {
			width: 38rpx;
			height: 38rpx;
		}
	}
</style>
