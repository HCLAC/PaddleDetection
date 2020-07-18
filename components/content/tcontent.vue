<template>
	<view class="cus-sty">
	    <view class="hot">
	        <view class="hot-top">
	            <text class="ht-l">热门景点</text>
	            <text class="ht-r">查看全部>></text>
	        </view>
	        <view class="hot-bot">
	            <view class="hb-1">
	                <image src=""></image>
	                <text>玉龙雪山</text>
	            </view>
	            <view class="hb-1">
	                <image src=""></image>
	                <text>玉龙雪山</text>
	            </view>
	            <view class="hb-1">
	                <image src=""></image>
	                <text>玉龙雪山</text>
	            </view>
	        </view>
	    </view>
	    <view class="touring">
	        <text class="tourtext">正在旅行</text>
			<touring></touring>
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
			
		},
		components:{
			touring
		}
	}
</script>

<style lang="scss">
	.cus-sty{
		background-color: #FFFFFF;
	}
	/* 热门景点 */
	.hot{
	    display: flex;
	    flex-direction: column;
	}
	.hot .hot-top{
	    display: flex;
	    justify-content: space-between;
	    padding: 0 15rpx;
	}
	.hot-top .ht-r{
	    font-size: 12px;
	}
	.hot .hot-bot {
	    display: flex;
	}
	.hot .hot-bot .hb-1{
	    display: flex;
	    flex-direction: column;
	    margin: 15rpx;
	}
	.hot .hot-bot image{
	    width: 200rpx;
	    height: 150rpx;
	    background-color: gray;
	}
	.hot-bot .hb-1 text{
	    font-size: 14px;
	    text-align: center;
	}
	/* 正在旅行 */
	.touring{
	    border-top: 5rpx gray solid;
	    padding: 20rpx 15rpx;
	}
	.touring .tourtext{
	}
	/*  */
	.touring .tb{
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: space-between;
	    padding: 0 5rpx;
	}
	.touring .tb-1{
	    width: 320rpx;
	    font-size: 14px; 
	    border: 1px black solid;
	    border-radius: 5px;
	    margin-top: 15rpx;
	}
	.touring .title{
	    font-weight: 600;
	}
	.touring .bigimg{
	    width: 100%;
	    border-radius: 5px;
	    background-color: gray;
	}
	/*  */
	.touring .tb-1-b-b{
	    display: flex;
	    font-size: 12px;
	    justify-content: space-between;
	    text-align: center;
	}
	.touring .users{
	    display: flex;
	    /* text-align: center; */
	    align-items: center;
	}
	.touring .user-tx{
	    width: 50rpx;
	    height: 50rpx;
	    background-color: grey;
	    border-radius: 50%;
	}
	.touring .like{
	    display: flex;
	    align-items: center;
	}
	.touring .like-icon{
	    width: 25rpx;
	    height: 25rpx;
	}
</style>
