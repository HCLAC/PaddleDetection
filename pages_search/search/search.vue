<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" v-if="showType==2 || showType==3" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<view class="search-box">
			<u-search 
				v-model="keyword"
				:focus="autofocus"
				action-text="取消"
				:placeholder="placeholderKeyword" 
				bg-color='#F8F8F8'
				searchIconColor="#c9cad1"
				:action-style="{width:'64rpx',height:'50rpx',marginLeft:'24rpx',fontSize:'32rpx'}"
				:input-style="{background: '#F8F8F8'}"
				height=72
				@input="inputChange"
				@search="toSearchResults"
				@custom="Utils.back"
				@clear="clear"
			></u-search>
		</view>
		<!-- 下拉 -->
		<view class="search-keyword" v-if="showType == 1">
			<scroll-view class="keyword-list-box" scroll-y scroll-x="false">
				<block v-for="(item, index) in suggestList" :key="index">
					<view class="keyword-entry" hover-class="keyword-entry-tap">
						<view v-if="item.type" :class=" item.type == 'site' ? 'otherIcon' : 'otherIcon1'">
							<image :src="item.type == 'site'?'/static/images/attIcon.svg':'/static/images/adressIcon.svg'" ></image>
						</view>
						<view class="liIcon" v-else></view>
						<view class="keyword-text" @tap.stop="suggestToSearch(item)"><rich-text :nodes="item.nameHtml"></rich-text></view>
						<view class="otherText" v-if="item.type">{{ item.type == 'site' ? '景点' : '目的地' }}</view>
					</view>
				</block>
				<view class="search-bottom" @click="toSearchResults()">
					搜索更多关于“{{ keyword }}”的结果
				</view>
			</scroll-view>
		</view>
		<!-- 历史搜索和热搜 -->
		<view class="search-keyword" v-if="showType == 0">
			<scroll-view class="keyword-box" scroll-y scroll-x="false">
				<view class="keyword-block" v-if="historyList.length > 0">
					<view class="keyword-list-header">
						<view>历史记录</view>
						<view><image @tap="clearShow=true" src="/static/images/icon-shanchu.svg"></image></view>
					</view>
					<view class="keyword">
						<view v-for="(keyword, index) in historyList" @tap="doSearch(keyword)" :key="index">{{ keyword }}</view>
					</view>
				</view>
				<view class="keyword-block">
					<view class="keyword-list-header1">
						<view>热门搜索</view>
					</view>
					<view class="hotList" >
						<view class="hotItem" v-for="(keyword, index) in hotKeywordList" @tap="doSearch(keyword)" :key="index" v-if="index < 10" >
							<view class="hotImg" >
								<image class=" " :src="`/static/images/icon-${index + 1>4?4:index + 1}.svg`"  mode="aspectFit"></image>
								<text class="rankNum" >{{ index + 1 }}</text>
							</view>
							<view class="hotContent" >{{ keyword}}</view>
						</view>
					</view>
					<view class="hide-hot-tis" v-if="hotKeywordList.length >= 10" @click="toHotRank">
						<view>点击查看更多热搜</view>
						<image class="moreRight" src="/static/images/moreR.svg"></image>
					</view>
				</view>
			</scroll-view>
		</view>
		<mescroll-body class="mescroll" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="container" v-if="showType == 2" >
				<!-- 省市主题 -->
				<block v-if="result && result.area">
					<view class="siteView" @click="toPrivince(result.area)">
						<image class="siteViewImg" lazy-load :src="result.area.image"></image>
						<view class="siteViewText">
							<view class="titleS">{{ result.area.name }}</view>
							<view class="content">
								查看省市主题页
							</view>
						</view>
						<image class="iconRight" src="/static/images/more-right.svg"></image>
					</view>
					<view class="line"></view>
				</block>
				<!-- 景点 -->
				<block v-if="site">
					<view class="areaView" @click.stop="toSite(site.id)">
						<image class="areaImg" lazy-load :src="site.image[0]"></image>
						<view class="top">
							<rich-text class="title" :nodes="site.nameHtml"></rich-text>
							<view class="areacontent">{{ site.description }}</view>
							<view class="rateBox">
								<!-- 评分图标 -->
								<uni-rate :readonly="true" :value="site.rate" :size='16' margin="4" :allowHalf="true"/>
								<view class="rate">
									<view class="rate-number">
										{{ site.rate }}
									</view>
									<text>星</text>
								</view>
							</view>
						</view>
					</view>
					<view class="line">
						
					</view>
				</block>
				<!-- 行程路线 -->
				<block v-if="result && result.route_list && result.route_list.length">
					<view class="titleBox">
						<view class="contentTitle">行程线路</view>
						<view class="moreBox" @click="toLineMore()" v-if="routeHotMore">
							更多
							<image src="/static/images/more-right.svg"></image>
						</view>
					</view>
					<view class="swiperBox">
						<view class="swiper">
							<view class="swiperItem" v-for="(item, index) in result.route_list" @click="toRoute(item.uuid)" :key="index">
								<image lazy-load :src="item.image"></image>
								<view class="">
									<rich-text :nodes="item.titleHtml"></rich-text>
								</view>
							</view>
						</view>
					</view>
					<view class="line">
						
					</view>
				</block>
				<!-- 内容精选 -->
				<block v-if="articleList && articleList.length">
					<view class="contentTitle">内容精选</view>
					<view class="touring">
						<view class="wrap">
							<articleWaterfall :list="articleList"></articleWaterfall>
						</view>
					</view>
				</block>
			</view>
			<view v-if="showType == 3">
				<view class="noResult">
					没找到“{{ keyword }}”相关结果
				</view>
				<view class="wrap">
					<articleWaterfall :list="noResultList"></articleWaterfall>
				</view>
			</view>
		</mescroll-body>
		<u-modal v-model="clearShow" :border-radius="40" content="确定清除历史搜索记录？" :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import articleWaterfall from '@/common/article-waterfall/article-waterfall.vue';
	// 引入mescroll-mixins.js
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin],
		components: {
			articleWaterfall
		},
		data() {
			return {
				downOption: {
					use:false,
				},
				upOption: {
					auto:false,
					noMoreSize: 10, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
					  use : true ,
					  tip : '暂无旅行',
					}
				},
				keyword: '',
				placeholderKeyword: '搜索热门目的地/景点',
				defaultKeyword: '搜索热门目的地/景点',
				result: null, // 搜索结果
				site: null,
				articleList: [],	// 如果未搜索到结果，返回首页文章列表
				noResultList: [],	// 如果未搜索到结果，返回首页文章列表
				suggestList: [],	// 下拉提示
				historyList: [],	// 历史搜索记录
				hotKeywordList: [],	// 热搜记录
				showType: 0 ,// 0-热搜和历史搜索 1-下拉提示 2-搜索结果
				clearShow: false,
				autofocus: false,
				requestID: '',
				routeHotMore: false,
			};
		},
		mounted() {
			if (this.keyword){
				this.getSearchResults()
			}
		},
		// #ifdef MP-BAIDU
		onInit(query) {
		// #endif
		// #ifndef MP-BAIDU
		onLoad(query) {
		// #endif
			this.keyword = query.keyword
			this.autofocus = query.focus ? query.focus==1 : true
			uni.getStorage({
				key: 'searchHistory',
				success: res => {
					this.historyList = res.data
					if (res.data && typeof(res.data) == 'string'){
						this.historyList = JSON.parse(res.data)
					}
					this.placeholderKeyword = this.historyList && this.historyList.length>0 ? this.historyList[0]: this.defaultKeyword
				}
			});
			this.getHotKeyword()
		},
		// 方法
		methods: {
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			clear(){
				this.keyword = ''
				this.showType = 0
			},
			getHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				this.HTTP.request({
					url: '/search/hot',
					method: 'get',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.hotKeywordList = res.data.data.list;
					}
				});
			},
			getSearchResults(requestID='') {
				this.requestID = requestID
				this.showType = 2
				this.saveKeyword(this.keyword); //保存为历史
				this.articleList = [];
				var that = this
				this.HTTP.request({ 
					url: '/search', 
					data: {
						query: this.keyword, 
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
						var result = res.data.data
						result.area && (result.area.image = that.Utils.addImageProcess(result.area.image, false, 40))
						
						result.site && (result.site.image[0] = that.Utils.addImageProcess(result.site.image[0], false, 40))
						if(result.site){
							var name = result.site.name;
							name = name.replace(this.keyword, "<span style='color: #A86B13;font-weight:bold'>" + this.keyword + '</span>');
							result.site.nameHtml = '<div>' + name + '</div>';
							this.site = result.site
						}
						
						this.routeHotMore = result.route_list.length > 2
						result.route_list = result.route_list.slice(0, 2)
						result.route_list && result.route_list.forEach((item, index) => {
							item.image = that.Utils.addImageProcess(item.image, false, 50)
							//高亮关键字
							var title = item.title;
							title = title.replace(this.keyword, "<span style='color: #A86B13;font-weight:bold'>" + this.keyword + '</span>');
							item.titleHtml = '<div>' + title + '</div>';
						})
						that.result = result
						this.mescroll.resetUpScroll();
					}
				}); 
			},
			getArticleList() {
				this.showType = 3
				this.HTTP.request({
					url: '/article/list',
					data: {
						count: 6,
						page: 1,
						first_time: new Date().getTime()	
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var list = res.data.data.list
						list.forEach((item1, index1) => {
							if (item1.cover_height > 0){
								item1.height = 340*item1.cover_height/item1.cover_width+'rpx'
							} else{
								item1.height = '220rpx'
							}
							item1.avatar = this.Utils.addImageProcess(item1.avatar, false, 60)
							item1.image = this.Utils.addImageProcess(item1.image, false, 40)
						})
						this.noResultList = list;
					}
				});
			},
			//监听输入
			inputChange(keyword) {
				this.showType = 1
				if (!keyword) {
					this.showType = 0
					this.suggestList = [];
					this.placeholderKeyword = this.historyList ? this.historyList[0]: this.defaultKeyword
					return;
				}
				this.HTTP.request({
					url: '/search/suggest',
					data: {
						query: keyword,
						hit: 8
					},
					// type:"GET",
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						
						let suggestList = [];
						if (res.data.data.special) {
							suggestList.push({ ...res.data.data.special });
						}
						if (res.data.data.list && res.data.data.list.length) {
							suggestList.push( ...res.data.data.list );
						}
						
						//高亮关键字
						suggestList.forEach(item => {
							var name = item.name;
							name = name.replace(keyword, "<span style='color: #A86B13;font-weight:bold'>" + keyword + '</span>');
							item.nameHtml = '<div>' + name + '</div>';
						});
						this.suggestList = suggestList
					}
				});
			},
			// 回车搜索
			toSearchResults() {
				var keyword = this.keyword ? this.keyword : this.placeholderKeyword
				if(keyword == '搜索热门目的地/景点'){
					uni.showToast({
					    title: '请输入搜索词',
						icon:'none'
					});
					return
				}
				this.keyword = keyword
				this.getSearchResults()
				
			},
			//清除历史搜索
			confirm() {
				this.historyList = [];
				this.placeholderKeyword = this.defaultKeyword
				uni.removeStorage({
					key: 'searchHistory'
				});
			},
			//执行搜索
			doSearch(keyword) {
				if (!keyword) return false;
				this.keyword = keyword
				this.getSearchResults()
			},
			suggestToSearch(item) {
				switch(item.type){
					case 'area':
						this.saveKeyword(item.name); //保存为历史
						let obj = {
							state_id: item.state_id,
							name: item.name,
							image: item.image,
							city_id: item.city_id
						};
						uni.navigateTo({
							url: '/pages_content/provinces/provinces?state_id=' + 
							obj.state_id+"&city_id="+obj.city_id+"&name="+obj.name+"&image="+obj.image
						});
						break;
					case 'site':
						this.saveKeyword(item.name); //保存为历史
						uni.navigateTo({
							url: '/pages_province/positionContent/positionContent?id=' + item.id
						});
						break
					default:
						this.keyword = item.name
						this.getSearchResults(item.from_request_id)
				}
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				var that = this
				var hisKey = this.historyList
				var searchHistory = null
				if (!hisKey) {
					searchHistory = [keyword];
				} else {
					searchHistory = hisKey;
					var findIndex = searchHistory.indexOf(keyword);
					if (findIndex != -1) {
						searchHistory.splice(findIndex, 1);
					}
					searchHistory.unshift(keyword);
					searchHistory.length > 10 && searchHistory.pop();
				}
				uni.setStorage({
					key: 'searchHistory',
					data: searchHistory,
					success: function () {
						that.historyList = searchHistory;
					}
				});
			},
			// 线路列表
			toLineMore() {
				uni.navigateTo({
					url: '/pages_province/lineList/lineList?query=' + this.keyword
				});
			},
			toSite(id) {
				uni.navigateTo({
					url: '/pages_province/positionContent/positionContent?id=' + id
				});
			},
			toRoute(id) {
				uni.navigateTo({
					url: '/pages_province/lineDetail/lineDetail?id=' + id
				});
			},
			toPrivince(area) {
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
			},
			// 跳转热搜榜单
			toHotRank(){
				uni.navigateTo({
					url:'/pages_search/hotSearchRank/hotSearchRank'
				})
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				// this.loadData()
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
				if (this.showType != 2){
					return
				}
				let pageNum = page.num
				let pageSize = page.size; // 页长, 默认每页10条
				var that = this;
				this.HTTP.request({
					url: '/search/article?page=' + pageNum + '&hit=' + pageSize,
					data: {
						from_request_id: this.requestID,
						query: that.keyword
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						if (!res.data.data || !res.data.data.list || res.data.data.list.length == 0){
							that.articleList = [];
							that.getArticleList()
							that.mescroll.endBySize(6, 6);
							return
						}
						
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.data.list;
						curPageData.forEach((item1, index1) => {
							if (item1.cover_height > 0){
								item1.height = 340*item1.cover_height/item1.cover_width+'rpx'
							} else{
								item1.height = '220rpx'
							}
							item1.avatar = that.Utils.addImageProcess(item1.avatar, false, 60)
							item1.image = that.Utils.addImageProcess(item1.image, false, 40)
						})
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total;
						// 接口返回的是否有下一页 (true/false)
						//设置列表数据
						if (page.num == 1) that.articleList = []; //如果是第一页需手动置空列表
						that.articleList = that.articleList.concat(curPageData); //追加新数据
						console.log('文章列表', that.articleList, curPageLen, totalSize);
						// that.list = that.list.concat(answerArr)
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
			
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			}
		}
	};
</script>

<style lang="scss">

.center{
	width: 606rpx !important;
}
.iconTitle{
	margin-left: 22rpx !important;
}
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
			// color: #A86B13;
		}
		.titleS {
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
			.title{
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
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
					display: flex;
					align-items: center;
					.rate-number{
						font-size: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 600;
						color: #606266;
						margin-right: 4rpx;
					}
					text{
						font-size: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 400;
						color: #606266;
					}
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
			overflow: hidden;
			-webkit-line-clamp: 2;
		}


		
	}
.swiperBox{
	padding-left: 4%; 
	padding-top: 30rpx;
	.swiper {
		width: 100%;
		margin-bottom: 28rpx;
		overflow-x: auto;
		display: flex;
		justify-content: space-between;
		.swiperItem {
			flex: none;
			width: 46%;
			margin-right: calc( 8% / 2);
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			image {
				width: 98%;
				border-radius: 16rpx;
				height: 180rpx;
			}
			.title {
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
}
	.contentTitle {
		flex: 1;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		margin-left: 34rpx;
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
	justify-content: space-between;
}


.touring {
	margin-top: 24rpx;
}

.wrap {
	width: 750rpx;
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
	padding: 0 20rpx 0;
}
.search-keyword {
	width: 100%;
	box-sizing: border-box;
	background-color: rgb(242, 242, 242);
}
.keyword-list-box {
	height: calc(100vh - 110upx);
	padding-top: 10upx;
	background-color: #fff;
}
.keyword-entry-tap {
	background-color: #eee;
}
.keyword-entry {
	position: relative;
	width: 94%;
	height: 96rpx;
	margin: 0 3% 0 0;
	padding-left: 40rpx;
	font-size: 32rpx;
	color: #606266;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.keyword-entry .liIcon {
	margin-left: 12rpx;
	margin-right: 12rpx;

	width: 16rpx;
	height: 16rpx;
	background: rgba(255, 255, 255, 1);
	border: 4rpx solid rgba(201, 202, 209, 1);
	border-radius: 50%;
}
.keyword-entry .otherIcon {
	width: 40rpx;
	height: 40rpx;
	background: rgba(92, 198, 110, 1);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width: 24rpx;
		height: 24rpx;
		
	}
}
.keyword-entry .otherIcon1 {
	width: 40rpx;
	height: 40rpx;
	background: rgba(250, 140, 22, 1);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width: 24rpx;
		height: 24rpx;
	}
}

.keyword-entry .otherText {
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #606266;
	line-height: 24rpx;
	position: absolute;
	right: 30rpx;
}
.keyword-entry .keyword-text {
	height: 96rpx;
	display: flex;
	color: #303133;
	font-size: 16px;
	margin-left: 16rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	align-items: center;
}
.keyword-entry .keyword-text {
	width: 90%;
	border-bottom: solid 0.5rpx #edeff2;
}

.search-bottom {
	font-size: 12px;
	color: #c0c0c0;
	margin-left: 15px;
}
.keyword-box {
	width: 100%;
	box-sizing: border-box;
	background-color: #fff;
}

.keyword-box .keyword-block .keyword-list-header {
	width: 100%;
	box-sizing: border-box;
	padding: 40rpx 40rpx 28rpx 40rpx;
	font-size: 28rpx;
	font-weight: 600;
	color: #303133;
	display: flex;
	justify-content: space-between;
}
.keyword-box .keyword-block .keyword-list-header1 {
	width: 100%;
	box-sizing: border-box;
	padding: 40rpx 40rpx 28rpx 40rpx;
	font-size: 28rpx;
	font-weight: 600;
	color: #303133;
	display: flex;
	justify-content: space-between;
}
.keyword-box .keyword-block .keyword-list-header image {
	width: 34rpx;
	height: 34rpx;
}
.keyword-box .keyword-block .keyword {
	width: 100%;
	box-sizing: border-box;
	padding: 0 40rpx;
	display: flex;
	flex-flow: wrap;
	justify-content: flex-start;
}
.keyword-box .keyword-block .hotList {
	width: 100%;
	box-sizing: border-box;
	padding: 0 40rpx;
	display: flex;
	flex-flow: wrap;
	justify-content: flex-start;
}
.keyword-box .keyword-block .hotList .hotItem {
	width: 50%;
	display: flex;
	height: 28rpx;
	align-items: center;
	margin-bottom: 40rpx;
}

.hotItem {
	.hotImg {
		width: 32rpx;
		height: 32rpx;
		line-height: 32rpx;
		align-self: center;
		position: relative;
		image {
			width: 100%;
			height: 100%;
		}
		.rankNum {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: 20rpx;
			font-family: HelveticaNeue-Bold, HelveticaNeue;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			line-height: 20rpx;
		}
	}

	.hotContent {
		margin-left: 8rpx;
		color: rgba(48, 49, 51, 1);
		font-size: 28rpx;
		font-weight: 500;
	}
}
.keyword-box .keyword-block .hide-hot-tis {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 34rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 34rpx;
	margin-top: 16rpx;
}
.moreRight{
	width: 14rpx;
	height: 14rpx;
	margin-left: 4rpx;
}
.keyword-box .keyword-block .keyword > view {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8rpx;
	padding: 0 12rpx;
	margin: 0rpx 20rpx 20rpx 0;
	height: 52rpx;
	font-size: 28rpx;
	background-color: #edeff2;
	color: #606266;
}
.search-bottom {
	margin-left: 84rpx;
	font-size: 22rpx;
	color: #0091ff;
	margin-top: 22rpx;
}
.noResult {
	height: 220rpx;
	font-size: 24rpx;
	color: #606266;
	background-color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 8rpx;
}

.wrap {
	width: 750rpx;
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
	padding: 0 22rpx;
	background: #FFFFFF;
}
</style>
