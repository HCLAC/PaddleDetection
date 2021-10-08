<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar"  >
			<uni-nav-bar :fixed="true" :status-bar="true" :border="true" title="热门话题">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<mescroll-body class="mescroll" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- 骨架屏 -->
			<view v-if="loading" class="loadBox">
				<view class="container u-skeleton">
					<view class="loadBlock">
						<view class="kong u-skeleton-rect"></view>
						<view class="ht-box">
							<view class="kong u-skeleton-rect"></view>
							<view class="kong u-skeleton-rect"></view>
							<view class="kong u-skeleton-rect"></view>
							<view class="kong u-skeleton-rect"></view>
							<view class="kong u-skeleton-rect"></view>
							<view class="kong u-skeleton-rect"></view>
						</view>
						<view class="kong-big u-skeleton-rect"></view>
						<view class="sj-box" v-for="(item, index) in loadEmpty">
							<view class="top-box">
								<view class="kong-yuan u-skeleton-circle"></view>
								<view class="kong-fang u-skeleton-rect"></view>
								<view class="kong-min u-skeleton-circle"></view>
							</view>
							<view class="btm-box">
								<view class="btm-left">
									<view class="left-big u-skeleton-fillet"></view>
									<view class="left u-skeleton-rect"></view>
									<view class="left u-skeleton-rect"></view>
								</view>
								<view class="btm-center">
									<view class="center-big u-skeleton-fillet"></view>
									<view class="center u-skeleton-rect"></view>
									<view class="center u-skeleton-rect"></view>
								</view>
								<view class="btm-right">
									<view class="right-big u-skeleton-fillet"></view>
									<view class="right u-skeleton-rect"></view>
									<view class="right u-skeleton-rect"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!--引用组件-->
				<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
			</view>
			<view>
				<!-- 热门话题 -->
				<view class="hotTopic">
					<view class="hotTopicTop">
						<view class="topTitle">
							热门话题
						</view>
						<view class="topLine"></view>
					</view>
					<view class="topicRankBox">
						<view class="topicTips" @click="toTopicList(item.topic_id)" v-for="(item,index) in hotTopic " :key="index" >
							<image class="rankImg" lazy-load :src="`/static/images/topic-${index+1}.png`"></image>
							<view class="tipsText" >
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<!-- 推荐 -->
				<view class="recommended">
					<view class="recommendedTop">
						<view class="recommendedTitle">
							推荐
						</view>
						<view class="recommendedTopLine"></view>
					</view>
					<view class="topicList" v-for="(item,index) in recommList" :key="index"  >
						<view class="topicTitle">
							<view class="titleLeft">
								<image class="titleImg" src="/static/images/topicIcon.svg"></image>
								<view class="titleText">
									{{item.name}}
								</view>
							</view>
							<view class="titleRight" @click="toTopicList(item.topics_id)">
								<view class="number">
									{{item.total>10000?((item.total-(item.total%1000))/10000+'w'):item.total}}
								</view>
								<view class="rightText">
									篇文章
								</view>
								<image class="moreRight" src="/static/images/more-right.svg"></image>
							</view>
						</view>
						<view class="conttentBox">
							<view class="contentImgBox">
								<view class="contentImg" v-for="(item1,index1) in item.list" :key="index1" @click="onPageJump" :id="item1.article_id">
									<u-image width="216rpx" height="216rpx" border-radius="8rpx" :src="item1.image" mode="aspectFill" :iconSize="44">
										<!-- <view class="videoIcon" v-if="item1.type == 4">
											<image class="playIcon"  src="/static/images/playIcon.svg"></image>
										</view> -->
									</u-image>
									<view class="attText">{{ item1.title }}</view>
								</view>
							</view>
							<view class="line"></view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				hotTopic:'',
				recommList:'',
				downOption:{
					use:false,
					auto:false
				},
				upOption:{
					auto: true
				},
				// 骨架屏
				loadEmpty:[1,2,3],
				loading: true,
			};
		},
		// #ifdef MP-BAIDU
		onInit(query) {
		// #endif
		// #ifndef MP-BAIDU
		onLoad(query) {
		// #endif
			this.loadData()
		},
		methods:{
			loadData(){
				uni.showLoading({
					title: '加载中',
					mask: true,
					success: () => {
					},
					complete: () => {
						this.loading = true
						this.getSquare();
					}
				});
			},
			hideLoad(){
				setTimeout(() => {
					this.loading = false
					uni.hideLoading();
				}, 300);
			},
			// 热门话题
			getSquare() {
				this.HTTP.request({
					url: '/topics/hot',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.hotTopic = res.data.data;
					}
				})
			},
			// 跳转话题列表页
			toTopicList(id){
				uni.navigateTo({
					url:'/pages_article/topicList/topicList?id=' + id
				})
			},
			// 跳转文章详情
			onPageJump(e) {
				let id = e.currentTarget.id;
				uni.navigateTo({
					url: '/pages_content/article/article?article_id=' + id
				});
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				// this.mescroll.endSuccess()
			
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			/*上拉加载的回调*/
			upCallback(page) {
				var that = this
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				this.HTTP.request({
					url: '/topics/square_recommend?page=' + pageNum + '&count=' + pageSize,
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						if (!res.data.data || !res.data.data.recomm_list || res.data.data.recomm_list.length == 0){
							that.list = [];
							that.mescroll.endBySize(0, 0);
							that.hideLoad()
							return
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.data.recomm_list;
						
						curPageData.forEach((item1, index1) => {
							item1.list.forEach((item2, index2) => {
								item2.image = this.Utils.addImageProcess(item2.image, false, 40)
							})
						})
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						// let totalPage = res.data.data.list;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total;
						// 接口返回的是否有下一页 (true/false)
						// let hasNext = res.data.data.list;
				
						//设置列表数据
						if (page.num == 1){
							this.recommList = []; //如果是第一页需手动置空列表
						
							this.hideLoad()
						}
						this.recommList = this.recommList.concat(curPageData); //追加新数据
						console.log('recommList', this.recommList, curPageLen, totalSize)
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
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr();
						this.hideLoad()
					}
				});
				
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
					
			}
		}
	}
</script>

<style lang="scss" scoped>
// 骨架屏样式
.loadBox{
	width: 100%;
	height: auto;
	margin-top: -80rpx;
	.loadBlock{
		padding: 0 28rpx;
		.kong{
			width: 144rpx;
			height: 40rpx;
		}
		.ht-box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 40rpx;
			.kong{
				width: 328rpx;
				height: 20rpx;
				margin-bottom: 20rpx;
			}
		}
		.kong-big{
			width: 144rpx;
			height: 40rpx;
			margin-top: 60rpx;
		}
		.sj-box{
			.top-box{
				margin-top: 60rpx;
				display: flex;
				align-items: center;
				.kong-yuan{
					width: 36rpx;
					height: 36rpx;
				}
				.kong-fang{
					width: 400rpx;
					height: 36rpx;
					margin-left: 20rpx;
				}
				.kong-min{
					width: 120rpx;
					height: 36rpx;
					margin-left: 118rpx;
				}
			}
			.btm-box{
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				.btm-left{
					.left-big{
						width: 216rpx;
						height: 216rpx;
						margin-bottom: 20rpx;
					}
					.left{
						width: 216rpx;
						height: 20rpx;
						margin-bottom: 20rpx;
					}
				}
				.btm-center{
					.center-big{
						width: 216rpx;
						height: 216rpx;
						margin-bottom: 20rpx;
					}
					.center{
						width: 216rpx;
						height: 20rpx;
						margin-bottom: 20rpx;
					}
				}
				.btm-right{
					.right-big{
						width: 216rpx;
						height: 216rpx;
						margin-bottom: 20rpx;
					}
					.right{
						width: 216rpx;
						height: 20rpx;
						margin-bottom: 20rpx;
					}
				}
			}
		}
	}
}
// 热门话题
.hotTopic{
	margin-top: 30rpx ;
	
	.hotTopicTop{
		margin-left: 28rpx;
	}
	
	.topTitle{
		height: 36rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #303133;
		line-height: 36rpx;
	}
	
	.topLine{
		width: 144rpx;
		height: 24rpx;
		background: #FFE512;
		border-radius: 1px 6px 1px 1px;
		margin-top: -18rpx;
	}
	
	.topicRankBox{
		margin-top: 28rpx;
		margin-right: 52rpx;
		
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		
		.topicTips{
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			margin-left: 28rpx;
			.rankImg{
				width: 48rpx;
				height: 38rpx;
				margin-right: 14rpx;
			}
			.tipsText{
				width: 256rpx;
				height: 32rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
				line-height: 32rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow:ellipsis;
			}
		}
		
		
	}
}

// 推荐
.recommended{
	margin: 26rpx 28rpx 0 28rpx;
	.recommendedTop{
		.recommendedTitle{
			height: 36rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #303133;
			line-height: 36rpx;
		}
		.recommendedTopLine{
			width: 72rpx;
			height: 24rpx;
			background: #FFE512;
			border-radius: 1px 6px 1px 1px;
			margin-top: -18rpx;
		}
	}
}
.topicList{
	margin-top: 32rpx;
	
	.topicTitle{
		display: flex;
		align-items: center;
	}
	
	.titleLeft{
		flex: 1;
		display: flex;
		align-items: center;
		
		.titleImg{
			width: 36rpx;
			height: 36rpx;
			margin-right: 8rpx;
		}
		.titleText{
			height: 36rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #303133;
			display: flex;
			align-items: center;
		}
	}

	.titleRight{
		height: 36rpx;
		background: #EDEFF2;
		display: flex;
		align-items: center;
		border-radius: 18rpx;
		padding-left: 20rpx;
		padding-right: 12rpx;
		
		.number{
			font-size: 22rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #606266;
		}
		
		.rightText{
			flex: 1;
			font-size: 22rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #606266;
			
		}
		
		.moreRight{
			width: 14rpx;
			height: 14rpx;
		}
	}
}

.contentImgBox {
	margin-top: 30rpx;
	display: flex;
	height: 326rpx;
	
	.contentImg {
		width: 216rpx;
		height: 326rpx;
		margin-right: 24rpx;
		background-color: #ffffff;
		padding-bottom: 14rpx;
		border-radius: 8px ;
		position: relative;
		.attText {
			font-size: 28rpx;
			color: #606266;
			margin-top:12rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			text-overflow: ellipsis;
			overflow: hidden;
			-webkit-line-clamp: 2;
			line-height: 42rpx;
		}
	}
}

.line{
	width: 694rpx;
	height: 0.5px;
	background: #DDDDDD;
}
</style>
