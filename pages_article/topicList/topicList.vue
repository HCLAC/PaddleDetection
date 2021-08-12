<template>
	<view >
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true" :title="info.name">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 头图 -->
		<view class="headImgBox" >
			<image class="headImg" :src="info.image" mode="scaleToFill"></image>
			<view class="mask"></view>
			<view class="topicBox" >
				<view class="bigTitle">
					#{{info.name}}
				</view>
				<view class="number">
					{{info.article_count>10000?((info.article_count-(info.article_count%1000))/10000+'w'):info.article_count}}篇文章
				</view>
				<view class="topicSquare" @click="toTopic">
					<view class="squareText">
						话题广场
					</view>
					<image class="more" src="/static/images/more1.svg" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 景点推荐 -->
		<!-- <view  :class="isFixed ? 'fixTabs' : 'noFix'" id="selectcard" >
			<view class="recommendedBox" @click="recommendedChange">
				<view :class="tabIndex == 0 ? 'recommendedText' : 'recommendedText1' ">
					推荐
				</view>
				<view class="recommendedLine" v-if="tabIndex==0">
				</view>
			</view>
			<view class="latestBox" @click="latestChange">
				<view :class="tabIndex == 1 ? 'recommendedText' : 'recommendedText1' ">
					最新
				</view>
				<view class="latestLine" v-if="tabIndex==1">
				</view>
			</view>
		</view> -->
		<meTabs class="topicTabs" v-model="tabIndex" :tabs="tabList" @change="tabChange" :fixed="isFixed" :top="tabsTop" :tab-width="80"></meTabs>
		<articleList ref="mescrollItem" v-for="(tab,i) in tabList" :key="i" :i="i" :index="tabIndex" :topicID="topic_id"></articleList>
	</view>
</template>
<script>
import MescrollMoreMixin from '@/components/mescroll-uni/mixins/mescroll-more.js';
import meTabs from '@/common/me-tabs/me-tabs.vue';
import articleList from '@/common/article-mescroll-item/topiclist-article-waterfall.vue';

export default {
		mixins: [MescrollMoreMixin],
		components: {
			meTabs,
			articleList
		},
		data() {
			return {
				tabList: [{
					name: '推荐'
				}, {
					name: '最新'
				}],
				tabIndex: 0,
				isFixed: false,
				cardheight:0,
				tabsTop: 0,
				topic_id: 0,
				info:''
			};
		},
		onLoad(e) {
			this.topic_id = e.id
			this.loadData()
		},
		onPageScroll(e) {
			if (e.scrollTop > this.cardheight) {
				if (e.scrollTop > this.cardheight+20 && this.isFixed){
					return
				}
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		},
		
		methods: {	
			loadData(){
				uni.showLoading({
					title: '加载中',
					mask: true,
					success: () => {
						this.getTopic()
						// this.getRecommend()
						// this.getlatest()
						this.hideLoad()
					}
				});
			},
			hideLoad(){
				uni.hideLoading();
			},
			calcCardHeight(){
				setTimeout(() => {
					let view = uni.createSelectorQuery().select(".topicTabs");
					view.fields({
						rect: true,
						size: true,
					}, data => {
						if (!data){
							console.error("mine得到节点信息失败")
							return
						}
						console.log("得到节点信息" + JSON.stringify(data));
						this.cardheight = data.top-data.height
					}).exec();
					view = uni.createSelectorQuery().select(".example-body");
					view.fields({
						size: true,
					}, data => {
						if (!data){
							console.error("example-body得到节点信息失败")
							return
						}
						console.log("得到节点信息" + JSON.stringify(data));
						this.tabsTop = data.height
					}).exec();
				}, 500);
			},
			getTopic(){
				this.HTTP.request({
					url: '/topics',
					data: {
						topic_id: this.topic_id
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.info = res.data.data;
						this.calcCardHeight()
					}
				})
			},
			// 跳转话题广场
			toTopic(){
				uni.navigateTo({
					url:'/pages_article/topic/topic'
				})
			},
			// 切换
			tabChange(index){
				this.tabIndex = index
			},
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
	margin-left: 186rpx;
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
// 头图
.headImgBox {
	width: 750rpx;
	height: 440rpx;
	position: relative;
}
.headImg {
	width: 100%;
	height: 100%;
}
.mask {
	width: 750rpx;
	height: 244rpx;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #13c2c2 100%);
	opacity: 0.4;
	position: absolute;
	bottom: 0;
	left: 0;
}
.topicBox{
	position: absolute;
	top: 0;
	left: 0;
	margin-top: 136rpx;
	margin-left: 28rpx;
}
.bigTitle{
	
	height: 56rpx;
	font-size: 56rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 56rpx;
}
.number{
	margin-top: 16rpx;
	height: 22rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #C9CAD1;
	line-height: 22rpx;
}
.topicSquare{
	width: 138rpx;
	height: 36rpx;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 9px;
	border: none;
	margin-top: 40rpx;
	display: flex;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 12rpx;
}
.squareText{
	width: 88rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
}
.more{
	margin-left: 4rpx;
	width: 14rpx;
	height: 14rpx;
}
.fixTabs {
	height: 88rpx;
	border-radius: 8px 8px 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	width: 100%;
	padding-left: 26rpx;
	position: fixed;
	top: 110rpx;
	// padding-top: 38rpx;
	z-index: 2;
	display: flex;
	align-items: center;
}
.noFix {
	height: 88rpx;
	border-radius: 8px 8px 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	width: 100%;
	padding-left: 26rpx;
	display: flex;
	align-items: center;
	z-index: 1000;
	
}
.recommendedBox{
	margin-left: 22rpx;
}
.recommendedText{
	// width: 64rpx;
	height: 32rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 32rpx;

}
.recommendedText1{
	// width: 52rpx;
	height: 26rpx;
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 26rpx;

}
.recommendedLine{
	width: 64rpx;
	height: 20rpx;
	background: #FFE512;
	border-radius: 1px 5px 1px 1px;
	margin-top: -16rpx;
}
.latestBox{
	margin-left: 48rpx;
}
.latestLine{
	width: 64rpx;
	height: 20rpx;
	background: #FFE512;
	border-radius: 1px 5px 1px 1px;
	margin-top: -16rpx;
}
// 瀑布流
.touring{
	margin-top: 20rpx;
}
.touring .tourtext {
	width: 160rpx;
	height: 104rpx;
	// line-height: 104rpx;
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
	margin-top: 24rpx;
	padding-left: 20rpx;
	min-height: 1470rpx;
}

.left,.right {
	margin-left: 10rpx;
}
.demo-warter {
	width: 340rpx;
	margin-top: 0;
	margin-bottom: 16rpx;
	padding-bottom: 16rpx;
	/* position: relative; */
	background-color: #ffffff;
	border-radius: 8rpx 8rpx 8rpx 8rpx;
}
 /* #ifndef MP-TOUTIAO */
.demo-warter {
	margin-left: 10rpx;
}
/* #endif */

.demo-top {
	position: relative;
}
.imgBox{
	position: relative;
	display: flex;
	align-items: flex-end;
}
.demoImage {
	// min-height: 300rpx !important;
	max-height: 800rpx;
	width: 100%;
	border-radius: 8rpx 8rpx 0 0;
}
.demoImage4 {
	width: 100%;
	// min-height: 272rpx;
	max-height: 800rpx;
	border-radius: 8rpx 8rpx 0 0;
}
.videoIcon{
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -30rpx;
	margin-left: -30rpx;
	width: 60rpx;
	height: 60rpx;
}
.playIcon{
	width: 100%;
	height: 100%;
}
.adress {
	position: absolute;
	left: 0;
	bottom:0;
	display: flex;
	align-items: center;
	max-width: 240rpx;
	height: 40rpx;
	padding-right: 16rpx;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 0px 14rpx 0px 0px;
}

.adreessIcon {
	width: 24rpx;
	height: 24rpx;
	margin: 0 4rpx;
	display: flex;
}

.adreessIcon image {
	width: 100%;
	height: 100%;
}

.adressText {
	max-width: 192rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	/* line-height:24px; */
	/* margin-right: 16rpx; */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.titleTip {
	display: flex;
	margin-top: 10rpx;
	margin-left: 8rpx;
}

.demo-title {
	width: 278rpx;
	/* max-height: 70rpx; */
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(48, 49, 51, 1);
	margin-left: 8rpx;
	line-height: 46rpx;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	white-space: normal !important;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.demo-tag {
	margin-top: 9rpx;
}

.demo-tag-owner {
	width: 52rpx;
	height: 28rpx;
	text-align: center;
	align-items: center;
	color: #0091ff;
	border: 2rpx solid rgba(0, 145, 255, 1);
	border-radius: 14rpx;
	font-size: 16rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(0, 145, 255, 1);
	/* margin-top: 6rpx; */
}

.demo-user {
	font-size: 10rpx;
	margin-top: 24rpx;
	/* margin-bottom: 16rpx; */
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.userMessage {
	font-size: 10px;
	font-weight: 900;
	color: #464646;
	display: flex;
	align-items: center;
}

.userHeard {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	margin-left: 14rpx;
}

.userNikename {
	font-size: 24rpx;
	margin-left: 16rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(96, 98, 102, 1);
}

.count {
	display: flex;
	align-items: center;
	margin-right: 20rpx;
}

.countImg {
	width: 26rpx;
	height: 26rpx;
	margin-right: 8rpx;
	display: flex;
	align-items: center;
}
.countImg image {
	width: 100%;
	height: 100%;
}
.likeCount {
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(96, 98, 102, 1);
	/* line-height:20rpx; */
}
</style>
