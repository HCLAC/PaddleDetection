<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body" v-if="isFixed == false">
			<uni-nav-bar :fixed="true" :status-bar="true" class="navbar" background-color="transparent" style="z-index: 999999;">
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui-white.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy-white.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<view class="example-body" v-if="isFixed == true">
			<uni-nav-bar :fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
								<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
							<!-- #endif -->
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<!-- <view class="slottitle">领途羊</view> -->
			</uni-nav-bar>
		</view>
		<mescroll-uni @scroll="uniScroll" class="mescroll" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- 头部背景 -->
			<view class="bgBox">
				<image src="../../static/images/rankBanner.png" mode="" class="bannerImg"></image>
				<image src="../../static/images/hotRank.png" mode="" class="bannerText"></image>
			</view>
			<view class="content">
				<view class="hotList" v-for="(keyword,index) in  hotKeywordList" :key="index" @tap="doSearch(keyword)">
					<view class="hotImg">
						<image class=" " :src="`../../static/images/icon-${index + 1}.svg`"  mode="aspectFit"></image>
						<text class="rankNum">{{ index + 1 }}</text>
					</view>
					<view class="hotContent">{{ keyword }}</view>
				</view>
				
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		data() {
			return {
				hotKeywordList:'',
				isFixed:false,
				keyword:'',
				
			};
		},
		mixins: [MescrollMixin],
		onLoad() {
			this.loadHotKeyword()
		},
		
		methods:{
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				uni.request({
					url: this.globalUrl + '/search/hot',
					method: 'get',
					data:{
						page:1,
						count:30
					},
					success: res => {
						console.log('-----hotres',res);
						this.hotKeywordList = res.data.data.list;
					}
				});
			},
			uniScroll(e){
				if (e.scrollTop >  190) {
					this.isFixed = true;
				} else {
					this.isFixed = false;
				}
			},
			//执行搜索
			doSearch(keyword) {
				if (!keyword) return false;
			
				keyword = keyword === false ? this.keyword : keyword;
				this.keyword = keyword;
				// this.defaultKeyword = keyword;
				this.saveKeyword(keyword); //保存为历史
				// uni.showToast({
				// 	title: keyword,
				// 	icon: 'none',
				// 	duration: 2000
				// });
				uni.request({
					url: this.globalUrl + '/search',
					data: {
						query: keyword,
						hit: 8
					},
					success: res => {
						console.log('搜素数据', res);
						uni.setStorageSync('article_id', res.data);
						if(res.data.code == 0){
							uni.navigateTo({
								url: '../searchResults/searchResults'
							});
						}
						
					}
				})
				
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				
				var hisKey = uni.getStorageSync('OldKeys');
				if (!hisKey) {
					var OldKeys = [keyword];
					uni.setStorageSync('OldKeys',JSON.stringify(OldKeys));
					this.oldKeywordList = OldKeys;
			
				} else {
					var OldKeys = JSON.parse(hisKey);
					
					// var OldKeys = res.data;
					var findIndex = OldKeys.indexOf(keyword);
					if (findIndex == -1) {
						OldKeys.unshift(keyword);
					} else {
						OldKeys.splice(findIndex, 1);
						OldKeys.unshift(keyword);
					}
					OldKeys.length > 10 && OldKeys.pop();
					uni.setStorageSync('OldKeys',JSON.stringify(OldKeys));
					this.oldKeywordList = OldKeys;
				
				}
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
				let pageNum = page.num
				let pageSize = 30; // 页长, 默认每页10条
				var that = this;
					uni.request({
						url: this.globalUrl + '/search/hot?page=' + pageNum + '&count=' + pageSize,
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
							if (page.num == 1) this.hotKeywordList = []; //如果是第一页需手动置空列表
							this.hotKeywordList = this.hotKeywordList.concat(curPageData); //追加新数据
							console.log('hotKeywordList', this.hotKeywordList);
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
			
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			}
	}
</script>

<style lang="scss" scoped>
	/* 自定义导航栏样式 */
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		z-index: 999999;
	}
	
	.example-body {
		flex-direction: column;
		padding: 15px;
	}
	
	.example-body {
		padding: 0;
	}
	
	.navBar {
		display: flex;
		z-index: 999999;
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
	.mescroll {
		position: relative;
		top: -184rpx;
		left: 0;
	}
	// 头部背景
	.bgBox{
		
		width: 100%;
		height: 440rpx;
		
	}
	.bannerImg{
		width: 100%;
		height: 100%;
		
	}
	.bannerText{
		width: 448rpx;
		height: 114rpx;
		position: absolute;
		top: 200rpx;
		left: 132rpx;
	}
	// 
	.content{
		width: 100%;
		background: #FFFFFF;
		border-radius: 12px 12px 0px 0px;
		// z-index: 999999;
		position: relative;
		margin-top: -20rpx;
		padding-left: 28rpx;
	}
	.hotList{
		width: 100%;
		height: 94rpx;
		display: flex;
		align-items: center;
		border-bottom:0.5px solid #EDEFF2;
	}
	.hotImg {
		width: 36rpx;
		height: 36rpx;
		line-height: 36rpx;
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
			font-weight: 600;
			color: rgba(255, 255, 255, 1);
			line-height: 20rpx;
		}
	}
	
	.hotContent {
		margin-left: 16rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #303133;
		line-height: 32rpx;
	}
</style>
