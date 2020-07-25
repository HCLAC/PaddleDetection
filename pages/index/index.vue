<template>
	<view>
		<view class="example-body">
			<uni-nav-bar  fixed="true" :status-bar="true" color="#333333" background-color="#FFFFFF"  @clickLeft="showCity" >
				<block slot="left">
					<view class="city">
						<view><text class="uni-nav-bar-text">{{ city }}</text></view>
						<image src="../../static/images/zhankai@2x.png" class="down" />
					</view>
				</block>
				<view class="input-view" @click="confirm">
					<image class="input-uni-icon" src="../../static/images/icon-search@2x.png" />
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="搜索热门目的地" >
				</view>
			</uni-nav-bar>
		</view>
		<!-- 内容 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<tcontent></tcontent>
		</mescroll-body>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import tcontent from '@/components/content/tcontent.vue'
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		components: {
			uniIcons,
			uniNavBar,
			uniSection,
			tcontent,
		},
		mixins: [MescrollMixin],
		data() {
			return {
				city: '北京'
			}
		},
		methods: {
			
			clickLeft() {

				uni.showToast({
					title: '左侧按钮'
				})
			},
			search() {
				uni.showToast({
					title: '搜索'
				})
			},
			showCity() {

				// uni.showToast({
				// 	title: '选择城市'
				// })
				uni.navigateTo({
					url:'../city/city'
				})
				
			},
			
			confirm() {
				// uni.showToast({
				// 	title: '搜索'
				// })
				uni.navigateTo({
					url:'../search/search'
				})
			}
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh')
			setTimeout(function() {
				uni.stopPullDownRefresh()
				console.log('stopPullDownRefresh')
			}, 1000)
		},
		/*下拉刷新的回调, 有三种处理方式:*/
						downCallback(){
							// 第1种: 请求具体接口
							uni.request({
								url: 'xxxx',
								success: () => {
									// 请求成功,隐藏加载状态
									this.mescroll.endSuccess()
								},
								fail: () => {
									// 请求失败,隐藏加载状态
									this.mescroll.endErr()
								}
							})
							// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
							this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
							// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
							this.mescroll.endSuccess()
							
							// 此处仍可以继续写其他接口请求...
							// 调用其他方法...
						},
						/*上拉加载的回调*/
						upCallback(page) {
							let pageNum = page.num; // 页码, 默认从1开始
							let pageSize = page.size; // 页长, 默认每页10条
							uni.request({
								url: 'xxxx?pageNum='+pageNum+'&pageSize='+pageSize,
								success: (data) => {
									// 接口返回的当前页数据列表 (数组)
									let curPageData = data.xxx; 
									// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
									let curPageLen = curPageData.length; 
									// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
									let totalPage = data.xxx; 
									// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
									let totalSize = data.xxx; 
									// 接口返回的是否有下一页 (true/false)
									let hasNext = data.xxx; 
									
									//设置列表数据
									if(page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
									this.dataList = this.dataList.concat(curPageData); //追加新数据
									
									// 请求成功,隐藏加载状态
									//方法一(推荐): 后台接口有返回列表的总页数 totalPage
									this.mescroll.endByPage(curPageLen, totalPage); 
									
									//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
									//this.mescroll.endBySize(curPageLen, totalSize); 
									
									//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
									//this.mescroll.endSuccess(curPageLen, hasNext); 
									
									//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
									//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
									//如果传了hasNext,则翻到第二页即可显示无更多数据.
									//this.mescroll.endSuccess(curPageLen);
									
									// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
									// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
									setTimeout(()=>{
										this.mescroll.endSuccess(curPageLen)
									},20)
									
									
								},
								fail: () => {
									//  请求失败,隐藏加载状态
									this.mescroll.endErr()
								}
							})
							
							// 此处仍可以继续写其他接口请求...
							// 调用其他方法...
						}
	}
</script>

<style scoped>
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
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}

	.uni-nav-bar-text {
		width:64rpx;
		height:32rpx;
		font-size:32rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:#303133;
		line-height:32rpx;
	}
	.down{
		width: 18rpx;
		height: 18rpx;
	}

	.city {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
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
		width: 396rpx;
		height: 72rpx;
		align-items: center;
		flex: 1;
		background:rgba(248,248,248,1);
		border-radius: 36rpx;
		flex-wrap: nowrap;
		margin: 0rpx 28rpx;
	}

	.input-uni-icon {
		width: 28rpx;
		height: 28rpx;
		margin-left: 42rpx;
	}

	.nav-bar-input {
		width: 196rpx;
		height: 28rpx;
		line-height: 28rpx;
		/* #ifdef APP-PLUS-NVUE */
		/* #endif */
		font-size: 28rpx;
		color: #C9CAD1;
		margin-left: 12rpx;
	}

	.example-body {
		padding: 0;
	}
</style>