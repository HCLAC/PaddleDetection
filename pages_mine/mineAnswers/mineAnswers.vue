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
		<!-- 问答列表 -->
		<!-- <view class="answersList">
			<view class="myCollection" :class="isFixed ? 'fixTabs' : 'noFix'" id="selectcard" >
				<view class="favBox" @click="change" >
					<view class="favBT">
						<view :class="tabIndex == 0 ?'favText' : 'favText1 '" >
							发布的问题
						</view>
						<view class="favLine" v-if="tabIndex == 0">
						</view>
					</view>
				</view>
				<view class="likeBox" @click="change1">
					<view class="likeBT">
						<view :class="tabIndex == 1 ?'favText' : 'favText1 '">
							关注的问题
						</view>
						<view class="likeLine" v-if="tabIndex == 1">
						</view>
					</view>
					
				</view>
				<view class="likeBox" @click="change2">
					<view class="likeBT">
						<view :class="tabIndex == 2 ?'favText' : 'favText1 '">
							回答的问题
						</view>
						<view class="likeLine" v-if="tabIndex == 2">
						</view>
					</view>
					
				</view>
			</view>
		</view> -->
		
		<meTabs class="mineAnswerTabs" v-model="tabIndex" :tabs="tabList" @change="tabChange" :fixed="isFixed" :tab-width="120"></meTabs>
		<answerList ref="mescrollItem" v-for="(tab,i) in tabList" :key="i" :i="i" :index="tabIndex"></answerList>
	</view>
</template>

<script>
import MescrollMoreMixin from '@/components/mescroll-uni/mixins/mescroll-more.js';
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
				isFixed:false,
				cardheight:0
			};
		},
		onPageScroll(e) {
			if (e.scrollTop >  this.cardheight) {
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		},
		onLoad() {
			this.calcCardHeight()
		},
		methods:{
			calcCardHeight(){
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

<style lang="scss" scoped>
// 自定义导航栏样式
.nav-bar {
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 14px;
	background-color: #aa557f;
}
.nav-bar {
	flex-direction: column;
	padding: 15px;
	background-color: #ffffff;
}
.nav-bar {
	padding: 0;
}
.navBar{
	display: flex;
}
.slotleft{
	display: flex;
}
.fanhui{
	width: 40rpx;
	height: 40rpx;
	margin-left: 42rpx;
	margin-right: 20rpx;
}
.fhsy{
	width: 40rpx;
	height: 40rpx;
}
/* #ifdef  MP-BAIDU*/
.fhsy {
	margin-left: 100rpx;
}
/*  #endif  */
.slottitle{
	margin-left: 162rpx;
	font-size: 38rpx;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:600;
	color:rgba(0,0,0,1);
}
.button-v-line{
	width: 1px;
	height: 18px;
	background-color: #2f2f2f;
	margin: 0 8px;
}
.myCollection {
	// border-radius: 12px 12px 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	width: 100%;
	// font-size: 40rpx;
	// font-weight: 500;
	// padding-left: 32rpx;
	// padding-top: 28rpx;
	// padding-left: 40rpx;
	// padding-right: 40rpx;
	// padding-bottom: 22rpx;
	padding: 35rpx 108rpx 14rpx;
	display: flex;
	justify-content: space-between;
	border-bottom: 20rpx solid #F8F8F8;
	border-top:1px solid #EDEFF2;
}
.favBox{
	display: flex;
	height: 60rpx;
	// margin-left: 28rpx;
}
.favBT{
	margin-right: 8rpx;
	text-align: center;
}
.favText{
	// width: 64px;
	height: 32rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 32rpx;

	
}
.favText1{
	// width: 52px;
	height: 26rpx;
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 26rpx;

	margin-top: 8rpx;
}
.favLine{
	width: 160rpx;
	height: 12rpx;
	background: #FFE512;
	border-radius: 12rpx;

	margin-top: -6rpx;
}
.likeBox{
	display: flex;
	// margin-left: 56rpx;
	height: 60rpx;
}
.likeBT{
	margin-right: 8rpx;
	text-align: center;
}
.likeText{
	
}
.likeLine{
	width: 160rpx;
	height: 12rpx;
	background: #FFE512;
	border-radius: 12rpx;
	
	margin-top: -6rpx;
}
.fixTabs {
	position: fixed;
	top: 126rpx;
	z-index: 2;
	height: 108rpx;
	padding-top: 58rpx;
	display: flex;
}
.noFix {
	z-index: 1000;
}

</style>
