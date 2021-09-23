<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="我的回答">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<meTabs class="mineAnswerTabs" v-model="tabIndex" :tabs="tabList" @change="tabChange" :lineWidth="170" :top="navbarHeight" :fixed="isFixed"></meTabs>
		<!-- <view class="line" >
		</view> -->
		<answerList ref="mescrollItem" v-for="(tab,i) in tabList" :key="i" :i="i" :index="tabIndex" :top="navbarHeight"></answerList>
	</view>
</template>

<script>
import MescrollMoreMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more.js';
import meTabs from '@/common/me-tabs/me-tabs.vue';
import answerList from '@/common/article-mescroll-item/mine-answer-list.vue';
	export default {
		mixins: [MescrollMoreMixin],
		components: {
			meTabs,
			answerList
		},
		data() {
			return {
				tabList: ['关注的问题','回答的问题'], //'发布的问题',
				tabIndex: 0,
				isFixed:true,
				navbarHeight: getApp().globalData.navbarHeight, 
				cardheight:0
			};
		},
		
		mounted() {
			this.calcCardHeight()
		},
		methods:{
			calcCardHeight(){
				if (this.isFixed){
					return
				}
				const query = uni.createSelectorQuery().in(this);
				setTimeout(() => {
					query.select('.mineAnswerTabs').boundingClientRect(data => {
						this.cardheight = data.top-data.height
					}).exec();
				}, 500);
			},
			// 切换
			tabChange(index){
				this.tabIndex = index
			},
		}
	}
</script>

<style lang="scss">
.tabs-fixed{
	// height: 75rpx !important;
	border-bottom: 20rpx solid #F8F8F8 !important;
	padding-bottom: 100rpx !important;
}
.tabs-line{
	border-radius: 12px !important;
	height: 12rpx !important;
	// margin-bottom:  !important;
}
.tab-item-info{
	font-size: 26rpx !important;
	&.active{
		font-size: 32rpx !important;
	}
}
// .line{
// 	position: relative;
// 	width:100% ;
// 	height: 20rpx;
// 	background: #F8F8F8;
// 	top:92rpx;
// 	margin-bottom: 34rpx;
// }
</style>
