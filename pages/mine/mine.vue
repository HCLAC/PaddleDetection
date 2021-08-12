<template>
	<view >
		<!-- 自定义导航栏 -->
		<view class="example-body" v-if="isFixed">
			<uni-nav-bar :fixed="true" :status-bar="true" title="个人主页">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<view class="mineHeader" style="position: absolute; width: 100%; top: 0; z-index: 400;">
			<view class="contentTop">
				<image src="/static/images/mineBack.png" class="backImg"></image>
				<!-- 用户信息 -->
				<view class="usermes">
					<image :src="userInfo.avatar?userInfo.avatar:'/static/images/userImg.svg'" class="userAva" v-if="userInfo.avatar" mode=""></image>
					<view class="userR">
						<view class="userName" @click="toMineInfo">{{ userInfo.nickName }}
							<image src="/static/images/iconExit.svg" mode=""></image>
						</view>
						<view class="fa">
							<view class="fllow" @click="toConcern">
								<view class="fllowNum">{{ userInfo.fllowNum }}</view>
								<text>关注</text>
							</view>
							<!-- <view class="answers" @click="toAnswers">
								<view class="answersNum">{{ userInfo.answersNum }}</view>
								<text>问答</text>
							</view> -->
						</view>
						
						<!-- <view class="logout">退出登录</view> -->
					</view>
				</view>
			</view>
			<!-- 客服 -->
			<!-- <view class="phone" @click="tell"><image class="phoneImg" src="/static/images/minephone.svg" mode=""></image></view> -->
			<!-- 我的收藏 -->
			<meTabs class="mineTabs" v-model="tabIndex" :tabs="tabList" @change="tabChange" :fixed="isFixed" :top="tabsTop" :tab-width="80"></meTabs>

			<!-- <view class="myCollection" :class="isFixed ? 'fixTabs' : 'noFix'" id="selectcard" >
				<view class="favBox" @click="change" >
					<view class="favBT">
						<view :class="tabIndex == 0 ?'favText' : 'favText1 '" >
							收藏
						</view>
						<view class="favLine" v-if="tabIndex == 0">
						</view>
					</view>
					<view :class="tabIndex == 0 ? 'favNum' : 'favNum1'" :style="{color: favnumcolor.color}" >
						{{userInfo.favNum}}
					</view>
				</view>
				<view class="likeBox" @click="change1">
					<view class="likeBT">
						<view :class="tabIndex == 1 ?'favText' : 'favText1 '">
							已赞
						</view>
						<view class="likeLine" v-if="tabIndex == 1">
						</view>
					</view>
					<view :class="tabIndex == 1 ? 'likeNum' : 'likeNum1'" :style="{color: likenumcolor.color}" >
						{{userInfo.likeNum}}
					</view>
				</view>
			</view> -->
		</view>
		<articleList ref="mescrollItem" v-for="(tab,i) in tabList" :key="i" :i="i" :index="tabIndex"></articleList>
	</view>
</template>

<script>
import MescrollMoreMixin from '@/components/mescroll-uni/mixins/mescroll-more.js';
import meTabs from '@/common/me-tabs/me-tabs.vue';
import articleList from '@/common/article-mescroll-item/mine-article-list.vue';

export default {
	mixins: [MescrollMoreMixin],
	components: {
		meTabs,
		articleList
	},
	data() {
		return {
			userInfo: {},
			favList: [],
			likeList: [],
			tabList: [{
					name: '收藏'
				}, {
					name: '已赞'
				}],
			tabIndex: 0,
			favnumcolor:{
				color: '#303133'
			},
			likenumcolor:{
				color: '#909399'
			},
			cardheight: 200,
			tabsTop: 0,
			isFixed:false,
		};
	},
	onShow() {
		var auth =  uni.getStorageSync('Authorization')
		if (!auth){
			uni.navigateTo({
				url: '/pages_mine/login/login?ismine=1'
			});
			return
		}
		this.loadData()
	},
	onLoad() {
		var auth =  uni.getStorageSync('Authorization')
		if (!auth){
			return
		}
		// this.loadData()
	},
	onPageScroll(e) {
		if (e.scrollTop >  this.cardheight) {
			if (e.scrollTop > this.cardheight+20 && this.isFixed){
				return
			}
			this.isFixed = true;
			this.$nextTick(() => {
			  let view = uni.createSelectorQuery().select(".example-body");
			  view.fields({
			  	size: true,
			  }, data => {
			  	if (!data){
			  		console.error("mine得到节点信息失败")
			  		return
			  	}
			  	console.log("得到节点信息" + JSON.stringify(data));
			  	this.tabsTop = data.height
			  }).exec();
			})
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
					this.getUserMsg();
					this.hideLoad();
				}
			});
		},
		hideLoad(){
			uni.hideLoading();
		},
		// 获取用户信息
		getUserMsg() {
			var that = this;
			this.HTTP.request({
				url: '/user/info',
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				method: 'get',
				success: function(res) {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					
					that.userInfo = res.data.data
					that.userInfo.nickName = res.data.data.mobile
					if(res.data.data.nick_name){
						that.userInfo.nickName = res.data.data.nick_name
					}
					
					let gender = res.data.data.gender
					that.userInfo.sex = gender == 0 ? '保密' : gender == 2 ? '女' : '男'
					
					let fllowNum = res.data.data.following
					that.userInfo.fllowNum = fllowNum>10000?((fllowNum-(fllowNum%1000))/10000+'w'):fllowNum
					
					let favNum = res.data.data.fav_count 
					that.userInfo.favNum = favNum>10000?((favNum-(favNum%1000))/10000+'w'):favNum
					let likeNum = res.data.data.like_count
					that.userInfo.likeNum = likeNum>10000?((likeNum-(likeNum%1000))/10000+'w'):likeNum
					let answersNum = res.data.data.question_count
					that.userInfo.answersNum = answersNum>10000?((answersNum-(answersNum%1000))/10000+'w'):answersNum
					that.calcCardHeight()
				}
			})
		},
		calcCardHeight(){
			setTimeout(() => {
				let view = uni.createSelectorQuery().select(".mineTabs");
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
			}, 500);
		},
		// 切换
		tabChange(index){
			this.tabIndex = index
		},
		// 跳转关注页
		toConcern(){
			uni.navigateTo({
				url:'/pages_mine/mineConcern/mineConcern'
			});
		},
		// 跳转个人问答页
		toAnswers(){
			uni.navigateTo({
				url:'/pages_mine/mineAnswers/mineAnswers'
			})
		},
		// 跳转信息修改页
		toMineInfo(){
			uni.navigateTo({
				url:'/pages_mine/mineInfo/mineInfo?avatar='+this.userInfo.avatar+'&name='+this.userInfo.nickName+
						'&sex='+this.userInfo.sex+'&region='+this.userInfo.location
			})
		},
		// 客服电话
		tell(){
			uni.makePhoneCall({
				phoneNumber:""
			})
			
		},
	}
};
</script>

<style lang="scss" scoped>
	.example-body {
		z-index: 999;
		position: fixed;
		top:0px;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		flex-direction: column;
		background-color: #ffffff;
		// transition: background-color 2s;
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
		margin-left: 20rpx;
	}
	/* #ifdef  MP-BAIDU*/
	.fhsy {
		margin-left: 100rpx;
	}
	/*  #endif  */
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
.backImg {
	position: absolute;
	height: 440rpx;
	width: 100%;
	z-index: -11;
}

// /* 用户信息 */
.usermes {
	padding-top: 154rpx;
	height: 130rpx;
	display: flex;
	height:340rpx ;
	align-items: center;
	margin-bottom: 38rpx;
}
.userAva {
	margin-left: 28rpx;
	width: 130rpx;
	height: 130rpx;
	box-shadow: 0px 0px 14px 0px #F7B500;
	border: 3px solid #FFFFFF;
	border-radius: 50%;
}
.userR {
	margin-left: 32rpx;
	// margin-top: 24rpx;
}
.userName {
	font-size: 36rpx;
	font-weight: 500;
	color: #303133;
	display: flex;
	align-items: center;
	image{
		width: 32rpx;
		height: 32rpx;
		margin-left: 16rpx;
	}
}
.fa{
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	.fllow{
		
		height: 24rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
		line-height: 24rpx;
		display: flex;
		align-items: center;
		text{
		}
	}
	.answers{
		height: 24rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
		line-height: 24rpx;
		display: flex;
		align-items: center;
		margin-left: 20rpx;
	}
}

.logout {
	margin-top: 4px;
	width: 80px;
	height: 20px;
	font-size: 12px;
	background-color: #f7f7f7;
	border: 1px #b9b9bf solid;
	border-radius: 30px;
	line-height: 20px;
	text-align: center;
}
/* 我的收藏卡片 */
.phone {
	height: 124rpx;
	width: 124rpx;
	border-radius: 50%;
	position: fixed;
	bottom: 62rpx;
	right: 18rpx;
}
.phone .phoneImg {
	width: 124rpx;
	height: 124rpx;
}
.favBox{
	display: flex;
	height: 60rpx;
	margin-left: 28rpx;
}
.favBT{
	margin-right: 8rpx;
	text-align: center;
}
.favText{
	// width: 72rpx;
	height: 36rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #303133;
	line-height: 36rpx;
	
}
.favText1{
	// width: 56rpx;
	height: 28rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 28rpx;
	margin-top: 8rpx;
}
.favLine{
	width: 72rpx;
	height: 24rpx;
	background: #FFE512;
	border-radius: 1px 6px 1px 1px;
	margin-top: -20rpx;
}
.likeBox{
	display: flex;
	margin-left: 56rpx;
	height: 60rpx;
}
.likeBT{
	margin-right: 8rpx;
	text-align: center;
}
.likeText{
	
}
.likeLine{
	width: 72rpx;
	height: 24rpx;
	background: #FFE512;
	border-radius: 1px 6px 1px 1px;
	margin-top: -20rpx;
}
.fixTabs {
	position: fixed;
	top: 126rpx;
	z-index: 2;
	padding-top: 20rpx;
	display: flex;
	background-color: #fff;
	width: 100%;
	height:110rpx;
}
.noFix {
	z-index: 1000;
	border-radius: 12px 12px 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	width: 100%;
	// font-size: 40rpx;
	// font-weight: 500;
	// padding-left: 32rpx;
	padding-top: 48rpx;
	display: flex;
	position: absolute;
	top: 360rpx;
}
.favNum{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
	z-index: 11111;
	margin-top: 12rpx;
	// margin-left: -158rpx;
}
.favNum1{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
	z-index: 11111;
	margin-top: 12rpx;
	// margin-left: -158rpx;
}
.likeNum{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
	z-index: 11111;
	margin-top: 12rpx;
	// margin-left: 118rpx;
}
.likeNum1{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
	z-index: 11111;
	margin-top: 12rpx;
	// margin-left: 118rpx;
}

.noContentItem {
	// height: 600rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	image {
		width: 154rpx;
		height: 122rpx;
		position: fi;
	}
	.tipText {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(144, 147, 153, 1);
		line-height: 30rpx;
		margin-top: 40rpx;
	}
}
.noContent {
	font-size: 22rpx;
	color: rgba(201, 202, 209, 1);
	// color: red;
	text-align: center;
	margin-top: 80rpx;
}

.contentItem {
	width: 694rpx;
	height: 232rpx;
	margin: 28rpx;
	margin-left: 0;
	margin-top: 0;
	margin-bottom: 20rpx;
	border-radius: 8px;
	display: flex;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	.left {
		position: relative;
		.imgTip {
			position: absolute;
			left: 0rpx;
			top: 0rpx;
			font-size: 24rpx;
			line-height: 44rpx;
			font-weight: 500;
			color: #ffffff;
			width: 96rpx;
			height: 44rpx;
			text-align: center;
			background-color: rgba(0, 0, 0, 0.6);
			border-radius: 16rpx 0px 16rpx 0px;
		}
		image {
			// margin: 8rpx;
			width: 192rpx;
			height: 232rpx;
			margin-right: 20rpx;
			border-radius: 16rpx;
		}
		.videoIcon{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -20rpx;
			margin-left: -30rpx;
			width: 40rpx;
			height: 40rpx;
		}
		.playIcon{
			width: 100%;
			height: 100%;
		}
	}

	.right {
		margin-top: 12rpx;
		height: 232rpx;
		// overflow: hidden;
		// text-overflow:ellipsis;
		// white-space: nowrap;
	}
	.right .title {
		width: 480rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(48, 49, 51, 1);
		font-family: PingFangSC-Medium, PingFang SC;
		line-height: 32rpx;
		display: flex;
	}
	.tips {
		margin-right: 10rpx;
	}
	.titleText {
		flex: 1;
		// margin-left: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.richText {
		width: 480rpx;
		height: 84rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #909399;
		line-height: 42rpx;
		margin-top: 12rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.favandlikebox{
		display: flex;
		align-items: center;
		margin-top: 14rpx;
		font-size: 22rpx;
		// font-family: Roboto-Regular, Roboto;
		font-weight: 400;
		color: #606266;
		line-height: 22rpx;
	}
	.like{
		margin-left: 20rpx;
	}
	.right .position {
		display: flex;
		margin-top: 20rpx;
		// height: 30rpx;
		// line-height: 40rpx;
		align-items: center;
		.pImg{
			width: 26rpx;
			height: 30rpx;
			
			image {
				height: 100%;
				width: 100%;
			}
		}
		
		view {
			width: 452rpx;
			font-size: 22rpx;
			margin-left: 4rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(0, 145, 255, 1);
			line-height: 22rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
.line{
	width: 722rpx;
	height: 1rpx;
	background: #EDEFF2;
	margin-bottom: 20rpx;
}

</style>
