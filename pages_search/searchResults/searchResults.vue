<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<view class="search-box" @click="toSearch">
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
					<image class="iconRight" src="/static/images/more-right.svg" mode=""></image>
				</view>
				<view class="line"></view>
			</block>
			<!-- 景点 -->
			<block v-if="site">
				<view class="areaView" @click.stop="getSite(site.id)">
					<image class="areaImg" :src="site.image[0]" mode=""></image>
					<view class="top">
						<view class="title">{{ site.name }}</view>
						<view class="areacontent">{{ site.description }}</view>
						<view class="rateBox">
							<!-- 评分图标 -->
							<uni-rate :readonly="true" :value="site.rate" :size='16' margin="1" :allowHalf="true"/>
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
						<image src="/static/images/more-right.svg" mode=""></image>
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
			<block v-if="list">
				<veiw class="contentTitle">内容精选</veiw>
				<view class="touring">
					<view class="wrap">
						<articleWaterfall :list="list"></articleWaterfall>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import articleWaterfall from '@/common/article-waterfall/article-waterfall.vue';
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
			uniNavBar,
			articleWaterfall
		},
		onLoad(options) {
			this.defaultKeyword = options.keyword
			this.getSearchResults(options.keyword);
		},
		// 方法
		methods: {
			getSearchResults(keyword) {
				var that = this
				this.HTTP.request({ 
					url: '/search', 
					data: { 
						query: keyword, 
						hit: 8 
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						that.area = res.data.data.area;
						that.site = res.data.data.site;
						that.list = res.data.data.article_list;
						that.route_list = res.data.data.route_list;
						// let list1 = this.drawCorrelativeKeyword(arr, keyword);
					} 
				}); 
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
					url: '/pages_province/lineList/lineList?state_id=' + state_id + '&city_id=' + city_id
				});
			},
			getSite(id) {
				if (id) {
					uni.navigateTo({
						url: '/pages_province/positionContent/positionContent?id=' + id
					});
				}
			},
			getRoute(id) {
				if (id) {
					uni.navigateTo({
						url: '/pages_province/lineDetail/lineDetail?id=' + id
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
						url: '/pages_content/provinces/provinces?state_id=' + 
						obj.state_id+"&city_id="+obj.city_id+"&name="+obj.name+"&image="+obj.image
					});
				}
			},
			toSearch(){
				uni.redirectTo({
					url: '/pages_search/search/search'
				})
			},
			focus() {
				//#ifndef MP-BAIDU
				uni.hideKeyboard();
				//#endif
			}
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
		margin-left: 182rpx;
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
</style>
