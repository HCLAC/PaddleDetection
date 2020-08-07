<template>
	<view class="">
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<!-- 定位选择 -->
		<view class='list-city'>
			<scroll-view scroll-y="true" style="height:100%;"  scroll-with-animation="true"
				enable-back-to-top="true">
				<!-- 定位 -->
				<view class='item'>
					<image src="/static/images/Icon／Mapt.svg" class="dd"></image>
					<view class='cityname'>{{city}}</view>
					<text class="nowcity">当前位置</text>
					<!-- <text class="getNowCity">获取当前位置</text> -->
					<!-- <text class="tip">暂未开放，请选择以下热门城市</text> -->
				</view>
				<view class="line">
				</view>
				<!-- 热门城市 -->
				<view class='item-hot'>
					<view class='py' id="hot">国内热门省市</view>
					<view class="hot-city" v-for="item in hotCityDate">
						<button  class="city-button" type="default" size="mini">
							{{item.name}}
						</button>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				citySelected: '',
				city: '',
				cityData: {},
				//搜索历史记录
				historyListShow: true,
				historyList: [],
				hotCityDate:[]
			}
		},
		onLoad() {
			this.getAdress()
			this.getHotCity()
		},
		methods: {
			getHotCity(){
				uni.request({
					url:'http://121.40.30.19/city/hot',
					method:"GET",
					success:(res)=> {
						console.log(res)
						this.hotCityDate = res.data.data
						console.log('热门城市===>',res.data.data),
						uni.setStorageSync('state_id',res.data.data)
					}
				}),
				uni.getStorage({
					key:'state_id',
					success:function(res){
						console.log("city===>",res.data)
					}
				})
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
			getAdress(){
				uni.getLocation({
				    type: 'wgs84',
				    success:  (res)=> {
						this.city = res.city
				    }
				});
			},
		}
	}
</script>

<style scoped>
	/*  自定义导航栏样式 */
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
		/* margin-right: 20rpx; */
	}
	.fhsy{
		width: 40rpx;
		height: 40rpx;
	}
	.slottitle{
		margin-left: 220rpx;
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
	/* 定位 */
	.list-city{
	}
	.item{
		margin-top: 34rpx;
		margin-left: 36rpx;
		display: flex;
		/* align-items: center; */
	}
	.dd{
		width: 32rpx;
		height: 32rpx;
		margin-right: 8rpx;
	}
	.item .cityname{
		font-size:32rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(48,49,51,1);
		line-height:32rpx;
	}
	.item .nowcity{
		font-size:22rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(201,202,209,1);
		line-height:22rpx;
		margin-left: 4rpx;
		margin-top: 10rpx;
	}
	.getNowCity{
		font-size:24rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(0,145,255,1);
		line-height:22rpx;
		margin-left: 4rpx;
		margin-top: 10rpx;
	}
	.tip{
		font-size:22rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(201,202,209,1);
		line-height:22rpx;
		margin-left: 4rpx;
		margin-top: 10rpx;
	}
	.line{
		height:2rpx;
		background:rgba(221,221,221,1);
		margin-top: 34rpx;
		margin-bottom: 26rpx;
	}
	.item-hot{
		margin-left: 40rpx;
	}
	.item-hot .py{
		font-size:26rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(96,98,102,1);
		line-height:26rpx;
		
		margin-bottom: 20rpx;
	}
	.item-hot .hot-city{
		float: left;
	}
	.item-hot .city-button{
		width: 156rpx;
		height: 60rpx;
		margin-right: 16rpx;
		margin-bottom: 16rpx;
		background:rgba(237,239,242,1);
		border-radius:8rpx;
		line-height: 60rpx;
		font-size: 26rpx;
	}
	.city-button::after{ border: none; }
</style>
