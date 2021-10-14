<template>
	<view >
		<!-- 自定义导航栏 -->
		<view class="nav-bar" v-if="isFixed">
			<uni-nav-bar :fixed="true" :status-bar="true" title="个人主页">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
				</view>
			</uni-nav-bar>
		</view>
		<view class="mineHeader" :style="{'position': headerFixed?'absolute':'fixed'}">
			<view class="contentTop" >
				<image src="/static/images/mineBack.png" class="backImg"></image>
				<!-- 用户信息 -->
				<view class="usermes">
					<image lazy-load :src="userInfo.avatar?userInfo.avatar:'/static/images/userImg.svg'" class="userAva"></image>
					<view class="userR">
						<view v-if="hasLogin">
							<view class="userName" @click="toMineInfo">{{ userInfo.nickName }}
								<image src="/static/images/iconExit.svg"></image>
							</view>
							<view class="fa">
								<view class="fllow" @click="toConcern">
									<text>关注</text>
									<view class="fllowNum">{{ userInfo.fllowNum }}</view>
								</view>
								<view class="answers" @click="toAnswers" >
									<text>问答</text>
									<view class="answersNum">{{ userInfo.answersNum }}</view>
								</view>
							</view>
						</view>
						<view v-else>
							<view class="userSignin" @click="signIn">
								登录/注册
							</view>
							<view class="userMsg">
								点击登录享受更多更多精彩信息
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 我的收藏 -->
			<meTabs class="mineTabs" v-model="tabIndex" :tabs="tabList" @change="tabChange" :fixed="isFixed" :top="navbarHeight" :lineWidth="70" :tab-width="80"></meTabs>
		</view>
		<block v-if="hasLogin">
			<articleList ref="mescrollItem" v-for="(tab,index) in tabList" :key="index" :tab='tab' :i="index" :index="tabIndex"></articleList>
		</block>
		<view class="kong">
			
		</view>
	</view>
</template>

<script>
import MescrollMoreMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more.js';
import meTabs from '@/common/me-tabs/me-tabs.vue';
import articleList from './mine-article-list.vue';
import globalUrl from '@/global.js'

export default {
	mixins: [MescrollMoreMixin],
	components: {
		meTabs,
		articleList
	},
	data() {
		return {
			userInfo: {
				avatar:'/static/images/userImg.svg',
				nickName: '羊仔',
				fllowNum: 0,
				answersNum: 0,
			},
			favList: [],
			likeList: [],
			tabList: [{
					name: '收藏',
					count: '',
					tip: '您的收藏夹空空如也～',
					icon: '/static/images/wenjianjia.png',
				}, {
					name: '已赞',
					count: '',
					tip: '您还没有赞过任何文章哦～',
					icon: '/static/images/dianzhan.png',
				}],
			tabIndex: 0,
			favnumcolor:{
				color: '#303133'
			},
			likenumcolor:{
				color: '#909399'
			},
			cardheight: 200,
			navbarHeight: 64, 
			isFixed:false,
			headerFixed: false,
			hasLogin: false,
			isInit: true,
		};
	},
	// #ifdef MP-BAIDU
	onInit(query) {
	// #endif
	// #ifndef MP-BAIDU
	onLoad(query) {
	// #endif
		this.loadData()
	},
	onShow() {
		!this.isInit && this.loadData()
		this.isInit = false
	},
	mounted() {
		this.navbarHeight = getApp().globalData.navbarHeight
		this.calcCardHeight()
	},
	onPageScroll(e) {
		if (e.scrollTop <= 0){
			this.headerFixed = false
		} else if (e.scrollTop > 0 && this.headerFixed == false){
			this.headerFixed = true
		}
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
		signIn() {
			uni.navigateTo({
				url: '/pages_mine/login/login'
			});
			this.isInit = false
		},
		loadData() {
			this.getUserMsg();
		},
		// 获取用户信息
		getUserMsg() {
			var that = this;
			uni.request({
				url:  globalUrl + '/user/info',
				method: 'get',
				header: {
					'Authorization': getApp().globalData.Authorization
				},
				success: (res)=> {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: '请点击登录',
							icon: 'none'
						});
						that.hasLogin = false
						return
					}
					that.hasLogin = true
					uni.setStorage({
						key: 'userinfo',
						data: res.data.data,
						success: function () {
						}
					});
					var userInfo = res.data.data
					that.tabList[0].count = userInfo.fav_count
					that.tabList[1].count = userInfo.like_count
					
					userInfo.nickName = userInfo.nick_name?userInfo.nick_name:userInfo.mobile
					
					let fllowNum = userInfo.following
					userInfo.fllowNum = fllowNum>10000?((fllowNum-(fllowNum%1000))/10000+'w'):fllowNum
					
					let favNum = userInfo.fav_count 
					userInfo.favNum = favNum>10000?((favNum-(favNum%1000))/10000+'w'):favNum
					let likeNum = userInfo.like_count
					userInfo.likeNum = likeNum>10000?((likeNum-(likeNum%1000))/10000+'w'):likeNum
					let answersNum = userInfo.question_count
					userInfo.answersNum = answersNum>10000?((answersNum-(answersNum%1000))/10000+'w'):answersNum
					userInfo.avatar = that.Utils.addImageProcess(userInfo.avatar, false, 60)
					that.userInfo = userInfo
				},
				fail: () => {
					//  请求失败,隐藏加载状态
					that.hasLogin = false
				},
			})
		},
		calcCardHeight(){
			const query = uni.createSelectorQuery().in(this); 
			query.select('.contentTop').boundingClientRect(data => {
				if (!data){
					this.calcCardHeight()
					return
				}
				this.cardheight = data.height
			}).exec(); 
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
				url:'/pages_mine/mineInfo/mineInfo?avatar='+encodeURIComponent(this.userInfo.avatar)+'&name='+this.userInfo.nickName+
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

/deep/.mescroll-empty .empty-icon { width: 154rpx !important }
// /deep/.mescroll-empty .empty-icon { height: 148rpx !important }
// /deep/.mescroll-empty  .empty-fixed{top: 120rpx !important;}
page {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
.kong{
	width: 100%;
	height: 98rpx;
}
.mineTabs{
	width: 100%;
	background: #ffffff;
	border-radius: 24rpx 24rpx 0px 0px;
	overflow: hidden;
	position: absolute;
	// bottom: 0;
	top: 360rpx;
	z-index: 10;
}
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

.mineHeader {
	width: 100%;
	top: 0; 
	z-index: 400;
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
		.userSignin{
			font-size: 40rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
		}
		.userMsg{
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #606266;
		}
		.fa{
			// margin-top: 20rpx;
			display: flex;
			align-items: center;
			.fllow{
				height: 60rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
				line-height: 24rpx;
				display: flex;
				align-items: center;
				.fllowNum{
					margin-left: 8rpx;
				}
			}
			.answers{
				height: 60rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
				line-height: 24rpx;
				display: flex;
				align-items: center;
				margin-left: 20rpx;
				.answersNum{
					margin-left: 8rpx;
				}
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

</style>
