<template>
	<view >
		<!-- 自定义导航栏 -->
		<view class="nav-bar" v-if="isFixed">
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
					<image lazy-load :src="userInfo.avatar?userInfo.avatar:'/static/images/userImg.svg'" class="userAva" v-if="userInfo.avatar" mode=""></image>
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
			<view class="top-kong">
			</view>
			<!-- 我的收藏 -->
			<meTabs class="mineTabs" v-model="tabIndex" :tabs="tabList" @change="tabChange" :fixed="isFixed" :top="navbarHeight" :lineWidth="100" :tab-width="80"></meTabs>
		</view>
		<block v-if="auth">
			<articleList ref="mescrollItem" v-for="(tab,i) in tabList" :key="i" :i="i" :index="tabIndex"></articleList>
		</block>
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
					name: '收藏',
					count: '',
				}, {
					name: '已赞',
					count: ''
				}],
			tabIndex: 0,
			favnumcolor:{
				color: '#303133'
			},
			likenumcolor:{
				color: '#909399'
			},
			cardheight: 200,
			navbarHeight: 0,
			isFixed:false,
			auth: null,
		};
	},
	onShow() {
		this.auth =  uni.getStorageSync('Authorization')
		if (!this.auth){
			uni.navigateTo({
				url: '/pages_mine/login/login?ismine=1'
			});
			return
		}
		this.loadData()
	},
	onLoad() {
		this.auth =  uni.getStorageSync('Authorization')
		if (!this.auth){
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
			
			if (this.navbarHeight == 0){
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.nav-bar').boundingClientRect(data => {
						this.navbarHeight = data.height
					}).exec();
				})
			}
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
					that.tabList[0].count = res.data.data.fav_count
					that.tabList[1].count = res.data.data.like_count
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
			const query = uni.createSelectorQuery().in(this);
			setTimeout(() => {
				query.select('.mineTabs').boundingClientRect(data => {
					if (!data){
						this.calcCardHeight()
						return
					}
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
.nav-bar {
	z-index: 999;
	position: fixed;
	top:0px;
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
	}
}

.phone {
	height: 124rpx;
	width: 124rpx;
	border-radius: 50%;
	position: fixed;
	bottom: 62rpx;
	right: 18rpx;
	.phoneImg {
		width: 124rpx;
		height: 124rpx;
	}
}
.top-kong{
	height: 20rpx;
	background: #ffffff;
	border-radius: 24rpx 24rpx 0px 0px;
}
// .mineBox{
// 	height: 100rpx;
// 	background: red;
// }
</style>
