<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.png" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.png" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<!-- 景点详情轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper @change="change" class="swiper" :indicator-dots="indicatorDots" indicator-color=#fff indicator-active-color="#ffff00">
						<swiper-item v-for="item in list" >
							<view class="swiper-item uni-bg-blue" >{{item.title}}</view>
						</swiper-item>
						
					</swiper>
					<view class="imageCount">{{current+1}}/{{list.length}}</view>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- 景点详情 -->
			<view class="content-top">
				<!-- 景点标题 -->
				<text class="att-title">玉龙雪山</text>
				<!-- 景点评分 -->
				<view class="score">
					<uni-rate :disabled="true" :size="16" active-color="black" :value="4.5" />
					<text class="rate">{{4.5}}</text>
					<text class="all">{{1634}}人去过</text>
				</view>
				<!-- 景点简介 -->
				<view class="biref" :class="{'hidden':synopsis}">
					<view class="bireftip">简介</view>
					<text class="birefcontent" >
						玉龙雪山为云南省丽江市境内雪山群，东界丽（江）鸣（音）公路，西临虎跳峡涧、南起玉湖，北至大具下虎跳峡口，地处东经100°4′2″-100°16′30″、北纬27°3′2″～27°18′57″之间，在丽江北面约15千米处，全长75千米，是北半球最近赤道终年积雪的山脉，隔江西与中甸雪山、东与绵绵山相并列，北自三江口，向南延伸到北纬27°，如扇面向古城展开。全山的13座山峰由南向北纵向排列，主峰扇子陡最高处海拔5596米，终年积雪，雪线高度介于4800～5000米之间。发育有亚欧大陆距离赤道最近的温带海洋性冰川。
					</text>
					<view class="btn" @click="synopsis=!synopsis">
						<text>详情</text>
						<image :src="synopsis?'../../static/images/up.png':'../../static/images/down.png'"></image>
					</view>
				</view>
			</view>
			<!-- 分割线 -->
			<view class="splitline"></view>
			<!-- 景点位置 -->
			<view class="content-middle">
				<view class="adresstitle">
					景点位置
				</view>
				<view class="conadress">
					<image src="../../static/images/dd.png"></image>
					<text>云南省丽江市玉龙纳西族自治县白水河</text>
					<text class="navgation">导航</text>
				</view>
				<view class="phone">
					<image src="../../static/images/iPhone.png"></image>
					<text>旅行管家：</text>
					<text>13456743442</text>
				</view>
			</view>
			<!-- 分割线 -->
			<view class="splitline"></view>
			<!-- 热门攻略 -->
			<view class="content-bottom">
				<view class="hotStrategy">
					热门攻略
				</view>
				<view class="strategyContent">
					<view class="strategyTop">
						<view class="top">
							TOP1
						</view>
						<view class="topcontent">内容主标题内容主标题内容主标题</view>
						<view class="browse">{{34125}}次浏览</view>
					</view>
					<view class="strategyTop">
						<view class="top">
							TOP1
						</view>
						<view class="topcontent">内容主标题内容主标题内容主标题</view>
						<view class="browse">{{34125}}次浏览</view>
					</view>
					<view class="strategyTop">
						<view class="top">
							TOP1
						</view>
						<view class="topcontent">内容主标题内容主标题内容主标题</view>
						<view class="browse">{{34125}}次浏览</view>
					</view>
					<view class="strategyTop">
						<view class="top">
							TOP1
						</view>
						<view class="topcontent">内容主标题内容主标题内容主标题</view>
						<view class="browse">{{34125}}次浏览</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	var _this = this
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
		comments:{
			uniRate,
			uniSection,
			uniNavBar
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
				synopsis:false,
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
		}
	}
</script>

<style lang="scss">
	// 自定义导航栏样式
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
	// 轮播图
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
	// 景点详情
	// 景点标题
	.att-title{
		font-size: 18px;
		font-weight: 900;
		margin-left: 15px;
	}
	// 景点评分
	.score{
		margin: 15px;
		display: flex;
		align-items: center;
		font-size: 14px;
	}
	.all{
		margin-left: 15px;
	}
	// 景点简介
	.biref{
		height: 94px;
		// background-color: #4CD964;
		overflow:hidden;
		text-overflow: string;
		// white-space:nowrap;
		font-size: 14px;
		display: flex;
		position: relative;
		padding: 0 10px;
	}
	.bireftip{
		border: 1px #3B4144 solid;
		position: absolute;
		width: 40px;
		text-align: center;
	}
	.birefcontent{
		// height:50px;
		transition:all .5s ease;
		overflow: hidden;
		text-overflow: ellipsis;
		text-indent: 45px;
	}
	.btn{
		position: absolute;
		right: 12px;
		bottom: 0;
		background-color: #FFFFFF;
	}
	.btn text{
		font-size: 14px;
		font-weight: 900;
	}
	.btn image{
		width: 12px;
		height: 12px;
	}
	.hidden{
		height: auto!important;
		// background: #d7d7d7;
	}
	
	// 分割线
	.splitline{
		width: 100%;
		height: 2px;
		background-color: #ababab;
		margin-top: 8px;
	}
	// 景点位置
	.content-middle{
		padding: 15px;
	}
	.adresstitle{
		font-size: 18px;
		font-weight: 900;
	}
	.conadress{
		display: flex;
		align-items: center;
		margin-top: 15px;
	}
	.conadress image{
		width: 20px;
		height: 20px;
	}
	.conadress text{
		font-size: 14px;
		color: #808080;
	}
	.conadress .navgation{
		width: 80px;
		border: 1px #333333 solid;
		border-radius: 15px;
		text-align: center;
		padding: 8px;
	}
	.phone{
		display: flex;
		margin-top: 15px;
	}
	.phone image{
		width: 18px;
		height: 18px;
		margin-right: 5px;
	}
	.phone text{
		font-size: 12px;
		font-weight: 900;
	}
	// 热门攻略
	.content-bottom{
		margin: 15px 0 15px 15px;
	}
	.hotStrategy{
		
	}
	.strategyContent{
		display: flex;
		// justify-content: space-between;
		flex-wrap: wrap;
	}
	.strategyTop{
		width: 130px;
		// height: 70px;
		border: 1px #808080 solid;
		margin: 15px 15px 0 0;
		white-space: nowrap;
		overflow: hidden;
	}
	.top{
		width: 60px;
		background-color: #AAAAAA;
	}
	.topcontent{
		font-size: 14px;
		font-weight: 900;
		overflow: hidden;
		white-space: normal;
		margin: 5px;
	}
	.browse{
		font-size: 12px;
		padding-left:52px ;
	}
</style>
