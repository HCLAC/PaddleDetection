<template>
	<view>
		<!-- 骨架屏 -->
		<view v-if="loading" class="loadBox">
			<view class="content u-skeleton">
				<view class="loadBlock">
					<view class="banner u-skeleton-rect"></view>
					<view class="info-wrap">
						<view class="title mt20 u-skeleton-rect"></view>
						<view class="title mt20 u-skeleton-rect"></view>
						<view class="title-wrap mt20">
							<view class="title-sm  u-skeleton-rect"></view>
							<view class="title-sm  u-skeleton-rect"></view>
						</view>
						<view class="title-big mt20 u-skeleton-rect"></view>
						<view class="title-wrap title-wrap-sm  mt20">
							<view class="title-sm  u-skeleton-rect"></view>
							<view class="title-sm-big  u-skeleton-rect"></view>
						</view>
						<view class="title-wrap title-wrap-sm mt20">
							<view class="title-sm  u-skeleton-rect"></view>
							<view class="title-sm-big  u-skeleton-rect"></view>
						</view>
						<view class="row3 mt40">
							<view class="title u-skeleton-rect"></view>
							<view class="title u-skeleton-rect"></view>
							<view class="title u-skeleton-rect"></view>
						</view>
						<view class="banner mt30 u-skeleton-rect"></view>
						<view class="flex">
							<view class="title-1 mt30 u-skeleton-rect"></view>
						</view>
						<view class="title-wrap title-wrap-big mt30">
							<view class="title-sm  u-skeleton-rect"></view>
							<view class="title-sm-big  u-skeleton-rect"></view>
						</view>
						<view class="title-wrap title-wrap-big mt20">
							<view class="title-sm  u-skeleton-rect"></view>
							<view class="title-sm-big  u-skeleton-rect"></view>
						</view>
						<view class="title-wrap title-wrap-big mt20">
							<view class="title-sm  u-skeleton-rect"></view>
							<view class="title-sm-big  u-skeleton-rect"></view>
						</view>
						<view class="title-wrap title-wrap-big mt20">
							<view class="title-sm  u-skeleton-rect"></view>
							<view class="title-sm-big  u-skeleton-rect"></view>
						</view>
						<view class="flex">
							<view class="title-1-1 mt20 u-skeleton-rect"></view>
						</view>
					</view>
				</view>
			</view>
			<!--引用组件-->
			<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		</view>
		<!-- 内容 -->
		<view class="page-content" v-else>
			<view class="banner">
				<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" indicator-color="#303133" indicator-active-color="#fff">
					<swiper-item v-for="item in swiperImgs">
						<image class="swiper-item" :src="item" mode=""></image>
					</swiper-item>
				</swiper>
				<view class="title-wrap">
					<view class="title">{{InfoObj.title}}</view>
					<view class="tags">
						<view class="tag-item" v-if="InfoObj.selected">定制师推荐路线 </view>
						<view class="tag-item">{{InfoObj.route_type==0?'省心跟团游':'快乐自助游'}}</view>
						<view class="tag-item-green">{{themes[InfoObj.theme]}}</view>
					</view>
				</view>
				<view class="price-wrap">
					<text class="price"> <text>￥</text> {{InfoObj.min_money}}～{{InfoObj.max_money}} </text>
					<text class="text">参考价格</text>
				</view>
				<view class="info-wrap">
					<view class="info-item">
						<text class="title">目的地：</text>
						<template v-for="item in InfoObj.area">
							<navigator open-type="redirect" class="text underline" :url="`/pages_content/provinces/provinces?state_id=${item.state_id}&city_id=${item.city_id}&name=${item.city_name}&image=${item.image}`">{{item.city_name}}</navigator>
							<text class="dian">、</text>
						</template>
						
						
					</view>
					<view class="info-item mt30">
						<text class="title">行程日：</text>
						<text class="text">{{InfoObj.days}}日行程</text>
					</view>
				</view>
			</view>
			<luBarTabNav :tabList="tabList" :barFixed="barFixed" :iconShow="iconShow" :barHeight="barHeight"
				:barTop="barTop" :barId="barId" :dayList="dayList" ref="barTabNav">
				<!-- 内嵌咨询 -->
				<view class="answersFollow-inner-wrap">
					<view class="answersFollow-inner">
						<view class="answersLeft">
							<view class="border-img">
								<image src="@/static/images/border-jian.png" mode=""></image>
							</view>
							<view class="left_img">
								<image :src="consulting.avatar ? consulting.avatar : '/static/images/logo.png'" mode="">
								</image>
							</view>
							<view class="left_txt">
								在线中
							</view>
						</view>
						<view class="answersCenter">
							<view class="center-top">
								<view class="top-left">
									{{consulting.name}}
								</view>
								<view class="top-right">
									{{professionObj1[consulting.profession]}}
								</view>
							</view>
							<view class="center-btm">
								{{consulting.company}}
							</view>
							<view class="center-btm">
								<view>
									已服务:<text class="item">{{consulting.number_of_people}}</text>
								</view>
								<view>
									评分:<text class="item">5.0</text>
								</view>
							</view>
						</view>
						<view class="answersRight" @click="toChatroom">
							<view class="right-img">
								<image src="@/static/images/wz.png" mode=""></image>
							</view>
							<text>咨询Ta</text>
						</view>
					</view>
				</view>
				<view id="item1" class="tabbody">
					<view class="h-title-wrap">
						<view class="h-title">路线概览</view>
					</view>
					<template v-for="(item,index) in InfoObj.gv">
						<view v-if="index<3" :key="index" class="day-wrap">
							<view class="day-title"> {{item.date}} </view>
							<view class="day-text">{{item.line}}</view>
							<!-- showAll -->
						</view>
						<view v-if="index>=3 && !showAll" :key="index" class="day-wrap">
							<view class="day-title"> {{item.date}} </view>
							<view class="day-text">{{item.line}}</view>
							<!-- showAll -->
						</view>
					</template>
					<view class="look-all-wrap" v-if="InfoObj.gv.length>3">
						<view @click="lookAll">{{showAll?'查看全部':'收起'}}</view>
					</view>
					
				</view>
				<view id="item2" class="tabbody">
					<view class="h-title-wrap">
						<view class="h-title">开始{{InfoObj.days}}天定制旅行</view>
						<view class="h-title-sm">个性定制，自由出行</view>
					</view>
					<view class="item2-wrap" v-for="item in InfoObj.trip" :id="'day'+item.day">
						<view class="day-title">
							<view class="dian-wrap">
								<view class="dian"> </view>
							</view>
							<view class="day-title-day">Day{{item.day}}</view>
							<view class="day-title-text">{{item.subheading}}</view>
						</view>
						<view class="title-wrap">
							<image class="icon" src="../../static/images/line/traffic.svg" mode=""></image>
							<view class="title">交通：</view>
							<view>{{item.traffic}}</view>
						</view>
						<view class="title-wrap">
							<image class="icon" src="../../static/images/line/repast.svg" mode=""></image>
							<view class="flex mr10">
								<view class="title">早餐：</view>
								<view>{{item.breakfast}}</view>
							</view>
							<view class="flex mr10">
								<view class="title">午餐：</view>
								<view>{{item.lunch}}</view>
							</view>
							<view class="flex">
								<view class="title">晚餐：</view>
								<view>{{item.dinner}}</view>
							</view>
						</view>
						<view class="title-wrap">
							<image class="icon" src="../../static/images/line/home.svg" mode=""></image>
							<view class="title">住宿：</view>
							<view>{{item.hotel_intr}}</view>
						</view>
						<view class="title-wrap">
							<image class="icon" src="../../static/images/line/journey.svg" mode=""></image>
							<view class="title">行程：</view>
						</view>
						<view class="content" v-html="item.content"></view>
						<!-- 景点 -->
						<view class="scenic-wrap">
							<view class="scenic-item" v-for="sitesItem in item.sites" @click="goSites(sitesItem)">
								<view class="scenic-item-left">
									<u-image width="216rpx" height="164rpx" border-radius="16rpx" :src="sitesItem.cover_url" :iconSize="66"></u-image>
									<view class="imgTag">景点</view>
								</view>
								<view class="scenic-item-right">
									<view class="scenic-item-right-title">{{sitesItem.Name}}</view>
									<view class="rateBox">
										<uni-rate :readonly="true" :value="sitesItem.rate" :size='14' margin="4" :allowHalf="true"/>
										<view class="rate" >{{sitesItem.rate}} 星</view>
									</view>
									<view class="scenic-item-right-text">{{sitesItem.description}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view id="item3" class="tabbody">
					<view class="item3-wrap">
						<view class="item3-title">服务说明</view>
						<view>{{InfoObj.service_note}}</view>
					</view>
				</view>
			</luBarTabNav>
		</view>
		<!-- 咨询卡 -->
		<view class="zhanwei"></view>
		<view v-if="showOutZX" class="answersFollow">
			<view class="answersLeft">
				<view class="border-img">
					<image src="@/static/images/border-jian.png" mode=""></image>
				</view>
				<view class="left_img">
					<image :src="consulting.avatar ? consulting.avatar : '/static/images/logo.png'" mode=""></image>
				</view>
				<view class="left_txt">
					在线中
				</view>
			</view>
			<view class="answersCenter">
				<view class="center-top">
					<view class="top-left">
						{{consulting.name}}
					</view>
					<view class="top-right">
						{{professionObj1[consulting.profession]}}
					</view>
				</view>
				<view class="center-btm">
					{{consulting.company}}
				</view>
			</view>
			<view class="answersRight" @click="toChatroom">
				<view class="right-img">
					<image src="@/static/images/wz.png" mode=""></image>
				</view>
				<text>咨询Ta</text>
			</view>
		</view>
		<!-- 输入框 -->
	</view>
</template>

<script>
	import meTabs from '@/common/me-tabs/me-tabs.vue';
	import luBarTabNav from "@/components/lu-bar-tab-nav/lu-bar-tab-nav.vue";
	export default {
		components: {
			meTabs,
			luBarTabNav
		},
		data() {
			return {
				// 骨架屏
				loading: true,
				// 外层锚点开始
				barFixed: false,
				barTop: 0,
				iconShow: false,
				tabList: [{
					text: "路线概览",
					navTarget: "#item1"
				}, {
					text: "参考行程",
					navTarget: "#item2"
				}, {
					text: "服务说明",
					navTarget: "#item3"
				}],
				// 外层锚点结束
				swiperImgs:[], // banner
				InfoObj:{}, // 详情
				showAll: true, // 
				showOutZX: false,
				dayList:[],
				consulting: {},
				professionObj1: {
					'0': '导游',
					'1': '旅游达人',
					'2': '旅游定制师'
				},
				themes:{
					'1': '亲子',
					'2': '自驾',
					'3': '海景',
					'4': '美食',
					'5': '山林',
					'6': '草原',
					'7': '古境',
				}
			};
		},
		// #ifdef MP-BAIDU
		onInit(query) {
			// #endif
			// #ifndef MP-BAIDU
			onLoad(query) {
					// #endif
					console.log(query, '=====query')
					this.backgroundColor = query.background
					this.line_id = query.id
					
				},
				mounted() {
					this.getInfo()
					this.getDetail()
				},
				onShow() {},
				onPageScroll(e) {
					console.log(e.scrollTop)
					if(e.scrollTop > 700){
						this.showOutZX = true
					}else{
						this.showOutZX = false
					}
					this.$refs.barTabNav._selectedTab(e.scrollTop);
				},
				methods: {
					// 查看全部
					lookAll(){
						this.showAll = !this.showAll
					},
					// 咨询
					//管家信息
					getInfo() {
						this.HTTP.request({
							url: '/bulter/market',
							data: {
								type: 2,
								uuid: this.line_id,
							},
							success: res => {
								if (res.statusCode != 200 || res.data.code != 0) {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									});
									return
								}
								this.consulting = res.data.data
								console.log(this.consulting, '管家列表')
							}
						});
					},
					toChatroom() {
						if (!this.Utils.isLogin()) {
								return
							}
						this.HTTP.request({
							url: '/bulter/consulting',
							method: 'POST',
							data: {
								bulter_id: this.consulting.bulter_id
							},
							success: res => {
								if (res.statusCode != 200 || res.data.code != 0) {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									});
									return
								}
								var info = res.data.data
								if (info.history.length > 0) {
									uni.navigateTo({
										url: '/pages_im/chatroom/chatroom?search_id=' + info.search_id,
									})
								} else {
									uni.navigateTo({
										url: '/pages_im/problem/problem?bulter_id=' + info.bulter_id,
									})
								}
							}
						});
					},
					//获取行程信息
					getDetail() {
						const _this = this
						this.HTTP.request({
							url: '/route',
							method: 'GET',
							data: {
								uuid: this.line_id
							},
							success: res => {
								if (res.statusCode != 200 || res.data.code != 0){
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									});
									return
								}
								console.log('res====',res.data.data)
								const resData = res.data.data
								for (var i = 0 ; i < resData.days; i ++) {
									this.dayList.push('day'+(i+1))
								}
								console.log('dayList====',this.dayList)
								this.loading = false
								setTimeout(()=>{
									_this.barFixed = true
								},1000)
								this.swiperImgs = resData.images
								this.InfoObj = resData
								//#ifdef MP-BAIDU
								swan.setPageInfo({
									title: this.InfoObj.title+"-领途羊",
									keywords: this.InfoObj.keywords,
									description: this.InfoObj.description,
									image: this.InfoObj.images.length <=3 ? this.InfoObj.images : this.InfoObj.images.slice(0,3),
								})
								//#endif
							}
						});
					},
					// 去景点详情
					goSites(sitesItem){
						console.log('sitesItem====',sitesItem)
						if (sitesItem.id) {
							uni.navigateTo({
								url: '/pages_province/positionContent/positionContent?id=' + sitesItem.id
							});
						}
					}
				}
		};
</script>

<style lang="scss">
	.mr10{
		margin-right: 10rpx;
	}
	.flex{
		display: flex;
	}
	// 骨架屏样式
	.loadBox {
		width: 100%;
		height: auto;

		.loadBlock {
			.banner {
				width: 100%;
				height: 440rpx;
			}

			.info-wrap {
				padding: 20rpx 28rpx;

				.flex {
					
					justify-content: center;
				}

				.mt20 {
					margin-top: 20rpx;
				}

				.mt30 {
					margin-top: 30rpx;
				}

				.mt40 {
					margin-top: 40rpx;
				}

				.title {
					width: 694rpx;
					height: 28rpx;
				}

				.title-wrap {
					display: flex;

					.title-sm {
						width: 100rpx;
						height: 28rpx;
						margin-right: 20rpx;
					}

					&.title-wrap-sm {
						.title-sm {
							width: 100rpx;
							height: 20rpx;
							margin-right: 20rpx;
						}

						.title-sm-big {
							width: 188rpx;
							height: 20rpx;
						}
					}

					&.title-wrap-big {
						.title-sm {
							width: 100rpx;
							height: 20rpx;
							margin-right: 20rpx;
						}

						.title-sm-big {
							width: 574rpx;
							height: 20rpx;
						}
					}
				}

				.title-big {
					width: 348rpx;
					height: 28rpx;
				}

				.row3 {
					display: flex;
					justify-content: space-between;

					.title {
						width: 128rpx;
						height: 20rpx;
					}
				}

				.banner {
					height: 250rpx;
				}

				.title-1 {
					width: 200rpx;
					height: 28rpx;
				}

				.title-1-1 {
					width: 160rpx;
					height: 20rpx;
				}
			}
		}
	}

	// 内容
	.page-content {
		position: relative;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		background-color: #F8F8F8;
		font-size: 14px;
	}

	.banner {
		position: relative;
		width: 100%;
		margin-bottom: 20rpx;

		.swiper {
			height: 440rpx;
			.swiper-item{
				width: 100%;
			}
		}

		.title-wrap {
			padding: 20rpx 28rpx 30rpx;
			background: rgba(255, 229, 18, 0.5);

			.title {
				font-size: 36rpx;
				font-weight: 600;
				color: #303133;
				line-height: 50rpx;
			}

			.tags {
				margin-top: 14rpx;
				display: flex;

				.tag-item {
					padding: 8rpx 10rpx;
					background: #FFFFFF;
					border-radius: 4rpx;
					font-size: 20rpx;
					font-weight: 400;
					color: #303133;
					margin-right: 10rpx;
				}

				.tag-item-green {
					padding: 8rpx 10rpx;
					background: #71C817;
					border-radius: 4rpx;
					font-size: 20rpx;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
		}

		.price-wrap {
			padding: 30rpx;
			display: flex;
			align-items: center;
			border-bottom: 4rpx solid #EDEFF2;
			background-color: #fff;

			.price {
				font-size: 40rpx;
				font-weight: bold;
				color: #E41D54;

				text {
					font-size: 30rpx;
				}
			}

			.text {
				font-size: 28rpx;
				font-weight: 400;
				color: #606266;
				margin-left: 10rpx;
			}
		}

		.info-wrap {
			padding: 28rpx;
			background-color: #fff;

			.info-item {
				display: flex;
				align-items: center;
				font-size: 32rpx;
				font-weight: 400;

				&.mt30 {
					margin-top: 30rpx;
				}

				.title {
					color: #606266;
				}

				.dian {
					color: #303133;

					&:last-child {
						display: none;
					}
				}

				.text {
					color: #303133;

					&.underline {
						text-decoration: underline;
					}
				}
			}
		}
	}

	.tabbody {
		position: relative;
		width: 100%;
		background-color: #fff;
		padding: 0 28rpx;
		&#item1{
			padding-bottom: 40rpx;
			border-bottom: 2rpx solid #EDEFF2 ;
		}
		&#item2{
			.h-title-wrap{
				padding-top: 40rpx;
				padding-bottom: 0rpx;
			}
			.item2-wrap{
				padding-left: 15rpx;
				margin-top: 40rpx;
				border-left: 2rpx solid #EDEFF2;
				.day-title{
					position: relative;
					display: flex;
					.dian-wrap{
						padding: 14rpx 8rpx;
						background-color: #fff;
						position: absolute;
						left: -30rpx;
						.dian{
							width: 10rpx;
							height: 10rpx;
							background: #BFC2CC;
							border-radius: 50%;
						}
					}
					.day-title-day{
						width: 96rpx;
						height: 40rpx;
						background: #FFE512;
						font-size: 24rpx;
						font-weight: 600;
						color: #303133;
						text-align: center;
						line-height: 40rpx;
					}
					.day-title-text{
						margin-left: 20rpx;
						font-size: 30rpx;
						font-weight: bold;
						color: #303133;
					}
				}
				.title-wrap{
					padding-left: 15rpx;
					margin-top: 30rpx;
					display: flex;
					flex-wrap: wrap;
					font-size: 30rpx;
					font-weight: 300;
					color: #606266;
					position: relative;
					.icon{
						width: 48rpx;
						height: 48rpx;
						position: absolute;
						left: -40rpx;
					}
					.title{
						font-weight: bold;
						color: #303133;
					}
				}
				.content{
					padding-left: 15rpx;
					margin-top: 20rpx;
				}
				// 景点列表
				.scenic-wrap{
					padding-left: 15rpx;
					.scenic-item{
						margin-top: 30rpx;
						padding: 20rpx;
						width: 642rpx;
						height: 204rpx;
						box-sizing: border-box;
						background: #FFFFFF;
						box-shadow: 0px 0px 36rpx 0px rgba(0, 0, 0, 0.1);
						border-radius: 8rpx;
						display: flex;
						.scenic-item-left{
							width: 216rpx;
							height: 164rpx;
							border-radius: 16rpx;
							position: relative;
							.imgTag {
								width: 88rpx;
								height: 44rpx;
								background: #9fd873;
								border-radius: 16rpx 0px 16rpx 0px;
								position: absolute;
								left: 0;
								top: 0;
								color: #ffffff;
								font-size: 24rpx;
								text-align: center;
								line-height: 44rpx;
								font-weight: bold;
							}
						}
						.scenic-item-right{
							flex: 1;
							margin-left: 20rpx;
							.scenic-item-right-title{
								font-size: 30rpx;
								font-weight: bold;
								color: #303133;
							}
							.rateBox{
								display: flex;
								align-items: center;
								margin: 12rpx 0;
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
							.scenic-item-right-text{
								font-size: 26rpx;
								font-weight: 400;
								color: #909399;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
							}
						}
					}
				}
			}
		}
		&#item3{
			padding: 40rpx 28rpx 20rpx;
			.item3-wrap{
				width: 100%;
				background: #F8F8F8;
				border-radius: 8rpx;
				padding: 28rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				font-weight: 300;
				color: #606266;
				.item3-title{
					font-size: 30rpx;
					font-weight: 400;
					color: #303133;
					text-align: center;
					margin-bottom: 20rpx;
				}
			}
		}
		.h-title-wrap{
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			padding-bottom: 40rpx;
			.h-title{
				font-size: 32rpx;
				font-weight: bold;
				color: #303133;
				position: relative;
				z-index: 1;
				&::after{
					content: "";
					width: 100%;
					height: 20rpx;
					background: rgba(255, 229, 18, 0.5);
					position: absolute;
					left: 0;
					bottom: 0;
					z-index: -1;
				}
			}
			.h-title-sm{
				font-size: 24rpx;
				font-weight: 300;
				color: #606266;
				margin-top: 16rpx;
			}
		}
		.day-wrap{
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			.day-title{
				width: 70rpx;
				height: 36rpx;
				background: #FFE512;
				border-radius: 4rpx;
				font-size: 22rpx;
				font-weight: bold;
				color: #303133;
				text-align: center;
				line-height: 36rpx;
			}
			.day-text{
				font-size: 30rpx;
				font-weight: 400;
				color: #303133;
				margin-left: 20rpx;
			}
		}
		.look-all-wrap{
			display: flex;
			justify-content: center;
			font-size: 22rpx;
			font-weight: bold;
			color: #0091FF;
			margin-top: 30rpx;
		}
	}

	// 内置咨询卡
	.answersFollow-inner-wrap{
		padding: 40rpx 28rpx;
		background: #FFFFFF; 
		.answersFollow-inner {
			box-sizing: border-box;
			width: 694rpx;
			height: 164rpx;
			background: #FFFFFF; 
			box-shadow: 0px 0px 24rpx 0px rgba(0, 0, 0, 0.1);
			border-radius: 16rpx;
			display: flex;
			.answersLeft {
				position: relative;
				left: 28rpx;
				margin-top: 18rpx;
				.border-img {
					width: 108rpx;
					height: 108rpx;
					position: absolute;
		
					image {
						width: 100%;
						height: 100%;
					}
				}
				.left_img {
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
					overflow: hidden;
					position: absolute;
					left: 10rpx;
					top: 10rpx;
		
					image {
						width: 100%;
						height: 100%;
					}
				}
		
				.left_txt {
					width: 70rpx;
					height: 34rpx;
					background: #FFE512;
					border-radius: 8rpx;
					font-size: 18rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #303133;
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					top: 88rpx;
					left: 20rpx;
				}
			}
		
			.answersCenter {
				flex: 1;
				margin-left: 152rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
		
				.center-top {
					display: flex;
					align-items: flex-end;
					
					.top-left {
						font-size: 32rpx;
						font-weight: 600;
						color: #303133;
					}
		
					.top-right {
						margin-left: 20rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #606266;
						display: flex;
					}
				}
				.center-btm{
					display: flex;
					font-size: 24rpx;
					font-weight: 400;
					color: #606266;
					margin-top: 10rpx;
					.item{
						color: #A86B13;
						margin-right: 20rpx;
					}
				}
			}
			
				.answersRight {
					width: 164rpx;
					height: 164rpx;
					background: #F8F8F8;
					border-radius: 0px 16rpx 16rpx 0px;
					display: flex;
					flex-direction: column;
					align-items: center;
						justify-content: center;
					.right-img {
						width: 56rpx;
						height: 56rpx;
						
						image {
							width: 100%;
							height: 100%;
						}
					}
						
					text {
						font-size: 28rpx;
						font-weight: 600;
						color: #303133;
					}
				}
			
			
		}
		
	}
	.zhanwei{
		height: 150rpx;
	}
	// 咨询卡
	.answersFollow {
		position: fixed;
		margin: auto;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 150rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
		background: #FFFFFF;
		box-shadow: 0px -16rpx 56rpx 0px rgba(0, 0, 0, 0.05);
		display: flex;
		// align-items: center;
		// justify-content: space-between;
		z-index: 10;

		.answersLeft {
			position: relative;
			// margin-left: 26rpx;
			left: 26rpx;
			margin-top: 18rpx;

			.border-img {
				width: 108rpx;
				height: 108rpx;
				position: absolute;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.left_img {
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
				overflow: hidden;
				position: absolute;
				left: 10rpx;
				top: 10rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.left_txt {
				width: 70rpx;
				height: 34rpx;
				background: #FFE512;
				border-radius: 8rpx;
				font-size: 18rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #303133;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 88rpx;
				left: 20rpx;
			}
		}

		.answersCenter {
			margin-left: 152rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.center-top {
				display: flex;
				align-items: center;

				.top-left {
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #303133;
				}

				.top-right {
					margin-left: 20rpx;
					padding: 4rpx 8rpx;
					height: 34rpx;
					background: #EDEFF2;
					border-radius: 8rpx;
					font-size: 18rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

		.answersRight {
			position: absolute;
			right: 28rpx;
			top: 34rpx;
			width: 196rpx;
			height: 76rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			border: 2rpx solid #303133;
			display: flex;
			align-items: center;

			.right-img {
				width: 56rpx;
				height: 56rpx;
				margin-left: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			text {
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #303133;
			}
		}
	}
</style>
