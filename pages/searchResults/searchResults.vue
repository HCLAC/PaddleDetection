<template>
	<view >
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<uni-icons type="arrowleft" class="icons" color="#333333" size="22" @click="back" />
					<image src="../../static/images/home.png" class="homeIcon" mode=""></image>
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<view class="search-box">
			<mSearch class="mSearch-input-box" :mode="2" button="inside" :placeholder="defaultKeyword" @search="doSearch(false)" @input="inputChange" @confirm="doSearch(false)" v-model="keyword"></mSearch>
		</view>
		<!-- 搜索结果瀑布流 -->
		<touring></touring>
		<!-- 搜索结果兜底页 -->
		<!-- <view class="results-buttom" v-if="">
			没找到“美国旅游”相关结果
		</view> -->
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import touring from '@/components/content/touring.vue'
	export default {
		data() {
			return {
				defaultKeyword: "云南旅游",
				keyword: "",
			}
		},
		
		components:{
			mSearch,
			uniNavBar,
			touring
		},
		// 方法
		methods: {
			
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			home(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();
			
			},
			blur(){
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = "云南旅游";
			},
			// getLoadNum(num){
			//     console.log('共加载了:'+num);
			//     !this.isNewRenderDone&&uni.hideLoading()
			//     this.isNewRenderDone = true
			// }
		},
		
		
	}
</script>

<style lang="scss">
	
	.search-box {width:95%;padding:15upx 2.5%;display:flex;justify-content:space-between;position:sticky;top: 0;}
	.search-box .mSearch-input-box{width: 100%;}
	/* 自定义导航栏样式 */
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 28rpx;
		background-color: #aa557f;
	}
	.example-body {
		flex-direction: column;
		padding: 30rpx;
		background-color: #ffffff;
	}
	.example-body {
		padding: 0;
	}
	.navBar{
		display: flex;
	}
	.slotleft{
		display: flex;
		align-items: center;
		.icons{
			font-weight: 600;
			margin-right: 20rpx;
		}
		.homeIcon{
			width: 40rpx;
			height: 40rpx;
		}
		
	}
	.slottitle{
		margin-left: 180rpx;
		font-size:38rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(0,0,0,1);
		
	}
	
	
</style>
