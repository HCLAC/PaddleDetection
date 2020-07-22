<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<uni-icons type="arrowleft" color="#333333" size="22" @click="back" />
					<view class="button-v-line"></view>
					<uni-icons type="home" color="#333333" size="22" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<!-- 用户信息 -->
		<view class="usermes">
			<image class="userAva" src="../../static/images/mine-actived.png">
			</image>
			<view class="userName">
				用户昵称
			</view>
		</view>
		<!-- 内容详情轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper @change="change" class="swiper" :indicator-dots="indicatorDots" indicator-color="#ababab" indicator-active-color="#2d2d2d">
						<swiper-item v-for="item in list" >
							<view class="swiper-item uni-bg-blue" >{{item.title}}</view>
						</swiper-item>
						
					</swiper>
					<view class="imageCount">{{current+1}}/{{list.length}}</view>
				</view>
			</view>
		</view>
		<!-- 内容详情 -->
		<view class="detailContent">
			<!-- 标题 -->
			<view class="contentTitle">
				云南旅游必去的地方~
			</view>
			<!-- 地址 -->
			<view class="contentAdress">
				<image class="caImg" src="../../static/images/dd.png"></image>
				洱海·云南省大理市
			</view>
			<!-- 分割线 -->
			<view class="line"></view>
			<!-- 内容文章 -->
			<view class="contentText">
				云南游记双廊古镇诏风情岛上大理游<br>
				写完第二篇大理洱海骑行，有朋友就问大理周边除了洱海骑行还有没有其他景点。确实有，双廊古镇，南诏风情岛以及喜洲古镇，都是现在大理周边比较热门的景点那么第三篇就继续和大家分享
				<br>
				交通：旅游客运站腾冲县热海路有发往昆明、保山、 大理和丽江的班车
				<br>
				费用：热海浴谷268元在腾冲市区旅游客运站有专线车直达，车票6元；从腾冲市区乘坐出租车前往，车费30元左右
				<view class="copy">详情请+VX: 13456789012<text class="clcopy">点击复制</text></view>
				世界上有温泉的地方很多，但像腾冲这样面积又广、泉眼又多、疗效又好的那就不多了。早在古代，徐霞客已经踏足这里，详细地考察了丰富的地热资源。这里有中国最密集的火山群和地热温泉，90多座火山，80余处温泉，更有数以万计的温泉泉眼。壮观的热海大滚锅、热力四射的万年蛤蟆嘴、令人浮想联翩的醉鸟神泉······这里似乎遍地都是温泉，永远升腾着袅袅的轻烟
			</view>
			<view class="tips">
				<text>#旅游攻略</text>
				<text>#云南去哪儿玩</text>
				<text>#洱海</text>
				<text>#大理</text>
			</view>
			<view class="releaseTime">发布于2020-12-14</view>
		</view>
		<!-- 分割线 -->
		<view class="line"></view>
		<!-- 登录 -->
		<view class="contentBottom">
			<view class="loginButton">登录</view>
			<view class="vertical">
			</view>
			<view class="like">
				<uni-icons type="heart" size="20" @click="likeclick"></uni-icons>
				<view class="likeNum" v-model="likemessage" >
					{{likemessage}}
				</view>
			</view>
			<view class="vertical">
			</view>
			<view class="fav">
				<uni-icons  class="favBtn" type="star" size="20" @click="favclick" >
				</uni-icons>
				<view class="favNum" v-model="favmessage">
					{{favmessage}}
				</view>
			</view>
			<view class="vertical">
			</view>
			<view class="share">
				<image src="../../static/images/share.png"></image>
			</view>
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
					{key:"1",title:"A"},
					{key:"2",title:"B"},
					{key:"3",title:"C"},
					{key:"4",title:"D"},
					{key:"6",title:"E"},
					{key:"7",title:"F"}
				],
				likemessage:144,
				favmessage:219
			}
		},
		created() {
			_this = this,
			_this.getOrder()
		},
		
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
					{key:"6",title:"E"},
					{key:"7",title:"F"}
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

<style>
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
	.slottitle{
		margin-left: 64px;
	}
	.button-v-line{
		width: 1px;
		height: 18px;
		background-color: #2f2f2f;
		margin: 0 8px;
	}
	/* 用户信息 */
	.usermes{
		display: flex;
		align-items: center;
		margin: 5px 0;
	}
	.userAva{
		margin-left: 15px;
		width: 25px;
		height: 25px;
		border: 1px #333333 solid;
		border-radius: 50%;
	}
	.userName{
		font-size: 18px;
		color: #777777;
		margin-left: 10px;
	}
	/* 轮播图 */
	.page-section-spacing{
		position: relative;
	}
	.swiper-item{
		height: 150px;
	}
	.uni-bg-red{
		background-color: #EA552D;
	}
	.uni-bg-green{
		background-color: #4CD964;
	}
	.uni-bg-blue{
		background-color: #007AFF;
	}
	.imageCount {
	  width: 80rpx;
	  height: 60rpx;
	  // background-color: #c5c5cc;
	  border: 1px #F8F8F8 solid;
	  border-radius: 10px;
	  line-height: 58rpx;
	  color: #fff;
	  text-align: center;
	  font-size: 26rpx;
	  position: absolute;
	  right: 26rpx;
	  bottom: 20rpx;
	}
	
	/* 内容详情 */
	.detailContent{
		padding: 15px;
	}
	.contentTitle{
		font-size: 16px;
		font-weight: 900;
		padding-left: 4px;
	}
	.contentAdress{
		display: flex;
		color: #4CA2FF;
		text-decoration: underline;
		padding-left: 4px;
	}
	.caImg{
		width: 20px;
		height: 20px;
	}
	.line{
		width: 100%;
		height: 1px;
		background-color: #b9b9bf;
		margin: 4px 0 4px 0;
	}
	.contentText{
		font-size: 12px;
		padding-left: 4px;
	}
	.copy{
		font-size: 14px;
		font-weight: 900;
	}
	.clcopy{
		font-size: 12px;
		color: #4CA2FF;
		text-decoration: underline;
	}
	.tips{
		color: #4CA2FF;
		font-size: 12px;
		font-weight: 900;
		margin-top: 5px;
	}
	.tips text{
		margin-right: 10px;
	}
	.releaseTime{
		font-size: 10px;
		margin-top: 5px;
		color: #C0C0C0;
	}
	/* 底部 */
	.contentBottom{
		display: flex;
		font-size: 12px;
		align-items: center;
	}
	.loginButton{
		width: 100px;
		height: 24px;
		font-size: 14px;
		background-color: #000000;
		color: #FFFFFF;
		border-radius: 15px;
		border: none;
		text-align: center;
		align-items: center;
		margin: 10px 15px 10px 15px;
	}
	.vertical{
		width: 1px;
		height: 26px;
		background-color: #AAAAAA;
	}
	.like{
		display: flex;
		margin:  0 10px;
		align-items: center;
	}
	.fav{
		display: flex;
		margin:  0 10px;
		align-items: center;
	}
	.share{
		display: flex;
		margin:  0 15px;
		align-items: center;
	}
	.share image{
		width: 20px;
		height: 20px;
	}
	
</style>
