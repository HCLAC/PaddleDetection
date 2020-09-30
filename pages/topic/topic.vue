<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" :border="true">
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">话题</view>
			</uni-nav-bar>
		</view>
		<!-- 热门话题 -->
		<view class="hotTopic">
			<v-tabs
				inactive-color="#909399"
				lineHeight="24rpx"
				lineColor="#FFE512"
				activeFontSize="36rpx"
				activeColor="#303133"
				fontSize="36rpx"
				:lineScale="0.7"
				lineRadius="6px"
				v-model="tabCurrent"
				:tabs="tablist"
				:is-scroll="false"
				:current="tabCurrent"
				@change="tabChange"
			></v-tabs>
			<view class="topicRankBox">
				<view class="topicTips">
					<image class="rankImg" src="../../static/images/topicIcon.svg" mode=""></image>
					<view class="tipsText">
						性价比超高的小区性价比超高的小区
					</view>
				</view>
				<view class="topicTips">
					<image class="rankImg" src="../../static/images/topicIcon.svg" mode=""></image>
					<view class="tipsText">
						性价比超高的小区性价比超高的小区
					</view>
				</view>
				<view class="topicTips">
					<image class="rankImg" src="../../static/images/topicIcon.svg" mode=""></image>
					<view class="tipsText">
						性价比超高的小区性价比超高的小区
					</view>
				</view>
				<view class="topicTips">
					<image class="rankImg" src="../../static/images/topicIcon.svg" mode=""></image>
					<view class="tipsText">
						性价比超高的小区性价比超高的小区
					</view>
				</view>
				<view class="topicTips">
					<image class="rankImg" src="../../static/images/topicIcon.svg" mode=""></image>
					<view class="tipsText">
						性价比超高的小区性价比超高的小区
					</view>
				</view>
				<view class="topicTips">
					<image class="rankImg" src="../../static/images/topicIcon.svg" mode=""></image>
					<view class="tipsText">
						性价比超高的小区性价比超高的小区
					</view>
				</view>
			</view>
		</view>
		<!-- 推荐 -->
		<view class="recommended">
			<v-tabs
				inactive-color="#909399"
				lineHeight="24rpx"
				lineColor="#FFE512"
				activeFontSize="36rpx"
				activeColor="#303133"
				fontSize="36rpx"
				:lineScale="0.7"
				lineRadius="6px"
				v-model="tabCurrent"
				:tabs="tablist1"
				:is-scroll="false"
				paddingItem="0rpx"
				:current="tabCurrent"
				@change="tabChange"
			></v-tabs>
			<view class="topicList">
				<view class="topicTitle">
					<view class="titleLeft">
						<image class="titleImg" src="../../static/images/topicIcon.svg" mode=""></image>
						<view class="titleText">
							夏季清凉避暑胜地
						</view>
					</view>
					<view class="titleRight" @click="toTopicList">
						<view class="number">
							2.8w
						</view>
						<view class="rightText">
							篇文章
						</view>
						<image class="moreRight" src="../../static/images/more-right.svg" mode=""></image>
					</view>
				</view>
			</view>
			<view class="conttentBox">
				<view class="contentImgBox">
					<view class="contentImg" v-for="(item, index) in siteHot" :key="index" @click="toAtt(item.id)">
						<image class="attImg" :src="item.image" mode=""></image>
						<view class="attText">{{ item.name }}</view>
					</view>
					
				</view>
				<view class="line">
					
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import vTabs from '@/components/v-tabs/v-tabs';
	export default {
		components: {
			vTabs
		},
		data() {
			return {
				current: 0,
				tablist: ['热门话题'],
				tablist1:['推荐'],
				tabCurrent: 0,
				siteHot:''
			};
		},
		onLoad() {
			this.getSiteHot()
		},
		methods:{
			getSiteHot() {
				uni.request({
					url: this.globalUrl + '/site/hot',
					data: {
						count: 3,
						sort_by: 3
					},
					success: res => {
						console.log('景点推荐', res);
						this.siteHot = res.data.data;
					}
				});
			},
			// 跳转话题列表页
			toTopicList(){
				uni.navigateTo({
					url:'../topicList/topicList'
				})
			},
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 返回首页
			home() {
				uni.switchTab({
					url: '/pages/index/index'
				});
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
	margin-left: 40rpx;
	margin-right: 20rpx;
}

.fhsy {
	width: 40rpx;
	height: 40rpx;
}

.slottitle {
	margin-left: 162rpx;
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
// 热门话题
.hotTopic{
	margin-top: 30rpx ;
}
.topicRankBox{
	margin-top: 28rpx;
	margin-right: 52rpx;
	
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	// width: 660rpx;
}
.topicTips{
	display: flex;
	align-items: center;
	margin-bottom: 22rpx;
	margin-left: 28rpx;
	
}
.rankImg{
	width: 48rpx;
	height: 48rpx;
	margin-right: 14rpx;
}
.tipsText{
	width: 256rpx;
	height: 32rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 32rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow:ellipsis;
}
// 推荐
.recommended{
	margin: 32rpx 28rpx 0 28rpx;
}
.topicList{
	margin-top: 32rpx;
}
.topicTitle{
	display: flex;
	align-items: center;
}
.titleLeft{
	flex: 1;
	display: flex;
	align-items: center;
}
.titleImg{
	width: 36rpx;
	height: 36rpx;
	margin-right: 8rpx;
}
.rightText{
	flex: 1;
	height: 36rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #606266;
	line-height: 36rpx;
}
.titleRight{
	width: 166rpx;
	height: 36rpx;
	background: #EDEFF2;
	display: flex;
	align-items: center;
	border-radius: 18rpx;
	padding-left: 20rpx;
	padding-right: 12rpx;
}
.number{
	height: 36rpx;
	line-height: 36rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #606266;
}

.moreRight{
	width: 14rpx;
	height: 14rpx;
}
.titleText{
	
	height: 36rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 36rpx;
}
.contentImgBox {
	margin-top: 30rpx;
	display: flex;
	// margin-left: 28rpx;
}
.contentImg {
	width: 216rpx;
	margin-right: 24rpx;
	background-color: #ffffff;
	padding-bottom: 14rpx;
	border-radius: 8px ;
}
.attImg {
	width: 216rpx;
	height: 216rpx;
	border-radius: 8px ;
}
.attText {
	// height: 28rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	// line-height: 28rpx;
	margin: 4rpx 0 2rpx 6rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
	overflow: hidden;
	-webkit-line-clamp: 2;
}
.line{
	width: 694rpx;
	height: 0.5px;
	background: #DDDDDD;
}
</style>
