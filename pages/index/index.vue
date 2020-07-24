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
		<tcontent></tcontent>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import tcontent from '@/components/content/tcontent.vue'
	export default {
		components: {
			uniIcons,
			uniNavBar,
			uniSection,
			tcontent
		},
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