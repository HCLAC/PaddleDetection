<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
<<<<<<< HEAD
					<uni-icons type="arrowleft" class="icons" color="#333333" size="22" @click="back" />
					<image src="../../static/images/home.png" class="homeIcon" mode=""></image>
=======
					<image class="fanhui" src="../../static/images/icon-fanhui.png" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.png" @click="home" />
>>>>>>> feature/login
				</view>
				<view class="slottitle">热门景点</view>
			</uni-nav-bar>
		</view>
<<<<<<< HEAD
		<!-- 用户信息 -->

=======
		
>>>>>>> feature/login
		<!-- 内容详情轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
<<<<<<< HEAD
					<swiper @change="change" :autoplay="true" class="swiper" :indicator-dots="false">
						<swiper-item v-for="item in list" class="swiper-item"><image src="../../static/images/photos/WechatIMG3.png" mode=""></image></swiper-item>
=======
					<swiper @change="change" class="swiper" :indicator-dots="indicatorDots" indicator-color="#ababab" indicator-active-color="#2d2d2d">
						<swiper-item v-for="item in list" >
							<image class="itemImg" mode="aspectFit" :src="item.image" ></image>
						</swiper-item>
						
>>>>>>> feature/login
					</swiper>
					<view class="imageCount">{{ current + 1 }}/{{ list.length }}</view>
					<view class="dots">
						<block v-for="(item, index) in list"><view :class="[index == current ? 'activieDot' : 'dot']"></view></block>
					</view>
				</view>
			</view>
		</view>
		<view class="userInfo">
			<view class="left"><image src="../../static/images/userImg.png" mode=""></image></view>
			<view class="right">
				<view class="userName">Haley</view>
				<view class="position">
					<image class="positionIcon" src="../../static/images/positionIcon.png"></image>
					<text>希腊</text>
				</view>
			</view>
		</view>
		<!-- 内容详情 -->
		<view class="detailContent">
			<view class="userMse">
				<image class="userHeard" src="../../static/images/mine-actived.png"></image>
				<view class="userMse-r">
					<view class="userNikename"> Haley </view>
					<view class="adress">
						<image src="../../static/images/Icon／Map.png" mode="" class="adreessIcon"></image>
						<view class="adressText">
							希腊
						</view>
					</view>
				</view>
			</view>
			<!-- 标题 -->
<<<<<<< HEAD
			<view class="contentTitle">攻略 | 愿你踏遍山海觉得人间值得</view>

			<view class="contentText">
				语雀是一款优雅高效的在线文档编辑与协同工具， 让每 个企业轻松拥有文档中心阿里巴巴集团内部使用多年， 众多中小企业首选。
				<view class="copy">
					详情请+VX: 13456789012
					<text class="clcopy">点击复制</text>
				</view>
				语雀是一款优雅高效的在线文档编辑与协同工具让每个 企业轻松拥有文档中心，阿里巴巴集团内部使用多年众 多中小企业首选语雀是一款优雅高效的在线文档编辑与
				协同工具，让每个企业轻松拥有文档中心阿里巴巴集团 内部使用多年众多中小企业首选。
			</view>
			<view class="tips">
				<view class="tipItem">
					<image src="../../static/images/tipIcon.png" mode=""></image>
					<text>旅游攻略</text>
				</view>
				<view class="tipItem">
					<image src="../../static/images/tipIcon.png" mode=""></image>
					<text>旅游攻略</text>
				</view>
				<view class="tipItem">
					<image src="../../static/images/tipIcon.png" mode=""></image>
					<text>旅游攻略</text>
				</view>
				<view class="tipItem">
					<image src="../../static/images/tipIcon.png" mode=""></image>
					<text>旅游攻略</text>
				</view>
=======
			<view class="contentTitle">
				攻略 | 愿你踏遍山海觉得人间值得
			</view>
			
			
			<!-- 内容文章 -->
			<view class="contentText">
				语雀是一款优雅高效的在线文档编辑与协同工具， 让每 个企业轻松拥有文档中心阿里巴巴集团内部使用多年， 众多中小企业首选。
				<view class="copy">详情请+VX: 13456789012<text class="clcopy">点击复制</text></view>
				语雀是一款优雅高效的在线文档编辑与协同工具让每个 企业轻松拥有文档中心，阿里巴巴集团内部使用多年众 多中小企业首选语雀是一款优雅高效的在线文档编辑与 协同工具，让每个企业轻松拥有文档中心阿里巴巴集团 内部使用多年众多中小企业首选。
			</view>
			<view class="tips">
				<view>#<text>旅游攻略</text></view>
				<view>#<text>云南去哪儿玩</text></view>
				<view>#<text>洱海</text></view>
>>>>>>> feature/login
			</view>
			<view class="releaseTime">发布于2020-12-14</view>
		</view>
		<!-- 分割线 -->
		<view class="line"></view>
		<!-- 登录 -->
		<view class="contentBottom">
<<<<<<< HEAD
			<view class="footerLeft">
				<view class="like">
					<image src="../../static/images/like.png" mode=""></image>
					<view class="likeNum" v-model="likemessage">{{ likemessage }}</view>
				</view>
				<view class="fav">
					<image src="../../static/images/collection.png" mode=""></image>
					<view class="favNum" v-model="favmessage">{{ favmessage }}</view>
=======
			<view class="like">
				<image class="likeBtn" src="../../static/images/ic_fenxiang.png" @click="likeclick"></image>
				<view class="likeNum" v-model="likemessage" >
					{{likemessage}}
				</view>
			</view>
			<view class="fav">
				<image  class="favBtn" src="../../static/images/fav.png" @click="favclick" >
				</image>
				<view class="favNum" v-model="favmessage">
					{{favmessage}}
>>>>>>> feature/login
				</view>
				<view class="share"><image src="../../static/images/shareHere.png"></image></view>
			</view>
<<<<<<< HEAD
			
			<view class="footerRight">
				<button class="loginBtn">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
var _this;
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniFav from '@/components/uni-fav/uni-fav.vue';
export default {
	comments: {
		uniNavBar,
		uniIcons,
		uniFav
	},
	data() {
		return {
			indicatorDots: true,
			current: 0,
			list: [{ key: '1', title: 'A' }, { key: '2', title: 'B' }, { key: '3', title: 'C' }, { key: '4', title: 'D' }, { key: '6', title: 'E' }, { key: '7', title: 'F' }],
			likemessage: 144,
			favmessage: 219
		};
	},
	created() {
		(_this = this), _this.getOrder();
	},

	methods: {
		change(e) {
			_this.current = e.detail.current;
=======
			<view class="share">
				<image src="../../static/images/share.png"></image>
			</view>
			<view class="loginButton">登录</view>
		</view>
	</view>
</template>

<script>
	var _this
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniFav from '@/components/uni-fav/uni-fav.vue'
	export default {
		comments:{
			uniNavBar,
			uniIcons,
			uniFav
		},
		data() {
			return {
				indicatorDots: true,
				current:0,
				list:[
					{key:"1",title:"A",image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg'},
					{key:"2",title:"B",image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg',},
					{key:"3",title:"C",image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',},
					{key:"4",title:"D",image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',},
					{key:"5",title:"E",image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg',},
				],
				likemessage:144,
				favmessage:219
			}
>>>>>>> feature/login
		},
		getOrder() {
			_this.swiperlength,
				(_this.list = [
					{ key: '1', title: 'A' },
					{ key: '2', title: 'B' },
					{ key: '3', title: 'C' },
					{ key: '4', title: 'D' },
					{ key: '6', title: 'E' },
					{ key: '7', title: 'F' }
				]);
		},
<<<<<<< HEAD
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		home() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		likeclick() {
			// console.log("cccccccccccc")
			this.likemessage++;
		},
		favclick() {
			// console.log("cccccccccccc")
			this.favmessage++;
		}
		// favClick() {
		// 	this.checked = !this.checked
		//  this.$forceUpdate()
		// }
	}
};
</script>

<style lang="scss">
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
.navBar {
	display: flex;
}
.slotleft {
	display: flex;
	align-items: center;
	.icon {
		font-weight: 600;
		margin-right: 20rpx;
	}
	.homeIcon {
		width: 40rpx;
		height: 40rpx;
	}
}
.slottitle {
	margin-left: 180rpx;
	font-size: 38rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(0, 0, 0, 1);
	margin-left: 64px;
}

/* 用户信息 */

/* 轮播图 */
.page-section-spacing {
	position: relative;
}

.swiper-item {
	width: 100%;
	image {
		height: 100%;
		width: 100%;
	}
}
.uni-bg-red {
	background-color: #ea552d;
}
.uni-bg-green {
	background-color: #4cd964;
}
.uni-bg-blue {
	background-color: #007aff;
}
.imageCount {
	height: 40rpx;
	background-color: #000000;
	border-radius: 20rpx;
	line-height: 40rpx;
	color: #fff;
	text-align: center;
	font-size: 22rpx;
	position: absolute;
	right: 22rpx;
	padding: 0 12rpx;
	bottom: 36rpx;
}
//标记点样式
.dots {
	width: 100%;
	height: 10rpx;
	display: flex;
	justify-content: center;
	position: absolute;
	/* left: 320rpx; */
	background: #ffff;
	bottom: -40rpx;
	.dot {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background: rgba(221, 221, 221, 1);
		margin-right: 8rpx;
	}
	.activieDot {
		width: 20rpx;
		height: 10rpx;
		background: rgba(48, 49, 51, 1);
		border-radius: 3px;
		margin-right: 8rpx;
	}
}
// 用户信息界面
.userInfo {
	margin-top: 40rpx;
	display: flex;
	height: 100rpx;
	align-items: center;
	margin-left: 30rpx;
	.left {
		image {
			height: 80rpx;
			width: 80rpx;
			margin-right: 20rpx;
		}
	}
	.right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.userName {
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(48, 49, 51, 1);
			line-height: 28rpx;
			margin-bottom: 10rpx;
		}
		.position {
			padding: 4rpx 7rpx;
			border: 1rpx solid #0091ff;
			border-radius: 20rpx;
			color: #0091ff;
			display: flex;
			align-items: center;
			justify-content: center;
			.positionIcon {
				height: 24rpx;
				width: 24rpx;
				margin-right: 2rpx;
			}
		}
	}
}
/* 内容详情 */
.detailContent {
	padding: 30rpx 30rpx;
}
.contentTitle {
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(48, 49, 51, 1);
	line-height: 64rpx;
}

.contentText {
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(96, 98, 102, 1);
	line-height: 56rpx;
}
.copy {
	font-weight: 500;
	color: rgba(48, 49, 51, 1);
	margin-right: 36rpx;
}
.clcopy {
	color: #4ca2ff;
}
.tips {
	display: flex;
	flex-wrap: wrap;
	margin: 40rpx 0;
	.tipItem {
		display: flex;
		align-items: center;
		margin-right: 40rpx;
		line-height: 52rpx;
		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 6rpx;
		}
		text {
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(0, 145, 255, 1);
		}
	}
}

.releaseTime {
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(201, 202, 209, 1);
}
/* 底部 */
.contentBottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 30rpx;
	margin-top: 84rpx;
	align-items: center;
	height: 98rpx;
	border-top: 2rpx solid #dddddd;
	.footerLeft {
		display: flex;
		align-items: center;
	}
}

.like {
	display: flex;
	align-items: center;
	margin-right: 56rpx;
	image {
		height: 52rpx;
		width: 52rpx;
		margin-right: 10rpx;
	}
	.likeNum {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(48, 49, 51, 1);
	}
}
.fav {
	display: flex;
	align-items: center;
	margin-right: 56rpx;

	image {
		height: 52rpx;
		width: 52rpx;
		margin-right: 10rpx;
	}
	.favNum {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(48, 49, 51, 1);
	}
}

.share {
	display: flex;
	align-items: center;
	image {
		height: 52rpx;
		width: 52rpx;
	}
}
.loginBtn{
	border:none !important;
	width:156rpx;
	height:68rpx;
	background:rgba(255,229,18,1);
	border-radius:40rpx;
	font-size:32rpx;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(48,49,51,1);
	display: flex;
	justify-content: center;
	align-items: center;
}
button::after{ border: none;}
=======
		
		methods: {
			change(e){
				_this.current = e.detail.current
			},
			getOrder(){
				_this.swiperlength,
				_this.list = [
					{key:"1",title:"A"},
					{key:"2",title:"B"},
					{key:"3",title:"C"},
					{key:"4",title:"D"},
					{key:"5",title:"E"},
				]
			},
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
			likeclick(){
				// console.log("cccccccccccc")
				this.likemessage++
			},
			favclick(){
				// console.log("cccccccccccc")
				this.favmessage++
			}
			// favClick() {
			// 	this.checked = !this.checked
			//  this.$forceUpdate()
			// }
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
	.navBar{
		display: flex;
	}
	.slotleft{
		display: flex;
		align-items: center;
	}
	.fanhui{
		width: 40rpx;
		height: 40rpx;
		margin-left: 40rpx;
		margin-right: 20rpx;
	}
	.fhsy{
		width: 40rpx;
		height: 40rpx;
	}
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
	
	/* 轮播图 */
	.page-section-spacing{
		position: relative;
		height: 996rpx;
	}
	.swiper{
		height: 996rpx;
	}
	.itemImg{
		height: 996rpx;
		width: 100%;
	}
	.uni-bg-red{
		height: 996rpx;
		background-color: #EA552D;
	}
	.uni-bg-green{
		height: 996rpx;
		background-color: #4CD964;
	}
	.uni-bg-blue{
		height: 996rpx;
		background-color: #007AFF;
	}
	.imageCount {
	  width: 90rpx;
	  height: 40rpx;
	  background-color: rgba(0,0,0,0.6);
	  border-radius: 20rpx;
	  text-align: center;
	  line-height: 40rpx;
	  font-size: 22rpx;
	  font-family:PingFangSC-Regular,PingFang SC;
	  font-weight:400;
	  color:rgba(255,255,255,1);
	  position: absolute;
	  right: 28rpx;
	  bottom: 28rpx;
	}
	
	/* 内容详情 */
	.detailContent{
		// padding: 15px;
	}
	// 用户信息
	.userMse{
		display: flex;
		margin-left: 28rpx;
		margin-top: 20rpx;
	}
	.userHeard{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	.userMse-r{
		margin-left: 20rpx;
	}
	.userNikename{
		font-size:28rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(48,49,51,1);
		line-height:28rpx;
	}
	.adress{
		width: 100rpx;
		height: 40rpx;
		margin-top: 12rpx;
		background:rgba(255,255,255,1);
		border-radius:20rpx;
		border:2rpx solid rgba(0,145,255,1);
		display: flex;
		align-items: center;
		text-align: center;
	}
	.adreessIcon{
		width: 24rpx;
		height: 24rpx;
	}
	.adressText{
		font-size:22rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(0,145,255,1);
	}
	// 内容
	.contentTitle{
		font-size:32rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		color:rgba(48,49,51,1);
		line-height:32rpx;
		margin-left: 28rpx;
		margin-top: 40rpx;
	}
	
	.contentText{
		font-size:28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(96,98,102,1);
		line-height:56rpx;
		margin: 28rpx;
	}
	.copy{
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		color:rgba(48,49,51,1);
	}
	.clcopy{
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(0,145,255,1);
		margin-left: 36rpx;
	}
	.tips{
		margin-top: 40rpx;
		margin-left: 28rpx;
		display: flex;
	}
	.tips view{
		font-size:26rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:500;
		color:rgba(0,145,255,1);
		margin-right: 38rpx;
	}
	.tip text{
		margin-left: 6rpx;
	}
	// .tipImg{
	// 	width: 30rpx;
	// 	height: 30rpx;
	// 	margin-right: 6rpx;
	// }
	
	.releaseTime{
		font-size:22rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(201,202,209,1);
		line-height:22rpx;
		margin-top: 40rpx;
		margin-left: 28rpx;
	}
	.line{
		height:2rpx;
		background:rgba(221,221,221,1);
		margin-top: 84rpx;
	}
	/* 底部 */
	.contentBottom{
		display: flex;
		align-items: center;
		margin-top: 16rpx;
		font-size:24rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(48,49,51,1);
		line-height:24rpx;
		margin-bottom: 68rpx;
	}
	.loginButton{
		width:156rpx;
		height:68rpx;
		background:rgba(255,229,18,1);
		border-radius:20px;
		font-size:32rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		color:rgba(48,49,51,1);
		line-height:68rpx;
		border: none;
		text-align: center;
		margin-left: 190rpx;
	}
	.like{
		display: flex;
		margin-left: 28rpx;
		align-items: center;
	}
	.likeBtn{
		width: 52rpx;
		height: 52rpx;
		margin-right: 10rpx;
	}
	.fav{
		display: flex;
		margin-left: 56rpx;
		align-items: center;
	}
	.favBtn{
		width: 52rpx;
		height: 52rpx;
		margin-right: 10rpx;
	}
	.share{
		display: flex;
		margin-left: 56rpx;
		align-items: center;
	}
	.share image{
		width: 52rpx;
		height: 52rpx;
	}
	
>>>>>>> feature/login
</style>
