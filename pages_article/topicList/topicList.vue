<template>
	<view >
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
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
		<view class="headImgBox"  :style="{'position': headerFixed?'absolute':'fixed'}">
			<image class="headImg" lazy-load :src="info.image" mode="scaleToFill"></image>
			<view class="mask"></view>
			<view class="top-kong"></view>
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
			<meTabs class="topicTabs" v-model="tabIndex" :tabs="tabList" @change="tabChange" :fixed="isFixed" :top="navbarHeight" :tab-width="80"></meTabs>
		</view>
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
				headerFixed: false,
				navbarHeight:0,
				headerHeight: 0,
				topic_id: 0,
				info:''
			};
		},
		onLoad(e) {
			this.topic_id = e.id
			this.loadData()
		},
		onPageScroll(e) {
			if (e.scrollTop <= 0){
				this.headerFixed = false
			} else if (e.scrollTop > 0 && this.headerFixed == false){
				this.headerFixed = true
			}
			if (e.scrollTop > this.headerHeight) {
				if (e.scrollTop > this.headerHeight+20 && this.isFixed){
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
			calcHeight(){
				if (this.isFixed){
					return
				}
				
				const query = uni.createSelectorQuery().in(this);
				setTimeout(() => {
					query.select('.headImgBox').boundingClientRect(data => {
						this.navbarHeight = data.top
						this.headerHeight = data.height
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
						this.calcHeight()
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
// 头图
.headImgBox {
	width: 750rpx;
	height: 440rpx;
	
	.topicTabs{
		width: 100%;
		background: #ffffff;
		border-radius: 24rpx 24rpx 0px 0px;
		overflow: hidden;
		position: absolute;
		// bottom: 0;
		top: 420rpx;
		z-index: 100000;
		
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
		}
	}
}

</style>
