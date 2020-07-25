<template>
	<view class="cus-sty">
	    <view class="hot">
	        <view class="hot-top">
	            <text class="ht-l">热门景点</text>
	            <view class="ht-r" @click="lookAll">查看更多<image src="../../static/images/查看更多@2x.png" class="moreIcon" mode=""></image></view>
	        </view>
	        <view class="hot-bot">
	            <view class="hb-l">
	                <image src="../../static/images/photos/f0e1fe97524085.5ec6dde3b745f.jpg"></image>
	                <text>直布罗陀</text>
	            </view>
				<view class="hb-r">
					<view class="hb-r1">
					    <image src="../../static/images/photos/sda.jpeg"></image>
					    <text>海南藏族自治州</text>
					</view>
					<view class="hb-r2">
					    <image src="../../static/images/photos/asxds.png"></image>
					    <text>科索沃</text>
					</view>
				</view>
	        </view>
	    </view>
	    <view class="touring">
	        <text class="tourtext">正在旅行</text>
			<touring class="touringList"></touring>
	    </view>
	</view>
</template>

<script>
	import touring from '@/components/content/touring.vue'
	export default {
		data() {
			return {
			}
		},
		methods: {
			lookAll(){
				uni.navigateTo({
					url:'/pages/attractionsList/attractionsList'
				})
			}
		},
		components:{
			touring
		}
	}
</script>

<style lang="scss" scoped>
	.cus-sty{
		background-color: #F8F8F8;
	}
	/* 热门景点 */
	.hot{
	    display: flex;
	    flex-direction: column;
	}
	.hot .hot-top{
	    display: flex;
	    justify-content: space-between;
	}
	.ht-l{
		width: 160rpx;
		height: 40rpx;
		font-size: 40rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(48,49,51,1);
		line-height:40rpx;
		margin-top: 48rpx;
		margin-left: 32rpx;
	}
	.hot-top .ht-r{
		width: 152rpx;
		height: 28rpx;
	    font-size: 28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(96,98,102,1);
		line-height:28rpx;
		margin: 54rpx 32rpx 0 0;
		display: flex;
	}
	.moreIcon{
		width: 28rpx;
		height: 28rpx;
		margin-left: 12rpx;
	}
	// 热门景点图
	.hot .hot-bot {
	    display: flex;
		margin-top: 32rpx;
	}
	.hb-l{
		width: 360rpx;
		height: 360rpx;
		margin-left: 10rpx;
		position: relative;
	}
	.hb-l image{
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
		background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
	}
	.hb-r{
		margin: 0 0 0 10rpx;
	}
	.hb-r image{
		width: 100%;
		height: 100%;
		border-radius: 8rpx;
		background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
	}
	.hb-r1{
		width: 360rpx;
		height: 174rpx;
		margin-bottom: 10rpx;
		position: relative;
	}
	.hb-r2{
		width: 360rpx;
		height: 174rpx;
		position: relative;
	}
	.hot-bot  text{
		position: absolute;
		left: 22rpx;
		bottom: 28rpx;
	    font-size: 32rpx;
		color: #FFFFFF;
	}
	/* 正在旅行 */
	.touring{
		margin-top: 48rpx;
	}
	.touring .tourtext{
		width: 160rpx;
		height: 40rpx;
		font-size: 40rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color: #303133;
		margin-left: 32rpx;
	}
	/* 正在旅行瀑布流 */
	// .touringList{
	// 		margin-top: 32rpx;
	// }
	// .touring .tb{
	//     display: flex;
	//     flex-wrap: wrap;
	//     justify-content: space-between;
	// 	margin-top: 32rpx;
	// }
	// .touring .tb-1{
	//     width: 320rpx;
	//     font-size: 14px; 
	//     border: 1px black solid;
	//     border-radius: 5px;
	//     margin-top: 15rpx;
	// }
	// .touring .title{
	//     font-weight: 600;
	// }
	// .touring .bigimg{
	//     width: 100%;
	//     border-radius: 5px;
	//     background-color: gray;
	// }
	// /*  */
	// .touring .tb-1-b-b{
	//     display: flex;
	//     font-size: 12px;
	//     justify-content: space-between;
	//     text-align: center;
	// }
	// .touring .users{
	//     display: flex;
	//     /* text-align: center; */
	//     align-items: center;
	// }
	// .touring .user-tx{
	//     width: 50rpx;
	//     height: 50rpx;
	//     background-color: grey;
	//     border-radius: 50%;
	// }
	// .touring .like{
	//     display: flex;
	//     align-items: center;
	// }
	// .touring .like-icon{
	//     width: 25rpx;
	//     height: 25rpx;
	// }
</style>
